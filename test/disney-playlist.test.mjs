import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { URL } from "@nsnanocat/url";

// Synthetic signing parameters and IDs preserve the captured URL structure.
const id = "00000000-0000-0000-0000-000000000000";
const base = `https://vod-example.media.dssott.com/dvt2=exp=1~url=%2Fps01%2Fdisney%2F${id}%2F~hmac=REDACTED/ps01/disney/${id}/`;
const masterName = `una-cbcs-all-${id}-${id}.m3u8`;
const subtitleName = `composite_zh-Hant_NORMAL_${id}_${id}.m3u8`;

test("the project URL parser preserves signed paths and extracts Disney+ filenames", () => {
	for (const [path, filename, query] of [[masterName, masterName, "?a=3&r=720&v=2&hash=REDACTED"], [`r/${subtitleName}`, subtitleName, ""]]) {
		const input = base + path + query;
		const url = new URL(input);
		assert.equal(url.pathname, new globalThis.URL(input).pathname);
		assert.equal(url.pathname.split("/").filter(Boolean).at(-1), filename);
		assert.equal(url.toString(), input);
	}
});

for (const platform of ["surge", "loon", "stash", "shadowrocket", "quantumultx"].flatMap(platform => [platform, `${platform}.dev`])) {
	const lines = readFileSync(new globalThis.URL(`../template/${platform}.handlebars`, import.meta.url), "utf8").split("\n");
	const master = new RegExp(lines.find(line => line.includes("(cbcs|ctr)-all-")).match(/\^https\?:\S+/)[0].replace(/,$/, ""));
	const subtitles = new RegExp(lines.find(line => line.includes("((composite|subtitles)_")).match(/\^https\?:\S+/)[0].replace(/,$/, ""));

	test(`${platform} routes optional una-prefixed and existing Disney+ master filenames`, () => {
		for (const name of [masterName, `una-ctr-all-${id}.m3u8`, `cbcs-all-${id}.m3u8`, `ctr-all-${id}.m3u8`]) {
			assert.equal(master.test(base + name + "?a=3&r=720&v=2&hash=REDACTED"), true, name);
		}
		assert.equal(master.test(base + `other-cbcs-all-${id}.m3u8`), false);
	});

	test(`${platform} keeps ordinary media separate from explicitly selected subtitles`, () => {
		for (const path of ["manifest.m3u8", "r/composite_2400k.m3u8", "r/composite_Iframe.m3u8", "r/audio.m3u8", `r/${subtitleName}`]) {
			assert.equal(master.test(base + path), false, path);
		}
		assert.equal(subtitles.test(base + `r/${subtitleName}`), false);
		for (const subtype of ["Official", "Translate", "External"]) {
			assert.equal(subtitles.test(base + `r/${subtitleName}?subtype=${subtype}`), true, subtype);
		}
	});
}
