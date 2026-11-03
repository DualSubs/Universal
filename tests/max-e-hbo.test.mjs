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

test("detectPlatform maps split PrimeVideo host patterns", () => {
	assert.equal(detectPlatform("https://atv-ps-fe.primevideo.com/cdp/catalog/GetPlaybackResources"), "PrimeVideo");
	assert.equal(detectPlatform("https://example.hls.pv-cdn.net/dm/example/id.m3u8"), "PrimeVideo");
	assert.equal(detectPlatform("https://s3.amazonaws.com/aiv-prod-timedtext/example/id.m3u8?subtype=Official"), "PrimeVideo");
	assert.equal(detectPlatform("https://cf-timedtext.aux.pv-cdn.net/aiv-prod-timedtext/example/id.vtt?subtype=Official"), "PrimeVideo");
	assert.equal(detectPlatform("https://d1v5ir2lpwr8os.cloudfront.net/example/id.vtt?subtype=Translate"), "PrimeVideo");
});

test("detectPlatform maps split HBOMax host patterns", () => {
	assert.equal(detectPlatform("https://manifests.api.hbo.com/hls.m3u8"), "HBOMax");
	assert.equal(detectPlatform("https://manifests.v2.api.hbo.com/hlsMedia.m3u8?subtype=Official"), "HBOMax");
	assert.equal(detectPlatform("https://example.hbomaxcdn.com/videos/example.vtt?subtype=Official"), "HBOMax");
});

test("detectPlatform maps split Paramount+ host patterns", () => {
	assert.equal(detectPlatform("https://foo.pplus.paramount.tech/path/master.m3u8"), "Paramount+");
	assert.equal(detectPlatform("https://cbsi.live.ott.irdeto.com/path"), "Paramount+");
	assert.equal(detectPlatform("https://vod-abc.cbsaavideo.com/path/stream_vtt.m3u8?subtype=Official"), "Paramount+");
	assert.equal(detectPlatform("https://vod-abc.cbsivideo.com/path/stream_vtt.m3u8?subtype=Official"), "Paramount+");
	assert.equal(detectPlatform("https://foo-pplus.cbs.com/path/master.m3u8"), "Paramount+");
});
