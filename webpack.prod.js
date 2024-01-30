const path = require('path');

module.exports = {
	mode: "production",
	devtool: false,
	entry: {
		"Master.m3u8.response": './src/Master.m3u8.response.js',
		"Subtitles.m3u8.response": './src/Subtitles.m3u8.response.js',
		"Composite.Subtitles.response": './src/Composite.Subtitles.response.js',
		"Translator.response": './src/Translator.response.js',
		"External.Lyrics.response": './src/External.Lyrics.response.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'js'),
		//clean: true,
	},
};
