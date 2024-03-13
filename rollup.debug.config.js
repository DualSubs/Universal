import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";

export default [
	{
		input: 'src/Manifest.response.beta.js',
		output: {
			file: 'js/Manifest.response.beta.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
		
	},
	{
		input: 'src/Composite.Subtitles.response.beta.js',
		output: {
			file: 'js/Composite.Subtitles.response.beta.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
	},
	{
		input: 'src/Translate.response.beta.js',
		output: {
			file: 'js/Translate.response.beta.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
	},
	{
		input: 'src/External.Lyrics.response.beta.js',
		output: {
			file: 'js/External.Lyrics.response.beta.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs()],
	},
];
