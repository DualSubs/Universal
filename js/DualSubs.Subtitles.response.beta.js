/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("🍿️ DualSubs: 🎦 Universal v0.8.6(11) Subtitles.response.beta");
const URL = new URLs();
const XML = new XMLs();
const VTT = new WebVTT(["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"
const DataBase = {
	"Default": {
		"Settings": {"Switch":true},
	},
	"Universal": {
		"Settings": {
			"Switch": true,
			"Types": ["Official", "Translate"],
			"Languages": ["ZH", "EN"],
			"Official": {
				"CacheSize": 100,
				"Position": "Forward",
				"Offset": 0,
				"Tolerance": 1000
			},
			"Translate": {
				"Type": "Google",
				"Types": ["Google", "GoogleCloud", "Azure", "DeepL"],
				"ShowOnly": false,
				"Position": "Forward",
				"CacheSize": 10,
				"Method": "Part",
				"Times": 3,
				"Interval": 100,
				"Exponential": true
			},
			"External": {
				"URL": null,
				"ShowOnly": false,
				"Position": "Forward",
				"Offset": 0,
				"Tolerance": 1000
			},
			"API": {
				"GoogleCloud": {
					"Mode": "Key",
					"Auth": null
				},
				"Azure": {
					"Version": "Azure",
					"Region": null,
					"Mode": "Key",
					"Auth": null
				},
				"DeepL": {
					"Version": "Free",
					"Auth": null
				}
			}
		},
		"Configs": {
			"Languages": {
				"Official":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]},
				"Google":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},
				"Microsoft":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},
				"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES":"ES","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT-PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}
			}
		}
	},
	"YouTube": {
		"Configs": {
			"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IS":"is-IS","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","YUE":"yue","YUE-HK":"yue-HK","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW"},
			"translationLanguages":{
				"DESKTOP":[{"languageCode":"sq","languageName":{"simpleText":"Shqip - 阿尔巴尼亚语"}},{"languageCode":"ak","languageName":{"simpleText":"Ákán - 阿肯语"}},{"languageCode":"ar","languageName":{"simpleText":"العربية - 阿拉伯语"}},{"languageCode":"am","languageName":{"simpleText":"አማርኛ - 阿姆哈拉语"}},{"languageCode":"as","languageName":{"simpleText":"অসমীয়া - 阿萨姆语"}},{"languageCode":"az","languageName":{"simpleText":"آذربايجان ديلی - 阿塞拜疆语"}},{"languageCode":"ee","languageName":{"simpleText":"Èʋegbe - 埃维语"}},{"languageCode":"ay","languageName":{"simpleText":"Aymar aru - 艾马拉语"}},{"languageCode":"ga","languageName":{"simpleText":"Gaeilge - 爱尔兰语"}},{"languageCode":"et","languageName":{"simpleText":"Eesti - 爱沙尼亚语"}},{"languageCode":"or","languageName":{"simpleText":"ଓଡ଼ିଆ - 奥里亚语"}},{"languageCode":"om","languageName":{"simpleText":"Afaan Oromoo - 奥罗莫语"}},{"languageCode":"eu","languageName":{"simpleText":"Euskara - 巴斯克语"}},{"languageCode":"be","languageName":{"simpleText":"Беларуская - 白俄罗斯语"}},{"languageCode":"bg","languageName":{"simpleText":"Български - 保加利亚语"}},{"languageCode":"nso","languageName":{"simpleText":"Sesotho sa Leboa - 北索托语"}},{"languageCode":"is","languageName":{"simpleText":"Íslenska - 冰岛语"}},{"languageCode":"pl","languageName":{"simpleText":"Polski - 波兰语"}},{"languageCode":"bs","languageName":{"simpleText":"Bosanski - 波斯尼亚语"}},{"languageCode":"fa","languageName":{"simpleText":"فارسی - 波斯语"}},{"languageCode":"bho","languageName":{"simpleText":"भोजपुरी - 博杰普尔语"}},{"languageCode":"ts","languageName":{"simpleText":"Xitsonga - 聪加语"}},{"languageCode":"tt","languageName":{"simpleText":"Татарча - 鞑靼语"}},{"languageCode":"da","languageName":{"simpleText":"Dansk - 丹麦语"}},{"languageCode":"de","languageName":{"simpleText":"Deutsch - 德语"}},{"languageCode":"dv","languageName":{"simpleText":"ދިވެހިބަސް - 迪维希语"}},{"languageCode":"ru","languageName":{"simpleText":"Русский - 俄语"}},{"languageCode":"fr","languageName":{"simpleText":"français - 法语"}},{"languageCode":"sa","languageName":{"simpleText":"संस्कृतम् - 梵语"}},{"languageCode":"fil","languageName":{"simpleText":"Filipino - 菲律宾语"}},{"languageCode":"fi","languageName":{"simpleText":"suomi - 芬兰语"}},{"languageCode":"km","languageName":{"simpleText":"ភាសាខ្មែរ - 高棉语"}},{"languageCode":"ka","languageName":{"simpleText":"ქართული - 格鲁吉亚语"}},{"languageCode":"gu","languageName":{"simpleText":"ગુજરાતી - 古吉拉特语"}},{"languageCode":"gn","languageName":{"simpleText":"Avañe'ẽ - 瓜拉尼语"}},{"languageCode":"kk","languageName":{"simpleText":"Қазақ тілі - 哈萨克语"}},{"languageCode":"ht","languageName":{"simpleText":"Kreyòl ayisyen - 海地克里奥尔语"}},{"languageCode":"ko","languageName":{"simpleText":"한국어 - 韩语"}},{"languageCode":"ha","languageName":{"simpleText":"هَوُسَ - 豪萨语"}},{"languageCode":"nl","languageName":{"simpleText":"Nederlands - 荷兰语"}},{"languageCode":"gl","languageName":{"simpleText":"Galego - 加利西亚语"}},{"languageCode":"ca","languageName":{"simpleText":"català - 加泰罗尼亚语"}},{"languageCode":"cs","languageName":{"simpleText":"čeština - 捷克语"}},{"languageCode":"kn","languageName":{"simpleText":"ಕನ್ನಡ - 卡纳达语"}},{"languageCode":"ky","languageName":{"simpleText":"кыргыз тили - 吉尔吉斯语"}},{"languageCode":"xh","languageName":{"simpleText":"isiXhosa - 科萨语"}},{"languageCode":"co","languageName":{"simpleText":"corsu - 科西嘉语"}},{"languageCode":"hr","languageName":{"simpleText":"hrvatski - 克罗地亚语"}},{"languageCode":"qu","languageName":{"simpleText":"Runa Simi - 克丘亚语"}},{"languageCode":"ku","languageName":{"simpleText":"Kurdî - 库尔德语"}},{"languageCode":"la","languageName":{"simpleText":"lingua latīna - 拉丁语"}},{"languageCode":"lv","languageName":{"simpleText":"latviešu valoda - 拉脱维亚语"}},{"languageCode":"lo","languageName":{"simpleText":"ພາສາລາວ - 老挝语"}},{"languageCode":"lt","languageName":{"simpleText":"lietuvių kalba - 立陶宛语"}},{"languageCode":"ln","languageName":{"simpleText":"lingála - 林加拉语"}},{"languageCode":"lg","languageName":{"simpleText":"Luganda - 卢干达语"}},{"languageCode":"lb","languageName":{"simpleText":"Lëtzebuergesch - 卢森堡语"}},{"languageCode":"rw","languageName":{"simpleText":"Kinyarwanda - 卢旺达语"}},{"languageCode":"ro","languageName":{"simpleText":"Română - 罗马尼亚语"}},{"languageCode":"mt","languageName":{"simpleText":"Malti - 马耳他语"}},{"languageCode":"mr","languageName":{"simpleText":"मराठी - 马拉地语"}},{"languageCode":"mg","languageName":{"simpleText":"Malagasy - 马拉加斯语"}},{"languageCode":"ml","languageName":{"simpleText":"മലയാളം - 马拉雅拉姆语"}},{"languageCode":"ms","languageName":{"simpleText":"bahasa Melayu - 马来语"}},{"languageCode":"mk","languageName":{"simpleText":"македонски јазик - 马其顿语"}},{"languageCode":"mi","languageName":{"simpleText":"te reo Māori - 毛利语"}},{"languageCode":"mn","languageName":{"simpleText":"Монгол хэл - 蒙古语"}},{"languageCode":"bn","languageName":{"simpleText":"বাংলা - 孟加拉语"}},{"languageCode":"my","languageName":{"simpleText":"ဗမာစာ - 缅甸语"}},{"languageCode":"hmn","languageName":{"simpleText":"Hmoob - 苗语"}},{"languageCode":"af","languageName":{"simpleText":"Afrikaans - 南非荷兰语"}},{"languageCode":"st","languageName":{"simpleText":"Sesotho - 南索托语"}},{"languageCode":"ne","languageName":{"simpleText":"नेपाली - 尼泊尔语"}},{"languageCode":"no","languageName":{"simpleText":"Norsk - 挪威语"}},{"languageCode":"pa","languageName":{"simpleText":"ਪੰਜਾਬੀ - 旁遮普语"}},{"languageCode":"pt","languageName":{"simpleText":"Português - 葡萄牙语"}},{"languageCode":"ps","languageName":{"simpleText":"پښتو - 普什图语"}},{"languageCode":"ny","languageName":{"simpleText":"chiCheŵa - 齐切瓦语"}},{"languageCode":"ja","languageName":{"simpleText":"日本語 - 日语"}},{"languageCode":"sv","languageName":{"simpleText":"Svenska - 瑞典语"}},{"languageCode":"sm","languageName":{"simpleText":"Gagana fa'a Samoa - 萨摩亚语"}},{"languageCode":"sr","languageName":{"simpleText":"Српски језик - 塞尔维亚语"}},{"languageCode":"si","languageName":{"simpleText":"සිංහල - 僧伽罗语"}},{"languageCode":"sn","languageName":{"simpleText":"ChiShona - 绍纳语"}},{"languageCode":"eo","languageName":{"simpleText":"Esperanto - 世界语"}},{"languageCode":"sk","languageName":{"simpleText":"slovenčina - 斯洛伐克语"}},{"languageCode":"sl","languageName":{"simpleText":"slovenščina - 斯洛文尼亚语"}},{"languageCode":"sw","languageName":{"simpleText":"Kiswahili - 斯瓦希里语"}},{"languageCode":"gd","languageName":{"simpleText":"Gàidhlig - 苏格兰盖尔语"}},{"languageCode":"ceb","languageName":{"simpleText":"Binisaya - 宿务语"}},{"languageCode":"so","languageName":{"simpleText":"Soomaaliga - 索马里语"}},{"languageCode":"tg","languageName":{"simpleText":"тоҷикӣ - 塔吉克语"}},{"languageCode":"te","languageName":{"simpleText":"తెలుగు - 泰卢固语"}},{"languageCode":"ta","languageName":{"simpleText":"தமிழ் - 泰米尔语"}},{"languageCode":"th","languageName":{"simpleText":"ไทย - 泰语"}},{"languageCode":"ti","languageName":{"simpleText":"ትግርኛ - 提格利尼亚语"}},{"languageCode":"tr","languageName":{"simpleText":"Türkçe - 土耳其语"}},{"languageCode":"tk","languageName":{"simpleText":"Türkmen - 土库曼语"}},{"languageCode":"cy","languageName":{"simpleText":"Cymraeg - 威尔士语"}},{"languageCode":"ug","languageName":{"simpleText":"ئۇيغۇرچە - 维吾尔语"}},{"languageCode":"und","languageName":{"simpleText":"Unknown - 未知语言"}},{"languageCode":"ur","languageName":{"simpleText":"اردو - 乌尔都语"}},{"languageCode":"uk","languageName":{"simpleText":"українська - 乌克兰语"}},{"languageCode":"uz","languageName":{"simpleText":"O'zbek - 乌兹别克语"}},{"languageCode":"es","languageName":{"simpleText":"Español - 西班牙语"}},{"languageCode":"fy","languageName":{"simpleText":"Frysk - 西弗里西亚语"}},{"languageCode":"iw","languageName":{"simpleText":"עברית - 希伯来语"}},{"languageCode":"el","languageName":{"simpleText":"Ελληνικά - 希腊语"}},{"languageCode":"haw","languageName":{"simpleText":"ʻŌlelo Hawaiʻi - 夏威夷语"}},{"languageCode":"sd","languageName":{"simpleText":"سنڌي - 信德语"}},{"languageCode":"hu","languageName":{"simpleText":"magyar - 匈牙利语"}},{"languageCode":"su","languageName":{"simpleText":"Basa Sunda - 巽他语"}},{"languageCode":"hy","languageName":{"simpleText":"հայերեն - 亚美尼亚语"}},{"languageCode":"ig","languageName":{"simpleText":"Igbo - 伊博语"}},{"languageCode":"it","languageName":{"simpleText":"Italiano - 意大利语"}},{"languageCode":"yi","languageName":{"simpleText":"ייִדיש - 意第绪语"}},{"languageCode":"hi","languageName":{"simpleText":"हिन्दी - 印地语"}},{"languageCode":"id","languageName":{"simpleText":"Bahasa Indonesia - 印度尼西亚语"}},{"languageCode":"en","languageName":{"simpleText":"English - 英语"}},{"languageCode":"yo","languageName":{"simpleText":"Yorùbá - 约鲁巴语"}},{"languageCode":"vi","languageName":{"simpleText":"Tiếng Việt - 越南语"}},{"languageCode":"jv","languageName":{"simpleText":"Basa Jawa - 爪哇语"}},{"languageCode":"zh-Hant","languageName":{"simpleText":"中文（繁體）- 中文（繁体）"}},{"languageCode":"zh-Hans","languageName":{"simpleText":"中文（简体）"}},{"languageCode":"zu","languageName":{"simpleText":"isiZulu - 祖鲁语"}},{"languageCode":"kri","languageName":{"simpleText":"Krìì - 克里语"}}],
				"MOBILE":[{"languageCode":"sq","languageName":{"runs":[{"text":"Shqip - 阿尔巴尼亚语"}]}},{"languageCode":"ak","languageName":{"runs":[{"text":"Ákán - 阿肯语"}]}},{"languageCode":"ar","languageName":{"runs":[{"text":"العربية - 阿拉伯语"}]}},{"languageCode":"am","languageName":{"runs":[{"text":"አማርኛ - 阿姆哈拉语"}]}},{"languageCode":"as","languageName":{"runs":[{"text":"অসমীয়া - 阿萨姆语"}]}},{"languageCode":"az","languageName":{"runs":[{"text":"Azərbaycanca - 阿塞拜疆语"}]}},{"languageCode":"ee","languageName":{"runs":[{"text":"Eʋegbe - 埃维语"}]}},{"languageCode":"ay","languageName":{"runs":[{"text":"Aymar - 艾马拉语"}]}},{"languageCode":"ga","languageName":{"runs":[{"text":"Gaeilge - 爱尔兰语"}]}},{"languageCode":"et","languageName":{"runs":[{"text":"Eesti - 爱沙尼亚语"}]}},{"languageCode":"or","languageName":{"runs":[{"text":"ଓଡ଼ିଆ - 奥里亚语"}]}},{"languageCode":"om","languageName":{"runs":[{"text":"Oromoo - 奥罗莫语"}]}},{"languageCode":"eu","languageName":{"runs":[{"text":"Euskara - 巴斯克语"}]}},{"languageCode":"be","languageName":{"runs":[{"text":"Беларуская - 白俄罗斯语"}]}},{"languageCode":"bg","languageName":{"runs":[{"text":"Български - 保加利亚语"}]}},{"languageCode":"nso","languageName":{"runs":[{"text":"Sesotho sa Leboa - 北索托语"}]}},{"languageCode":"is","languageName":{"runs":[{"text":"Íslenska - 冰岛语"}]}},{"languageCode":"pl","languageName":{"runs":[{"text":"Polski - 波兰语"}]}},{"languageCode":"bs","languageName":{"runs":[{"text":"Bosanski - 波斯尼亚语"}]}},{"languageCode":"fa","languageName":{"runs":[{"text":"فارسی - 波斯语"}]}},{"languageCode":"bho","languageName":{"runs":[{"text":"भोजपुरी - 博杰普尔语"}]}},{"languageCode":"ts","languageName":{"runs":[{"text":"Xitsonga - 聪加语"}]}},{"languageCode":"tt","languageName":{"runs":[{"text":"Татарча - 鞑靼语"}]}},{"languageCode":"da","languageName":{"runs":[{"text":"Dansk - 丹麦语"}]}},{"languageCode":"de","languageName":{"runs":[{"text":"Deutsch - 德语"}]}},{"languageCode":"dv","languageName":{"runs":[{"text":"ދިވެހިބަސް - 迪维希语"}]}},{"languageCode":"ru","languageName":{"runs":[{"text":"Русский - 俄语"}]}},{"languageCode":"fr","languageName":{"runs":[{"text":"Français - 法语"}]}},{"languageCode":"sa","languageName":{"runs":[{"text":"संस्कृतम् - 梵语"}]}},{"languageCode":"fil","languageName":{"runs":[{"text":"Filipino - 菲律宾语"}]}},{"languageCode":"fi","languageName":{"runs":[{"text":"Suomi - 芬兰语"}]}},{"languageCode":"km","languageName":{"runs":[{"text":"ភាសាខ្មែរ - 高棉语"}]}},{"languageCode":"ka","languageName":{"runs":[{"text":"ქართული - 格鲁吉亚语"}]}},{"languageCode":"gu","languageName":{"runs":[{"text":"ગુજરાતી - 古吉拉特语"}]}},{"languageCode":"gn","languageName":{"runs":[{"text":"Avañe'ẽ - 瓜拉尼语"}]}},{"languageCode":"kk","languageName":{"runs":[{"text":"Қазақ тілі - 哈萨克语"}]}},{"languageCode":"ht","languageName":{"runs":[{"text":"海地克里奥尔语"}]}},{"languageCode":"ko","languageName":{"runs":[{"text":"한국말 - 韩语"}]}},{"languageCode":"ha","languageName":{"runs":[{"text":"هَوُسَ - 豪萨语"}]}},{"languageCode":"nl","languageName":{"runs":[{"text":"Nederlands - 荷兰语"}]}},{"languageCode":"gl","languageName":{"runs":[{"text":"Galego - 加利西亚语"}]}},{"languageCode":"ca","languageName":{"runs":[{"text":"Català - 加泰罗尼亚语"}]}},{"languageCode":"cs","languageName":{"runs":[{"text":"Čeština - 捷克语"}]}},{"languageCode":"kn","languageName":{"runs":[{"text":"ಕನ್ನಡ - 卡纳达语"}]}},{"languageCode":"ky","languageName":{"runs":[{"text":"Кыргызча - 吉尔吉斯语"}]}},{"languageCode":"xh","languageName":{"runs":[{"text":"isiXhosa - 科萨语"}]}},{"languageCode":"co","languageName":{"runs":[{"text":"Corsu - 科西嘉语"}]}},{"languageCode":"hr","languageName":{"runs":[{"text":"Hrvatski - 克罗地亚语"}]}},{"languageCode":"qu","languageName":{"runs":[{"text":"Runa Simi - 克丘亚语"}]}},{"languageCode":"ku","languageName":{"runs":[{"text":"Kurdî - 库尔德语"}]}},{"languageCode":"la","languageName":{"runs":[{"text":"lingua latīna - 拉丁语"}]}},{"languageCode":"lv","languageName":{"runs":[{"text":"Latviešu - 拉脱维亚语"}]}},{"languageCode":"lo","languageName":{"runs":[{"text":"ລາວ - 老挝语"}]}},{"languageCode":"lt","languageName":{"runs":[{"text":"Lietuvių - 立陶宛语"}]}},{"languageCode":"ln","languageName":{"runs":[{"text":"Lingála - 林加拉语"}]}},{"languageCode":"lg","languageName":{"runs":[{"text":"Luganda - 卢干达语"}]}},{"languageCode":"lb","languageName":{"runs":[{"text":"Lëtzebuergesch - 卢森堡语"}]}},{"languageCode":"rw","languageName":{"runs":[{"text":"Kinyarwanda - 卢旺达语"}]}},{"languageCode":"ro","languageName":{"runs":[{"text":"Română - 罗马尼亚语"}]}},{"languageCode":"mt","languageName":{"runs":[{"text":"Malti - 马耳他语"}]}},{"languageCode":"mr","languageName":{"runs":[{"text":"मराठी - 马拉地语"}]}},{"languageCode":"mg","languageName":{"runs":[{"text":"Malagasy - 马拉加斯语"}]}},{"languageCode":"ml","languageName":{"runs":[{"text":"മലയാളം - 马拉雅拉姆语"}]}},{"languageCode":"ms","languageName":{"runs":[{"text":"Bahasa Melayu - 马来语"}]}},{"languageCode":"mk","languageName":{"runs":[{"text":"македонски - 马其顿语"}]}},{"languageCode":"mi","languageName":{"runs":[{"text":"Māori - 毛利语"}]}},{"languageCode":"mn","languageName":{"runs":[{"text":"Монгол - 蒙古语"}]}},{"languageCode":"bn","languageName":{"runs":[{"text":"বাংলা - 孟加拉语"}]}},{"languageCode":"my","languageName":{"runs":[{"text":"ဗမာစာ - 缅甸语"}]}},{"languageCode":"hmn","languageName":{"runs":[{"text":"Hmoob - 苗语"}]}},{"languageCode":"af","languageName":{"runs":[{"text":"Afrikaans - 南非荷兰语"}]}},{"languageCode":"st","languageName":{"runs":[{"text":"Sesotho - 南索托语"}]}},{"languageCode":"ne","languageName":{"runs":[{"text":"नेपाली - 尼泊尔语"}]}},{"languageCode":"no","languageName":{"runs":[{"text":"Norsk - 挪威语"}]}},{"languageCode":"pa","languageName":{"runs":[{"text":"ਪੰਜਾਬੀ - 旁遮普语"}]}},{"languageCode":"pt","languageName":{"runs":[{"text":"Português - 葡萄牙语"}]}},{"languageCode":"ps","languageName":{"runs":[{"text":"پښتو - 普什图语"}]}},{"languageCode":"ny","languageName":{"runs":[{"text":"chiCheŵa - 齐切瓦语"}]}},{"languageCode":"ja","languageName":{"runs":[{"text":"日本語 - 日语"}]}},{"languageCode":"sv","languageName":{"runs":[{"text":"Svenska - 瑞典语"}]}},{"languageCode":"sm","languageName":{"runs":[{"text":"Gagana Samoa - 萨摩亚语"}]}},{"languageCode":"sr","languageName":{"runs":[{"text":"Српски језик - 塞尔维亚语"}]}},{"languageCode":"si","languageName":{"runs":[{"text":"සිංහල - 僧伽罗语"}]}},{"languageCode":"sn","languageName":{"runs":[{"text":"ChiShona - 绍纳语"}]}},{"languageCode":"eo","languageName":{"runs":[{"text":"Esperanto - 世界语"}]}},{"languageCode":"sk","languageName":{"runs":[{"text":"Slovenčina - 斯洛伐克语"}]}},{"languageCode":"sl","languageName":{"runs":[{"text":"Slovenščina - 斯洛文尼亚语"}]}},{"languageCode":"sw","languageName":{"runs":[{"text":"Kiswahili - 斯瓦希里语"}]}},{"languageCode":"gd","languageName":{"runs":[{"text":"Gàidhlig - 苏格兰盖尔语"}]}},{"languageCode":"ceb","languageName":{"runs":[{"text":"Cebuano - 宿务语"}]}},{"languageCode":"so","languageName":{"runs":[{"text":"Soomaaliga - 索马里语"}]}},{"languageCode":"tg","languageName":{"runs":[{"text":"тоҷикӣ - 塔吉克语"}]}},{"languageCode":"te","languageName":{"runs":[{"text":"తెలుగు - 泰卢固语"}]}},{"languageCode":"ta","languageName":{"runs":[{"text":"தமிழ் - 泰米尔语"}]}},{"languageCode":"th","languageName":{"runs":[{"text":"ไทย - 泰语"}]}},{"languageCode":"ti","languageName":{"runs":[{"text":"ትግርኛ - 提格利尼亚语"}]}},{"languageCode":"tr","languageName":{"runs":[{"text":"Türkçe - 土耳其语"}]}},{"languageCode":"tk","languageName":{"runs":[{"text":"Türkmen - 土库曼语"}]}},{"languageCode":"cy","languageName":{"runs":[{"text":"Cymraeg - 威尔士语"}]}},{"languageCode":"ug","languageName":{"runs":[{"text":"ئۇيغۇرچە - 维吾尔语"}]}},{"languageCode":"und","languageName":{"runs":[{"text":"Unknown - 未知语言"}]}},{"languageCode":"ur","languageName":{"runs":[{"text":"اردو - 乌尔都语"}]}},{"languageCode":"uk","languageName":{"runs":[{"text":"Українська - 乌克兰语"}]}},{"languageCode":"uz","languageName":{"runs":[{"text":"O‘zbek - 乌兹别克语"}]}},{"languageCode":"es","languageName":{"runs":[{"text":"Español - 西班牙语"}]}},{"languageCode":"fy","languageName":{"runs":[{"text":"Frysk - 西弗里西亚语"}]}},{"languageCode":"iw","languageName":{"runs":[{"text":"עברית - 希伯来语"}]}},{"languageCode":"el","languageName":{"runs":[{"text":"Ελληνικά - 希腊语"}]}},{"languageCode":"haw","languageName":{"runs":[{"text":"ʻŌlelo Hawaiʻi - 夏威夷语"}]}},{"languageCode":"sd","languageName":{"runs":[{"text":"سنڌي - 信德语"}]}},{"languageCode":"hu","languageName":{"runs":[{"text":"Magyar - 匈牙利语"}]}},{"languageCode":"su","languageName":{"runs":[{"text":"Basa Sunda - 巽他语"}]}},{"languageCode":"hy","languageName":{"runs":[{"text":"Հայերեն - 亚美尼亚语"}]}},{"languageCode":"ig","languageName":{"runs":[{"text":"Igbo - 伊博语"}]}},{"languageCode":"it","languageName":{"runs":[{"text":"Italiano - 意大利语"}]}},{"languageCode":"yi","languageName":{"runs":[{"text":"ייִדיש - 意第绪语"}]}},{"languageCode":"hi","languageName":{"runs":[{"text":"हिन्दी - 印地语"}]}},{"languageCode":"id","languageName":{"runs":[{"text":"Bahasa Indonesia - 印度尼西亚语"}]}},{"languageCode":"en","languageName":{"runs":[{"text":"English - 英语"}]}},{"languageCode":"yo","languageName":{"runs":[{"text":"Yorùbá - 约鲁巴语"}]}},{"languageCode":"vi","languageName":{"runs":[{"text":"Tiếng Việt - 越南语"}]}},{"languageCode":"jv","languageName":{"runs":[{"text":"Basa Jawa - 爪哇语"}]}},{"languageCode":"zh-Hant","languageName":{"runs":[{"text":"中文（繁體） - 中文（繁体）"}]}},{"languageCode":"zh-Hans","languageName":{"runs":[{"text":"中文（简体）"}]}},{"languageCode":"zu","languageName":{"runs":[{"text":"isiZulu - 祖鲁语"}]}},{"languageCode":"kri","languageName":{"runs":[{"text":"Krìì - 克里语"}]}}]
			}
		}
	},
	"Netflix": {
		"Configs": {
			"Languages":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"}
		}
	}
};

/***************** Processing *****************/
(async () => {
	const { Settings, Caches, Configs } = setENV("DualSubs", "Universal", DataBase);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings?.Switch) {
		case true:
		default:
			let url = URL.parse($request?.url);
			const METHOD = $request?.method, HOST = url?.host, PATH = url?.path, PATHs = PATH.split("/");
			// 解析格式
			const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];
			$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, `HOST: ${HOST}`, `PATH: ${PATH}`, `PATHs: ${PATHs}`, `FORMAT: ${FORMAT}`, "");
			// 创建空数据
			let body = {};
			// 获取平台
			const Platform = getPlatform(HOST);
			$.log(`⚠ ${$.name}`, `Platform: ${Platform}`, "");
			// 设置自定义参数
			const Type = url?.params?.subtype || url?.params?.dualsubs || Settings.Translate.Type, Languages = url?.params?.sublang || Settings.Languages;
			$.log(`🚧 ${$.name}, Type: ${Type}, Languages: ${Languages}`, "");
			// 获取字幕格式
			const Format = url.params?.fmt || url.params?.format || PATHs?.[PATHs?.length - 1]?.split(".")?.[1], Kind = url.params?.kind;
			$.log(`🚧 ${$.name}, Format: ${Format}, Kind: ${Kind}`, "");
			// 创建字幕请求队列
			let requests = [];
			// 处理类型
			switch (Type) {
				case "Official":
					$.log(`🚧 ${$.name}`, "官方字幕", "");
					// 设置字幕偏移参数
					//Settings.Offset = Settings.Official.Offset || 0;
					//Settings.Tolerance = Settings.Official.Tolerance || 1000;
					//Settings.Position = Settings.Official.Position || "Forward";
					// 获取字幕文件地址vtt缓存（map）
					const { subtitlesPlaylistURL } = getSubtitlesCache($request.url, Caches.Playlists.Subtitle, Settings.Languages);
					// 获取字幕播放列表m3u8缓存（map）
					const { masterPlaylistURL, subtitlesPlaylistIndex } = getPlaylistCache(subtitlesPlaylistURL, Caches.Playlists.Master, Settings.Languages);
					// 获取字幕文件地址vtt缓存（map）
					const { subtitlesURIArray0, subtitlesURIArray1 } = getSubtitlesArray(masterPlaylistURL, subtitlesPlaylistIndex, Caches.Playlists.Master, Caches.Playlists.Subtitle, Settings.Languages);
					// 获取官方字幕请求
					if (subtitlesURIArray1.length) {
						$.log(`🚧 ${$.name}, subtitlesURIArray1.length: ${subtitlesURIArray1.length}`, "");
						// 获取字幕文件名
						let fileName = PATHs?.[PATHs?.length - 1] || getSubtitlesFileName($request.url, Platform);
						$.log(`🚧 ${$.name}, fileName: ${fileName}`, "")
						// 构造请求队列
						requests = constructSubtitlesQueue($request, fileName, subtitlesURIArray0, subtitlesURIArray1);
					};
					break;
				case "Translate":
				default:
					$.log(`🚧 ${$.name}, 翻译字幕`, "");
					//Settings.Position = Settings.Translate.Position || "Forward";
					break;
				case "External":
					$.log(`🚧 ${$.name}, 外挂字幕`, "");
					//Settings.Offset = Settings.External.Offset || 0;
					//Settings.Tolerance = Settings.External.Tolerance || 1000;
					//Settings.Position = Settings.External.Position || "Forward";
					let request = {
						"url": Settings.External.URL,
						"headers": {
							"Accept": "*/*",
							"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1"
						}
					};
					requests.push(request);
					break;
			};
			// 创建第二字幕Object
			let SecondSub = {};
			// 格式判断
			switch (Format || FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				case "text/html":
				default:
					break;
				case "m3u8":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
					//body = M3U8.parse($response.body);
					//$.log(body);
					//$response.body = M3U8.stringify(PlayList);
				case "srv3":
				case "text/xml":
				case "application/xml":
					body = XML.parse($response.body);
					for await (let request of requests) {
						SecondSub = await $.http.get(request).then(response => response.body);
						SecondSub = XML.parse(SecondSub);
						body = CombineDualSubs(body, SecondSub, Format || FORMAT, Kind, Settings.Offset, Settings.Tolerance, [Settings.Position]);
					};
					$response.body = XML.stringify(body);
					break;
				case "text/plist":
				case "application/plist":
				case "application/x-plist":
					//body = await PLIST("plist2json", $request.body);
					//$.log(body);
					//$request.body = await PLIST("json2plist", body);
					break;
				case "vtt":
				case "webvtt":
				case "text/vtt":
				case "application/vtt":
					body = VTT.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					// 处理类型
					switch (Type) {
						case "Official":
							$.log(`🚧 ${$.name}`, "官方字幕", "");
							for await (let request of requests) {
								SecondSub = await $.http.get(request).then(response => response.body);
								SecondSub = VTT.parse(SecondSub);
								body = CombineDualSubs(body, SecondSub, Format || FORMAT, Kind, Settings.Official.Offset, Settings.Official.Tolerance, [Settings.Official.Position]);
							};
							break;
						case "Translate":
						default:
							$.log(`🚧 ${$.name}`, `翻译字幕`, "");
							switch (Settings?.Translate?.Method) {
								default:
								case "Part": // Part 逐段翻译
									let Full = await Promise.all(body.body.map(async item => item.text));
									let length = 127;
									switch (Settings.Translate.Type) {
										case "Google":
										case "GoogleCloud":
										default:
											length = 127;
											break;
										case "Azure":
											length = 99;
											break;
										case "DeepL":
											length = 49;
											break;
									};
									let Parts = await chunk(Full, length);
									Parts = await Promise.all(Parts.map(async Part => {
										return await retry(Translator, [Settings.Translate.Type, Settings.Languages[1], Settings.Languages[0], Part, Settings?.API, Configs.Languages], Settings?.Translate?.Times, Settings?.Translate?.Interval, Settings?.Translate?.Exponential); // 3, 100, true
									})).then(parts => parts.flat(Infinity));
									body.body = await Promise.all(body.body.map(async (item, i) => {
										item.text = await combineText(item.text, Parts[i], Settings?.Translate?.Position);
										return item
									}));
									break;
								case "Row": // Row 逐行翻译
									body.body = await Promise.all(body.body.map(async item => {
										let text2 = await retry(Translator, [Settings.Translate.Type, Settings.Languages[1], Settings.Languages[0], item.text, Settings?.API, Configs.Languages], Settings?.Translate?.Times, Settings?.Translate?.Interval, Settings?.Translate?.Exponential); // 3, 100, true
										item.text = await combineText(item.text, text2[0], Settings?.Translate?.Position);
										return item
									}));
									break;
							};
							break;
						case "External":
							$.log(`🚧 ${$.name}, 外挂字幕`, "");
							for await (let request of requests) {
								SecondSub = await $.http.get(request).then(response => response.body);
								SecondSub = VTT.parse(SecondSub);
								body = CombineDualSubs(body, SecondSub, Format || FORMAT, Kind, Settings.External.Offset, Settings.External.Tolerance, [Settings.External.Position]);
							};
							break;
					};
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					$response.body = VTT.stringify(body);
					break;
				case "json3":
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body);
					for await (let request of requests) {
						SecondSub = await $.http.get(request).then(response => response.body);
						SecondSub = JSON.parse(SecondSub);
						body = CombineDualSubs(body, SecondSub, Format || FORMAT, Kind, Settings.Offset, Settings.Tolerance, [Settings.Position]);
					};
					$response.body = JSON.stringify(body);
					break;
				case "application/x-protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "applecation/octet-stream":
					//$.log(`🚧 ${$.name}`, `$response.body: ${JSON.stringify($response.body)}`, "");
					//let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes) : $response.body;
					//$.log(`🚧 ${$.name}`, `isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					// 写入二进制数据
					//if ($.isQuanX()) $response.bodyBytes = rawBody
					//else $response.body = rawBody;
					break;
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		switch ($response) {
			default: { // 有回复数据，返回回复数据
				const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];
				$.log(`🎉 ${$.name}, finally`, `$response`, `FORMAT: ${FORMAT}`, "");
				//$.log(`🚧 ${$.name}, finally`, `$response: ${JSON.stringify($response)}`, "");
				if ($response?.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response?.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				if ($.isQuanX()) {
					switch (FORMAT) {
						case undefined: // 视为无body
							// 返回普通数据
							$.done({ headers: $response.headers });
							break;
						case "application/x-www-form-urlencoded":
						case "text/plain":
						case "text/html":
						case "srv3":
						case "text/xml":
						case "application/xml":
						case "text/plist":
						case "application/plist":
						case "application/x-plist":
						case "vtt":
						case "webvtt":
						case "text/vtt":
						case "application/vtt":
						case "json3":
						case "text/json":
						case "application/json":
						case "m3u8":
						case "application/x-mpegurl":
						case "application/vnd.apple.mpegurl":
						default:
							// 返回普通数据
							$.done({ headers: $response.headers, body: $response.body });
							break;
						case "application/x-protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "applecation/octet-stream":
							// 返回二进制数据
							//$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
							$.done({ headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
							break;
					};
				} else $.done($response);
				break;
			};
			case undefined: { // 无回复数据
				break;
			};
		};
	})

/***************** Function *****************/
function getPlatform(host) {
	$.log(`☑️ ${$.name}, Get Platform`, "");
	/***************** Platform *****************/
	let Platform = /\.apple\.com/i.test(host) ? "Apple"
		: /\.(dssott|starott)\.com/i.test(host) ? "Disney_Plus"
			: /\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i.test(host) ? "Prime_Video"
				: /prd\.media\.h264\.io/i.test(host) ? "Max"
					: /\.(api\.hbo|hbomaxcdn)\.com/i.test(host) ? "HBO_Max"
						: /\.(hulustream|huluim)\.com/i.test(host) ? "Hulu"
							: /\.(cbsaavideo|cbsivideo|cbs)\.com/i.test(host) ? "Paramount_Plus"
								: /dplus-ph-/i.test(host) ? "Discovery_Plus_Ph"
									: /\.peacocktv\.com/i.test(host) ? "Peacock_TV"
										: /\.uplynk\.com/i.test(host) ? "Discovery_Plus"
											: /\.fubo\.tv/i.test(host) ? "Fubo_TV"
												: /(\.youtube|youtubei\.googleapis)\.com/i.test(host) ? "YouTube"
													: /\.(netflix\.com|nflxvideo\.net)/i.test(host) ? "Netflix"
														: "Universal";
	$.log(`✅ ${$.name}, Get Platform`, `Platform: ${Platform}`, "");
	return Platform;
};

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} platform - Platform Name
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platform, database) {
	$.log(`☑️ ${$.name}, Set Environment Variables`, "");
	let { Settings, Caches, Configs } = getENV(name, platform, database);
	/***************** Settings *****************/
	traverseObject(Settings, (key, value) => {
		if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
		else if (typeof value === "string") {
			if (value?.includes(",")) value = value.split(","); // 字符串转数组
			else if (!isNaN(value)) value = parseInt(value, 10) // 字符串转数字
		};
		return value;
	});
	if (!Array.isArray(Settings?.Types)) Settings.Types = (Settings.Types) ? [Settings.Types] : []; // 只有一个选项时，无逗号分隔
	/*
	if (Array.isArray(Settings?.Types)) {
		if (!Settings?.API?.GoogleCloud?.Auth) Settings.Types = Settings.Types.filter(e => e !== "GoogleCloud"); // 移除不可用类型
		if (!Settings?.API?.Azure?.Auth) Settings.Types = Settings.Types.filter(e => e !== "Azure");
		if (!Settings?.API?.DeepL?.Auth) Settings.Types = Settings.Types.filter(e => e !== "DeepL");
	}
	*/
	$.log(`✅ ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//$.log(`✅ ${$.name}, Set Environment Variables`, `Caches: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	if (typeof Caches.Playlists !== "object" || Array.isArray(Caches.Playlists)) Caches.Playlists = {}; // 创建Playlists缓存
	Caches.Playlists.Master = new Map(JSON.parse(Caches?.Playlists?.Master || "[]")); // Strings转Array转Map
	Caches.Playlists.Subtitle = new Map(JSON.parse(Caches?.Playlists?.Subtitle || "[]")); // Strings转Array转Map
	if (typeof Caches?.Subtitles !== "object") Caches.Subtitles = new Map(JSON.parse(Caches?.Subtitles || "[]")); // Strings转Array转Map
	/***************** Configs *****************/
	return { Settings, Caches, Configs };

	function traverseObject(o,c){for(var t in o){var n=o[t];o[t]="object"==typeof n&&null!==n?traverseObject(n,c):c(t,n)}return o}

};

/**
 * Get Playlist Cache
 * @author VirgilClyne
 * @param {String} url - Request URL / Master Playlist URL
 * @param {Map} cache - Playlist Cache
 * @param {Array} languages - Languages
 * @return {Promise<Object>} { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex }
 */
function getPlaylistCache(url, cache, languages) {
	$.log(`☑️ ${$.name}, getPlaylistCache`, "");
	let masterPlaylistURL = "";
	let subtitlesPlaylist = {};
	let subtitlesPlaylistIndex = 0;
	cache?.forEach((Value, Key) => {
		languages?.forEach(language => {
			let Array = Value?.[language];
			if (Array?.some((Object, Index) => {
				if (url.includes(Object?.URI || Object?.OPTION?.URI || null)) {
					subtitlesPlaylistIndex = Index;
					$.log(`🚧 ${$.name}, getPlaylistCache`, `subtitlesPlaylistIndex: ${subtitlesPlaylistIndex}`, "");
					return true;
				} else return false;
			})) {
				masterPlaylistURL = Key;
				subtitlesPlaylist = Value;
				//$.log(`🚧 ${$.name}, getPlaylistCache`, `masterPlaylistURL: ${masterPlaylistURL}`, `subtitlesPlaylist: ${JSON.stringify(subtitlesPlaylist)}`, "");
			};
		});
	});
	$.log(`✅ ${$.name}, getPlaylistCache`, `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`, "");
	return { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex };
};

/**
 * Get Subtitles Cache
 * @author VirgilClyne
 * @param {String} url - Request URL / Subtitles URL
 * @param {Map} cache - Subtitles Cache
 * @param {Array} languages - Languages
 * @return {Promise<Object>} { subtitlesPlaylistURL, subtitles, subtitlesIndex }
 */
function getSubtitlesCache(url, cache, languages) {
	$.log(`☑️ ${$.name}, getSubtitlesCache`, "");
	let subtitlesPlaylistURL = "";
	let subtitles = [];
	let subtitlesIndex = 0;
	cache?.forEach((Value, Key) => {
		if (Value?.some((String, Index) => {
			if (url.includes(String || null)) {
				subtitlesIndex = Index;
				$.log(`🚧 ${$.name}, getSubtitlesCache`, `subtitlesIndex: ${subtitlesIndex}`, "");
				return true;
			} else return false;
		})) {
			subtitlesPlaylistURL = Key;
			subtitles = Value;
			//$.log(`🚧 ${$.name}, getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
		};
	});
	$.log(`✅ ${$.name}, getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
	return { subtitlesPlaylistURL, subtitles, subtitlesIndex };
};

/**
 * Get Subtitles Array
 * @author VirgilClyne
 * @param {String} url - Request URL / Master Playlist URL
 * @param {Number} index - Subtitles Playlist Index
 * @param {Map} playlistsCache - Playlists Cache
 * @param {Map} subtitlesCache - Subtitles Cache
 * @param {Array} languages - Languages
 * @return {Promise<Object>} { subtitlesURIArray0, subtitlesURIArray1 }
 */
function getSubtitlesArray(url, index, playlistsCache, subtitlesCache, languages) {
	$.log(`☑️ ${$.name}, getSubtitlesArray`, "");
	const subtitlesPlaylistValue = playlistsCache?.get(url) || {};
	let subtitlesPlaylistURL0 = subtitlesPlaylistValue?.[languages[0]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[0]]?.[0]?.URL;
	let subtitlesPlaylistURL1 = subtitlesPlaylistValue?.[languages[1]]?.[index]?.URL || subtitlesPlaylistValue?.[languages[1]]?.[0]?.URL;
	$.log(`🚧 ${$.name}, getSubtitlesArray`, `subtitlesPlaylistURL0: ${subtitlesPlaylistURL0}, subtitlesPlaylistURL1: ${subtitlesPlaylistURL1}`, "");
	// 查找字幕文件地址vtt缓存（map）
	let subtitlesURIArray0 = subtitlesCache.get(subtitlesPlaylistURL0) || [];
	let subtitlesURIArray1 = subtitlesCache.get(subtitlesPlaylistURL1) || [];
	//$.log(`🚧 ${$.name}, getSubtitlesArray`, `subtitlesURIArray0: ${JSON.stringify(subtitlesURIArray0)}, subtitlesURIArray1: ${JSON.stringify(subtitlesURIArray1)}`, "");
	$.log(`✅ ${$.name}, getSubtitlesArray`, "");
	return { subtitlesURIArray0, subtitlesURIArray1 };
};

/**
 * Set Cache
 * @author VirgilClyne
 * @param {Map} cache - Playlists Cache / Subtitles Cache
 * @param {Number} cacheSize - Cache Size
 * @return {Boolean} isSaved
 */
function setCache(cache, cacheSize = 100) {
	$.log(`☑️ ${$.name}, Set Cache, cacheSize: ${cacheSize}`, "");
	cache = Array.from(cache || []); // Map转Array
	cache = cache.slice(-cacheSize); // 限制缓存大小
	$.log(`✅ ${$.name}, Set Cache`, "");
	return cache;
};

/**
 * Get Subtitles FileName
 * @author VirgilClyne
 * @param {String} url - Request URL / Subtitles URL
 * @param {String} platform - Platform Name
 * @return {String<*>} fileName
 */
function getSubtitlesFileName(url, platform) {
	$.log(`☑️ ${$.name}, Get Subtitles FileName`, `url: ${url}`, "");
	let fileName = undefined;
	switch (platform) {
		case "Apple":
			fileName = request.url.match(/.+_(subtitles(_V\d)?-\d+\.webvtt)(\?.*dualsubs=\w+)$/)[1]; // Apple 片段分型序号不同
			break;
		case "Disney_Plus":
			fileName = request.url.match(/([^\/]+\.vtt)(\?.*dualsubs=\w+)$/)[1]; // Disney+ 片段名称相同
			break;
		case "Hulu":
			fileName = request.url.match(/.+_(SEGMENT\d+_.+\.vtt)(\?.*dualsubs=\w+)$/)[1]; // Hulu 片段分型序号相同
			break;
		case "Prime_Video":
		case "HBO_Max":
		default:
			fileName = null; // Amazon Prime Video HBO_Max不拆分字幕片段
			break;
	};
	$.log(`✅ ${$.name}, Get Subtitles FileName`, `fileName: ${fileName}`, "");
	return fileName;
};

/**
 * Construct Subtitles Queue
 * @author VirgilClyne
 * @param {String} fileName - Request URL
 * @param {Array} VTTs0 - First Language Subtitles Array
 * @param {Array} VTTs1 - Second Language Subtitles Array
 * @return {Array<*>} Subtitles Requests Queue
 */
function constructSubtitlesQueue(request, fileName, VTTs0 = [], VTTs1 = []) {
	$.log(`☑️ ${$.name}, Construct Subtitles Queue`, `fileName: ${fileName}`, "");
	let requests = [];
	$.log(`🚧 ${$.name}, Construct Subtitles Queue, VTTs0.length: ${VTTs0.length}, VTTs1.length: ${VTTs1.length}`, "")
	switch (VTTs1.length) {
		case 0: // 长度为0，无须计算
			break;
		case 1: // 长度为1，无须计算
			let _request = {
				"url": VTTs1[0],
				"headers": request.headers
			};
			requests.push(_request);
			break;
		case VTTs0.length: { // 长度相等，一一对应，无须计算
			//request.url = VTTs1.find(item => item?.includes(fileName)) || VTTs1[0];
			let Index1 = VTTs1.findIndex(item => item?.includes(fileName));
			$.log(`🚧 ${$.name}, Construct Subtitles Queue`, `Index1: ${Index1}`, "");
			let _request = {
				"url": VTTs1[Index1],
				"headers": request.headers
			};
			requests.push(_request);
			break;
		};
		default: { // 长度不等，需要计算
			$.log(`⚠ ${$.name}, Construct Subtitles Queue, 长度不等，需要计算`, "")
			// 查询当前字幕在原字幕队列中的位置
			let Index0 = VTTs0.findIndex(item => item?.includes(fileName));
			$.log(`🚧 ${$.name}, Construct Subtitles Queue`, `Index0: ${Index0}`, "")
			// 计算当前字幕在原字幕队列中的百分比
			let Position0 = Index0 / VTTs0.length;
			$.log(`🚧 ${$.name}, Construct Subtitles Queue`, `Position0: ${Position0}`, "");
			// 根据百分比计算当前字幕在新字幕队列中的位置
			//let Index1 = VTTs1.findIndex(item => item.includes(fileName));
			let Index1 = Math.round(Position0 * VTTs1.length);
			$.log(`🚧 ${$.name}, Construct Subtitles Queue`, `Index1: ${Index1}`, "");
			// 获取当前字幕在新字幕队列中的前后4个字幕
			nearlyVTTs = VTTs1.slice((Index1 - 2 < 0) ? 0 : Index1 - 2, Index1 + 2);
			requests = nearlyVTTs.map(url => {
				let _request = {
					"url": url,
					"headers": request.headers
				};
				return _request;
			});
			break;
		};
	};
	//$.log(`🚧 ${$.name}, Construct Subtitles Queue`, `requests: ${JSON.stringify(requests)}`, "");
	$.log(`✅ ${$.name}, Construct Subtitles Queue`, "");
	return requests;
};

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
 * @param {Object} api - API
 * @param {Object} database - Languages Database
 * @return {Promise<*>}
 */
async function Translator(type = "Google", source = "", target = "", text = "", api = {}, database) {
	$.log(`☑️ ${$.name}, Translator`, `orig: ${text}`, "");
	// 构造请求
	let request = await GetRequest(type, source, target, text, database);
	// 发送请求
	let trans = await GetData(type, request);
	$.log(`🚧 ${$.name}, Translator`, `trans: ${trans}`, "");
	return trans
	/***************** Fuctions *****************/
	// Get Translate Request
	async function GetRequest(type = "", source = "", target = "", text = "", database) {
		$.log(`☑️ ${$.name}, Get Translate Request`, "");
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
				request.url = request.url + `&sl=${database.Google[source]}&tl=${database.Google[target]}&q=${encodeURIComponent(text)}`;
				break;
			case "GoogleCloud":
				request.url = `https://translation.googleapis.com/language/translate/v2/?key=${api.GoogleCloud?.Auth}`;
				request.headers = {
					//"Authorization": `Bearer ${api.GoogleCloud?.Auth}`,
					"User-Agent": "DualSubs",
					"Content-Type": "application/json; charset=utf-8"
				};
				request.body = JSON.stringify({
					"q": text,
					"source": database.Google[source],
					"target": database.Google[target],
					"format": "html",
					//"key": api.GoogleCloud?.Key
				});
				break;
			case "Bing":
				// https://github.com/Animenosekai/translate/blob/main/translatepy/translators/bing.py
				BaseURL = (api.Bing?.Version == "Bing") ? "https://www.bing.com/ttranslatev3?IG=839D27F8277F4AA3B0EDB83C255D0D70&IID=translator.5033.3"
					: (api.Azure?.Version == "BingCN") ? "https://cn.bing.com/ttranslatev3?IG=25FEE7A7C7C14533BBFD66AC5125C49E&IID=translator.5025.1"
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
					//"from": database.Microsoft[source],
					"to": database.Microsoft[target]
				});
				break;
			case "Azure":
				// https://docs.microsoft.com/zh-cn/azure/cognitive-services/translator/
				// https://docs.azure.cn/zh-cn/cognitive-services/translator/
				BaseURL = (api.Azure?.Version == "Azure") ? "https://api.cognitive.microsofttranslator.com"
					: (api.Azure?.Version == "AzureCN") ? "https://api.translator.azure.cn"
						: "https://api.cognitive.microsofttranslator.com"
				request.url = `${BaseURL}/translate?api-version=3.0&textType=html&to=${database.Microsoft[target]}&from=${database.Microsoft[source]}`;
				request.headers = {
					"Content-Type": "application/json; charset=UTF-8",
					"Accept": "application/json, text/javascript, */*; q=0.01",
					"Accept-Language": "zh-hans"
					//"Authorization": `Bearer ${api.Azure?.Auth}`,
					//"Ocp-Apim-Subscription-Key": api.Azure?.Auth,
					//"Ocp-Apim-Subscription-Region": api.Azure?.Region, // chinanorth, chinaeast2
					//"X-ClientTraceId": uuidv4().toString()
				};
				if (api.Azure?.Region) request.headers["Ocp-Apim-Subscription-Region"] = api.Azure.Region;
				if (api?.Azure?.Mode == "Key") request.headers["Ocp-Apim-Subscription-Key"] = api.Azure.Auth;
				else if (api?.Azure?.Mode == "Token") request.headers.Authorization = `Bearer ${api.Azure.Auth}`;
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
				BaseURL = (api.DeepL.Version == "Free") ? "https://api-free.deepl.com"
					: (api.DeepL.Version == "Pro") ? "https://api.deepl.com"
						: "https://api-free.deepl.com"
				request.url = `${BaseURL}/v2/translate`
				request.headers = {
					"Accept": "*/*",
					"User-Agent": "DualSubs",
					"Content-Type": "application/x-www-form-urlencoded"
				};
				const source_lang = (database.DeepL[source].includes("EN")) ? "EN"
					: (database.DeepL[source].includes("PT")) ? "PT"
						: database.DeepL[source];
				const target_lang = (database.DeepL[target] == "EN") ? "EN-US"
					: (database.DeepL[target] == "PT") ? "PT-PT"
						: database.DeepL[target];
				const BaseBody = `auth_key=${api.DeepL?.Auth}&source_lang=${source_lang}&target_lang=${target_lang}&tag_handling=html`;
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
					"from": database.Baidu[source],
					"to": database.Baidu[target],
					"appid": api.BaiduFanyi?.Key,
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
					"from": database.Youdao[source],
					"to": database.Youdao[target],
					"appKey": api.YoudaoAI?.Key,
					"salt": uuidv4().toString(),
					"signType": "v3",
					"sign": "",
					"curtime": Math.floor(+new Date() / 1000)
				};
				break;
		}
		//$.log(`✅ ${$.name}, Get Translate Request`, `request: ${JSON.stringify(request)}`, "");
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
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Array} Format - options = ["json", "srv3", "vtt"]
 * @param {Array} Kind - options = ["asr", "captions"]
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} Options - options = ["Forward", "Reverse", "ShowOnly"]
 * @return {String} DualSub
 */
function CombineDualSubs(Sub1 = {}, Sub2 = {}, Format = "srv3", Kind = "captions", Offset = 0, Tolerance = 0, Options = ["Forward"]) {
	$.log(`⚠ ${$.name}, Combine Dual Subtitles`, `Offset:${Offset}, Tolerance:${Tolerance}, Options:${Options}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	let DualSub = Options.includes("Reverse") ? Sub2 : Sub1
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`let DualSub内容: ${JSON.stringify(DualSub)}`, "");
	// 有序数列 用不着排序
	//FirstSub.body.sort((x, y) => x - y);
	//SecondSub.body.sort((x, y) => x - y);
	let index0 = 0, index1 = 0, index2 = 0;
	// 双指针法查找两个数组中的相同元素
	switch (Format) {
		case "json3":
		case "text/json":
		case "application/json": {
			const length1 = Sub1?.events?.length, length2 = Sub2?.events?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					$.log(`🚧`, `DualSub是自动生成字幕`, "");
					index0 = 1, index1 = 1, index2 = 1;
					Sub1.events = Sub1.events.map(event => {
						if (event?.segs) {
							if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join(" ") }];
						};
						delete event.wWinId;
						return event;
					});
					Sub2.events = Sub2.events.map(event => {
						if (event?.segs) {
							if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join(" ") }];
						};
						delete event.wWinId;
						return event;
					});
					//break; 不要break，连续处理
				case "captions":
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
						//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							index0 = Options.includes("Reverse") ? index2 : index1;
							// 处理普通字幕
							const text1 = Sub1.events[index1]?.segs?.[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs?.[0].utf8 ?? "";
							//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
							DualSub.events[index0].segs = [{ "utf8": Options.includes("Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}` }];
							//$.log(`🚧`, `DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
							//DualSub.body[index0].tStartMs = Options.includes("Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.body[index0].index = Options.includes("Reverse") ? index2 : index1;
						};
						if (timeStamp2 > timeStamp1) index1++
						else if (timeStamp2 < timeStamp1) index2++
						else { index1++; index2++ };
					};
					break;
			};
			break;
		};
		case "srv3":
		case "text/xml":
		case "application/xml": {
			const length1 = Sub1?.timedtext?.body?.p?.length, length2 = Sub2?.timedtext?.body?.p?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					$.log(`🚧`, `DualSub是自动生成字幕`, "");
					DualSub.timedtext.head.wp[1]["@rc"] = "1";
					Sub1.timedtext.body.p = Sub1.timedtext.body.p.map(para => {
						if (para?.s) {
							if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join(" ");
							else para["#"] = para.s?.["#"] ?? "";
							delete para.s;
						};
						return para;
					});
					Sub2.timedtext.body.p = Sub2.timedtext.body.p.map(para => {
						if (para?.s) {
							if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join(" ");
							else para["#"] = para.s?.["#"] ?? "";
							delete para.s;
						};
						return para;
					});
					//break; 不要break，连续处理
				case "captions":
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10), timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
						//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							index0 = Options.includes("Reverse") ? index2 : index1;
							// 处理普通字幕
							const text1 = Sub1.timedtext.body.p[index1]?.["#"] ?? "", text2 = Sub2.timedtext.body.p[index2]?.["#"] ?? "";
							//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
							DualSub.timedtext.body.p[index0]["#"] = Options.includes("Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`;
							//$.log(`🚧`, `DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
							//DualSub.timedtext.body.p[index0]["@t"] = Options.includes("Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.timedtext.body.p[index0].index = Options.includes("Reverse") ? index2 : index1;
						};
						if (timeStamp2 > timeStamp1) index1++
						else if (timeStamp2 < timeStamp1) index2++
						else { index1++; index2++ };
					};
					break;
			};
			break;
		};
		case "vtt":
		case "webvtt":
		case "text/vtt":
		case "application/vtt": {
			const length1 = Sub1?.body?.length, length2 = Sub2?.body?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					$.log(`🚧`, `DualSub是自动生成字幕`, "");
				case "captions":
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
						//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
						// 处理普通字幕
						const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
						//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							index0 = Options.includes("Reverse") ? index2 : index1;
							// 处理普通字幕
							DualSub.body[index0].text = Options.includes("Reverse") ? `${text2}\n${text1}` : Options.includes("ShowOnly") ? text2 : `${text1}\n${text2}`;
							//$.log(`🚧`, `index0: ${index0}`, `text: ${DualSub.body[index0].text}`, "");
							//DualSub.body[index0].timeStamp = Options.includes("Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.body[index0].index = Options.includes("Reverse") ? index2 : index1;
						};
						if (timeStamp2 > timeStamp1) index1++
						else if (timeStamp2 < timeStamp1) index2++
						else { index1++; index2++ }
					};
					break;
			};
			break;
		};
	};
	//$.log(`🎉 ${$.name}, Combine Dual Subtitles`, `return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	$.log(`🎉 ${$.name}, Combine Dual Subtitles`, "");
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
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t);break;case"Node.js":this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}

// https://github.com/DualSubs/URL/blob/main/URLs.embedded.min.js
function URLs(s){return new class{constructor(s=[]){this.name="URL v1.0.2",this.opts=s,this.json={scheme:"",host:"",path:"",params:{}}}parse(s){let t=s.match(/(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/)?.groups??null;return t?.path||(t.path=""),t?.params&&(t.params=Object.fromEntries(t.params.split("&").map((s=>s.split("="))))),t}stringify(s=this.json){return s?.params?s.scheme+"://"+s.host+"/"+s.path+"?"+Object.entries(s.params).map((s=>s.join("="))).join("&"):s.scheme+"://"+s.host+"/"+s.path}}(s)}

/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getENV(t,e,n){let i=$.getjson(t,n),s={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((t=>t.split("="))));for(let e in t)l(s,e,t[e])}let g={...n?.Default?.Settings,...n?.[e]?.Settings,...i?.[e]?.Settings,...s},f={...n?.Default?.Configs,...n?.[e]?.Configs,...i?.[e]?.Configs},o=i?.[e]?.Caches||{};return"string"==typeof o&&(o=JSON.parse(o)),{Settings:g,Caches:o,Configs:f};function l(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}

// https://github.com/DualSubs/WebVTT/blob/main/WebVTT.embedded.min.js
function WebVTT(e){return new class{constructor(e=["milliseconds","timeStamp","singleLine","\n"]){this.name="WebVTT v1.8.1",this.opts=e,this.newLine=this.opts.includes("\n")?"\n":this.opts.includes("\r")?"\r":this.opts.includes("\r\n")?"\r\n":"\n",this.vtt=new String,this.txt=new String,this.json={headers:{},CSS:{},body:[]}}parse(e=this.vtt){const t=this.opts.includes("milliseconds")?/^((?<srtNum>\d+)(\r\n|\r|\n))?(?<timeLine>(?<startTime>[0-9:.,]+) --> (?<endTime>[0-9:.,]+)) ?(?<options>.+)?[^](?<text>[\s\S]*)?$/:/^((?<srtNum>\d+)(\r\n|\r|\n))?(?<timeLine>(?<startTime>[0-9:]+)[0-9.,]+ --> (?<endTime>[0-9:]+)[0-9.,]+) ?(?<options>.+)?[^](?<text>[\s\S]*)?$/;let i={headers:e.match(/^(?<fileType>WEBVTT)?[^](?<Xoptions>.+[^])*/)?.groups??null,CSS:e.match(/^(?<Style>STYLE)[^](?<Boxes>.*::cue.*(\(.*\))?((\n|.)*}$)?)/m)?.groups??null,body:e.split(/\r\n\r\n|\r\r|\n\n/).map((e=>e.match(t)?.groups??""))};return i.body=i.body.filter(Boolean),i.body=i.body.map(((e,t)=>{if(e.index=t,"WEBVTT"!==i.headers?.fileType&&(e.timeLine=e.timeLine.replace(",","."),e.startTime=e.startTime.replace(",","."),e.endTime=e.endTime.replace(",",".")),this.opts.includes("timeStamp")){let t=e.startTime.replace(/(.*)/,"1970-01-01T$1Z");e.timeStamp=this.opts.includes("milliseconds")?Date.parse(t):Date.parse(t)/1e3}return e.text=e.text?.trim()??"_",this.opts.includes("singleLine")?e.text=e.text.replace(/\r\n|\r|\n/," "):this.opts.includes("multiLine")&&(e.text=e.text.split(/\r\n|\r|\n/)),e})),i}stringify(e=this.json){return[e.headers=[e.headers?.fileType||"WEBVTT",e.headers?.Xoptions||null].join(this.newLine),e.CSS=e.CSS?.Style?[e.CSS.Style,e.CSS.Boxes].join(this.newLine):null,e.body=e.body.map((e=>(Array.isArray(e.text)&&(e.text=e.text.join(this.newLine)),e=`${e.timeLine} ${e?.options??""}${this.newLine}${e.text}`))).join(this.newLine+this.newLine)].join(this.newLine+this.newLine)}}(e)}

// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/json2xml.js
// minify: https://www.digitalocean.com/community/tools/minify
function XMLs(r){return new class{constructor(r){this.name="XML v0.1.4",this.opts=r}parse(r=new String,t=""){const n={"&amp;":"&","&lt;":"<","&gt;":">","&apos;":"'","&quot;":'"'},e="@";let s=function r(t,n){if("string"==typeof t)return t;var s=t.r;if(s)return s;var u,o=function(r,t){if(!r.t)return;for(var n,s,u=r.t.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/),o=u.length,l=0;l<o;l++){var c=i(u[l]);if(c){n||(n={});var p=c.indexOf("=");if(p<0)c=e+c,s=null;else{s=c.substr(p+1).replace(/^\s+/,""),c=e+c.substr(0,p).replace(/\s+$/,"");var g=s[0];g!==s[s.length-1]||"'"!==g&&'"'!==g||(s=s.substr(1,s.length-2)),s=a(s)}t&&(s=t(c,s)),f(n,c,s)}}return n}(t,n),l=t.f,c=l.length;if(o||c>1)u=o||{},l.forEach((function(t){"string"==typeof t?f(u,"#",t):f(u,t.n,r(t,n))}));else if(c){var p=l[0];if(u=r(p,n),p.n){var g={};g[p.n]=u,u=g}}else u=t.c?null:"";n&&(u=n(t.n||"",u));return u}(function(r){for(var t=String.prototype.split.call(r,/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/),n=t.length,e={f:[]},s=e,f=[],u=0;u<n;){var o=t[u++];o&&g(o);var l=t[u++];l&&c(l)}return e;function c(r){var t=r.length,n=r[0];if("/"===n)for(var e=r.replace(/^\/|[\s\/].*$/g,"").toLowerCase();f.length;){var i=s.n&&s.n.toLowerCase();if(s=f.pop(),i===e)break}else if("?"===n)p({n:"?",r:r.substr(1,t-2)});else if("!"===n)"[CDATA["===r.substr(1,7)&&"]]"===r.substr(-2)?g(r.substr(8,t-10)):p({n:"!",r:r.substr(1)});else{var a=function(r){var t={f:[]},n=(r=r.replace(/\s*\/?$/,"")).search(/[\s='"\/]/);n<0?t.n=r:(t.n=r.substr(0,n),t.t=r.substr(n));return t}(r);p(a),"/"===r[t-1]?a.c=1:(f.push(s),s=a)}}function p(r){s.f.push(r)}function g(r){(r=i(r))&&p(a(r))}}(r),t);return s;function i(r){return r&&r.replace(/^\s+|\s+$/g,"")}function a(r){return r.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g,(function(r){if("#"===r[1]){var t="x"===r[2]?parseInt(r.substr(3),16):parseInt(r.substr(2),10);if(t>-1)return String.fromCharCode(t)}return n[r]||r}))}function f(r,t,n){if(void 0!==n){var e=r[t];e instanceof Array?e.push(n):r[t]=t in r?[e,n]:n}}}stringify(r=new Object,t=""){var n="";for(var e in r)n+=s(r[e],e,"");return n=t?n.replace(/\t/g,t):n.replace(/\t|\n/g,"");function s(r,t,n){let e="";if(Array.isArray(r))e=r.reduce(((r,e)=>r+(n+s(e,t,n+"\t")+"\n")),"");else if("object"==typeof r){let i=!1;e+=n+"<"+t;for(let t in r)"@"==t.charAt(0)?e+=" "+t.substring(1)+'="'+r[t].toString()+'"':i=!0;if(e+=i?">":"/>",i){for(let t in r)"#"==t?e+=r[t]:"#cdata"==t?e+="<![CDATA["+r[t]+"]]>":"@"!=t.charAt(0)&&(e+=s(r[t],t,n+"\t"));e+=("\n"==e.charAt(e.length-1)?n:"")+"</"+t+">"}}else e+="?"===t?n+"<"+t+r.toString()+t+">":n+"<"+t+">"+r.toString()+"</"+t+">";return e}}}(r)}
