/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs v0.5.3");
const M3U8 = new EXTM3U(["EXT-X-MEDIA", "\n"]);
const DataBase = {
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Settings.beta.min.json
	Settings: {"Verify":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}},"Advanced":{"Translator":{"Times":3,"Interval":100,"Exponential":true}},"Apple":{"Switch":true,"Types":["Official","Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_TV":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_TV_Plus":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_Fitness":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Disney_Plus":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":5,"Offset":0,"Tolerance":1000},"Prime_Video":{"Switch":true,"Types":["Official","Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"HBO_Max":{"Switch":true,"Types":["Google"],"Type":"Google","Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Hulu":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Paramount_Plus":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Discovery_Plus_Ph":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Peacock_TV":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Discovery_Plus":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Netflix":{"Switch":true,"Types":["Official","Google","External"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"YouTube":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000}},
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Languages.beta.min.json
	Languages: {"Apple":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"cmn","ZH-HANS":"cmn-Hans","ZH-HK":"yue-Hant","ZH-HANT":"cmn-Hant"},"Disney_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Prime_Video":{"AR":"ar-001","BG":"bg-bg","CS":"cs-cz","DA":"da-dk","DE":"de-de","EL":"el-gr","EN":"en","EN-GB":"en-gb","EN-US":"en-us","EN-US SDH":"en-us","ES-419":"es-419","ES-ES":"es-es","ET":"et-ee","FI":"fi-fi","FR":"fr-fr","HU":"hu-hu","ID":"id-id","IT":"it-it","JA":"ja-jp","KO":"ko-kr","LT":"lt-lt","LV":"lv-lv","NL":"nl-nl","NO":"nb-no","PL":"pl-pl","PT":"pt","PT-PT":"pt-pt","PT-BR":"pt-br","RO":"ro-ro","RU":"ru-ru","SK":"sk-sk","SL":"sl-si","SV":"sv-se","IS":"is-is","ZH":"zh","ZH-HANS":"zh-hans","ZH-HK":"zh-HK","ZH-HANT":"zh-hant"},"HBO_Max":{"AR":"ar-001","BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de-DE","EL":"el-GR","EN":"en","EN-GB":"en-UK","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-419 SDH":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi-FI","FR":"fr-FR","HU":"hu-HU","IT":"it-IT","JA":"ja-JP","KO":"ko-KR","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Hulu":{"AR":"ar-001","BG":"bul","CS":"ces","DA":"dan","DE":"deu","EL":"ell","EN":"eng","EN-GB":"eng","EN-US":"eng","EN-US SDH":"eng","ES-419":"spa","ES-ES":"spa","ET":"est","FI":"fin","FR":"fra","HU":"hun","IT":"ita","JA":"jpn","KO":"kor","LT":"lit","LV":"lav","NL":"nld","NO":"nor","PL":"pol","PT":"por","PT-PT":"por","PT-BR":"por","RO":"ron","RU":"rus","SK":"slk","SL":"slv","SV":"swe","IS":"isl","ZH":"zh","ZH-HANS":"zho","ZH-HK":"zho","ZH-HANT":"zho"},"Paramount_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus_Ph":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Peacock_TV":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus":{"BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Netflix":{},"YouTube":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW","YUE":"yue","YUE-HK":"yue-HK"},"Google":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT-PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}
};

const url = $request.url
$.log(`🚧 ${$.name}`, `url: ${url}`, "");

const method = $request.method
if (method == "OPTIONS") $.done();

const headers = $request.headers

/***************** Processing *****************/
!(async () => {
	[$.Platform, $.Verify, $.Advanced, $.Settings, $.Cache] = await setENV(url, DataBase);
	if ($.Settings.Switch) {
		// 找缓存
		let [Indices = {}, Cache = {}] = await getCache($.Cache);
		// 序列化M3U8
		let PlayList = M3U8.parse($response.body);
		// PlayList.m3u8 URL
		Cache.URL = url;
		// 提取数据 用遍历语法可以兼容自定义数量的语言查询
		for await (var language of $.Settings.Languages) {
			Cache[language] = await getMEDIA($.Platform, PlayList, "SUBTITLES", language);
			//$.log(`🚧 ${$.name}`, `Cache[${language}]`, JSON.stringify(Cache[language]), "");
		};
		// 写入缓存
		$.Cache = await setCache(Indices.Index, $.Cache, Cache, $.Settings.CacheSize);
		$.setjson($.Cache, `@DualSubs.Cache.${$.Platform}`);
		// 兼容性判断
		const standard = await isStandard($.Platform, url, headers);
		// 写入选项
		PlayList = await setOptions($.Platform, PlayList, Cache[$.Settings.Languages[0]], Cache[$.Settings.Languages[1]], $.Settings.Types, standard, $.Settings.Type);
		// 字符串M3U8
		PlayList = M3U8.stringify(PlayList);
		$response.body = PlayList;
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response))

/***************** Fuctions *****************/
// Function 1
// Set Environment Variables
async function setENV(e,t){const a=e.match(/\.apple\.com/i)?"Apple":e.match(/\.(dssott|starott)\.com/i)?"Disney_Plus":e.match(/\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i)?"Prime_Video":e.match(/\.(api\.hbo|hbomaxcdn)\.com/i)?"HBO_Max":e.match(/\.(hulustream|huluim)\.com/i)?"Hulu":e.match(/\.(cbsaavideo|cbsivideo)\.com/i)?"Paramount_Plus":e.match(/dplus-ph-/i)?"Discovery_Plus_Ph":e.match(/\.peacocktv\.com/i)?"Peacock":e.match(/\.uplynk\.com/i)?"Discovery_Plus":e.match(/\.youtube\.com/i)?"YouTube":e.match(/\.nflxvideo\.net/i)?"Netflix":void 0;let s=$.getjson("DualSubs",t),l=s?.Settings?.Verify||t?.Settings?.Verify,o=s?.Settings?.Advanced||t?.Settings?.Advanced;o.Translator.Times=parseInt(o.Translator.Times,10),o.Translator.Interval=parseInt(o.Translator.Interval,10),o.Translator.Exponential=JSON.parse(o.Translator.Exponential);let i=s?.Settings?.[a]||t?.Settings?.[a];if("Apple"==a){let a=e.match(/\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/subscription\//i)?"Apple_TV_Plus":e.match(/\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/workout\//i)?"Apple_Fitness":e.match(/\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\//i)?"Apple_TV":e.match(/vod-.*-aoc\.tv\.apple\.com/i)?"Apple_TV_Plus":e.match(/vod-.*-amt\.tv\.apple\.com/i)?"Apple_TV":e.match(/(hls|hls-svod)\.itunes\.apple\.com/i)?"Apple_Fitness":"Apple";i=s?.Settings?.[a]||t?.Settings?.[a]}i.Switch=JSON.parse(i.Switch),"string"==typeof i.Types&&(i.Types=i.Types.split(",")),l.GoogleCloud.Auth||(i.Types=i.Types.filter((e=>"GoogleCloud"!==e))),l.Azure.Auth||(i.Types=i.Types.filter((e=>"Azure"!==e))),l.DeepL.Auth||(i.Types=i.Types.filter((e=>"DeepL"!==e))),i.CacheSize=parseInt(i.CacheSize,10),i.Offset=parseInt(i.Offset,10),i.Tolerance=parseInt(i.Tolerance,10);let c=s?.Cache?.[a]||[];return"string"==typeof c&&(c=JSON.parse(c)),[a,l,o,i,c]}

// Function 2
// Get Cache
async function getCache(cache = {}) {
	$.log(`⚠ ${$.name}, Get Cache`, "");
	let Indices = { "Index": await getIndex(cache) };
	$.log(`🎉 ${$.name}, Get Cache`, `Indices.Index: ${Indices.Index}`, "");
	for await (var language of $.Settings.Languages) Indices[language] = await getDataIndex(Indices.Index, language)
	$.log(`🎉 ${$.name}, Get Cache`, `Indices: ${JSON.stringify(Indices)}`, "");
	return [Indices, cache[Indices.Index]]
	/***************** Fuctions *****************/
	async function getIndex(cache) {
		return cache.findIndex(item => {
			let URLs = [item?.URL];
			for (var language of $.Settings.Languages) URLs.push(item?.[language]?.map(d => getURIs(d)));
			$.log(`🎉 ${$.name}, 调试信息`, " Get Index", `URLs: ${URLs}`, "");
			return URLs.flat(Infinity).some(URL => url.includes(URL || null));
		})
	};
	async function getDataIndex(index, lang) { return cache?.[index]?.[lang]?.findIndex(item => getURIs(item).flat(Infinity).some(URL => url.includes(URL || null))); };
	function getURIs(item) { return [item?.URI, item?.VTTs] }
};

// Function 3
// Set Cache
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
// Get EXT-X-MEDIA Data
async function getMEDIA(platform = "", json = {}, type = "", langCode = "") {
	$.log(`⚠ ${$.name}, Get EXT-X-MEDIA Data`, "");
	// 自动语言转换
	let langcodes = await switchLangCode(platform, langCode, DataBase);
	//查询是否有符合语言的字幕
	let datas = [];
	for await (var langcode of langcodes) {
		datas = json.body.filter(item => (item?.OPTION?.TYPE == type && item?.OPTION?.LANGUAGE == langcode));
		if (datas.length !== 0) {
			datas = await Promise.all(datas.map(async data => await setMEDIA(data, langcode)));
			break;
		} else datas = [await setMEDIA({}, langcodes[0])];
	};
	//$.log(`🎉 ${$.name}, 调试信息`, "Get EXT-X-MEDIA Data", `datas: ${JSON.stringify(datas)}`, "");
	return datas

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
		langcodes = langcodes.map((langcode) => `\"${database?.Languages?.[platform]?.[langcode]}\"`)
		$.log(`🎉 ${$.name}, Switch Language Code`, `langcodes: ${langcodes}`, "");
		return langcodes
	};
	// Function 4.2
	// Get Absolute Path
	function aPath(aURL = "", URL = "") { return (/^https?:\/\//i.test(URL)) ? URL : aURL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URL };
	// Function 5.1
	// Set EXT-X-MEDIA Data
	async function setMEDIA(data = {}, langCode = "") {
		$.log(`⚠ ${$.name}, Set EXT-X-MEDIA Data`, "");
		let Data = { ...data };
		Data.Name = (data?.OPTION?.NAME ?? langCode).replace(/\"/g, "");
		Data.Language = (data?.OPTION?.LANGUAGE ?? langCode).replace(/\"/g, "");
		Data.URI = aPath(url, data?.OPTION?.URI.replace(/\"/g, "") ?? null);
		//$.log(`🎉 ${$.name}, 调试信息`, "set EXT-X-MEDIA Data", `Data: ${JSON.stringify(Data)}`, "");
		return Data
	};
};

// Function 5
// Set DualSubs Subtitle Options
async function setOptions(Platform = "", Json = {}, Languages1 = [], Languages2 = [], Types = [], Standard = true, Type = "") {
	// 兼容性设置
	Types = (Standard == true) ? Types : [Type];
	$.log(`⚠ ${$.name}, Set DualSubs Subtitle Options`, `Types: ${Types}`, "");
	for await (var obj1 of Languages1) {
		for await (var obj2 of Languages2) {
			// 无首选字幕时
			if (!obj1?.EXT) {
				// 无首选语言时删除官方字幕选项
				Types = Types.filter(e => e !== "Official");
				Options = await getOptions(Platform, obj1, obj2, Types, Standard);
				if (Options.length !== 0) {
					// 计算位置
					let Index = await getIndex(Platform, Json, obj2);
					// 插入字幕选项
					await insertOptions(Json, Index, Options, Standard);
				};
			}
			else if (obj2?.OPTION?.FORCED !== "YES") { // 强制字幕不生成
				//$.log(`🚧 ${$.name}`, "obj2?.OPTION.FORCED", obj2?.OPTION.FORCED, "");
				if (obj1?.OPTION?.["GROUP-ID"] == obj2?.OPTION?.["GROUP-ID"]) { // 只生成同组字幕
					//$.log(`🚧 ${$.name}`, "obj1?.OPTION[\"GROUP-ID\"]", obj1?.OPTION["GROUP-ID"], "");
					//$.log(`🚧 ${$.name}`, "obj2?.OPTION[\"GROUP-ID\"]", obj2?.OPTION["GROUP-ID"], "");
					// 创建字幕选项
					let Options = [];
					if (Platform == "Apple") { // Apple兼容
						if (obj1?.OPTION.CHARACTERISTICS == obj2?.OPTION.CHARACTERISTICS) {  // 只生成属性相同
							Options = await getOptions(Platform, obj1, obj2, Types, Standard);
						}
					} else {
						Options = await getOptions(Platform, obj1, obj2, Types, Standard);
					};
					$.log(`🎉 ${$.name}, Set DualSubs Subtitle Options`, `Options: ${JSON.stringify(Options)}`, "");
					if (Options.length !== 0) {
						// 计算位置
						let Index = await getIndex(Platform, Json, obj1);
						// 插入字幕选项
						await insertOptions(Json, Index, Options, Standard);
					};
				};
			};
		}
	};
	return Json

	/***************** Fuctions *****************/
	// Function 5.1
	// Get DualSubs Subtitle Options
	async function getOptions(platform = "", obj1 = {}, obj2 = {}, types = [], standard) {
		$.log(`⚠ ${$.name}, 调试信息`, "Get DualSubs Subtitle Options", `types: ${types}`, "");
		return types.map(type => {
			// 复制此语言选项
			let newSub = (obj1?.EXT) ? JSON.parse(JSON.stringify(obj1))
				: JSON.parse(JSON.stringify(obj2))
			// 修改名称
			newSub.OPTION.NAME = `\"${obj1.Name}/${obj2.Name} [${type}]\"`
			// 修改语言代码
			newSub.OPTION.LANGUAGE = (platform == "Disney_Plus" || platform == "Hulu" || platform == "Discovery_Plus_Ph") ? `\"${obj1.Language} ${obj2.Language} ${type}\"`
					: (standard) ? `\"${obj1.Language}\"` : `\"${obj2.Language}\"`
			// 增加副语言
			newSub.OPTION["ASSOC-LANGUAGE"] = (standard) ? `\"${obj2.Language}\"` : (!standard) ? `\"${obj1.Language}\"` : `\"${obj2.Language} ${type}\"`
			// 修改链接
			newSub.OPTION.URI = (newSub.URI.includes("?")) ? `\"${newSub.URI}&dualsubs=${type}\"`
				: `\"${newSub.URI}?dualsubs=${type}\"`
			// 非自动选择
			newSub.OPTION.AUTOSELECT = "NO"
			$.log(`🎉 ${$.name}, Get DualSubs Subtitle Options`, `newSub: ${JSON.stringify(newSub)}`, "");
			return newSub
		})
	};
	// Function 5.2
	// Get Same Options Index
	async function getIndex(platform, json, obj) {
		$.log(`⚠ ${$.name}, Get Same Options Index`, "");
		// 计算位置
		let Index = json.body.findIndex(item => {
			if (platform == "Apple") {
				if (item?.OPTION?.LANGUAGE == obj?.OPTION?.LANGUAGE
					&& item?.OPTION?.["GROUP-ID"] == obj?.OPTION?.["GROUP-ID"]
					&& item?.OPTION?.["STABLE-RENDITION-ID"] == obj?.OPTION?.["STABLE-RENDITION-ID"]) {
					return true
				}
			} else {
				if (item?.OPTION?.LANGUAGE == obj?.OPTION?.LANGUAGE
					&& item?.OPTION?.["GROUP-ID"] == obj?.OPTION?.["GROUP-ID"]) {
					return true
				}
			}
		})
		$.log(`🎉 ${$.name}, Get Same Options Index`, `Index: ${Index}`, "");
		return Index
	};
	// Function 5.3
	// Insert Options
	async function insertOptions(json, index, options, standard) {
		$.log(`⚠ ${$.name}, Insert Options`, "");
		// 插入字幕选项
		if (standard == true) json.body.splice(index + 1, 0, ...options)
		else json.body.splice(index, 1, ...options); // 兼容性设置
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

// https://github.com/DualSubs/EXTM3U/blob/main/EXTM3U.min.js
function EXTM3U(t){return new class{constructor(t){this.name="EXTM3U v0.6.0",this.opts=t,this.newLine=this.opts.includes("\n")?"\n":this.opts.includes("\r")?"\r":this.opts.includes("\r\n")?"\r\n":"\n",this.m3u8=new String,this.json={headers:{},option:[],body:[]}}parse(t=this.m3u8){const i=/^(?<EXT>(EXT|AIV)[^:]+):(?<OPTION>.+)([^](?<URI>.+))?[^]*$/;let n={headers:t.match(/^#(?<fileType>EXTM3U)?[^]*/)?.groups??"",option:t.match(/^#(?<EXT>EXT-X-[^:]+)$/gm)??[],body:t.split(/[^]#/).map((t=>t.match(i)?.groups??""))};return n.body=n.body.map((t=>(/=/.test(t?.OPTION)&&this.opts.includes(t.EXT)&&(t.OPTION=Object.fromEntries(t.OPTION.split(/,(?=[A-Z])/).map((t=>t.split(/=(.*)/))))),t))),n}stringify(t=this.json){return[t.headers="#"+t.headers.fileType,t.option=t.option.join(this.newLine),t.body=t.body.map((t=>{if(t)return"object"==typeof t?.OPTION&&(t.OPTION=Object.entries(t.OPTION).map((t=>t.join("="))).join(",")),"EXT-X-STREAM-INF"==t.EXT?"#"+t.EXT+":"+t.OPTION+this.newLine+t.URI:"#"+t.EXT+":"+t.OPTION})).join(this.newLine)].join(this.newLine)}}(t)}
