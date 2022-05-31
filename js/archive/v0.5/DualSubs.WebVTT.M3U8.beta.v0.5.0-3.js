/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs v0.5.0-3");

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
		if (Indices.Index !== -1) {
			// 创建缓存
			// 获取VTT字幕地址数组
			if (type == "Official") {
				for await (var language of $.Settings.Language) {
					//let indices = (Indices?.[language] == -1) ? 0 : Indices?.[language]
					for await (var data of Cache[language]) data.VTTs = await getVTTs($.Platform, data.URI);
					$.log(`🚧 ${$.name}`, `${Object.keys(Cache[language])}`, JSON.stringify(Cache[language]), "");
				}
			}
			else {
				let language = $.Settings.Language[0]
				Cache[language][Indices[language]].VTTs = await getVTTs($.Platform, url);
			}
			//$.log(`🚧 ${$.name}`, "Cache.stringify", JSON.stringify(Cache), "");
			// 写入缓存
			$.Cache = await setCache(Indices.Index, $.Cache, Cache, $.Settings.CacheSize)
			$.setjson($.Cache, `@DualSubs.${$.Platform}.Cache`)
		};
		// 构建WebVTT.m3u8
		let response = await getWebVTTm3u8(url, type)
		$.log(`🚧 ${$.name}`, "response.stringify", JSON.stringify(response), "");
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

// Function 4
// Get Subtitle *.vtt URLs
async function getVTTs(platform, url) {
	$.log(`⚠ ${$.name}, Get Subtitle *.vtt URLs`, "");
	if (url) return await $.http.get({ url: url, headers: headers }).then((response) => {
		//$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `response.body: ${response.body}`, "");
		let VTTs = response.body.match(/^.+\.vtt$/gim);
		//$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `response.body.match(/^.+\.vtt$/gim): ${VTTs}`, "");
		/*
		// if 相对路径
		if (!/^https?:\/\//gim.test(VTTs)) {
			let PATH = url.match(/(?<PATH>^https?:\/\/(?:.+)\/)(?<fileName>[^\/]+\.m3u8)/i)?.groups?.PATH ?? null
			//$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `PATH: ${PATH}`, "");
			VTTs = VTTs.map(item => item = PATH + item)
			//$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle *.vtt URLs", `VTTs.map内容: ${VTTs}`, "");
		};
		*/
		// Disney + 筛选字幕
		if (platform == "Disney_Plus") {
			VTTs = VTTs.filter(item => !/\/subtitles_empty\//.test(item))
			if (VTTs.some(item => /\/.+-DUB_CARD\//.test(item))) VTTs = VTTs.filter(item => /\/.+-MAIN\//.test(item))
		}

		VTTs = VTTs.map(VTT => aPath(url, VTT));

		$.log(`🎉 ${$.name}, Get Subtitle *.vtt URLs`, `VTTs: ${VTTs}`, "");
		return VTTs
	})
	else return null;

	function aPath(aURL = "", URL = "") {
		let PATH = aURL.match(/^(https?:\/\/(?:.+)\/)/i)?.[0] ?? null;
		return (/^https?:\/\//i.test(URL)) ? URL : PATH + URL
	};
};

// Function 4
// Get Subtitle WebVTT *.m3u8
async function getWebVTTm3u8(url = "", type = "") {
	$.log(`⚠ ${$.name}, Get Subtitle WebVTT *.m3u8`, "");
	return await $.http.get({ url: url, headers: headers }).then((response) => {
		//$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle WebVTT *.m3u8", `response.body: ${response.body}`, "");
		response.body = response.body.replace(/^.+\.vtt$/gim, `$&%${type}%`);
		//$.log(`🚧 ${$.name}, 调试信息`, "Get Subtitle WebVTT *.m3u8", `response.body.replace: ${response.body}`, "");

		$.log(`🎉 ${$.name}, Get Subtitle WebVTT *.m3u8`, `response: ${JSON.stringify(response)}`, "");
		return response
	})
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=rawOpts["update-pasteboard"]||rawOpts.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
