/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("🍿️ DualSubs for 🎦 Streaming Media v0.7.4(1) SUB.ttml.beta");
const URL = new URLs();
const XML = new XMLs();
const DataBase = {
	"Verify": {
		"Settings":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}}
	},
	"Advanced": {
		"Settings":{"Translator":{"Times":3,"Interval":100,"Exponential":true}}
	},
	"Default": {
		"Settings":{"Switch":"true","Types":["Official","Google","GoogleCloud","Azure","DeepL"],"Type":"Google","Languages":["ZH","EN"],"Language":"ZH","External":{"URL":null,"Offset":0,"ShowOnly":false},"Position":"Forward","CacheSize":6,"Tolerance":1000},
		"Configs": {
			"Languages":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]}
		}
	},
	"YouTube": {
		"Configs": {
			"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW","YUE":"yue","YUE-HK":"yue-HK"}
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

// headers转小写
for (const [key, value] of Object.entries($request.headers)) {
	delete $request.headers[key]
	$request.headers[key.toLowerCase()] = value
};
for (const [key, value] of Object.entries($response.headers)) {
	delete $response.headers[key]
	$response.headers[key.toLowerCase()] = value
};

/***************** Processing *****************/
!(async () => {
	const { Platform, Verify, Advanced, Settings, Caches, Configs } = await setENV("DualSubs", $request.url, DataBase);
	$.log(`⚠ ${$.name}, Settings.Switch=${Settings.Switch}`);
	switch (Settings.Switch) {
		case "true":
		default:
			$.log(`⚠ ${$.name}, 功能开启`, "");
			let url = URL.parse($request.url);
			$.log(`⚠ ${$.name}, url.path=${url.path}`, "");
			// 设置类型
			const Type = url?.params?.dualsubs || Settings.Type;
			$.log(`🚧 ${$.name}, Type: ${Type}`, "");
			// 创建字幕Object
			let OriginSub = XML.parse($response.body);
			$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
			let SecondSub = {};
			// 创建双语字幕Object
			let DualSub = {};
			// 处理类型
			switch (Type) {
				case "Official":
					$.log(`🚧 ${$.name}`, "官方字幕", "");
					break;
				case "External":
					$.log(`🚧 ${$.name}, 外挂字幕`, "");
					break;
				case "Google":
				case "GoogleCloud":
				case "Azure":
				case "DeepL":
				default:
					$.log(`🚧 ${$.name}`, `翻译字幕`, "");
					DualSub = OriginSub;
					switch (Verify?.[Type]?.Method) {
						default:
						case "Part": // Part 逐段翻译
							let Full = await Promise.all(DualSub.tt.body.div.p.map(async item => Array.isArray(item.span["#"]) ? item.span["#"].join("\n") : item.span["#"]));
							let length = (Type == "Google") ? 127 : (Type == "GoogleCloud") ? 127 : (Type == "Azure") ? 99 : (Type == "DeepL") ? 49 : 127;
							let Parts = await chunk(Full, length);
							Parts = await Promise.all(Parts.map(async Part => {
								return await retry(Translator, [Type, Settings.Languages[1], Settings.Languages[0], Part, Verify], Advanced.Translator.Times, Advanced.Translator.Interval, Advanced.Translator.Exponential); // 3, 100, true
							})).then(parts => parts.flat(Infinity));
							DualSub.body = await Promise.all(DualSub.tt.body.div.p.map(async (item, i) => {
								item.span["#"] = await combineText(item.span["#"], Parts[i], Settings.Position);
								return item
							}));
							break;
						case "Row": // Row 逐行翻译
							DualSub.tt.body.div.p = await Promise.all(DualSub.tt.body.div.p.map(async item => {
								let text2 = Array.isArray(item.span["#"]) ? await retry(Translator, [Type, Settings.Languages[1], Settings.Languages[0], item.span["#"].join("\n"), Verify], Advanced.Translator.Times, Advanced.Translator.Interval, Advanced.Translator.Exponential) // 3, 100, true
									: await retry(Translator, [Type, Settings.Languages[1], Settings.Languages[0], item.span["#"], Verify], Advanced.Translator.Times, Advanced.Translator.Interval, Advanced.Translator.Exponential); // 3, 100, true
								item.span["#"] = await combineText(item.span["#"], span["#"][0], Settings.Position);
								return item
							}));
							break;
					};
					break;
			};
			$.log(`🚧 ${$.name}`, `DualSub: ${JSON.stringify(DualSub)}`, "");
			$response.body = XML.stringify(DualSub);
			break;
		case "false":
			$.log(`⚠ ${$.name}, 功能关闭`, "");
			break;
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
	//Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
	if (typeof Settings.Types === "string") Settings.Types = Settings.Types.split(",") // BoxJs字符串转数组
	if (Array.isArray(Settings.Types)) {
		if (!Verify.GoogleCloud.Auth) Settings.Types = Settings.Types.filter(e => e !== "GoogleCloud"); // 移除不可用类型
		if (!Verify.Azure.Auth) Settings.Types = Settings.Types.filter(e => e !== "Azure");
		if (!Verify.DeepL.Auth) Settings.Types = Settings.Types.filter(e => e !== "DeepL");
	}
	Settings.External.Offset = parseInt(Settings.External?.Offset, 10) // BoxJs字符串转数字
	Settings.External.ShowOnly = JSON.parse(Settings.External?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.CacheSize = parseInt(Settings.CacheSize, 10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance, 10) // BoxJs字符串转数字
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	return { Platform, Verify, Advanced, Settings, Caches, Configs };
};

/**
 * Get Cache
 * @author VirgilClyne
 * @param {String} url - Request URL
 * @param {String} type - type
 * @param {Object} settings - settings
 * @param {Object} cache - cache
 * @return {Promise<*>}
 */
async function getCache(url, type, settings, caches = {}) {
	$.log(`⚠ ${$.name}, Get Cache`, "");
	let Indices = {};
	Indices.Index = await getIndex(url, settings, caches);
	if (Indices.Index !== -1) {
		for await (var language of settings.Languages) Indices[language] = await getDataIndex(url, Indices.Index, language)
		if (type == "Official") {
			// 修正缓存
			if (Indices[settings.Languages[0]] !== -1) {
				Indices[settings.Languages[1]] = caches[Indices.Index][settings.Languages[1]].findIndex(data => {
					if (data.OPTION["GROUP-ID"] == caches[Indices.Index][settings.Languages[0]][Indices[settings.Languages[0]]].OPTION["GROUP-ID"] && data.OPTION.CHARACTERISTICS == caches[Indices.Index][settings.Languages[0]][Indices[settings.Languages[0]]].OPTION.CHARACTERISTICS) return true;
				});
				if (Indices[settings.Languages[1]] == -1) {
					Indices[settings.Languages[1]] = caches[Indices.Index][settings.Languages[1]].findIndex(data => {
						if (data.OPTION["GROUP-ID"] == caches[Indices.Index][settings.Languages[0]][Indices[settings.Languages[0]]].OPTION["GROUP-ID"]) return true;
					});
				};
			};
		};
	}
	$.log(`🎉 ${$.name}, Get Cache`, `Indices: ${JSON.stringify(Indices)}`, "");
	return Indices
	/***************** Fuctions *****************/
	async function getIndex(url, settings, caches) {
		return caches.findIndex(item => {
			let URLs = [item?.URL];
			for (var language of settings.Languages) URLs.push(item?.[language]?.map(d => getURIs(d)));
			//$.log(`🎉 ${$.name}, 调试信息`, " Get Index", `URLs: ${URLs}`, "");
			return URLs.flat(Infinity).some(URL => url.includes(URL || null));
		})
	};
	async function getDataIndex(url, index, lang) { return caches?.[index]?.[lang]?.findIndex(item => getURIs(item).flat(Infinity).some(URL => url.includes(URL || null))); };
	function getURIs(item) { return [item?.URL, item?.VTTs] }
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

/**
 * Get Official Request
 * @author VirgilClyne
 * @param {String} url - Request URL
 * @param {String} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @param {Array} VTTs - VTTs
 * @return {Promise<*>}
 */
async function getOfficialRequest(url, headers, platform, VTTs = [], oVTTs = []) {
	$.log(`⚠ ${$.name}, Get Official Request`, "");
	$.log(`⚠ ${$.name}, Get Official Request`, `VTTs: ${VTTs}`, "");
	let fileName = (platform == "Apple") ? url.match(/.+_(subtitles(_V\d)?-\d+\.webvtt)(\?.*dualsubs=\w+)$/)[1] // Apple 片段分型序号不同
		: (platform == "Disney_Plus") ? url.match(/([^\/]+\.vtt)(\?.*dualsubs=\w+)$/)[1] // Disney+ 片段名称相同
			: (platform == "Hulu") ? url.match(/.+_(SEGMENT\d+_.+\.vtt)(\?.*dualsubs=\w+)$/)[1] // Hulu 片段分型序号相同
				: null; // Amazon Prime Video HBO_Max不拆分字幕片段
	$.log(`🚧 ${$.name}, Get Official Subtitles URL`, `fileName: ${fileName}`, "")

	if (platform == "Apple") {
		let oIndex = oVTTs.findIndex(item => item?.includes(fileName));
		$.log(`🚧 ${$.name}, Get Official Subtitles URL`, `Apple_oIndex: ${oIndex}`, "")
		let oPosition = oIndex / oVTTs.length;
		$.log(`🚧 ${$.name}, Get Official Subtitles URL`, `Apple_oPosition: ${oPosition}`, "")
		//let Index = VTTs.findIndex(item => item.includes(fileName));
		let Index = Math.round(oPosition * VTTs.length);
		$.log(`🚧 ${$.name}, Get Official Subtitles URL`, `Apple_Index: ${Index}`, "")
		nearlyVTTs = VTTs.slice((Index - 2 < 0) ? 0 : Index - 2, Index + 2);
		let requests = nearlyVTTs.map(VTT => {
			return {
				"url": VTT,
				"headers": headers,
			}
		});
		$.log(`🚧 ${$.name}, Get Official Request`, `requests: ${JSON.stringify(requests)}`, "");
		return requests
	} else {
		let request = {
			"url": VTTs.find(item => item?.includes(fileName)) || VTTs[0],
			"headers": headers,
		};
		$.log(`🚧 ${$.name}, Get Official Request`, `request: ${JSON.stringify(request)}`, "");
		return request
	}
};

/**
 * getWebVTT
 * @author VirgilClyne
 * @param {object} request - request
 * @return {Promise<*>}
 */
async function getWebVTT(request) { return await $.http.get(request).then(response => VTT.parse(response.body)); }

/**
 * combineText
 * @author VirgilClyne
 * @param {String} text1 - text1
 * @param {String} text2 - text2
 * @param {String} position - position
 * @return {Promise<*>}
 */
async function combineText(text1, text2, position) { return (position == "Forward") ? text2 + "\n" + text1 : (position == "Reverse") ? text1 + "\n" + text2 : text2 + "\n" + text1; }

/**
 * Translator
 * @author VirgilClyne
 * @param {String} type - type
 * @param {String} source - source
 * @param {String} target - target
 * @param {String} text - text
 * @param {Object} verify - verify
 * @return {Promise<*>}
 */
 async function Translator(type = "Google", source = "", target = "", text = "", verify = {}) {
	$.log(`⚠ ${$.name}, Translator`, `orig: ${text}`, "");
	// 构造请求
	let request = await GetRequest(type, source, target, text);
	// 发送请求
	let trans = await GetData(type, request);
	$.log(`🚧 ${$.name}, Translator`, `trans: ${trans}`, "");
	return trans
	/***************** Fuctions *****************/
	// Get Translate Request
	async function GetRequest(type = "", source = "", target = "", text = "") {
		$.log(`⚠ ${$.name}, Get Translate Request`, "");
		const UAPool = [
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", // 13.5%
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", // 6.6%
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0", // 6.4%
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0", // 6.2%
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36", // 5.2%
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36", // 4.8%
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
			"Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1"
		];
		let request = {};
		let BaseURL = "";
		let texts = "";
		switch (type) {
			default:
			case "Google":
				const BaseRequest = [
					{ // Google API
						"url": "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t",
						"headers": {
							"Accept": "*/*",
							"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)] // 随机UA
						}
					},
					{ // Google Translate App
						"url": "https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8",
						"headers": {
							"Accept": "*/*",
							"User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)"
						}
					},
					{ // Google Translate App
						"url": "https://translate.googleapis.com/translate_a/single?client=gtx&dj=1&source=bubble&dt=t&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at",
						"headers": {
							"Accept": "*/*",
							"User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)"
						}
					},
					{// Google Dictionary Chrome extension https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja
						"url": "https://clients5.google.com/translate_a/t?client=dict-chrome-ex",
						"headers": {
							"Accept": "*/*",
							"User-Agent": ""
						}
					}
				]
				request = BaseRequest[Math.floor(Math.random() * (BaseRequest.length - 3))] // 随机Request, 排除最后三项
				text = (Array.isArray(text)) ? text.join("\n\n") : text;
				request.url = request.url + `&sl=${DataBase.Google.Configs.Languages[source]}&tl=${DataBase.Google.Configs.Languages[target]}&q=${encodeURIComponent(text)}`;
				break;
			case "GoogleCloud":
				request.url = `https://translation.googleapis.com/language/translate/v2/?key=${verify.GoogleCloud?.Auth}`;
				request.headers = {
					//"Authorization": `Bearer ${verify.GoogleCloud?.Auth}`,
					"User-Agent": "DualSubs",
					"Content-Type": "application/json; charset=utf-8"
				};
				request.body = JSON.stringify({
					"q": text,
					"source": DataBase.Google.Configs.Languages[source],
					"target": DataBase.Google.Configs.Languages[target],
					"format": "html",
					//"key": verify.GoogleCloud?.Key
				});
				break;
			case "Bing":
				// https://github.com/Animenosekai/translate/blob/main/translatepy/translators/bing.py
				BaseURL = (verify.Bing?.Version == "Bing") ? "https://www.bing.com/ttranslatev3?IG=839D27F8277F4AA3B0EDB83C255D0D70&IID=translator.5033.3"
					: (verify.Azure?.Version == "BingCN") ? "https://cn.bing.com/ttranslatev3?IG=25FEE7A7C7C14533BBFD66AC5125C49E&IID=translator.5025.1"
						: "https://www.bing.com/ttranslatev3?IG=839D27F8277F4AA3B0EDB83C255D0D70&IID=translator.5033.3"
				request.url = `${BaseURL}`;
				request.headers = {
					"Accept": "*/*",
					"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
					"Content-type": "application/x-www-form-urlencoded",
					"Refer": "https://www.bing.com/",
				};
				request.body = JSON.stringify({
					"fromLang": "auto-detect",
					//"text": '%s' % trans,
					"text": text,
					//"from": DataBase.Microsoft.Configs.Languages[source],
					"to": DataBase.Microsoft.Configs.Languages[target]
				});
				break;
			case "Azure":
				// https://docs.microsoft.com/zh-cn/azure/cognitive-services/translator/
				// https://docs.azure.cn/zh-cn/cognitive-services/translator/
				BaseURL = (verify.Azure?.Version == "Azure") ? "https://api.cognitive.microsofttranslator.com"
					: (verify.Azure?.Version == "AzureCN") ? "https://api.translator.azure.cn"
						: "https://api.cognitive.microsofttranslator.com"
				request.url = `${BaseURL}/translate?api-version=3.0&textType=html&to=${DataBase.Microsoft.Configs.Languages[target]}&from=${DataBase.Microsoft.Configs.Languages[source]}`;
				request.headers = {
					"Content-Type": "application/json; charset=UTF-8",
					"Accept": "application/json, text/javascript, */*; q=0.01",
					"Accept-Language": "zh-hans"
					//"Authorization": `Bearer ${verify.Azure?.Auth}`,
					//"Ocp-Apim-Subscription-Key": verify.Azure?.Auth,
					//"Ocp-Apim-Subscription-Region": verify.Azure?.Region, // chinanorth, chinaeast2
					//"X-ClientTraceId": uuidv4().toString()
				};
				if (verify.Azure?.Region) request.headers["Ocp-Apim-Subscription-Region"] = verify.Azure.Region;
				if (verify?.Azure?.Mode == "Key") request.headers["Ocp-Apim-Subscription-Key"] = verify.Azure.Auth;
				else if (verify?.Azure?.Mode == "Token") request.headers.Authorization = `Bearer ${verify.Azure.Auth}`;
				text = (Array.isArray(text)) ? text : [text];
				texts = await Promise.all(text?.map(async item => { return { "text": item } }))
				request.body = JSON.stringify(texts);
				/*
				request.body = JSON.stringify([{
					"text": text
				}]);
				*/
				break;
			case "DeepL":
				BaseURL = (verify.DeepL.Version == "Free") ? "https://api-free.deepl.com"
					: (verify.DeepL.Version == "Pro") ? "https://api.deepl.com"
						: "https://api-free.deepl.com"
				request.url = `${BaseURL}/v2/translate`
				request.headers = {
					"Accept": "*/*",
					"User-Agent": "DualSubs",
					"Content-Type": "application/x-www-form-urlencoded"
				};
				const source_lang = (DataBase.DeepL.Configs.Languages[source].includes("EN")) ? "EN"
					: (DataBase.DeepL.Configs.Languages[source].includes("PT")) ? "PT"
						: DataBase.DeepL.Configs.Languages[source];
				const target_lang = (DataBase.DeepL.Configs.Languages[target] == "EN") ? "EN-US"
					: (DataBase.DeepL.Configs.Languages[target] == "PT") ? "PT-PT"
						: DataBase.DeepL.Configs.Languages[target];
				const BaseBody = `auth_key=${verify.DeepL?.Auth}&source_lang=${source_lang}&target_lang=${target_lang}&tag_handling=html`;
				text = (Array.isArray(text)) ? text : [text];
				texts = await Promise.all(text?.map(async item => `&text=${encodeURIComponent(item)}`))
				request.body = BaseBody + texts.join("");
				break;
			case "BaiduFanyi":
				// https://fanyi-api.baidu.com/doc/24
				request.url = `https://fanyi-api.baidu.com/api/trans/vip/language`;
				request.headers = {
					"User-Agent": "DualSubs",
					"Content-Type": "application/x-www-form-urlencoded"
				};
				request.body = {
					"q": text,
					"from": DataBase.Baidu.Configs.Languages[source],
					"to": DataBase.Baidu.Configs.Languages[target],
					"appid": verify.BaiduFanyi?.Key,
					"salt": uuidv4().toString(),
					"sign": "",
				};
				break;
			case "YoudaoAI":
				// https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html
				request.url = `https://openapi.youdao.com/api`;
				request.headers = {
					"User-Agent": "DualSubs",
					"Content-Type": "application/json; charset=utf-8"
				};
				request.body = {
					"q": text,
					"from": DataBase.Youdao.Configs.Languages[source],
					"to": DataBase.Youdao.Configs.Languages[target],
					"appKey": verify.YoudaoAI?.Key,
					"salt": uuidv4().toString(),
					"signType": "v3",
					"sign": "",
					"curtime": Math.floor(+new Date() / 1000)
				};
				break;
		}
		//$.log(`🎉 ${$.name}, Get Translate Request`, `request: ${JSON.stringify(request)}`, "");
		return request
	};
	// Get Translate Data
	function GetData(type, request) {
		$.log(`⚠ ${$.name}, Get Translate Data`, "");
		return new Promise(resolve => {
			if (type == "Google") {
				$.get(request, (error, response, data) => {
					try {
						if (error) throw new Error(error)
						else if (data) {
							const _data = JSON.parse(data)
							let texts = [];
							switch (type) {
								default:
								case "Google":
									if (Array.isArray(_data)) texts = _data?.[0]?.map(item => item?.[0] ?? `翻译失败, 类型: ${type}`);
									else if (_data?.sentences) texts = _data?.sentences?.map(item => item?.trans ?? `翻译失败, 类型: ${type}`);
									break;
							}
							texts = texts?.join("")?.split(/\n\n/);
							resolve(texts);
						} else throw new Error(response);
					} catch (e) {
						throw e;
					}
				});
			} else {
				$.post(request, (error, response, data) => {
					try {
						if (error) throw new Error(error)
						else if (data) {
							const _data = JSON.parse(data)
							let texts = [];
							switch (type) {
								default:
								case "Google":
									texts = _data?.[0]?.map(item => item?.[0] ?? `翻译失败, 类型: ${type}`)
									break;
								case "GoogleCloud":
									texts = _data?.data?.translations?.map(item => item?.translatedText ?? `翻译失败, 类型: ${type}`)
									break;
								case "Bing":
								case "Azure":
									texts = _data?.map(item => item?.translations?.[0]?.text ?? `翻译失败, 类型: ${type}`)
									break;
								case "DeepL":
									texts = _data?.translations?.map(item => item?.text ?? `翻译失败, 类型: ${type}`)
									break;
							}
							resolve(texts);
						} else throw new Error(response);
					} catch (e) {
						throw e;
					}
				});
			};
		});
	};
};

/** 
 * Combine Dual Subtitles
 * @author VirgilClyne
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} options - options = ["Forward", "Reverse", "ShowOnly"]
 * @return {Promise<*>}
 */
async function CombineDualSubs(Sub1 = { headers: {}, CSS: {}, body: [] }, Sub2 = { headers: {}, CSS: {}, body: [] }, Offset = 0, Tolerance = 1000, Options = ["Forward"]) {
	$.log(`⚠ ${$.name}, Combine Dual Subtitles`, `Offset:${Offset}, Tolerance:${Tolerance}, Options:${Options}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	let DualSub = Options.includes("Reverse") ? Sub2 : Sub1
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`let DualSub内容: ${JSON.stringify(DualSub)}`, "");
	// 有序数列 用不着排序
	//FirstSub.body.sort((x, y) => x - y);
	//SecondSub.body.sort((x, y) => x - y);
	const length1 = Sub1.body.length, length2 = Sub2.body.length;
	let index0 = 0, index1 = 0, index2 = 0;
	// 双指针法查找两个数组中的相同元素
	while (index1 < length1 && index2 < length2) {
		const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp + Offset;
		const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
		//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
		//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
		//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
		if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
			index0 = Options.includes("Reverse") ? index2 : index1;
			// 多行字幕交替插入
			/*
			if (Array.isArray(text1) && Array.isArray(text2)) {
				let a = Options.includes("Reverse") ? text2 : text1;
				let b = Options.includes("Reverse") ? text1 : text2;
				let c = [];
				let length = a.length > b.length ? a.length : b.length;
				for (let j = 0; j < length; j++) {
					if (a[j]) c.push(a[j]);
					if (b[j]) c.push(b[j]);
				}
				DualSub.body[index0].text = c;
			} else 
			*/
			DualSub.body[index0].text = Options.includes("Reverse") ? `${text2}\n${text1}` : Options.includes("ShowOnly") ? text2 : `${text1}\n${text2}`;
			//$.log(`🚧`, `index0: ${index0}`, `text: ${DualSub.body[index0].text}`, "");
			//DualSub.body[index0].timeStamp = Options.includes("Reverse") ? timeStamp2 : timeStamp1;
			//DualSub.body[index0].index = Options.includes("Reverse") ? index2 : index1;
		}
		if (timeStamp2 > timeStamp1) index1++
		else if (timeStamp2 < timeStamp1) index2++
		else { index1++; index2++ }
	}
	//$.log(`🎉 ${$.name}, Combine Dual Subtitles`, `return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	return DualSub;
};

/** 
 * Chunk Array
 * @author VirgilClyne
 * @param {Array} source - source
 * @param {Number} length - number
 * @return {Promise<*>}
 */
async function chunk(source, length) {
	$.log(`⚠ ${$.name}, Chunk Array`, "");
    var index = 0, target = [];
    while(index < source.length) target.push(source.slice(index, index += length));
	//$.log(`🎉 ${$.name}, Chunk Array`, `target: ${JSON.stringify(target)}`, "");
	return target;
};

/**
 * Retries the given function until it succeeds given a number of retries and an interval between them. They are set
 * by default to retry 5 times with 1sec in between. There's also a flag to make the cooldown time exponential
 * https://gitlab.com/-/snippets/1775781
 * @author Daniel Iñigo <danielinigobanos@gmail.com>
 * @param {Function} fn - Returns a promise
 * @param {Array} argsArray - args Array
 * @param {Number} retriesLeft - Number of retries. If -1 will keep retrying
 * @param {Number} interval - Millis between retries. If exponential set to true will be doubled each retry
 * @param {Boolean} exponential - Flag for exponential back-off mode
 * @return {Promise<*>}
 */
async function retry(fn, argsArray = [], retriesLeft = 5, interval = 1000, exponential = false) {
	$.log(`${fn.name}`, `剩余重试次数:${retriesLeft}`, `时间间隔:${interval}ms`);
	try {
		const val = await fn.apply(this, argsArray);
		return val;
	} catch (error) {
		if (retriesLeft) {
			await new Promise(r => setTimeout(r, interval));
			return retry(fn, argsArray, retriesLeft - 1, exponential ? interval * 2 : interval, exponential);
		} else throw new Error("最大重试次数");
	}
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),a=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:r,headers:o,rawBody:a,body:n},n)},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:r,headers:o,rawBody:a,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.isSurge()||this.isQuanX()||this.isLoon()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}

// https://github.com/DualSubs/URL/blob/main/URLs.embedded.min.js
function URLs(s){return new class{constructor(s=[]){this.name="URL v1.0.1",this.opts=s,this.json={url:{scheme:"",host:"",path:""},params:{}}}parse(s){let t=s.match(/(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/)?.groups??null;return t?.path||(t.path=""),t?.params&&(t.params=Object.fromEntries(t.params.split("&").map((s=>s.split("="))))),t}stringify(s=this.json){return s?.params?s.scheme+"://"+s.host+"/"+s.path+"?"+Object.entries(s.params).map((s=>s.join("="))).join("&"):s.scheme+"://"+s.host+"/"+s.path}}(s)}

// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/json2xml.js
// minify: https://www.digitalocean.com/community/tools/minify
function XMLs(r){return new class{constructor(r){this.name="XML v0.1.4",this.opts=r}parse(r=new String,t=""){const n={"&amp;":"&","&lt;":"<","&gt;":">","&apos;":"'","&quot;":'"'},e="@";let s=function r(t,n){if("string"==typeof t)return t;var s=t.r;if(s)return s;var u,o=function(r,t){if(!r.t)return;for(var n,s,u=r.t.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/),o=u.length,l=0;l<o;l++){var c=i(u[l]);if(c){n||(n={});var p=c.indexOf("=");if(p<0)c=e+c,s=null;else{s=c.substr(p+1).replace(/^\s+/,""),c=e+c.substr(0,p).replace(/\s+$/,"");var g=s[0];g!==s[s.length-1]||"'"!==g&&'"'!==g||(s=s.substr(1,s.length-2)),s=a(s)}t&&(s=t(c,s)),f(n,c,s)}}return n}(t,n),l=t.f,c=l.length;if(o||c>1)u=o||{},l.forEach((function(t){"string"==typeof t?f(u,"#",t):f(u,t.n,r(t,n))}));else if(c){var p=l[0];if(u=r(p,n),p.n){var g={};g[p.n]=u,u=g}}else u=t.c?null:"";n&&(u=n(t.n||"",u));return u}(function(r){for(var t=String.prototype.split.call(r,/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/),n=t.length,e={f:[]},s=e,f=[],u=0;u<n;){var o=t[u++];o&&g(o);var l=t[u++];l&&c(l)}return e;function c(r){var t=r.length,n=r[0];if("/"===n)for(var e=r.replace(/^\/|[\s\/].*$/g,"").toLowerCase();f.length;){var i=s.n&&s.n.toLowerCase();if(s=f.pop(),i===e)break}else if("?"===n)p({n:"?",r:r.substr(1,t-2)});else if("!"===n)"[CDATA["===r.substr(1,7)&&"]]"===r.substr(-2)?g(r.substr(8,t-10)):p({n:"!",r:r.substr(1)});else{var a=function(r){var t={f:[]},n=(r=r.replace(/\s*\/?$/,"")).search(/[\s='"\/]/);n<0?t.n=r:(t.n=r.substr(0,n),t.t=r.substr(n));return t}(r);p(a),"/"===r[t-1]?a.c=1:(f.push(s),s=a)}}function p(r){s.f.push(r)}function g(r){(r=i(r))&&p(a(r))}}(r),t);return s;function i(r){return r&&r.replace(/^\s+|\s+$/g,"")}function a(r){return r.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g,(function(r){if("#"===r[1]){var t="x"===r[2]?parseInt(r.substr(3),16):parseInt(r.substr(2),10);if(t>-1)return String.fromCharCode(t)}return n[r]||r}))}function f(r,t,n){if(void 0!==n){var e=r[t];e instanceof Array?e.push(n):r[t]=t in r?[e,n]:n}}}stringify(r=new Object,t=""){var n="";for(var e in r)n+=s(r[e],e,"");return n=t?n.replace(/\t/g,t):n.replace(/\t|\n/g,"");function s(r,t,n){let e="";if(Array.isArray(r))e=r.reduce(((r,e)=>r+(n+s(e,t,n+"\t")+"\n")),"");else if("object"==typeof r){let i=!1;e+=n+"<"+t;for(let t in r)"@"==t.charAt(0)?e+=" "+t.substring(1)+'="'+r[t].toString()+'"':i=!0;if(e+=i?">":"/>",i){for(let t in r)"#"==t?e+=r[t]:"#cdata"==t?e+="<![CDATA["+r[t]+"]]>":"@"!=t.charAt(0)&&(e+=s(r[t],t,n+"\t"));e+=("\n"==e.charAt(e.length-1)?n:"")+"</"+t+">"}}else e+="?"===t?n+"<"+t+r.toString()+t+">":n+"<"+t+">"+r.toString()+"</"+t+">";return e}}}(r)}
