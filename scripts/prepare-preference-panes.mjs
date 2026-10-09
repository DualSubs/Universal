import { mkdir, readFile, writeFile } from "node:fs/promises";
import pkg from "../package.json" with { type: "json" };

const suffix = process.argv.includes("--dev") ? ".dev" : "";
const { apps } = JSON.parse(await readFile(`template/boxjs.panels${suffix}.json`, "utf8"));
const version = process.env.BUILD_VERSION || pkg.version || "0.0.0";
await mkdir("dist", { recursive: true });
// 非原生 Mock 平台只生成配置响应，不负责页面或持久化。
// Non-native Mock platforms receive a config-only response, without pages or persistence.
for (const source of apps) {
	const app = { ...source, id: source.id.replace(/\.beta$/, "") };
	const panel = app.id.slice("DualSubs.".length).replaceAll(".", "_");
	if (panel === "Universal") app.cachePath = "@DualSubs.Composite.Caches";
	if (panel === "API_External") app.settings.push({ id: "@DualSubs.API.Settings.URL", name: "[外部字幕] 字幕文件 URL", type: "text", val: "", desc: "外挂字幕文件的完整 HTTP(S) 地址；启用外挂字幕时使用。" });
	if (panel.startsWith("API_")) app.resetPaths = [...new Set(app.settings.map(field => field.id.split(".").slice(0, 4).join(".")))];
	const body = JSON.stringify(app);
	await writeFile(`dist/${app.id}${suffix}.PreferencePanes.json`, body);
	const script = `const response = {status:200,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-PreferencePanes-Version":${JSON.stringify(version)}},body:$request.method === "HEAD" ? "" : ${JSON.stringify(body)}};\n$done(typeof $task === "undefined" ? {response} : {...response,status:"HTTP/1.1 200 OK"});\n`;
	await writeFile(`dist/config${panel === "Universal" ? "" : `.${panel}`}${suffix}.bundle.js`, script);
}
