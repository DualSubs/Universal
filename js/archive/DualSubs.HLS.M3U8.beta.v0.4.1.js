/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs v0.4.1");
const M3U8 = new EXTM3U("EXTM3U v0.5.3");
const DataBase = {
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Settings.beta.min.json
	Settings: {"Verify":{"GoogleCloud":{"Mode":"Key","Auth":null},"Azure":{"Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Mode":"Free","Auth":null}},"Disney_Plus":{"Switch":true,"Type":["Official"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Prime_Video":{"Switch":true,"Type":["Official"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"HBO_Max":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":3,"Offset":0,"Tolerance":1000},"Hulu":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Paramount_Plus":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Discovery_Plus":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Netflix":{"Switch":true,"Type":["Official","Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"YouTube":{"Switch":true,"Type":["Official"],"Language":["ZH","EN"],"Position":"Forward"}},
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Languages.beta.min.json
	Languages: { "Disney_Plus": { "AR": "ar", "BG": "bg", "CS": "cs", "DA": "da", "DE": "de", "EL": "el", "EN-GB": "en", "EN-US": "en", "EN-US SDH": "en", "ES-419": "es-419", "ES-ES": "es-ES", "ET": "et", "FI": "fi", "FR": "fr-FR", "HU": "hu", "IT": "it", "JA": "ja", "KO": "ko", "LT": "lt", "LV": "lv", "NL": "nl", "NO": "no", "PL": "pl", "PT-PT": "pt-PT", "PT-BR": "pt-BR", "RO": "ro", "RU": "ru", "SK": "sk", "SL": "sl", "SV": "sv", "IS": "is", "ZH-HANS": "zh-Hans", "ZH-HK": "zh-HK", "ZH-HANT": "zh-Hant" }, "Prime_Video": { "AR": "ar-001", "BG": "bg-bg", "CS": "cs-cz", "DA": "da-dk", "DE": "de-de", "EL": "el-gr", "EN-GB": "en-gb", "EN-US": "en-us", "EN-US SDH": "en-us", "ES-419": "es-419", "ES-ES": "es-es", "ET": "et-ee", "FI": "fi-fi", "FR": "fr-fr", "HU": "hu-hu", "ID": "id-id", "IT": "it-it", "JA": "ja-jp", "KO": "ko-kr", "LT": "lt-lt", "LV": "lv-lv", "NL": "nl-nl", "NO": "nb-no", "PL": "pl-pl", "PT-PT": "pt-pt", "PT-BR": "pt-br", "RO": "ro-ro", "RU": "ru-ru", "SK": "sk-sk", "SL": "sl-si", "SV": "sv-se", "IS": "is-is", "ZH-HANS": "zh-hans", "ZH-HK": "zh-HK", "ZH-HANT": "zh-hant" }, "HBO_Max": { "AR": "ar-001", "BG": "bg-BG", "CS": "cs-CZ", "DA": "da-DK", "DE": "de-DE", "EL": "el-GR", "EN-GB": "en-UK", "EN-US": "en-US", "EN-US SDH": "en-US", "ES-419": "es-419", "ES-419 SDH": "es-419", "ES-ES": "es-ES", "ET": "et-EE", "FI": "fi-FI", "FR": "fr-FR", "HU": "hu-HU", "IT": "it-IT", "JA": "ja-JP", "KO": "ko-KR", "LT": "lt-LT", "LV": "lv-LV", "NL": "nl-NL", "NO": "nb-NO", "PL": "pl-PL", "PT-PT": "pt-PT", "PT-BR": "pt-BR", "RO": "ro-RO", "RU": "ru-RU", "SK": "sk-SK", "SL": "sl-SI", "SV": "sv-SE", "IS": "is-IS", "ZH-HANS": "zh-CN", "ZH-HK": "zh-HK", "ZH-HANT": "zh-TW" }, "Hulu": { "AR": "ar-001", "BG": "bul", "CS": "ces", "DA": "dan", "DE": "deu", "EL": "ell", "EN-GB": "eng", "EN-US": "eng", "EN-US SDH": "eng", "ES-419": "spa", "ES-ES": "spa", "ET": "est", "FI": "fin", "FR": "fra", "HU": "hun", "IT": "ita", "JA": "jpn", "KO": "kor", "LT": "lit", "LV": "lav", "NL": "nld", "NO": "nor", "PL": "por", "PT-PT": "por", "PT-BR": "por", "RO": "ron", "RU": "rus", "SK": "slk", "SL": "slv", "SV": "swe", "IS": "isl", "ZH-HANS": "zho", "ZH-HK": "zho", "ZH-HANT": "zho" }, "Paramount_Plus": { "AR": "ar", "BG": "bg", "CS": "cs", "DA": "da", "DE": "de", "EL": "el", "EN-GB": "en", "EN-US": "en", "EN-US SDH": "en", "ES-419": "es-419", "ES-ES": "es-ES", "ET": "et", "FI": "fi", "FR": "fr-FR", "HU": "hu", "IT": "it", "JA": "ja", "KO": "ko", "LT": "lt", "LV": "lv", "NL": "nl", "NO": "no", "PL": "pl", "PT-PT": "pt-PT", "PT-BR": "pt-BR", "RO": "ro", "RU": "ru", "SK": "sk", "SL": "sl", "SV": "sv", "IS": "is", "ZH-HANS": "zh-Hans", "ZH-HK": "zh-HK", "ZH-HANT": "zh-Hant" }, "Discovery_Plus": { "BG": "bg-BG", "CS": "cs-CZ", "DA": "da-DK", "DE": "de", "EL": "el", "EN-GB": "en", "EN-US": "en-US", "EN-US SDH": "en-US SDH", "ES-419": "es-419", "ES-ES": "es-ES", "ET": "et-EE", "FI": "fi", "FR": "fr", "HU": "hu-HU", "IT": "it", "JA": "ja", "KO": "ko", "LT": "lt-LT", "LV": "lv-LV", "NL": "nl-NL", "PL": "pl-PL", "PT-PT": "pt-PT", "PT-BR": "pt-BR", "RO": "ro-RO", "RU": "ru-RU", "SK": "sk-SK", "SL": "sl-SI", "SV": "sv-SE", "ZH-HANS": "zh-CN", "ZH-HK": "zh-HK", "ZH-HANT": "zh-TW" }, "Netflix": {}, "YouTube": { "BG": "bg-BG", "CS": "cs", "DA": "da-DK", "DE": "de", "EL": "el", "EN-GB": "en", "EN-US": "en-US", "EN-US SDH": "en-US SDH", "ES-419": "es-419", "ES-ES": "es-ES", "ET": "et-EE", "FI": "fi", "FR": "fr", "HU": "hu-HU", "IT": "it", "JA": "ja", "KO": "ko", "LT": "lt-LT", "LV": "lv-LV", "NL": "nl-NL", "NO": "nb-NO", "PL": "pl-PL", "PT-PT": "pt-PT", "PT-BR": "pt-BR", "RO": "ro-RO", "RU": "ru-RU", "SK": "sk-SK", "SL": "sl-SI", "SV": "sv-SE", "IS": "is-IS", "ZH-HANS": "zh-Hans", "ZH-HK": "zh-Hant-HK", "ZH-HANT": "zh-Hant" }, "Google": { "AUTO": "", "AR": "ar", "BG": "bg", "CS": "cs", "DA": "da", "DE": "de", "EL": "el", "EN": "en", "EN-GB": "en", "EN-US": "en", "EN-US SDH": "en", "ES-419": "es", "ES-ES": "es", "ET": "et", "FI": "fi", "FR": "fr", "HU": "hu", "IT": "it", "JA": "ja", "KO": "ko", "LT": "lt", "LV": "lv", "NL": "nl", "NO": "no", "PL": "pl", "PT-PT": "pt", "PT-BR": "pt", "RO": "ro", "RU": "ru", "SK": "sk", "SL": "sl", "SV": "sv", "IS": "is", "ZH": "zh-CN", "ZH-HANS": "zh-CN", "ZH-HK": "zh-HK", "ZH-HANT": "zh-TW" }, "Microsoft": { "AUTO": "", "AR": "ar", "BG": "bg", "CS": "cs", "DA": "da", "DE": "de", "EL": "el", "EN": "en", "EN-GB": "en", "EN-US": "en", "EN-US SDH": "en", "ES-419": "es", "ES-ES": "es", "ET": "et", "FI": "fi", "FR": "fr", "HU": "hu", "IT": "it", "JA": "ja", "KO": "ko", "LT": "lt", "LV": "lv", "NL": "nl", "NO": "no", "PL": "pl", "PT-PT": "pt", "PT-BR": "pt", "RO": "ro", "RU": "ru", "SK": "sk", "SL": "sl", "SV": "sv", "IS": "is", "ZH": "zh-Hans", "ZH-HANS": "zh-Hans", "ZH-HK": "zh-Hant", "ZH-HANT": "zh-Hant" }, "DeepL": { "AUTO": "", "BG": "BG", "CS": "CS", "DA": "DA", "DE": "de", "EL": "el", "EN": "EN-US", "EN-GB": "EN-GB", "EN-US": "EN-US", "EN-US SDH": "EN-US", "ES-419": "ES", "ES-ES": "ES", "ET": "ET", "FI": "FI", "FR": "FR", "HU": "HU", "IT": "IT", "JA": "JA", "KO": "ko", "LT": "LT", "LV": "LV", "NL": "NL", "PL": "PL", "PT": "PT", "PT-PT": "PT-PT", "PT-BR": "PT-BR", "RO": "RO", "RU": "RU", "SK": "SK", "SL": "SL", "SV": "SV", "ZH": "ZH", "ZH-HANS": "ZH", "ZH-HK": "ZH", "ZH-HANT": "ZH" } }
};
const url = $request.url
let body = $response.body

/***************** Processing *****************/
!(async () => {
	const Platform = await getPlatform(url);
	[$.Settings, $.Languages, $.Cache] = await setENV(Platform, DataBase);
	if ($.Settings.Switch) {
		// 找缓存
		let Index = await getCacheIndex($.Cache)

		// 序列化M3U8
		let PlayList = M3U8.parse(body)
		//$.log(`🚧 ${$.name}`, "M3U8.parse", JSON.stringify(PlayList), "");

		// 创建缓存
		let Cache = {
			// PlayList.m3u8 URL
			URL: url,
			// 提取数据
			[$.Settings.Language[0]]: await getMEDIA(PlayList, "SUBTITLES", $.Settings.Language[0]),
			[$.Settings.Language[1]]: await getMEDIA(PlayList, "SUBTITLES", $.Settings.Language[1])
		}
		$.log(`🚧 ${$.name}`, "Cache.stringify", JSON.stringify(Cache), "");

		$.Cache = await setCache(Index, $.Cache, Cache, $.Settings.CacheSize)
		$.setjson($.Cache, `@DualSubs.${Platform}.Cache`)
		
		// 语言回退机制
		/*
		let Language1 = (Cache[$.Settings.Language[0]].Index === -1) ? Cache[$.Settings.Language[1]]
			: (Cache[$.Settings.Language[1]].Index === -1) ? Cache[$.Settings.Language[0]]
				: null
		let Language1ST = (Cache[$.Settings.Language[0]].Index != -1) ? Cache[$.Settings.Language[0]]
			: (Cache[$.Settings.Language[1]].Index != -1) ? Cache[$.Settings.Language[1]]
				: null
		let Language2ND = (Cache[$.Settings.Language[1]].Index != -1) ? Cache[$.Settings.Language[1]]
			: (Cache[$.Settings.Language[0]].Index != -1) ? Cache[$.Settings.Language[0]]
				: null
		*/
		
		// 创建字幕选项
		let DualSubs_Array = await setDualSubs_Array(Cache[$.Settings.Language[0]], Cache[$.Settings.Language[1]], $.Settings.Type, Platform);
		// 插入字幕选项
		PlayList.body.splice(Cache[$.Settings.Language[0]].Index + 1, 0, ...DualSubs_Array)
		
		// 字符串M3U8
		PlayList = M3U8.stringify(PlayList);
		//$.log(`🚧 ${$.name}`, "PlayList.stringify", JSON.stringify(PlayList), "");
		body = PlayList;
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done({ body }))

/***************** Fuctions *****************/
// Function 1
// Get Platform
async function getPlatform(url) {
	$.log(`⚠ ${$.name}, Get Platform`, "");
	let platform = url.match(/\.(dssott|starott)\.com/i) ? "Disney_Plus"
		: url.match(/\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i) ? "Prime_Video"
			: url.match(/\.(api\.hbo|hbomaxcdn)\.com/i) ? "HBO_Max"
				: url.match(/\.(hulustream|huluim)\.com/i) ? "Hulu"
					: (url.match(/\.(cbsaavideo|cbsivideo)\.com/i)) ? "Paramount_Plus"
						: (url.match(/\.peacocktv\.com/i)) ? "Peacock"
							: url.match(/\.uplynk\.com/i) ? "Discovery_Plus"
								: url.match(/www\.youtube\.com/i) ? "YouTube"
									: url.match(/\.nflxvideo\.net/i) ? "Netflix"
										: undefined
	$.log(`🎉 ${$.name}, Get Platform`, `platform: ${platform}`, "");
	return platform
};

// Function 2
// Set Environment Variables
async function setENV(platform, database) {
	$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	/***************** Settings *****************/
	let BoxJs = $.getjson("DualSubs", database) // BoxJs
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `$.BoxJs类型: ${typeof $.BoxJs}`, `$.BoxJs内容: ${JSON.stringify($.BoxJs)}`, "");
	let Settings = BoxJs[platform]?.Settings || database?.Settings?.[platform];
	Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
	if (typeof Settings.Type == "string") Settings.Type = Settings.Type.split(",") // BoxJs字符串转数组
	Settings.CacheSize = parseInt(Settings.CacheSize,10) // BoxJs字符串转数字
	Settings.Offset = parseInt(Settings.Offset,10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance,10) // BoxJs字符串转数字
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Languages *****************/
	let Languages = database?.Languages?.[platform];
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Language内容: ${Language}`, "");
	/***************** Cache *****************/
	let Cache = BoxJs[platform]?.Cache || [];
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Cache类型: ${typeof Cache}`, `$.Cache内容: ${Cache}`, "");
	if (typeof Cache == "string") Cache = JSON.parse(Cache)
	//$.log(`🎉 ${$.name}, Set Environment Variables`, `Cache类型: ${typeof Cache}`, `Cache内容: ${JSON.stringify(Cache)}`, "");
	return [Settings, Languages, Cache];
};

// Function 3
// Get Cache Index
async function getCacheIndex(cache = {}) {
	$.log(`⚠ ${$.name}, Get Cache Index`, "");
	let index = cache.findIndex(item => {
		let URLs = [item?.URL, item?.[$.Settings.Language[0]]?.URI, item?.[$.Settings.Language[1]]?.URI, ...item?.[$.Settings.Language[0]]?.VTTs ?? [], ...item?.[$.Settings.Language[1]]?.VTTs ?? []]
		$.log(`🎉 ${$.name}, 调试信息`, " Get Cache Index", `URLs: ${URLs}`, "");
		// 方法1
		// URLs中有一项包含在url中即true
		for (let URL of URLs) {
			if (url.includes(URL)) return true
		}
		// 以下不适用，因为存在相对路径和加参数路径，所以url始终包含URL
		// 方法2
		// 扩展运算符，展开后查询
		//if (URLs.includes(url)) return true
		// 方法3
		// Array.includes不能用于嵌套数组，所以先转字符串
		//if (JSON.stringify(URLs).includes(url)) return true
	})
	$.log(`🎉 ${$.name}, 调试信息`, " Get Cache Index", `index: ${index}`, "");
	return index
};

// Function 4
// Set Cache
async function setCache(index = -1, target = {}, sources = {}, num = 1) {
	$.log(`⚠ ${$.name}, Set Cache`, "");
	// 刷新播放记录，所以始终置顶
	if (index !== -1) {
		Object.assign(target[index], sources) // 合并
		if (index !== 0) target.unshift(target.splice(index, 1)[0]) // 置顶
	}
	if (index === -1) {
		target.unshift(sources) // 头部插入缓存
		target = target.filter(Boolean).slice(0, num) // 设置缓存数量
	}
	/*
	if (index !== -1) {
		// 合并缓存
		Object.assign(target[index], sources)
		// 置顶
		if (index !== 0) target.unshift(target.splice(index, 1)[0])
	} else { // 无缓存
		$.log(`🚧 ${$.name}`, "无匹配结果", "");
		// 设置缓存数量
		target = target.filter(Boolean).slice(0, num) //去空, 留$.Settings.PlaylistNumber
		// 头部插入缓存
		target.unshift(sources)
	}
	*/
	$.log(`🎉 ${$.name},  Set Cache`, `target: ${JSON.stringify(target)}`, "");
	return target
};

// Function 5
// Get EXT-X-MEDIA Data
async function getMEDIA(json = {}, type = "", langCode = "") {
	$.log(`⚠ ${$.name}, Get EXT-X-MEDIA Data`, "");
	// 自动语言转换
	let langcode = (langCode == "ZH") ? ["ZH-HANS", "ZH-HANT", "ZH-HK"] // 中文（自动）
	: (langCode == "EN") ? ["EN-US SDH", "EN-US", "EN-GB"] // 英语（自动）
		: (langCode == "ES") ? ["ES-419 SDH", "ES-419", "ES-ES SDH", "ES-ES"] // 西班牙语（自动）
			: langCode
	$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA Index", `langcode: ${langcode}`, "");
	//查询是否有符合语言的字幕
	let index = new Number
	if (Array.isArray(langcode)) {
		for (var lang of langcode) {
			lang = $.Languages[lang]
			index = json.body.findIndex(item => { if (item.OPTION?.TYPE == type && item.OPTION?.LANGUAGE == `\"${lang}\"`) return true });
			if (index !== -1) break;
		}
	} else {
		lang = $.Languages[langcode]
		index = json.body.findIndex(item => { if (item.OPTION?.TYPE == type && item.OPTION?.LANGUAGE == `\"${lang}\"`) return true });
	}
	//$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA Index", `Index: ${index}`, "");
	let obj = (index != -1) ? json.body[index] : null;
	//$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA Object", `Object: ${JSON.stringify(obj)}`, "");
	let name = obj?.OPTION.NAME.replace(/\"/g, "") ?? langCode;
	//$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA Object", `Name: ${name}`, "");
	let language = obj?.OPTION.LANGUAGE.replace(/\"/g, "") ?? langCode;
	//$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA Object", `Language: ${language}`, "");
	let URI = obj?.OPTION.URI.replace(/\"/g, "") ?? null;
	// if 相对路径
	if (!/^https?:\/\//i.test(URI)) {
		let PATH = url.match(/^(?<PATH>https?:\/\/(?:.+)\/)(?<fileName>[^\/]+\.m3u8)/i)?.groups?.PATH ?? ""
		//$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.m3u8 URL", `url.match: ${PATH}`, "");
		URI = (URI == null) ? URI : PATH + URI
	};
	//$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA URI", `URI: ${URI}`, "");
	let data = { "Index": index, "Name": name, "Language": language, ...obj, "URI": URI }
	//$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA Data", `Data: ${JSON.stringify(data)}`, "");
	return data
};

// Function 6
// Set DualSubs Subtitle Array
async function setDualSubs_Array(obj1 = {}, obj2 = {}, type = [], platform = "") {
	// 无首选语言时删除官方字幕选项
	if (obj1.Index === -1) type.splice(type.indexOf("Official"), 1)
	let newSubs = type.map((item, i) => {
		//$.log(`🎉 ${$.name}, 调试信息`, "Set DualSubs Subtitle Array", `item: ${JSON.stringify(item)}`, "");

		let newSub = (obj1.Index !== -1) ? JSON.parse(JSON.stringify(obj1)) // 复制此语言选项
			: JSON.parse(JSON.stringify(obj2))
		//$.log(`🎉 ${$.name}, 调试信息`, "Set DualSubs Subtitle Array", `newSub: ${JSON.stringify(newSub)}`, "");
		
		//newSub.OPTION.NAME = newSub.OPTION.NAME.replace(/^\"([^\/]+)(.*)\"$/, `\"$1/${lang2ndName}(${item})\"`) // 修改名称
		//newSub.OPTION.NAME = `\"${obj1.OPTION.NAME.replace(/\"/g, "")}/${obj2.OPTION.NAME.replace(/\"/g, "")}(${item})\"` // 修改名称
		newSub.OPTION.NAME = (platform == "HBO_Max") ? `\"${obj1.Name}\"`
			: `\"${obj1.Name}/${obj2.Name} (${item})\"` // 修改名称
		//$.log(`🎉 ${$.name}, 调试信息`, "Set DualSubs Subtitle Array", `newSub.OPTION.NAME.replace: ${newSub.OPTION.NAME}`, "");

		//newSub.OPTION.LANGUAGE = newSub.OPTION.LANGUAGE.replace(/^\"([^\/]+)(.*)\"$/, `\"$1/${lang2ndName}\"`) // 修改语言代码
		//newSub.OPTION.LANGUAGE = `\"${obj1.OPTION.LANGUAGE.replace(/\"/g, "")}/${obj2.OPTION.LANGUAGE.replace(/\"/g, "")}\"` // 修改语言代码
		newSub.OPTION.LANGUAGE = (platform == "Disney_Plus") ? `\"${obj1.Language}/${obj2.Language}--${item}--\"`
			: (platform == "HBO_Max") ? `\"${obj1.Language}\"`
				: `\"${obj1.Language}/${obj2.Language}--${item}--\"` // 修改语言代码
		//$.log(`🎉 ${$.name}, 调试信息`, "Set DualSubs Subtitle Array", `newSub.OPTION.LANGUAGE.replace: ${newSub.OPTION.LANGUAGE}`, "");

		//newSub.OPTION.URI = newSub.OPTION.URI.replace(/^\"([^%%]+)(.*)\"$/, `\"$1%%${item}%%\"`) // 修改链接
		//newSub.OPTION.URI = `\"${newSub.OPTION.URI.replace(/\"/g, "")}%${item}%\"` // 修改链接
		newSub.OPTION.URI = `\"${newSub.URI}%${item}%\"` // 修改链接
		//$.log(`🎉 ${$.name}, 调试信息`, "Set DualSubs Subtitle Array", `newSub.OPTION.URI: ${JSON.stringify(newSub.OPTION.URI)}`, "");
		
		//$.log(`🎉 ${$.name}, 调试信息`, "Set DualSubs Subtitle Array", `newSub: ${JSON.stringify(newSub)}`, "");
		return newSub
	})
	$.log(`🎉 ${$.name}, 调试信息`, "Set DualSubs Subtitle Array", `newSubs: ${JSON.stringify(newSubs)}`, "");
	return newSubs
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

// https://github.com/DualSubs/EXTM3U/blob/main/EXTM3U.min.js
function EXTM3U(n,e){return new class{constructor(n,e){this.name=n,Object.assign(this,e)}parse(n="",e=[]){const t=/^(?<EXT>(EXT|AIV)[^:]+):(?<OPTION>.+)([^](?<URI>.+))?[^]*$/;let o={headers:n.match(/^#(?<fileType>EXTM3U)?[^]*/)?.groups??"",option:n.match(/^#(?<EXT>EXT-X-[^:]+)$/gm)??[],body:n.split(/[^]#/).map((n=>n.match(t)?.groups??""))};return o.body=o.body.map((n=>(/=/.test(n?.OPTION)&&(n.OPTION=Object.fromEntries(n.OPTION.split(/,(?=[A-Z])/).map((n=>n.split(/=(.*)/))))),n))),o}stringify(n={headers:{},option:[],body:[]},e=["\n"]){const t=e.includes("\n")?"\n":e.includes("\r")?"\r":e.includes("\r\n")?"\r\n":"\n";return[n.headers="#"+n.headers.fileType,n.option=n.option.join(t),n.body=n.body.map((n=>{if(n)return"object"==typeof n?.OPTION&&(n.OPTION=Object.entries(n.OPTION).map((n=>n.join("="))).join(",")),"EXT-X-STREAM-INF"==n.EXT?"#"+n.EXT+":"+n.OPTION+t+n.URI:"#"+n.EXT+":"+n.OPTION})).join(t)].join(t)}}(n,e)}
