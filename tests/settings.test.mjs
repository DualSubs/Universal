import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { ArgumentsBuilder } from "@nsnanocat/arguments-builder";
import { panels, devPanels } from "../arguments-builder.PreferencePanes.config.ts";

const suffix = process.env.SETTINGS_CHANNEL === "dev" ? ".dev" : "";

test("every BoxJS panel is delivered intact on both proxy transports and keeps HEAD bodyless", async () => {
	{
		const { apps } = JSON.parse(await readFile(`template/boxjs.panels${suffix}.json`, "utf8"));
		for (const expected of apps) {
			const id = expected.id.replace(/\.beta$/, "");
			const panel = id.slice("DualSubs.".length).replaceAll(".", "_");
			const app = JSON.parse(await readFile(`dist/${id}${suffix}.PreferencePanes.json`, "utf8"));
			const definition = (suffix ? devPanels : panels).find(panel => panel.id === id);
			assert.deepEqual(app.settings, JSON.parse(JSON.stringify(new ArgumentsBuilder({ args: definition.args }).buildBoxJsSettings(definition.scope))));
			const source = await readFile(`dist/config${panel === "Universal" ? "" : `.${panel}`}${suffix}.bundle.js`, "utf8");
			for (const method of ["GET", "HEAD"])
				for (const quantumult of [false, true]) {
					let result;
					vm.runInNewContext(source, {
						$request: { method },
						...(quantumult ? { $task: {} } : {}),
						$done: response => {
							result = quantumult ? response : response.response;
						},
					});
					assert.equal(result.status, quantumult ? "HTTP/1.1 200 OK" : 200);
					assert.ok(result.headers["X-PreferencePanes-Version"]);
					if (method === "HEAD") assert.equal(result.body, "");
					else {
						assert.deepEqual(JSON.parse(result.body), app);
						assert.equal(
							app.settings.some(field => field.id.endsWith(".Storage")),
							false,
						);
					}
				}
		}
	}
});

test("subtitle runtime defaults to persisted settings and retains explicit argument precedence", async () => {
	const storage = new Map([["DualSubs", JSON.stringify({ Universal: { Settings: { Languages: ["EN", "JA"], Position: "Forward", Vendor: "Microsoft", ShowOnly: true } } })]]);
	globalThis.$environment = { "surge-version": "test" };
	globalThis.$persistentStore = {
		read: key => storage.get(key),
		write: (value, key) => {
			storage.set(key, value);
			return true;
		},
	};
	const { default: setENV } = await import("../src/function/setENV.mjs");
	const { default: database } = await import("../src/function/database.mjs");
	try {
		for (const modules of [
			["Universal", "Composite"],
			["Universal", "Translate", "API"],
		]) {
			globalThis.$argument = { Languages: ["AUTO", "ZH"], Position: "Reverse", LogLevel: "OFF" };
			const { Settings } = setENV("DualSubs", modules, database);
			assert.deepEqual(Settings.Languages, ["EN", "JA"]);
			assert.equal(Settings.Position, "Forward");
			assert.equal(Settings.ShowOnly, true);
			globalThis.$argument.Storage = "Argument";
			assert.deepEqual(setENV("DualSubs", modules, database).Settings.Languages, ["AUTO", "ZH"]);
		}
	} finally {
		delete globalThis.$environment;
		delete globalThis.$persistentStore;
		delete globalThis.$argument;
	}
});

test("external subtitle runtime reads the saved source and API URL with compositor preferences", { timeout: 10000 }, async () => {
	const source = await readFile(`dist/Composite.Subtitles.response${suffix}.bundle.js`, "utf8");
	const settings = {
		Universal: { Settings: { Languages: ["EN", "ZH"] } },
		External: { Settings: { SubVendor: "URL" } },
		Composite: { Settings: { Position: "Forward", Tolerance: 1600 } },
		API: { Settings: { URL: "https://example.test/external.vtt" } },
	};
	const requests = [];
	const result = await new Promise(resolve =>
		vm.runInNewContext(source, {
			$environment: { "surge-version": "test" },
			$script: { startTime: Date.now() / 1000 },
			$argument: { Storage: "PersistentStore", LogLevel: "OFF" },
			$persistentStore: { read: key => (key === "DualSubs" ? JSON.stringify(settings) : null) },
			$request: { url: "https://example.test/original.vtt?subtype=External", headers: {} },
			$response: { status: 200, headers: { "Content-Type": "text/vtt" }, body: "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nOriginal\n\n" },
			$httpClient: {
				get: (request, callback) => {
					requests.push(request.url);
					callback(null, { status: 200, headers: { "Content-Type": "text/vtt" } }, "WEBVTT\n\n00:00:02.500 --> 00:00:03.500\nExternal\n\n");
				},
			},
			$done: resolve,
			console,
		}),
	);
	assert.deepEqual(requests, [settings.API.Settings.URL]);
	assert.match(result.body, /Original\nExternal/);
});

test("every platform intercepts storage and configuration while leaving online pages untouched", async () => {
	for (const platform of ["surge", "loon", "quantumultx", "shadowrocket", "stash"])
		for (const channel of ["", ".dev"]) {
			const template = await readFile(`template/${platform}${channel}.handlebars`, "utf8");
			const patterns = template
				.split("\n")
				.filter(
					line =>
						line.includes("dualsubs\\.github\\.io") &&
						(line.includes("data-type=file") || line.includes("response.body.mock_file") || line.includes("url echo-response") || line.includes("url script-echo-response") || line.includes("pattern=") || line.includes("http-request") || line.trim().startsWith("- ^") || line.trim().startsWith("- match:")),
				)
				.map(line => {
					const source = line.startsWith("response if") ? line.match(/~= \/(.+)\/[a-z]* then/)[1] : line.includes("pattern=") ? line.match(/pattern=([^,]+)/)[1] : line.match(/(\^https[^ ]+)/)[1];
					return { line, regex: new RegExp(source) };
				});
			for (const [path, artifact] of [
				["/api/set", "api.js"],
				["/api/get", "api.js"],
				["/api/delete", "api.js"],
			]) {
				const matches = patterns.filter(({ regex }) => regex.test(`https://dualsubs.github.io${path}?v=1`));
				assert.equal(matches.length, 1, `${platform}${channel}: ${path}`);
				if (platform === "stash" && path.startsWith("/api/")) assert.match(matches[0].line, /get\|set\|delete/);
				else assert.ok(matches[0].line.includes(`/download/v1.3.1/${artifact}`), `${platform}${channel}: ${artifact}`);
			}
			const { apps } = JSON.parse(await readFile(`template/boxjs.panels${channel}.json`, "utf8"));
			for (const app of apps) {
				const id = app.id.replace(/\.beta$/, "");
				const panel = id.slice("DualSubs.".length).replaceAll(".", "_");
				const matches = patterns.filter(({ regex }) => regex.test(`https://dualsubs.github.io/api/${panel}?v=1`));
				assert.equal(matches.length, 1, `${platform}${channel}: ${panel}`);
				const artifact = ["stash", "shadowrocket"].includes(platform) ? `config${panel === "Universal" ? "" : `.${panel}`}${channel}.bundle.js` : `${id}${channel}.PreferencePanes.json`;
				if (platform !== "stash") assert.ok(matches[0].line.includes(artifact));
				else assert.ok(template.includes(artifact));
			}
			for (const path of ["/api/YouTube", "/api/Netflix", "/api/Spotify", "/settings/", "/settings/Universal", "/settings/Universal/", "/settings/API", "/settings/assets/index.mjs", "/settings/index.html", "/settings/home.json", "/settings/theme.css", "/settings/bridge.mjs", "/settings/assets/Universal.png", "/settings/assets/host.mjs", "/api/Universal/set", "/api/set/", "/settings/assets/host.mjs/evil", "/settings/Universal/evil"])
				assert.equal(
					patterns.some(({ regex }) => regex.test(`https://dualsubs.github.io${path}`)),
					false,
					`${platform}${channel}: ${path}`,
				);
			for (const [url] of template.matchAll(/https:\/\/[^\s"',)]+/g))
				assert.equal(patterns.some(({ regex }) => regex.test(url)), false, `${platform}${channel}: resource download intercepted: ${url}`);
		}
});

test("development deployment updates scripts, panels and subscriptions in one payload", { skip: suffix !== ".dev" }, async () => {
	const workflow = await readFile(".github/workflows/deploy.yml", "utf8");
	const script = workflow.match(/node --input-type=module <<'JS'\n([\s\S]+?)\n\s+JS/)[1];
	const directory = await mkdtemp(path.join(tmpdir(), "dualsubs-settings-deploy-"));
	try {
		await symlink(path.resolve("dist"), path.join(directory, "dist"));
		execFileSync(process.execPath, ["--input-type=module"], { cwd: directory, input: script });
		const { files } = JSON.parse(await readFile(path.join(directory, "gist-update.json"), "utf8"));
		const { apps } = JSON.parse(await readFile("template/boxjs.panels.dev.json", "utf8"));
		const expected = [];
		for (const app of apps) {
			const id = app.id.replace(/\.beta$/, "");
			const panel = id.slice("DualSubs.".length).replaceAll(".", "_");
			for (const name of [`${id}.dev.PreferencePanes.json`, `config${panel === "Universal" ? "" : `.${panel}`}.dev.bundle.js`]) {
				expected.push(name);
				assert.equal(files[name]?.content, await readFile(`dist/${name}`, "utf8"), name);
			}
		}
		for (const name of Object.keys(files)) assert.equal(files[name].content, await readFile(`dist/${name}`, "utf8"));
		for (const name of expected) assert.ok(files[name]);
		for (const name of ["Composite.Subtitles.response", "External.Lyrics.response", "Manifest.response", "Translate.response"]) assert.ok(files[`${name}.dev.bundle.js`]);
		assert.ok(files["DualSubs.Universal.dev.yaml"]);
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});


test("the bundled translator signs and translates subtitles without Node crypto or require", { timeout: 10000 }, async () => {
	const source = await readFile(`dist/Translate.response${suffix}.bundle.js`, "utf8");
	const settings = {
		Universal: { Settings: { Languages: ["EN", "ZH"] } },
		Translate: { Settings: { Vendor: "BaiduFanyi", Method: "Part", ShowOnly: true } },
		API: { Settings: { BaiduFanyi: { id: "test-id", key: "test-key" } } },
	};
	const requests = [];
	const result = await new Promise(resolve => vm.runInNewContext(source, {
		console,
		$environment: { "surge-version": "test" },
		$script: { startTime: Date.now() / 1000 },
		$argument: { LogLevel: "OFF" },
		$persistentStore: { read: key => key === "DualSubs" ? JSON.stringify(settings) : null },
		$request: { url: "https://example.test/subtitle.vtt?subtype=Translate", headers: {} },
		$response: { status: 200, headers: { "Content-Type": "text/vtt" }, body: "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nHello\n\n" },
		$httpClient: { post: (request, callback) => {
			requests.push(request);
			callback(null, { status: 200, headers: {} }, '{"trans_result":[{"dst":"你好"}]}');
		} },
		$done: resolve,
	}));
	assert.equal(requests.length, 1);
	const params = new URLSearchParams(requests[0].body);
	assert.equal(params.get("sign"), createHash("md5").update(`test-idHello${params.get("salt")}test-key`).digest("hex"));
	assert.match(result.body, /你好/);
	assert.doesNotMatch(result.body, /Hello/);
});
