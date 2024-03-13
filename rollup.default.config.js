import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/Manifest.response.js',
		output: {
			file: 'js/Manifest.response.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs(), terser()]
	},
	{
		input: 'src/Composite.Subtitles.response.js',
		output: {
			file: 'js/Composite.Subtitles.response.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs(), terser()]
	},
	{
		input: 'src/Translate.response.js',
		output: {
			file: 'js/Translate.response.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs(), terser()]
	},
	{
		input: 'src/External.Lyrics.response.js',
		output: {
			file: 'js/External.Lyrics.response.js',
			banner: '/* README: https://github.com/DualSubs */',
			format: 'es'
		},
		plugins: [json(), commonjs(), terser()]
	},
];
