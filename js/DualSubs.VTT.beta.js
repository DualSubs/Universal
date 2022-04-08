/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs v0.5.3");
const VTT = new WebVTT(["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"
const DataBase = {
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Settings.beta.min.json
	Settings: {"Verify":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}},"Advanced":{"Translator":{"Times":3,"Interval":100,"Exponential":true}},"Apple":{"Switch":true,"Types":["Official","Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_TV":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_TV_Plus":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_Fitness":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Disney_Plus":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":5,"Offset":0,"Tolerance":1000},"Prime_Video":{"Switch":true,"Types":["Official","Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"HBO_Max":{"Switch":true,"Types":["Google"],"Type":"Google","Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Hulu":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Paramount_Plus":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Discovery_Plus_Ph":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Peacock_TV":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Discovery_Plus":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Netflix":{"Switch":true,"Types":["Official","Google","External"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"YouTube":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward"}},
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Languages.beta.min.json
	Languages: {"Apple":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"cmn","ZH-HANS":"cmn-Hans","ZH-HK":"yue-Hant","ZH-HANT":"cmn-Hant"},"Disney_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Prime_Video":{"AR":"ar-001","BG":"bg-bg","CS":"cs-cz","DA":"da-dk","DE":"de-de","EL":"el-gr","EN":"en","EN-GB":"en-gb","EN-US":"en-us","EN-US SDH":"en-us","ES-419":"es-419","ES-ES":"es-es","ET":"et-ee","FI":"fi-fi","FR":"fr-fr","HU":"hu-hu","ID":"id-id","IT":"it-it","JA":"ja-jp","KO":"ko-kr","LT":"lt-lt","LV":"lv-lv","NL":"nl-nl","NO":"nb-no","PL":"pl-pl","PT-PT":"pt-pt","PT-BR":"pt-br","RO":"ro-ro","RU":"ru-ru","SK":"sk-sk","SL":"sl-si","SV":"sv-se","IS":"is-is","ZH":"zh","ZH-HANS":"zh-hans","ZH-HK":"zh-HK","ZH-HANT":"zh-hant"},"HBO_Max":{"AR":"ar-001","BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de-DE","EL":"el-GR","EN":"en","EN-GB":"en-UK","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-419 SDH":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi-FI","FR":"fr-FR","HU":"hu-HU","IT":"it-IT","JA":"ja-JP","KO":"ko-KR","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Hulu":{"AR":"ar-001","BG":"bul","CS":"ces","DA":"dan","DE":"deu","EL":"ell","EN":"eng","EN-GB":"eng","EN-US":"eng","EN-US SDH":"eng","ES-419":"spa","ES-ES":"spa","ET":"est","FI":"fin","FR":"fra","HU":"hun","IT":"ita","JA":"jpn","KO":"kor","LT":"lit","LV":"lav","NL":"nld","NO":"nor","PL":"por","PT-PT":"por","PT-BR":"por","RO":"ron","RU":"rus","SK":"slk","SL":"slv","SV":"swe","IS":"isl","ZH":"zh","ZH-HANS":"zho","ZH-HK":"zho","ZH-HANT":"zho"},"Paramount_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus_Ph":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Peacock_TV":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus":{"BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","PL":"pl-PL","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Netflix":{},"YouTube":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW","YUE":"yue","YUE-HK":"yue-HK"},"Google":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT-PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}
};
const type = $request.url.match(/[&\?]dualsubs=(\w+)$/)[1]
$.log(`🚧 ${$.name}`, `type: ${type}`, "");

const url = $request.url
$.log(`🚧 ${$.name}`, `url: ${url}`, "");

const method = $request.method
if (method == "OPTIONS") $.done();

let headers = $request.headers
delete headers["Host"]
delete headers["Connection"]
delete headers["Range"]

let body = $response.body

/***************** Processing *****************/
!(async () => {
	[$.Platform, $.Verify, $.Advanced, $.Settings, $.Cache] = await setENV(url, DataBase);
	if ($.Settings.Switch) {
		// 找缓存
		let [Indices = {}, Cache = {}] = await getCache($.Cache);
		if (Indices.Index == -1) $.done();
		// 获取序列化VTT
		let OriginVTT = VTT.parse(body);
		// 创建双语字幕JSON
		let DualSub = {};
		// 获取类型
		if (!type) $.done();
		else if (type == "Official" || type == "External") {
			if (type == "Official") {
				$.log(`🚧 ${$.name}`, "官方字幕", "");
				let VTTs = Cache[$.Settings.Languages[1]][Indices[$.Settings.Languages[1]]].VTTs ?? null;
				if (!VTTs) $.done();
				else if ($.Platform == "Apple") {
					let requests = await getOfficialRequest($.Platform, VTTs);
					for await (var request of requests) {
						let SecondVTT = await getWebVTT(request);
						DualSub = await CombineDualSubs(OriginVTT, SecondVTT, 0, $.Settings.Tolerance, [$.Settings.Position]);
					};
				} else {
					let request = await getOfficialRequest($.Platform, VTTs);
					let SecondVTT = await getWebVTT(request);
					DualSub = await CombineDualSubs(OriginVTT, SecondVTT, 0, $.Settings.Tolerance, [$.Settings.Position]);
				}
			} else if (type == "External") {
				$.log(`🚧 ${$.name}, 外挂字幕`, "");
				let request = {
					"url": $.Settings.ExternalURL,
					"headers": {
						"Accept": "*/*",
						"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1"
					}
				};
				let SecondVTT = await getWebVTT(request);
				$.log(`🚧 ${$.name}, 外挂字幕`, `SecondVTT: ${JSON.stringify(SecondVTT)}`, "");
				DualSub = await CombineDualSubs(OriginVTT, SecondVTT, $.Settings.Offset, $.Settings.Tolerance, [$.Settings.Position]);
			}
			async function getWebVTT(request) { return await $.http.get(request).then(response => VTT.parse(response.body)); }
		} else {
			$.log(`🚧 ${$.name}`, `翻译字幕`, "");
			DualSub = OriginVTT;
			if ($.Verify?.[type]?.Method == "Row") { //逐行翻译
				DualSub.body = await Promise.all(DualSub.body.map(async item => {
					//let text2 = await Translator(type, $.Settings.Languages[1], $.Settings.Languages[0], item.text);
					let text2 = await retry(Translator, [type, $.Settings.Languages[1], $.Settings.Languages[0], item.text], $.Advanced.Translator.Times, $.Advanced.Translator.Interval, $.Advanced.Translator.Exponential); // 3, 100, true
					item.text = await combineText(item.text, text2[0], $.Settings.Position);
					return item
				}));
			} else { // Part 逐段翻译 
				let Full = await Promise.all(DualSub.body.map(async item => item.text));
				let length = (type == "GoogleCloud") ? 127 : (type == "Azure") ? 99 : (type == "Google") ? 63 : (type == "DeepL") ? 49 : 48;
				let Parts = await chunk(Full, length);
				Parts = await Promise.all(Parts.map(async Part => {
					//return await Translator(type, $.Settings.Languages[1], $.Settings.Languages[0], Part);
					return await retry(Translator, [type, $.Settings.Languages[1], $.Settings.Languages[0], Part], $.Advanced.Translator.Times, $.Advanced.Translator.Interval, $.Advanced.Translator.Exponential); // 3, 100, true
				})).then(parts => parts.flat(Infinity));
				//Parts = Parts.flat(Infinity);
				DualSub.body = await Promise.all(DualSub.body.map(async (item, i) => {
					item.text = await combineText(item.text, Parts[i], $.Settings.Position);
					return item
				}));
			};
			async function combineText(text1, text2, position) { return (position == "Forward") ? text2 + "\n" + text1 : (position == "Reverse") ? text1 + "\n" + text2 : text2 + "\n" + text1; }
		};
		body = VTT.stringify(DualSub);
		$.done({ body })
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done({ body }))

/***************** Fuctions *****************/
// Function 1
// Set Environment Variables
async function setENV(e,t){const a=e.match(/\.apple\.com/i)?"Apple":e.match(/\.(dssott|starott)\.com/i)?"Disney_Plus":e.match(/\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i)?"Prime_Video":e.match(/\.(api\.hbo|hbomaxcdn)\.com/i)?"HBO_Max":e.match(/\.(hulustream|huluim)\.com/i)?"Hulu":e.match(/\.(cbsaavideo|cbsivideo)\.com/i)?"Paramount_Plus":e.match(/dplus-ph-/i)?"Discovery_Plus_Ph":e.match(/\.peacocktv\.com/i)?"Peacock":e.match(/\.uplynk\.com/i)?"Discovery_Plus":e.match(/www\.youtube\.com/i)?"YouTube":e.match(/\.nflxvideo\.net/i)?"Netflix":void 0;let s=$.getjson("DualSubs",t),l=s?.Settings?.Verify||t?.Settings?.Verify,o=s?.Settings?.Advanced||t?.Settings?.Advanced;o.Translator.Times=parseInt(o.Translator.Times,10),o.Translator.Interval=parseInt(o.Translator.Interval,10),o.Translator.Exponential=JSON.parse(o.Translator.Exponential);let i=s?.Settings?.[a]||t?.Settings?.[a];if("Apple"==a){let a=e.match(/\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/subscription\//i)?"Apple_TV_Plus":e.match(/\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/workout\//i)?"Apple_Fitness":e.match(/\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\//i)?"Apple_TV":e.match(/vod-.*-aoc\.tv\.apple\.com/i)?"Apple_TV_Plus":e.match(/vod-.*-amt\.tv\.apple\.com/i)?"Apple_TV":e.match(/(hls|hls-svod)\.itunes\.apple\.com/i)?"Apple_Fitness":"Apple";i=s?.Settings?.[a]||t?.Settings?.[a]}i.Switch=JSON.parse(i.Switch),"string"==typeof i.Types&&(i.Types=i.Types.split(",")),l.GoogleCloud.Auth||(i.Types=i.Types.filter((e=>"GoogleCloud"!==e))),l.Azure.Auth||(i.Types=i.Types.filter((e=>"Azure"!==e))),l.DeepL.Auth||(i.Types=i.Types.filter((e=>"DeepL"!==e))),i.CacheSize=parseInt(i.CacheSize,10),i.Offset=parseInt(i.Offset,10),i.Tolerance=parseInt(i.Tolerance,10);let c=s?.Cache?.[a]||[];return"string"==typeof c&&(c=JSON.parse(c)),[a,l,o,i,c]}

// Function 2
// Get Cache
async function getCache(cache = {}) {
	$.log(`⚠ ${$.name}, Get Cache`, "");
	let Indices = { "Index": await getIndex(cache) };
	$.log(`🎉 ${$.name}, Get Cache`, `Indices.Index: ${Indices.Index}`, "");
	for await (var language of $.Settings.Languages) Indices[language] = await getDataIndex(Indices.Index, language)
	if (type == "Official") {
		if (Indices[$.Settings.Languages[0]] !== -1) {
			Indices[$.Settings.Languages[1]] = cache[Indices.Index][$.Settings.Languages[1]].findIndex(data => {
				if (data.OPTION["GROUP-ID"] == cache[Indices.Index][$.Settings.Languages[0]][Indices[$.Settings.Languages[0]]].OPTION["GROUP-ID"] && data.OPTION.CHARACTERISTICS == cache[Indices.Index][$.Settings.Languages[0]][Indices[$.Settings.Languages[0]]].OPTION.CHARACTERISTICS) return true;
			});
			if (Indices[$.Settings.Languages[1]] == -1) {
				Indices[$.Settings.Languages[1]] = cache[Indices.Index][$.Settings.Languages[1]].findIndex(data => {
					if (data.OPTION["GROUP-ID"] == cache[Indices.Index][$.Settings.Languages[0]][Indices[$.Settings.Languages[0]]].OPTION["GROUP-ID"]) return true;
				});
			};
		};
	};
	$.log(`🎉 ${$.name}, Get Cache`, `Indices: ${JSON.stringify(Indices)}`, "");
	return [Indices, cache[Indices.Index]]
	/***************** Fuctions *****************/
	async function getIndex(cache) {
		return cache.findIndex(item => {
			let URLs = [item?.URL];
			for (var language of $.Settings.Languages) URLs.push(item?.[language]?.map(d => getURIs(d)));
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
// Get Official Request
async function getOfficialRequest(platform, VTTs = []) {
	$.log(`⚠ ${$.name}, Get Official Request`, "");
	let fileName = (platform == "Apple") ? url.match(/.+_(subtitles(_V\d)?-\d+\.webvtt)(\?.*dualsubs=\w+)$/)[1] // Apple 片段分型序号不同
		: (platform == "Disney_Plus") ? url.match(/([^\/]+\.vtt)(\?.*dualsubs=\w+)$/)[1] // Disney+ 片段名称相同
			: (platform == "Hulu") ? url.match(/.+_(SEGMENT\d+_.+\.vtt)(\?.*dualsubs=\w+)$/)[1] // Hulu 片段分型序号相同
				: null; // Amazon Prime Video HBO_Max不拆分字幕片段
	$.log(`🚧 ${$.name}, Get Official Subtitles URL`, `fileName: ${fileName}`, "")

	if (platform == "Apple") {
		let Index = VTTs.findIndex(item => item.includes(fileName))
		$.log(`🚧 ${$.name}, Get Official Subtitles URL`, `Apple_Index: ${Index}`, "")
		nearlyVTTs = VTTs.slice((Index - 5 < 0) ? 0 : Index - 5, Index + 5);
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
			"url": VTTs.find(item => item.includes(fileName)) || VTTs[0],
			"headers": headers,
		};
		$.log(`🚧 ${$.name}, Get Official Request`, `request: ${JSON.stringify(request)}`, "");
		return request
	}
};

/** 
 * Translator
 * @param {String} type - type
 * @param {String} source - source
 * @param {String} target - target
 * @param {String} text - text
 * @param {Array} text - text
 * @return {Promise<*>}
 */
async function Translator(type = "", source = "", target = "", text = "") {
	$.log(`⚠ ${$.name}, Translator`, `orig: ${text}`, "");
	// 构造请求
	let request = await GetRequest(type, source, target, text);
	// 发送请求
	let trans = await GetData(type, request);
	$.log(`🚧 ${$.name}, Translator`, `trans: ${trans}`, "");
	return trans
	/***************** Fuctions *****************/
	// Function 5.1
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
		if (type == "Google") {
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
			request = BaseRequest[Math.floor(Math.random() * (BaseRequest.length - 1))] // 随机Request, 排除最后一项
			text = (Array.isArray(text)) ? text.join("\n\n") : text;
			request.url = request.url + `&sl=${DataBase.Languages.Google[source]}&tl=${DataBase.Languages.Google[target]}&q=${encodeURIComponent(text)}`;
		} else if (type == "GoogleCloud") {
			request.url = `https://translation.googleapis.com/language/translate/v2/?key=${$.Verify.GoogleCloud?.Auth}`;
			request.headers = {
				//"Authorization": `Bearer ${$.Verify.GoogleCloud?.Auth}`,
				"User-Agent": "DualSubs",
				"Content-Type": "application/json; charset=utf-8"
			};
			request.body = JSON.stringify({
				"q": text,
				"source": DataBase.Languages.Google[source],
				"target": DataBase.Languages.Google[target],
				"format": "html",
				//"key": $.Verify.GoogleCloud?.Key
			});
		} else if (type == "Bing") {
			// https://github.com/Animenosekai/translate/blob/main/translatepy/translators/bing.py
			const BaseURL = ($.Verify.Bing?.Version == "Bing") ? "https://www.bing.com/ttranslatev3?IG=839D27F8277F4AA3B0EDB83C255D0D70&IID=translator.5033.3"
				: ($.Verify.Azure?.Version == "BingCN") ? "https://cn.bing.com/ttranslatev3?IG=25FEE7A7C7C14533BBFD66AC5125C49E&IID=translator.5025.1"
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
				//"from": DataBase.Languages.Microsoft[source],
				"to": DataBase.Languages.Microsoft[target]
			});
		} else if (type == "Azure") {
			// https://docs.microsoft.com/zh-cn/azure/cognitive-services/translator/
			// https://docs.azure.cn/zh-cn/cognitive-services/translator/
			const BaseURL = ($.Verify.Azure?.Version == "Azure") ? "https://api.cognitive.microsofttranslator.com"
				: ($.Verify.Azure?.Version == "AzureCN") ? "https://api.translator.azure.cn"
					: "https://api.cognitive.microsofttranslator.com"
			request.url = `${BaseURL}/translate?api-version=3.0&textType=html&to=${DataBase.Languages.Microsoft[target]}&from=${DataBase.Languages.Microsoft[source]}`;
			request.headers = {
				"Content-Type": "application/json; charset=UTF-8",
				"Accept": "application/json, text/javascript, */*; q=0.01",
				"Accept-Language": "zh-hans"
				//"Authorization": `Bearer ${$.Verify.Azure?.Auth}`,
				//"Ocp-Apim-Subscription-Key": $.Verify.Azure?.Auth,
				//"Ocp-Apim-Subscription-Region": $.Verify.Azure?.Region, // chinanorth, chinaeast2
				//"X-ClientTraceId": uuidv4().toString()
			};
			if ($.Verify.Azure?.Region) request.headers["Ocp-Apim-Subscription-Region"] = $.Verify.Azure.Region;
			if ($.Verify?.Azure?.Mode == "Key") request.headers["Ocp-Apim-Subscription-Key"] = $.Verify.Azure.Auth;
			else if ($.Verify?.Azure?.Mode == "Token") request.headers.Authorization = `Bearer ${$.Verify.Azure.Auth}`;
			text = (Array.isArray(text)) ? text : [text];
			let texts = await Promise.all(text?.map(async item => { return { "text": item } }))
			request.body = JSON.stringify(texts);
			/*
			request.body = JSON.stringify([{
				"text": text
			}]);
			*/
		} else if (type == "DeepL") {
			const BaseURL = ($.Verify.DeepL.Version == "Free") ? "https://api-free.deepl.com"
				: ($.Verify.DeepL.Version == "Pro") ? "https://api.deepl.com"
					: "https://api-free.deepl.com"
			request.url = `${BaseURL}/v2/translate`
			request.headers = {
				"Accept": "*/*",
				"User-Agent": "DualSubs",
				"Content-Type": "application/x-www-form-urlencoded"
			};
			const source_lang = (DataBase.Languages.DeepL[source].includes("EN")) ? "EN"
				: (DataBase.Languages.DeepL[source].includes("PT")) ? "PT"
					: DataBase.Languages.DeepL[source];
			const target_lang = (DataBase.Languages.DeepL[target] == "EN") ? "EN-US"
				: (DataBase.Languages.DeepL[target] == "PT") ? "PT-PT"
					: DataBase.Languages.DeepL[target];
			const BaseBody = `auth_key=${$.Verify.DeepL?.Auth}&source_lang=${source_lang}&target_lang=${target_lang}&tag_handling=html`;
			text = (Array.isArray(text)) ? text : [text];
			let texts = await Promise.all(text?.map(async item => `&text=${encodeURIComponent(item)}`))
			request.body = BaseBody + texts.join("");
		} else if (type == "BaiduFanyi") {
			// https://fanyi-api.baidu.com/doc/24
			request.url = `https://fanyi-api.baidu.com/api/trans/vip/language`;
			request.headers = {
				"User-Agent": "DualSubs",
				"Content-Type": "application/x-www-form-urlencoded"
			};
			request.body = {
				"q": text,
				"from": DataBase.Languages.Baidu[source],
				"to": DataBase.Languages.Baidu[target],
				"appid": $.Verify.BaiduFanyi?.Key,
				"salt": uuidv4().toString(),
				"sign": "",
			};
		} else if (type == "YoudaoAI") {
			// https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html
			request.url = `https://openapi.youdao.com/api`;
			request.headers = {
				"User-Agent": "DualSubs",
				"Content-Type": "application/json; charset=utf-8"
			};
			request.body = {
				"q": text,
				"from": DataBase.Languages.Youdao[source],
				"to": DataBase.Languages.Youdao[target],
				"appKey": $.Verify.YoudaoAI?.Key,
				"salt": uuidv4().toString(),
				"signType": "v3",
				"sign": "",
				"curtime": Math.floor(+new Date() / 1000)
			};
		}
		//$.log(`🎉 ${$.name}, Get Translate Request`, `request: ${JSON.stringify(request)}`, "");
		return request
	};
	// Function 5.2
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
							if (type == "Google") {
								if (Array.isArray(_data)) texts = _data?.[0]?.map(item => item?.[0]);
								else if (_data?.sentences) texts = _data?.sentences?.map(item => item?.trans);
							}
							texts = texts.join("").split(/\n\n/);
							resolve(texts);
						} else throw new Error(response);
					} finally {
						resolve();
					}
				});
			} else {
				$.post(request, (error, response, data) => {
					try {
						if (error) throw new Error(error)
						else if (data) {
							const _data = JSON.parse(data)
							let texts = [];
							if (type == "Google") texts = _data?.[0]?.map(item => item?.[0] ?? `翻译失败, 类型: ${type}`)
							else if (type == "GoogleCloud") texts = _data?.data?.translations?.map(item => item?.translatedText ?? `翻译失败, 类型: ${type}`)
							else if (type == "Bing" || type == "Azure") texts = _data?.map(item => item?.translations?.[0]?.text ?? `翻译失败, 类型: ${type}`)
							else if (type == "DeepL") texts = _data?.translations?.map(item => item?.text ?? `翻译失败, 类型: ${type}`)
							resolve(texts);
						} else throw new Error(response);
					} finally {
						resolve();
					}
				});
			};
		});
	};
};

/** 
 * Combine Dual Subtitles
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} options - options
 * @return {Promise<*>}
 */
async function CombineDualSubs(Sub1 = { headers: {}, CSS: {}, body: [] }, Sub2 = { headers: {}, CSS: {}, body: [] }, Offset = 0, Tolerance = 1000, options = ["Forward"]) { // options = ["Forward", "Reverse"]
	$.log(`⚠ ${$.name}, Combine Dual Subtitles`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	let DualSub = options.includes("Reverse") ? Sub2 : Sub1
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
			index0 = options.includes("Reverse") ? index2 : index1;
			// 多行字幕交替插入
			/*
			if (Array.isArray(text1) && Array.isArray(text2)) {
				let a = options.includes("Reverse") ? text2 : text1;
				let b = options.includes("Reverse") ? text1 : text2;
				let c = [];
				let length = a.length > b.length ? a.length : b.length;
				for (let j = 0; j < length; j++) {
					if (a[j]) c.push(a[j]);
					if (b[j]) c.push(b[j]);
				}
				DualSub.body[index0].text = c;
			} else 
			*/
			DualSub.body[index0].text = options.includes("Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`;
			//DualSub.body[index0].timeStamp = options.includes("Reverse") ? timeStamp2 : timeStamp1;
			//DualSub.body[index0].index = options.includes("Reverse") ? index2 : index1;
			//index1++;
			//index2++;
		}
		if (timeStamp2 > timeStamp1) {
			index1++;
		} else if (timeStamp2 < timeStamp1) {
			index2++;
		} else {
			index1++
			index2++
		}
	}
	//$.log(`🎉 ${$.name}, Combine Dual Subtitles`, `return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	return DualSub;
};

/** 
 * Chunk Array
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
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

// https://github.com/DualSubs/WebVTT/blob/main/WebVTT.embedded.min.js
function WebVTT(e){return new class{constructor(e=["milliseconds","timeStamp","singleLine","\n"]){this.name="WebVTT v1.6.1",this.opts=e,this.newLine=this.opts.includes("\n")?"\n":this.opts.includes("\r")?"\r":this.opts.includes("\r\n")?"\r\n":"\n",this.vtt=new String,this.txt=new String,this.json={headers:{},CSS:{},body:[]}}parse(e=this.vtt){const t=this.opts.includes("milliseconds")?/^((?<srtNum>\d+)[\r\n])?(?<timeLine>(?<startTime>(\d\d:)?\d\d:\d\d[\.,]\d\d\d) --> (?<endTime>(\d\d:)?\d\d:\d\d[\.,]\d\d\d)) ?(?<options>.+)?[^](?<text>[\s\S]*)$/:/^((?<srtNum>\d+)[\r\n])?(?<timeLine>(?<startTime>(\d\d:)?\d\d:\d\d)[\.,]\d\d\d --> (?<endTime>(?:\d\d:)?\d\d:\d\d)(?:\.|,)\d\d\d) ?(?<options>.+)?[^](?<text>[\s\S]*)$/;let i={headers:e.match(/^(?<fileType>WEBVTT)?[^](?<Xoptions>.+[^])*/)?.groups??null,CSS:e.match(/^(?<Style>STYLE)[^](?<Boxes>.*::cue.*(\(.*\))?((\n|.)*}$)?)/m)?.groups??null,body:e.split(/[\r\n]{2,}/).map((e=>e.match(t)?.groups??""))};return i.body=i.body.filter(Boolean),i.body=i.body.map(((e,t)=>{if(e.index=t,"WEBVTT"!==i.headers?.fileType&&(e.timeLine=e.timeLine.replace(",","."),e.startTime=e.startTime.replace(",","."),e.endTime=e.endTime.replace(",",".")),this.opts.includes("timeStamp")){let t=e.startTime.replace(/(.*)/,"1970-01-01T$1Z");e.timeStamp=this.opts.includes("milliseconds")?Date.parse(t):Date.parse(t)/1e3}return this.opts.includes("singleLine")?e.text=e.text.replace(/[\r\n]/," "):this.opts.includes("multiLine")&&(e.text=e.text.split(/[\r\n]/)),e})),i}stringify(e=this.json){return[e.headers=e.headers?.Xoptions?[e.headers?.fileType??"WEBVTT",e.headers?.Xoptions??null].join(this.newLine):e.headers?.fileType??"WEBVTT",e.CSS=e.CSS?.Style?[e.CSS.Style,e.CSS.Boxes].join(this.newLine):null,e.body=e.body.map((e=>(Array.isArray(e.text)&&(e.text=e.text.join(this.newLine)),e=`${e.timeLine} ${e?.options??""}${this.newLine}${e.text}`))).join(this.newLine+this.newLine)].join(this.newLine+this.newLine)}json2txt(e=this.json){return e.body.map(((e,t)=>[t,e.timeStamp,e.text].join(this.newLine))).join(this.newLine+this.newLine)}txt2json(e=this.txt){const t=/^(?<srtNum>\d+)[^](?<timeStamp>\d+)[^](?<text>.*[^]*)$/;return{headers:null,CSS:null,body:e.split(/[\r\n]{2,}/).map((e=>e.match(t)?.groups??""))}}}(e)}
