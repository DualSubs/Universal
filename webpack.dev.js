const path = require('path');

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		"Master.m3u8.response": './src/Master.m3u8.response.beta.js',
		"Subtitles.m3u8.response": './src/Subtitles.m3u8.response.beta.js',
		"Subtitles.Composite.response": './src/Subtitles.Composite.response.beta.js',
		"Translator.response": './src/Translator.response.beta.js',
		"Lyrics.External.response": './src/Lyrics.External.response.beta.js',
	},
	output: {
		filename: '[name].beta.js',
		path: path.resolve(__dirname, 'js'),
		//clean: true,
	},
};
