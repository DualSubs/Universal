import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default [
	{
		input: "src/Manifest.response.js",
		output: {
			file: "js/Manifest.response.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal Manifest Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
	{
		input: "src/Composite.Subtitles.response.js",
		output: {
			file: "js/Composite.Subtitles.response.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal Composite.Subtitles Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
	{
		input: "src/Translate.response.js",
		output: {
			file: "js/Translate.response.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal Translate Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
	{
		input: "src/External.Lyrics.response.js",
		output: {
			file: "js/External.Lyrics.response.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal External.Lyrics Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
];
