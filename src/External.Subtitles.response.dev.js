import { Console, done, fetch, Lodash as _ } from "@nsnanocat/util";
import { URL } from "@nsnanocat/url";
import XML from "./XML/XML.mjs";
import VTT from "./WebVTT/WebVTT.mjs";
import database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";
import detectFormat from "./function/detectFormat.mjs";
import detectPlatform from "./function/detectPlatform.mjs";
import Composite from "./function/Composite.mjs";
Console.logLevel = "DEBUG";
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = detectFormat(URL, $response?.body, FORMAT);
Console.info(`FORMAT: ${FORMAT}`);
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	Console.info(`PLATFORM: ${PLATFORM}`);
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("DualSubs", [["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM) ? PLATFORM : "Universal", "External", "API"], database);
	Console.info(`Settings.Switch: ${Settings?.Switch}`);
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams?.get("subtype") ?? Settings.Type,
				Languages = [url.searchParams?.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams?.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			Console.info(`Type: ${Type}`, `Languages: ${Languages}`);
			// 创建字幕请求队列
			let body = {};
			// 处理类型
			switch (Type) {
				case "Official":
					Console.info("官方字幕");
					break;
				case "Translate":
				default:
					Console.info("翻译字幕");
					break;
				case "External":
					Console.info("外挂字幕");
					switch (Settings.SubVendor) {
						case "URL":
							request = {
								url: Settings.URL,
								headers: {
									Accept: "*/*",
									"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
								},
							};
							break;
					}
					break;
			}
			// 创建字幕Object
			let externalSubtitle = await fetch(request).then(response => response.body);
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
					//Console.debug(`body: ${JSON.stringify(body)}`);
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					body = XML.parse($response.body);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					externalSubtitle = XML.parse(externalSubtitle);
					//Console.debug(`externalSubtitle: ${JSON.stringify(externalSubtitle)}`);
					body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					body = VTT.parse($response.body);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					externalSubtitle = VTT.parse(externalSubtitle);
					//Console.debug(`externalSubtitle: ${JSON.stringify(externalSubtitle)}`);
					body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					//Console.debug(`body: ${JSON.stringify(body)}`);
					externalSubtitle = JSON.parse(externalSubtitle);
					//Console.debug(`externalSubtitle: ${JSON.stringify(externalSubtitle)}`);
					body = Composite(body, externalSubtitle, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					//Console.debug(`body: ${JSON.stringify(body)}`);
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					//Console.debug(`$response.body: ${JSON.stringify($response.body)}`);
					//let rawBody = ($app === "Quantumult X") ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
					// 写入二进制数据
					//Console.debug(`rawBody: ${JSON.stringify(rawBody)}`);
					//$response.body = rawBody;
					break;
			}
			break;
		case false:
			break;
	}
})()
	.catch(e => Console.error(e))
	.finally(() => done($response));
