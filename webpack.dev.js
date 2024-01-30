const path = require('path');

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		"M3U8.Master.response": './src/M3U8.Master.response.beta.js',
		"M3U8.Subtitles.response": './src/M3U8.Subtitles.response.beta.js',
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
