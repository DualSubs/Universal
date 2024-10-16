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
			banner: `console.log('version: ${pkg.version}');`,
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: "console.log('[name]');",
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: "console.log('🍿️ DualSubs: 🔣 Universal');",
			raw: true,
		}),
		new rspack.BannerPlugin({
			banner: "https://DualSubs.github.io",
		}),
	],
	performance: false,
});
