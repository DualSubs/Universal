/**
 * Translate
 * @author VirgilClyne
 * @param {Array} text - full text
 * @param {String} method - method
 * @param {String} vendor - translate service vendor
 * @param {String} source - source language
 * @param {String} target - target language
 * @param {Object} api - translate service API
 * @param {Object} database - languages database
 * @param {Number} times - retry times
 * @param {Number} interval - retry interval
 * @param {Boolean} exponential - retry Exponential
 * @return {Promise<*>}
 */
export default async function Translate(text = [], method = "Part", vendor = "Google", source = "EN", target = "ZH", API = {}, database = {}, times = 3, interval = 100, exponential = true) {
	console.log(`☑️ Translate, method: ${method}, vendor: ${vendor}, source: ${source}, target: ${target}`, "");
	// 翻译长度设置
	let length = 127;
	switch (vendor) {
		case "Google":
		case "GoogleCloud":
		default:
			length = 120;
			break;
		case "Microsoft":
		case "Azure":
			length = 99;
			break;
		case "DeepL":
			length = 49;
			break;
		case "DeepLX":
			length = 20;
			break;
	};
	let Translation = [];
	switch (method) {
		default:
		case "Part": // Part 逐段翻译
			let parts = chunk(text, length);
			Translation = await Promise.all(parts.map(async part => await retry(() => Translator(vendor, source, target, part, API, database), times, interval, exponential))).then(part => part.flat(Infinity));
			break;
		case "Row": // Row 逐行翻译
			Translation = await Promise.all(text.map(async row => await retry(() => Translator(vendor, source, target, row, API, database), times, interval, exponential)));
			break;
	};
	//console.log(`✅ Translate, Translation: ${JSON.stringify(Translation)}`, "");
	console.log(`✅ Translate`, "");
	return Translation;
};

/**
 * Translator
 * @author VirgilClyne
 * @param {String} vendor - vendor
 * @param {String} source - source
 * @param {String} target - target
 * @param {String} text - text
 * @param {Object} api - API
 * @param {Object} database - Languages Database
 * @return {Promise<*>}
 */
async function Translator(vendor = "Google", source = "", target = "", text = "", api = {}, database = {}) {
    console.log(`☑️ Translator`, "");
    // 转换语言代码
    switch (vendor) {
        case "Google":
        case "GoogleCloud":
            source = database.Google[source] ?? database.Google[source?.split?.(/[-_]/)?.[0]];
            target = database.Google[target] ?? database.Google[source?.split?.(/[-_]/)?.[0]];
            break;
        case "Bing":
        case "Microsoft":
        case "Azure":
            source = database.Microsoft[source] ?? database.Microsoft[source?.split?.(/[-_]/)?.[0]];
            target = database.Microsoft[target] ?? database.Microsoft[source?.split?.(/[-_]/)?.[0]];
            break;
        case "DeepL":
        case "DeepLX":
            source = database.DeepL[source] ?? database.DeepL[source?.split?.(/[-_]/)?.[0]];
            target = database.DeepL[target] ?? database.DeepL[source?.split?.(/[-_]/)?.[0]];
            break;
        case "BaiduFanyi":
            source = database.Baidu[source] ?? database.Baidu[source?.split?.(/[-_]/)?.[0]];
            target = database.Baidu[target] ?? database.Baidu[source?.split?.(/[-_]/)?.[0]];
        case "YoudaoAI":
            source = database.Youdao[source] ?? database.Youdao[source?.split?.(/[-_]/)?.[0]];
            target = database.Youdao[target] ?? database.Youdao[source?.split?.(/[-_]/)?.[0]];
            break;
    };
    console.log(`🚧 Translator, source: ${source}, target : ${target}`, "");
    //console.log(`🚧 Translator, orig: ${text}`, "");
    // 构造请求
    let request = structureRequest(vendor, source, target, text);
    // 发送请求
    let trans = await GetData(vendor, request);
    //console.log(`🚧 Translator, trans: ${trans}`, "");
    console.log(`✅ Translator`, "");
    return trans
};

// Get Translate Request
function structureRequest(vendor = "", source = "", target = "", text = "") {
    console.log(`☑️ Structure Request`, "");
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
        "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0",
    ];
    let request = {};
    let BaseURL = "";
    let texts = "";
    switch (vendor) {
        default:
        case "Google":
            const BaseRequest = [
                { // Google API
                    "url": "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t",
                    "headers": {
                        "Accept": "*/*",
                        "User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)], // 随机UA
                        "Referer": "https://translate.google.com"
                    }
                },
                { // Google Dictionary Chrome extension https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja
                    "url": "https://clients5.google.com/translate_a/t?client=dict-chrome-ex",
                    "headers": {
                        "Accept": "*/*",
                        "User-Agent": UAPool[Math.floor(Math.random() * UAPool.length)] // 随机UA
                    }
                },
                { // Google Translate App
                    "url": "https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8",
                    "headers": {
                        "Accept": "*/*",
                        "User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)",
                    }
                },
                { // Google Translate App
                    "url": "https://translate.googleapis.com/translate_a/single?client=gtx&dj=1&source=bubble&dt=t&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at",
                    "headers": {
                        "Accept": "*/*",
                        "User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)",
                    }
                }
            ]
            request = BaseRequest[Math.floor(Math.random() * (BaseRequest.length - 2))] // 随机Request, 排除最后两项
            text = (Array.isArray(text)) ? text.join("\r") : text;
            request.url = request.url + `&sl=${source}&tl=${target}&q=${encodeURIComponent(text)}`;
            break;
        case "GoogleCloud":
            BaseURL = "https://translation.googleapis.com";
            switch (api?.Version) {
                case "v2":
                default:
                    request.url = `${BaseURL}/language/translate/v2`;
                    request.headers = {
                        //"Authorization": `Bearer ${api?.Token ?? api?.Auth}`,
                        "User-Agent": "DualSubs",
                        "Content-Type": "application/json; charset=utf-8"
                    };
                    request.body = JSON.stringify({
                        "q": text,
                        "source": source,
                        "target": target,
                        "format": "html",
                        //"key": api?.Key
                    });
                    switch (api?.Mode) {
                        case "Token":
                            request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
                            break;
                        case "Key":
                        default:
                            request.url += `?key=${api?.Key ?? api?.Auth}`;
                            break;
                    };
                    break;
                case "v3":
                    request.url = `${BaseURL}/v3/projects/${api?.ID}`;
                    request.headers = {
                        "Authorization": `Bearer ${api?.Token ?? api?.Auth}`,
                        "x-goog-user-project": api?.ID,
                        "User-Agent": "DualSubs",
                        "Content-Type": "application/json; charset=utf-8"
                    };
                    request.body = JSON.stringify({
                        "sourceLanguageCode": source,
                        "targetLanguageCode": target,
                        "contents": (Array.isArray(text)) ? text : [text],
                        "mimeType": "text/html"
                    });
                    break;
            }
            break;
        case "Bing":
            // https://github.com/Animenosekai/translate/blob/main/translatepy/translators/bing.py
            switch (api?.Version) {
                case "Bing":
                default:
                    BaseURL = "https://www.bing.com/ttranslatev3?IG=839D27F8277F4AA3B0EDB83C255D0D70&IID=translator.5033.3";
                    break;
                case "BingCN":
                    BaseURL = "https://cn.bing.com/ttranslatev3?IG=25FEE7A7C7C14533BBFD66AC5125C49E&IID=translator.5025.1";
                    break;
            };
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
                //"from": source,
                "to": target
            });
            break;
        case "Microsoft":
        case "Azure":
            // https://docs.microsoft.com/zh-cn/azure/cognitive-services/translator/
            // https://docs.azure.cn/zh-cn/cognitive-services/translator/
            switch (api?.Version) {
                case "Azure":
                default:
                    BaseURL = "https://api.cognitive.microsofttranslator.com";
                    break;
                case "AzureCN":
                    BaseURL = "https://api.translator.azure.cn";
                    break;
                case "AzureUS":
                    BaseURL = "https://api.cognitive.microsofttranslator.us";
                    break;
            };
            request.url = `${BaseURL}/translate?api-version=3.0&textType=html&${(source) ? `from=${source}` : ""}&to=${target}`;
            request.headers = {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "zh-hans"
                //"Authorization": `Bearer ${api?.Auth}`,
                //"Ocp-Apim-Subscription-Key": api?.Auth,
                //"Ocp-Apim-Subscription-Region": api?.Region, // chinanorth, chinaeast2
                //"X-ClientTraceId": uuidv4().toString()
            };
            switch (api?.Mode) {
                case "Token":
                default:
                    request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
                    break;
                case "Key":
                    request.headers["Ocp-Apim-Subscription-Key"] = api?.Key ?? api?.Auth;
                    request.headers["Ocp-Apim-Subscription-Region"] = api?.Region;
                    break;
            };
            text = (Array.isArray(text)) ? text : [text];
            texts = text?.map(item => { return { "text": item } });
            request.body = JSON.stringify(texts);
            /*
            request.body = JSON.stringify([{
                "text": text
            }]);
            */
            break;
        case "DeepL": {
            switch (api?.Version) {
                case "Free":
                default:
                    BaseURL = "https://api-free.deepl.com";
                    break;
                case "Pro":
                    BaseURL = "https://api.deepl.com";
                    break;
            };
            request.url = `${BaseURL}/v2/translate`;
            request.headers = {
                //"Accept": "*/*",
                "User-Agent": "DualSubs",
                "Content-Type": "application/json",
                "Authorization": `DeepL-Auth-Key ${api?.Token ?? api?.Auth}`
            };
            //const BaseBody = `auth_key=${api?.Key ?? api?.Auth}&source_lang=${source}&target_lang=${target}&tag_handling=html`;
            //text = (Array.isArray(text)) ? text : [text];
            //texts = await Promise.all(text?.map(async item => `&text=${encodeURIComponent(item)}`))
            //request.body = BaseBody + texts.join("");
            let body = {
                "text": (Array.isArray(text)) ? text : [text],
                //"source_lang": source,
                "target_lang": target,
                "tag_handling": "html"
            };
            if (source) body.source_lang = source;
            request.body = JSON.stringify(body);
            break;
        }
        case "DeepLX": {
            BaseURL = api?.Endpoint;
            request.url = BaseURL;
            request.headers = {
                "Accept": "*/*",
                "User-Agent": "DualSubs",
                "Content-Type": "application/json"
            };
            if (api?.Token) request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
            request.body = JSON.stringify({
                "text": (Array.isArray(text)) ? text.join("||") : text,
                "source_lang": source,
                "target_lang": target,
            });
            break;
        }
        case "BaiduFanyi":
            // https://fanyi-api.baidu.com/doc/24
            BaseURL = "https://fanyi-api.baidu.com";
            request.url = `${BaseURL}/api/trans/vip/language`;
            request.headers = {
                "User-Agent": "DualSubs",
                "Content-Type": "application/x-www-form-urlencoded"
            };
            request.body = {
                "q": text,
                "from": source,
                "to": target,
                "appid": api?.Key,
                "salt": uuidv4().toString(),
                "sign": "",
            };
            break;
        case "YoudaoAI":
            // https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html
            BaseURL = "https://openapi.youdao.com";
            request.url = `${BaseURL}/api`;
            request.headers = {
                "User-Agent": "DualSubs",
                "Content-Type": "application/json; charset=utf-8"
            };
            request.body = {
                "q": text,
                "from": source,
                "to": target,
                "appKey": api?.Key,
                "salt": uuidv4().toString(),
                "signType": "v3",
                "sign": "",
                "curtime": Math.floor(+new Date() / 1000)
            };
            break;
    }
    //console.log(`🚧 Structure Request, request: ${JSON.stringify(request)}`, "");
    console.log(`✅ Structure Request`, "");
    return request
};

// Get Translate Data
async function GetData(vendor, request) {
    console.log(`☑️ Get Translate Data`, "");
    let texts = [];
    await fetch(request)
        .then(response => JSON.parse(response.body))
        .then(_data => {
            switch (vendor) {
                case "Google":
                default:
                    if (Array.isArray(_data)) {
                        if (Array.isArray(_data?.[0])) {
                            if (_data.length === 1) {
                                _data[0].pop();
                                texts = _data[0];
                            } else texts = _data?.[0]?.map(item => item?.[0] ?? `翻译失败, vendor: ${vendor}`);
                        } else texts = _data;
                        /*
                        if (_data.length === 1) {
                            if (Array.isArray(_data?.[0])) {
                                _data[0].pop();
                                texts = _data[0];
                            } else texts = _data;
                        } else if (Array.isArray(_data?.[0])) texts = _data?.[0]?.map(item => item?.[0] ?? `翻译失败, vendor: ${vendor}`);
                        else texts = _data;
                        */
                    } else if (_data?.sentences) texts = _data?.sentences?.map(item => item?.trans ?? `翻译失败, vendor: ${vendor}`);
                    texts = texts?.join("")?.split(/\r/);
                    break;
                case "GoogleCloud":
                    texts = _data?.data?.translations?.map(item => item?.translatedText ?? `翻译失败, vendor: ${vendor}`);
                    break;
                case "Bing":
                case "Microsoft":
                case "Azure":
                    texts = _data?.map(item => item?.translations?.[0]?.text ?? `翻译失败, vendor: ${vendor}`);
                    break;
                case "DeepL":
                    texts = _data?.translations?.map(item => item?.text ?? `翻译失败, vendor: ${vendor}`);
                    break;
                case "DeepLX":
                    texts = _data?.data?.split("||") ?? _data?.data;
                    break;
                case "BaiduFanyi":
                    break;
                case "YoudaoAI":
                    break;
            };
        })
        .catch(error => Promise.reject(error));
    //console.log(`🚧 Get Translate Data, texts: ${JSON.stringify(texts)}`, "");
    console.log(`✅ Get Translate Data`, "");
    return texts
};

/**
 * Fetch Ruled Reqeust
 * @author VirgilClyne
 * @link https://github.com/BiliUniverse/Global/blob/main/js/BiliBili.Global.request.js
 * @param {Object} request - Original Request Content
 * @return {Promise<*>}
 */
async function fetch(request = {}) {
    console.log(`☑️ Fetch Ruled Reqeust`, "");
    let response = (request?.body ?? request?.bodyBytes)
        ? await $.http.post(request)
        : await $.http.get(request);
    console.log(`🚧 Fetch Ruled Reqeust`, `Response:${JSON.stringify(response)}`, "");
    console.log(`✅ Fetch Ruled Reqeust`, "");
    return response;
};
