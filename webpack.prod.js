const path = require('path');

module.exports = {
	mode: "production",
	devtool: false,
	entry: {
		"M3U8.Master.response": './src/M3U8.Master.response.js',
		"M3U8.Subtitles.response": './src/M3U8.Subtitles.response.js',
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
