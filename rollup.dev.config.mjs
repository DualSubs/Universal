import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json" with { type: "json" };
import { configAsset } from "./rollup.config.mjs";

const banner = chunk =>
	`console.log('Date: ${new Date().toLocaleString("zh-CN", { timeZone: "PRC" })}');\nconsole.log('Version: ${process.env.BUILD_VERSION || pkg.version || "dev"}');\nconsole.log('${chunk.fileName}');\nconsole.log('${pkg.displayName} β');\n/* 项目主页：${pkg.homepage} */\n/* Project homepage: ${pkg.homepage} */`;

export default [
	{ input: "./src/Composite.Subtitles.response.dev.js", output: { file: "./dist/Composite.Subtitles.response.dev.bundle.js", format: "es", banner }, plugins: [nodeResolve(), commonjs(), configAsset(".dev")] },
	{ input: "./src/External.Lyrics.response.dev.js", output: { file: "./dist/External.Lyrics.response.dev.bundle.js", format: "es", banner }, plugins: [nodeResolve(), commonjs()] },
	{ input: "./src/Manifest.response.dev.js", output: { file: "./dist/Manifest.response.dev.bundle.js", format: "es", banner }, plugins: [nodeResolve(), commonjs()] },
	{ input: "./src/Translate.response.dev.js", output: { file: "./dist/Translate.response.dev.bundle.js", format: "es", banner }, plugins: [nodeResolve(), commonjs()] },
];
