import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
	{
		input: "src/Manifest.response.beta.js",
		output: {
			file: "js/Manifest.response.beta.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal Manifest β Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
	{
		input: "src/Composite.Subtitles.response.beta.js",
		output: {
			file: "js/Composite.Subtitles.response.beta.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal Composite.Subtitles β Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
	{
		input: "src/Translate.response.beta.js",
		output: {
			file: "js/Translate.response.beta.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal Translate β Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
	{
		input: "src/External.Lyrics.response.beta.js",
		output: {
			file: "js/External.Lyrics.response.beta.js",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿️ DualSubs: 🎦 Universal External.Lyrics β Response')",
			format: "es"
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
];
