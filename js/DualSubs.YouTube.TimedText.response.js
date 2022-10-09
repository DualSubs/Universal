/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("🍿️ DualSubs v0.5.10-youtube-timedtext-response");
const URL = new URLs();
const XML = new XMLs();
const VTT = new WebVTT(["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"
const DataBase = {
	"Verify": {
		"Settings":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}}
	},
	"Advanced": {
		"Settings":{"Translator":{"Times":3,"Interval":100,"Exponential":true}}
	},
	"Default": {
		"Settings":{"Switch":true,"Types":["Official","Google","GoogleCloud","Azure","DeepL"],"Type":"Google","Languages":["ZH","EN"],"Language":"ZH","Translate":{"ShowOnly":false},"External":{"URL":null,"Offset":0,"ShowOnly":false},"Position":"Forward","CacheSize":6,"Tolerance":1000},
		"Configs": {
			"Languages":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]}
		}
	},
	"YouTube": {
		"Configs": {
			"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW","YUE":"yue","YUE-HK":"yue-HK"},
			"translationLanguages":[{"languageCode":"sq","languageName":{"simpleText":"阿尔巴尼亚语"}},{"languageCode":"ar","languageName":{"simpleText":"阿拉伯语"}},{"languageCode":"am","languageName":{"simpleText":"阿姆哈拉语"}},{"languageCode":"az","languageName":{"simpleText":"阿塞拜疆语"}},{"languageCode":"ga","languageName":{"simpleText":"爱尔兰语"}},{"languageCode":"et","languageName":{"simpleText":"爱沙尼亚语"}},{"languageCode":"or","languageName":{"simpleText":"奥里亚语"}},{"languageCode":"eu","languageName":{"simpleText":"巴斯克语"}},{"languageCode":"be","languageName":{"simpleText":"白俄罗斯语"}},{"languageCode":"bg","languageName":{"simpleText":"保加利亚语"}},{"languageCode":"is","languageName":{"simpleText":"冰岛语"}},{"languageCode":"pl","languageName":{"simpleText":"波兰语"}},{"languageCode":"bs","languageName":{"simpleText":"波斯尼亚语"}},{"languageCode":"fa","languageName":{"simpleText":"波斯语"}},{"languageCode":"tt","languageName":{"simpleText":"鞑靼语"}},{"languageCode":"da","languageName":{"simpleText":"丹麦语"}},{"languageCode":"de","languageName":{"simpleText":"德语"}},{"languageCode":"ru","languageName":{"simpleText":"俄语"}},{"languageCode":"fr","languageName":{"simpleText":"法语"}},{"languageCode":"fil","languageName":{"simpleText":"菲律宾语"}},{"languageCode":"fi","languageName":{"simpleText":"芬兰语"}},{"languageCode":"km","languageName":{"simpleText":"高棉语"}},{"languageCode":"ka","languageName":{"simpleText":"格鲁吉亚语"}},{"languageCode":"gu","languageName":{"simpleText":"古吉拉特语"}},{"languageCode":"kk","languageName":{"simpleText":"哈萨克语"}},{"languageCode":"ht","languageName":{"simpleText":"海地克里奥尔语"}},{"languageCode":"ko","languageName":{"simpleText":"韩语"}},{"languageCode":"ha","languageName":{"simpleText":"豪萨语"}},{"languageCode":"nl","languageName":{"simpleText":"荷兰语"}},{"languageCode":"gl","languageName":{"simpleText":"加利西亚语"}},{"languageCode":"ca","languageName":{"simpleText":"加泰罗尼亚语"}},{"languageCode":"cs","languageName":{"simpleText":"捷克语"}},{"languageCode":"kn","languageName":{"simpleText":"卡纳达语"}},{"languageCode":"ky","languageName":{"simpleText":"柯尔克孜语"}},{"languageCode":"xh","languageName":{"simpleText":"科萨语"}},{"languageCode":"co","languageName":{"simpleText":"科西嘉语"}},{"languageCode":"hr","languageName":{"simpleText":"克罗地亚语"}},{"languageCode":"ku","languageName":{"simpleText":"库尔德语"}},{"languageCode":"la","languageName":{"simpleText":"拉丁语"}},{"languageCode":"lv","languageName":{"simpleText":"拉脱维亚语"}},{"languageCode":"lo","languageName":{"simpleText":"老挝语"}},{"languageCode":"lt","languageName":{"simpleText":"立陶宛语"}},{"languageCode":"lb","languageName":{"simpleText":"卢森堡语"}},{"languageCode":"rw","languageName":{"simpleText":"卢旺达语"}},{"languageCode":"ro","languageName":{"simpleText":"罗马尼亚语"}},{"languageCode":"mt","languageName":{"simpleText":"马耳他语"}},{"languageCode":"mr","languageName":{"simpleText":"马拉地语"}},{"languageCode":"mg","languageName":{"simpleText":"马拉加斯语"}},{"languageCode":"ml","languageName":{"simpleText":"马拉雅拉姆语"}},{"languageCode":"ms","languageName":{"simpleText":"马来语"}},{"languageCode":"mk","languageName":{"simpleText":"马其顿语"}},{"languageCode":"mi","languageName":{"simpleText":"毛利语"}},{"languageCode":"mn","languageName":{"simpleText":"蒙古语"}},{"languageCode":"bn","languageName":{"simpleText":"孟加拉语"}},{"languageCode":"my","languageName":{"simpleText":"缅甸语"}},{"languageCode":"hmn","languageName":{"simpleText":"苗语"}},{"languageCode":"af","languageName":{"simpleText":"南非荷兰语"}},{"languageCode":"st","languageName":{"simpleText":"南索托语"}},{"languageCode":"ne","languageName":{"simpleText":"尼泊尔语"}},{"languageCode":"no","languageName":{"simpleText":"挪威语"}},{"languageCode":"pa","languageName":{"simpleText":"旁遮普语"}},{"languageCode":"pt","languageName":{"simpleText":"葡萄牙语"}},{"languageCode":"ps","languageName":{"simpleText":"普什图语"}},{"languageCode":"ny","languageName":{"simpleText":"齐切瓦语"}},{"languageCode":"ja","languageName":{"simpleText":"日语"}},{"languageCode":"sv","languageName":{"simpleText":"瑞典语"}},{"languageCode":"sm","languageName":{"simpleText":"萨摩亚语"}},{"languageCode":"sr","languageName":{"simpleText":"塞尔维亚语"}},{"languageCode":"si","languageName":{"simpleText":"僧伽罗语"}},{"languageCode":"sn","languageName":{"simpleText":"绍纳语"}},{"languageCode":"eo","languageName":{"simpleText":"世界语"}},{"languageCode":"sk","languageName":{"simpleText":"斯洛伐克语"}},{"languageCode":"sl","languageName":{"simpleText":"斯洛文尼亚语"}},{"languageCode":"sw","languageName":{"simpleText":"斯瓦希里语"}},{"languageCode":"gd","languageName":{"simpleText":"苏格兰盖尔语"}},{"languageCode":"ceb","languageName":{"simpleText":"宿务语"}},{"languageCode":"so","languageName":{"simpleText":"索马里语"}},{"languageCode":"tg","languageName":{"simpleText":"塔吉克语"}},{"languageCode":"te","languageName":{"simpleText":"泰卢固语"}},{"languageCode":"ta","languageName":{"simpleText":"泰米尔语"}},{"languageCode":"th","languageName":{"simpleText":"泰语"}},{"languageCode":"tr","languageName":{"simpleText":"土耳其语"}},{"languageCode":"tk","languageName":{"simpleText":"土库曼语"}},{"languageCode":"cy","languageName":{"simpleText":"威尔士语"}},{"languageCode":"ug","languageName":{"simpleText":"维吾尔语"}},{"languageCode":"ur","languageName":{"simpleText":"乌尔都语"}},{"languageCode":"uk","languageName":{"simpleText":"乌克兰语"}},{"languageCode":"uz","languageName":{"simpleText":"乌兹别克语"}},{"languageCode":"es","languageName":{"simpleText":"西班牙语"}},{"languageCode":"fy","languageName":{"simpleText":"西弗里西亚语"}},{"languageCode":"iw","languageName":{"simpleText":"希伯来语"}},{"languageCode":"el","languageName":{"simpleText":"希腊语"}},{"languageCode":"haw","languageName":{"simpleText":"夏威夷语"}},{"languageCode":"sd","languageName":{"simpleText":"信德语"}},{"languageCode":"hu","languageName":{"simpleText":"匈牙利语"}},{"languageCode":"su","languageName":{"simpleText":"巽他语"}},{"languageCode":"hy","languageName":{"simpleText":"亚美尼亚语"}},{"languageCode":"ig","languageName":{"simpleText":"伊博语"}},{"languageCode":"it","languageName":{"simpleText":"意大利语"}},{"languageCode":"yi","languageName":{"simpleText":"意第绪语"}},{"languageCode":"hi","languageName":{"simpleText":"印地语"}},{"languageCode":"id","languageName":{"simpleText":"印度尼西亚语"}},{"languageCode":"en","languageName":{"simpleText":"英语"}},{"languageCode":"yo","languageName":{"simpleText":"约鲁巴语"}},{"languageCode":"vi","languageName":{"simpleText":"越南语"}},{"languageCode":"jv","languageName":{"simpleText":"爪哇语"}},{"languageCode":"zh-Hant","languageName":{"simpleText":"中文（繁体）"}},{"languageCode":"zh-Hans","languageName":{"simpleText":"中文（简体）"}},{"languageCode":"zu","languageName":{"simpleText":"祖鲁语"}}]
		}
	},
	"Netflix": {
		"Configs": {
			"Languages":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"}
		}
	},
	"Google": {
		"Configs": {
			"Languages":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"}
		}
	},
	"Microsoft": {
		"Configs": {
			"Languages":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"}
		}
	},
	"DeepL": {
		"Configs": {
			"Languages":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES":"ES","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT-PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}
		}
	}
};

if ($request.method == "OPTIONS") $.done();
if ($response.status != 200 && $response.statusCode != 200) $.done();
//delete $request.headers["Host"]
//delete $request.headers["Connection"]
//delete $request.headers["Range"]

/***************** Processing *****************/
(async () => {
	const { Platform, Settings, Caches, Configs } = await setENV("DualSubs", $request.url, DataBase);
	if (Settings.Switch) {
		let url = URL.parse($request.url);
		$.log(`⚠ ${$.name}, url.path=${url.path}`, "");
		switch (Settings.Translate.ShowOnly) {
			case true:
				$.log(`⚠ ${$.name}, 仅显示翻译后字幕，跳过`, "");
				break;
			case false:
			default:
				if (url?.params?.lang?.includes(Settings?.Language?.toLowerCase())) $.log(`⚠ ${$.name}, 语言相同，跳过`, "");
				else if (url?.params?.lang?.includes(url?.params?.tlang?.toLowerCase())) $.log(`⚠ ${$.name}, 语言相同，跳过`, "");
				else if (!url?.params?.tlang && url?.params?.cplatform === "DESKTOP") $.log(`⚠ ${$.name}, 桌面版未选择翻译语言，跳过`, "");
				else {
					switch (url.params?.kind) {
						case "asr":
							break;
						case "captions":
						default:
							// 创建字幕Object
							let { OriginSub, SecondSub } = await getTimedText(url, { ...$request.headers ?? {}, "x-surge-skip-scripting": "true" }, Configs.Languages[Settings.Language]);
							// 创建双语字幕Object
							let DualSub = {};
							// 设置格式
							const Format = url.params?.format || url.params?.fmt;
							$.log(`🚧 ${$.name}, Format: ${Format}`, "");
							// 处理格式
							switch (Format) {
								case "json3":
									OriginSub = JSON.parse(OriginSub);
									SecondSub = JSON.parse(SecondSub);
									DualSub = await CombineDualSubs(Format, OriginSub, SecondSub, 0, Settings.Tolerance, [Settings.Position]);
									$response.body = JSON.stringify(DualSub);
									break;
								case "srv3":
									OriginSub = XML.parse(OriginSub);
									SecondSub = XML.parse(SecondSub);
									DualSub = await CombineDualSubs(Format, OriginSub, SecondSub, 0, Settings.Tolerance, [Settings.Position]);
									$response.body = XML.stringify(DualSub);
									break;
								case "vtt":
									OriginSub = VTT.parse(OriginSub);
									SecondSub = VTT.parse(SecondSub);
									DualSub = await CombineDualSubs(Format, OriginSub, SecondSub, 0, Settings.Tolerance, [Settings.Position]);
									$response.body = VTT.stringify(DualSub);
								default:
									break;
							};
							break;
					};
				}
				break;
		};
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		if ($.isQuanX()) $.done({ headers: $response.headers, body: $response.body })
		else $.done($response)
	})

/***************** Async Function *****************/
/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default Database
 * @return {Promise<*>}
 */
async function getENV(t,e,n){let i=$.getjson(t,n),s={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((t=>t.split("="))));for(let e in t)f(s,e,t[e])}let g={...n?.Default?.Settings,...n?.[e]?.Settings,...i?.[e]?.Settings,...s},o={...n?.Default?.Configs,...n?.[e]?.Configs,...i?.[e]?.Configs},a=i?.[e]?.Caches||void 0;return"string"==typeof a&&(a=JSON.parse(a)),{Settings:g,Caches:a,Configs:o};function f(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} url - Request URL
 * @param {Object} database - Default DataBase
 * @return {Promise<*>}
 */
async function setENV(name, url, database) {
	$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	/***************** Verify *****************/
	const { Settings: Verify } = await getENV(name, "Verify", database);
	/***************** Advanced *****************/
	let { Settings: Advanced } = await getENV(name, "Advanced", database);
	Advanced.Translator.Times = parseInt(Advanced.Translator?.Times, 10) // BoxJs字符串转数字
	Advanced.Translator.Interval = parseInt(Advanced.Translator?.Interval, 10) // BoxJs字符串转数字
	Advanced.Translator.Exponential = JSON.parse(Advanced.Translator?.Exponential) //  BoxJs字符串转Boolean
	/***************** Platform *****************/
	const Platform = /\.apple\.com/i.test(url) ? "Apple"
		: /\.(dssott|starott)\.com/i.test(url) ? "Disney_Plus"
			: /\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i.test(url) ? "Prime_Video"
				: /\.(api\.hbo|hbomaxcdn)\.com/i.test(url) ? "HBO_Max"
					: /\.(hulustream|huluim)\.com/i.test(url) ? "Hulu"
						: /\.(cbsaavideo|cbsivideo|cbs)\.com/i.test(url) ? "Paramount_Plus"
							: /dplus-ph-/i.test(url) ? "Discovery_Plus_Ph"
								: /\.peacocktv\.com/i.test(url) ? "Peacock_TV"
									: /\.uplynk\.com/i.test(url) ? "Discovery_Plus"
										: /\.fubo\.tv/i.test(url) ? "Fubo_TV"
											: /(\.youtube|youtubei\.googleapis)\.com/i.test(url) ? "YouTube"
												: /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
													: "Universal"
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Platform: ${Platform}`, "");
	/***************** Settings *****************/
	let { Settings, Caches = [], Configs } = await getENV(name, Platform, database);
	if (Platform == "Apple") {
		let platform = /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/subscription\//i.test(url) ? "Apple_TV_Plus"
			: /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/workout\//i.test(url) ? "Apple_Fitness"
				: /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\//i.test(url) ? "Apple_TV"
					: /vod-.*-aoc\.tv\.apple\.com/i.test(url) ? "Apple_TV_Plus"
						: /vod-.*-amt\.tv\.apple\.com/i.test(url) ? "Apple_TV"
							: /(hls|hls-svod)\.itunes\.apple\.com/i.test(url) ? "Apple_Fitness"
								: "Apple"
		$.log(`🚧 ${$.name}, Set Environment Variables`, `platform: ${platform}`, "");
		Settings = await getENV(name, platform, database).then(v=> v.Settings);
	};
	Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
	if (typeof Settings.Types === "string") Settings.Types = Settings.Types.split(",") // BoxJs字符串转数组
	if (Array.isArray(Settings.Types)) {
		if (!Verify.GoogleCloud.Auth) Settings.Types = Settings.Types.filter(e => e !== "GoogleCloud"); // 移除不可用类型
		if (!Verify.Azure.Auth) Settings.Types = Settings.Types.filter(e => e !== "Azure");
		if (!Verify.DeepL.Auth) Settings.Types = Settings.Types.filter(e => e !== "DeepL");
	}
	Settings.Translate.ShowOnly = JSON.parse(Settings.Translate?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.External.Offset = parseInt(Settings.External?.Offset, 10) // BoxJs字符串转数字
	Settings.External.ShowOnly = JSON.parse(Settings.External?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.CacheSize = parseInt(Settings.CacheSize, 10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance, 10) // BoxJs字符串转数字
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	return { Platform, Verify, Advanced, Settings, Caches, Configs };
};

/**
 * Get TimedText
 * @author VirgilClyne
 * @param {Object} url - Parsed Request URL
 * @param {Object} headers - Request Headers
 * @param {String} langcode - langcode
 * @return {Promise<*>}
 */
async function getTimedText(url, headers, langcode) {
	$.log(`⚠ ${$.name}, Get TimedText URLs`, `url: ${JSON.stringify(url)}`, `langcode: ${langcode}`, "");
	// 创建字幕Object
	let OriginSub = {};
	let SecondSub = {};
	if (url.params?.tlang) { // 已选
		SecondSub = $response.body;
		delete url.params?.tlang // 原字幕
		OriginSub = await $.http.get({ "url": URL.stringify(url), "headers": headers }).then(response => response.body);
	} else { // 未选
		OriginSub = $response.body;
		url.params.tlang = langcode; // 翻译字幕
		SecondSub = await $.http.get({ "url": URL.stringify(url), "headers": headers }).then(response => response.body);
	};
	return { OriginSub, SecondSub };
};

/** 
 * Combine Dual Subtitles
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} options - options = ["Forward", "Reverse", "ShowOnly"]
 * @return {Promise<*>}
 */
async function CombineDualSubs(Format = "VTT", Sub1 = {}, Sub2 = {}, Offset = 0, Tolerance = 1000, Options = ["Forward"]) {
	$.log(`⚠ ${$.name}, Combine Dual Subtitles`, `Offset:${Offset}, Tolerance:${Tolerance}, Options:${Options}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	let DualSub = Options.includes("Reverse") ? Sub2 : Sub1
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`let DualSub内容: ${JSON.stringify(DualSub)}`, "");
	// 有序数列 用不着排序
	//FirstSub.body.sort((x, y) => x - y);
	//SecondSub.body.sort((x, y) => x - y);
	const length1 = Sub1?.timedtext?.body?.p?.length ?? Sub1?.events?.length ?? Sub1?.body?.length;
	const length2 = Sub2?.timedtext?.body?.p?.length ?? Sub2?.events?.length ?? Sub2?.body?.length;
	let index0 = 0, index1 = 0, index2 = 0;
	switch (Format) {
		case "json3":
			// 双指针法查找两个数组中的相同元素
			while (index1 < length1 && index2 < length2) {
				//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
				const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
				//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
				const text1 = Sub1.events[index1]?.segs[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs[0].utf8 ?? "";
				//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
				if (Math.abs(timeStamp1 - timeStamp2) <= 0) {
					index0 = Options.includes("Reverse") ? index2 : index1;
					DualSub.events[index0].segs[0].utf8 = Options.includes("Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`;
					//$.log(`🚧`, `DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
					//DualSub.body[index0].tStartMs = Options.includes("Reverse") ? timeStamp2 : timeStamp1;
					//DualSub.body[index0].index = Options.includes("Reverse") ? index2 : index1;
				}
				if (timeStamp2 > timeStamp1) index1++
				else if (timeStamp2 < timeStamp1) index2++
				else index1++; index2++
			};
			break;
		case "srv3":
			// 双指针法查找两个数组中的相同元素
			while (index1 < length1 && index2 < length2) {
				//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
				const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10);
				const timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
				//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
				if (Math.abs(timeStamp1 - timeStamp2) <= 0) {
					index0 = Options.includes("Reverse") ? index2 : index1;
					const text1 = Sub1.timedtext.body.p[index1]?.["#"];
					const text2 = Sub2.timedtext.body.p[index2]?.["#"];
					//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
					if (text1 && text2) {
						DualSub.timedtext.body.p[index0]["#"] = Options.includes("Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`;
						//$.log(`🚧`, `DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
					}
					//DualSub.timedtext.body.p[index0]["@t"] = Options.includes("Reverse") ? timeStamp2 : timeStamp1;
					//DualSub.timedtext.body.p[index0].index = Options.includes("Reverse") ? index2 : index1;
					/*
					const sentences1 = Sub1.timedtext.body.p[index1]?.s;
					const sentences2 = Sub2.timedtext.body.p[index1]?.s;
					if (Array.isArray(sentences1) && Array.isArray(sentences2)) {
						$.log(`🚧`, `sentences1: ${JSON.stringify(sentences1)}`, `sentences2: ${JSON.stringify(sentences2)}`, "");
						sentences1[0]["@t"] = timeStamp1;
						sentences2[0]["@t"] = timeStamp2;
						DualSub.timedtext.body.p[index0].s = [...sentences1, ...sentences2].sort(compare("@t"));
					} else if (sentences1 && sentences2) DualSub.timedtext.body.p[index0].s["#"] = Options.includes("Reverse") ? `${sentences2["#"]}&#x000A;${sentences1["#"]}` : `${sentences1["#"]}&#x000A;${sentences2["#"]}`;
					*/
				};
				if (timeStamp2 > timeStamp1) index1++
				else if (timeStamp2 < timeStamp1) index2++
				else index1++; index2++
			};
			break;
		case "vtt":
			while (index1 < length1 && index2 < length2) {
				//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
				const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
				//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
				const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
				//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
				if (Math.abs(timeStamp1 - timeStamp2) <= 0) {
					index0 = Options.includes("Reverse") ? index2 : index1;
					DualSub.body[index0].text = Options.includes("Reverse") ? `${text2}\n${text1}` : Options.includes("ShowOnly") ? text2 : `${text1}\n${text2}`;
					//$.log(`🚧`, `index0: ${index0}`, `text: ${DualSub.body[index0].text}`, "");
					//DualSub.body[index0].timeStamp = Options.includes("Reverse") ? timeStamp2 : timeStamp1;
					//DualSub.body[index0].index = Options.includes("Reverse") ? index2 : index1;
				}
				if (timeStamp2 > timeStamp1) index1++
				else if (timeStamp2 < timeStamp1) index2++
				else { index1++; index2++ }
			};
			break;
	}
	//$.log(`🎉 ${$.name}, Combine Dual Subtitles`, `return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	return DualSub;
	/***************** function *****************/
	function compare(p){ //这是比较函数
		return function(m,n){
			var a = m[p];
			var b = n[p];
			return a - b; //升序
		}
	}
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),a=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:r,headers:o,rawBody:a,body:n},n)},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:r,headers:o,rawBody:a,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.isSurge()||this.isQuanX()||this.isLoon()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}

// https://github.com/VirgilClyne/VirgilClyne/blob/main/function/URL/URLs.embedded.min.js
function URLs(s){return new class{constructor(s=[]){this.name="URL v1.0.0",this.opts=s,this.json={url:{scheme:"",host:"",path:""},params:{}}}parse(s){let t=s.match(/(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/)?.groups??null;return t?.params&&(t.params=Object.fromEntries(t.params.split("&").map((s=>s.split("="))))),t}stringify(s=this.json){return s?.params?s.scheme+"://"+s.host+"/"+s.path+"?"+Object.entries(s.params).map((s=>s.join("="))).join("&"):s.scheme+"://"+s.host+"/"+s.path}}(s)}

// https://github.com/DualSubs/WebVTT/blob/main/WebVTT.embedded.min.js
function WebVTT(e){return new class{constructor(e=["milliseconds","timeStamp","singleLine","\n"]){this.name="WebVTT v1.8.1",this.opts=e,this.newLine=this.opts.includes("\n")?"\n":this.opts.includes("\r")?"\r":this.opts.includes("\r\n")?"\r\n":"\n",this.vtt=new String,this.txt=new String,this.json={headers:{},CSS:{},body:[]}}parse(e=this.vtt){const t=this.opts.includes("milliseconds")?/^((?<srtNum>\d+)(\r\n|\r|\n))?(?<timeLine>(?<startTime>[0-9:.,]+) --> (?<endTime>[0-9:.,]+)) ?(?<options>.+)?[^](?<text>[\s\S]*)?$/:/^((?<srtNum>\d+)(\r\n|\r|\n))?(?<timeLine>(?<startTime>[0-9:]+)[0-9.,]+ --> (?<endTime>[0-9:]+)[0-9.,]+) ?(?<options>.+)?[^](?<text>[\s\S]*)?$/;let i={headers:e.match(/^(?<fileType>WEBVTT)?[^](?<Xoptions>.+[^])*/)?.groups??null,CSS:e.match(/^(?<Style>STYLE)[^](?<Boxes>.*::cue.*(\(.*\))?((\n|.)*}$)?)/m)?.groups??null,body:e.split(/\r\n\r\n|\r\r|\n\n/).map((e=>e.match(t)?.groups??""))};return i.body=i.body.filter(Boolean),i.body=i.body.map(((e,t)=>{if(e.index=t,"WEBVTT"!==i.headers?.fileType&&(e.timeLine=e.timeLine.replace(",","."),e.startTime=e.startTime.replace(",","."),e.endTime=e.endTime.replace(",",".")),this.opts.includes("timeStamp")){let t=e.startTime.replace(/(.*)/,"1970-01-01T$1Z");e.timeStamp=this.opts.includes("milliseconds")?Date.parse(t):Date.parse(t)/1e3}return e.text=e.text?.trim()??"_",this.opts.includes("singleLine")?e.text=e.text.replace(/\r\n|\r|\n/," "):this.opts.includes("multiLine")&&(e.text=e.text.split(/\r\n|\r|\n/)),e})),i}stringify(e=this.json){return[e.headers=[e.headers?.fileType||"WEBVTT",e.headers?.Xoptions||null].join(this.newLine),e.CSS=e.CSS?.Style?[e.CSS.Style,e.CSS.Boxes].join(this.newLine):null,e.body=e.body.map((e=>(Array.isArray(e.text)&&(e.text=e.text.join(this.newLine)),e=`${e.timeLine} ${e?.options??""}${this.newLine}${e.text}`))).join(this.newLine+this.newLine)].join(this.newLine+this.newLine)}}(e)}

// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/json2xml.js
// minify: https://www.digitalocean.com/community/tools/minify
function XMLs(r){return new class{constructor(r){this.name="XML v0.1.4",this.opts=r}parse(r=new String,t=""){const n={"&amp;":"&","&lt;":"<","&gt;":">","&apos;":"'","&quot;":'"'},e="@";let s=function r(t,n){if("string"==typeof t)return t;var s=t.r;if(s)return s;var u,o=function(r,t){if(!r.t)return;for(var n,s,u=r.t.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/),o=u.length,l=0;l<o;l++){var c=i(u[l]);if(c){n||(n={});var p=c.indexOf("=");if(p<0)c=e+c,s=null;else{s=c.substr(p+1).replace(/^\s+/,""),c=e+c.substr(0,p).replace(/\s+$/,"");var g=s[0];g!==s[s.length-1]||"'"!==g&&'"'!==g||(s=s.substr(1,s.length-2)),s=a(s)}t&&(s=t(c,s)),f(n,c,s)}}return n}(t,n),l=t.f,c=l.length;if(o||c>1)u=o||{},l.forEach((function(t){"string"==typeof t?f(u,"#",t):f(u,t.n,r(t,n))}));else if(c){var p=l[0];if(u=r(p,n),p.n){var g={};g[p.n]=u,u=g}}else u=t.c?null:"";n&&(u=n(t.n||"",u));return u}(function(r){for(var t=String.prototype.split.call(r,/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/),n=t.length,e={f:[]},s=e,f=[],u=0;u<n;){var o=t[u++];o&&g(o);var l=t[u++];l&&c(l)}return e;function c(r){var t=r.length,n=r[0];if("/"===n)for(var e=r.replace(/^\/|[\s\/].*$/g,"").toLowerCase();f.length;){var i=s.n&&s.n.toLowerCase();if(s=f.pop(),i===e)break}else if("?"===n)p({n:"?",r:r.substr(1,t-2)});else if("!"===n)"[CDATA["===r.substr(1,7)&&"]]"===r.substr(-2)?g(r.substr(8,t-10)):p({n:"!",r:r.substr(1)});else{var a=function(r){var t={f:[]},n=(r=r.replace(/\s*\/?$/,"")).search(/[\s='"\/]/);n<0?t.n=r:(t.n=r.substr(0,n),t.t=r.substr(n));return t}(r);p(a),"/"===r[t-1]?a.c=1:(f.push(s),s=a)}}function p(r){s.f.push(r)}function g(r){(r=i(r))&&p(a(r))}}(r),t);return s;function i(r){return r&&r.replace(/^\s+|\s+$/g,"")}function a(r){return r.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g,(function(r){if("#"===r[1]){var t="x"===r[2]?parseInt(r.substr(3),16):parseInt(r.substr(2),10);if(t>-1)return String.fromCharCode(t)}return n[r]||r}))}function f(r,t,n){if(void 0!==n){var e=r[t];e instanceof Array?e.push(n):r[t]=t in r?[e,n]:n}}}stringify(r=new Object,t=""){var n="";for(var e in r)n+=s(r[e],e,"");return n=t?n.replace(/\t/g,t):n.replace(/\t|\n/g,"");function s(r,t,n){let e="";if(Array.isArray(r))e=r.reduce(((r,e)=>r+(n+s(e,t,n+"\t")+"\n")),"");else if("object"==typeof r){let i=!1;e+=n+"<"+t;for(let t in r)"@"==t.charAt(0)?e+=" "+t.substring(1)+'="'+r[t].toString()+'"':i=!0;if(e+=i?">":"/>",i){for(let t in r)"#"==t?e+=r[t]:"#cdata"==t?e+="<![CDATA["+r[t]+"]]>":"@"!=t.charAt(0)&&(e+=s(r[t],t,n+"\t"));e+=("\n"==e.charAt(e.length-1)?n:"")+"</"+t+">"}}else e+="?"===t?n+"<"+t+r.toString()+t+">":n+"<"+t+">"+r.toString()+"</"+t+">";return e}}}(r)}

