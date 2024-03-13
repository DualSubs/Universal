/* README: https://github.com/DualSubs */
/* https://www.lodashjs.com */
class Lodash {
	static name = "Lodash";
	static version = "1.2.2";
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) };

	static get(object = {}, path = "", defaultValue = undefined) {
		// translate array case to dot case, then split with .
		// a[0].b -> a.0.b -> ['a', '0', 'b']
		if (!Array.isArray(path)) path = this.toPath(path);

		const result = path.reduce((previousValue, currentValue) => {
			return Object(previousValue)[currentValue]; // null undefined get attribute will throwError, Object() can return a object 
		}, object);
		return (result === undefined) ? defaultValue : result;
	}

	static set(object = {}, path = "", value) {
		if (!Array.isArray(path)) path = this.toPath(path);
		path
			.slice(0, -1)
			.reduce(
				(previousValue, currentValue, currentIndex) =>
					(Object(previousValue[currentValue]) === previousValue[currentValue])
						? previousValue[currentValue]
						: previousValue[currentValue] = (/^\d+$/.test(path[currentIndex + 1]) ? [] : {}),
				object
			)[path[path.length - 1]] = value;
		return object
	}

	static unset(object = {}, path = "") {
		if (!Array.isArray(path)) path = this.toPath(path);
		let result = path.reduce((previousValue, currentValue, currentIndex) => {
			if (currentIndex === path.length - 1) {
				delete previousValue[currentValue];
				return true
			}
			return Object(previousValue)[currentValue]
		}, object);
		return result
	}

	static toPath(value) {
		return value.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
	}

	static escape(string) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		};
		return string.replace(/[&<>"']/g, m => map[m])
	};

	static unescape(string) {
		const map = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#39;': "'",
		};
		return string.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, m => map[m])
	}

}

/* https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem */
class $Storage {
	static name = "$Storage";
	static version = "1.0.9";
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) };
	static data = null
	static dataFile = 'box.dat'
	static #nameRegex = /^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;

	static #platform() {
		if ('undefined' !== typeof $environment && $environment['surge-version'])
			return 'Surge'
		if ('undefined' !== typeof $environment && $environment['stash-version'])
			return 'Stash'
		if ('undefined' !== typeof module && !!module.exports) return 'Node.js'
		if ('undefined' !== typeof $task) return 'Quantumult X'
		if ('undefined' !== typeof $loon) return 'Loon'
		if ('undefined' !== typeof $rocket) return 'Shadowrocket'
		if ('undefined' !== typeof Egern) return 'Egern'
	}

    static getItem(keyName = new String, defaultValue = null) {
        let keyValue = defaultValue;
        // 如果以 @
		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				//console.log(`1: ${key}, ${path}`);
				keyName = key;
				let value = this.getItem(keyName, {});
				//console.log(`2: ${JSON.stringify(value)}`)
				if (typeof value !== "object") value = {};
				//console.log(`3: ${JSON.stringify(value)}`)
				keyValue = Lodash.get(value, path);
				//console.log(`4: ${JSON.stringify(keyValue)}`)
				try {
					keyValue = JSON.parse(keyValue);
				} catch (e) {
					// do nothing
				}				//console.log(`5: ${JSON.stringify(keyValue)}`)
				break;
			default:
				switch (this.#platform()) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						keyValue = $persistentStore.read(keyName);
						break;
					case 'Quantumult X':
						keyValue = $prefs.valueForKey(keyName);
						break;
					case 'Node.js':
						this.data = this.#loaddata(this.dataFile);
						keyValue = this.data?.[keyName];
						break;
					default:
						keyValue = this.data?.[keyName] || null;
						break;
				}				try {
					keyValue = JSON.parse(keyValue);
				} catch (e) {
					// do nothing
				}				break;
		}		return keyValue ?? defaultValue;
    };

	static setItem(keyName = new String, keyValue = new String) {
		let result = false;
		//console.log(`0: ${typeof keyValue}`);
		switch (typeof keyValue) {
			case "object":
				keyValue = JSON.stringify(keyValue);
				break;
			default:
				keyValue = String(keyValue);
				break;
		}		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				//console.log(`1: ${key}, ${path}`);
				keyName = key;
				let value = this.getItem(keyName, {});
				//console.log(`2: ${JSON.stringify(value)}`)
				if (typeof value !== "object") value = {};
				//console.log(`3: ${JSON.stringify(value)}`)
				Lodash.set(value, path, keyValue);
				//console.log(`4: ${JSON.stringify(value)}`)
				result = this.setItem(keyName, value);
				//console.log(`5: ${result}`)
				break;
			default:
				switch (this.#platform()) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						result = $persistentStore.write(keyValue, keyName);
						break;
					case 'Quantumult X':
						result =$prefs.setValueForKey(keyValue, keyName);
						break;
					case 'Node.js':
						this.data = this.#loaddata(this.dataFile);
						this.data[keyName] = keyValue;
						this.#writedata(this.dataFile);
						result = true;
						break;
					default:
						result = this.data?.[keyName] || null;
						break;
				}				break;
		}		return result;
	};

    static removeItem(keyName){
		let result = false;
		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				keyName = key;
				let value = this.getItem(keyName);
				if (typeof value !== "object") value = {};
				keyValue = Lodash.unset(value, path);
				result = this.setItem(keyName, value);
				break;
			default:
				switch (this.#platform()) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						result = false;
						break;
					case 'Quantumult X':
						result = $prefs.removeValueForKey(keyName);
						break;
					case 'Node.js':
						result = false;
						break;
					default:
						result = false;
						break;
				}				break;
		}		return result;
    }

    static clear() {
		let result = false;
		switch (this.#platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Egern':
			case 'Shadowrocket':
				result = false;
				break;
			case 'Quantumult X':
				result = $prefs.removeAllValues();
				break;
			case 'Node.js':
				result = false;
				break;
			default:
				result = false;
				break;
		}		return result;
    }

	static #loaddata(dataFile) {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs');
			this.path = this.path ? this.path : require('path');
			const curDirDataFilePath = this.path.resolve(dataFile);
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				dataFile
			);
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
			if (isCurDirDataFile || isRootDirDataFile) {
				const datPath = isCurDirDataFile
					? curDirDataFilePath
					: rootDirDataFilePath;
				try {
					return JSON.parse(this.fs.readFileSync(datPath))
				} catch (e) {
					return {}
				}
			} else return {}
		} else return {}
	}

	static #writedata(dataFile = this.dataFile) {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs');
			this.path = this.path ? this.path : require('path');
			const curDirDataFilePath = this.path.resolve(dataFile);
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				dataFile
			);
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
			const jsondata = JSON.stringify(this.data);
			if (isCurDirDataFile) {
				this.fs.writeFileSync(curDirDataFilePath, jsondata);
			} else if (isRootDirDataFile) {
				this.fs.writeFileSync(rootDirDataFilePath, jsondata);
			} else {
				this.fs.writeFileSync(curDirDataFilePath, jsondata);
			}
		}
	};

}

class ENV {
	static name = "ENV"
	static version = '1.7.4'
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) }

	constructor(name, opts) {
		console.log(`\n🟧 ${ENV.name} v${ENV.version}\n`);
		this.name = name;
		this.logs = [];
		this.isMute = false;
		this.isMuteLog = false;
		this.logSeparator = '\n';
		this.encoding = 'utf-8';
		this.startTime = new Date().getTime();
		Object.assign(this, opts);
		this.log(`\n🚩 开始!\n${name}\n`);
	}

	platform() {
		if ('undefined' !== typeof $environment && $environment['surge-version'])
			return 'Surge'
		if ('undefined' !== typeof $environment && $environment['stash-version'])
			return 'Stash'
		if ('undefined' !== typeof module && !!module.exports) return 'Node.js'
		if ('undefined' !== typeof $task) return 'Quantumult X'
		if ('undefined' !== typeof $loon) return 'Loon'
		if ('undefined' !== typeof $rocket) return 'Shadowrocket'
		if ('undefined' !== typeof Egern) return 'Egern'
	}

	isNode() {
		return 'Node.js' === this.platform()
	}

	isQuanX() {
		return 'Quantumult X' === this.platform()
	}

	isSurge() {
		return 'Surge' === this.platform()
	}

	isLoon() {
		return 'Loon' === this.platform()
	}

	isShadowrocket() {
		return 'Shadowrocket' === this.platform()
	}

	isStash() {
		return 'Stash' === this.platform()
	}

	isEgern() {
		return 'Egern' === this.platform()
	}

	async getScript(url) {
		return await this.fetch(url).then(response => response.body);
	}

	async runScript(script, runOpts) {
		let httpapi = $Storage.getItem('@chavy_boxjs_userCfgs.httpapi');
		httpapi = httpapi?.replace?.(/\n/g, '')?.trim();
		let httpapi_timeout = $Storage.getItem('@chavy_boxjs_userCfgs.httpapi_timeout');
		httpapi_timeout = (httpapi_timeout * 1) ?? 20;
		httpapi_timeout = runOpts?.timeout ?? httpapi_timeout;
		const [password, address] = httpapi.split('@');
		const request = {
			url: `http://${address}/v1/scripting/evaluate`,
			body: {
				script_text: script,
				mock_type: 'cron',
				timeout: httpapi_timeout
			},
			headers: { 'X-Key': password, 'Accept': '*/*' },
			timeout: httpapi_timeout
		};
		await this.fetch(request).then(response => response.body, error => this.logErr(error));
	}

	initGotEnv(opts) {
		this.got = this.got ? this.got : require('got');
		this.cktough = this.cktough ? this.cktough : require('tough-cookie');
		this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
		if (opts) {
			opts.headers = opts.headers ? opts.headers : {};
			if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
				opts.cookieJar = this.ckjar;
			}
		}
	}

	async fetch(request = {} || "", option = {}) {
		// 初始化参数
		switch (request.constructor) {
			case Object:
				request = { ...request, ...option };
				break;
			case String:
				request = { "url": request, ...option };
				break;
		}		// 自动判断请求方法
		if (!request.method) {
			request.method = "GET";
			if (request.body ?? request.bodyBytes) request.method = "POST";
		}		// 移除请求头中的部分参数, 让其自动生成
		delete request.headers?.Host;
		delete request.headers?.[":authority"];
		delete request.headers?.['Content-Length'];
		delete request.headers?.['content-length'];
		// 定义请求方法（小写）
		const method = request.method.toLocaleLowerCase();
		// 判断平台
		switch (this.platform()) {
			case 'Loon':
			case 'Surge':
			case 'Stash':
			case 'Egern':
			case 'Shadowrocket':
			default:
				// 转换请求参数
				if (request.policy) {
					if (this.isLoon()) request.node = request.policy;
					if (this.isStash()) Lodash.set(request, "headers.X-Stash-Selected-Proxy", encodeURI(request.policy));
				}				if (typeof request.redirection === "boolean") request["auto-redirect"] = request.redirection;
				// 转换请求体
				if (request.bodyBytes && !request.body) {
					request.body = request.bodyBytes;
					delete request.bodyBytes;
				}				// 发送请求
				return await new Promise((resolve, reject) => {
					$httpClient[method](request, (error, response, body) => {
						if (error) reject(error);
						else {
							response.ok = /^2\d\d$/.test(response.status);
							response.statusCode = response.status;
							if (body) {
								response.body = body;
								if (request["binary-mode"] == true) response.bodyBytes = body;
							}							resolve(response);
						}
					});
				});
			case 'Quantumult X':
				// 转换请求参数
				if (request.policy) Lodash.set(request, "opts.policy", request.policy);
				if (typeof request["auto-redirect"] === "boolean") Lodash.set(request, "opts.redirection", request["auto-redirect"]);
				// 转换请求体
				if (request.body instanceof ArrayBuffer) {
					request.bodyBytes = request.body;
					delete request.body;
				} else if (ArrayBuffer.isView(request.body)) {
					request.bodyBytes = request.body.buffer.slice(request.body.byteOffset, request.body.byteLength + request.body.byteOffset);
					delete object.body;
				} else if (request.body) delete request.bodyBytes;
				// 发送请求
				return await $task.fetch(request).then(
					response => {
						response.ok = /^2\d\d$/.test(response.statusCode);
						response.status = response.statusCode;
						return response;
					},
					reason => Promise.reject(reason.error));
			case 'Node.js':
				let iconv = require('iconv-lite');
				this.initGotEnv(request);
				const { url, ...option } = request;
				return await this.got[method](url, option)
					.on('redirect', (response, nextOpts) => {
						try {
							if (response.headers['set-cookie']) {
								const ck = response.headers['set-cookie']
									.map(this.cktough.Cookie.parse)
									.toString();
								if (ck) {
									this.ckjar.setCookieSync(ck, null);
								}
								nextOpts.cookieJar = this.ckjar;
							}
						} catch (e) {
							this.logErr(e);
						}
						// this.ckjar.setCookieSync(response.headers['set-cookie'].map(Cookie.parse).toString())
					})
					.then(
						response => {
							response.statusCode = response.status;
							response.body = iconv.decode(response.rawBody, this.encoding);
							response.bodyBytes = response.rawBody;
							return response;
						},
						error => Promise.reject(error.message));
		}	};

	/**
	 *
	 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
	 *    :$.time('yyyyMMddHHmmssS')
	 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
	 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
	 * @param {string} format 格式化参数
	 * @param {number} ts 可选: 根据指定时间戳返回格式化日期
	 *
	 */
	time(format, ts = null) {
		const date = ts ? new Date(ts) : new Date();
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		};
		if (/(y+)/.test(format))
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + '').substr(4 - RegExp.$1.length)
			);
		for (let k in o)
			if (new RegExp('(' + k + ')').test(format))
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length == 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length)
				);
		return format
	}

	/**
	 * 系统通知
	 *
	 * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
	 *
	 * 示例:
	 * $.msg(title, subt, desc, 'twitter://')
	 * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
	 * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
	 *
	 * @param {*} title 标题
	 * @param {*} subt 副标题
	 * @param {*} desc 通知详情
	 * @param {*} opts 通知参数
	 *
	 */
	msg(title = name, subt = '', desc = '', opts) {
		const toEnvOpts = (rawopts) => {
			switch (typeof rawopts) {
				case undefined:
					return rawopts
				case 'string':
					switch (this.platform()) {
						case 'Surge':
						case 'Stash':
						case 'Egern':
						default:
							return { url: rawopts }
						case 'Loon':
						case 'Shadowrocket':
							return rawopts
						case 'Quantumult X':
							return { 'open-url': rawopts }
						case 'Node.js':
							return undefined
					}
				case 'object':
					switch (this.platform()) {
						case 'Surge':
						case 'Stash':
						case 'Egern':
						case 'Shadowrocket':
						default: {
							let openUrl =
								rawopts.url || rawopts.openUrl || rawopts['open-url'];
							return { url: openUrl }
						}
						case 'Loon': {
							let openUrl =
								rawopts.openUrl || rawopts.url || rawopts['open-url'];
							let mediaUrl = rawopts.mediaUrl || rawopts['media-url'];
							return { openUrl, mediaUrl }
						}
						case 'Quantumult X': {
							let openUrl =
								rawopts['open-url'] || rawopts.url || rawopts.openUrl;
							let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl;
							let updatePasteboard =
								rawopts['update-pasteboard'] || rawopts.updatePasteboard;
							return {
								'open-url': openUrl,
								'media-url': mediaUrl,
								'update-pasteboard': updatePasteboard
							}
						}
						case 'Node.js':
							return undefined
					}
				default:
					return undefined
			}
		};
		if (!this.isMute) {
			switch (this.platform()) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Egern':
				case 'Shadowrocket':
				default:
					$notification.post(title, subt, desc, toEnvOpts(opts));
					break
				case 'Quantumult X':
					$notify(title, subt, desc, toEnvOpts(opts));
					break
				case 'Node.js':
					break
			}
		}
		if (!this.isMuteLog) {
			let logs = ['', '==============📣系统通知📣=============='];
			logs.push(title);
			subt ? logs.push(subt) : '';
			desc ? logs.push(desc) : '';
			console.log(logs.join('\n'));
			this.logs = this.logs.concat(logs);
		}
	}

	log(...logs) {
		if (logs.length > 0) {
			this.logs = [...this.logs, ...logs];
		}
		console.log(logs.join(this.logSeparator));
	}

	logErr(error) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Egern':
			case 'Shadowrocket':
			case 'Quantumult X':
			default:
				this.log('', `❗️ ${this.name}, 错误!`, error);
				break
			case 'Node.js':
				this.log('', `❗️${this.name}, 错误!`, error.stack);
				break
		}
	}

	wait(time) {
		return new Promise((resolve) => setTimeout(resolve, time))
	}

	done(object = {}) {
		const endTime = new Date().getTime();
		const costTime = (endTime - this.startTime) / 1000;
		this.log("", `🚩 ${this.name}, 结束! 🕛 ${costTime} 秒`, "");
		switch (this.platform()) {
			case 'Surge':
				if (object.policy) Lodash.set(object, "headers.X-Surge-Policy", object.policy);
				$done(object);
				break;
			case 'Loon':
				if (object.policy) object.node = object.policy;
				$done(object);
				break;
			case 'Stash':
				if (object.policy) Lodash.set(object, "headers.X-Stash-Selected-Proxy", encodeURI(object.policy));
				$done(object);
				break;
			case 'Egern':
				$done(object);
				break;
			case 'Shadowrocket':
			default:
				$done(object);
				break;
			case 'Quantumult X':
				if (object.policy) Lodash.set(object, "opts.policy", object.policy);
				// 移除不可写字段
				delete object["auto-redirect"];
				delete object["auto-cookie"];
				delete object["binary-mode"];
				delete object.charset;
				delete object.host;
				delete object.insecure;
				delete object.method; // 1.4.x 不可写
				delete object.opt; // $task.fetch() 参数, 不可写
				delete object.path; // 可写, 但会与 url 冲突
				delete object.policy;
				delete object["policy-descriptor"];
				delete object.scheme;
				delete object.sessionIndex;
				delete object.statusCode;
				delete object.timeout;
				if (object.body instanceof ArrayBuffer) {
					object.bodyBytes = object.body;
					delete object.body;
				} else if (ArrayBuffer.isView(object.body)) {
					object.bodyBytes = object.body.buffer.slice(object.body.byteOffset, object.body.byteLength + object.body.byteOffset);
					delete object.body;
				} else if (object.body) delete object.bodyBytes;
				$done(object);
				break;
			case 'Node.js':
				process.exit(1);
				break;
		}
	}
}

class URI {
	static name = "URI";
	static version = "1.2.7";
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) };
	static #json = { scheme: "", host: "", path: "", query: {} };

	static parse(url) {
		const URLRegex = /(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/;
		let json = url.match(URLRegex)?.groups ?? null;
		if (json?.path) json.paths = json.path.split("/"); else json.path = "";
		//if (json?.paths?.at(-1)?.includes(".")) json.format = json.paths.at(-1).split(".").at(-1);
		if (json?.paths) {
			const fileName = json.paths[json.paths.length - 1];
			if (fileName?.includes(".")) {
				const list = fileName.split(".");
				json.format = list[list.length - 1];
			}
		}
		if (json?.query) json.query = Object.fromEntries(json.query.split("&").map((param) => param.split("=")));
		return json
	};

	static stringify(json = this.#json) {
		let url = "";
		if (json?.scheme && json?.host) url += json.scheme + "://" + json.host;
		if (json?.path) url += (json?.host) ? "/" + json.path : json.path;
		if (json?.query) url += "?" + Object.entries(json.query).map(param => param.join("=")).join("&");
		return url
	};
}

// refer: https://datatracker.ietf.org/doc/html/draft-pantos-http-live-streaming-08
class EXTM3U {
	static name = "EXTM3U";
	static version = "0.8.7";
	static about = () => console.log(`\n🟧 ${this.name} v${this.version}\n`);
	static #EXTM3URegex = /^(?:(?<TAG>#(?:EXT|AIV)[^#:\s\r\n]+)(?::(?<OPTION>[^\r\n]+))?(?:(?:\r\n|\r|\n)(?<URI>[^#\s\r\n]+))?|(?<NOTE>#[^\r\n]+)?)(?:\r\n|\r|\n)?$/gm;
	static #OPTIONValueRegex = /^((-?\d+[x.\d]+)|[0-9A-Z-]+)$/;

	static parse(m3u8 = new String) {
		let json = [...m3u8.matchAll(this.#EXTM3URegex)].map(item => {
			item = item?.groups || item;
			if (/=/.test(item?.OPTION)) item.OPTION = Object.fromEntries(`${item.OPTION}\,`.split(/,\s*(?![^"]*",)/).slice(0, -1).map(option => {
				option = option.split(/=(.*)/);
				option[1] = (isNaN(option[1])) ? option[1].replace(/^"(.*)"$/, "$1") : parseInt(option[1], 10);
				return option;
			}));
			return item
		});
		return json;
	};

	static stringify(json = new Array, options = { lineBreak: "\n" }) {
		if (json?.[0]?.TAG !== "#EXTM3U") json.unshift({ "TAG": "#EXTM3U" });
		let m3u8 = json.map(item => {
			if (typeof item?.OPTION === "object") item.OPTION = Object.entries(item.OPTION).map(option => {
				if (item?.TAG === "#EXT-X-SESSION-DATA") option[1] = `"${option[1]}"`;
				else if (!isNaN(option[1])) option[1] = (typeof option[1] === "number") ? option[1] : `"${option[1]}"`;
				else if (option[0] === "ID" || option[0] === "INSTREAM-ID" || option[0] === "KEYFORMAT") option[1] = `"${option[1]}"`;
				else if (!this.#OPTIONValueRegex.test(option[1])) option[1] = `"${option[1]}"`;
				return option.join("=");
			}).join(",");
			return item = (item?.URI) ? item.TAG + ":" + item.OPTION + options.lineBreak + item.URI
				: (item?.OPTION) ? item.TAG + ":" + item.OPTION
					: (item?.TAG) ? item.TAG
						: (item?.NOTE) ? item.NOTE
							: "";
		}).join(options.lineBreak);
		return m3u8;
	};
}

var Settings$8 = {
	Switch: true,
	Type: "Translate",
	Types: [
		"Official",
		"Translate"
	],
	Languages: [
		"EN",
		"ZH"
	],
	CacheSize: 50
};
var Configs$3 = {
	breakLine: {
		"text/xml": "&#x000A;",
		"application/xml": "&#x000A;",
		"text/vtt": "\n",
		"application/vtt": "\n",
		"text/json": "\n",
		"application/json": "\n"
	}
};
var Default = {
	Settings: Settings$8,
	Configs: Configs$3
};

var Default$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$3,
	Settings: Settings$8,
	default: Default
});

var Settings$7 = {
	Switch: true,
	Types: [
		"Official",
		"Translate"
	],
	Languages: [
		"AUTO",
		"ZH"
	]
};
var Configs$2 = {
	Languages: {
		AUTO: [
			"en",
			"en-US",
			"eng",
			"en-GB",
			"en-UK",
			"en-CA",
			"en-US SDH",
			"ja",
			"ja-JP",
			"jpn",
			"ko",
			"ko-KR",
			"kor",
			"pt",
			"pt-PT",
			"pt-BR",
			"por"
		],
		AR: [
			"ar",
			"ar-001"
		],
		BG: [
			"bg",
			"bg-BG",
			"bul"
		],
		CS: [
			"cs",
			"cs-CZ",
			"ces"
		],
		DA: [
			"da",
			"da-DK",
			"dan"
		],
		DE: [
			"de",
			"de-DE",
			"deu"
		],
		EL: [
			"el",
			"el-GR",
			"ell"
		],
		EN: [
			"en",
			"en-US",
			"eng",
			"en-GB",
			"en-UK",
			"en-CA",
			"en-US SDH"
		],
		"EN-CA": [
			"en-CA",
			"en",
			"eng"
		],
		"EN-GB": [
			"en-UK",
			"en",
			"eng"
		],
		"EN-US": [
			"en-US",
			"en",
			"eng"
		],
		"EN-US SDH": [
			"en-US SDH",
			"en-US",
			"en",
			"eng"
		],
		ES: [
			"es",
			"es-419",
			"es-ES",
			"spa",
			"es-419 SDH"
		],
		"ES-419": [
			"es-419",
			"es",
			"spa"
		],
		"ES-419 SDH": [
			"es-419 SDH",
			"es-419",
			"es",
			"spa"
		],
		"ES-ES": [
			"es-ES",
			"es",
			"spa"
		],
		ET: [
			"et",
			"et-EE",
			"est"
		],
		FI: [
			"fi",
			"fi-FI",
			"fin"
		],
		FR: [
			"fr",
			"fr-CA",
			"fr-FR",
			"fra"
		],
		"FR-CA": [
			"fr-CA",
			"fr",
			"fra"
		],
		"FR-DR": [
			"fr-FR",
			"fr",
			"fra"
		],
		HU: [
			"hu",
			"hu-HU",
			"hun"
		],
		ID: [
			"id",
			"id-id"
		],
		IT: [
			"it",
			"it-IT",
			"ita"
		],
		JA: [
			"ja",
			"ja-JP",
			"jpn"
		],
		KO: [
			"ko",
			"ko-KR",
			"kor"
		],
		LT: [
			"lt",
			"lt-LT",
			"lit"
		],
		LV: [
			"lv",
			"lv-LV",
			"lav"
		],
		NL: [
			"nl",
			"nl-NL",
			"nld"
		],
		NO: [
			"no",
			"nb-NO",
			"nor"
		],
		PL: [
			"pl",
			"pl-PL"
		],
		PT: [
			"pt",
			"pt-PT",
			"pt-BR",
			"por"
		],
		"PT-PT": [
			"pt-PT",
			"pt",
			"por"
		],
		"PT-BR": [
			"pt-BR",
			"pt",
			"por"
		],
		RO: [
			"ro",
			"ro-RO",
			"ron"
		],
		RU: [
			"ru",
			"ru-RU",
			"rus"
		],
		SK: [
			"sk",
			"sk-SK",
			"slk"
		],
		SL: [
			"sl",
			"sl-SI",
			"slv"
		],
		SV: [
			"sv",
			"sv-SE",
			"swe"
		],
		IS: [
			"is",
			"is-IS",
			"isl"
		],
		ZH: [
			"zh",
			"cmn",
			"zho",
			"zh-CN",
			"zh-Hans",
			"cmn-Hans",
			"zh-TW",
			"zh-Hant",
			"cmn-Hant",
			"zh-HK",
			"yue-Hant",
			"yue"
		],
		"ZH-CN": [
			"zh-CN",
			"zh-Hans",
			"cmn-Hans",
			"zho"
		],
		"ZH-HANS": [
			"zh-Hans",
			"cmn-Hans",
			"zh-CN",
			"zho"
		],
		"ZH-HK": [
			"zh-HK",
			"yue-Hant",
			"yue",
			"zho"
		],
		"ZH-TW": [
			"zh-TW",
			"zh-Hant",
			"cmn-Hant",
			"zho"
		],
		"ZH-HANT": [
			"zh-Hant",
			"cmn-Hant",
			"zh-TW",
			"zho"
		],
		YUE: [
			"yue",
			"yue-Hant",
			"zh-HK",
			"zho"
		],
		"YUE-HK": [
			"yue-Hant",
			"yue",
			"zh-HK",
			"zho"
		]
	}
};
var Universal = {
	Settings: Settings$7,
	Configs: Configs$2
};

var Universal$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$2,
	Settings: Settings$7,
	default: Universal
});

var Settings$6 = {
	Switch: true,
	Type: "Official",
	Types: [
		"Translate",
		"External"
	],
	Languages: [
		"AUTO",
		"ZH"
	],
	AutoCC: true,
	ShowOnly: false
};
var Configs$1 = {
	Languages: {
		BG: "bg-BG",
		CS: "cs",
		DA: "da-DK",
		DE: "de",
		EL: "el",
		EN: "en",
		"EN-GB": "en-GB",
		"EN-US": "en-US",
		"EN-US SDH": "en-US SDH",
		ES: "es",
		"ES-419": "es-419",
		"ES-ES": "es-ES",
		ET: "et-EE",
		FI: "fi",
		FR: "fr",
		HU: "hu-HU",
		ID: "id",
		IS: "is-IS",
		IT: "it",
		JA: "ja",
		KO: "ko",
		LT: "lt-LT",
		LV: "lv-LV",
		NL: "nl-NL",
		NO: "nb-NO",
		PL: "pl-PL",
		PT: "pt",
		"PT-PT": "pt-PT",
		"PT-BR": "pt-BR",
		RO: "ro-RO",
		RU: "ru-RU",
		SK: "sk-SK",
		SL: "sl-SI",
		SV: "sv-SE",
		YUE: "yue",
		"YUE-HK": "yue-HK",
		ZH: "zh",
		"ZH-HANS": "zh-Hans",
		"ZH-HK": "zh-Hant-HK",
		"ZH-HANT": "zh-Hant",
		"ZH-TW": "zh-TW"
	},
	translationLanguages: {
		DESKTOP: [
			{
				languageCode: "sq",
				languageName: {
					simpleText: "Shqip - 阿尔巴尼亚语"
				}
			},
			{
				languageCode: "ak",
				languageName: {
					simpleText: "Ákán - 阿肯语"
				}
			},
			{
				languageCode: "ar",
				languageName: {
					simpleText: "العربية - 阿拉伯语"
				}
			},
			{
				languageCode: "am",
				languageName: {
					simpleText: "አማርኛ - 阿姆哈拉语"
				}
			},
			{
				languageCode: "as",
				languageName: {
					simpleText: "অসমীয়া - 阿萨姆语"
				}
			},
			{
				languageCode: "az",
				languageName: {
					simpleText: "آذربايجان ديلی - 阿塞拜疆语"
				}
			},
			{
				languageCode: "ee",
				languageName: {
					simpleText: "Èʋegbe - 埃维语"
				}
			},
			{
				languageCode: "ay",
				languageName: {
					simpleText: "Aymar aru - 艾马拉语"
				}
			},
			{
				languageCode: "ga",
				languageName: {
					simpleText: "Gaeilge - 爱尔兰语"
				}
			},
			{
				languageCode: "et",
				languageName: {
					simpleText: "Eesti - 爱沙尼亚语"
				}
			},
			{
				languageCode: "or",
				languageName: {
					simpleText: "ଓଡ଼ିଆ - 奥里亚语"
				}
			},
			{
				languageCode: "om",
				languageName: {
					simpleText: "Afaan Oromoo - 奥罗莫语"
				}
			},
			{
				languageCode: "eu",
				languageName: {
					simpleText: "Euskara - 巴斯克语"
				}
			},
			{
				languageCode: "be",
				languageName: {
					simpleText: "Беларуская - 白俄罗斯语"
				}
			},
			{
				languageCode: "bg",
				languageName: {
					simpleText: "Български - 保加利亚语"
				}
			},
			{
				languageCode: "nso",
				languageName: {
					simpleText: "Sesotho sa Leboa - 北索托语"
				}
			},
			{
				languageCode: "is",
				languageName: {
					simpleText: "Íslenska - 冰岛语"
				}
			},
			{
				languageCode: "pl",
				languageName: {
					simpleText: "Polski - 波兰语"
				}
			},
			{
				languageCode: "bs",
				languageName: {
					simpleText: "Bosanski - 波斯尼亚语"
				}
			},
			{
				languageCode: "fa",
				languageName: {
					simpleText: "فارسی - 波斯语"
				}
			},
			{
				languageCode: "bho",
				languageName: {
					simpleText: "भोजपुरी - 博杰普尔语"
				}
			},
			{
				languageCode: "ts",
				languageName: {
					simpleText: "Xitsonga - 聪加语"
				}
			},
			{
				languageCode: "tt",
				languageName: {
					simpleText: "Татарча - 鞑靼语"
				}
			},
			{
				languageCode: "da",
				languageName: {
					simpleText: "Dansk - 丹麦语"
				}
			},
			{
				languageCode: "de",
				languageName: {
					simpleText: "Deutsch - 德语"
				}
			},
			{
				languageCode: "dv",
				languageName: {
					simpleText: "ދިވެހިބަސް - 迪维希语"
				}
			},
			{
				languageCode: "ru",
				languageName: {
					simpleText: "Русский - 俄语"
				}
			},
			{
				languageCode: "fr",
				languageName: {
					simpleText: "français - 法语"
				}
			},
			{
				languageCode: "sa",
				languageName: {
					simpleText: "संस्कृतम् - 梵语"
				}
			},
			{
				languageCode: "fil",
				languageName: {
					simpleText: "Filipino - 菲律宾语"
				}
			},
			{
				languageCode: "fi",
				languageName: {
					simpleText: "suomi - 芬兰语"
				}
			},
			{
				languageCode: "km",
				languageName: {
					simpleText: "ភាសាខ្មែរ - 高棉语"
				}
			},
			{
				languageCode: "ka",
				languageName: {
					simpleText: "ქართული - 格鲁吉亚语"
				}
			},
			{
				languageCode: "gu",
				languageName: {
					simpleText: "ગુજરાતી - 古吉拉特语"
				}
			},
			{
				languageCode: "gn",
				languageName: {
					simpleText: "Avañe'ẽ - 瓜拉尼语"
				}
			},
			{
				languageCode: "kk",
				languageName: {
					simpleText: "Қазақ тілі - 哈萨克语"
				}
			},
			{
				languageCode: "ht",
				languageName: {
					simpleText: "Kreyòl ayisyen - 海地克里奥尔语"
				}
			},
			{
				languageCode: "ko",
				languageName: {
					simpleText: "한국어 - 韩语"
				}
			},
			{
				languageCode: "ha",
				languageName: {
					simpleText: "هَوُسَ - 豪萨语"
				}
			},
			{
				languageCode: "nl",
				languageName: {
					simpleText: "Nederlands - 荷兰语"
				}
			},
			{
				languageCode: "gl",
				languageName: {
					simpleText: "Galego - 加利西亚语"
				}
			},
			{
				languageCode: "ca",
				languageName: {
					simpleText: "català - 加泰罗尼亚语"
				}
			},
			{
				languageCode: "cs",
				languageName: {
					simpleText: "čeština - 捷克语"
				}
			},
			{
				languageCode: "kn",
				languageName: {
					simpleText: "ಕನ್ನಡ - 卡纳达语"
				}
			},
			{
				languageCode: "ky",
				languageName: {
					simpleText: "кыргыз тили - 吉尔吉斯语"
				}
			},
			{
				languageCode: "xh",
				languageName: {
					simpleText: "isiXhosa - 科萨语"
				}
			},
			{
				languageCode: "co",
				languageName: {
					simpleText: "corsu - 科西嘉语"
				}
			},
			{
				languageCode: "hr",
				languageName: {
					simpleText: "hrvatski - 克罗地亚语"
				}
			},
			{
				languageCode: "qu",
				languageName: {
					simpleText: "Runa Simi - 克丘亚语"
				}
			},
			{
				languageCode: "ku",
				languageName: {
					simpleText: "Kurdî - 库尔德语"
				}
			},
			{
				languageCode: "la",
				languageName: {
					simpleText: "lingua latīna - 拉丁语"
				}
			},
			{
				languageCode: "lv",
				languageName: {
					simpleText: "latviešu valoda - 拉脱维亚语"
				}
			},
			{
				languageCode: "lo",
				languageName: {
					simpleText: "ພາສາລາວ - 老挝语"
				}
			},
			{
				languageCode: "lt",
				languageName: {
					simpleText: "lietuvių kalba - 立陶宛语"
				}
			},
			{
				languageCode: "ln",
				languageName: {
					simpleText: "lingála - 林加拉语"
				}
			},
			{
				languageCode: "lg",
				languageName: {
					simpleText: "Luganda - 卢干达语"
				}
			},
			{
				languageCode: "lb",
				languageName: {
					simpleText: "Lëtzebuergesch - 卢森堡语"
				}
			},
			{
				languageCode: "rw",
				languageName: {
					simpleText: "Kinyarwanda - 卢旺达语"
				}
			},
			{
				languageCode: "ro",
				languageName: {
					simpleText: "Română - 罗马尼亚语"
				}
			},
			{
				languageCode: "mt",
				languageName: {
					simpleText: "Malti - 马耳他语"
				}
			},
			{
				languageCode: "mr",
				languageName: {
					simpleText: "मराठी - 马拉地语"
				}
			},
			{
				languageCode: "mg",
				languageName: {
					simpleText: "Malagasy - 马拉加斯语"
				}
			},
			{
				languageCode: "ml",
				languageName: {
					simpleText: "മലയാളം - 马拉雅拉姆语"
				}
			},
			{
				languageCode: "ms",
				languageName: {
					simpleText: "bahasa Melayu - 马来语"
				}
			},
			{
				languageCode: "mk",
				languageName: {
					simpleText: "македонски јазик - 马其顿语"
				}
			},
			{
				languageCode: "mi",
				languageName: {
					simpleText: "te reo Māori - 毛利语"
				}
			},
			{
				languageCode: "mn",
				languageName: {
					simpleText: "Монгол хэл - 蒙古语"
				}
			},
			{
				languageCode: "bn",
				languageName: {
					simpleText: "বাংলা - 孟加拉语"
				}
			},
			{
				languageCode: "my",
				languageName: {
					simpleText: "ဗမာစာ - 缅甸语"
				}
			},
			{
				languageCode: "hmn",
				languageName: {
					simpleText: "Hmoob - 苗语"
				}
			},
			{
				languageCode: "af",
				languageName: {
					simpleText: "Afrikaans - 南非荷兰语"
				}
			},
			{
				languageCode: "st",
				languageName: {
					simpleText: "Sesotho - 南索托语"
				}
			},
			{
				languageCode: "ne",
				languageName: {
					simpleText: "नेपाली - 尼泊尔语"
				}
			},
			{
				languageCode: "no",
				languageName: {
					simpleText: "Norsk - 挪威语"
				}
			},
			{
				languageCode: "pa",
				languageName: {
					simpleText: "ਪੰਜਾਬੀ - 旁遮普语"
				}
			},
			{
				languageCode: "pt",
				languageName: {
					simpleText: "Português - 葡萄牙语"
				}
			},
			{
				languageCode: "ps",
				languageName: {
					simpleText: "پښتو - 普什图语"
				}
			},
			{
				languageCode: "ny",
				languageName: {
					simpleText: "chiCheŵa - 齐切瓦语"
				}
			},
			{
				languageCode: "ja",
				languageName: {
					simpleText: "日本語 - 日语"
				}
			},
			{
				languageCode: "sv",
				languageName: {
					simpleText: "Svenska - 瑞典语"
				}
			},
			{
				languageCode: "sm",
				languageName: {
					simpleText: "Gagana fa'a Samoa - 萨摩亚语"
				}
			},
			{
				languageCode: "sr",
				languageName: {
					simpleText: "Српски језик - 塞尔维亚语"
				}
			},
			{
				languageCode: "si",
				languageName: {
					simpleText: "සිංහල - 僧伽罗语"
				}
			},
			{
				languageCode: "sn",
				languageName: {
					simpleText: "ChiShona - 绍纳语"
				}
			},
			{
				languageCode: "eo",
				languageName: {
					simpleText: "Esperanto - 世界语"
				}
			},
			{
				languageCode: "sk",
				languageName: {
					simpleText: "slovenčina - 斯洛伐克语"
				}
			},
			{
				languageCode: "sl",
				languageName: {
					simpleText: "slovenščina - 斯洛文尼亚语"
				}
			},
			{
				languageCode: "sw",
				languageName: {
					simpleText: "Kiswahili - 斯瓦希里语"
				}
			},
			{
				languageCode: "gd",
				languageName: {
					simpleText: "Gàidhlig - 苏格兰盖尔语"
				}
			},
			{
				languageCode: "ceb",
				languageName: {
					simpleText: "Binisaya - 宿务语"
				}
			},
			{
				languageCode: "so",
				languageName: {
					simpleText: "Soomaaliga - 索马里语"
				}
			},
			{
				languageCode: "tg",
				languageName: {
					simpleText: "тоҷикӣ - 塔吉克语"
				}
			},
			{
				languageCode: "te",
				languageName: {
					simpleText: "తెలుగు - 泰卢固语"
				}
			},
			{
				languageCode: "ta",
				languageName: {
					simpleText: "தமிழ் - 泰米尔语"
				}
			},
			{
				languageCode: "th",
				languageName: {
					simpleText: "ไทย - 泰语"
				}
			},
			{
				languageCode: "ti",
				languageName: {
					simpleText: "ትግርኛ - 提格利尼亚语"
				}
			},
			{
				languageCode: "tr",
				languageName: {
					simpleText: "Türkçe - 土耳其语"
				}
			},
			{
				languageCode: "tk",
				languageName: {
					simpleText: "Türkmen - 土库曼语"
				}
			},
			{
				languageCode: "cy",
				languageName: {
					simpleText: "Cymraeg - 威尔士语"
				}
			},
			{
				languageCode: "ug",
				languageName: {
					simpleText: "ئۇيغۇرچە - 维吾尔语"
				}
			},
			{
				languageCode: "und",
				languageName: {
					simpleText: "Unknown - 未知语言"
				}
			},
			{
				languageCode: "ur",
				languageName: {
					simpleText: "اردو - 乌尔都语"
				}
			},
			{
				languageCode: "uk",
				languageName: {
					simpleText: "українська - 乌克兰语"
				}
			},
			{
				languageCode: "uz",
				languageName: {
					simpleText: "O'zbek - 乌兹别克语"
				}
			},
			{
				languageCode: "es",
				languageName: {
					simpleText: "Español - 西班牙语"
				}
			},
			{
				languageCode: "fy",
				languageName: {
					simpleText: "Frysk - 西弗里西亚语"
				}
			},
			{
				languageCode: "iw",
				languageName: {
					simpleText: "עברית - 希伯来语"
				}
			},
			{
				languageCode: "el",
				languageName: {
					simpleText: "Ελληνικά - 希腊语"
				}
			},
			{
				languageCode: "haw",
				languageName: {
					simpleText: "ʻŌlelo Hawaiʻi - 夏威夷语"
				}
			},
			{
				languageCode: "sd",
				languageName: {
					simpleText: "سنڌي - 信德语"
				}
			},
			{
				languageCode: "hu",
				languageName: {
					simpleText: "magyar - 匈牙利语"
				}
			},
			{
				languageCode: "su",
				languageName: {
					simpleText: "Basa Sunda - 巽他语"
				}
			},
			{
				languageCode: "hy",
				languageName: {
					simpleText: "հայերեն - 亚美尼亚语"
				}
			},
			{
				languageCode: "ig",
				languageName: {
					simpleText: "Igbo - 伊博语"
				}
			},
			{
				languageCode: "it",
				languageName: {
					simpleText: "Italiano - 意大利语"
				}
			},
			{
				languageCode: "yi",
				languageName: {
					simpleText: "ייִדיש - 意第绪语"
				}
			},
			{
				languageCode: "hi",
				languageName: {
					simpleText: "हिन्दी - 印地语"
				}
			},
			{
				languageCode: "id",
				languageName: {
					simpleText: "Bahasa Indonesia - 印度尼西亚语"
				}
			},
			{
				languageCode: "en",
				languageName: {
					simpleText: "English - 英语"
				}
			},
			{
				languageCode: "yo",
				languageName: {
					simpleText: "Yorùbá - 约鲁巴语"
				}
			},
			{
				languageCode: "vi",
				languageName: {
					simpleText: "Tiếng Việt - 越南语"
				}
			},
			{
				languageCode: "jv",
				languageName: {
					simpleText: "Basa Jawa - 爪哇语"
				}
			},
			{
				languageCode: "zh-Hant",
				languageName: {
					simpleText: "中文（繁體）- 中文（繁体）"
				}
			},
			{
				languageCode: "zh-Hans",
				languageName: {
					simpleText: "中文（简体）"
				}
			},
			{
				languageCode: "zu",
				languageName: {
					simpleText: "isiZulu - 祖鲁语"
				}
			},
			{
				languageCode: "kri",
				languageName: {
					simpleText: "Krìì - 克里语"
				}
			}
		],
		MOBILE: [
			{
				languageCode: "sq",
				languageName: {
					runs: [
						{
							text: "Shqip - 阿尔巴尼亚语"
						}
					]
				}
			},
			{
				languageCode: "ak",
				languageName: {
					runs: [
						{
							text: "Ákán - 阿肯语"
						}
					]
				}
			},
			{
				languageCode: "ar",
				languageName: {
					runs: [
						{
							text: "العربية - 阿拉伯语"
						}
					]
				}
			},
			{
				languageCode: "am",
				languageName: {
					runs: [
						{
							text: "አማርኛ - 阿姆哈拉语"
						}
					]
				}
			},
			{
				languageCode: "as",
				languageName: {
					runs: [
						{
							text: "অসমীয়া - 阿萨姆语"
						}
					]
				}
			},
			{
				languageCode: "az",
				languageName: {
					runs: [
						{
							text: "Azərbaycanca - 阿塞拜疆语"
						}
					]
				}
			},
			{
				languageCode: "ee",
				languageName: {
					runs: [
						{
							text: "Eʋegbe - 埃维语"
						}
					]
				}
			},
			{
				languageCode: "ay",
				languageName: {
					runs: [
						{
							text: "Aymar - 艾马拉语"
						}
					]
				}
			},
			{
				languageCode: "ga",
				languageName: {
					runs: [
						{
							text: "Gaeilge - 爱尔兰语"
						}
					]
				}
			},
			{
				languageCode: "et",
				languageName: {
					runs: [
						{
							text: "Eesti - 爱沙尼亚语"
						}
					]
				}
			},
			{
				languageCode: "or",
				languageName: {
					runs: [
						{
							text: "ଓଡ଼ିଆ - 奥里亚语"
						}
					]
				}
			},
			{
				languageCode: "om",
				languageName: {
					runs: [
						{
							text: "Oromoo - 奥罗莫语"
						}
					]
				}
			},
			{
				languageCode: "eu",
				languageName: {
					runs: [
						{
							text: "Euskara - 巴斯克语"
						}
					]
				}
			},
			{
				languageCode: "be",
				languageName: {
					runs: [
						{
							text: "Беларуская - 白俄罗斯语"
						}
					]
				}
			},
			{
				languageCode: "bg",
				languageName: {
					runs: [
						{
							text: "Български - 保加利亚语"
						}
					]
				}
			},
			{
				languageCode: "nso",
				languageName: {
					runs: [
						{
							text: "Sesotho sa Leboa - 北索托语"
						}
					]
				}
			},
			{
				languageCode: "is",
				languageName: {
					runs: [
						{
							text: "Íslenska - 冰岛语"
						}
					]
				}
			},
			{
				languageCode: "pl",
				languageName: {
					runs: [
						{
							text: "Polski - 波兰语"
						}
					]
				}
			},
			{
				languageCode: "bs",
				languageName: {
					runs: [
						{
							text: "Bosanski - 波斯尼亚语"
						}
					]
				}
			},
			{
				languageCode: "fa",
				languageName: {
					runs: [
						{
							text: "فارسی - 波斯语"
						}
					]
				}
			},
			{
				languageCode: "bho",
				languageName: {
					runs: [
						{
							text: "भोजपुरी - 博杰普尔语"
						}
					]
				}
			},
			{
				languageCode: "ts",
				languageName: {
					runs: [
						{
							text: "Xitsonga - 聪加语"
						}
					]
				}
			},
			{
				languageCode: "tt",
				languageName: {
					runs: [
						{
							text: "Татарча - 鞑靼语"
						}
					]
				}
			},
			{
				languageCode: "da",
				languageName: {
					runs: [
						{
							text: "Dansk - 丹麦语"
						}
					]
				}
			},
			{
				languageCode: "de",
				languageName: {
					runs: [
						{
							text: "Deutsch - 德语"
						}
					]
				}
			},
			{
				languageCode: "dv",
				languageName: {
					runs: [
						{
							text: "ދިވެހިބަސް - 迪维希语"
						}
					]
				}
			},
			{
				languageCode: "ru",
				languageName: {
					runs: [
						{
							text: "Русский - 俄语"
						}
					]
				}
			},
			{
				languageCode: "fr",
				languageName: {
					runs: [
						{
							text: "Français - 法语"
						}
					]
				}
			},
			{
				languageCode: "sa",
				languageName: {
					runs: [
						{
							text: "संस्कृतम् - 梵语"
						}
					]
				}
			},
			{
				languageCode: "fil",
				languageName: {
					runs: [
						{
							text: "Filipino - 菲律宾语"
						}
					]
				}
			},
			{
				languageCode: "fi",
				languageName: {
					runs: [
						{
							text: "Suomi - 芬兰语"
						}
					]
				}
			},
			{
				languageCode: "km",
				languageName: {
					runs: [
						{
							text: "ភាសាខ្មែរ - 高棉语"
						}
					]
				}
			},
			{
				languageCode: "ka",
				languageName: {
					runs: [
						{
							text: "ქართული - 格鲁吉亚语"
						}
					]
				}
			},
			{
				languageCode: "gu",
				languageName: {
					runs: [
						{
							text: "ગુજરાતી - 古吉拉特语"
						}
					]
				}
			},
			{
				languageCode: "gn",
				languageName: {
					runs: [
						{
							text: "Avañe'ẽ - 瓜拉尼语"
						}
					]
				}
			},
			{
				languageCode: "kk",
				languageName: {
					runs: [
						{
							text: "Қазақ тілі - 哈萨克语"
						}
					]
				}
			},
			{
				languageCode: "ht",
				languageName: {
					runs: [
						{
							text: "海地克里奥尔语"
						}
					]
				}
			},
			{
				languageCode: "ko",
				languageName: {
					runs: [
						{
							text: "한국말 - 韩语"
						}
					]
				}
			},
			{
				languageCode: "ha",
				languageName: {
					runs: [
						{
							text: "هَوُسَ - 豪萨语"
						}
					]
				}
			},
			{
				languageCode: "nl",
				languageName: {
					runs: [
						{
							text: "Nederlands - 荷兰语"
						}
					]
				}
			},
			{
				languageCode: "gl",
				languageName: {
					runs: [
						{
							text: "Galego - 加利西亚语"
						}
					]
				}
			},
			{
				languageCode: "ca",
				languageName: {
					runs: [
						{
							text: "Català - 加泰罗尼亚语"
						}
					]
				}
			},
			{
				languageCode: "cs",
				languageName: {
					runs: [
						{
							text: "Čeština - 捷克语"
						}
					]
				}
			},
			{
				languageCode: "kn",
				languageName: {
					runs: [
						{
							text: "ಕನ್ನಡ - 卡纳达语"
						}
					]
				}
			},
			{
				languageCode: "ky",
				languageName: {
					runs: [
						{
							text: "Кыргызча - 吉尔吉斯语"
						}
					]
				}
			},
			{
				languageCode: "xh",
				languageName: {
					runs: [
						{
							text: "isiXhosa - 科萨语"
						}
					]
				}
			},
			{
				languageCode: "co",
				languageName: {
					runs: [
						{
							text: "Corsu - 科西嘉语"
						}
					]
				}
			},
			{
				languageCode: "hr",
				languageName: {
					runs: [
						{
							text: "Hrvatski - 克罗地亚语"
						}
					]
				}
			},
			{
				languageCode: "qu",
				languageName: {
					runs: [
						{
							text: "Runa Simi - 克丘亚语"
						}
					]
				}
			},
			{
				languageCode: "ku",
				languageName: {
					runs: [
						{
							text: "Kurdî - 库尔德语"
						}
					]
				}
			},
			{
				languageCode: "la",
				languageName: {
					runs: [
						{
							text: "lingua latīna - 拉丁语"
						}
					]
				}
			},
			{
				languageCode: "lv",
				languageName: {
					runs: [
						{
							text: "Latviešu - 拉脱维亚语"
						}
					]
				}
			},
			{
				languageCode: "lo",
				languageName: {
					runs: [
						{
							text: "ລາວ - 老挝语"
						}
					]
				}
			},
			{
				languageCode: "lt",
				languageName: {
					runs: [
						{
							text: "Lietuvių - 立陶宛语"
						}
					]
				}
			},
			{
				languageCode: "ln",
				languageName: {
					runs: [
						{
							text: "Lingála - 林加拉语"
						}
					]
				}
			},
			{
				languageCode: "lg",
				languageName: {
					runs: [
						{
							text: "Luganda - 卢干达语"
						}
					]
				}
			},
			{
				languageCode: "lb",
				languageName: {
					runs: [
						{
							text: "Lëtzebuergesch - 卢森堡语"
						}
					]
				}
			},
			{
				languageCode: "rw",
				languageName: {
					runs: [
						{
							text: "Kinyarwanda - 卢旺达语"
						}
					]
				}
			},
			{
				languageCode: "ro",
				languageName: {
					runs: [
						{
							text: "Română - 罗马尼亚语"
						}
					]
				}
			},
			{
				languageCode: "mt",
				languageName: {
					runs: [
						{
							text: "Malti - 马耳他语"
						}
					]
				}
			},
			{
				languageCode: "mr",
				languageName: {
					runs: [
						{
							text: "मराठी - 马拉地语"
						}
					]
				}
			},
			{
				languageCode: "mg",
				languageName: {
					runs: [
						{
							text: "Malagasy - 马拉加斯语"
						}
					]
				}
			},
			{
				languageCode: "ml",
				languageName: {
					runs: [
						{
							text: "മലയാളം - 马拉雅拉姆语"
						}
					]
				}
			},
			{
				languageCode: "ms",
				languageName: {
					runs: [
						{
							text: "Bahasa Melayu - 马来语"
						}
					]
				}
			},
			{
				languageCode: "mk",
				languageName: {
					runs: [
						{
							text: "македонски - 马其顿语"
						}
					]
				}
			},
			{
				languageCode: "mi",
				languageName: {
					runs: [
						{
							text: "Māori - 毛利语"
						}
					]
				}
			},
			{
				languageCode: "mn",
				languageName: {
					runs: [
						{
							text: "Монгол - 蒙古语"
						}
					]
				}
			},
			{
				languageCode: "bn",
				languageName: {
					runs: [
						{
							text: "বাংলা - 孟加拉语"
						}
					]
				}
			},
			{
				languageCode: "my",
				languageName: {
					runs: [
						{
							text: "ဗမာစာ - 缅甸语"
						}
					]
				}
			},
			{
				languageCode: "hmn",
				languageName: {
					runs: [
						{
							text: "Hmoob - 苗语"
						}
					]
				}
			},
			{
				languageCode: "af",
				languageName: {
					runs: [
						{
							text: "Afrikaans - 南非荷兰语"
						}
					]
				}
			},
			{
				languageCode: "st",
				languageName: {
					runs: [
						{
							text: "Sesotho - 南索托语"
						}
					]
				}
			},
			{
				languageCode: "ne",
				languageName: {
					runs: [
						{
							text: "नेपाली - 尼泊尔语"
						}
					]
				}
			},
			{
				languageCode: "no",
				languageName: {
					runs: [
						{
							text: "Norsk - 挪威语"
						}
					]
				}
			},
			{
				languageCode: "pa",
				languageName: {
					runs: [
						{
							text: "ਪੰਜਾਬੀ - 旁遮普语"
						}
					]
				}
			},
			{
				languageCode: "pt",
				languageName: {
					runs: [
						{
							text: "Português - 葡萄牙语"
						}
					]
				}
			},
			{
				languageCode: "ps",
				languageName: {
					runs: [
						{
							text: "پښتو - 普什图语"
						}
					]
				}
			},
			{
				languageCode: "ny",
				languageName: {
					runs: [
						{
							text: "chiCheŵa - 齐切瓦语"
						}
					]
				}
			},
			{
				languageCode: "ja",
				languageName: {
					runs: [
						{
							text: "日本語 - 日语"
						}
					]
				}
			},
			{
				languageCode: "sv",
				languageName: {
					runs: [
						{
							text: "Svenska - 瑞典语"
						}
					]
				}
			},
			{
				languageCode: "sm",
				languageName: {
					runs: [
						{
							text: "Gagana Samoa - 萨摩亚语"
						}
					]
				}
			},
			{
				languageCode: "sr",
				languageName: {
					runs: [
						{
							text: "Српски језик - 塞尔维亚语"
						}
					]
				}
			},
			{
				languageCode: "si",
				languageName: {
					runs: [
						{
							text: "සිංහල - 僧伽罗语"
						}
					]
				}
			},
			{
				languageCode: "sn",
				languageName: {
					runs: [
						{
							text: "ChiShona - 绍纳语"
						}
					]
				}
			},
			{
				languageCode: "eo",
				languageName: {
					runs: [
						{
							text: "Esperanto - 世界语"
						}
					]
				}
			},
			{
				languageCode: "sk",
				languageName: {
					runs: [
						{
							text: "Slovenčina - 斯洛伐克语"
						}
					]
				}
			},
			{
				languageCode: "sl",
				languageName: {
					runs: [
						{
							text: "Slovenščina - 斯洛文尼亚语"
						}
					]
				}
			},
			{
				languageCode: "sw",
				languageName: {
					runs: [
						{
							text: "Kiswahili - 斯瓦希里语"
						}
					]
				}
			},
			{
				languageCode: "gd",
				languageName: {
					runs: [
						{
							text: "Gàidhlig - 苏格兰盖尔语"
						}
					]
				}
			},
			{
				languageCode: "ceb",
				languageName: {
					runs: [
						{
							text: "Cebuano - 宿务语"
						}
					]
				}
			},
			{
				languageCode: "so",
				languageName: {
					runs: [
						{
							text: "Soomaaliga - 索马里语"
						}
					]
				}
			},
			{
				languageCode: "tg",
				languageName: {
					runs: [
						{
							text: "тоҷикӣ - 塔吉克语"
						}
					]
				}
			},
			{
				languageCode: "te",
				languageName: {
					runs: [
						{
							text: "తెలుగు - 泰卢固语"
						}
					]
				}
			},
			{
				languageCode: "ta",
				languageName: {
					runs: [
						{
							text: "தமிழ் - 泰米尔语"
						}
					]
				}
			},
			{
				languageCode: "th",
				languageName: {
					runs: [
						{
							text: "ไทย - 泰语"
						}
					]
				}
			},
			{
				languageCode: "ti",
				languageName: {
					runs: [
						{
							text: "ትግርኛ - 提格利尼亚语"
						}
					]
				}
			},
			{
				languageCode: "tr",
				languageName: {
					runs: [
						{
							text: "Türkçe - 土耳其语"
						}
					]
				}
			},
			{
				languageCode: "tk",
				languageName: {
					runs: [
						{
							text: "Türkmen - 土库曼语"
						}
					]
				}
			},
			{
				languageCode: "cy",
				languageName: {
					runs: [
						{
							text: "Cymraeg - 威尔士语"
						}
					]
				}
			},
			{
				languageCode: "ug",
				languageName: {
					runs: [
						{
							text: "ئۇيغۇرچە - 维吾尔语"
						}
					]
				}
			},
			{
				languageCode: "und",
				languageName: {
					runs: [
						{
							text: "Unknown - 未知语言"
						}
					]
				}
			},
			{
				languageCode: "ur",
				languageName: {
					runs: [
						{
							text: "اردو - 乌尔都语"
						}
					]
				}
			},
			{
				languageCode: "uk",
				languageName: {
					runs: [
						{
							text: "Українська - 乌克兰语"
						}
					]
				}
			},
			{
				languageCode: "uz",
				languageName: {
					runs: [
						{
							text: "O‘zbek - 乌兹别克语"
						}
					]
				}
			},
			{
				languageCode: "es",
				languageName: {
					runs: [
						{
							text: "Español - 西班牙语"
						}
					]
				}
			},
			{
				languageCode: "fy",
				languageName: {
					runs: [
						{
							text: "Frysk - 西弗里西亚语"
						}
					]
				}
			},
			{
				languageCode: "iw",
				languageName: {
					runs: [
						{
							text: "עברית - 希伯来语"
						}
					]
				}
			},
			{
				languageCode: "el",
				languageName: {
					runs: [
						{
							text: "Ελληνικά - 希腊语"
						}
					]
				}
			},
			{
				languageCode: "haw",
				languageName: {
					runs: [
						{
							text: "ʻŌlelo Hawaiʻi - 夏威夷语"
						}
					]
				}
			},
			{
				languageCode: "sd",
				languageName: {
					runs: [
						{
							text: "سنڌي - 信德语"
						}
					]
				}
			},
			{
				languageCode: "hu",
				languageName: {
					runs: [
						{
							text: "Magyar - 匈牙利语"
						}
					]
				}
			},
			{
				languageCode: "su",
				languageName: {
					runs: [
						{
							text: "Basa Sunda - 巽他语"
						}
					]
				}
			},
			{
				languageCode: "hy",
				languageName: {
					runs: [
						{
							text: "Հայերեն - 亚美尼亚语"
						}
					]
				}
			},
			{
				languageCode: "ig",
				languageName: {
					runs: [
						{
							text: "Igbo - 伊博语"
						}
					]
				}
			},
			{
				languageCode: "it",
				languageName: {
					runs: [
						{
							text: "Italiano - 意大利语"
						}
					]
				}
			},
			{
				languageCode: "yi",
				languageName: {
					runs: [
						{
							text: "ייִדיש - 意第绪语"
						}
					]
				}
			},
			{
				languageCode: "hi",
				languageName: {
					runs: [
						{
							text: "हिन्दी - 印地语"
						}
					]
				}
			},
			{
				languageCode: "id",
				languageName: {
					runs: [
						{
							text: "Bahasa Indonesia - 印度尼西亚语"
						}
					]
				}
			},
			{
				languageCode: "en",
				languageName: {
					runs: [
						{
							text: "English - 英语"
						}
					]
				}
			},
			{
				languageCode: "yo",
				languageName: {
					runs: [
						{
							text: "Yorùbá - 约鲁巴语"
						}
					]
				}
			},
			{
				languageCode: "vi",
				languageName: {
					runs: [
						{
							text: "Tiếng Việt - 越南语"
						}
					]
				}
			},
			{
				languageCode: "jv",
				languageName: {
					runs: [
						{
							text: "Basa Jawa - 爪哇语"
						}
					]
				}
			},
			{
				languageCode: "zh-Hant",
				languageName: {
					runs: [
						{
							text: "中文（繁體） - 中文（繁体）"
						}
					]
				}
			},
			{
				languageCode: "zh-Hans",
				languageName: {
					runs: [
						{
							text: "中文（简体）"
						}
					]
				}
			},
			{
				languageCode: "zu",
				languageName: {
					runs: [
						{
							text: "isiZulu - 祖鲁语"
						}
					]
				}
			},
			{
				languageCode: "kri",
				languageName: {
					runs: [
						{
							text: "Krìì - 克里语"
						}
					]
				}
			}
		]
	}
};
var YouTube = {
	Settings: Settings$6,
	Configs: Configs$1
};

var YouTube$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$1,
	Settings: Settings$6,
	default: YouTube
});

var Settings$5 = {
	Switch: true,
	Type: "Translate",
	Languages: [
		"AUTO",
		"ZH"
	]
};
var Configs = {
	Languages: {
		AR: "ar",
		CS: "cs",
		DA: "da",
		DE: "de",
		EN: "en",
		"EN-GB": "en-GB",
		"EN-US": "en-US",
		"EN-US SDH": "en-US SDH",
		ES: "es",
		"ES-419": "es-419",
		"ES-ES": "es-ES",
		FI: "fi",
		FR: "fr",
		HE: "he",
		HR: "hr",
		HU: "hu",
		ID: "id",
		IT: "it",
		JA: "ja",
		KO: "ko",
		MS: "ms",
		NB: "nb",
		NL: "nl",
		PL: "pl",
		PT: "pt",
		"PT-PT": "pt-PT",
		"PT-BR": "pt-BR",
		RO: "ro",
		RU: "ru",
		SV: "sv",
		TH: "th",
		TR: "tr",
		UK: "uk",
		VI: "vi",
		IS: "is",
		ZH: "zh",
		"ZH-HANS": "zh-Hans",
		"ZH-HK": "zh-HK",
		"ZH-HANT": "zh-Hant"
	}
};
var Netflix = {
	Settings: Settings$5,
	Configs: Configs
};

var Netflix$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs,
	Settings: Settings$5,
	default: Netflix
});

var Settings$4 = {
	Switch: true,
	Types: [
		"Translate",
		"External"
	],
	Languages: [
		"AUTO",
		"ZH"
	]
};
var Spotify = {
	Settings: Settings$4
};

var Spotify$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Settings: Settings$4,
	default: Spotify
});

var Settings$3 = {
	CacheSize: 20,
	ShowOnly: false,
	Position: "Reverse",
	Offset: 0,
	Tolerance: 1000
};
var Composite = {
	Settings: Settings$3
};

var Composite$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Settings: Settings$3,
	default: Composite
});

var Settings$2 = {
	Vendor: "Google",
	ShowOnly: false,
	Position: "Forward",
	CacheSize: 10,
	Method: "Part",
	Times: 3,
	Interval: 500,
	Exponential: true
};
var Translate = {
	Settings: Settings$2
};

var Translate$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Settings: Settings$2,
	default: Translate
});

var Settings$1 = {
	SubVendor: "URL",
	LrcVendor: "NeteaseMusic",
	CacheSize: 50
};
var External = {
	Settings: Settings$1
};

var External$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Settings: Settings$1,
	default: External
});

var Settings = {
	GoogleCloud: {
		Version: "v2",
		Mode: "Key",
		Auth: ""
	},
	Microsoft: {
		Version: "Azure",
		Mode: "Token",
		Region: "",
		Auth: ""
	},
	DeepL: {
		Version: "Free",
		Auth: ""
	},
	DeepLX: {
		Endpoint: "",
		Auth: ""
	},
	URL: "",
	NeteaseMusic: {
		PhoneNumber: "",
		Password: ""
	}
};
var API = {
	Settings: Settings
};

var API$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Settings: Settings,
	default: API
});

var Database$1 = Database = {
	"Default": Default$1,
	"Universal": Universal$1,
	"YouTube": YouTube$1,
	"Netflix": Netflix$1,
	"Spotify": Spotify$1,
	"Composite": Composite$1,
	"Translate": Translate$1,
	"External": External$1,
	"API": API$1,
};

function detectPlatform(url) {
	console.log(`☑️ Detect Platform`, "");
	/***************** Platform *****************/
	let Platform = /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
		: /(\.youtube|youtubei\.googleapis)\.com/i.test(url) ? "YouTube"
			: /\.spotify(cdn)?\.com/i.test(url) ? "Spotify"
				: /\.apple\.com/i.test(url) ? "Apple"
					: /\.(dssott|starott)\.com/i.test(url) ? "Disney+"
						: /primevideo\.com|(\.(pv-cdn|aiv-cdn|akamaihd|cloudfront)\.net)|s3\.amazonaws\.com\/aiv-prod-timedtext\//i.test(url) ? "PrimeVideo"
							: /prd\.media\.h264\.io/i.test(url) ? "Max"
								: /\.(api\.hbo|hbomaxcdn)\.com/i.test(url) ? "HBOMax"
									: /\.hulu(stream|im)?\.com/i.test(url) ? "Hulu"
										: /\.cbs(aavideo|cbsivideo)?\.com/i.test(url) ? "Paramount+"
											: /\.uplynk\.com/i.test(url) ? "Discovery+"
												: /dplus-ph-/i.test(url) ? "Discovery+Ph"
													: /\.peacocktv\.com/i.test(url) ? "PeacockTV"
														: /\.fubo\.tv/i.test(url) ? "FuboTV"
															: /\.viki\.io/i.test(url) ? "Viki"
																: /epix(hls\.akamaized\.net|\.services\.io)/i.test(url) ? "MGM+"
																	: /\.nebula\.app/i.test(url) ? "Nebula"
																		: /\.pluto(\.tv|tv\.net)/i.test(url) ? "PlutoTV"
																			: /\.mubicdn\.net/i.test(url) ? "MUBI"
																				: "Universal";
    console.log(`✅ Detect Platform, Platform: ${Platform}`, "");
	return Platform;
}

/**
 * Get Storage Variables
 * @link https://github.com/NanoCat-Me/ENV/blob/main/getStorage.mjs
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {Array} names - Platform Names
 * @param {Object} database - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getStorage(key, names, database) {
    //console.log(`☑️ ${this.name}, Get Environment Variables`, "");
    /***************** BoxJs *****************/
    // 包装为局部变量，用完释放内存
    // BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
    let BoxJs = $Storage.getItem(key, database);
    //console.log(`🚧 ${this.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
    /***************** Argument *****************/
    let Argument = {};
    if (typeof $argument !== "undefined") {
        if (Boolean($argument)) {
            //console.log(`🎉 ${this.name}, $Argument`);
            let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=").map(i => i.replace(/\"/g, ''))));
            //console.log(JSON.stringify(arg));
            for (let item in arg) Lodash.set(Argument, item, arg[item]);
            //console.log(JSON.stringify(Argument));
        }        //console.log(`✅ ${this.name}, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
    }    /***************** Store *****************/
    const Store = { Settings: database?.Default?.Settings || {}, Configs: database?.Default?.Configs || {}, Caches: {} };
    if (!Array.isArray(names)) names = [names];
    //console.log(`🚧 ${this.name}, Get Environment Variables`, `names类型: ${typeof names}`, `names内容: ${JSON.stringify(names)}`, "");
    for (let name of names) {
        Store.Settings = { ...Store.Settings, ...database?.[name]?.Settings, ...Argument, ...BoxJs?.[name]?.Settings };
        Store.Configs = { ...Store.Configs, ...database?.[name]?.Configs };
        if (BoxJs?.[name]?.Caches && typeof BoxJs?.[name]?.Caches === "string") BoxJs[name].Caches = JSON.parse(BoxJs?.[name]?.Caches);
        Store.Caches = { ...Store.Caches, ...BoxJs?.[name]?.Caches };
    }    //console.log(`🚧 ${this.name}, Get Environment Variables`, `Store.Settings类型: ${typeof Store.Settings}`, `Store.Settings: ${JSON.stringify(Store.Settings)}`, "");
    traverseObject(Store.Settings, (key, value) => {
        //console.log(`🚧 ${this.name}, traverseObject`, `${key}: ${typeof value}`, `${key}: ${JSON.stringify(value)}`, "");
        if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
        else if (typeof value === "string") {
            if (value.includes(",")) value = value.split(",").map(item => string2number(item)); // 字符串转数组转数字
            else value = string2number(value); // 字符串转数字
        }        return value;
    });
    //console.log(`✅ ${this.name}, Get Environment Variables`, `Store: ${typeof Store.Caches}`, `Store内容: ${JSON.stringify(Store)}`, "");
    return Store;

    /***************** function *****************/
    function traverseObject(o, c) { for (var t in o) { var n = o[t]; o[t] = "object" == typeof n && null !== n ? traverseObject(n, c) : c(t, n); } return o }
    function string2number(string) { if (string && !isNaN(string)) string = parseInt(string, 10); return string }
}

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {Object} $ - ENV
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platforms, database) {
	console.log(`☑️ Set Environment Variables`, "");
	let { Settings, Caches, Configs } = getStorage(name, platforms, database);
	/***************** Settings *****************/
	if (!Array.isArray(Settings?.Types)) Settings.Types = (Settings.Types) ? [Settings.Types] : []; // 只有一个选项时，无逗号分隔
	console.log(`✅ Set Environment Variables, Settings: ${typeof Settings}, Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//console.log(`✅ Set Environment Variables, Caches: ${typeof Caches}, Caches内容: ${JSON.stringify(Caches)}`, "");
	if (typeof Caches?.Playlists !== "object" || Array.isArray(Caches?.Playlists)) Caches.Playlists = {}; // 创建Playlists缓存
	Caches.Playlists.Master = new Map(JSON.parse(Caches?.Playlists?.Master || "[]")); // Strings转Array转Map
	Caches.Playlists.Subtitle = new Map(JSON.parse(Caches?.Playlists?.Subtitle || "[]")); // Strings转Array转Map
	if (typeof Caches?.Subtitles !== "object") Caches.Subtitles = new Map(JSON.parse(Caches?.Subtitles || "[]")); // Strings转Array转Map
	if (typeof Caches?.Metadatas !== "object" || Array.isArray(Caches?.Metadatas)) Caches.Metadatas = {}; // 创建Playlists缓存
	if (typeof Caches?.Metadatas?.Tracks !== "object") Caches.Metadatas.Tracks = new Map(JSON.parse(Caches?.Metadatas?.Tracks || "[]")); // Strings转Array转Map
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
}

/**
 * is Standard?
 * Determine whether Standard Media Player
 * @author VirgilClyne
 * @param {String} _url - Parsed Request URL
 * @param {Object} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
function isStandard(url = {}, headers = {}, platform = "Universal") {
	console.log(`☑️ is Standard?`, "");
    // 判断设备类型
	const UA = headers["user-agent"] ?? headers["User-Agent"];
	console.log(`🚧 is Standard?, UA: ${UA}`, "");
    let device = UA.includes("Mozilla/5.0") ? "Web"
        : UA.includes("iPhone") ? "iPhone"
            : UA.includes("iPad") ? "iPad"
                : UA.includes("Macintosh") ? "Macintosh"
                    : UA.includes("AppleTV") ? "AppleTV"
                        : UA.includes("Apple TV") ? "AppleTV"
                            : "iPhone";
    switch (platform) {
        case "Max":
        case "HBOMax":
            if (headers["x-hbo-device-name"]?.includes("ios")) device = "iPhone";
            else if (url.query?.["device-code"] === "iphone") device = "iPhone";
            break;
        case "PeacockTV":
            if (UA.includes("PeacockMobile")) device = "iPhone";
            break;
    }    // 判断是否标准播放器
    let standard = true;
    switch (device) {
        case "iPhone":
        case "iPad":
        case "Macintosh":
            switch (platform) {
                case "Max":
                case "HBOMax":
                case "Viki":
                case "PeacockTV":
                case "FuboTV":
                case "MUBI":
                    standard = false;
                    break;
                case "TED":
                default:
                    standard = true;
                    break;
            }            break;
        case "Web":
            switch (platform) {
                case "Max":
                case "HBOMax":
                case "FuboTV":
                case "TED":
                case "MUBI":
                    standard = false;
                    break;
                case "Viki":
                case "PeacockTV":
                default:
                    standard = true;
                    break;
            }            break;
        case "AppleTV":
        default:
            standard = true;
            break;
    }	console.log(`✅ is Standard?, standard: ${standard}, device: ${device}`, "");
	return {standard, device};
}

/**
 * detect Format
 * @author VirgilClyne
 * @param {Object} m3u8 - Parsed M3U8
 * @return {String} type - type
 */
function detectPlaylist(m3u8 = {}) {
	console.log(`☑️ detectPlaylist`, "");
	let type = undefined;
	m3u8.forEach(item => {
		switch (item.TAG) {
			case "#EXT-X-MEDIA":
			case "#EXT-X-STREAM-INF":
				type = "Multivariant Playlist";
				break;
			case "#EXT-X-PLAYLIST-TYPE":
			case "EXT-X-TARGETDURATION":
			case "#EXTINF":
				type = "Media Playlist";
				break;
		}	});
	console.log(`✅ detectPlaylist, type: ${type}`, "");
	return type;
}

/**
 * Set Cache
 * @author VirgilClyne
 * @param {Map} cache - Playlists Cache / Subtitles Cache
 * @param {Number} cacheSize - Cache Size
 * @return {Boolean} isSaved
 */
function setCache(cache, cacheSize = 100) {
	console.log(`☑️ Set Cache, cacheSize: ${cacheSize}`, "");
	cache = Array.from(cache || []); // Map转Array
	cache = cache.slice(-cacheSize); // 限制缓存大小
	console.log(`✅ Set Cache`, "");
	return cache;
}

/**
 * Set DualSubs Subtitle Options
 * @author VirgilClyne
 * @param {String} platform - platform
 * @param {Array} playlist1 - Subtitles Playlist (Languages 0)
 * @param {Array} playlist2 - Subtitles Playlist (Languages 1)
 * @param {Array} enabledTypes - Enabled Types
 * @param {Array} translateTypes - Translate Types
 * @param {String} Standard - Standard
 * @param {String} device - Device
 * @return {Promise<*>}
 */
function setOption(playlist1 = {}, playlist2 = {}, type = "", platform = "", standard = true, device = "iPhone") {
	console.log(`☑️ Set DualSubs Subtitle Option, type: ${type}`, "");
	const NAME1 = playlist1?.OPTION?.NAME.trim(), NAME2 = playlist2?.OPTION?.NAME.trim();
	const LANGUAGE1 = playlist1?.OPTION?.LANGUAGE.trim(), LANGUAGE2 = playlist2?.OPTION?.LANGUAGE.trim();
	// 复制此语言选项
	let newOption = JSON.parse(JSON.stringify(playlist1));
	// 修改名称
	switch (type) {
		case "Official":
			newOption.OPTION.NAME = `官方字幕 (${NAME1}/${NAME2})`;
			break;
		case "Translate":
			newOption.OPTION.NAME = `翻译字幕 (${NAME1}/${NAME2})`;
			break;
		case "External":
			newOption.OPTION.NAME = `外挂字幕 (${NAME1})`;
			break;
	}	// 修改语言代码
	switch (platform) {
		case "Apple": // AVKit 语言列表名称显示为LANGUAGE字符串 自动映射LANGUAGE为本地语言NAME 不按LANGUAGE区分语言
		case "MGM+": // AVKit 语言列表名称显示为LANGUAGE字符串 自动映射LANGUAGE为本地语言NAME
			switch (device) {
				case "Web":
				case "Macintosh":
					newOption.OPTION.LANGUAGE = LANGUAGE1;
					break;
				default:
					//newOption.OPTION.LANGUAGE = `${NAME1}/${NAME2} [${type}]`;
					newOption.OPTION.LANGUAGE = `${type} (${LANGUAGE1}/${LANGUAGE2})`;
					break;
			}			break;
		case "Disney+": // AppleCoreMedia 语言列表名称显示为NAME字符串 自动映射NAME为本地语言NAME 按LANGUAGE区分语言
		case "PrimeVideo": // AppleCoreMedia 语言列表名称显示为NAME字符串 按LANGUAGE区分语言
		case "Hulu": // AppleCoreMedia 语言列表名称显示为LANGUAGE字符串 自动映射LANGUAGE为本地语言NAME 空格分割
		case "Nebula":  // AppleCoreMedia 语言列表名称显示为LANGUAGE字符串 自动映射LANGUAGE为本地语言NAME
		case "PlutoTV": // AppleCoreMedia 语言列表名称显示为NAME字符串 按LANGUAGE区分语言
			newOption.OPTION.LANGUAGE = `${type} (${LANGUAGE1}/${LANGUAGE2})`;
			break;
		case "Max": // AppleCoreMedia
		case "HBOMax": // AppleCoreMedia
		case "Viki":
			//if (!standard) newOption.OPTION.NAME = NAME1;
			newOption.OPTION.LANGUAGE = LANGUAGE1;
			//if (!standard) delete newOption.OPTION["ASSOC-LANGUAGE"];
			break;
		case "Paramount+":
		case "Discovery+Ph":
			//newOption.OPTION.NAME = `${NAME1} / ${NAME2} [${type}]`;
			newOption.OPTION.LANGUAGE = `${type} (${LANGUAGE1}/${LANGUAGE2})`;
			//newOption.OPTION["ASSOC-LANGUAGE"] = `${LANGUAGE2} [${type}]`;
			break;
        case "MUBI":
            newOption.OPTION.LANGUAGE = `${type} (${LANGUAGE1}/${LANGUAGE2})`;
            if (!standard) newOption.OPTION.NAME = NAME1;
            break;
		default:
			newOption.OPTION.LANGUAGE = LANGUAGE1;
			break;
	}	// 增加/修改类型参数
	//const separator = (newOption?.OPTION?.CHARACTERISTICS) ? "," : "";
	//newOption.OPTION.CHARACTERISTICS += `${separator ?? ""}DualSubs.${type}`;
	// 增加副语言
	newOption.OPTION["ASSOC-LANGUAGE"] = LANGUAGE2;
	// 修改链接
	const symbol = (newOption.OPTION.URI.includes("?")) ? "&" : "?";
	newOption.OPTION.URI += `${symbol}subtype=${type}`;
	//if (!standard) newOption.OPTION.URI += `&lang=${LANGUAGE1}`;
	// 自动选择
	newOption.OPTION.AUTOSELECT = "YES";
	// 兼容性修正
	if (!standard) newOption.OPTION.DEFAULT = "YES";
	console.log(`✅ Set DualSubs Subtitle Option, newOption: ${JSON.stringify(newOption)}`, "");
	return newOption;
}

const $ = new ENV("🍿️ DualSubs: 🎦 Universal v1.1.0(4) Manifest.response.beta");

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method; URL.host; URL.path; URL.paths;
$.log(`⚠ METHOD: ${METHOD}`, "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
(async () => {
	// 获取平台
	const PLATFORM = detectPlatform($request.url);
	$.log(`⚠ PLATFORM: ${PLATFORM}`, "");
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Composite"], Database$1);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 兼容性判断
			const { standard: STANDARD, device: DEVICE } = isStandard(URL, $request.headers, PLATFORM);
			// 创建空数据
			let body = {};
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
					// 序列化M3U8
					body = EXTM3U.parse($response.body);
					//$.log(`🚧 M3U8.parse($response.body): ${JSON.stringify(body)}`, "");
					// 获取播放列表类型
					switch (detectPlaylist(body)) {
						case "Multivariant Playlist":
							// 读取已存数据
							let playlistCache = Caches.Playlists.Master.get($request.url) || {};
							// 获取特定语言的字幕
							playlistCache[Languages[0]] = getAttrList($request.url, body, "SUBTITLES", Configs.Languages[Languages[0]]);
							playlistCache[Languages[1]] = getAttrList($request.url, body, "SUBTITLES", Configs.Languages[Languages[1]]);
							// 写入数据
							Caches.Playlists.Master.set($request.url, playlistCache);
							// 格式化缓存
							Caches.Playlists.Master = setCache(Caches.Playlists.Master, Settings.CacheSize);
							// 写入持久化储存
							$Storage.setItem(`@DualSubs.${"Composite"}.Caches.Playlists.Master`, Caches.Playlists.Master);
							// 写入选项
							body = setAttrList(body, playlistCache, Settings.Types, Languages, PLATFORM, STANDARD, DEVICE);
							break;
						case "Media Playlist":
							// 处理类型
							switch (Type) {
								case "Official":
									$.log(`⚠ 官方字幕`, "");
									// 获取字幕播放列表m3u8缓存（map）
									const { subtitlesPlaylist, subtitlesPlaylistIndex } = getPlaylistCache($request.url, Caches.Playlists.Master, Languages[0]) ?? getPlaylistCache($request.url, Caches.Playlists.Master, Languages[1]);
									// 写入字幕文件地址vtt缓存（map）
									Caches.Playlists.Subtitle = await setSubtitlesCache(Caches.Playlists.Subtitle, subtitlesPlaylist, Languages[0], subtitlesPlaylistIndex, PLATFORM);
									Caches.Playlists.Subtitle = await setSubtitlesCache(Caches.Playlists.Subtitle, subtitlesPlaylist, Languages[1], subtitlesPlaylistIndex, PLATFORM);
									// 格式化缓存
									Caches.Playlists.Subtitle = setCache(Caches?.Playlists.Subtitle, Settings.CacheSize);
									// 写入缓存
									$Storage.setItem(`@DualSubs.${"Composite"}.Caches.Playlists.Subtitle`, Caches.Playlists.Subtitle);
									break;
								case "Translate":
								default:
									$.log(`⚠ 翻译字幕`, "");
									break;
								case "External":
									$.log(`⚠ 外挂字幕`, "");
									break;
							}							// WebVTT.m3u8加参数
							body = body.map((item, i) => {
								if (/^.+\.((web)?vtt|ttml2?|xml|smi)(\?.+)?$/.test(item?.URI)) {
									const symbol = (item.URI.includes("?")) ? "&" : "?";
									if (!/empty|blank|default/.test(item.URI)) {
										if (URL.query?.lang) item.URI += `${symbol}subtype=${Type}&lang=${URL.query.lang}`;
										else item.URI += `${symbol}subtype=${Type}`;
									}									if (item.TAG === "#EXT-X-BYTERANGE") body[i - 1].URI = item.URI; // 删除BYTERANGE
									else return item;
								} else return item;
							});
							break;
					}					// 字符串M3U8
					$response.body = EXTM3U.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					// 判断平台
					switch (PLATFORM) {
						case "PrimeVideo":
							if (body?.subtitleUrls) {
								let matchList = [];
								//查询是否有符合语言的内容
								for (let langcode of Configs.Languages[Languages[0]]) {
									$.log(`🚧 Get Attribute List`, "for (let langcode of langcodes)", `langcode: ${langcode}`, "");
									matchList = body?.subtitleUrls.filter(subtitleUrl => subtitleUrl?.languageCode?.toLowerCase() === langcode?.toLowerCase());
									if (matchList.length !== 0) break;
								}								$.log(`🚧 matchList: ${JSON.stringify(matchList)}`, "");
								if (matchList.length !== 0) {
									matchList = matchList.map(subtitleUrl => {
										subtitleUrl = JSON.parse(JSON.stringify(subtitleUrl));
										subtitleUrl.displayName = `翻译字幕 (${subtitleUrl.displayName}/${Languages[1]})`;
										const symbol = (subtitleUrl.url.includes("?")) ? "&" : "?";
										subtitleUrl.url += `${symbol}subtype=${"Translate"}`;
										subtitleUrl.url += `&lang=${subtitleUrl.languageCode.toUpperCase()}`;
										$.log(`🚧 subtitleUrl: ${JSON.stringify(subtitleUrl)}`, "");
										return subtitleUrl;
									});
									$.log(`🚧 matchList: ${JSON.stringify(matchList)}`, "");
									body.subtitleUrls.unshift(...matchList);
								}							}							break;
					}					$.log(`🚧 body: ${JSON.stringify(body)}`, "");
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					break;
			}			break;
		case false:
			break;
	}})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response));

/***************** Function *****************/
/**
 * Get Attribute List
 * @author VirgilClyne
 * @param {String} url - Request URL
 * @param {Object} m3u8 - Parsed M3U8
 * @param {String} type - Content Type
 * @param {Array} langCodes - Language Codes Array
 * @return {Array} datas
 */
function getAttrList(url = "", m3u8 = {}, type = "", langCodes = []) {
	$.log(`☑️ Get Attribute List`, `langCodes: ${langCodes}`, "");
	let attrList = m3u8
		.filter(item => item?.TAG === "#EXT-X-MEDIA") // 过滤标签
		.filter(item => item?.OPTION?.TYPE === type) // 过滤类型
		.filter(item => item?.OPTION?.FORCED !== "YES"); // 过滤强制内容
	//$.log(`🚧 attrList: ${JSON.stringify(attrList)}`, "");
	let matchList = [];
	//查询是否有符合语言的内容
	for (let langcode of langCodes) {
		$.log(`🚧 Get Attribute List`, "for (let langcode of langcodes)", `langcode: ${langcode}`, "");
		matchList = attrList.filter(item => item?.OPTION?.LANGUAGE?.toLowerCase() === langcode?.toLowerCase());
		if (matchList.length !== 0) break;
	}	matchList = matchList.map(data => {
		data.URL = aPath(url, data?.OPTION?.URI ?? null);
		return data;
	});
	$.log(`✅ Get Attribute List`, `matchList: ${JSON.stringify(matchList)}`, "");
	return matchList;
}
/**
 * Set Attribute List
 * @author VirgilClyne
 * @param {String} platform - Platform
 * @param {Object} m3u8 - Parsed m3u8
 * @param {Array} playlists1 - Primary (Source) Languages Playlists
 * @param {Array} playlists2 - Second (Target) Languages Playlists
 * @param {Array} types - Types
 * @param {Array} languages - Languages
 * @param {Boolean} Standard - Standard
 * @return {Object} m3u8
 */
function setAttrList(m3u8 = {}, playlists = {}, types = [], languages = [], platform = "", standard = true, device = "iPhone") {
	//types = (standard == true) ? types : ["Translate"];
	types = (standard == true) ? types : [types.at(-1)];
	const playlists1 = playlists?.[languages?.[0]];
	const playlists2 = playlists?.[languages?.[1]];
	//if (playlists1?.length !== 0) $.log(`🚧 Set Attribute List, 有主字幕语言（源语言）字幕`, "");
	//else types = types.filter(e => e !== "Translate"); // 无源语言字幕时删除翻译字幕选项
	//if (playlists2?.length !== 0) $.log(`🚧 Set Attribute List, 有副字幕语言（目标语言）字幕`, "");
	//else types = types.filter(e => e !== "Official"); // 无目标语言字幕时删除官方字幕选项
	$.log(`☑️ Set Attribute List`, `types: ${types}`, "");
	playlists1?.forEach(playlist1 => {
		const index1 = m3u8.findIndex(item => item?.OPTION?.URI === playlist1.OPTION.URI); // 主语言（源语言）字幕位置
		types.forEach(type => {
			$.log(`🚧 Set Attribute List, type: ${type}`, "");
			let option = {};
			switch (type) {
				case "Official":
					playlists2?.forEach(playlist2 => {
						//const index2 = m3u8.findIndex(item => item?.OPTION?.URI === playlist2.OPTION.URI); // 副语言（源语言）字幕位置
						if (playlist1?.OPTION?.["GROUP-ID"] === playlist2?.OPTION?.["GROUP-ID"]) {
							switch (platform) { // 兼容性修正
								case "Apple":
									if (playlist1?.OPTION.CHARACTERISTICS == playlist2?.OPTION.CHARACTERISTICS) {  // 只生成属性相同
										option = setOption(playlist1, playlist2, type, platform, standard, device);
										option.OPTION.URI += `&lang=${languages[0]}`;
									}									break;
								default:
									option = setOption(playlist1, playlist2, type, platform, standard, device);
									option.OPTION.URI += `&lang=${languages[0]}`;
									break;
							}						}					});
					break;
				case "Translate":
				case "External":
					const playlist2 = {
						"OPTION": {
							"TYPE": "SUBTITLES",
							//"GROUP-ID": playlist?.OPTION?.["GROUP-ID"],
							"NAME": playlists2?.[0]?.OPTION?.NAME ?? languages[1].toLowerCase(),
							"LANGUAGE": playlists2?.[0]?.OPTION?.LANGUAGE ?? languages[1].toLowerCase(),
							//"URI": playlist?.URI,
						}
					};
					option = setOption(playlist1, playlist2, type, platform, standard, device);
					option.OPTION.URI += `&lang=${playlist1?.OPTION?.LANGUAGE?.toUpperCase()}`;
					break;
			}			if (Object.keys(option).length !== 0) {
				if (standard) m3u8.splice(index1 + 1, 0, option);
				else m3u8.splice(index1, 1, option);
			}		});
	});
	//$.log(`✅ Set Attribute List`, `m3u8: ${JSON.stringify(m3u8)}`, "");
	$.log(`✅ Set Attribute List`, "");
	return m3u8;
}
/**
 * Get Playlist Cache
 * @author VirgilClyne
 * @param {String} url - Request URL / Master Playlist URL
 * @param {Map} cache - Playlist Cache
 * @param {String} language - Language
 * @return {Promise<Object>} { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex }
 */
function getPlaylistCache(url, cache, language) {
	$.log(`☑️ getPlaylistCache, language: ${language}`, "");
	let masterPlaylistURL = "";
	let subtitlesPlaylist = {};
	let subtitlesPlaylistIndex = 0;
	cache?.forEach((Value, Key) => {
		//$.log(`🚧 getPlaylistCache, Key: ${Key}, Value: ${JSON.stringify(Value)}`, "");
		if (Array.isArray(Value?.[language])) {
			let Array = Value?.[language];
			//$.log(`🚧 getPlaylistCache`, `Array: ${JSON.stringify(Array)}`, "");
			if (Array?.some((Object, Index) => {
				if (url.includes(Object?.URI ?? Object?.OPTION?.URI ?? null)) {
					subtitlesPlaylistIndex = Index;
					$.log(`🚧 getPlaylistCache`, `subtitlesPlaylistIndex: ${subtitlesPlaylistIndex}`, "");
					return true;
				} else return false;
			})) {
				masterPlaylistURL = Key;
				subtitlesPlaylist = Value;
				//$.log(`🚧 getPlaylistCache`, `masterPlaylistURL: ${masterPlaylistURL}`, `subtitlesPlaylist: ${JSON.stringify(subtitlesPlaylist)}`, "");
			}		}	});
	$.log(`✅ getPlaylistCache`, `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`, "");
	return { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex };
}
/**
 * Set Subtitles Cache
 * @author VirgilClyne
 * @param {Map} cache - Subtitles Cache
 * @param {Object} playlist - Subtitles Playlist Cache
 * @param {Array} language - Language
 * @param {Number} index - Subtitles Playlist Index
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<Object>} { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex }
 */
async function setSubtitlesCache(cache, playlist, language, index = 0, platform = "Universal") {
	$.log(`☑️ setSubtitlesCache, language: ${language}, index: ${index}`, "");
	await Promise.all(playlist?.[language]?.map(async (val, ind, arr) => {
		//$.log(`🚧 setSubtitlesCache, ind: ${ind}, val: ${JSON.stringify(val)}`, "");
		if ((arr[index] && (ind === index)) || (!arr[index])) {
			// 查找字幕文件地址vtt缓存（map）
			let subtitlesURLarray = cache.get(val.URL) ?? [];
			//$.log(`🚧 setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(subtitlesURLarray)}`, "");
			//$.log(`🚧 setSubtitlesCache`, `val?.URL: ${val?.URL}`, "");
			// 获取字幕文件地址vtt/ttml缓存（按语言）
			if (subtitlesURLarray.length === 0) subtitlesURLarray = await getSubtitles(val?.URL, $request.headers, platform);
			//$.log(`🚧 setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(subtitlesURLarray)}`, "");
			// 写入字幕文件地址vtt/ttml缓存到map
			if (subtitlesURLarray.length !== 0) cache = cache.set(val.URL, subtitlesURLarray);
			//$.log(`✅ setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(cache.get(val?.URL))}`, "");
			$.log(`✅ setSubtitlesCache`, `val?.URL: ${val?.URL}`, "");
		}	}));
	return cache;
}
/**
 * Get Subtitle *.vtt URLs
 * @author VirgilClyne
 * @param {String} url - VTT URL
 * @param {String} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
async function getSubtitles(url, headers, platform) {
	$.log(`☑️ Get Subtitle *.vtt *.ttml URLs`, "");
	let subtitles = await $.fetch(url, { headers: headers }).then((response, error) => {
		//$.log(`🚧 Get Subtitle *.vtt *.ttml URLs`, `response: ${JSON.stringify(response)}`, "");
		let subtitlePlayList = EXTM3U.parse(response.body);
		return subtitlePlayList
			.filter(({ URI }) => (/^.+\.((web)?vtt|ttml2?|xml|smi)(\?.+)?$/.test(URI)))
			.filter(({ URI }) => !URI.includes("empty"))
			.filter(({ URI }) => !URI.includes("blank"))
			.filter(({ URI }) => !URI.includes("default"))
			.map(({ URI }) => aPath(url, URI));
	});
	switch (platform) {
		case "Disney+":
			if (subtitles.some(item => /\/.+-MAIN\//.test(item))) subtitles = subtitles.filter(item => /\/.+-MAIN\//.test(item));
			break;
		case "PrimeVideo":
			if (subtitles.some(item => /\/aiv-prod-timedtext\//.test(item))) subtitles = subtitles.filter(item => /\/aiv-prod-timedtext\//.test(item));
			//Array.from(new Set(subtitles));
			subtitles = subtitles.filter((item, index, array) => {
				// 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
				return array.indexOf(item, 0) === index;
			}); // 数组去重
			break;
	}	$.log(`✅ Get Subtitle *.vtt *.ttml URLs, subtitles: ${subtitles}`, "");
	return subtitles;
}
// Get Absolute Path
function aPath(aURL = "", URL = "") { return (/^https?:\/\//i.test(URL)) ? URL : aURL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URL }
