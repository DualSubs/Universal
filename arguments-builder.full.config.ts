import { type ArgumentItem, defineConfig } from "@nsnanocat/arguments-builder";

export const output = {
	surge: {
		path: "./dist/DualSubs.Universal.sgmodule",
		transformEgern: {
			enable: true,
			path: "./dist/DualSubs.Universal.yaml"
		}
	},
	loon: {
		path: "./dist/DualSubs.Universal.plugin"
	},
	customItems: [
		{
			path: "./dist/DualSubs.Universal.stoverride",
			template: "./template/stash.handlebars"
		},
		{
			path: "./dist/DualSubs.Universal.snippet",
			template: "./template/quantumultx.handlebars"
		},
		{
			path: "./dist/DualSubs.Universal.srmodule",
			template: "./template/shadowrocket.handlebars"
		}
	],
	dts: {
		isExported: true,
		path: "./src/types.d.ts"
	},
	boxjsSettings: {
		path: "./template/boxjs.settings.json",
		scope: "@DualSubs.Universal.Settings"
	}
};

export const argTypes: ArgumentItem = {
	key: "Types",
	name: "[字幕] 启用类型",
	defaultValue: [
		"Official",
		"Translate"
	],
	type: "array",
	options: [
		{ key: "Official", label: "官方字幕（合成器）" },
		{ key: "Translate", label: "翻译字幕（翻译器）" }
	],
	description: "请选择要添加的字幕选项，如果为标准播放器，则会在字幕选项中新增勾选字幕选项。"
};

export const argLanguages0: ArgumentItem = {
	key: "Languages[0]",
	name: "[字幕] 主语言（源语言）",
	defaultValue: "AUTO",
	type: "string",
	boxJsType: "selects",
	description: "当“主语言”字幕存在时，将生成“主语言/副语言（翻译）”与“主语言（外挂）”的字幕或字幕选项。",
	options: [
		{ key: "AUTO", label: "自动 - Automatic" },
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" },
		{ key: "AR", label: "العربية - 阿拉伯语" },
		{ key: "ID", label: "Bahasa Indonesia - 印度尼西亚语" }
	]
};

export const argLanguages1: ArgumentItem = {
	key: "Languages[1]",
	name: "[字幕] 副语言（目标语言）",
	defaultValue: "ZH",
	type: "string",
	boxJsType: "selects",
	description: "当“副语言”字幕存在时，将生成“副语言/主语言（官方）”的字幕或字幕选项。",
	options: [
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "EN-US", label: "英语（美国）" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "ES-ES", label: "Español - 西班牙语" },
		{ key: "ES-419", label: "西班牙语（拉丁美洲）" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" },
		{ key: "AR", label: "العربية - 阿拉伯语" },
		{ key: "ID", label: "Bahasa Indonesia - 印度尼西亚语" }
	]
};

export const argPosition: ArgumentItem = {
	key: "Position",
	name: "[字幕] 主语言（源语言）字幕位置",
	defaultValue: "Reverse",
	type: "string",
	description: "主语言（源语言）字幕的显示位置。",
	options: [
		{ key: "Forward", label: "上面（第一行）" },
		{ key: "Reverse", label: "下面（第二行）" }
	]
};

export const argVendor: ArgumentItem = {
	key: "Vendor",
	name: "[翻译器] 服务商API",
	defaultValue: "Google",
	type: "string",
	options: [
		{ key: "Google", label: "Google Translate" },
		{ key: "Microsoft", label: "Microsoft Translator（需填写API）" }
	],
	description: "请选择翻译器所使用的服务商API，更多翻译选项请使用BoxJs。"
};

export const argShowOnly: ArgumentItem = {
	key: "ShowOnly",
	name: "[翻译器] 只显示翻译字幕",
	defaultValue: false,
	type: "boolean",
	description: "是否仅显示翻译后字幕，不显示源语言字幕。"
};

export const argStorage: ArgumentItem = {
	key: "Storage",
	name: "[储存] 配置类型",
	defaultValue: "PersistentStore",
	type: "string",
	exclude: [
		"boxjs"
	],
	options: [
		{ key: "Argument", label: "插件配置优先" },
		{ key: "PersistentStore", label: "持久化存储优先" },
		{ key: "database", label: "仅使用默认配置" }
	],
	description: "默认优先使用设置面板或 BoxJS 保存的配置，其次使用插件配置，最后使用脚本默认配置。"
};

export const argLogLevel: ArgumentItem = {
	key: "LogLevel",
	name: "[调试] 日志等级",
	type: "string",
	defaultValue: "WARN",
	description: "选择脚本日志的输出等级，低于所选等级的日志将全部输出。",
	options: [
		{ key: "OFF", label: "🔴 关闭" },
		{ key: "ERROR", label: "❌ 错误" },
		{ key: "WARN", label: "⚠️ 警告" },
		{ key: "INFO", label: "ℹ️ 信息" },
		{ key: "DEBUG", label: "🅱️ 调试" },
		{ key: "ALL", label: "全部" }
	]
};

export const panelUniversalLanguages0: ArgumentItem = {
	...argLanguages0,
	options: [
		{ key: "AUTO", label: "自动 - Automatic" },
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" }
	]
};

export const panelUniversalLanguages1: ArgumentItem = {
	...argLanguages1,
	options: [
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" }
	]
};

export const panelUniversalLogLevel: ArgumentItem = {
	...argLogLevel,
	options: [
		{ key: "OFF", label: "关闭" },
		{ key: "ERROR", label: "❌ 错误" },
		{ key: "WARN", label: "⚠️ 警告" },
		{ key: "INFO", label: "ℹ️ 信息" },
		{ key: "DEBUG", label: "🅱️ 调试" },
		{ key: "ALL", label: "全部" }
	]
};

export const panelCompositeCacheSize: ArgumentItem = {
	key: "CacheSize",
	name: "播放记录缓存数量",
	type: "number",
	defaultValue: 20,
	description: "此选项决定同网关、同平台、同时处理和播放的数量, 建议设置此数值不小于播放设备数，最大可用值为50",
	placeholder: "20",
	boxJsType: "number"
};

export const panelCompositePosition: ArgumentItem = {
	...argPosition,
	name: "主语言（源语言）字幕位置",
	description: "主语言（源语言）字幕的显示位置"
};

export const panelCompositeOffset: ArgumentItem = {
	key: "Offset",
	name: "[合成器] 时间偏移量",
	type: "number",
	defaultValue: 0,
	description: "单位：毫秒(ms)，正负整数，不懂就别动",
	placeholder: "0",
	boxJsType: "number"
};

export const panelCompositeTolerance: ArgumentItem = {
	key: "Tolerance",
	name: "[合成器] 时间戳公差",
	type: "number",
	defaultValue: 1000,
	description: "单位：毫秒(ms)，正整数，字幕时间戳匹配时容许的误差范围，不懂就别动",
	placeholder: "1000",
	boxJsType: "number"
};

export const panelTranslateVendor: ArgumentItem = {
	...argVendor,
	name: "服务商API",
	options: [
		{ key: "Google", label: "Google Translate" },
		{ key: "GoogleCloud", label: "Google Cloud Translate（需填写API）" },
		{ key: "Microsoft", label: "Microsoft Translator（需填写API）" },
		{ key: "DeepL", label: "DeepL API（需填写API）" }
	],
	description: "请选择字幕翻译功能所使用的翻译API"
};

export const panelTranslateShowOnly: ArgumentItem = {
	...argShowOnly,
	name: "只显示翻译字幕"
};

export const panelTranslatePosition: ArgumentItem = {
	...argPosition,
	name: "主语言（源语言）字幕位置",
	defaultValue: "Forward",
	description: "主语言（源语言）字幕的显示位置"
};

export const panelTranslateMethod: ArgumentItem = {
	key: "Method",
	name: "[翻译器] 翻译方式",
	type: "string",
	defaultValue: "Part",
	options: [
		{ key: "Part", label: "逐段翻译（每50~128句文本合并发送一次翻译请求，对请求次数或频率限制型API友好）" },
		{ key: "Row", label: "逐句翻译（每句文本都发送一次翻译请求，不限量API可选，但会导致翻译缺乏上下文语境）" }
	],
	description: "翻译器工作方式，不懂就别动"
};

export const panelTranslateTimes: ArgumentItem = {
	key: "Times",
	name: "[翻译器] 重试次数",
	type: "number",
	defaultValue: "3",
	description: "单位：次，正整数",
	placeholder: "3",
	boxJsType: "number"
};

export const panelTranslateInterval: ArgumentItem = {
	key: "Interval",
	name: "[翻译器] 重试间隔时长",
	type: "number",
	defaultValue: "500",
	description: "单位：毫秒(ms)，正整数",
	placeholder: "500",
	boxJsType: "number"
};

export const panelTranslateExponential: ArgumentItem = {
	key: "Exponential",
	name: "[翻译器] 重试间隔时长递增",
	type: "boolean",
	defaultValue: true,
	description: "例如，第一次重试间隔时长1000ms，第二次重试间隔时长2000ms，第三次重试间隔时长4000ms，以此类推"
};

export const panelExternalLrcVendor: ArgumentItem = {
	key: "LrcVendor",
	name: "[歌词] 服务商API",
	type: "string",
	defaultValue: "NeteaseMusic",
	options: [
		{ key: "NeteaseMusic", label: "网易云音乐（官方）" },
		{ key: "QQMusic", label: "QQ音乐（官方）" },
		{ key: "NeteaseMusicNodeJS", label: "网易云音乐 NodeJS API" }
	],
	description: "请选择外部字幕功能所使用的服务商API"
};

export const panelExternalCacheSize: ArgumentItem = {
	...panelCompositeCacheSize,
	defaultValue: 50,
	description: "此选项决定同网关、同平台、同时处理和播放的数量, 建议设置此数值不小于播放设备数",
	placeholder: "50"
};

export const panelAPITranslateGoogleCloudVersion: ArgumentItem = {
	key: "GoogleCloud.Version",
	name: "[Google Cloud] Translation API 版本",
	type: "string",
	defaultValue: "v2",
	options: [
		{ key: "v2", label: "V2版" },
		{ key: "v3", label: "V3版" }
	],
	description: "选择版本"
};

export const panelAPITranslateGoogleCloudMode: ArgumentItem = {
	key: "GoogleCloud.Mode",
	name: "[Google Cloud] Translation API 认证方式",
	type: "string",
	defaultValue: "Key",
	options: [
		{ key: "Key", label: "密钥" },
		{ key: "Token", label: "令牌（暂不支持，别选）" }
	],
	description: "认证方式二选一"
};

export const panelAPITranslateGoogleCloudAuth: ArgumentItem = {
	key: "GoogleCloud.Auth",
	name: "[Google Cloud] Translation API 认证内容",
	type: "string",
	defaultValue: "",
	description: "请填写令牌(Token)或密钥(Key)，未提供时不会启用此类型字幕",
	placeholder: "AIzaSyD6NNneoaqSTL2mE3_S1DNPvzrxwcFLIAY"
};

export const panelAPITranslateMicrosoftVersion: ArgumentItem = {
	key: "Microsoft.Version",
	name: "[Microsoft Translator] API 版本",
	type: "string",
	defaultValue: "Azure",
	options: [
		{ key: "Azure", label: "国际版" },
		{ key: "AzureCN", label: "中国世纪互联版" },
		{ key: "AzureUS", label: "美国政府版" }
	],
	description: "选择版本"
};

export const panelAPITranslateMicrosoftMode: ArgumentItem = {
	key: "Microsoft.Mode",
	name: "[Microsoft Translator] 认证方式",
	type: "string",
	defaultValue: "Token",
	options: [
		{ key: "Token", label: "令牌 (Edge Translator)" },
		{ key: "Key", label: "密钥 (Microsoft Azure)" }
	],
	description: "认证方式二选一"
};

export const panelAPITranslateMicrosoftRegion: ArgumentItem = {
	key: "Microsoft.Region",
	name: "[Microsoft Translator] Azure 区域代码 (Key/密钥模式必须)",
	type: "string",
	defaultValue: "global",
	description: "如果开通Microsoft Azure Translator时没有选择全球global，则需要填写开通的地区代码，如chinanorth, chinaeast2等",
	placeholder: "global"
};

export const panelAPITranslateMicrosoftAuth: ArgumentItem = {
	key: "Microsoft.Auth",
	name: "[Microsoft Translator] 认证内容",
	type: "string",
	defaultValue: "",
	description: "请填写令牌(Token)或密钥(Key)，未提供时不会启用此类型字幕",
	placeholder: "c3639587ac214f2e917862c80a2b821b"
};

export const panelAPITranslateDeepLVersion: ArgumentItem = {
	key: "DeepL.Version",
	name: "[DeepL] API 版本",
	type: "string",
	defaultValue: "Free",
	options: [
		{ key: "Free", label: "Free" },
		{ key: "Pro", label: "Pro" }
	],
	description: "选择版本"
};

export const panelAPITranslateDeepLAuth: ArgumentItem = {
	key: "DeepL.Auth",
	name: "[DeepL] API 认证内容",
	type: "string",
	defaultValue: "",
	description: "请填写令牌(Token)或密钥(Key)，未提供时不会启用此类型字幕",
	placeholder: "df4385c2-33de-e423-4134-ca1f7b3ea8b7"
};

export const panelUniversalTypesDev: ArgumentItem = {
	...argTypes,
	options: [
		{ key: "Official", label: "官方字幕（合成器）" },
		{ key: "Translate", label: "翻译字幕（翻译器）" },
		{ key: "External", label: "外挂字幕（合成器）" }
	],
	description: "请选择要添加的字幕选项，如果为标准播放器，则会在字幕选项中新增勾选字幕选项"
};

export const panelUniversalLanguages0Dev: ArgumentItem = {
	...argLanguages0,
	options: [
		{ key: "AUTO", label: "自动 - Automatic" },
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "EN-US", label: "英语（美国）" },
		{ key: "EN-US SDH", label: "英语（美国）[CC]" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "ES-ES", label: "Español - 西班牙语" },
		{ key: "ES-ES SDH", label: "西班牙语[CC]" },
		{ key: "ES-419", label: "西班牙语（拉丁美洲）" },
		{ key: "ES-419 SDH", label: "西班牙语（拉丁美洲）[CC]" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" }
	]
};

export const panelUniversalLanguages1Dev: ArgumentItem = {
	...argLanguages1,
	options: [
		{ key: "ZH", label: "中文（自动）" },
		{ key: "ZH-HANS", label: "中文（简体）" },
		{ key: "ZH-HK", label: "中文（香港）" },
		{ key: "ZH-HANT", label: "中文（繁体）" },
		{ key: "EN", label: "English - 英语（自动）" },
		{ key: "EN-US", label: "英语（美国）" },
		{ key: "EN-US SDH", label: "英语（美国）[CC]" },
		{ key: "ES", label: "Español - 西班牙语（自动）" },
		{ key: "ES-ES", label: "Español - 西班牙语" },
		{ key: "ES-ES SDH", label: "西班牙语[CC]" },
		{ key: "ES-419", label: "西班牙语（拉丁美洲）" },
		{ key: "ES-419 SDH", label: "西班牙语（拉丁美洲）[CC]" },
		{ key: "JA", label: "日本語 - 日语" },
		{ key: "KO", label: "한국어 - 韩语" },
		{ key: "DE", label: "Deutsch - 德语" },
		{ key: "FR", label: "Français - 法语" },
		{ key: "TR", label: "Türkçe - 土耳其语" },
		{ key: "KM", label: "ភាសាខ្មែរ - 高棉语" }
	]
};

export const panelTranslateVendorDev: ArgumentItem = {
	...argVendor,
	name: "服务商API",
	options: [
		{ key: "Baidu", label: "百度翻译" },
		{ key: "BaiduFanyi", label: "百度 翻译开放平台（需填写API）" },
		{ key: "Youdao", label: "有道翻译" },
		{ key: "YoudaoAI", label: "有道智云 AI开放平台（需填写API）" },
		{ key: "Google", label: "Google Translate" },
		{ key: "GoogleCloud", label: "Google Cloud Translate（需填写API）" },
		{ key: "Bing", label: "Microsoft Bing" },
		{ key: "Microsoft", label: "Microsoft Translator（需填写API）" },
		{ key: "DeepL", label: "DeepL API（需填写API）" },
		{ key: "DeepLX", label: "DeepL X（需填写API）" }
	],
	description: "请选择字幕翻译功能所使用的翻译API"
};

export const panelTranslateCacheSizeDev: ArgumentItem = {
	...panelCompositeCacheSize,
	name: "[翻译器] 翻译结果缓存数量",
	defaultValue: 10,
	description: "缓存最后若干个翻译字幕内容，避免频繁请求翻译浪费API用量",
	placeholder: "10"
};

export const panelExternalSubVendorDev: ArgumentItem = {
	key: "SubVendor",
	name: "[外部字幕] 服务商API",
	type: "string",
	defaultValue: "URL",
	options: [
		{ key: "URL", label: "URL - 网页地址" }
	],
	description: "请选择外部字幕功能所使用的服务商API"
};

export const panelAPITranslateDeepLXEndpointDev: ArgumentItem = {
	key: "DeepLX.Endpoint",
	name: "[DeepL X] API 终结点",
	type: "string",
	defaultValue: "",
	description: "未提供时不会启用此类型字幕",
	placeholder: "http://localhost:1188/translate"
};

export const panelAPITranslateDeepLXAuthDev: ArgumentItem = {
	key: "DeepLX.Auth",
	name: "[DeepL X] API 认证内容",
	type: "string",
	defaultValue: "",
	description: "请填写令牌(Token)或密钥(Key)，没有设置密钥时，请留空",
	placeholder: "1234567"
};

export const panelAPIExternalNeteaseMusicPhoneNumberDev: ArgumentItem = {
	key: "NeteaseMusic.PhoneNumber",
	name: "[网易云音乐] 手机号码",
	type: "string",
	defaultValue: "",
	description: "请填写您的网易云音乐账号手机号，未提供时不会启用功能",
	placeholder: "12312341234"
};

export const panelAPIExternalNeteaseMusicPasswordDev: ArgumentItem = {
	key: "NeteaseMusic.Password",
	name: "[网易云音乐] 密码",
	type: "string",
	defaultValue: "",
	description: "请填写您的网易云音乐账号密码，未提供时不会启用此功能",
	placeholder: "12345678"
};

export const panelAPIExternalURLDev: ArgumentItem = {
	key: "URL",
	name: "[外部字幕] 字幕文件 URL",
	type: "string",
	defaultValue: "",
	description: "外挂字幕文件的完整 HTTP(S) 地址；启用外挂字幕时使用。"
};

export const moduleArgs: ArgumentItem[] = [argTypes, argLanguages0, argLanguages1, argPosition, argVendor, argShowOnly, argStorage, argLogLevel];

export default defineConfig({ output, args: moduleArgs });
