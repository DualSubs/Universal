/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs for YouTube v0.3.3-player-beta");

const DataBase = {
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Settings.beta.min.json
	"Settings": {
		"Verify":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}},
		"Advanced":{"Translator":{"Times":3,"Interval":100,"Exponential":true}},
		"Default":{"Switch":true,"Types":["Official","Google"],"Type":"Google","Languages":["ZH","EN"],"Language":"ZH","External":{"URL":null,"Offset":0,"ShowOnly":false},"Position":"Forward","CacheSize":6,"Tolerance":1000}},
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Languages.beta.min.json
	"Languages":{"Apple":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"cmn","ZH-HANS":"cmn-Hans","ZH-HK":"yue-Hant","ZH-HANT":"cmn-Hant"},"Disney_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Prime_Video":{"AR":"ar-001","BG":"bg-bg","CS":"cs-cz","DA":"da-dk","DE":"de-de","EL":"el-gr","EN":"en","EN-GB":"en-gb","EN-US":"en-us","EN-US SDH":"en-us","ES":"es","ES-419":"es-419","ES-ES":"es-es","ET":"et-ee","FI":"fi-fi","FR":"fr-fr","HU":"hu-hu","ID":"id-id","IT":"it-it","JA":"ja-jp","KO":"ko-kr","LT":"lt-lt","LV":"lv-lv","NL":"nl-nl","NO":"nb-no","PL":"pl-pl","PT":"pt","PT-PT":"pt-pt","PT-BR":"pt-br","RO":"ro-ro","RU":"ru-ru","SK":"sk-sk","SL":"sl-si","SV":"sv-se","IS":"is-is","ZH":"zh","ZH-HANS":"zh-hans","ZH-HK":"zh-HK","ZH-HANT":"zh-hant"},"HBO_Max":{"AR":"ar-001","BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de-DE","EL":"el-GR","EN":"en","EN-GB":"en-UK","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-419 SDH":"es-419 SDH","ES-ES":"es-ES","ET":"et-EE","FI":"fi-FI","FR":"fr-FR","HU":"hu-HU","IT":"it-IT","JA":"ja-JP","KO":"ko-KR","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Hulu":{"AR":"ar-001","BG":"bul","CS":"ces","DA":"dan","DE":"deu","EL":"ell","EN":"eng","EN-GB":"eng","EN-US":"eng","EN-US SDH":"eng","ES":"spa","ES-419":"spa","ES-ES":"spa","ET":"est","FI":"fin","FR":"fra","HU":"hun","IT":"ita","JA":"jpn","KO":"kor","LT":"lit","LV":"lav","NL":"nld","NO":"nor","PL":"pol","PT":"por","PT-PT":"por","PT-BR":"por","RO":"ron","RU":"rus","SK":"slk","SL":"slv","SV":"swe","IS":"isl","ZH":"zh","ZH-HANS":"zho","ZH-HK":"zho","ZH-HANT":"zho"},"Paramount_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"eng","EN-US":"en-US","EN-US SDH":"en-us","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus_Ph":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Peacock_TV":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus":{"BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Netflix":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"YouTube":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW","YUE":"yue","YUE-HK":"yue-HK"},"Google":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES":"ES","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT-PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}
};
delete $request.headers["Host"]
delete $request.headers["Connection"]
delete $request.headers["Range"]
const { url, method, headers } = $request
$.log(`🚧 ${$.name}`, `url: ${url}`, "");
if (method == "OPTIONS") $.done();

const Format = headers["Content-Type"].match(/([^\/;]+)/g)[2]
$.log(`🚧 ${$.name}`, `Format: ${Format}`, "");

/***************** Processing *****************/
!(async () => {
	const { Platform, Settings, Type, Caches } = await setENV("DualSubs", url, DataBase);
	if (Settings.Switch) {
		// 找缓存
		const Indices = await getCache(Type, Settings, Caches);
		if (Format == "json") {
			let data = JSON.parse($response.body);
			// PlayList.m3u8 URL
			Cache.URL = url;
			// 找节点
			let Captions = data?.captions
			if (Captions) { // 有基础字幕
				$.log(`⚠ ${$.name}, Captions`, "");
				// 增补语言数据库
				DataBase.translationLanguages = [{ "languageCode": "sq", "languageName": { "simpleText": "阿尔巴尼亚语" } }, { "languageCode": "ar", "languageName": { "simpleText": "阿拉伯语" } }, { "languageCode": "am", "languageName": { "simpleText": "阿姆哈拉语" } }, { "languageCode": "az", "languageName": { "simpleText": "阿塞拜疆语" } }, { "languageCode": "ga", "languageName": { "simpleText": "爱尔兰语" } }, { "languageCode": "et", "languageName": { "simpleText": "爱沙尼亚语" } }, { "languageCode": "or", "languageName": { "simpleText": "奥里亚语" } }, { "languageCode": "eu", "languageName": { "simpleText": "巴斯克语" } }, { "languageCode": "be", "languageName": { "simpleText": "白俄罗斯语" } }, { "languageCode": "bg", "languageName": { "simpleText": "保加利亚语" } }, { "languageCode": "is", "languageName": { "simpleText": "冰岛语" } }, { "languageCode": "pl", "languageName": { "simpleText": "波兰语" } }, { "languageCode": "bs", "languageName": { "simpleText": "波斯尼亚语" } }, { "languageCode": "fa", "languageName": { "simpleText": "波斯语" } }, { "languageCode": "tt", "languageName": { "simpleText": "鞑靼语" } }, { "languageCode": "da", "languageName": { "simpleText": "丹麦语" } }, { "languageCode": "de", "languageName": { "simpleText": "德语" } }, { "languageCode": "ru", "languageName": { "simpleText": "俄语" } }, { "languageCode": "fr", "languageName": { "simpleText": "法语" } }, { "languageCode": "fil", "languageName": { "simpleText": "菲律宾语" } }, { "languageCode": "fi", "languageName": { "simpleText": "芬兰语" } }, { "languageCode": "km", "languageName": { "simpleText": "高棉语" } }, { "languageCode": "ka", "languageName": { "simpleText": "格鲁吉亚语" } }, { "languageCode": "gu", "languageName": { "simpleText": "古吉拉特语" } }, { "languageCode": "kk", "languageName": { "simpleText": "哈萨克语" } }, { "languageCode": "ht", "languageName": { "simpleText": "海地克里奥尔语" } }, { "languageCode": "ko", "languageName": { "simpleText": "韩语" } }, { "languageCode": "ha", "languageName": { "simpleText": "豪萨语" } }, { "languageCode": "nl", "languageName": { "simpleText": "荷兰语" } }, { "languageCode": "gl", "languageName": { "simpleText": "加利西亚语" } }, { "languageCode": "ca", "languageName": { "simpleText": "加泰罗尼亚语" } }, { "languageCode": "cs", "languageName": { "simpleText": "捷克语" } }, { "languageCode": "kn", "languageName": { "simpleText": "卡纳达语" } }, { "languageCode": "ky", "languageName": { "simpleText": "柯尔克孜语" } }, { "languageCode": "xh", "languageName": { "simpleText": "科萨语" } }, { "languageCode": "co", "languageName": { "simpleText": "科西嘉语" } }, { "languageCode": "hr", "languageName": { "simpleText": "克罗地亚语" } }, { "languageCode": "ku", "languageName": { "simpleText": "库尔德语" } }, { "languageCode": "la", "languageName": { "simpleText": "拉丁语" } }, { "languageCode": "lv", "languageName": { "simpleText": "拉脱维亚语" } }, { "languageCode": "lo", "languageName": { "simpleText": "老挝语" } }, { "languageCode": "lt", "languageName": { "simpleText": "立陶宛语" } }, { "languageCode": "lb", "languageName": { "simpleText": "卢森堡语" } }, { "languageCode": "rw", "languageName": { "simpleText": "卢旺达语" } }, { "languageCode": "ro", "languageName": { "simpleText": "罗马尼亚语" } }, { "languageCode": "mt", "languageName": { "simpleText": "马耳他语" } }, { "languageCode": "mr", "languageName": { "simpleText": "马拉地语" } }, { "languageCode": "mg", "languageName": { "simpleText": "马拉加斯语" } }, { "languageCode": "ml", "languageName": { "simpleText": "马拉雅拉姆语" } }, { "languageCode": "ms", "languageName": { "simpleText": "马来语" } }, { "languageCode": "mk", "languageName": { "simpleText": "马其顿语" } }, { "languageCode": "mi", "languageName": { "simpleText": "毛利语" } }, { "languageCode": "mn", "languageName": { "simpleText": "蒙古语" } }, { "languageCode": "bn", "languageName": { "simpleText": "孟加拉语" } }, { "languageCode": "my", "languageName": { "simpleText": "缅甸语" } }, { "languageCode": "hmn", "languageName": { "simpleText": "苗语" } }, { "languageCode": "af", "languageName": { "simpleText": "南非荷兰语" } }, { "languageCode": "st", "languageName": { "simpleText": "南索托语" } }, { "languageCode": "ne", "languageName": { "simpleText": "尼泊尔语" } }, { "languageCode": "no", "languageName": { "simpleText": "挪威语" } }, { "languageCode": "pa", "languageName": { "simpleText": "旁遮普语" } }, { "languageCode": "pt", "languageName": { "simpleText": "葡萄牙语" } }, { "languageCode": "ps", "languageName": { "simpleText": "普什图语" } }, { "languageCode": "ny", "languageName": { "simpleText": "齐切瓦语" } }, { "languageCode": "ja", "languageName": { "simpleText": "日语" } }, { "languageCode": "sv", "languageName": { "simpleText": "瑞典语" } }, { "languageCode": "sm", "languageName": { "simpleText": "萨摩亚语" } }, { "languageCode": "sr", "languageName": { "simpleText": "塞尔维亚语" } }, { "languageCode": "si", "languageName": { "simpleText": "僧伽罗语" } }, { "languageCode": "sn", "languageName": { "simpleText": "绍纳语" } }, { "languageCode": "eo", "languageName": { "simpleText": "世界语" } }, { "languageCode": "sk", "languageName": { "simpleText": "斯洛伐克语" } }, { "languageCode": "sl", "languageName": { "simpleText": "斯洛文尼亚语" } }, { "languageCode": "sw", "languageName": { "simpleText": "斯瓦希里语" } }, { "languageCode": "gd", "languageName": { "simpleText": "苏格兰盖尔语" } }, { "languageCode": "ceb", "languageName": { "simpleText": "宿务语" } }, { "languageCode": "so", "languageName": { "simpleText": "索马里语" } }, { "languageCode": "tg", "languageName": { "simpleText": "塔吉克语" } }, { "languageCode": "te", "languageName": { "simpleText": "泰卢固语" } }, { "languageCode": "ta", "languageName": { "simpleText": "泰米尔语" } }, { "languageCode": "th", "languageName": { "simpleText": "泰语" } }, { "languageCode": "tr", "languageName": { "simpleText": "土耳其语" } }, { "languageCode": "tk", "languageName": { "simpleText": "土库曼语" } }, { "languageCode": "cy", "languageName": { "simpleText": "威尔士语" } }, { "languageCode": "ug", "languageName": { "simpleText": "维吾尔语" } }, { "languageCode": "ur", "languageName": { "simpleText": "乌尔都语" } }, { "languageCode": "uk", "languageName": { "simpleText": "乌克兰语" } }, { "languageCode": "uz", "languageName": { "simpleText": "乌兹别克语" } }, { "languageCode": "es", "languageName": { "simpleText": "西班牙语" } }, { "languageCode": "fy", "languageName": { "simpleText": "西弗里西亚语" } }, { "languageCode": "iw", "languageName": { "simpleText": "希伯来语" } }, { "languageCode": "el", "languageName": { "simpleText": "希腊语" } }, { "languageCode": "haw", "languageName": { "simpleText": "夏威夷语" } }, { "languageCode": "sd", "languageName": { "simpleText": "信德语" } }, { "languageCode": "hu", "languageName": { "simpleText": "匈牙利语" } }, { "languageCode": "su", "languageName": { "simpleText": "巽他语" } }, { "languageCode": "hy", "languageName": { "simpleText": "亚美尼亚语" } }, { "languageCode": "ig", "languageName": { "simpleText": "伊博语" } }, { "languageCode": "it", "languageName": { "simpleText": "意大利语" } }, { "languageCode": "yi", "languageName": { "simpleText": "意第绪语" } }, { "languageCode": "hi", "languageName": { "simpleText": "印地语" } }, { "languageCode": "id", "languageName": { "simpleText": "印度尼西亚语" } }, { "languageCode": "en", "languageName": { "simpleText": "英语" } }, { "languageCode": "yo", "languageName": { "simpleText": "约鲁巴语" } }, { "languageCode": "vi", "languageName": { "simpleText": "越南语" } }, { "languageCode": "jv", "languageName": { "simpleText": "爪哇语" } }, { "languageCode": "zh-Hant", "languageName": { "simpleText": "中文（繁体）" } }, { "languageCode": "zh-Hans", "languageName": { "simpleText": "中文（简体）" } }, { "languageCode": "zu", "languageName": { "simpleText": "祖鲁语" } }];
				if (Captions.playerCaptionsRenderer) {
					Cache.baseURL = Captions?.playerCaptionsRenderer?.baseUrl; // 基础字幕URL
					Captions.playerCaptionsRenderer.visibility = "ON" // 字幕选项按钮可见
					Captions.playerCaptionsRenderer.showAutoCaptions = true; // 包含自动生成的字幕
				}
				let Tracklist = Captions?.playerCaptionsTracklistRenderer
				if (Tracklist) { // 有轨道列表
					$.log(`⚠ ${$.name}, Tracklist`, "");
					if (Tracklist?.captionTracks) {
						// 改翻译可用性
						Tracklist.captionTracks = Tracklist.captionTracks.map(caption => {
							caption.isTranslatable = true
							return caption
						});
						/*
						// 查询字幕选项
						// 提取数据 用遍历语法可以兼容自定义数量的语言查询
						for await (var language of Settings.Languages) {
							Cache[language] = await getCaptions(Platform, Cache, Tracklist, language);
							$.log(`🚧 ${$.name}`, `Cache[${language}]`, JSON.stringify(Cache[language]), "");
						};
						$.log(`🚧 ${$.name}`, "Cache.stringify", JSON.stringify(Cache), "");
						// 兼容性判断
						const standard = await isStandard(Platform, url, headers);
						// 写入选项
						Tracklist = await setOptions(Platform, Tracklist, Cache[Settings.Languages[0]], Cache[Settings.Languages[1]], Settings.Types, standard, Settings.Type);
						*/
					};
					// 加翻译语言
					if (Tracklist?.translationLanguages) {
						Tracklist.translationLanguages = Object.assign(Tracklist.translationLanguages, DataBase.translationLanguages);
					} else Tracklist.translationLanguages = DataBase.translationLanguages;
				};
				// 写入缓存
				let newCaches = Caches;
				newCaches = await setCache(Indices.Index, newCaches, Cache, Settings.CacheSize);
				$.setjson(newCaches, `@DualSubs.Caches.${Platform}`);
			};
			$response.body = JSON.stringify(data);
		}
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		if ($.isQuanX()) {
			const { headers, body } = $response
			$.done({ headers, body })
		} else $.done($response)
	})

/***************** Async Function *****************/
/**
 * Get Environment Variables
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default DataBase
 * @return {Promise<*>}
 */
async function getENV(t,e,n){let i=$.getjson(t,n),s=i?.Settings?.[e]||n.Settings[e],g=i?.Config?.[e]||n?.Config?.[e],f=i?.Caches?.[e]||void 0;if("string"==typeof f&&(f=JSON.parse(f)),"undefined"!=typeof $argument){if($argument){let t=Object.fromEntries($argument.split("&").map((t=>t.split("=")))),e={};for(var r in t)o(e,r,t[r]);Object.assign(s,e)}function o(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}return{Settings:s,Caches:f,Config:g}}

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
										: /\.youtube\.com/i.test(url) ? "YouTube"
											: /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
												: "Universal"
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Platform: ${Platform}`, "");
	/***************** Settings *****************/
	let { Settings, Caches = [], Config } = await getENV(name, Platform, database);
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
	Settings.External.Offset = parseInt(Settings.External?.Offset, 10) // BoxJs字符串转数字
	Settings.External.ShowOnly = JSON.parse(Settings.External?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.CacheSize = parseInt(Settings.CacheSize, 10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance, 10) // BoxJs字符串转数字
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Type *****************/
	const Type = url.match(/[&\?]dualsubs=(\w+)$/)?.[1] || Settings.Type
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Type: ${Type}`, "");
	/***************** Verify *****************/
	const { Settings: Verify } = await getENV(name, "Verify", database);
	if (Array.isArray(Settings.Types)) {
		if (!Verify.GoogleCloud.Auth) Settings.Types = Settings.Types.filter(e => e !== "GoogleCloud"); // 移除不可用类型
		if (!Verify.Azure.Auth) Settings.Types = Settings.Types.filter(e => e !== "Azure");
		if (!Verify.DeepL.Auth) Settings.Types = Settings.Types.filter(e => e !== "DeepL");
	}
	/***************** Advanced *****************/
	let { Settings: Advanced } = await getENV(name, "Advanced", database);
	Advanced.Translator.Times = parseInt(Advanced.Translator?.Times, 10) // BoxJs字符串转数字
	Advanced.Translator.Interval = parseInt(Advanced.Translator?.Interval, 10) // BoxJs字符串转数字
	Advanced.Translator.Exponential = JSON.parse(Advanced.Translator?.Exponential) //  BoxJs字符串转Boolean
	/***************** Cache *****************/
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Caches类型: ${typeof Caches}`, `Caches内容: ${Caches}`, "");
	//$.log(`🎉 ${$.name}, Set Environment Variables`, `Caches类型: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	return { Platform, Settings, Caches, Config, Type, Verify, Advanced };
};

/**
 * Get Cache
 * @author VirgilClyne
 * @param {String} type - type
 * @param {Object} settings - settings
 * @param {Object} cache - cache
 * @return {Promise<*>}
 */
 async function getCache(type, settings, cache = {}) {
	$.log(`⚠ ${$.name}, Get Cache`, "");
	let Indices = { "Index": await getIndex(settings, cache) };
	$.log(`🎉 ${$.name}, Get Cache`, `Indices.Index: ${Indices.Index}`, "");
	for await (var language of settings.Languages) Indices[language] = await getDataIndex(Indices.Index, language)
	if (type == "Official") {
		if (Indices[settings.Languages[0]] !== -1) {
			Indices[settings.Languages[1]] = cache[Indices.Index][settings.Languages[1]].findIndex(data => {
				if (data.OPTION["GROUP-ID"] == cache[Indices.Index][settings.Languages[0]][Indices[settings.Languages[0]]].OPTION["GROUP-ID"] && data.OPTION.CHARACTERISTICS == cache[Indices.Index][settings.Languages[0]][Indices[settings.Languages[0]]].OPTION.CHARACTERISTICS) return true;
			});
			if (Indices[settings.Languages[1]] == -1) {
				Indices[settings.Languages[1]] = cache[Indices.Index][settings.Languages[1]].findIndex(data => {
					if (data.OPTION["GROUP-ID"] == cache[Indices.Index][settings.Languages[0]][Indices[settings.Languages[0]]].OPTION["GROUP-ID"]) return true;
				});
			};
		};
	};
	$.log(`🎉 ${$.name}, Get Cache`, `Indices: ${JSON.stringify(Indices)}`, "");
	return Indices
	/***************** Fuctions *****************/
	async function getIndex(settings, cache) {
		return cache.findIndex(item => {
			let URLs = [item?.URL];
			for (var language of settings.Languages) URLs.push(item?.[language]?.map(d => getURIs(d)));
			$.log(`🎉 ${$.name}, 调试信息`, " Get Index", `URLs: ${URLs}`, "");
			return URLs.flat(Infinity).some(URL => url.includes(URL || null));
		})
	};
	async function getDataIndex(index, lang) { return cache?.[index]?.[lang]?.findIndex(item => getURIs(item).flat(Infinity).some(URL => url.includes(URL || null))); };
	function getURIs(item) { return [item?.URI, item?.VTTs] }
};

/**
 * Set Cache
 * @author VirgilClyne
 * @param {Number} index - index
 * @param {Object} target - target
 * @param {Object} sources - sources
 * @param {Number} num - num
 * @return {Promise<*>}
 */
async function setCache(index = -1, target = {}, sources = {}, num = 1) {
	$.log(`⚠ ${$.name}, Set Cache`, "");
	// 刷新播放记录，所以始终置顶
	if (index !== -1) delete target[index] // 删除旧记录
	target.unshift(sources) // 头部插入缓存
	target = target.filter(Boolean).slice(0, num) // 设置缓存数量
	//$.log(`🎉 ${$.name}, Set Cache`, `target: ${JSON.stringify(target)}`, "");
	return target
};

// Function 4
// Get Captions Data
async function getCaptions(platform = "", cache = {}, tracklist = {}, langCode = "") {
	$.log(`⚠ ${$.name}, Get Captions Data`, "");
	// 自动语言转换
	let langcodes = await switchLangCode(platform, langCode, DataBase);
	//查询是否有符合语言的字幕
	let captionTracks = [];
	for await (var langcode of langcodes) {
		captionTracks = tracklist.captionTracks.filter(item => (item?.languageCode == langcode));
		$.log(`🚧 ${$.name}, captionTracks`, JSON.stringify(captionTracks), "");
		if (captionTracks.length !== 0) {
			captionTracks = await Promise.all(captionTracks.map(async captionTrack => await setCaption(cache, captionTrack, langcode)));
			break;
		} else captionTracks = [await setCaption(cache, {}, langcodes[0])];
	};
	$.log(`🎉 ${$.name}, Get Captions Data`, `captionTracks: ${JSON.stringify(captionTracks)}`, "");
	return captionTracks

	/***************** Fuctions *****************/
	// Function 4.1
	// Switch Language Code
	async function switchLangCode(platform = "", langCode = "", database) {
		$.log(`⚠ ${$.name}, Switch Language Code`, `langCode: ${langCode}`, "");
		// 自动语言转换
		let langcodes = (langCode == "ZH") ? ["ZH", "ZH-HANS", "ZH-HANT", "ZH-HK"] // 中文（自动）
			: (langCode == "YUE") ? ["YUE", "YUE-HK"] // 粤语（自动）
				: (langCode == "EN") ? ["EN", "EN-US SDH", "EN-US", "EN-GB"] // 英语（自动）
					: (langCode == "ES") ? ["ES", "ES-419 SDH", "ES-419", "ES-ES SDH", "ES-ES"] // 西班牙语（自动）
						: (langCode == "PT") ? ["PT", "PT-PT", "PT-BR"] // 葡萄牙语（自动）
							: [langCode]
		langcodes = langcodes.map(langcode => database?.Languages?.[platform]?.[langcode]);
		$.log(`🎉 ${$.name}, Switch Language Code`, `langcodes: ${langcodes}`, "");
		return langcodes
	};
	// Function 4.2
	// Set Captions Data
	async function setCaption(cache = {}, captionTrack = {}, langCode = "") {
		$.log(`⚠ ${$.name}, Set captions Data`, "");
		let Caption = {
			"fake": (captionTrack == {}) ? true : false,
			"baseUrl": captionTrack?.baseUrl ?? `${cache.baseURL}&lang=${langCode}`,
			"name": {
				"simpleText": captionTrack?.Name?.simpleText ?? langCode
			},
			"vssId": captionTrack?.vssId ?? `.${langCode}`,
			"languageCode": langCode,
			"isTranslatable": true
		};
		if (DataBase.translationLanguages.findIndex(item => item.languageCode == langCode) !== -1) Caption.name.simpleText = DataBase?.translationLanguages?.[DataBase.translationLanguages.findIndex(item => item.languageCode == langCode)].languageName?.simpleText
		if (captionTrack.kind) Caption.kind = captionTrack?.kind ?? "asr";
		$.log(`🎉 ${$.name}, Set Captions Data`, `Caption: ${JSON.stringify(Caption)}`, "");
		return Caption
	};
};

// Function 5
// Set DualSubs Subtitle Options
async function setOptions(Platform = "", Tracklist = {}, Languages1 = [], Languages2 = [], Types = [], Standard = true, Type = "") {
	// 兼容性设置
	Types = (Standard == true) ? Types : [Type];
	$.log(`⚠ ${$.name}, Set DualSubs Subtitle Options`, `Types: ${Types}`, "");
	for await (var obj1 of Languages1) {
		for await (var obj2 of Languages2) {
			Options = await getOptions(Platform, obj1, obj2, Types, Standard);
			if (Options.length !== 0) {
				// 插入字幕选项
				Tracklist.captionTracks = Tracklist.captionTracks.concat(Options);
			};
		};
	};
	return Tracklist

	/***************** Fuctions *****************/
	// Function 5.1
	// Get DualSubs Subtitle Options
	async function getOptions(platform = "", obj1 = {}, obj2 = {}, types = [], standard) {
		$.log(`⚠ ${$.name}, 调试信息`, "Get DualSubs Subtitle Options", `types: ${types}`, "");
		return types.map(type => {
			// 复制此语言选项
			let newCaption = (!obj1?.fake) ? JSON.parse(JSON.stringify(obj1))
				: JSON.parse(JSON.stringify(obj2))
			// 删除标记
			delete newCaption.fake
			// 修改名称
			newCaption.name.simpleText = `${obj1.name.simpleText}`
			// 修改vssId
			//newCaption.vssId = `${obj1.vssId} ${obj2.vssId} ${type}`
			newCaption.vssId = `${obj1.vssId}`
			// 修改语言代码
			//newCaption.languageCode = `${obj1.languageCode} ${obj2.languageCode} ${type}`
			newCaption.languageCode = `${obj1.languageCode}`
			// 修改链接
			newCaption.baseUrl = (newCaption.baseUrl.includes("?")) ? `${newCaption.baseUrl}&dualsubs=${type}`
				: `${newCaption.baseUrl}?dualsubs=${type}`
			$.log(`🎉 ${$.name}, Get DualSubs Subtitle Options`, `newCaption: ${JSON.stringify(newCaption)}`, "");
			return newCaption
		})
	};
};

// Determine whether Standard Media Player
async function isStandard(platform, url, headers) {
    $.log(`⚠ ${$.name}, is Standard`, "");
    let standard = true;
    if (platform == "HBO_Max") {
		if (headers?.["User-Agent"]?.includes("Mozilla/5.0")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPad")) standard = false;
        else if (headers?.["X-Hbo-Device-Name"]?.includes("ios")) standard = false;
        else if (url?.includes("device-code=iphone")) standard = false;
    }
    $.log(`🎉 ${$.name}, is Standard`, `standard: ${standard}`, "");
    return standard
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
