import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";
import URL from "./URL/URL.mjs";
import XML from "./XML/XML.mjs";
import VTT from "./WebVTT/WebVTT.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import detectFormat from "./function/detectFormat.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import Composite from "./function/Composite.mjs";

const $ = new ENV("🍿️ DualSubs: 🔣 Universal v1.0.1(2) External.Subtitles.response.beta");

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname, PATHs = url.pathname.split("/").filter(Boolean);
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = detectFormat(URL, $response?.body, FORMAT);
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	$.log(`⚠ PLATFORM: ${PLATFORM}`, "");
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "External", "API"], Database);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams?.get("subtype") ?? Settings.Type, Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 创建字幕请求队列
			let body = {};
			// 处理类型
			switch (Type) {
				case "Official":
					$.log(`⚠ 官方字幕`, "");
					break;
				case "Translate":
				default:
					$.log(`⚠ 翻译字幕`, "");
					break;
				case "External":
					$.log(`⚠ 外挂字幕`, "");
					switch (Settings.SubVendor) {
						case "URL":
							request = {
								"url": Settings.URL,
								"headers": {
									"Accept": "*/*",
									"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1"
								}
							};
							break;
					};
					break;
			};
			// 创建字幕Object
			let externalSubtitle = await $.fetch(request).then(response => response.body);;
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					//body = M3U8.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					body = XML.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					externalSubtitle = XML.parse(externalSubtitle);
					//$.log(`🚧 externalSubtitle: ${JSON.stringify(externalSubtitle)}`, "");
					body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					body = VTT.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					externalSubtitle = VTT.parse(externalSubtitle);
					//$.log(`🚧 externalSubtitle: ${JSON.stringify(externalSubtitle)}`, "");
					body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					externalSubtitle = JSON.parse(externalSubtitle);
					//$.log(`🚧 externalSubtitle: ${JSON.stringify(externalSubtitle)}`, "");
					body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					//$.log(`🚧 $response.body: ${JSON.stringify($response.body)}`, "");
					//let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//$.log(`🚧 isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					// 写入二进制数据
					//$.log(`🚧 rawBody: ${JSON.stringify(rawBody)}`, "");
					//$response.body = rawBody;
					break;
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response))

/***************** Function *****************/
