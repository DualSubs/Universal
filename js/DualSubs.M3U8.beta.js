/*
README:https://github.com/DualSubs/DualSubs/
*/

// Original: https://raw.githubusercontent.com/DualSubs-R/Surge/master/DualSub.js

const $ = new Env("DualSubs");

let url = $request.url
let headers = $request.headers

// Default Settings
$.DualSubs = {
	"Disney_Plus": {
		"Settings": {
			"type": "Official", // Official, Google, DeepL, Disable
			"language": "EN-US",
			"sl": "AUTO",
			"tl": "en",
			"position": "Forward", // Forward, Reverse
			"dkey": "null" // DeepL API key
		},
		"Languages": {
			//"BG": "bg", // 保加利亚语
			//"CS": "cs", // 捷克语
			"DA": "da", // 丹麦语
			"DE": "de", // 德文
			//"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en", // 英语（美国）
			"EN-US SDH": "en", // 英语（美国）CC
			"ES": "es-ES", // 西班牙语
			"ES-419": "es-419", // 西班牙语（拉丁美洲）
			"ES-ES": "es-ES", // 西班牙语
			//"ET": "et", // 爱沙尼亚语
			"FI": "fi", // 芬兰语
			"FR": "fr-FR", // 法语
			//"HU": "hu", // 匈牙利语
			"IT": "it", // 意大利语
			"JA": "ja", // 日语
			//"KO": "ko", // 韩语
			//"LT": "lt", // 立陶宛语
			//"LV": "lv", // 拉脱维亚语
			"NL": "nl", // 荷兰语
			"NO": "no", // 挪威语
			//"PL": "pl", // 波兰语
			"PT-PT": "pt-PT", // 葡萄牙语
			"PT-BR": "pt-BR", // 葡萄牙语(巴西)
			//"RO": "ro", // 罗马尼亚语
			//"RU": "ru", // 俄罗斯
			//"SK": "sk", // 斯洛伐克语
			//"SL": "sl", // 斯洛文尼亚语
			"SV": "sv", // 瑞典语
			"IS": "is", // 冰岛语
			"ZH-CN": "zh-Hans", // 中文（简体）
			"ZH-HK": "zh-HK", // 中文（香港）
			"ZH-TW": "zh-Hant" // 中文（繁体）
		}
	},
	"Prime_Video": {
		"Settings": {
			"type": "Official", // Official, Google, DeepL, Disable
			"language": "EN-US",
			"sl": "AUTO",
			"tl": "en",
			"position": "Forward", // Forward, Reverse
			"dkey": "null" // DeepL API key
		},
		"Languages": {
			"AR": "ar-001", // 阿拉伯语
			//"BG": "bg", // 保加利亚语
			"CS": "cs-cz", // 捷克语
			"DA": "da-dk", // 丹麦语
			"DE": "de-de", // 德文
			"EL": "el-gr", // 希腊语
			"EN-GB": "en-gb", // 英语（英国）
			"EN-US": "en-us", // 英语（美国）
			"EN-US SDH": "en-us", // 英语（美国）CC
			"ES": "es-ES", // 西班牙语
			"ES-419": "es-419", // 西班牙语（拉丁美洲）
			"ES-ES": "es-es", // 西班牙语
			//"ET": "et", // 爱沙尼亚语
			"FI": "fi-fi", // 芬兰语
			"FR": "fr-fr", // 法语
			"HU": "hu-hu", // 匈牙利语
			"ID": "id-id", // 印尼语
			"IT": "it-it", // 意大利语
			"JA": "ja-jp", // 日语
			"KO": "ko-kr", // 韩语
			//"LT": "lt", // 立陶宛语
			//"LV": "lv", // 拉脱维亚语
			"NL": "nl-nl", // 荷兰语
			"NO": "nb-no", // 挪威语
			"PL": "pl-pl", // 波兰语
			"PT-PT": "pt-pt", // 葡萄牙语
			"PT-BR": "pt-br", // 葡萄牙语(巴西)
			"RO": "ro-ro", // 罗马尼亚语
			"RU": "ru-ru", // 俄罗斯语
			//"SK": "sk", // 斯洛伐克语
			//"SL": "sl", // 斯洛文尼亚语
			"SV": "sv-se", // 瑞典语
			//"IS": "is", // 冰岛语
			"ZH-CN": "zh-Hans", // 中文（简体）
			//"ZH-HK": "zh-HK", // 中文（香港）
			"ZH-TW": "zh-Hant" // 中文（繁体）
		}
	},
	"HBO_Max": {
		"Settings": {
			"type": "Official", // Official, Google, DeepL, Disable
			"lang": "English CC",
			"sl": "AUTO",
			"tl": "en-US SDH",
			"position": "Forward", // Forward, Reverse
			"dkey": "null" // DeepL API key
		},
		"Languages": {
			"BG": "bg-BG", // 保加利亚语
			//"CS": "cs", // 捷克语
			"DA": "da-DK", // 丹麦语
			//"DE": "de", // 德文
			//"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en-US", // 英语（美国）
			"EN-US SDH": "en-US SDH", // 英语（美国）CC
			"ES": "es-419", // 西班牙语
			"ES-419": "es-419", // 西班牙语（拉丁美洲）
			"ES-ES": "es-ES", // 西班牙语
			"ET": "et-EE", // 爱沙尼亚语
			//"FI": "fi", // 芬兰语
			//"FR": "fr", // 法语
			"HU": "hu-HU", // 匈牙利语
			"IT": "it", // 意大利语
			//"JA": "ja", // 日语
			//"KO": "ko", // 韩语
			"LT": "lt-LT", // 立陶宛语
			"LV": "lv-LV", // 拉脱维亚语
			"NL": "nl-NL", // 荷兰语
			"PL": "pl-PL", // 波兰语
			"PT-PT": "pt-PT", // 葡萄牙语
			"PT-BR": "pt-BR", // 葡萄牙语(巴西)
			"RO": "ro-RO", // 罗马尼亚语
			"RU": "ru-RU", // 俄罗斯
			"SK": "sk-SK", // 斯洛伐克语
			"SL": "sl-SI", // 斯洛文尼亚语
			"SV": "sv-SE", // 瑞典语
			"ZH-CN": "zh-CN", // 中文（中国）
			"ZH-HK": "zh-HK", // 中文（香港）
			"ZH-TW": "zh-TW" // 中文（台湾）
		}
	},
	"Paramount_Plus": {
		"Settings": {
			"type": "Google", // Google, DeepL, Disable
			"lang": "English",
			"sl": "auto",
			"tl": "en",
			"position": "Forward", // Forward, Reverse
			"dkey": "null" // DeepL API key
		}
	},
	"Netflix": {
		"Settings": {
			"type": "Google", // Google, DeepL, Disable
			"lang": "English",
			"sl": "AUTO",
			"tl": "en",
			"position": "Forward", // Forward, Reverse
			"dkey": "null" // DeepL API key
		}
	},
	"YouTube": {
		"Settings": {
			"type": "Enable", // Enable, Disable
			"lang": "English",
			"sl": "AUTO",
			"tl": "en"
		},
		"Languages": {
			"BG": "bg-BG", // 保加利亚语
			//"CS": "cs", // 捷克语
			"DA": "da-DK", // 丹麦语
			//"DE": "de", // 德文
			//"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en-US", // 英语（美国）
			"EN-US SDH": "en-US SDH", // 英语（美国）CC
			"ES": "es-419", // 西班牙语
			"ES-419": "es-419", // 西班牙语（拉丁美洲）
			"ES-ES": "es-ES", // 西班牙语
			"ET": "et-EE", // 爱沙尼亚语
			//"FI": "fi", // 芬兰语
			//"FR": "fr", // 法语
			"HU": "hu-HU", // 匈牙利语
			"IT": "it", // 意大利语
			//"JA": "ja", // 日语
			//"KO": "ko", // 韩语
			"LT": "lt-LT", // 立陶宛语
			"LV": "lv-LV", // 拉脱维亚语
			"NL": "nl-NL", // 荷兰语
			"PL": "pl-PL", // 波兰语
			"PT-PT": "pt-PT", // 葡萄牙语
			"PT-BR": "pt-BR", // 葡萄牙语(巴西)
			"RO": "ro-RO", // 罗马尼亚语
			"RU": "ru-RU", // 俄罗斯
			"SK": "sk-SK", // 斯洛伐克语
			"SL": "sl-SI", // 斯洛文尼亚语
			"SV": "sv-SE", // 瑞典语
			"ZH-CN": "zh-Hans", // 中文（简体）
			"ZH-HK": "zh-Hant-HK", // 中文（香港）
			"ZH-TW": "zh-Hant" // 中文（繁体）
		}
	},
	"Google": {
		"Languages": {
			"BG": "bg", // 保加利亚语
			"CS": "cs", // 捷克语
			"DA": "da", // 丹麦语
			"DE": "de", // 德文
			"EL": "el", // 希腊语
			"EN-GB": "en", // 英语（英国）
			"EN-US": "en", // 英语（美国）
			"EN-US SDH": "en", // 英语（美国）CC
			"ES": "es", // 西班牙文
			"ES-419": "es", // 西班牙语（拉丁美洲）
			"ES-ES": "es", // 西班牙文
			"ET": "et", // 爱沙尼亚语
			"FI": "fi", // 芬兰语
			"FR": "fr", // 法语
			"HU": "hu", // 匈牙利语
			"IT": "it", // 意大利语
			"JA": "ja", // 日语
			"KO": "ko", // 韩语
			"LT": "lt", // 立陶宛语
			"LV": "lv", // 拉脱维亚语
			"NL": "nl", // 荷兰语
			"PL": "pl", // 波兰语
			"PT-PT": "pt", // 葡萄牙语
			"PT-BR": "pt", // 葡萄牙语(巴西)
			"RO": "ro", // 罗马尼亚语
			"RU": "ru", // 俄罗斯
			"SK": "sk", // 斯洛伐克语
			"SL": "sl", // 斯洛文尼亚语
			"SV": "sv", // 瑞典语
			"ZH-CN": "zh-CN", // 中文（中国）
			"ZH-HK": "zh-HK", // 中文（香港）
			"ZH-TW": "zh-TW" // 中文（台湾）
		}
	},
	"DeepL": {
		"Languages": {
			"AUTO": "", // 自动识别
			"BG": "BG", // 保加利亚语
			"CS": "CS", // 捷克语
			"DA": "DA", // 丹麦语
			"DE": "de", // 德文
			"EL": "el", // 希腊语
			"EN": "EN", // 英语（英国）
			"EN-GB": "EN-GB", // 英语（英国）
			"EN-US": "EN-US", // 英语（美国）
			"EN-US SDH": "EN-US", // 英语（美国）CC
			"ES": "ES", // 西班牙文
			"ES-419": "ES", // 西班牙语（拉丁美洲）
			"ES-ES": "ES", // 西班牙文
			"ET": "ET", // 爱沙尼亚语
			"FI": "FI", // 芬兰语
			"FR": "FR", // 法语
			"HU": "HU", // 匈牙利语
			"IT": "IT", // 意大利语
			"JA": "JA", // 日语
			//"KO": "ko", // 韩语
			"LT": "LT", // 立陶宛语
			"LV": "LV", // 拉脱维亚语
			"NL": "NL", // 荷兰语
			"PL": "PL", // 波兰语
			"PT": "PT", // 葡萄牙语
			"PT-PT": "PT-PT", // 葡萄牙语
			"PT-BR": "PT-BR", // 葡萄牙语(巴西)
			"RO": "RO", // 罗马尼亚语
			"RU": "RU", // 俄罗斯
			"SK": "SK", // 斯洛伐克语
			"SL": "SL", // 斯洛文尼亚语
			"SV": "SV", // 瑞典语
			"ZH": "ZH" // 中文（简体）
		}
	}
};

/***************** Enviroment *****************/
const Platform = url.match(/(dssott|starott)\.com/i) ? "Disney_Plus"
	: url.match(/(\.hls\.row\.aiv-cdn|-a\.akamaihd|cloudfront)\.net/i) ? "Prime_Video"
		: url.match(/\.(api\.hbo|hbomaxcdn)\.com/i) ? "HBO_Max"
			: url.match(/\.(hulustream|huluim)\.com/i) ? "Hulu"
				: url.match(/\.(uplynk)\.com/i) ? "Discovery_Plus"
					: (url.match(/(cbsaavideo|cbsivideo)\.com/i)) ? "Paramount_plus"
						: url.match(/www\.youtube\.com/i) ? "YouTube"
							: url.match(/\.nflxvideo\.net/i) ? "Netflix"
								: undefined
$.log(`🚧 ${$.name}, Enviroment调试信息`, `Platform内容: ${Platform}`, "");
$.BoxJs = $.getjson("DualSubs", $.DualSubs) // BoxJs
//$.log(`🚧 ${$.name}, Enviroment调试信息`, `$.BoxJs类型: ${typeof $.BoxJs}`, `$.BoxJs内容: ${JSON.stringify($.BoxJs)}`, "");
$.DualSubs[Platform] = Object.assign($.DualSubs[Platform], $.BoxJs[Platform]); // BoxJs
$.Settings = $.DualSubs[Platform].Settings
$.log(`🚧 ${$.name}, Enviroment调试信息`, `$.Settings内容: ${JSON.stringify($.Settings)}`, "");
$.Settings.language = $.DualSubs[$.Settings.type]?.Languages?.[$.Settings.language] ?? $.DualSubs[Platform]?.Languages?.[$.Settings.language] ?? $.Settings.language;
$.log(`🚧 ${$.name}, Language调试信息`, `$.Settings.language内容: ${$.Settings.language}`, "");
// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
$.Cache = $.DualSubs[Platform]?.Cache || {};
//$.log(`🚧 ${$.name}, Enviroment调试信息`, `$.Cache类型: ${typeof $.Cache}`, `$.Cache内容: ${$.Cache}`, "");
if (typeof $.Cache == "string" && $.Cache != "") $.Cache = JSON.parse($.Cache)
$.log(`🚧 ${$.name}, Enviroment调试信息`, `$.Cache类型: ${typeof $.Cache}`, `$.Cache内容: ${JSON.stringify($.Cache)}`, "");
//if (ENV) $.Cache = (Platform == "Disney_Plus") ? $.Cache[ENV.UUID] : $.Cache;

/***************** Processing *****************/
!(async () => {
	$.log(`🚧 ${$.name}, V0.2.1`, "");
	const ENV = await getENV(Platform);
	if ($.Settings.type == "Disable") $.done()
	else if (Platform == "YouTube") {
		if (url.match(`lang=${$.Settings.language}`) || url.match(/&tlang=/)) $.done();
		else $.done({ url: `${url}&tlang=${$.Settings.language}` });
	} else if ($.Settings.type == "Official") {
		$.log(`🚧 ${$.name}, 调试信息`, `*.m3u8`, "");
		if (Platform == "Disney_Plus") {
			$.Cache[ENV.UUID] = {};
			$.Cache[ENV.UUID].ENV = ENV;
			$.Cache[ENV.UUID].subtitles_M3U8_URL = await getPlaylist(Platform, ENV);
			$.Cache[ENV.UUID].subtitles_VTT_URLs = await getVTTURLs(Platform, ENV);
			$.log(`🚧 ${$.name}`, `$.Cache${ENV.UUID}内容: ${JSON.stringify($.Cache[ENV.UUID])}`, "");
		} else {
			$.Cache.ENV = ENV;
			$.Cache.subtitles_M3U8_URL = await getPlaylist(Platform, ENV)
			$.Cache.subtitles_VTT_URLs = await getVTTURLs(Platform, ENV)
		}
		$.log(`🚧 ${$.name}`, `$.Cache内容: ${JSON.stringify($.Cache)}`, "");
		$.setjson($.Cache, `@DualSubs.${Platform}.Cache`)
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

/***************** Fuctions *****************/
// Function 1
// Get Environment Variables
async function getENV(Platform) {
	$.log(`🚧 ${$.name}, Get Environment Variables`, "");
	// https://vod-llc-ap-west-2.media.dssott.com/ps01/disney/fb1fc2f7-9606-4599-bc6d-930c040fd9fe/cbcs-all-b7129de7-2046-430a-afbf-7a2aa98a97ed-dd284b2b-9ba9-48d2-a969-0856b7d6c071.m3u8?r=1080&a=3&sxl=zh-Hans&hash=067b95e47d9627533c99e7f487b79ef6d464374c
	const Disney_Plus_Regex = /^(?<PATH>https?:\/\/(?<HOST>(?<CDN>.*)\.media\.(?<DOMAIN>dssott|starott)\.com)\/(?:ps01|\w*\d*)\/disney\/(?<UUID>[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})\/)/i
	//$.log(`🚧 ${$.name}, Get Environment Variables调试信息`, `Disney_Plus_Regex内容: ${Disney_Plus_Regex}`, "");
	const Prime_Video_Regex = /^(?<PATH>https?:\/\/(?<HOST>(?<CDN>.*)\.(?<DOMAIN>hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net)\/(.*)\/)(?<UUID>[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})\.(?:m3u8|vtt)$/i
	$.log(`🚧 ${$.name}, Get Environment Variables调试信息`, `Prime_Video_Regex内容: ${Prime_Video_Regex}`, "");
	let env = (Platform == "Disney_Plus") ? url.match(Disney_Plus_Regex)?.groups ?? null
		: (Platform == "Prime_Video") ? url.match(Prime_Video_Regex)?.groups ?? null
			: {};
	$.log(`🚧 ${$.name}, 调试信息`, `Get Environment Variables`, `HOST内容: ${env.HOST}`, `CDN: ${env.CDN}`, `DOMAIN: ${env.DOMAIN}`, `UUID: ${env.UUID}`, "");
	return env
};

// Function 2
// Get Subtitle playlist.m3u8 URL
async function getPlaylist(Platform, env) {
	$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle playlist.m3u8 URL", "");
	//let patt = new RegExp(`TYPE=SUBTITLES.+LANGUAGE="${$.Settings.language}".+URI="([^"]+)`)
	//const Language_Regex = new RegExp(`TYPE=SUBTITLES.+LANGUAGE="${$.Settings.language}".+URI="([^"]+)`)
	const Language_Regex = new RegExp(`TYPE=SUBTITLES.+LANGUAGE="${$.Settings.language}".+URI="(?<subtitles_M3U8_URL>[^"]+)`)
	/***************** Get Subtitle playlist.m3u8 URL *****************/
	let body = $response.body
	if (!body) $.done();
	let subtitles_M3U8_URL = (Platform == "Disney_Plus") ? env.PATH + body.match(Language_Regex)?.groups?.subtitles_M3U8_URL ?? null
		: body.match(Language_Regex)?.groups?.subtitles_M3U8_URL ?? null;
	//let subtitles_M3U8_URL = env.PATH + body.match(Language_Regex)?.groups?.subtitles_M3U8_URL ?? null
	$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle playlist.m3u8 URL", `subtitles_M3U8_URL内容: ${subtitles_M3U8_URL}`, "");
	return subtitles_M3U8_URL
};

// Function 3
// Get Subtitle *.vtt URLs
async function getVTTURLs(Platform, env) {
	let url = (Platform == "Disney_Plus") ? $.Cache[env.UUID].subtitles_M3U8_URL : $.Cache.subtitles_M3U8_URL;
	delete headers["Host"]
	$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `url内容: ${url}`, "");
	$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `headers内容: ${JSON.stringify(headers)}`, "");
	return await $.http.get({ url: url, headers: headers }).then((response) => {
		$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `response.body内容: ${response.body}`, "");
		let subtitles_VTT_URLs = response.body.match(/^.+\.vtt$/gim);
		$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `response.body.match(/^.+\.vtt$/gim)内容: ${subtitles_VTT_URLs}`, "");
		// if 相对路径
		if (/^https?:\/\/(?:.+)\.vtt$/gim.test(subtitles_VTT_URLs) == false) {
			env.PATH = url.match(/(?<PATH>^https?:\/\/(?:.+)\/)(?<fileName>[^\/]+\.m3u8)/i)?.groups?.PATH ?? env.PATH
			subtitles_VTT_URLs = subtitles_VTT_URLs.map(item => item = env.PATH + item)
		};
		// Disney + 筛选字幕
		if (Platform == "Disney_Plus") subtitles_VTT_URLs = subtitles_VTT_URLs.filter(item => /.+-MAIN.+/i.test(item))

		$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `subtitles_VTT_URLs.map内容: ${subtitles_VTT_URLs}`, "");
		return subtitles_VTT_URLs
	})
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
