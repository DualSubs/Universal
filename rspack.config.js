import { defineConfig } from "@rspack/cli";
import rspack from "@rspack/core";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
	entry: {
		"Composite.Subtitles.response": "./src/Composite.Subtitles.response.js",
		"External.Lyrics.response": "./src/External.Lyrics.response.js",
		"Manifest.response": "./src/Manifest.response.js",
		"Translate.response": "./src/Translate.response.js",
	},
	output: {
		filename: "[name].bundle.js",
	},
	plugins: [
		new NodePolyfillPlugin({
			//additionalAliases: ['console'],
		}),
		new rspack.BannerPlugin({
			banner: `console.log('Date: ${new Date().toLocaleString("zh-CN", { timeZone: "PRC" })}');`,
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: `console.log('Version: ${pkg.version}');`,
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: "console.log('[file]');",
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: `console.log('${pkg.displayName}');`,
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: pkg.homepage,
		}),
	],
	devtool: false,
	performance: false,
});
