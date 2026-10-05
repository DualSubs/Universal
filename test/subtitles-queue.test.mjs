import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

// Execute the actual source with only the private logging dependency replaced.
// Deliberately do not provide a global `log`: the single-file path must work
// in proxy runtimes that expose only the imported Console service.
const context = vm.createContext({});
const logger = new vm.SyntheticModule(["Console"], function () {
	this.setExport("Console", { log() {}, info() {}, debug() {} });
}, { context });
const source = new vm.SourceTextModule(readFileSync(new URL("../src/function/constructSubtitlesQueue.mjs", import.meta.url), "utf8"), { context });
await source.link(specifier => {
	assert.equal(specifier, "@nsnanocat/util");
	return logger;
});
await source.evaluate();
const queue = source.namespace.default;
const request = { headers: { Accept: "text/vtt" } };
const primary = ["https://example.com/en-1.vtt", "https://example.com/en-2.vtt", "https://example.com/en-3.vtt"];
const target = "https://example.com/zh-full.vtt";

test("queues the complete target subtitle when several source segments share one target file", () => {
	for (const fileName of ["en-1.vtt", "en-2.vtt", "en-3.vtt"]) {
		const result = queue(request, fileName, primary, [target]);
		assert.equal(result.length, 1);
		assert.equal(result[0].url, target);
		assert.equal(result[0].headers, request.headers);
	}
});

test("handles one source and one target file without a global logger", () => {
	const result = queue(request, "en-1.vtt", primary.slice(0, 1), [target]);
	assert.equal(result.length, 1);
	assert.equal(result[0].url, target);
});

test("returns no requests when the target subtitle is absent", () => {
	assert.equal(queue(request, "en-2.vtt", primary, []).length, 0);
});

test("preserves one-to-one segment selection for equal multi-file playlists", () => {
	const targets = ["https://example.com/zh-1.vtt", "https://example.com/zh-2.vtt", "https://example.com/zh-3.vtt"];
	const result = queue(request, "en-2.vtt", primary, targets);
	assert.equal(result.length, 1);
	assert.equal(result[0].url, targets[1]);
	assert.equal(result[0].headers, request.headers);
});
