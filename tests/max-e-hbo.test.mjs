import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function loadDetectPlatform() {
	const source = readFileSync(new URL("../src/function/detectPlatform.mjs", import.meta.url), "utf8")
		.replace('import { Console } from "@nsnanocat/util";\n\n', "")
		.replace("export default function detectPlatform", "function detectPlatform");
	return new Function("Console", `${source}\nreturn detectPlatform;`)({ log() {} });
}

const detectPlatform = loadDetectPlatform();

const templatesWithMaxRules = [
	"surge",
	"surge.dev",
	"loon",
	"loon.dev",
	"shadowrocket",
	"shadowrocket.dev",
	"quantumultx",
	"quantumultx.dev"
];

const allTemplates = [
	...templatesWithMaxRules,
	"stash",
	"stash.dev"
];

const maxEhboRuleSnippets = [
	"\\.e\\.hbo\\/(.+)\\/hls\\.m3u8",
	"\\.e\\.hbo\\/(.+)\\/(hlsMedia|.+)\\.m3u8\\?(.*)subtype=",
	"\\.e\\.hbo\\/(.+)\\.vtt\\?(.*)subtype=(Official|External)",
	"\\.e\\.hbo\\/(.+)\\.vtt\\?(.*)subtype=Translate"
];

for (const platform of allTemplates) {
	test(`${platform} includes e.hbo in MITM hostnames`, () => {
		const content = readFileSync(new URL(`../template/${platform}.handlebars`, import.meta.url), "utf8");
		assert.equal(content.includes("*.e.hbo"), true);
	});
}

for (const platform of templatesWithMaxRules) {
	test(`${platform} includes all Max e.hbo interception rules`, () => {
		const content = readFileSync(new URL(`../template/${platform}.handlebars`, import.meta.url), "utf8");
		for (const snippet of maxEhboRuleSnippets) {
			assert.equal(content.includes(snippet), true, snippet);
		}
	});
}

test("Universal MitM module includes e.hbo hostname", () => {
	const content = readFileSync(new URL("../modules/DualSubs.Universal.MitM.sgmodule", import.meta.url), "utf8");
	assert.equal(content.includes("*.e.hbo"), true);
});

test("detectPlatform maps e.hbo and prod.media hosts to Max", () => {
	assert.equal(detectPlatform("https://v4-e-9ff46-lax-csla2-01-wm.e.hbo/abc/hls.m3u8"), "Max");
	assert.equal(detectPlatform("https://cf.prd.media.h264.io/abc/hls.m3u8"), "Max");
});
