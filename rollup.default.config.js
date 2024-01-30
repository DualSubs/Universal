import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";

export default [
	{
		input: 'src/M3U8.Master.response.js',
		output: {
			file: 'js/M3U8.Master.response.js',
			format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/M3U8.Subtitles.response.js',
		output: {
			file: 'js/M3U8.Subtitles.response.js',
			format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/Composite.Subtitles.response.js',
		output: {
			file: 'js/Composite.Subtitles.response.js',
			format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/Translate.response.js',
		output: {
			file: 'js/Translate.response.js',
			format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/External.Lyrics.response.js',
		output: {
			file: 'js/External.Lyrics.response.js',
			format: 'es'
		},
		plugins: [json(), commonjs()]
	},
];
