import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";

export default [
	{
		input: 'src/M3U8.Master.response.beta.js',
		output: {
			file: 'js/M3U8.Master.response.beta.js',
			//format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/M3U8.Subtitles.response.beta.js',
		output: {
			file: 'js/M3U8.Subtitles.response.beta.js',
			//format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/Composite.Subtitles.response.beta.js',
		output: {
			file: 'js/Composite.Subtitles.response.beta.js',
			//format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/Translate.response.beta.js',
		output: {
			file: 'js/Translate.response.beta.js',
			format: 'es'
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/External.Lyrics.response.beta.js',
		output: {
			file: 'js/External.Lyrics.response.beta.js',
			//format: 'es'
		},
		plugins: [json(), commonjs()]
	},
];
