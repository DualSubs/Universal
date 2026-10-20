import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const id = "00000000-0000-0000-0000-000000000000";
const host = "abmsbaoaaaaaaaamf65vl3utj73d3.ta.mid-pop-vod-hls.main.amazon.pv-cdn.net";
const timedtextHost = "cf-timedtext.aux.pv-cdn.net";

for (const platform of ["surge", "loon", "stash", "shadowrocket", "quantumultx"].flatMap(platform => [platform, `${platform}.dev`])) {
	const lines = readFileSync(new URL(`../template/${platform}.handlebars`, import.meta.url), "utf8").split("\n");
	const [master, subtitles, timedtext] = lines.filter(line => line.includes("(pv|aiv)-cdn")).map(line => new RegExp(line.match(/\^https\?:\S+/)[0].replace(/,$/, "")));
	const [timedtextPlaylist, composite, translate] = lines.filter(line => line.includes("cf-timedtext\\.aux\\.pv-cdn\\.net")).map(line => new RegExp(line.match(/\^https\?:\S+/)[0].replace(/,$/, "")));

	test(`${platform} routes Prime Video HLS playlists without a required prefix or dot separator`, () => {
		for (const hostname of [host, host.replace("mid-pop-vod-hls", "vod-hls"), host.replace("mid-pop-vod-hls", "hls"), host.replace("mid-pop-vod-hls", "live-hls"), host.replace("mid-pop-vod-hls", "prefixhls"), "s3-nrt-ww.cf.hls.row.aiv-cdn.net", "example.hls.pv-cdn.net", "example-hls.pv-cdn.net"]) {
			const base = `https://${hostname}/dm/example/`;
			assert.equal(master.test(`${base}${id}.m3u8`), true, hostname);
			assert.equal(subtitles.test(`${base}${id}_subtitles.m3u8?subtype=Official`), true, hostname);
			assert.equal(timedtext.test(`${base}aiv-prod-timedtext/example.m3u8?subtype=Translate`), true, hostname);
		}
		for (const hostname of ["example.dash.row.aiv-cdn.net", "example-dash.pv-cdn.net", "exampledash.main.amazon.pv-cdn.net"]) {
			const dash = `https://${hostname}/dm/example/${id}`;
			assert.equal(subtitles.test(`${dash}_subtitles.m3u8?subtype=Official`), true, hostname);
			assert.equal(timedtext.test(`https://${hostname}/dm/example/aiv-prod-timedtext/example.m3u8?subtype=Translate`), true, hostname);
			assert.equal(master.test(`${dash}.m3u8`), false, hostname);
		}
	});

	test(`${platform} routes cf-timedtext playlists, composite subtitles and translated subtitles`, () => {
		const base = `https://${timedtextHost}/aiv-prod-timedtext/example/${id}`;
		for (const subtype of ["Official", "External", "Translate"]) {
			assert.equal(timedtextPlaylist.test(`${base}.m3u8?subtype=${subtype}`), true, subtype);
			for (const extension of ["vtt", "ttml2"]) {
				const url = `${base}.${extension}?subtype=${subtype}`;
				assert.equal(composite.test(url), subtype !== "Translate", url);
				assert.equal(translate.test(url), subtype === "Translate", url);
			}
		}
		assert.equal(timedtextPlaylist.test(`${base}.m3u8`), false);
		assert.equal(composite.test(`${base}.vtt`), false);
		assert.equal(translate.test(`${base}.ttml2`), false);
	});

	test(`${platform} retains Prime Video CDN, filename and subtitle parameter constraints`, () => {
		const base = `https://${host}/dm/example/`;
		assert.equal(master.test(`${base}manifest.m3u8`), false);
		assert.equal(subtitles.test(`${base}${id}_subtitles.m3u8`), false);
		assert.equal(timedtext.test(`${base}aiv-prod-timedtext/example.m3u8`), false);
		for (const hostname of [host.replace("pv-cdn.net", "example.net"), `${host}.example.net`]) {
			const other = `https://${hostname}/dm/example/`;
			assert.equal(master.test(`${other}${id}.m3u8`), false);
			assert.equal(subtitles.test(`${other}${id}_subtitles.m3u8?subtype=Official`), false);
			assert.equal(timedtext.test(`${other}aiv-prod-timedtext/example.m3u8?subtype=Translate`), false);
		}
	});
}
