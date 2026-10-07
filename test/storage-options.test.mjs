import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

const setENV = new URL("../src/function/setENV.mjs", import.meta.url).href;
const database = new URL("../src/function/database.mjs", import.meta.url).href;
const persisted = {
	Universal: { Settings: { Storage: "database", Languages: ["ES", "JA"], Types: [] } },
	Composite: { Caches: { Playlists: { Master: JSON.stringify([["master.m3u8", { language: "ES" }]]) } } },
};

for (const [name, argument, languages, types] of [
	["defaults to plugin settings even if BoxJs contains a Storage value", "Languages=EN,ZH&Types=Translate", ["EN", "ZH"], ["Translate"]],
	["keeps persisted settings available when no plugin arguments are provided", undefined, ["ES", "JA"], []],
	["PersistentStore gives BoxJs priority and lets an empty array clear defaults", { Storage: "PersistentStore", Languages: ["EN", "ZH"], Types: "Translate" }, ["ES", "JA"], []],
	["Argument gives plugin settings priority", 'Storage="Argument"&Languages[0]="EN"&Languages[1]="ZH"&Types="Translate"', ["EN", "ZH"], ["Translate"]],
	["database ignores custom settings while retaining subtitle caches", { Storage: "database", Languages: ["DE", "FR"], Types: [] }, ["AUTO", "ZH"], ["Official", "Translate"]],
]) {
	test(`setENV ${name}`, () => {
		// Fresh processes keep util's normalized argument snapshot and database
		// mutations separate. The actual package reads a simulated Surge store.
		const result = JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", `
			globalThis.$environment = { "surge-version": "test" };
			globalThis.$argument = ${JSON.stringify(argument)};
			globalThis.$persistentStore = { read: () => ${JSON.stringify(JSON.stringify(persisted))} };
			console.log = () => {};
			const { default: setENV } = await import(${JSON.stringify(setENV)});
			const { default: database } = await import(${JSON.stringify(database)});
			const result = setENV("DualSubs", ["Universal", "Composite"], database);
			process.stdout.write(JSON.stringify({
				languages: result.Settings.Languages,
				types: result.Settings.Types,
				cachedLanguage: result.Caches.Playlists.Master.get("master.m3u8").language,
			}));
		`], { encoding: "utf8" }));
		assert.deepEqual(result.languages, languages);
		assert.deepEqual(result.types, types);
		assert.equal(result.cachedLanguage, "ES");
	});
}
