/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("DualSubs for YouTube v0.1.0");

const DataBase = {
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Settings.beta.min.json
	Settings: {"Verify":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}},"Advanced":{"Translator":{"Times":3,"Interval":100,"Exponential":true}},"Apple":{"Switch":true,"Types":["Official","Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_TV":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_TV_Plus":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Apple_Fitness":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Disney_Plus":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":5,"Offset":0,"Tolerance":1000},"Prime_Video":{"Switch":true,"Types":["Official","Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"HBO_Max":{"Switch":true,"Types":["Google"],"Type":"Google","Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Hulu":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Paramount_Plus":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Discovery_Plus_Ph":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Peacock_TV":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Discovery_Plus":{"Switch":true,"Types":["Google"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"Netflix":{"Switch":true,"Types":["Official","Google","External"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000},"YouTube":{"Switch":true,"Types":["Official"],"Languages":["ZH","EN"],"Position":"Forward","CacheSize":2,"Offset":0,"Tolerance":1000}},
	// https://raw.githubusercontent.com/DualSubs/DualSubs/beta/database/DualSubs.Languages.beta.min.json
	Languages: {"Apple":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"cmn","ZH-HANS":"cmn-Hans","ZH-HK":"yue-Hant","ZH-HANT":"cmn-Hant"},"Disney_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Prime_Video":{"AR":"ar-001","BG":"bg-bg","CS":"cs-cz","DA":"da-dk","DE":"de-de","EL":"el-gr","EN":"en","EN-GB":"en-gb","EN-US":"en-us","EN-US SDH":"en-us","ES-419":"es-419","ES-ES":"es-es","ET":"et-ee","FI":"fi-fi","FR":"fr-fr","HU":"hu-hu","ID":"id-id","IT":"it-it","JA":"ja-jp","KO":"ko-kr","LT":"lt-lt","LV":"lv-lv","NL":"nl-nl","NO":"nb-no","PL":"pl-pl","PT":"pt","PT-PT":"pt-pt","PT-BR":"pt-br","RO":"ro-ro","RU":"ru-ru","SK":"sk-sk","SL":"sl-si","SV":"sv-se","IS":"is-is","ZH":"zh","ZH-HANS":"zh-hans","ZH-HK":"zh-HK","ZH-HANT":"zh-hant"},"HBO_Max":{"AR":"ar-001","BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de-DE","EL":"el-GR","EN":"en","EN-GB":"en-UK","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-419 SDH":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi-FI","FR":"fr-FR","HU":"hu-HU","IT":"it-IT","JA":"ja-JP","KO":"ko-KR","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Hulu":{"AR":"ar-001","BG":"bul","CS":"ces","DA":"dan","DE":"deu","EL":"ell","EN":"eng","EN-GB":"eng","EN-US":"eng","EN-US SDH":"eng","ES-419":"spa","ES-ES":"spa","ET":"est","FI":"fin","FR":"fra","HU":"hun","IT":"ita","JA":"jpn","KO":"kor","LT":"lit","LV":"lav","NL":"nld","NO":"nor","PL":"pol","PT":"por","PT-PT":"por","PT-BR":"por","RO":"ron","RU":"rus","SK":"slk","SL":"slv","SV":"swe","IS":"isl","ZH":"zh","ZH-HANS":"zho","ZH-HK":"zho","ZH-HANT":"zho"},"Paramount_Plus":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus_Ph":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Peacock_TV":{"AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en","ES-419":"es-419","ES-ES":"es-ES","ET":"et","FI":"fi","FR":"fr-FR","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"},"Discovery_Plus":{"BG":"bg-BG","CS":"cs-CZ","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-HK","ZH-HANT":"zh-TW"},"Netflix":{},"YouTube":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW","YUE":"yue","YUE-HK":"yue-HK"},"Google":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT-PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}
};

const url = $request.url
$.log(`🚧 ${$.name}`, `url: ${url}`, "");

const type = url.match(/[&\?](format|fmt)=([^&]+)/)[2]
$.log(`🚧 ${$.name}`, `type: ${type}`, "");

const method = $request.method
if (method == "OPTIONS") $.done();

delete $request.headers["Host"]
delete $request.headers["Connection"]
const headers = $request.headers

/***************** Processing *****************/
!(async () => {
	[$.Platform, $.Verify, $.Advanced, $.Settings, $.Cache] = await setENV(url, DataBase);
	if ($.Settings.Switch) {
		if (type == "json3") {
			// 创建双语字幕JSON
			let DualSub = {};
			if (processQuery(url, "tlang")) { // 已选
				let request = {
					"url": url.replace(/(&tlang=.*)/, ""), // 原字幕
					"headers": headers
				}
				$.log(`🚧 ${$.name}`, `request.url: ${request.url}`, "");
				// 获取序列化字幕
				let SecondSub = JSON.parse($response.body);
				let OriginSub = await $.http.get(request).then(response => JSON.parse(response.body));
				DualSub = await CombineDualSubs(OriginSub, SecondSub, 0, $.Settings.Tolerance, [$.Settings.Position]);
			} else { // 未选
				let langcode = DataBase?.Languages?.[$.Platform]?.[$.Settings.Languages[0]]
				$.log(`🚧 ${$.name}`, `langcode: ${langcode}`, "");
				let request = {
					"url": url+ `&tlang=${langcode}`, // 翻译字幕
					"headers": headers
				}
				$.log(`🚧 ${$.name}`, `request.url: ${request.url}`, "");
				// 获取序列化字幕
				let OriginSub = JSON.parse($response.body);
				let SecondSub = await $.http.get(request).then(response => JSON.parse(response.body));
				DualSub = await CombineDualSubs(OriginSub, SecondSub, 0, $.Settings.Tolerance, [$.Settings.Position]);
			}
			$response.body = JSON.stringify(DualSub);
		} else if (type == "svr3") {
			$.done()
		}
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
	$.log(`⚠ ${$.name}, Get Cache`, `cache: ${JSON.stringify(cache)}`,"");
	let Indices = { "Index": await getIndex(cache) };
	$.log(`🎉 ${$.name}, Get Cache`, `Indices.Index: ${Indices.Index}`, "");
	for await (var language of $.Settings.Languages) Indices[language] = await getDataIndex(Indices.Index, language)
	$.log(`🎉 ${$.name}, Get Cache`, `Indices: ${JSON.stringify(Indices)}`, "");
	return [Indices, cache[Indices.Index]]
	/***************** Fuctions *****************/
	async function getIndex(cache) {
		return cache.findIndex(item => {
			let URLs = [item?.URL, item?.baseURL];
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
// process Query URL
// 查询并替换自身,url为链接,variable为参数,parameter为新值(如果有就替换)
// https://github.com/VirgilClyne/iRingo/blob/main/js/QueryURL.js
function processQuery(url, variable, parameter) {
    //console.log(`processQuery, INPUT: variable: ${variable}, parameter: ${parameter}`, url, ``);
    if (url.indexOf("?") != -1) {
        if (parameter == undefined) {
            //console.log(`getQueryVariable, INPUT: variable: ${variable}`, ``);
            var query = url.split("?")[1];
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    //console.log(`getQueryVariable, OUTPUT: ${variable}=${pair[1]}`, ``);
                    return pair[1];
                }
            }
            console.log(`getQueryVariable, ERROR: No such variable: ${variable}, Skip`, ``);
            return false;
        } else {
            //console.log(`replaceQueryParamter, INPUT: ${variable}=${parameter}, Start`, ``);
            var re = new RegExp('(' + variable + '=)([^&]*)', 'gi')
            var newUrl = url.replace(re, variable + '=' + parameter)
            //console.log(`replaceQueryParamter, OUTPUT: ${variable}=${parameter}`, newUrl, ``);
            return newUrl
        };
    } else {
        console.log(`processQuery, ERROR: No such URL ,Skip`, url, ``);
        return url;
    }
};

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

/** 
 * Combine Dual Subtitles
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} options - options
 * @return {Promise<*>}
 */
 async function CombineDualSubs(Sub1 = { events: [] }, Sub2 = { events: [] }, Offset = 0, Tolerance = 1000, options = ["Forward"]) { // options = ["Forward", "Reverse"]
	$.log(`⚠ ${$.name}, Combine Dual Subtitles`, "");
	let DualSub = options.includes("Reverse") ? Sub2 : Sub1
	const length1 = Sub1.events.length, length2 = Sub2.events.length;
	let index0 = 0, index1 = 0, index2 = 0;
	// 双指针法查找两个数组中的相同元素
	while (index1 < length1 && index2 < length2) {
		const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs + Offset;
		const text1 = Sub1.events[index1]?.segs[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs[0].utf8 ?? "";
		if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
			index0 = options.includes("Reverse") ? index2 : index1;
			DualSub.events[index0].segs[0].utf8 = options.includes("Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}`;
			//DualSub.body[index0].tStartMs = options.includes("Reverse") ? timeStamp2 : timeStamp1;
			//DualSub.body[index0].index = options.includes("Reverse") ? index2 : index1;
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

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

