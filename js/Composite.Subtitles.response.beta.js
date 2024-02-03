/* README: https://github.com/DualSubs */
class ENV {
	constructor(name, opts) {
		this.name = name;
		this.version = '1.3.1';
		this.data = null;
		this.dataFile = 'box.dat';
		this.logs = [];
		this.isMute = false;
		this.logSeparator = '\n';
		this.encoding = 'utf-8';
		this.startTime = new Date().getTime();
		Object.assign(this, opts);
		this.log('', `🏁 开始! ENV v${this.version}, ${this.name}`, '');
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

	toObj(str, defaultValue = null) {
		try {
			return JSON.parse(str)
		} catch {
			return defaultValue
		}
	}

	toStr(obj, defaultValue = null) {
		try {
			return JSON.stringify(obj)
		} catch {
			return defaultValue
		}
	}

	getjson(key, defaultValue) {
		let json = defaultValue;
		const val = this.getdata(key);
		if (val) {
			try {
				json = JSON.parse(this.getdata(key));
			} catch { }
		}
		return json
	}

	setjson(val, key) {
		try {
			return this.setdata(JSON.stringify(val), key)
		} catch {
			return false
		}
	}

	getScript(url) {
		return new Promise((resolve) => {
			this.get({ url }, (error, response, body) => resolve(body));
		})
	}

	runScript(script, runOpts) {
		return new Promise((resolve) => {
			let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi');
			httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi;
			let httpapi_timeout = this.getdata(
				'@chavy_boxjs_userCfgs.httpapi_timeout'
			);
			httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20;
			httpapi_timeout =
				runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout;
			const [key, addr] = httpapi.split('@');
			const opts = {
				url: `http://${addr}/v1/scripting/evaluate`,
				body: {
					script_text: script,
					mock_type: 'cron',
					timeout: httpapi_timeout
				},
				headers: { 'X-Key': key, 'Accept': '*/*' },
				timeout: httpapi_timeout
			};
			this.post(opts, (error, response, body) => resolve(body));
		}).catch((e) => this.logErr(e))
	}

	loaddata() {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs');
			this.path = this.path ? this.path : require('path');
			const curDirDataFilePath = this.path.resolve(this.dataFile);
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				this.dataFile
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

	writedata() {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs');
			this.path = this.path ? this.path : require('path');
			const curDirDataFilePath = this.path.resolve(this.dataFile);
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				this.dataFile
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
	}

	lodash_get(object = {}, path = "", defaultValue = undefined) {
		// translate array case to dot case, then split with .
		// a[0].b -> a.0.b -> ['a', '0', 'b']
		if (!Array.isArray(path)) path = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);

		const result = path.reduce((previousValue, currentValue) => {
			return Object(previousValue)[currentValue]; // null undefined get attribute will throwError, Object() can return a object 
		}, object);
		return (result === undefined) ? defaultValue : result;
	}

	lodash_set(object = {}, path = "", value) {
		if (!Array.isArray(path)) path = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
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

	getdata(key) {
		let val = this.getval(key);
		// 如果以 @
		if (/^@/.test(key)) {
			const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key);
			const objval = objkey ? this.getval(objkey) : '';
			if (objval) {
				try {
					const objedval = JSON.parse(objval);
					val = objedval ? this.lodash_get(objedval, paths, '') : val;
				} catch (e) {
					val = '';
				}
			}
		}
		return val
	}

	setdata(val, key) {
		let issuc = false;
		if (/^@/.test(key)) {
			const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key);
			const objdat = this.getval(objkey);
			const objval = objkey
				? objdat === 'null'
					? null
					: objdat || '{}'
				: '{}';
			try {
				const objedval = JSON.parse(objval);
				this.lodash_set(objedval, paths, val);
				issuc = this.setval(JSON.stringify(objedval), objkey);
			} catch (e) {
				const objedval = {};
				this.lodash_set(objedval, paths, val);
				issuc = this.setval(JSON.stringify(objedval), objkey);
			}
		} else {
			issuc = this.setval(val, key);
		}
		return issuc
	}

	getval(key) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
				return $persistentStore.read(key)
			case 'Quantumult X':
				return $prefs.valueForKey(key)
			case 'Node.js':
				this.data = this.loaddata();
				return this.data[key]
			default:
				return (this.data && this.data[key]) || null
		}
	}

	setval(val, key) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
				return $persistentStore.write(val, key)
			case 'Quantumult X':
				return $prefs.setValueForKey(val, key)
			case 'Node.js':
				this.data = this.loaddata();
				this.data[key] = val;
				this.writedata();
				return true
			default:
				return (this.data && this.data[key]) || null
		}
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
		switch (request.constructor) {
			case Object:
				break;
			case String:
				request = {
					"url": request,
					...option
				};
				break;
		}		if (!request.method) {
			request.method = "GET";
			if (request.body ?? request.bodyBytes) request.method = "POST";
		}		delete request.headers?.['Content-Length'];
		delete request.headers?.['content-length'];
		const method = request.method.toLocaleLowerCase();
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			default:
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
        }    };

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

	done(val = {}) {
		const endTime = new Date().getTime();
		const costTime = (endTime - this.startTime) / 1000;
		this.log('', `🚩 ${this.name}, 结束! 🕛 ${costTime} 秒`);
		this.log();
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			case 'Quantumult X':
			default:
				$done(val);
				break
			case 'Node.js':
				process.exit(1);
				break
		}
	}

	/**
	 * Get Environment Variables
	 * @link https://github.com/VirgilClyne/GetSomeFries/blob/main/function/getENV/getENV.js
	 * @author VirgilClyne
	 * @param {String} key - Persistent Store Key
	 * @param {Array} names - Platform Names
	 * @param {Object} database - Default Database
	 * @return {Object} { Settings, Caches, Configs }
	 */
	getENV(key, names, database) {
		//this.log(`☑️ ${this.name}, Get Environment Variables`, "");
		/***************** BoxJs *****************/
		// 包装为局部变量，用完释放内存
		// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
		let BoxJs = this.getjson(key, database);
		//this.log(`🚧 ${this.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
		/***************** Argument *****************/
		let Argument = {};
		if (typeof $argument !== "undefined") {
			if (Boolean($argument)) {
				//this.log(`🎉 ${this.name}, $Argument`);
				let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=").map(i => i.replace(/\"/g, ''))));
				//this.log(JSON.stringify(arg));
				for (let item in arg) this.lodash_set(Argument, item, arg[item]);
				//this.log(JSON.stringify(Argument));
			}			//this.log(`✅ ${this.name}, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
		}		/***************** Store *****************/
		const Store = { Settings: database?.Default?.Settings || {}, Configs: database?.Default?.Configs || {}, Caches: {} };
		if (!Array.isArray(names)) names = [names];
		//this.log(`🚧 ${this.name}, Get Environment Variables`, `names类型: ${typeof names}`, `names内容: ${JSON.stringify(names)}`, "");
		for (let name of names) {
			Store.Settings = { ...Store.Settings, ...database?.[name]?.Settings, ...Argument, ...BoxJs?.[name]?.Settings };
			Store.Configs = { ...Store.Configs, ...database?.[name]?.Configs };
			if (BoxJs?.[name]?.Caches && typeof BoxJs?.[name]?.Caches === "string") BoxJs[name].Caches = JSON.parse(BoxJs?.[name]?.Caches);
			Store.Caches = { ...Store.Caches, ...BoxJs?.[name]?.Caches };
		}		//this.log(`🚧 ${this.name}, Get Environment Variables`, `Store.Settings类型: ${typeof Store.Settings}`, `Store.Settings: ${JSON.stringify(Store.Settings)}`, "");
		this.traverseObject(Store.Settings, (key, value) => {
			//this.log(`🚧 ${this.name}, traverseObject`, `${key}: ${typeof value}`, `${key}: ${JSON.stringify(value)}`, "");
			if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
			else if (typeof value === "string") {
				if (value.includes(",")) value = value.split(",").map(item => this.string2number(item)); // 字符串转数组转数字
				else value = this.string2number(value); // 字符串转数字
			}			return value;
		});
		//this.log(`✅ ${this.name}, Get Environment Variables`, `Store: ${typeof Store.Caches}`, `Store内容: ${JSON.stringify(Store)}`, "");
		return Store;
	};

	/***************** function *****************/
	traverseObject(o, c) { for (var t in o) { var n = o[t]; o[t] = "object" == typeof n && null !== n ? this.traverseObject(n, c) : c(t, n); } return o }
	string2number(string) { if (string && !isNaN(string)) string = parseInt(string, 10); return string }
}

let URI$1 = class URI {
	constructor(opts = []) {
		this.name = "URI v1.2.6";
		this.opts = opts;
		this.json = { scheme: "", host: "", path: "", query: {} };
	};

	parse(url) {
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

	stringify(json = this.json) {
		let url = "";
		if (json?.scheme && json?.host) url += json.scheme + "://" + json.host;
		if (json?.path) url += (json?.host) ? "/" + json.path : json.path;
		if (json?.query) url += "?" + Object.entries(json.query).map(param => param.join("=")).join("&");
		return url
	};
};

// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/
let XML$1 = class XML {
	#ATTRIBUTE_KEY = "@";
	#CHILD_NODE_KEY = "#";
	#UNESCAPE = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&apos;": "'",
		"&quot;": '"'
	};
	#ESCAPE = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"'": "&apos;",
		'"': "&quot;"
	};

	constructor(opts) {
		this.name = "XML v0.4.0-2";
		this.opts = opts;
		BigInt.prototype.toJSON = () => this.toString();
	};

	parse(xml = new String, reviver = "") {
		const UNESCAPE = this.#UNESCAPE;
		const ATTRIBUTE_KEY = this.#ATTRIBUTE_KEY;
		const CHILD_NODE_KEY = this.#CHILD_NODE_KEY;
		const DOM = toDOM(xml);
		let json = fromXML(DOM, reviver);
		return json;

		/***************** Fuctions *****************/
		function toDOM(text) {
			const list = text.replace(/^[ \t]+/gm, "")
				.split(/<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/);
			const length = list.length;

			// root element
			const root = { children: [] };
			let elem = root;

			// dom tree stack
			const stack = [];

			// parse
			for (let i = 0; i < length;) {
				// text node
				const str = list[i++];
				if (str) appendText(str);

				// child node
				const tag = list[i++];
				if (tag) parseNode(tag);
			}
			return root;
			/***************** Fuctions *****************/
			function parseNode(tag) {
				const tags = tag.split(" ");
				const name = tags.shift();
				const length = tags.length;
				let child = {};
				switch (name[0]) {
					case "/":
						// close tag
						const closed = tag.replace(/^\/|[\s\/].*$/g, "").toLowerCase();
						while (stack.length) {
							const tagName = elem?.name?.toLowerCase?.();
							elem = stack.pop();
							if (tagName === closed) break;
						}
						break;
					case "?":
						// XML declaration
						child.name = name;
						child.raw = tags.join(" ");
						appendChild(child);
						break;
					case "!":
						if (/!\[CDATA\[(.+)\]\]/.test(tag)) {
							// CDATA section
							child.name = "!CDATA";
							//child.raw = tag.slice(9, -2);
							child.raw = tag.match(/!\[CDATA\[(.+)\]\]/);
							//appendText(tag.slice(9, -2));
						} else {
							// Comment section
							child.name = name;
							child.raw = tags.join(" ");
						}						appendChild(child);
						break;
					default:
						child = openTag(tag);
						appendChild(child);
						switch ((tags?.[length - 1] ?? name).slice(-1)) {
							case "/":
								//child.hasChild = false; // emptyTag
								delete child.children; // emptyTag
								break;
							default:
								switch (name) {
									case "link":
										//child.hasChild = false; // emptyTag
										delete child.children; // emptyTag
										break;
									default:
										stack.push(elem); // openTag
										elem = child;
										break;
								}								break;
						}						break;
				}
				function openTag(tag) {
					const elem = { children: [] };
					tag = tag.replace(/\s*\/?$/, "");
					const pos = tag.search(/[\s='"\/]/);
					if (pos < 0) {
						elem.name = tag;
					} else {
						elem.name = tag.substr(0, pos);
						elem.tag = tag.substr(pos);
					}
					return elem;
				}			}
			function appendText(str) {
				//str = removeSpaces(str);
				str = removeBreakLine(str);
				//str = str?.trim?.();
				if (str) appendChild(unescapeXML(str));

				function removeBreakLine(str) {
					return str?.replace?.(/^(\r\n|\r|\n|\t)+|(\r\n|\r|\n|\t)+$/g, "");
				}
			}

			function appendChild(child) {
				elem.children.push(child);
			}
		}		/***************** Fuctions *****************/
		function fromPlist(elem, reviver) {
			let object;
			switch (typeof elem) {
				case "string":
				case "undefined":
					object = elem;
					break;
				case "object":
					//default:
					const name = elem.name;
					const children = elem.children;

					object = {};

					switch (name) {
						case "plist":
							let plist = fromPlist(children[0], reviver);
							object = Object.assign(object, plist);
							break;
						case "dict":
							let dict = children.map(child => fromPlist(child, reviver));
							dict = chunk(dict, 2);
							object = Object.fromEntries(dict);
							break;
						case "array":
							if (!Array.isArray(object)) object = [];
							object = children.map(child => fromPlist(child, reviver));
							break;
						case "key":
							const key = children[0];
							object = key;
							break;
						case "true":
						case "false":
							const boolean = name;
							object = JSON.parse(boolean);
							break;
						case "integer":
							const integer = children[0];
							//object = parseInt(integer);
							object = BigInt(integer);
							break;
						case "real":
							const real = children[0];
							//const digits = real.split(".")[1]?.length || 0;
							object = parseFloat(real);//.toFixed(digits);
							break;
						case "string":
							const string = children[0];
							object = string;
							break;
					}					if (reviver) object = reviver(name || "", object);
					break;
			}
			return object;

			/** 
			 * Chunk Array
			 * @author VirgilClyne
			 * @param {Array} source - source
			 * @param {Number} length - number
			 * @return {Array<*>} target
			 */
			function chunk(source, length) {
				var index = 0, target = [];
				while (index < source.length) target.push(source.slice(index, index += length));
				return target;
			}		}

		function fromXML(elem, reviver) {
			let object;
			switch (typeof elem) {
				case "string":
				case "undefined":
					object = elem;
					break;
				case "object":
					//default:
					const raw = elem.raw;
					const name = elem.name;
					const tag = elem.tag;
					const children = elem.children;

					if (raw) object = raw;
					else if (tag) object = parseAttribute(tag, reviver);
					else if (!children) object = { [name]: undefined };
					else object = {};

					if (name === "plist") object = Object.assign(object, fromPlist(children[0], reviver));
					else children?.forEach?.((child, i) => {
						if (typeof child === "string") addObject(object, CHILD_NODE_KEY, fromXML(child, reviver), undefined);
						else if (!child.tag && !child.children && !child.raw) addObject(object, child.name, fromXML(child, reviver), children?.[i - 1]?.name);
						else addObject(object, child.name, fromXML(child, reviver), undefined);
					});
					if (children && children.length === 0) addObject(object, CHILD_NODE_KEY, null, undefined);
					/*
					if (Object.keys(object).length === 0) {
						if (elem.name) object[elem.name] = (elem.hasChild === false) ? null : "";
						else object = (elem.hasChild === false) ? null : "";
					}
					*/

					//if (Object.keys(object).length === 0) addObject(object, elem.name, (elem.hasChild === false) ? null : "");
					//if (Object.keys(object).length === 0) object = (elem.hasChild === false) ? undefined : "";
					if (reviver) object = reviver(name || "", object);
					break;
			}
			return object;
			/***************** Fuctions *****************/
			function parseAttribute(tag, reviver) {
				if (!tag) return;
				const list = tag.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/);
				const length = list.length;
				let attributes, val;

				for (let i = 0; i < length; i++) {
					let str = removeSpaces(list[i]);
					//let str = removeBreakLine(list[i]);
					//let str = list[i]?.trim?.();
					if (!str) continue;

					if (!attributes) {
						attributes = {};
					}

					const pos = str.indexOf("=");
					if (pos < 0) {
						// bare attribute
						str = ATTRIBUTE_KEY + str;
						val = null;
					} else {
						// attribute key/value pair
						val = str.substr(pos + 1).replace(/^\s+/, "");
						str = ATTRIBUTE_KEY + str.substr(0, pos).replace(/\s+$/, "");

						// quote: foo="FOO" bar='BAR'
						const firstChar = val[0];
						const lastChar = val[val.length - 1];
						if (firstChar === lastChar && (firstChar === "'" || firstChar === '"')) {
							val = val.substr(1, val.length - 2);
						}

						val = unescapeXML(val);
					}
					if (reviver) val = reviver(str, val);

					addObject(attributes, str, val);
				}

				return attributes;

				function removeSpaces(str) {
					//return str && str.replace(/^\s+|\s+$/g, "");
					return str?.trim?.();
				}
			}

			function addObject(object, key, val, prevKey = key) {
				if (typeof val === "undefined") return;
				else {
					const prev = object[prevKey];
					//const curr = object[key];
					if (Array.isArray(prev)) prev.push(val);
					else if (prev) object[prevKey] = [prev, val];
					else object[key] = val;
				}
			}
		}

		function unescapeXML(str) {
			return str.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g, function (str) {
				if (str[1] === "#") {
					const code = (str[2] === "x") ? parseInt(str.substr(3), 16) : parseInt(str.substr(2), 10);
					if (code > -1) return String.fromCharCode(code);
				}
				return UNESCAPE[str] || str;
			});
		}

	};

	stringify(json = new Object, tab = "") {
		this.#ESCAPE;
		const ATTRIBUTE_KEY = this.#ATTRIBUTE_KEY;
		const CHILD_NODE_KEY = this.#CHILD_NODE_KEY;
		let XML = "";
		for (let elem in json) XML += toXml(json[elem], elem, "");
		XML = tab ? XML.replace(/\t/g, tab) : XML.replace(/\t|\n/g, "");
		return XML;
		/***************** Fuctions *****************/
		function toXml(Elem, Name, Ind) {
			let xml = "";
			switch (typeof Elem) {
				case "object":
					if (Array.isArray(Elem)) {
						xml = Elem.reduce(
							(prevXML, currXML) => prevXML += `${Ind}${toXml(currXML, Name, `${Ind}\t`)}\n`,
							""
						);
					} else {
						let attribute = "";
						let hasChild = false;
						for (let name in Elem) {
							if (name[0] === ATTRIBUTE_KEY) {
								attribute += ` ${name.substring(1)}=\"${Elem[name].toString()}\"`;
								delete Elem[name];
							} else if (Elem[name] === undefined) Name = name;
							else hasChild = true;
						}
						xml += `${Ind}<${Name}${attribute}${(hasChild || Name === "link") ? "" : "/"}>`;

						if (hasChild) {
							if (Name === "plist") xml += toPlist(Elem, Name, `${Ind}\t`);
							else {
								for (let name in Elem) {
									switch (name) {
										case CHILD_NODE_KEY:
											xml += Elem[name] ?? "";
											break;
										default:
											xml += toXml(Elem[name], name, `${Ind}\t`);
											break;
									}								}							}							xml += (xml.slice(-1) === "\n" ? Ind : "") + `</${Name}>`;
						}					}					break;
				case "string":
					switch (Name) {
						case "?xml":
							xml += `${Ind}<${Name} ${Elem.toString()}>`;
							break;
						case "?":
							xml += `${Ind}<${Name}${Elem.toString()}${Name}>`;
							break;
						case "!":
							xml += `${Ind}<!--${Elem.toString()}-->`;
							break;
						case "!DOCTYPE":
							xml += `${Ind}<${Name} ${Elem.toString()}>`;
							break;
						case "!CDATA":
							xml += `${Ind}<![CDATA[${Elem.toString()}]]>`;
							break;
						case CHILD_NODE_KEY:
							xml += Elem;
							break;
						default:
							xml += `${Ind}<${Name}>${Elem.toString()}</${Name}>`;
							break;
					}					break;
				case "undefined":
					xml += Ind + `<${Name.toString()}/>`;
					break;
			}			return xml;
		}
		function toPlist(Elem, Name, Ind) {
			let plist = "";
			switch (typeof Elem) {
				case "boolean":
					plist = `${Ind}<${Elem.toString()}/>`;
					break;
				case "number":
					plist = `${Ind}<real>${Elem.toString()}</real>`;
					break;
				case "bigint":
					plist = `${Ind}<integer>${Elem.toString()}</integer>`;
					break;
				case "string":
					plist = `${Ind}<string>${Elem.toString()}</string>`;
					break;
				case "object":
					let array = "";
					if (Array.isArray(Elem)) {
						for (var i = 0, n = Elem.length; i < n; i++) array += `${Ind}${toPlist(Elem[i], Name, `${Ind}\t`)}`;
						plist = `${Ind}<array>${array}${Ind}</array>`;
					} else {
						let dict = "";
						Object.entries(Elem).forEach(([key, value]) => {
							dict += `${Ind}<key>${key}</key>`;
							dict += toPlist(value, key, Ind);
						});
						plist = `${Ind}<dict>${dict}${Ind}</dict>`;
					}					break;
			}
			return plist;
		}	};
};

// refer: https://www.w3.org/TR/webvtt1/
class WebVTT {
	constructor(opts = ["milliseconds", "timeStamp", "singleLine", "\n"]) {
		this.name = "WebVTT v2.1.4";
		this.opts = opts;
		this.lineBreak = (this.opts.includes("\n")) ? "\n" : (this.opts.includes("\r")) ? "\r" : (this.opts.includes("\r\n")) ? "\r\n" : "\n";
		this.vtt = new String;
		this.json = { headers: {}, comments: [], style: "", body: [] };
	};

	parse(vtt = this.vtt) {
		const WebVTT_cue_Regex = (this.opts.includes("milliseconds")) ? /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:.,]+) --> (?<endTime>[0-9:.,]+)) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/
			: /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:]+)[0-9.,]+ --> (?<endTime>[0-9:]+)[0-9.,]+) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/;
		const Array = vtt.split(/\r\n\r\n|\r\r|\n\n/);
		const Json = { headers: {}, comments: [], style: "", body: [] };

		Array.forEach(item => {
			item = item.trim();
			switch (item.substring(0, 5).trim()) {
				case "WEBVT": {
					let cues = item.split(/\r\n|\r|\n/);
					Json.headers.type = cues.shift();
					Json.headers.options = cues;
					break;
				}				case "NOTE": {
					Json.comments.push(item);
					break;
				}				case "STYLE": {
					let cues = item.split(/\r\n|\r|\n/);
					cues.shift();
					Json.style = cues.join(this.lineBreak);
					break;
				}				default:
					let cue = item.match(WebVTT_cue_Regex)?.groups;
					if (cue) {
						if (Json.headers?.type !== "WEBVTT") {
							cue.timing = cue?.timing?.replace?.(",", ".");
							cue.startTime = cue?.startTime?.replace?.(",", ".");
							cue.endTime = cue?.endTime?.replace?.(",", ".");
						}
						if (this.opts.includes("timeStamp")) {
							let ISOString = cue?.startTime?.replace?.(/(.*)/, "1970-01-01T$1Z");
							cue.timeStamp = this.opts.includes("milliseconds") ? Date.parse(ISOString) : Date.parse(ISOString) / 1000;
						}
						cue.text = cue?.text?.trimEnd?.();
						if (this.opts.includes("singleLine")) {
							cue.text = cue?.text?.replace?.(/\r\n|\r|\n/, " ");
						} else if (this.opts.includes("multiLine")) {
							cue.text = cue?.text?.split?.(/\r\n|\r|\n/);
						}
						Json.body.push(cue);
					}					break;
			}
		});
		return Json
	};

	stringify(json = this.json) {
		let vtt = [
			json.headers = [json.headers?.type || "", json.headers?.options || ""].flat(Infinity).join(this.lineBreak),
			json.comments = json?.comments?.join?.(this.lineBreak),
			json.style = (json?.style?.length > 0) ? ["STYLE", json.style].join(this.lineBreak) : "",
			json.body = json.body.map(item => {
				if (Array.isArray(item.text)) item.text = item.text.join(this.lineBreak);
				item = `${(item.index) ? item.index + this.lineBreak : ""}${item.timing} ${item?.settings ?? ""}${this.lineBreak}${item.text}`;
				return item;
			}).join(this.lineBreak + this.lineBreak)
		].join(this.lineBreak + this.lineBreak).trim() + this.lineBreak + this.lineBreak;
		return vtt
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
var Configs$4 = {
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
	Configs: Configs$4
};

var Default$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$4,
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
		"EN",
		"ZH"
	]
};
var Configs$3 = {
	Languages: {
		AUTO: "",
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
	Configs: Configs$3
};

var Universal$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$3,
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
var Configs$2 = {
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
	Configs: Configs$2
};

var YouTube$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$2,
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
var Configs$1 = {
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
	Configs: Configs$1
};

var Netflix$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$1,
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
var Composite$1 = {
	Settings: Settings$3
};

var Composite$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Settings: Settings$3,
	default: Composite$1
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
var Configs = {
	Languages: {
		Google: {
			AUTO: "auto",
			AF: "af",
			AM: "am",
			AR: "ar",
			AS: "as",
			AY: "ay",
			AZ: "az",
			BG: "bg",
			BE: "be",
			BM: "bm",
			BN: "bn",
			BHO: "bho",
			CS: "cs",
			DA: "da",
			DE: "de",
			EL: "el",
			EU: "eu",
			EN: "en",
			"EN-GB": "en",
			"EN-US": "en",
			"EN-US SDH": "en",
			ES: "es",
			"ES-419": "es",
			"ES-ES": "es",
			ET: "et",
			FI: "fi",
			FR: "fr",
			"FR-CA": "fr",
			HU: "hu",
			IS: "is",
			IT: "it",
			JA: "ja",
			KO: "ko",
			LT: "lt",
			LV: "lv",
			NL: "nl",
			NO: "no",
			PL: "pl",
			PT: "pt",
			"PT-PT": "pt",
			"PT-BR": "pt",
			PA: "pa",
			RO: "ro",
			RU: "ru",
			SK: "sk",
			SL: "sl",
			SQ: "sq",
			ST: "st",
			SV: "sv",
			TH: "th",
			TR: "tr",
			UK: "uk",
			UR: "ur",
			VI: "vi",
			ZH: "zh",
			"ZH-HANS": "zh-CN",
			"ZH-HK": "zh-TW",
			"ZH-HANT": "zh-TW"
		},
		Microsoft: {
			AUTO: "",
			AF: "af",
			AM: "am",
			AR: "ar",
			AS: "as",
			AY: "ay",
			AZ: "az",
			BG: "bg",
			BE: "be",
			BM: "bm",
			BN: "bn",
			BHO: "bho",
			CS: "cs",
			DA: "da",
			DE: "de",
			EL: "el",
			EU: "eu",
			EN: "en",
			"EN-GB": "en",
			"EN-US": "en",
			"EN-US SDH": "en",
			ES: "es",
			"ES-419": "es",
			"ES-ES": "es",
			ET: "et",
			FI: "fi",
			FR: "fr",
			"FR-CA": "fr-ca",
			HU: "hu",
			IS: "is",
			IT: "it",
			JA: "ja",
			KO: "ko",
			LT: "lt",
			LV: "lv",
			NL: "nl",
			NO: "no",
			PL: "pl",
			PT: "pt",
			"PT-PT": "pt-pt",
			"PT-BR": "pt",
			PA: "pa",
			RO: "ro",
			RU: "ru",
			SK: "sk",
			SL: "sl",
			SQ: "sq",
			ST: "st",
			SV: "sv",
			TH: "th",
			TR: "tr",
			UK: "uk",
			UR: "ur",
			VI: "vi",
			ZH: "zh-Hans",
			"ZH-HANS": "zh-Hans",
			"ZH-HK": "yue",
			"ZH-HANT": "zh-Hant"
		},
		DeepL: {
			AUTO: "",
			BG: "BG",
			CS: "CS",
			DA: "DA",
			DE: "de",
			EL: "el",
			EN: "EN",
			ES: "ES",
			ET: "ET",
			FI: "FI",
			FR: "FR",
			HU: "HU",
			IT: "IT",
			JA: "JA",
			KO: "ko",
			LT: "LT",
			LV: "LV",
			NL: "NL",
			PL: "PL",
			PT: "PT",
			RO: "RO",
			RU: "RU",
			SK: "SK",
			SL: "SL",
			SV: "SV",
			TR: "TR",
			ZH: "ZH"
		}
	}
};
var Translate = {
	Settings: Settings$2,
	Configs: Configs
};

var Translate$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs,
	Settings: Settings$2,
	default: Translate
});

var Settings$1 = {
	SubVendor: "URL",
	LrcVendor: "QQMusic",
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
	"Composite": Composite$2,
	"Translate": Translate$1,
	"External": External$1,
	"External": API$1,
};

/*
README: https://github.com/DualSubs
*/

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {Object} $ - ENV
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV($, name, platforms, database) {
	console.log(`☑️ Set Environment Variables`, "");
	let { Settings, Caches, Configs } = $.getENV(name, platforms, database);
	/***************** Settings *****************/
	if (!Array.isArray(Settings?.Types)) Settings.Types = (Settings.Types) ? [Settings.Types] : []; // 只有一个选项时，无逗号分隔
	if ($.isLoon() && platforms.includes("YouTube")) {
		Settings.AutoCC = $persistentStore.read("自动显示翻译字幕") ?? Settings.AutoCC;
		switch (Settings.AutoCC) {
			case "是":
				Settings.AutoCC = true;
				break;
			case "否":
				Settings.AutoCC = false;
				break;
		}		Settings.ShowOnly = $persistentStore.read("仅输出译文") ?? Settings.ShowOnly;
		switch (Settings.ShowOnly) {
			case "是":
				Settings.ShowOnly = true;
				break;
			case "否":
				Settings.ShowOnly = false;
				break;
		}		Settings.Position = $persistentStore.read("字幕译文位置") ?? Settings.Position;
		switch (Settings.Position) {
			case "译文位于外文之上":
				Settings.Position = "Forward";
				break;
			case "译文位于外文之下":
				Settings.Position = "Reverse";
				break;
		}	}	console.log(`✅ Set Environment Variables, Settings: ${typeof Settings}, Settings内容: ${JSON.stringify(Settings)}`, "");
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

function detectPlatform(url) {
	console.log(`☑️ Detect Platform`, "");
	/***************** Platform *****************/
	let Platform = /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
		: /(\.youtube|youtubei\.googleapis)\.com/i.test(url) ? "YouTube"
			: /\.spotify(cdn)?\.com/i.test(url) ? "Spotify"
				: /\.apple\.com/i.test(url) ? "Apple"
					: /\.(dssott|starott)\.com/i.test(url) ? "Disney+"
						: /(\.(pv-cdn|aiv-cdn|akamaihd|cloudfront)\.net)|s3\.amazonaws\.com\/aiv-prod-timedtext\//i.test(url) ? "PrimeVideo"
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
																		: /\.mubicdn\.net/i.test(url) ? "MUBI"
																			: "Universal";
    console.log(`✅ Detect Platform, Platform: ${Platform}`, "");
	return Platform;
}

/**
 * detect Format
 * @author VirgilClyne
 * @param {Object} url - Parsed URL
 * @param {String} body - response body
 * @return {String} format - format
 */
function detectFormat(url, body, format = undefined) {
	console.log(`☑️ detectFormat, format: ${url.format ?? url.query?.fmt ?? url.query?.format}`, "");
	switch (url.format ?? url.query?.fmt ?? url.query?.format) {
		case "txt":
			format = "text/plain";
			break;
		case "xml":
		case "srv3":
		case "ttml":
		case "ttml2":
		case "imsc":
			format = "text/xml";
			break;
		case "vtt":
		case "webvtt":
			format = "text/vtt";
			break;
		case "json":
		case "json3":
			format = "application/json";
			break;
		case "m3u":
		case "m3u8":
			format = "application/x-mpegurl";
			break;
		case "plist":
			format = "application/plist";
			break;
		case undefined:
			const HEADER = body?.substring?.(0, 6).trim?.();
			//console.log(`🚧 detectFormat, HEADER: ${HEADER}`, "");
			//console.log(`🚧 detectFormat, HEADER?.substring?.(0, 1): ${HEADER?.substring?.(0, 1)}`, "");
			switch (HEADER) {
				case "<?xml":
					format = "text/xml";
					break;
				case "WEBVTT":
					format = "text/vtt";
					break;
				default:
					switch (HEADER?.substring?.(0, 1)) {
						case "0":
						case "1":
						case "2":
						case "3":
						case "4":
						case "5":
						case "6":
						case "7":
						case "8":
						case "9":
							format = "text/vtt";
							break;
						case "{":
							format = "application/json";
							break;
					}					break;
				case undefined:
					break;
			}			break;
	}	console.log(`✅ detectFormat, format: ${format}`, "");
	return format;
}

/** 
 * Composite Subtitles
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Array} Format - options = ["json", "srv3", "vtt"]
 * @param {Array} Kind - options = ["asr", "captions"]
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} Position - Position = ["Forward", "Reverse"]
 * @return {String} DualSub
 */
function Composite(Sub1 = {}, Sub2 = {}, Format = "text/vtt", Kind = "captions", Offset = 0, Tolerance = 0, Position = "Forward") {
	console.log(`☑️ Composite Subtitles, Offset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
	//console.log(`🚧 Composite Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//console.log(`🚧 Composite Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
	let DualSub = Sub1;
	//console.log(`🚧 Composite Subtitles, let DualSub内容: ${JSON.stringify(DualSub)}`, "");
	// 有序数列 用不着排序
	//FirstSub.body.sort((x, y) => x - y);
	//SecondSub.body.sort((x, y) => x - y);
	let index0 = 0, index1 = 0, index2 = 0;
	// 双指针法查找两个数组中的相同元素
	switch (Format) {
		case "text/json":
		case "application/json": {
			const length1 = Sub1?.events?.length, length2 = Sub2?.events?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					console.log(`🚧 Composite Subtitles, DualSub是自动生成字幕`, "");
					index0 = 1, index1 = 1, index2 = 1;
					Sub1.events = Sub1.events.map(event => {
						if (event?.segs) {
							if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
						}						delete event.wWinId;
						return event;
					});
					Sub2.events = Sub2.events.map(event => {
						if (event?.segs) {
							if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
						}						delete event.wWinId;
						return event;
					});
					//break; 不要break，连续处理
				case "captions":
				default:
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//console.log(`🚧 Composite Subtitles, index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
						//console.log(`🚧 Composite Subtitles, timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							const text1 = Sub1.events[index1]?.segs?.[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs?.[0].utf8 ?? "";
							//console.log(`🚧 Composite Subtitles, text1: ${text1}, text2: ${text2}`, "");
							DualSub.events[index0].segs = [{ "utf8": (Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}` }];
							//console.log(`🚧 Composite Subtitles, DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
							//DualSub.body[index0].tStartMs = (Position === "Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.body[index0].index = (Position === "Reverse") ? index2 : index1;
						}						if (timeStamp2 > timeStamp1) index1++;
						else if (timeStamp2 < timeStamp1) index2++;
						else { index1++; index2++; }					}					break;
			}			break;
		}		case "text/xml":
		case "application/xml": {
			const length1 = Sub1?.timedtext?.body?.p?.length, length2 = Sub2?.timedtext?.body?.p?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					console.log(`☑️ Composite Subtitles, DualSub是自动生成字幕`, "");
					DualSub.timedtext.head.wp[1]["@rc"] = "1";
					Sub1.timedtext.body.p = Sub1.timedtext.body.p.map(para => {
						if (para?.s) {
							if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join("");
							else para["#"] = para.s?.["#"] ?? "";
							delete para.s;
						}						return para;
					});
					Sub2.timedtext.body.p = Sub2.timedtext.body.p.map(para => {
						if (para?.s) {
							if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join("");
							else para["#"] = para.s?.["#"] ?? "";
							delete para.s;
						}						return para;
					});
					//break; 不要break，连续处理
				case "captions":
				default:
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//console.log(`🚧 Composite Subtitles, index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10), timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
						//console.log(`🚧 Composite Subtitles, timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							const text1 = Sub1.timedtext.body.p[index1]?.["#"] ?? "", text2 = Sub2.timedtext.body.p[index2]?.["#"] ?? "";
							//console.log(`🚧 Composite Subtitles, text1: ${text1}, text2: ${text2}`, "");
							DualSub.timedtext.body.p[index0]["#"] = (Position === "Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`;
							//console.log(`🚧 Composite Subtitles, DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
							//DualSub.timedtext.body.p[index0]["@t"] = (Position === "Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.timedtext.body.p[index0].index = (Position === "Reverse") ? index2 : index1;
						}						if (timeStamp2 > timeStamp1) index1++;
						else if (timeStamp2 < timeStamp1) index2++;
						else { index1++; index2++; }					}					break;
			}			break;
		}		case "text/vtt":
		case "application/vtt": {
			const length1 = Sub1?.body?.length, length2 = Sub2?.body?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					console.log(`🚧 Combine Subtitles, DualSub是自动生成字幕`, "");
					// vtt字幕不需要特殊处理
					//break; 不要break，连续处理
				case "captions":
				default:
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//console.log(`🚧 Composite Subtitles, index1/length1: ${index1}/${length1}, index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
						//console.log(`🚧 Composite Subtitles, timeStamp1: ${timeStamp1}, timeStamp2: ${timeStamp2}`, "");
						// 处理普通字幕
						const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
						//console.log(`🚧 Composite Subtitles, text1: ${text1}, text2: ${text2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							DualSub.body[index0].text = (Position === "Reverse") ? `${text2}\n${text1}`: `${text1}\n${text2}`;
							//console.log(`🚧 Composite Subtitles, index0: ${index0}, text: ${DualSub.body[index0].text}`, "");
							//DualSub.body[index0].timeStamp = (Position === "Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.body[index0].index = (Position === "Reverse") ? index2 : index1;
						}						if (timeStamp2 > timeStamp1) index1++;
						else if (timeStamp2 < timeStamp1) index2++;
						else { index1++; index2++; }
					}					break;
			}			break;
		}	}	//console.log(`✅ Composite Subtitles, return DualSub内容: ${JSON.stringify(DualSub)}`, "");
	console.log(`✅ Composite Subtitles`, "");
	return DualSub;
}

const $ = new ENV("🍿️ DualSubs: 🎦 Universal v0.9.6(4) Composite.Subtitles.response.beta");
const URI = new URI$1();
const XML = new XML$1();
const VTT = new WebVTT(["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host; URL.path; const PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 获取平台
const PLATFORM = detectPlatform(HOST);
$.log(`⚠ ${$.name}, PLATFORM: ${PLATFORM}`, "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = detectFormat(URL, $response?.body, FORMAT);
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV($, "DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Composite", "API"], Database$1);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ ${$.name}, Type: ${Type}, Languages: ${Languages}`, "");
			// 创建字幕请求队列
			let requests = [];
			// 处理类型
			switch (Type) {
				case "Official":
					$.log(`⚠ ${$.name}`, "官方字幕", "");
					switch (PLATFORM) {
						default:
							// 获取字幕文件地址vtt缓存（map）
							const { subtitlesPlaylistURL } = getSubtitlesCache($request.url, Caches.Playlists.Subtitle);
							// 获取字幕播放列表m3u8缓存（map）
							const { masterPlaylistURL, subtitlesPlaylistIndex } = getPlaylistCache(subtitlesPlaylistURL, Caches.Playlists.Master, Languages);
							// 获取字幕文件地址vtt缓存（map）
							const { subtitlesURIArray0, subtitlesURIArray1 } = getSubtitlesArray(masterPlaylistURL, subtitlesPlaylistIndex, Caches.Playlists.Master, Caches.Playlists.Subtitle, Languages);
							// 获取官方字幕请求
							if (subtitlesURIArray1.length) {
								$.log(`🚧 ${$.name}, subtitlesURIArray1.length: ${subtitlesURIArray1.length}`, "");
								// 获取字幕文件名
								let fileName = PATHs?.[PATHs?.length - 1] ?? getSubtitlesFileName($request.url, PLATFORM);
								$.log(`🚧 ${$.name}, fileName: ${fileName}`, "");
								// 构造请求队列
								requests = constructSubtitlesQueue($request, fileName, subtitlesURIArray0, subtitlesURIArray1);
							}							break;
						case "YouTube":
							$.log(`🚧 ${$.name}`, "YouTube", "");
							switch (URL.query?.tlang) {
								case undefined:
									$.log(`⚠ ${$.name}, 未选择翻译语言，跳过`, "");
									break;
								default:
									$.log(`⚠ ${$.name}, 已选择翻译语言`, "");
									// 设置参数
									Settings.Offset = 0;
									Settings.Tolerance = 100;
									Settings.Position = (Settings.Position === "Reverse") ? "Forward" : "Reverse"; // 链接主字幕为翻译字幕，副字幕为原字幕，所以需要翻转一下
									switch (Settings.ShowOnly) {
										case true:
											$.log(`⚠ ${$.name}, 仅显示翻译后字幕，跳过`, "");
											break;
										case false:
										default:
											$.log(`⚠ ${$.name}, 生成双语字幕`, "");
											// 获取字幕
											URL.query.lang = Caches.Playlists.Subtitle.get(URL.query?.v) ?? URL.query.lang; // 主语言
											delete URL.query?.tlang; // 原字幕
											let request = {
												"url": URI.stringify(URL),
												"headers": $request.headers
											};
											requests.push(request);
											break;
									}							}							break;
						case "Netflix":
							$.log(`🚧 ${$.name}`, "Netflix", "");
							break;
						case "Bilibili":
							$.log(`🚧 ${$.name}`, "Bilibili", "");
							break;
					}					break;
				case "Translate":
				default:
					$.log(`🚧 ${$.name}, 翻译字幕`, "");
					break;
				case "External":
					$.log(`🚧 ${$.name}, 外挂字幕`, "");
					let request = {
						"url": Settings.URL,
						"headers": {
							"Accept": "*/*",
							"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1"
						}
					};
					requests.push(request);
					break;
			}			// 创建字幕Object
			let OriginSub = {}, SecondSub = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				case "text/html":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					//body = M3U8.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					OriginSub = XML.parse($response.body);
					//$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					for await (let request of requests) {
						SecondSub = await $.fetch(request).then(response => XML.parse(response.body));
						//$.log(`🚧 ${$.name}`, `SecondSub: ${JSON.stringify(SecondSub)}`, "");
						OriginSub = Composite(OriginSub, SecondSub, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					}					//$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					$response.body = XML.stringify(OriginSub);
					break;
				case "text/vtt":
				case "application/vtt":
					OriginSub = VTT.parse($response.body);
					$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					for await (let request of requests) {
						SecondSub = await $.fetch(request).then(response => VTT.parse(response.body));
						$.log(`🚧 ${$.name}`, `SecondSub: ${JSON.stringify(SecondSub)}`, "");
						OriginSub = Composite(OriginSub, SecondSub, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					}					$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					$response.body = VTT.stringify(OriginSub);
					break;
				case "text/json":
				case "application/json":
					OriginSub = JSON.parse($response.body ?? "{}");
					//$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					for await (let request of requests) {
						SecondSub = await $.fetch(request).then(response => JSON.parse(response.body));
						//$.log(`🚧 ${$.name}`, `SecondSub: ${JSON.stringify(SecondSub)}`, "");
						OriginSub = Composite(OriginSub, SecondSub, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					}					//$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					$response.body = JSON.stringify(OriginSub);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					//$.log(`🚧 ${$.name}`, `$response.body: ${JSON.stringify($response.body)}`, "");
					//let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//$.log(`🚧 ${$.name}`, `isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					// 写入二进制数据
					//$.log(`🚧 ${$.name}, 调试信息`, `rawBody: ${JSON.stringify(rawBody)}`, "");
					//if ($.isQuanX()) $response.bodyBytes = rawBody
					//else $response.body = rawBody;
					break;
			}			break;
		case false:
			break;
	}})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		switch ($response) {
			default: { // 有回复数据，返回回复数据
				//const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];
				$.log(`🎉 ${$.name}, finally`, `$response`, `FORMAT: ${FORMAT}`, "");
				//$.log(`🚧 ${$.name}, finally`, `$response: ${JSON.stringify($response)}`, "");
				if ($response?.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response?.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				if ($.isQuanX()) {
					switch (FORMAT) {
						case undefined: // 视为无body
							// 返回普通数据
							$.done({ status: $response.status, headers: $response.headers });
							break;
						default:
							// 返回普通数据
							$.done({ status: $response.status, headers: $response.headers, body: $response.body });
							break;
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "application/octet-stream":
							// 返回二进制数据
							//$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
							$.done({ status: $response.status, headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
							break;
					}				} else $.done($response);
				break;
			}			case undefined: { // 无回复数据
				break;
			}		}	});

/***************** Function *****************/
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
			if (Array.isArray(Value?.[language])) {
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
				}			}		});
	});
	$.log(`✅ ${$.name}, getPlaylistCache`, `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`, "");
	return { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex };
}
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
		if (Array.isArray(Value)) {
			let Array = Value;
			if (Array?.some((String, Index) => {
				if (url.includes(String || null)) {
					subtitlesIndex = Index;
					$.log(`🚧 ${$.name}, getSubtitlesCache`, `subtitlesIndex: ${subtitlesIndex}`, "");
					return true;
				} else return false;
			})) {
				subtitlesPlaylistURL = Key;
				subtitles = Value;
				//$.log(`🚧 ${$.name}, getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
			}		}	});
	$.log(`✅ ${$.name}, getSubtitlesCache, subtitlesPlaylistURL: ${subtitlesPlaylistURL}`, "");
	return { subtitlesPlaylistURL, subtitles, subtitlesIndex };
}
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
}
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
			fileName = request.url.match(/.+_(subtitles(_V\d)?-\d+\.webvtt)\?(.*)subtype=/)[1]; // Apple 片段分型序号不同
			break;
		case "Disney+":
			fileName = request.url.match(/([^\/]+\.vtt)\?(.*)subtype=/)[1]; // Disney+ 片段名称相同
			break;
		case "Hulu":
			fileName = request.url.match(/.+_(SEGMENT\d+_.+\.vtt)\?(.*)subtype=/)[1]; // Hulu 片段分型序号相同
			break;
		case "PrimeVideo":
		case "HBOMax":
		default:
			fileName = null; // Amazon Prime Video HBO_Max不拆分字幕片段
			break;
	}	$.log(`✅ ${$.name}, Get Subtitles FileName`, `fileName: ${fileName}`, "");
	return fileName;
}
/**
 * Construct Subtitles Queue
 * @author VirgilClyne
 * @param {String} fileName - Request URL
 * @param {Array} VTTs1 - Primary (Source) Language Subtitles Array
 * @param {Array} VTTs2 - Second (Target) Language Subtitles Array
 * @return {Array<*>} Subtitles Requests Queue
 */
function constructSubtitlesQueue(request, fileName, VTTs1 = [], VTTs2 = []) {
	$.log(`☑️ ${$.name}`, `Construct Subtitles Queue, fileName: ${fileName}`, "");
	let requests = [];
	$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, VTTs1.length: ${VTTs1.length}, VTTs2.length: ${VTTs2.length}`, "");
	//$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, VTTs1: ${JSON.stringify(VTTs1)}, VTTs2.length: ${JSON.stringify(VTTs2)}`, "")
	// 查询当前字幕在原字幕队列中的位置
	const Index1 = VTTs1.findIndex(item => item?.includes(fileName));
	$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, Index1: ${Index1}`, "");
	switch (VTTs2.length) {
		case 0: // 长度为0，无须计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度为 0`, "");
			break;
		case 1: { // 长度为1，无须计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度为 1`, "");
			let request2 = {
				"url": VTTs2[0],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		}		case VTTs1.length: { // 长度相等，一一对应，无须计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度相等`, "");
			let request2 = {
				"url": VTTs2[Index1],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		}		default: { // 长度不等，需要计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度不等，需要计算`, "");
			// 计算当前字幕在原字幕队列中的百分比
			const Position1 = (Index1 + 1) / VTTs1.length; // 从 0 开始计数，所以要加 1
			$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, Position1: ${Position1}, Index2: ${Index1}/${VTTs1.length}`, "");
			// 根据百分比计算当前字幕在新字幕队列中的位置
			//let Index2 = VTTs2.findIndex(item => item.includes(fileName));
			const Index2 = Math.round(Position1 * VTTs2.length - 1); // 从 0 开始计数，所以要减 1
			$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, Position2: ${Position1}, Index2: ${Index2}/${VTTs2.length}`, "");
			// 获取两字幕队列长度差值
			const diffLength = VTTs2.length - VTTs1.length;
			// 获取当前字幕在新字幕队列中的前后1个字幕
			//const BeginIndex = (Index2 - 1 < 0) ? 0 : Index2 - 1, EndIndex = Index2 + 1;
			const BeginIndex = (Index2 > Index1) ? Index1 : Index2;
			const EndIndex = (Index2 > Index1) ? Index2 : Index1;
			$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, diffLength: ${diffLength}, BeginIndex: ${BeginIndex}, EndIndex: ${EndIndex}`, "");
			const nearlyVTTs = (diffLength < 0) ? VTTs2.slice((BeginIndex < diffLength) ? 0 : BeginIndex - diffLength, EndIndex + 1)
				: VTTs2.slice(BeginIndex, EndIndex + diffLength + 1); // slice 不取 EndIndex 本身
			$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, nearlyVTTs: ${JSON.stringify(nearlyVTTs)}`, "");
			nearlyVTTs.forEach(url => {
				let request2 = {
					"url": url,
					"headers": request.headers
				};
				requests.push(request2);
			});
			/*
			requests = nearlyVTTs.map(url => {
				let _request = {
					"url": url,
					"headers": request.headers
				};
				return _request;
			});
			*/
			break;
		}	}	//$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, requests: ${JSON.stringify(requests)}`, "");
	$.log(`✅ ${$.name}`, `Construct Subtitles Queue`, "");
	return requests;
}
