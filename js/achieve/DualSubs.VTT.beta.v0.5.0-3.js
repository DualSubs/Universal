/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs v0.5.0-3");
const VTT = new WebVTT(["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"
const DataBase = {
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Settings.beta.min.json
	Settings: {"Verify":{"GoogleCloud":{"Mode":"Key","Auth":null},"Azure":{"Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Mode":"Free","Auth":null}},"Apple_TV":{"Switch":true,"Type":["Official"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Disney_Plus":{"Switch":true,"Type":["Official"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Prime_Video":{"Switch":true,"Type":["Official"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"HBO_Max":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":3,"Offset":0,"Tolerance":1000},"Hulu":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Paramount_Plus":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Discovery_Plus":{"Switch":true,"Type":["Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"Netflix":{"Switch":true,"Type":["Official","Google","External"],"Language":["ZH","EN"],"Position":"Forward","CacheSize":10,"Offset":0,"Tolerance":1000},"YouTube":{"Switch":true,"Type":["Official"],"Language":["ZH","EN"],"Position":"Forward"}},
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Languages.beta.min.json
	Languages: {"Apple_TV":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH-HANS":"cmn-Hans","ZH-HK":"yue-Hant","ZH-HANT":"cmn-Hant"},"Disney_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Prime_Video":{"AR":"ar-001","BG":"bg-bg","CS":"cs-cz","DA":"da-dk","DE":"de-de","EL":"el-gr","EN-GB":"en-gb","EN-US":"en-us","EN-US SDH":"en-us","ES-419":"es-419","ES-ES":"es-es","ET":"et-ee","FI":"fi-fi","FR":"fr-fr","HU":"hu-hu","ID":"id-id","IT":"it-it","JA":"ja-jp","KO":"ko-kr","LT":"lt-lt","LV":"lv-lv","NL":"nl-nl","NO":"nb-no","PL":"pl-pl","PT-PT":"pt-pt","PT-BR":"pt-br","RO":"ro-ro","RU":"ru-ru","SK":"sk-sk","SL":"sl-si","SV":"sv-se","IS":"is-is","ZH-HANS":"zh-hans","ZH-HK":"zh-HK","ZH-HANT":"zh-hant"},"HBO_Max":{"AR":"ar-001","BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de-DE","EL":"el-GR","EN-GB":"en-UK","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-419 SDH":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi-FI","FR":"fr-FR","HU":"hu-HU","IT":"it-IT","JA":"ja-JP","KO":"ko-KR","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Hulu":{"AR":"ar-001","BG":"bul","CS":"ces","DA":"dan","DE":"deu","EL":"ell","EN-GB":"eng","EN-US":"eng","EN-US SDH":"eng","ES-419":"spa","ES-ES":"spa","ET":"est","FI":"fin","FR":"fra","HU":"hun","IT":"ita","JA":"jpn","KO":"kor","LT":"lit","LV":"lav","NL":"nld","NO":"nor","PL":"por","PT-PT":"por","PT-BR":"por","RO":"ron","RU":"rus","SK":"slk","SL":"slv","SV":"swe","IS":"isl","ZH-HANS":"zho","ZH-HK":"zho","ZH-HANT":"zho"},"Paramount_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus":{"BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de","EL":"el","EN-GB":"en","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","PL":"pl-PL","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Netflix":{},"YouTube":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN-GB":"en","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant"},"Google":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-CN","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}
};
const type = $request.url.match(/%([^%]+)%$/)[1]
$.log(`🚧 ${$.name}`, `type: ${type}`, "");
const url = $request.url.replace(/%[^%]+%$/, "")
$.log(`🚧 ${$.name}`, `url: ${url}`, "");
let headers = $request.headers
delete headers["Host"]
delete headers["Connection"]
//$.log(`🚧 ${$.name}`, "headers.stringify", JSON.stringify(headers), "");

/***************** Processing *****************/
!(async () => {
	[$.Platform, $.Settings, $.Cache, $.Verify] = await setENV(url, DataBase);
	if ($.Settings.Switch) {
		// 找缓存
		let [Indices = {}, Cache = {}] = await getCache($.Cache);
		// 获取序列化VTT
		let OriginVTT = await $.http.get({ "url": url, "headers": headers }).then((response) => {
			$.log("OriginVTT", `headers: ${JSON.stringify(response.headers)}`);
			let vtt = VTT.parse(response.body);
			//$.log(`🚧 ${$.name}`, "VTT.parse", JSON.stringify(vtt), "");
			return vtt;
		})
		// 创建双语字幕JSON
		let DualSub = {};
		// 获取类型
		if (!type) $.done();
		else if (type == "Official" || type == "External") {
			let Offset = new Number;
			let request = {};
			if (type == "Official") {
				$.log(`🚧 ${$.name}`, "官方字幕", "");
				let VTTs = Cache[$.Settings.Language[1]][Indices[$.Settings.Language[1]]].VTTs ?? null;
				if (!VTTs) $.done();
				request = await getOfficialRequest($.Platform, VTTs);
				Offset = 0;
			} else if (type == "External") {
				$.log(`🚧 ${$.name}`, "外挂字幕", "");
				request.url = $.Settings.ExternalURL
				Offset = $.Settings.Offset;
			}
			let SecondVTT = await $.http.get(request).then((response) => {
				$.log("SecondVTT", `headers: ${JSON.stringify(response.headers)}`);
				let vtt = VTT.parse(response.body);
				//$.log(`🚧 ${$.name}`, "VTT.parse", JSON.stringify(vtt), "");
				return vtt;
			});
			DualSub = await CombineDualSubs(OriginVTT, SecondVTT, Offset, $.Settings.Tolerance, [$.Settings.Position]);
		} else {
			$.log(`🚧 ${$.name}`, `翻译字幕`, "");
			DualSub = OriginVTT;
			DualSub.body = await Promise.all(DualSub.body.map(async item => {
				let text2 = await Translate(type, $.Settings.Language[1], $.Settings.Language[0], item.text);
				item.text = ($.Settings.Position == "Forward") ? text2 + "\n" + item.text
					: ($.Settings.Position == "Reverse") ? item.text + "\n" + text2
						: text2 + "\n" + item.text;
				return item
			}));
		}
		DualSub = VTT.stringify(DualSub)
		//$.log(`🚧 ${$.name}`, "VTT.stringify", JSON.stringify(DualSub), "");
		response.body = DualSub
		$.done({ response })
	}
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done({ url }))

/***************** Fuctions *****************/
// Function 1
// Set Environment Variables
async function setENV(url, database) {
	$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	/***************** Platform *****************/
	let Platform = url.match(/\.(tv|itunes)\.apple\.com/i) ? "Apple_TV"
		: url.match(/\.(dssott|starott)\.com/i) ? "Disney_Plus"
			: url.match(/\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i) ? "Prime_Video"
				: url.match(/\.(api\.hbo|hbomaxcdn)\.com/i) ? "HBO_Max"
					: url.match(/\.(hulustream|huluim)\.com/i) ? "Hulu"
						: (url.match(/\.(cbsaavideo|cbsivideo)\.com/i)) ? "Paramount_Plus"
							: (url.match(/\.peacocktv\.com/i)) ? "Peacock"
								: url.match(/\.uplynk\.com/i) ? "Discovery_Plus"
									: url.match(/www\.youtube\.com/i) ? "YouTube"
										: url.match(/\.nflxvideo\.net/i) ? "Netflix"
											: undefined
	$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Platform: ${Platform}`, "");
	/***************** Settings *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson("DualSubs", database) // BoxJs
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `$.BoxJs类型: ${typeof $.BoxJs}`, `$.BoxJs内容: ${JSON.stringify($.BoxJs)}`, "");
	let Settings = BoxJs[Platform]?.Settings || database?.Settings?.[Platform];
	Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
	if (typeof Settings.Type == "string") Settings.Type = Settings.Type.split(",") // BoxJs字符串转数组
	Settings.CacheSize = parseInt(Settings.CacheSize,10) // BoxJs字符串转数字
	Settings.Offset = parseInt(Settings.Offset,10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance,10) // BoxJs字符串转数字
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Cache *****************/
	let Cache = BoxJs[Platform]?.Cache || [];
	//$.log(`🚧 ${$.name}, 调试信息`, "Set Environment Variables", `Cache类型: ${typeof Cache}`, `$.Cache内容: ${Cache}`, "");
	if (typeof Cache == "string") Cache = JSON.parse(Cache)
	//$.log(`🎉 ${$.name}, Set Environment Variables`, `Cache类型: ${typeof Cache}`, `Cache内容: ${JSON.stringify(Cache)}`, "");
	/***************** Verify *****************/
	let Verify = BoxJs?.Verify?.Settings || database?.Settings?.Verify;
	return [Platform, Settings, Cache, Verify];
};

// Function 3
// Get Cache
async function getCache(cache = {}) {
	$.log(`⚠ ${$.name}, Get Cache`, "");
	let Indices = {};
	Indices.Index = await getIndex(cache);
	$.log(`🎉 ${$.name}, Get Cache`, `Indices.Index: ${Indices.Index}`, "");

	for await (var language of $.Settings.Language) Indices[language] = await getDataIndex(Indices.Index, language)

	if (Indices[$.Settings.Language[0]] !== -1) {
		Indices[$.Settings.Language[1]] = cache[Indices.Index][$.Settings.Language[1]].findIndex(data => {
			if ($.Platform == "Apple_TV") {
				if (data.OPTION["GROUP-ID"] == cache[Indices.Index][$.Settings.Language[0]][Indices[$.Settings.Language[0]]].OPTION["GROUP-ID"]
					&& data.OPTION.CHARACTERISTICS == cache[Indices.Index][$.Settings.Language[0]][Indices[$.Settings.Language[0]]].OPTION.CHARACTERISTICS) return true;
			} else {
				if (data.OPTION["GROUP-ID"] == cache[Indices.Index][$.Settings.Language[0]][Indices[$.Settings.Language[0]]].OPTION["GROUP-ID"]) return true;
			}
		});
	}

	$.log(`🎉 ${$.name}, Get Cache`, `Indices: ${JSON.stringify(Indices)}`, "");
	return [Indices, cache[Indices.Index]]
	/***************** Fuctions *****************/
	async function getIndex(cache) {
		return cache.findIndex(item => {
			let URLs = [item?.URL];
			for (var language of $.Settings.Language) URLs.push(item?.[language]?.map(d => getURIs(d)));
			$.log(`🎉 ${$.name}, 调试信息`, " Get Index", `URLs: ${URLs}`, "");
			return URLs.flat(Infinity).some(URL => url.includes(URL || null));
		})
		// 分步骤
		/*
		return cache.findIndex(item => {
			let URLs = [item?.URL];
			for (var language of $.Settings.Language) {
				let URLss = item?.[language]?.map(d => getURIs(d))
				$.log(`🎉 ${$.name}, 调试信息`, " Get Index", `URLss: ${URLss}`, "");
				URLs.push(URLss);
			};
			$.log(`🎉 ${$.name}, 调试信息`, " Get Index", `URLs: ${URLs}`, "");
			// URLs中有一项包含在url中即true
			let result = URLs.flat(Infinity).some(URL => url.includes(URL || null));
			$.log(`🎉 ${$.name}, 调试信息`, " Get Data Index", `result: ${result}`, "");
			return result
		})
		*/
	};

	async function getDataIndex(index, lang) {
		return cache?.[index]?.[lang]?.findIndex(item => getURIs(item).flat(Infinity).some(URL => url.includes(URL || null)));
		// 分步骤
		/*
		return cache?.[index]?.[lang]?.findIndex(item => {
			let URLs = getURIs(item)
			let result = URLs.flat(Infinity).some(URL => url.includes(URL || null));
			$.log(`🎉 ${$.name}, 调试信息`, " Get Data Index", `result: ${result}`, "");
			return result
		})
		*/
	};

	function getURIs(item) {
		let URI = aPath(item?.PATH, item?.URI);
		let VTTs = item?.VTTs?.map(VTT => aPath(URI, VTT)) ?? [];
		return [URI, VTTs]
		/*
		let URLs = [URI, VTTs];
		//$.log(`🎉 ${$.name}, 调试信息`, " Get Data Index", `URLs: ${URLs}`, "");
		return URLs
		*/
	};

	function aPath(Link = "", URL = "") {
		//$.log(`⚠ ${$.name}, Get Absolute Path`, `Link: ${Link}`, `URL: ${URL}`, "");
		let PATH = Link.match(/^(https?:\/\/(?:.+)\/)/i)?.[0] ?? null;
		//let PATH = Link.match(/^(?<PATH>https?:\/\/(?:.+)\/)/i)?.groups?.PATH ?? "";
		//$.log(`🚧 ${$.name}, 调试信息`, "Get Absolute Path", `PATH: ${PATH}`, "");
		return (/^https?:\/\//i.test(URL)) ? URL : PATH + URL
		/*
		let aURL = (/^https?:\/\//i.test(URL)) ? URL : PATH + URL;
		//$.log(`🎉 ${$.name}, Get Absolute Path`, `aURL: ${aURL}`, "");
		return aURL
		*/
	};
};

// Function 4
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

// Function 5
// Get Official Request
async function getOfficialRequest(platform, VTTs = []) {
	$.log(`⚠ ${$.name}, Get Official Request`, "");
	let fileName = (platform == "Apple_TV") ? url.match(/.+_(subtitles_V\d-\d+\.webvtt$)/)[1] // Apple_TV 片段分型序号相同
		: (platform == "Disney_Plus") ? url.match(/([^\/]+\.vtt$)/)[1] // Disney+ 片段名称相同
			: (platform == "Hulu") ? url.match(/.+_(SEGMENT\d+_.+\.vtt$)/)[1] // Hulu 片段分型序号相同
				: null; // Amazon Prime Video HBO_Max不拆分字幕片段
	$.log(`🚧 ${$.name}, Get Official Subtitles URL`, `fileName: ${fileName}`, "")
	let request = {
		"url": VTTs.find(item => item.includes(fileName)) || VTTs[0],
		"headers": headers,
	};
	$.log(`🚧 ${$.name}, Get Official Request`, `request: ${JSON.stringify(request)}`, "");
	return request
};

// Function 6
// Translate
async function Translate(type = "", source = "", target = "", text = "") {
	$.log(`🚧 ${$.name}, Translate`, `text: ${text}`, "");
	// 构造请求
	let request = await GetRequest(type, source, target, text);
	// 发送请求
	let text2 = await GetData(type, request);
	$.log(`🚧 ${$.name}, Translate`, `text2: ${text2}`, "");
	return text2
	// Function 6.1
	// Get Translate Request
	async function GetRequest(type = "", source = "", target = "", text = "") {
		$.log(`🚧 ${$.name}, Get Translate Request`, "");
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
			const BaseURL = [
				//"https://translate.google.cn",
				"https://translate.google.com",
				"https://translate.google.com.hk",
				"https://translate.google.com.tw",
				"https://translate.google.com.sg",
				"https://translate.google.co.jp",
				"https://translate.google.co.kr"
			]
			const Client = [
				"t",
				"at",
				"gtx",
				"it",
			]
			request.url = `${BaseURL[Math.floor(Math.random() * BaseURL.length)]}/translate_a/single?client=at&sl=${DataBase.Google.Languages[source]}&tl=${DataBase.Google.Languages[target]}&dt=t&q=${encodeURIComponent(text)}`;
			request.headers = {
				"Accept": "*/*",
				"User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)] // 随机UA
			};
		} else if (type == "GoogleCloud") {
			request.url = `https://translation.googleapis.com/language/translate/v2/?key=${$.Verify.GoogleCloud?.Auth}`;
			request.headers = {
				//"Authorization": `Bearer ${$.Verify.GoogleCloud?.Auth}`,
				"User-Agent": "DualSubs",
				"Content-Type": "application/json; charset=utf-8"
			};
			request.body = {
				"q": text,
				"source": DataBase.Google.Languages[source],
				"target": DataBase.Google.Languages[target],
				"format": "text",
				//"key": $.Verify.GoogleCloud?.Key
			};
		} else if (type == "Microsoft") {
			request.url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&textType=html&from=${DataBase.Microsoft.Languages[source]}&to=${DataBase.Microsoft.Languages[target]}`;
			request.headers = {
				"Accept": "*/*",
				"User-Agent": "DualSubs",
				"Content-type": 'application/json',
				//"Authorization": `Bearer ${$.Verify.Microsoft?.Auth}`,
				"Ocp-Apim-Subscription-Key": $.Verify.Microsoft?.Auth,
				//"Ocp-Apim-Subscription-Region": "Southeast Asia",
				//"X-ClientTraceId": uuidv4().toString()
			};
			request.body = [{
				"text": text
			}];
		} else if (type == "Azure") {
			// https://docs.microsoft.com/zh-cn/azure/cognitive-services/translator/
			// https://docs.azure.cn/zh-cn/cognitive-services/translator/
			const BaseURL = ($.Verify.Azure?.Version == "Azure") ? "https://api.cognitive.microsofttranslator.com"
				: ($.Verify.Azure?.Version == "AzureCN") ? "https://api.translator.azure.cn"
					: "https://api.cognitive.microsofttranslator.com"
			request.url = `${BaseURL}/translate?api-version=3.0&textType=html&from=${DataBase.Microsoft.Languages[source]}&to=${DataBase.Microsoft.Languages[target]}`;
			request.headers = {
				"Accept": "*/*",
				"User-Agent": "DualSubs",
				"Content-type": 'application/json',
				//"Authorization": `Bearer ${$.Verify.Azure?.Auth}`,
				//"Ocp-Apim-Subscription-Key": $.Verify.Azure?.Auth,
				"Ocp-Apim-Subscription-Region": $.Verify.Azure?.Region ?? "", // chinanorth, chinaeast2
				//"X-ClientTraceId": uuidv4().toString()
			};
			if ($.Verify?.Azure?.Mode == "Key") request.headers["Ocp-Apim-Subscription-Key"] = $.Verify.Azure?.Auth;
			else if  ($.Verify?.Azure?.Mode == "Token") request.headers.Authorization = `Bearer ${$.Verify.Azure?.Auth}`,
			request.body = [{
				"text": text
			}];
		} else if (type == "DeepL") {
			const BaseURL = ($.Verify.DeepL.Mode == "Free") ? "https://api-free.deepl.com"
				: ($.Verify.DeepL.Mode == "Pro") ? "https://api.deepl.com"
					: "https://api-free.deepl.com"
			request.url = `${BaseURL}/v2/translate`
			request.headers = {
				"Accept": "*/*",
				"User-Agent": "DualSubs",
				"Content-Type": "application/x-www-form-urlencoded"
			};
			const BaseBody = `auth_key=${$.Verify.DeepL?.Auth}&source_lang=${DataBase.DeepL.Languages[source]}&target_lang=${DataBase.DeepL.Languages[target]}`;
			request.body = BaseBody + `&text=${encodeURIComponent(text)}`;
		} else if (type == "BaiduFanyi") {
			// https://fanyi-api.baidu.com/doc/24
			request.url = `https://fanyi-api.baidu.com/api/trans/vip/language`;
			request.headers = {
				"User-Agent": "DualSubs",
				"Content-Type": "application/x-www-form-urlencoded"
			};
			request.body = {
				"q": text,
				"from": DataBase.Baidu.Languages[source],
				"to": DataBase.Baidu.Languages[target],
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
					"from": DataBase.Youdao.Languages[source],
					"to": DataBase.Youdao.Languages[target],
					"appKey": $.Verify.YoudaoAI?.Key,
					"salt": uuidv4().toString(),
					"signType": "v3",
					"sign": "",
					"curtime": Math.floor(+new Date() / 1000)
				};
		}
		$.log(`🚧 ${$.name}, Get Translate Request`, `request: ${JSON.stringify(request)}`, "");
		return request
	};
	// Function 6.2
	// Get Translate Data
	async function GetData(type, request) {
		$.log(`🚧 ${$.name}, Get Translate Data`, "");
		let text = ""
		if (type == "Google") {
			text = await $.http.get(request).then((response) => {
				$.log(`headers: ${JSON.stringify(response.headers)}`);
				$.log(`body: ${JSON.stringify(response.body)}`);
				let body = JSON.parse(response.body);
				return text = body?.translations?.[0]?.text ?? body?.[0]?.[0]?.[0] ?? `翻译失败, 类型: ${type}`
			})
		} else if (type == "Microsoft" || type == "Azure") {
			// https://docs.microsoft.com/zh-cn/azure/cognitive-services/translator/
			// https://docs.azure.cn/zh-cn/cognitive-services/translator/
			text = await $.http.post(request).then((response) => {
				$.log(`headers: ${JSON.stringify(response.headers)}`);
				$.log(`body: ${JSON.stringify(response.body)}`);
				let body = JSON.parse(response.body);
				return text = body?.[0]?.translations?.[0]?.text ?? `翻译失败, 类型: ${type}`
			})
		} else if (type == "GoogleCloud" || type == "DeepL") {
			text = await $.http.post(request).then((response) => {
				$.log(`headers: ${JSON.stringify(response.headers)}`);
				$.log(`body: ${JSON.stringify(response.body)}`);
				let body = JSON.parse(response.body);
				return text = body?.data?.translations?.[0]?.translatedText ?? body?.data?.translations?.[0]?.text ?? `翻译失败, 类型: ${type}`
			})
		}
		$.log(`🚧 ${$.name}, Get Translate Data`, `result: ${text}`, "");
		return text
	};
};

// Function 7
// Combine Dual Subtitles
async function CombineDualSubs(Sub1 = { headers: {}, CSS: {}, body: [] }, Sub2 = { headers: {}, CSS: {}, body: [] }, Offset = 0, Tolerance = 1000, options = ["Forward"]) { // options = ["Forward", "Reverse"]
	$.log(`🚧 ${$.name}, Combine Dual Subtitles`, "");
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
			index1++;
			index2++;
		} else if (timeStamp2 - timeStamp1 > Tolerance) {
			index1++;
		} else {
			index2++;
		}
	}
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`, `return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	return DualSub;
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

// https://github.com/DualSubs/WebVTT/blob/main/WebVTT.embedded.min.js
function WebVTT(e){return new class{constructor(e=["milliseconds","timeStamp","singleLine","\n"]){this.name="WebVTT v1.6.0",this.opts=e,this.newLine=this.opts.includes("\n")?"\n":this.opts.includes("\r")?"\r":this.opts.includes("\r\n")?"\r\n":"\n",this.vtt=new String,this.txt=new String,this.json={headers:{},CSS:{},body:[]}}parse(e=this.vtt){const t=this.opts.includes("milliseconds")?/^(?:(?<srtNum>\d+)[(\r\n)\r\n])?(?<timeLine>(?<startTime>(?:\d\d:)?\d\d:\d\d(?:\.|,)\d\d\d) --> (?<endTime>(?:\d\d:)?\d\d:\d\d(?:\.|,)\d\d\d)) ?(?<options>.+)?[^](?<text>.*[^]*)$/:/^(?:(?<srtNum>\d+)[(\r\n)\r\n])?(?<timeLine>(?<startTime>(?:\d\d:)?\d\d:\d\d)(?:\.|,)\d\d\d --> (?<endTime>(?:\d\d:)?\d\d:\d\d)(?:\.|,)\d\d\d) ?(?<options>.+)?[^](?<text>.*[^]*)$/;let i={headers:e.match(/^(?<fileType>WEBVTT)?[^](?<Xoptions>.+[^])*/)?.groups??null,CSS:e.match(/^(?<Style>STYLE)[^](?<Boxes>.*::cue.*(\(.*\))?((\n|.)*}$)?)/m)?.groups??null,body:e.split(/[(\r\n)\r\n]{2,}/).map((e=>e.match(t)?.groups??""))};return i.body=i.body.filter(Boolean),i.body=i.body.map(((e,t)=>{if(e.index=t,"WEBVTT"!==i.headers?.fileType&&(e.timeLine=e.timeLine.replace(",","."),e.startTime=e.startTime.replace(",","."),e.endTime=e.endTime.replace(",",".")),this.opts.includes("timeStamp")){let t=e.startTime.replace(/(.*)/,"1970-01-01T$1Z");e.timeStamp=this.opts.includes("milliseconds")?Date.parse(t):Date.parse(t)/1e3}return this.opts.includes("singleLine")?e.text=e.text.replace(/[(\r\n)\r\n]/," "):this.opts.includes("multiLine")&&(e.text=e.text.split(/[(\r\n)\r\n]/)),e})),i}stringify(e=this.json){return[e.headers=e.headers?.Xoptions?[e.headers?.fileType??"WEBVTT",e.headers?.Xoptions??null].join(this.newLine):e.headers?.fileType??"WEBVTT",e.CSS=e.CSS?.Style?[e.CSS.Style,e.CSS.Boxes].join(this.newLine):null,e.body=e.body.map((e=>(Array.isArray(e.text)&&(e.text=e.text.join(this.newLine)),e=`${e.timeLine} ${e?.options??""}${this.newLine}${e.text}`))).join(this.newLine+this.newLine)].join(this.newLine+this.newLine)}json2txt(e=this.json){return e.body.map(((e,t)=>[t,e.timeStamp,e.text].join(this.newLine))).join(this.newLine+this.newLine)}txt2json(e=this.txt){const t=/^(?<srtNum>\d+)[^](?<timeStamp>\d+)[^](?<text>.*[^]*)$/;return{headers:null,CSS:null,body:e.split(/[(\r\n)\r\n]{2,}/).map((e=>e.match(t)?.groups??""))}}}(e)}
