/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs v0.4.0-sub-timedtext-beta");
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
		"Settings":{"Switch":true,"Types":["Official","Google","GoogleCloud","Azure","DeepL"],"Type":"Google","Languages":["ZH","EN"],"Language":"ZH","External":{"URL":null,"Offset":0,"ShowOnly":false},"Position":"Forward","CacheSize":6,"Tolerance":1000},
		"Configs": {
			"Languages":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG"],"CS":["cs","cs-CZ"],"DA":["da","da-DK"],"DE":["de","de-DE"],"EL":["el","el-GR"],"EN":["en","en-US","en-GB","en-UK","en-CA"],"EN-CA":["en-CA","en"],"EN-GB":["en-UK","en"],"EN-US":["en-US","en"],"EN-US SDH":["en-US SDH","en-US","en"],"ES":["es","es-419","es-ES","es-419 SDH"],"ES-419":["es-419","es"],"ES-419 SDH":["es-419 SDH","es-419","es"],"ES-ES":["es-ES","es"],"ET":["et","et-EE"],"FI":["fi","fi-FI"],"FR":["fr","fr-CA","fr-FR"],"FR-CA":["fr-CA","fr"],"FR-DR":["fr-FR","fr"],"HU":["hu","hu-HU"],"IT":["it","it-IT"],"JA":["ja","ja-JP"],"KO":["ko","ko-KR"],"LT":["lt","lt-LT"],"LV":["lv","lv-LV"],"NL":["nl","nl-NL"],"NO":["no","nb-NO"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR"],"PT-PT":["pt-PT","pt"],"PT-BR":["pt-BR","pt"],"RO":["ro","ro-RO"],"RU":["ru","ru-RU"],"SK":["sk","sk-SK"],"SL":["sl","sl-SI"],"SV":["sv","sv-SE"],"IS":["is","is-IS"],"ZH":["zh","cmn"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN"],"ZH-HK":["zh-HK","yue-Hant","yue"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW"],"YUE":["yue","yue-Hant"],"YUE-HK":["yue-Hant","yue"]}
		}
	},
	"Prime_Video": {
		"Configs": {
			"Languages":{"AR":"ar-001","BG":"bg-bg","CS":"cs-cz","DA":"da-dk","DE":"de-de","EL":"el-gr","EN":"en","EN-GB":"en-gb","EN-US":"en-us","EN-US SDH":"en-us","ES":"es","ES-419":"es-419","ES-ES":"es-es","ET":"et-ee","FI":"fi-fi","FR":"fr-fr","HU":"hu-hu","ID":"id-id","IT":"it-it","JA":"ja-jp","KO":"ko-kr","LT":"lt-lt","LV":"lv-lv","NL":"nl-nl","NO":"nb-no","PL":"pl-pl","PT":"pt","PT-PT":"pt-pt","PT-BR":"pt-br","RO":"ro-ro","RU":"ru-ru","SK":"sk-sk","SL":"sl-si","SV":"sv-se","IS":"is-is","ZH":"zh","ZH-HANS":"zh-hans","ZH-HK":"zh-HK","ZH-HANT":"zh-hant"}
		}
	},
	"Hulu": {
		"Configs": {
			"Languages":{"AR":"ar-001","BG":"bul","CS":"ces","DA":"dan","DE":"deu","EL":"ell","EN":"eng","EN-GB":"eng","EN-US":"eng","EN-US SDH":"eng","ES":"spa","ES-419":"spa","ES-ES":"spa","ET":"est","FI":"fin","FR":"fra","HU":"hun","IT":"ita","JA":"jpn","KO":"kor","LT":"lit","LV":"lav","NL":"nld","NO":"nor","PL":"pol","PT":"por","PT-PT":"por","PT-BR":"por","RO":"ron","RU":"rus","SK":"slk","SL":"slv","SV":"swe","IS":"isl","ZH":"zh","ZH-HANS":"zho","ZH-HK":"zho","ZH-HANT":"zho"}
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
delete $request.headers["Host"]
delete $request.headers["Connection"]
delete $request.headers["Range"]

/***************** Processing *****************/
!(async () => {
	const { Platform, Settings, Type, Caches, Configs } = await setENV("DualSubs", $request.url, DataBase);
	if (Settings.Switch) {
		let url = URL.parse($request.url);
		$.log(`⚠ ${$.name}, url.path=${url.path}`);
		const { Orig_URL, Tran_URL } = await getTimedTextURLs(url, Settings.Language, Configs);
		// 创建字幕JSON
		let OriginSub = await $.http.get({ "url": Orig_URL, "headers": $request.headers }).then(response => response.body);
		let SecondSub = await $.http.get({ "url": Tran_URL, "headers": $request.headers }).then(response => response.body);
		let DualSub = {};
		$.log(`🚧 ${$.name}`, `Format: ${url.params?.format || url.params?.fmt}`, "");
		switch (url.params?.format || url.params?.fmt) {
			case "json3":
				// 获取序列化字幕
				OriginSub = JSON.parse(OriginSub);
				SecondSub = JSON.parse(SecondSub);
				DualSub = await CombineDualSubs("json3", OriginSub, SecondSub, 0, Settings.Tolerance, [Settings.Position]);
				$response.body = JSON.stringify(DualSub);
				break;
			case "srv3":
				// 获取序列化字幕
				OriginSub = XML.parse(OriginSub);
				$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
				SecondSub = XML.parse(SecondSub);
				$.log(`🚧 ${$.name}`, `SecondSub: ${JSON.stringify(SecondSub)}`, "");
				//SecondSub = XML.stringify(SecondSub);
				//$.log(`🚧 ${$.name}`, `SecondSub: ${SecondSub}`, "");
				DualSub = await CombineDualSubs("srv3", OriginSub, SecondSub, 0, Settings.Tolerance, [Settings.Position]);
				$response.body = XML.stringify(DualSub);
				break;
			case "vtt":
			default:
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
 * https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default DataBase
 * @return {Promise<*>}
 */
async function getENV(t,e,n){let i=$.getjson(t,n),s=i?.[e]?.Settings||n?.[e]?.Settings||n?.Default?.Settings,g=i?.[e]?.Configs||n?.[e]?.Configs||n?.Default?.Configs,f=i?.[e]?.Caches||void 0;if("string"==typeof f&&(f=JSON.parse(f)),"undefined"!=typeof $argument){if($argument){let t=Object.fromEntries($argument.split("&").map((t=>t.split("=")))),e={};for(var a in t)o(e,a,t[a]);Object.assign(s,e)}function o(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}return{Settings:s,Caches:f,Configs:g}}

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
										: /\.fubo\.tv/i.test(url) ? "Fubo_TV"
											: /\.youtube\.com/i.test(url) ? "YouTube"
												: /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
													: "Universal"
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Platform: ${Platform}`, "");
	/***************** Verify *****************/
	const { Settings: Verify } = await getENV(name, "Verify", database);
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
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
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
	/***************** Type *****************/
	const Type = url.match(/[&\?]dualsubs=(\w+)$/)?.[1] || Settings.Type
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Type: ${Type}`, "");
	/***************** Advanced *****************/
	let { Settings: Advanced } = await getENV(name, "Advanced", database);
	Advanced.Translator.Times = parseInt(Advanced.Translator?.Times, 10) // BoxJs字符串转数字
	Advanced.Translator.Interval = parseInt(Advanced.Translator?.Interval, 10) // BoxJs字符串转数字
	Advanced.Translator.Exponential = JSON.parse(Advanced.Translator?.Exponential) //  BoxJs字符串转Boolean
	/***************** Cache *****************/
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Caches类型: ${typeof Caches}`, `Caches内容: ${Caches}`, "");
	//$.log(`🎉 ${$.name}, Set Environment Variables`, `Caches类型: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	return { Platform, Settings, Caches, Configs, Type, Verify, Advanced };
};

/**
 * Get TimedText URLs
 * @author VirgilClyne
 * @param {Object} url - url
 * @param {String} langcode - langcode
 * @param {Object} database - database
 * @return {Promise<*>}
 */
async function getTimedTextURLs(url, langcode, database) {
	$.log(`⚠ ${$.name}, Get TimedText URLs`, `url: ${JSON.stringify(url)}`, `langcode: ${langcode}`, "");
	// 创建链接URL
	let URLs = [];
	if (url.params?.tlang) { // 已选
		URLs[1] = URL.stringify(url);
		delete url.params?.tlang // 原字幕
		URLs[0] = URL.stringify(url);
	} else { // 未选
		URLs[0] = URL.stringify(url);
		url.params.tlang = database.Languages[langcode]; // 翻译字幕
		URLs[1] = URL.stringify(url);
	};
	$.log(`🚧 ${$.name}, Get TimedText URLs`, `Orig_URL: ${URLs[0]}`, "");
	$.log(`🚧 ${$.name}, Get TimedText URLs`, `Tran_URL: ${URLs[1]}`, "");
	return { Orig_URL: URLs[0], Tran_URL: URLs[1]};
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
async function CombineDualSubs(Format = "VTT", Sub1 = {}, Sub2 = {}, Offset = 0, Tolerance = 1000, options = ["Forward"]) { // options = ["Forward", "Reverse"]
	$.log(`⚠ ${$.name}, Combine Dual Subtitles`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	let DualSub = options.includes("Reverse") ? Sub2 : Sub1
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`let DualSub内容: ${JSON.stringify(DualSub)}`, "");
	// 有序数列 用不着排序
	//FirstSub.body.sort((x, y) => x - y);
	//SecondSub.body.sort((x, y) => x - y);
	const length1 = Sub1?.events?.length ?? Sub1?.timedtext?.body?.p?.length;
	const length2 = Sub2?.events?.length ?? Sub2?.timedtext?.body?.p?.length;
	let index0 = 0, index1 = 0, index2 = 0;
	switch (Format) {
		case "json3":
			// 双指针法查找两个数组中的相同元素
			while (index1 < length1 && index2 < length2) {
				const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
				const text1 = Sub1.events[index1]?.segs[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs[0].utf8 ?? "";
				$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
				$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
				$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
				if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
					index0 = options.includes("Reverse") ? index2 : index1;
					DualSub.events[index0].segs[0].utf8 = options.includes("Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`;
					$.log(`🚧`, `DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
					//DualSub.body[index0].tStartMs = options.includes("Reverse") ? timeStamp2 : timeStamp1;
					//DualSub.body[index0].index = options.includes("Reverse") ? index2 : index1;
				}
				if (timeStamp2 > timeStamp1) index1++
				else if (timeStamp2 < timeStamp1) index2++
				else index1++; index2++
			};
		case "srv3":
			// 双指针法查找两个数组中的相同元素
			while (index1 < length1 && index2 < length2) {
				const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10), timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
				const text1 = Sub1.timedtext.body.p[index1]["#"] ?? "", text2 = Sub2.timedtext.body.p[index2]["#"] ?? "";
				$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
				$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
				$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
				if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
					index0 = options.includes("Reverse") ? index2 : index1;
					DualSub.timedtext.body.p[index0]["#"] = options.includes("Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`;
					$.log(`🚧`, `DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
					//DualSub.timedtext.body.p[index0]["@t"] = options.includes("Reverse") ? timeStamp2 : timeStamp1;
					//DualSub.timedtext.body.p[index0].index = options.includes("Reverse") ? index2 : index1;
				}
				if (timeStamp2 > timeStamp1) index1++
				else if (timeStamp2 < timeStamp1) index2++
				else index1++; index2++
			};
	}
	$.log(`🎉 ${$.name}, Combine Dual Subtitles`, `return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	return DualSub;
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

// https://github.com/VirgilClyne/VirgilClyne/blob/main/function/URL/URLs.embedded.min.js
function URLs(s){return new class{constructor(s=[]){this.name="URL v1.0.0",this.opts=s,this.json={url:{scheme:"",host:"",path:""},params:{}}}parse(s){let t=s.match(/(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/)?.groups??null;return t?.params&&(t.params=Object.fromEntries(t.params.split("&").map((s=>s.split("="))))),t}stringify(s=this.json){return s?.params?s.scheme+"://"+s.host+"/"+s.path+"?"+Object.entries(s.params).map((s=>s.join("="))).join("&"):s.scheme+"://"+s.host+"/"+s.path}}(s)}

// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/json2xml.js
function XMLs(opts) {
	return new (class {
		constructor(opts) {
			this.name = "XML v0.1.0";
			this.opts = opts;
		};

		parse(xml = new String, reviver = "") {
			const UNESCAPE = {
				"&amp;": "&",
				"&lt;": "<",
				"&gt;": ">",
				"&apos;": "'",
				"&quot;": '"'
			};
			const ATTRIBUTE_KEY = "@";
			const CHILD_NODE_KEY = "#";

			$.log(`🚧 ${$.name}, parse XML`, "");
			let parsedXML = parseXML(xml);
			let json = toObject(parsedXML, reviver);
			$.log(`🚧 ${$.name}, parse XML`, `json: ${JSON.stringify(json)}`, "");
			return json;

			/***************** Fuctions *****************/
			function parseXML(text) {
				var list = String.prototype.split.call(text, /<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/);
				var length = list.length;

				// root element
				var root = { f: [] };
				var elem = root;

				// dom tree stack
				var stack = [];

				for (var i = 0; i < length;) {
					// text node
					var str = list[i++];
					if (str) appendText(str);

					// child node
					var tag = list[i++];
					if (tag) parseNode(tag);
				}

				return root;

				function parseNode(tag) {
					var tagLength = tag.length;
					var firstChar = tag[0];
					if (firstChar === "/") {
						// close tag
						var closed = tag.replace(/^\/|[\s\/].*$/g, "").toLowerCase();
						while (stack.length) {
							var tagName = elem.n && elem.n.toLowerCase();
							elem = stack.pop();
							if (tagName === closed) break;
						}
					} else if (firstChar === "?") {
						// XML declaration
						appendChild({ n: "?", r: tag.substr(1, tagLength - 2) });
					} else if (firstChar === "!") {
						if (tag.substr(1, 7) === "[CDATA[" && tag.substr(-2) === "]]") {
							// CDATA section
							appendText(tag.substr(8, tagLength - 10));
						} else {
							// comment
							appendChild({ n: "!", r: tag.substr(1) });
						}
					} else {
						var child = openTag(tag);
						appendChild(child);
						if (tag[tagLength - 1] === "/") {
							child.c = 1; // emptyTag
						} else {
							stack.push(elem); // openTag
							elem = child;
						}
					}
				}

				function appendChild(child) {
					elem.f.push(child);
				}

				function appendText(str) {
					str = removeSpaces(str);
					if (str) appendChild(unescapeXML(str));
				}
			}


			function openTag(tag) {
				var elem = { f: [] };
				tag = tag.replace(/\s*\/?$/, "");
				var pos = tag.search(/[\s='"\/]/);
				if (pos < 0) {
					elem.n = tag;
				} else {
					elem.n = tag.substr(0, pos);
					elem.t = tag.substr(pos);
				}
				return elem;
			}

			function parseAttribute(elem, reviver) {
				if (!elem.t) return;
				var list = elem.t.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/);
				var length = list.length;
				var attributes, val;

				for (var i = 0; i < length; i++) {
					var str = removeSpaces(list[i]);
					if (!str) continue;

					if (!attributes) {
						attributes = {};
					}

					var pos = str.indexOf("=");
					if (pos < 0) {
						// bare attribute
						str = ATTRIBUTE_KEY + str;
						val = null;
					} else {
						// attribute key/value pair
						val = str.substr(pos + 1).replace(/^\s+/, "");
						str = ATTRIBUTE_KEY + str.substr(0, pos).replace(/\s+$/, "");

						// quote: foo="FOO" bar='BAR'
						var firstChar = val[0];
						var lastChar = val[val.length - 1];
						if (firstChar === lastChar && (firstChar === "'" || firstChar === '"')) {
							val = val.substr(1, val.length - 2);
						}

						val = unescapeXML(val);
					}
					if (reviver) {
						val = reviver(str, val);
					}
					addObject(attributes, str, val);
				}

				return attributes;
			}

			function removeSpaces(str) {
				return str && str.replace(/^\s+|\s+$/g, "");
			}

			function unescapeXML(str) {
				return str.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g, function (str) {
					if (str[1] === "#") {
						var code = (str[2] === "x") ? parseInt(str.substr(3), 16) : parseInt(str.substr(2), 10);
						if (code > -1) return String.fromCharCode(code);
					}
					return UNESCAPE[str] || str;
				});
			}

			function toObject(elem, reviver) {
				if ("string" === typeof elem) return elem;

				var raw = elem.r;
				if (raw) return raw;

				var attributes = parseAttribute(elem, reviver);
				var object;
				var childList = elem.f;
				var childLength = childList.length;

				if (attributes || childLength > 1) {
					// merge attributes and child nodes
					object = attributes || {};
					childList.forEach(function (child) {
						if ("string" === typeof child) {
							addObject(object, CHILD_NODE_KEY, child);
						} else {
							addObject(object, child.n, toObject(child, reviver));
						}
					});
				} else if (childLength) {
					// the node has single child node but no attribute
					var child = childList[0];
					object = toObject(child, reviver);
					if (child.n) {
						var wrap = {};
						wrap[child.n] = object;
						object = wrap;
					}
				} else {
					// the node has no attribute nor child node
					object = elem.c ? null : "";
				}

				if (reviver) {
					object = reviver(elem.n || "", object);
				}

				return object;
			}

			function addObject(object, key, val) {
				if ("undefined" === typeof val) return;
				var prev = object[key];
				if (prev instanceof Array) {
					prev.push(val);
				} else if (key in object) {
					object[key] = [prev, val];
				} else {
					object[key] = val;
				}
			}
		};

		stringify(json = new Object, tab = "") {
			$.log(`🚧 ${$.name}, stringify XML`, "");
			var XML = "";
			for (var m in json)
				XML += toXml(json[m], m, "");
			XML = tab ? XML.replace(/\t/g, tab) : XML.replace(/\t|\n/g, "");
			$.log(`🚧 ${$.name}, stringify XML`, `XML: ${XML}`, "");
			return XML;
			/***************** Fuctions *****************/
			function toXml(v, name, ind) {
				var xml = "";
				if (v instanceof Array) {
					for (var i = 0, n = v.length; i < n; i++)
						xml += ind + toXml(v[i], name, ind + "\t") + "\n";
				} else if (typeof (v) == "object") {
					var hasChild = false;
					xml += ind + "<" + name;
					for (var m in v) {
						if (m.charAt(0) == "@")
							xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
						else
							hasChild = true;
					}
					xml += hasChild ? ">" : "/>";
					if (hasChild) {
						for (var m in v) {
							if (m == "#")
								xml += v[m];
							else if (m == "#cdata")
								xml += "<![CDATA[" + v[m] + "]]>";
							else if (m.charAt(0) != "@")
								xml += toXml(v[m], m, ind + "\t");
						}
						xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
					}
				} else if (name === "?") xml += ind + "<" + name + v.toString() + name + ">";
				else xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
				return xml;
			};
		};
	})(opts)
}
