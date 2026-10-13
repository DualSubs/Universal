import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import XML from "@nsnanocat/xml";

const suffix = process.env.SETTINGS_CHANNEL === "dev" ? ".dev" : "";
const english = ["Sage & Vine", "line1\n\tline2\n"];
const chinese = ["餐厅 & 花园", "第一行\n\t第二行\n"];
const original = '<timedtext format="3"><body><p t="0" d="100">Sage &amp; Vine</p><p t="100" d="200">line1\n\tline2\n</p></body></timedtext>';
const translated = '<timedtext format="3"><body><p t="0" d="100">餐厅 &amp; 花园</p><p t="100" d="200">第一行\n\t第二行\n</p></body></timedtext>';

for (const position of ["Forward", "Reverse"]) {
	test(`bundled YouTube compositor preserves XML text and bilingual newlines in ${position} order`, { timeout: 10000 }, async () => {
		const source = await readFile(`dist/Composite.Subtitles.response${suffix}.bundle.js`, "utf8");
		const settings = { YouTube: { Settings: { Languages: ["EN", "ZH"], ShowOnly: false } }, Composite: { Settings: { Position: position, ShowOnly: false } } };
		const requests = [];
		const result = await new Promise(resolve =>
			vm.runInNewContext(source, {
				console,
				$environment: { "surge-version": "test" },
				$script: { startTime: Date.now() / 1000 },
				$argument: { LogLevel: "OFF" },
				$persistentStore: { read: key => (key === "DualSubs" ? JSON.stringify(settings) : null) },
				$request: { url: "https://www.youtube.com/api/timedtext?v=test&caps=asr&lang=en&tlang=zh-Hans&format=srv3&subtype=Official", headers: {} },
				$response: { status: 200, headers: { "Content-Type": "text/xml" }, body: translated },
				$httpClient: {
					get: (request, callback) => {
						requests.push(request.url);
						callback(null, { status: 200, headers: { "Content-Type": "text/xml" } }, original);
					},
				},
				$done: resolve,
			}),
		);
		assert.equal(requests.length, 1);
		assert.equal(new URL(requests[0]).searchParams.has("tlang"), false);
		const cues = XML.parse(result.body).timedtext.body.p;
		assert.equal(cues.length, 2);
		for (const [index, cue] of cues.entries()) {
			assert.equal(cue["@t"], String(index * 100));
			assert.equal(cue["@d"], String((index + 1) * 100));
			assert.equal(cue["#"], (position === "Forward" ? `${english[index]}\n${chinese[index]}` : `${chinese[index]}\n${english[index]}`).trim());
		}
		assert.ok(result.body.includes("Sage &amp; Vine"));
	});

	for (const showOnly of [false, true]) {
		test(`bundled XML translator flattens segments and retains text in ${position} order, ShowOnly=${showOnly}`, { timeout: 10000 }, async () => {
			const source = await readFile(`dist/Translate.response${suffix}.bundle.js`, "utf8");
			const settings = {
				YouTube: { Settings: { Languages: ["EN", "ZH"] } },
				Translate: { Settings: { Vendor: "BaiduFanyi", Method: "Part", Position: position, ShowOnly: showOnly } },
				API: { Settings: { BaiduFanyi: { id: "test-id", key: "test-key" } } },
			};
			const requests = [];
			const segmented = original.replace("Sage &amp; Vine", "<s>Sage</s><s>&amp; Vine</s>");
			const result = await new Promise(resolve =>
				vm.runInNewContext(source, {
					console,
					$environment: { "surge-version": "test" },
					$script: { startTime: Date.now() / 1000 },
					$argument: { LogLevel: "OFF" },
					$persistentStore: { read: key => (key === "DualSubs" ? JSON.stringify(settings) : null) },
					$request: { url: "https://www.youtube.com/api/timedtext?v=test&lang=en&format=srv3&subtype=Translate", headers: {} },
					$response: { status: 200, headers: { "Content-Type": "text/xml" }, body: segmented },
					$httpClient: {
						post: (request, callback) => {
							requests.push(request);
							callback(null, { status: 200, headers: {} }, JSON.stringify({ trans_result: chinese.map(dst => ({ dst })) }));
						},
					},
					$done: resolve,
				}),
			);
			assert.equal(requests.length, 1);
			assert.equal(new URLSearchParams(requests[0].body).get("q"), english.join("\n"));
			const cues = XML.parse(result.body).timedtext.body.p;
			assert.equal(cues.length, 2);
			for (const [index, cue] of cues.entries()) {
				assert.equal(cue["@t"], String(index * 100));
				assert.equal(cue["@d"], String((index + 1) * 100));
				assert.equal(cue.s, undefined);
				assert.equal(cue["#"], showOnly ? chinese[index] : position === "Forward" ? `${english[index]}\n${chinese[index]}` : `${chinese[index]}\n${english[index]}`);
			}
		});
	}
}
