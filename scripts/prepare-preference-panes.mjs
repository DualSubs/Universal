import { mkdir, readFile, writeFile } from "node:fs/promises";
import { ArgumentsBuilder } from "@nsnanocat/arguments-builder";
import { panels, devPanels } from "../arguments-builder.PreferencePanes.config.ts";

const suffix = process.argv.includes("--dev") ? ".dev" : "";
const definitions = suffix ? devPanels : panels;
const metadata = JSON.parse(await readFile(`template/boxjs.panels${suffix}.json`, "utf8"));
await mkdir("dist", { recursive: true });
for (const definition of definitions) {
	const source = metadata.apps.find(app => app.id.replace(/\.beta$/, "") === definition.id);
	const { scope, args, ...details } = definition;
	const settings = new ArgumentsBuilder({ args }).buildBoxJsSettings(scope);
	await writeFile(`dist/${definition.id}${suffix}.PreferencePanes.json`, JSON.stringify({ ...source, ...details, settings }));
}
