const path = require('path');

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		"Master.m3u8.response": './src/Master.m3u8.response.beta.js',
		"Subtitles.m3u8.response": './src/Subtitles.m3u8.response.beta.js',
		"Composite.Subtitles.response": './src/Composite.Subtitles.response.beta.js',
		"Translator.response": './src/Translator.response.beta.js',
		"External.Lyrics.response": './src/External.Lyrics.response.beta.js',
	},
	output: {
		filename: '[name].beta.js',
		path: path.resolve(__dirname, 'js'),
		//clean: true,
	},
};
