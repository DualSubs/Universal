/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ENV/ENV.mjs":
/*!*************************!*\
  !*** ./src/ENV/ENV.mjs ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Http: () => (/* binding */ Http),
/* harmony export */   "default": () => (/* binding */ ENV)
/* harmony export */ });
class ENV {
	constructor(name, opts) {
		this.name = name
		this.http = new Http(this)
		this.data = null
		this.dataFile = 'box.dat'
		this.logs = []
		this.isMute = false
		this.isNeedRewrite = false
		this.logSeparator = '\n'
		this.encoding = 'utf-8'
		this.startTime = new Date().getTime()
		Object.assign(this, opts)
		this.log('', `🏁 ${this.name}, ENV v1.1.0, 开始!`)
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
		let json = defaultValue
		const val = this.getdata(key)
		if (val) {
			try {
				json = JSON.parse(this.getdata(key))
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
			this.get({ url }, (error, response, body) => resolve(body))
		})
	}

	runScript(script, runOpts) {
		return new Promise((resolve) => {
			let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
			httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
			let httpapi_timeout = this.getdata(
				'@chavy_boxjs_userCfgs.httpapi_timeout'
			)
			httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
			httpapi_timeout =
				runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
			const [key, addr] = httpapi.split('@')
			const opts = {
				url: `http://${addr}/v1/scripting/evaluate`,
				body: {
					script_text: script,
					mock_type: 'cron',
					timeout: httpapi_timeout
				},
				headers: { 'X-Key': key, 'Accept': '*/*' },
				timeout: httpapi_timeout
			}
			this.post(opts, (error, response, body) => resolve(body))
		}).catch((e) => this.logErr(e))
	}

	loaddata() {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs')
			this.path = this.path ? this.path : require('path')
			const curDirDataFilePath = this.path.resolve(this.dataFile)
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				this.dataFile
			)
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
			if (isCurDirDataFile || isRootDirDataFile) {
				const datPath = isCurDirDataFile
					? curDirDataFilePath
					: rootDirDataFilePath
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
			this.fs = this.fs ? this.fs : require('fs')
			this.path = this.path ? this.path : require('path')
			const curDirDataFilePath = this.path.resolve(this.dataFile)
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				this.dataFile
			)
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
			const jsondata = JSON.stringify(this.data)
			if (isCurDirDataFile) {
				this.fs.writeFileSync(curDirDataFilePath, jsondata)
			} else if (isRootDirDataFile) {
				this.fs.writeFileSync(rootDirDataFilePath, jsondata)
			} else {
				this.fs.writeFileSync(curDirDataFilePath, jsondata)
			}
		}
	}

	lodash_get(source, path, defaultValue = undefined) {
		const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
		let result = source
		for (const p of paths) {
			result = Object(result)[p]
			if (result === undefined) {
				return defaultValue
			}
		}
		return result
	}

	lodash_set(obj, path, value) {
		if (Object(obj) !== obj) return obj
		if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
		path
			.slice(0, -1)
			.reduce(
				(a, c, i) =>
					Object(a[c]) === a[c]
						? a[c]
						: (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
				obj
			)[path[path.length - 1]] = value
		return obj
	}

	getdata(key) {
		let val = this.getval(key)
		// 如果以 @
		if (/^@/.test(key)) {
			const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
			const objval = objkey ? this.getval(objkey) : ''
			if (objval) {
				try {
					const objedval = JSON.parse(objval)
					val = objedval ? this.lodash_get(objedval, paths, '') : val
				} catch (e) {
					val = ''
				}
			}
		}
		return val
	}

	setdata(val, key) {
		let issuc = false
		if (/^@/.test(key)) {
			const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
			const objdat = this.getval(objkey)
			const objval = objkey
				? objdat === 'null'
					? null
					: objdat || '{}'
				: '{}'
			try {
				const objedval = JSON.parse(objval)
				this.lodash_set(objedval, paths, val)
				issuc = this.setval(JSON.stringify(objedval), objkey)
			} catch (e) {
				const objedval = {}
				this.lodash_set(objedval, paths, val)
				issuc = this.setval(JSON.stringify(objedval), objkey)
			}
		} else {
			issuc = this.setval(val, key)
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
				this.data = this.loaddata()
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
				this.data = this.loaddata()
				this.data[key] = val
				this.writedata()
				return true
			default:
				return (this.data && this.data[key]) || null
		}
	}

	initGotEnv(opts) {
		this.got = this.got ? this.got : require('got')
		this.cktough = this.cktough ? this.cktough : require('tough-cookie')
		this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
		if (opts) {
			opts.headers = opts.headers ? opts.headers : {}
			if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
				opts.cookieJar = this.ckjar
			}
		}
	}

	get(request, callback = () => { }) {
		delete request?.headers?.['Content-Length']
		delete request?.headers?.['content-length']

		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			default:
				if (this.isSurge() && this.isNeedRewrite) {
					this.lodash_set(request, 'headers.X-Surge-Skip-Scripting', false)
				}
				$httpClient.get(request, (error, response, body) => {
					if (!error && response) {
						response.body = body
						response.statusCode = response.status ? response.status : response.statusCode
						response.status = response.statusCode
					}
					callback(error, response, body)
				})
				break
			case 'Quantumult X':
				if (this.isNeedRewrite) {
					this.lodash_set(request, 'opts.hints', false)
				}
				$task.fetch(request).then(
					(response) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body,
							bodyBytes
						} = response
						callback(
							null,
							{ status, statusCode, headers, body, bodyBytes },
							body,
							bodyBytes
						)
					},
					(error) => callback((error && error.error) || 'UndefinedError')
				)
				break
			case 'Node.js':
				let iconv = require('iconv-lite')
				this.initGotEnv(request)
				this.got(request)
					.on('redirect', (response, nextOpts) => {
						try {
							if (response.headers['set-cookie']) {
								const ck = response.headers['set-cookie']
									.map(this.cktough.Cookie.parse)
									.toString()
								if (ck) {
									this.ckjar.setCookieSync(ck, null)
								}
								nextOpts.cookieJar = this.ckjar
							}
						} catch (e) {
							this.logErr(e)
						}
						// this.ckjar.setCookieSync(response.headers['set-cookie'].map(Cookie.parse).toString())
					})
					.then(
						(response) => {
							const {
								statusCode: status,
								statusCode,
								headers,
								rawBody
							} = response
							const body = iconv.decode(rawBody, this.encoding)
							callback(
								null,
								{ status, statusCode, headers, rawBody, body },
								body
							)
						},
						(err) => {
							const { message: error, response: response } = err
							callback(
								error,
								response,
								response && iconv.decode(response.rawBody, this.encoding)
							)
						}
					)
				break
		}
	}

	post(request, callback = () => { }) {
		const method = request.method
			? request.method.toLocaleLowerCase()
			: 'post'

		// 如果指定了请求体, 但没指定 `Content-Type`、`content-type`, 则自动生成。
		if (
			request.body &&
			request.headers &&
			!request.headers['Content-Type'] &&
			!request.headers['content-type']
		) {
			// HTTP/1、HTTP/2 都支持小写 headers
			request.headers['content-type'] = 'application/x-www-form-urlencoded'
		}
		// 为避免指定错误 `content-length` 这里删除该属性，由工具端 (HttpClient) 负责重新计算并赋值
		delete request?.headers?.['Content-Length']
		delete request?.headers?.['content-length']
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			default:
				if (this.isSurge() && this.isNeedRewrite) {
					this.lodash_set(request, 'headers.X-Surge-Skip-Scripting', false)
				}
				$httpClient[method](request, (error, response, body) => {
					if (!error && response) {
						response.body = body
						response.statusCode = response.status ? response.status : response.statusCode
						response.status = response.statusCode
					}
					callback(error, response, body)
				})
				break
			case 'Quantumult X':
				request.method = method
				if (this.isNeedRewrite) {
					this.lodash_set(request, 'opts.hints', false)
				}
				$task.fetch(request).then(
					(response) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body,
							bodyBytes
						} = response
						callback(
							null,
							{ status, statusCode, headers, body, bodyBytes },
							body,
							bodyBytes
						)
					},
					(error) => callback((error && error.error) || 'UndefinedError')
				)
				break
			case 'Node.js':
				let iconv = require('iconv-lite')
				this.initGotEnv(request)
				const { url, ..._request } = request
				this.got[method](url, _request).then(
					(response) => {
						const { statusCode: status, statusCode, headers, rawBody } = response
						const body = iconv.decode(rawBody, this.encoding)
						callback(
							null,
							{ status, statusCode, headers, rawBody, body },
							body
						)
					},
					(err) => {
						const { message: error, response: response } = err
						callback(
							error,
							response,
							response && iconv.decode(response.rawBody, this.encoding)
						)
					}
				)
				break
		}
	}
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
		const date = ts ? new Date(ts) : new Date()
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		}
		if (/(y+)/.test(format))
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + '').substr(4 - RegExp.$1.length)
			)
		for (let k in o)
			if (new RegExp('(' + k + ')').test(format))
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length == 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length)
				)
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
								rawopts.url || rawopts.openUrl || rawopts['open-url']
							return { url: openUrl }
						}
						case 'Loon': {
							let openUrl =
								rawopts.openUrl || rawopts.url || rawopts['open-url']
							let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
							return { openUrl, mediaUrl }
						}
						case 'Quantumult X': {
							let openUrl =
								rawopts['open-url'] || rawopts.url || rawopts.openUrl
							let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
							let updatePasteboard =
								rawopts['update-pasteboard'] || rawopts.updatePasteboard
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
		}
		if (!this.isMute) {
			switch (this.platform()) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Shadowrocket':
				default:
					$notification.post(title, subt, desc, toEnvOpts(opts))
					break
				case 'Quantumult X':
					$notify(title, subt, desc, toEnvOpts(opts))
					break
				case 'Node.js':
					break
			}
		}
		if (!this.isMuteLog) {
			let logs = ['', '==============📣系统通知📣==============']
			logs.push(title)
			subt ? logs.push(subt) : ''
			desc ? logs.push(desc) : ''
			console.log(logs.join('\n'))
			this.logs = this.logs.concat(logs)
		}
	}

	log(...logs) {
		if (logs.length > 0) {
			this.logs = [...this.logs, ...logs]
		}
		console.log(logs.join(this.logSeparator))
	}

	logErr(error) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			case 'Quantumult X':
			default:
				this.log('', `❗️ ${this.name}, 错误!`, error)
				break
			case 'Node.js':
				this.log('', `❗️${this.name}, 错误!`, error.stack)
				break
		}
	}

	wait(time) {
		return new Promise((resolve) => setTimeout(resolve, time))
	}

	done(val = {}) {
		const endTime = new Date().getTime()
		const costTime = (endTime - this.startTime) / 1000
		this.log('', `🚩 ${this.name}, 结束! 🕛 ${costTime} 秒`)
		this.log()
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Shadowrocket':
			case 'Quantumult X':
			default:
				$done(val)
				break
			case 'Node.js':
				process.exit(1)
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
				for (let item in arg) this.setPath(Argument, item, arg[item]);
				//this.log(JSON.stringify(Argument));
			};
			//this.log(`✅ ${this.name}, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
		};
		/***************** Store *****************/
		const Store = { Settings: database?.Default?.Settings || {}, Configs: database?.Default?.Configs || {}, Caches: {} };
		if (!Array.isArray(names)) names = [names];
		//this.log(`🚧 ${this.name}, Get Environment Variables`, `names类型: ${typeof names}`, `names内容: ${JSON.stringify(names)}`, "");
		for (let name of names) {
			Store.Settings = { ...Store.Settings, ...database?.[name]?.Settings, ...Argument, ...BoxJs?.[name]?.Settings };
			Store.Configs = { ...Store.Configs, ...database?.[name]?.Configs };
			if (BoxJs?.[name]?.Caches && typeof BoxJs?.[name]?.Caches === "string") BoxJs[name].Caches = JSON.parse(BoxJs?.[name]?.Caches);
			Store.Caches = { ...Store.Caches, ...BoxJs?.[name]?.Caches };
		};
		//this.log(`🚧 ${this.name}, Get Environment Variables`, `Store.Settings类型: ${typeof Store.Settings}`, `Store.Settings: ${JSON.stringify(Store.Settings)}`, "");
		this.traverseObject(Store.Settings, (key, value) => {
			//this.log(`🚧 ${this.name}, traverseObject`, `${key}: ${typeof value}`, `${key}: ${JSON.stringify(value)}`, "");
			if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
			else if (typeof value === "string") {
				if (value.includes(",")) value = value.split(",").map(item => this.string2number(item)); // 字符串转数组转数字
				else value = this.string2number(value); // 字符串转数字
			};
			return value;
		});
		//this.log(`✅ ${this.name}, Get Environment Variables`, `Store: ${typeof Store.Caches}`, `Store内容: ${JSON.stringify(Store)}`, "");
		return Store;
	};

	/***************** function *****************/
	setPath(object, path, value) { path.split(".").reduce((o, p, i) => o[p] = path.split(".").length === ++i ? value : o[p] || {}, object) }
	traverseObject(o, c) { for (var t in o) { var n = o[t]; o[t] = "object" == typeof n && null !== n ? this.traverseObject(n, c) : c(t, n) } return o }
	string2number(string) { if (string && !isNaN(string)) string = parseInt(string, 10); return string }
}

class Http {
	constructor(env) {
		this.env = env
	}

	send(opts, method = 'GET') {
		opts = typeof opts === 'string' ? { url: opts } : opts
		let sender = this.get
		if (method === 'POST') {
			sender = this.post
		}
		return new Promise((resolve, reject) => {
			sender.call(this, opts, (error, response, body) => {
				if (error) reject(error)
				else resolve(response)
			})
		})
	}

	get(opts) {
		return this.send.call(this.env, opts)
	}

	post(opts) {
		return this.send.call(this.env, opts, 'POST')
	}
}


/***/ }),

/***/ "./src/URI/URI.mjs":
/*!*************************!*\
  !*** ./src/URI/URI.mjs ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ URI)
/* harmony export */ });
class URI {
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
}


/***/ }),

/***/ "./src/WebVTT/WebVTT.mjs":
/*!*******************************!*\
  !*** ./src/WebVTT/WebVTT.mjs ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebVTT)
/* harmony export */ });
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
			: /^((?<index>\d+)(\r\n|\r|\n))?(?<timing>(?<startTime>[0-9:]+)[0-9.,]+ --> (?<endTime>[0-9:]+)[0-9.,]+) ?(?<settings>.+)?[^](?<text>[\s\S]*)?$/
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
				};
				case "NOTE": {
					Json.comments.push(item);
					break;
				};
				case "STYLE": {
					let cues = item.split(/\r\n|\r|\n/);
					cues.shift();
					Json.style = cues.join(this.lineBreak);
					break;
				};
				default:
					let cue = item.match(WebVTT_cue_Regex)?.groups;
					if (cue) {
						if (Json.headers?.type !== "WEBVTT") {
							cue.timing = cue?.timing?.replace?.(",", ".");
							cue.startTime = cue?.startTime?.replace?.(",", ".");
							cue.endTime = cue?.endTime?.replace?.(",", ".");
						}
						if (this.opts.includes("timeStamp")) {
							let ISOString = cue?.startTime?.replace?.(/(.*)/, "1970-01-01T$1Z")
							cue.timeStamp = this.opts.includes("milliseconds") ? Date.parse(ISOString) : Date.parse(ISOString) / 1000;
						}
						cue.text = cue?.text?.trimEnd?.();
						if (this.opts.includes("singleLine")) {
							cue.text = cue?.text?.replace?.(/\r\n|\r|\n/, " ");
						} else if (this.opts.includes("multiLine")) {
							cue.text = cue?.text?.split?.(/\r\n|\r|\n/);
						}
						Json.body.push(cue);
					};
					break;
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
};


/***/ }),

/***/ "./src/XML/XML.mjs":
/*!*************************!*\
  !*** ./src/XML/XML.mjs ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ XML)
/* harmony export */ });
// refer: https://github.com/Peng-YM/QuanX/blob/master/Tools/XMLParser/xml-parser.js
// refer: https://goessner.net/download/prj/jsonxml/
class XML {
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
						};
						appendChild(child);
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
								};
								break;
						};
						break;
				};

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
				};
			};

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
		};
		/***************** Fuctions *****************/
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
							object = Object.assign(object, plist)
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
							object = parseFloat(real)//.toFixed(digits);
							break;
						case "string":
							const string = children[0];
							object = string;
							break;
					};
					if (reviver) object = reviver(name || "", object);
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
			};
		}

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
						if (typeof child === "string") addObject(object, CHILD_NODE_KEY, fromXML(child, reviver), undefined)
						else if (!child.tag && !child.children && !child.raw) addObject(object, child.name, fromXML(child, reviver), children?.[i - 1]?.name)
						else addObject(object, child.name, fromXML(child, reviver), undefined)
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
		const ESCAPE = this.#ESCAPE;
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
									};
								};
							};
							xml += (xml.slice(-1) === "\n" ? Ind : "") + `</${Name}>`;
						};
					};
					break;
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
					};
					break;
				case "undefined":
					xml += Ind + `<${Name.toString()}/>`;
					break;
			};
			return xml;
		};

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
					};
					break;
			}
			return plist;
		};
	};
}


/***/ }),

/***/ "./src/function/detectFormat.mjs":
/*!***************************************!*\
  !*** ./src/function/detectFormat.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectFormat)
/* harmony export */ });
/**
 * detect Format
 * @author VirgilClyne
 * @param {Object} url - Parsed URL
 * @param {String} body - response body
 * @return {String} format - format
 */
function detectFormat(url, body) {
	let format = undefined;
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
						case undefined:
						default:
							break;
					};
					break;
				case undefined:
					break;
			};
			break;
	};
	console.log(`✅ detectFormat, format: ${format}`, "");
	return format;
};


/***/ }),

/***/ "./src/function/detectPlatform.mjs":
/*!*****************************************!*\
  !*** ./src/function/detectPlatform.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectPlatform)
/* harmony export */ });
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
									: /\.(hulustream|huluim)\.com/i.test(url) ? "Hulu"
										: /\.(cbsaavideo|cbsivideo|cbs)\.com/i.test(url) ? "Paramount+"
											: /\.uplynk\.com/i.test(url) ? "Discovery+"
												: /dplus-ph-/i.test(url) ? "Discovery+Ph"
													: /\.peacocktv\.com/i.test(url) ? "PeacockTV"
														: /\.fubo\.tv/i.test(url) ? "FuboTV"
															: /\.viki\.io/i.test(url) ? "Viki"
																: /(epixhls\.akamaized\.net|epix\.services\.io)/i.test(url) ? "MGM+"
																	: /\.nebula\.app|/i.test(url) ? "Nebula"
																		: "Universal";
    console.log(`✅ Detect Platform, Platform: ${Platform}`, "");
	return Platform;
};


/***/ }),

/***/ "./src/function/setENV.mjs":
/*!*********************************!*\
  !*** ./src/function/setENV.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setENV)
/* harmony export */ });
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/*
README: https://github.com/DualSubs
*/


const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: Set Environment Variables");

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platforms, database) {
	$.log(`☑️ ${$.name}`, "");
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
			default:
				break;
		};
		Settings.ShowOnly = $persistentStore.read("仅输出译文") ?? Settings.ShowOnly;
		switch (Settings.ShowOnly) {
			case "是":
				Settings.ShowOnly = true;
				break;
			case "否":
				Settings.ShowOnly = false;
				break;
			default:
				break;
		};
		Settings.Position = $persistentStore.read("字幕译文位置") ?? Settings.Position;
		switch (Settings.Position) {
			case "译文位于外文之上":
				Settings.Position = "Forward";
				break;
			case "译文位于外文之下":
				Settings.Position = "Reverse";
				break;
			default:
				break;
		};
	};
	$.log(`✅ ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//$.log(`✅ ${$.name}, Set Environment Variables`, `Caches: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	if (typeof Caches?.Playlists !== "object" || Array.isArray(Caches?.Playlists)) Caches.Playlists = {}; // 创建Playlists缓存
	Caches.Playlists.Master = new Map(JSON.parse(Caches?.Playlists?.Master || "[]")); // Strings转Array转Map
	Caches.Playlists.Subtitle = new Map(JSON.parse(Caches?.Playlists?.Subtitle || "[]")); // Strings转Array转Map
	if (typeof Caches?.Subtitles !== "object") Caches.Subtitles = new Map(JSON.parse(Caches?.Subtitles || "[]")); // Strings转Array转Map
	if (typeof Caches?.Metadatas !== "object" || Array.isArray(Caches?.Metadatas)) Caches.Metadatas = {}; // 创建Playlists缓存
	if (typeof Caches?.Metadatas?.Tracks !== "object") Caches.Metadatas.Tracks = new Map(JSON.parse(Caches?.Metadatas?.Tracks || "[]")); // Strings转Array转Map
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
};


/***/ }),

/***/ "./src/database/Database.json":
/*!************************************!*\
  !*** ./src/database/Database.json ***!
  \************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"Default":{"Settings":{"Switch":true,"Type":"Translate","Types":["Official","Translate"],"Languages":["EN","ZH"],"CacheSize":50}},"Universal":{"Settings":{"Switch":true,"Types":["Official","Translate"],"Languages":["EN","ZH"]},"Configs":{"Languages":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]}}},"YouTube":{"Settings":{"Switch":true,"Type":"Official","Types":["Translate","External"],"Languages":["AUTO","ZH"],"AutoCC":true,"ShowOnly":false},"Configs":{"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IS":"is-IS","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","YUE":"yue","YUE-HK":"yue-HK","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW"},"translationLanguages":{"DESKTOP":[{"languageCode":"sq","languageName":{"simpleText":"Shqip - 阿尔巴尼亚语"}},{"languageCode":"ak","languageName":{"simpleText":"Ákán - 阿肯语"}},{"languageCode":"ar","languageName":{"simpleText":"العربية - 阿拉伯语"}},{"languageCode":"am","languageName":{"simpleText":"አማርኛ - 阿姆哈拉语"}},{"languageCode":"as","languageName":{"simpleText":"অসমীয়া - 阿萨姆语"}},{"languageCode":"az","languageName":{"simpleText":"آذربايجان ديلی - 阿塞拜疆语"}},{"languageCode":"ee","languageName":{"simpleText":"Èʋegbe - 埃维语"}},{"languageCode":"ay","languageName":{"simpleText":"Aymar aru - 艾马拉语"}},{"languageCode":"ga","languageName":{"simpleText":"Gaeilge - 爱尔兰语"}},{"languageCode":"et","languageName":{"simpleText":"Eesti - 爱沙尼亚语"}},{"languageCode":"or","languageName":{"simpleText":"ଓଡ଼ିଆ - 奥里亚语"}},{"languageCode":"om","languageName":{"simpleText":"Afaan Oromoo - 奥罗莫语"}},{"languageCode":"eu","languageName":{"simpleText":"Euskara - 巴斯克语"}},{"languageCode":"be","languageName":{"simpleText":"Беларуская - 白俄罗斯语"}},{"languageCode":"bg","languageName":{"simpleText":"Български - 保加利亚语"}},{"languageCode":"nso","languageName":{"simpleText":"Sesotho sa Leboa - 北索托语"}},{"languageCode":"is","languageName":{"simpleText":"Íslenska - 冰岛语"}},{"languageCode":"pl","languageName":{"simpleText":"Polski - 波兰语"}},{"languageCode":"bs","languageName":{"simpleText":"Bosanski - 波斯尼亚语"}},{"languageCode":"fa","languageName":{"simpleText":"فارسی - 波斯语"}},{"languageCode":"bho","languageName":{"simpleText":"भोजपुरी - 博杰普尔语"}},{"languageCode":"ts","languageName":{"simpleText":"Xitsonga - 聪加语"}},{"languageCode":"tt","languageName":{"simpleText":"Татарча - 鞑靼语"}},{"languageCode":"da","languageName":{"simpleText":"Dansk - 丹麦语"}},{"languageCode":"de","languageName":{"simpleText":"Deutsch - 德语"}},{"languageCode":"dv","languageName":{"simpleText":"ދިވެހިބަސް - 迪维希语"}},{"languageCode":"ru","languageName":{"simpleText":"Русский - 俄语"}},{"languageCode":"fr","languageName":{"simpleText":"français - 法语"}},{"languageCode":"sa","languageName":{"simpleText":"संस्कृतम् - 梵语"}},{"languageCode":"fil","languageName":{"simpleText":"Filipino - 菲律宾语"}},{"languageCode":"fi","languageName":{"simpleText":"suomi - 芬兰语"}},{"languageCode":"km","languageName":{"simpleText":"ភាសាខ្មែរ - 高棉语"}},{"languageCode":"ka","languageName":{"simpleText":"ქართული - 格鲁吉亚语"}},{"languageCode":"gu","languageName":{"simpleText":"ગુજરાતી - 古吉拉特语"}},{"languageCode":"gn","languageName":{"simpleText":"Avañe\'ẽ - 瓜拉尼语"}},{"languageCode":"kk","languageName":{"simpleText":"Қазақ тілі - 哈萨克语"}},{"languageCode":"ht","languageName":{"simpleText":"Kreyòl ayisyen - 海地克里奥尔语"}},{"languageCode":"ko","languageName":{"simpleText":"한국어 - 韩语"}},{"languageCode":"ha","languageName":{"simpleText":"هَوُسَ - 豪萨语"}},{"languageCode":"nl","languageName":{"simpleText":"Nederlands - 荷兰语"}},{"languageCode":"gl","languageName":{"simpleText":"Galego - 加利西亚语"}},{"languageCode":"ca","languageName":{"simpleText":"català - 加泰罗尼亚语"}},{"languageCode":"cs","languageName":{"simpleText":"čeština - 捷克语"}},{"languageCode":"kn","languageName":{"simpleText":"ಕನ್ನಡ - 卡纳达语"}},{"languageCode":"ky","languageName":{"simpleText":"кыргыз тили - 吉尔吉斯语"}},{"languageCode":"xh","languageName":{"simpleText":"isiXhosa - 科萨语"}},{"languageCode":"co","languageName":{"simpleText":"corsu - 科西嘉语"}},{"languageCode":"hr","languageName":{"simpleText":"hrvatski - 克罗地亚语"}},{"languageCode":"qu","languageName":{"simpleText":"Runa Simi - 克丘亚语"}},{"languageCode":"ku","languageName":{"simpleText":"Kurdî - 库尔德语"}},{"languageCode":"la","languageName":{"simpleText":"lingua latīna - 拉丁语"}},{"languageCode":"lv","languageName":{"simpleText":"latviešu valoda - 拉脱维亚语"}},{"languageCode":"lo","languageName":{"simpleText":"ພາສາລາວ - 老挝语"}},{"languageCode":"lt","languageName":{"simpleText":"lietuvių kalba - 立陶宛语"}},{"languageCode":"ln","languageName":{"simpleText":"lingála - 林加拉语"}},{"languageCode":"lg","languageName":{"simpleText":"Luganda - 卢干达语"}},{"languageCode":"lb","languageName":{"simpleText":"Lëtzebuergesch - 卢森堡语"}},{"languageCode":"rw","languageName":{"simpleText":"Kinyarwanda - 卢旺达语"}},{"languageCode":"ro","languageName":{"simpleText":"Română - 罗马尼亚语"}},{"languageCode":"mt","languageName":{"simpleText":"Malti - 马耳他语"}},{"languageCode":"mr","languageName":{"simpleText":"मराठी - 马拉地语"}},{"languageCode":"mg","languageName":{"simpleText":"Malagasy - 马拉加斯语"}},{"languageCode":"ml","languageName":{"simpleText":"മലയാളം - 马拉雅拉姆语"}},{"languageCode":"ms","languageName":{"simpleText":"bahasa Melayu - 马来语"}},{"languageCode":"mk","languageName":{"simpleText":"македонски јазик - 马其顿语"}},{"languageCode":"mi","languageName":{"simpleText":"te reo Māori - 毛利语"}},{"languageCode":"mn","languageName":{"simpleText":"Монгол хэл - 蒙古语"}},{"languageCode":"bn","languageName":{"simpleText":"বাংলা - 孟加拉语"}},{"languageCode":"my","languageName":{"simpleText":"ဗမာစာ - 缅甸语"}},{"languageCode":"hmn","languageName":{"simpleText":"Hmoob - 苗语"}},{"languageCode":"af","languageName":{"simpleText":"Afrikaans - 南非荷兰语"}},{"languageCode":"st","languageName":{"simpleText":"Sesotho - 南索托语"}},{"languageCode":"ne","languageName":{"simpleText":"नेपाली - 尼泊尔语"}},{"languageCode":"no","languageName":{"simpleText":"Norsk - 挪威语"}},{"languageCode":"pa","languageName":{"simpleText":"ਪੰਜਾਬੀ - 旁遮普语"}},{"languageCode":"pt","languageName":{"simpleText":"Português - 葡萄牙语"}},{"languageCode":"ps","languageName":{"simpleText":"پښتو - 普什图语"}},{"languageCode":"ny","languageName":{"simpleText":"chiCheŵa - 齐切瓦语"}},{"languageCode":"ja","languageName":{"simpleText":"日本語 - 日语"}},{"languageCode":"sv","languageName":{"simpleText":"Svenska - 瑞典语"}},{"languageCode":"sm","languageName":{"simpleText":"Gagana fa\'a Samoa - 萨摩亚语"}},{"languageCode":"sr","languageName":{"simpleText":"Српски језик - 塞尔维亚语"}},{"languageCode":"si","languageName":{"simpleText":"සිංහල - 僧伽罗语"}},{"languageCode":"sn","languageName":{"simpleText":"ChiShona - 绍纳语"}},{"languageCode":"eo","languageName":{"simpleText":"Esperanto - 世界语"}},{"languageCode":"sk","languageName":{"simpleText":"slovenčina - 斯洛伐克语"}},{"languageCode":"sl","languageName":{"simpleText":"slovenščina - 斯洛文尼亚语"}},{"languageCode":"sw","languageName":{"simpleText":"Kiswahili - 斯瓦希里语"}},{"languageCode":"gd","languageName":{"simpleText":"Gàidhlig - 苏格兰盖尔语"}},{"languageCode":"ceb","languageName":{"simpleText":"Binisaya - 宿务语"}},{"languageCode":"so","languageName":{"simpleText":"Soomaaliga - 索马里语"}},{"languageCode":"tg","languageName":{"simpleText":"тоҷикӣ - 塔吉克语"}},{"languageCode":"te","languageName":{"simpleText":"తెలుగు - 泰卢固语"}},{"languageCode":"ta","languageName":{"simpleText":"தமிழ் - 泰米尔语"}},{"languageCode":"th","languageName":{"simpleText":"ไทย - 泰语"}},{"languageCode":"ti","languageName":{"simpleText":"ትግርኛ - 提格利尼亚语"}},{"languageCode":"tr","languageName":{"simpleText":"Türkçe - 土耳其语"}},{"languageCode":"tk","languageName":{"simpleText":"Türkmen - 土库曼语"}},{"languageCode":"cy","languageName":{"simpleText":"Cymraeg - 威尔士语"}},{"languageCode":"ug","languageName":{"simpleText":"ئۇيغۇرچە - 维吾尔语"}},{"languageCode":"und","languageName":{"simpleText":"Unknown - 未知语言"}},{"languageCode":"ur","languageName":{"simpleText":"اردو - 乌尔都语"}},{"languageCode":"uk","languageName":{"simpleText":"українська - 乌克兰语"}},{"languageCode":"uz","languageName":{"simpleText":"O\'zbek - 乌兹别克语"}},{"languageCode":"es","languageName":{"simpleText":"Español - 西班牙语"}},{"languageCode":"fy","languageName":{"simpleText":"Frysk - 西弗里西亚语"}},{"languageCode":"iw","languageName":{"simpleText":"עברית - 希伯来语"}},{"languageCode":"el","languageName":{"simpleText":"Ελληνικά - 希腊语"}},{"languageCode":"haw","languageName":{"simpleText":"ʻŌlelo Hawaiʻi - 夏威夷语"}},{"languageCode":"sd","languageName":{"simpleText":"سنڌي - 信德语"}},{"languageCode":"hu","languageName":{"simpleText":"magyar - 匈牙利语"}},{"languageCode":"su","languageName":{"simpleText":"Basa Sunda - 巽他语"}},{"languageCode":"hy","languageName":{"simpleText":"հայերեն - 亚美尼亚语"}},{"languageCode":"ig","languageName":{"simpleText":"Igbo - 伊博语"}},{"languageCode":"it","languageName":{"simpleText":"Italiano - 意大利语"}},{"languageCode":"yi","languageName":{"simpleText":"ייִדיש - 意第绪语"}},{"languageCode":"hi","languageName":{"simpleText":"हिन्दी - 印地语"}},{"languageCode":"id","languageName":{"simpleText":"Bahasa Indonesia - 印度尼西亚语"}},{"languageCode":"en","languageName":{"simpleText":"English - 英语"}},{"languageCode":"yo","languageName":{"simpleText":"Yorùbá - 约鲁巴语"}},{"languageCode":"vi","languageName":{"simpleText":"Tiếng Việt - 越南语"}},{"languageCode":"jv","languageName":{"simpleText":"Basa Jawa - 爪哇语"}},{"languageCode":"zh-Hant","languageName":{"simpleText":"中文（繁體）- 中文（繁体）"}},{"languageCode":"zh-Hans","languageName":{"simpleText":"中文（简体）"}},{"languageCode":"zu","languageName":{"simpleText":"isiZulu - 祖鲁语"}},{"languageCode":"kri","languageName":{"simpleText":"Krìì - 克里语"}}],"MOBILE":[{"languageCode":"sq","languageName":{"runs":[{"text":"Shqip - 阿尔巴尼亚语"}]}},{"languageCode":"ak","languageName":{"runs":[{"text":"Ákán - 阿肯语"}]}},{"languageCode":"ar","languageName":{"runs":[{"text":"العربية - 阿拉伯语"}]}},{"languageCode":"am","languageName":{"runs":[{"text":"አማርኛ - 阿姆哈拉语"}]}},{"languageCode":"as","languageName":{"runs":[{"text":"অসমীয়া - 阿萨姆语"}]}},{"languageCode":"az","languageName":{"runs":[{"text":"Azərbaycanca - 阿塞拜疆语"}]}},{"languageCode":"ee","languageName":{"runs":[{"text":"Eʋegbe - 埃维语"}]}},{"languageCode":"ay","languageName":{"runs":[{"text":"Aymar - 艾马拉语"}]}},{"languageCode":"ga","languageName":{"runs":[{"text":"Gaeilge - 爱尔兰语"}]}},{"languageCode":"et","languageName":{"runs":[{"text":"Eesti - 爱沙尼亚语"}]}},{"languageCode":"or","languageName":{"runs":[{"text":"ଓଡ଼ିଆ - 奥里亚语"}]}},{"languageCode":"om","languageName":{"runs":[{"text":"Oromoo - 奥罗莫语"}]}},{"languageCode":"eu","languageName":{"runs":[{"text":"Euskara - 巴斯克语"}]}},{"languageCode":"be","languageName":{"runs":[{"text":"Беларуская - 白俄罗斯语"}]}},{"languageCode":"bg","languageName":{"runs":[{"text":"Български - 保加利亚语"}]}},{"languageCode":"nso","languageName":{"runs":[{"text":"Sesotho sa Leboa - 北索托语"}]}},{"languageCode":"is","languageName":{"runs":[{"text":"Íslenska - 冰岛语"}]}},{"languageCode":"pl","languageName":{"runs":[{"text":"Polski - 波兰语"}]}},{"languageCode":"bs","languageName":{"runs":[{"text":"Bosanski - 波斯尼亚语"}]}},{"languageCode":"fa","languageName":{"runs":[{"text":"فارسی - 波斯语"}]}},{"languageCode":"bho","languageName":{"runs":[{"text":"भोजपुरी - 博杰普尔语"}]}},{"languageCode":"ts","languageName":{"runs":[{"text":"Xitsonga - 聪加语"}]}},{"languageCode":"tt","languageName":{"runs":[{"text":"Татарча - 鞑靼语"}]}},{"languageCode":"da","languageName":{"runs":[{"text":"Dansk - 丹麦语"}]}},{"languageCode":"de","languageName":{"runs":[{"text":"Deutsch - 德语"}]}},{"languageCode":"dv","languageName":{"runs":[{"text":"ދިވެހިބަސް - 迪维希语"}]}},{"languageCode":"ru","languageName":{"runs":[{"text":"Русский - 俄语"}]}},{"languageCode":"fr","languageName":{"runs":[{"text":"Français - 法语"}]}},{"languageCode":"sa","languageName":{"runs":[{"text":"संस्कृतम् - 梵语"}]}},{"languageCode":"fil","languageName":{"runs":[{"text":"Filipino - 菲律宾语"}]}},{"languageCode":"fi","languageName":{"runs":[{"text":"Suomi - 芬兰语"}]}},{"languageCode":"km","languageName":{"runs":[{"text":"ភាសាខ្មែរ - 高棉语"}]}},{"languageCode":"ka","languageName":{"runs":[{"text":"ქართული - 格鲁吉亚语"}]}},{"languageCode":"gu","languageName":{"runs":[{"text":"ગુજરાતી - 古吉拉特语"}]}},{"languageCode":"gn","languageName":{"runs":[{"text":"Avañe\'ẽ - 瓜拉尼语"}]}},{"languageCode":"kk","languageName":{"runs":[{"text":"Қазақ тілі - 哈萨克语"}]}},{"languageCode":"ht","languageName":{"runs":[{"text":"海地克里奥尔语"}]}},{"languageCode":"ko","languageName":{"runs":[{"text":"한국말 - 韩语"}]}},{"languageCode":"ha","languageName":{"runs":[{"text":"هَوُسَ - 豪萨语"}]}},{"languageCode":"nl","languageName":{"runs":[{"text":"Nederlands - 荷兰语"}]}},{"languageCode":"gl","languageName":{"runs":[{"text":"Galego - 加利西亚语"}]}},{"languageCode":"ca","languageName":{"runs":[{"text":"Català - 加泰罗尼亚语"}]}},{"languageCode":"cs","languageName":{"runs":[{"text":"Čeština - 捷克语"}]}},{"languageCode":"kn","languageName":{"runs":[{"text":"ಕನ್ನಡ - 卡纳达语"}]}},{"languageCode":"ky","languageName":{"runs":[{"text":"Кыргызча - 吉尔吉斯语"}]}},{"languageCode":"xh","languageName":{"runs":[{"text":"isiXhosa - 科萨语"}]}},{"languageCode":"co","languageName":{"runs":[{"text":"Corsu - 科西嘉语"}]}},{"languageCode":"hr","languageName":{"runs":[{"text":"Hrvatski - 克罗地亚语"}]}},{"languageCode":"qu","languageName":{"runs":[{"text":"Runa Simi - 克丘亚语"}]}},{"languageCode":"ku","languageName":{"runs":[{"text":"Kurdî - 库尔德语"}]}},{"languageCode":"la","languageName":{"runs":[{"text":"lingua latīna - 拉丁语"}]}},{"languageCode":"lv","languageName":{"runs":[{"text":"Latviešu - 拉脱维亚语"}]}},{"languageCode":"lo","languageName":{"runs":[{"text":"ລາວ - 老挝语"}]}},{"languageCode":"lt","languageName":{"runs":[{"text":"Lietuvių - 立陶宛语"}]}},{"languageCode":"ln","languageName":{"runs":[{"text":"Lingála - 林加拉语"}]}},{"languageCode":"lg","languageName":{"runs":[{"text":"Luganda - 卢干达语"}]}},{"languageCode":"lb","languageName":{"runs":[{"text":"Lëtzebuergesch - 卢森堡语"}]}},{"languageCode":"rw","languageName":{"runs":[{"text":"Kinyarwanda - 卢旺达语"}]}},{"languageCode":"ro","languageName":{"runs":[{"text":"Română - 罗马尼亚语"}]}},{"languageCode":"mt","languageName":{"runs":[{"text":"Malti - 马耳他语"}]}},{"languageCode":"mr","languageName":{"runs":[{"text":"मराठी - 马拉地语"}]}},{"languageCode":"mg","languageName":{"runs":[{"text":"Malagasy - 马拉加斯语"}]}},{"languageCode":"ml","languageName":{"runs":[{"text":"മലയാളം - 马拉雅拉姆语"}]}},{"languageCode":"ms","languageName":{"runs":[{"text":"Bahasa Melayu - 马来语"}]}},{"languageCode":"mk","languageName":{"runs":[{"text":"македонски - 马其顿语"}]}},{"languageCode":"mi","languageName":{"runs":[{"text":"Māori - 毛利语"}]}},{"languageCode":"mn","languageName":{"runs":[{"text":"Монгол - 蒙古语"}]}},{"languageCode":"bn","languageName":{"runs":[{"text":"বাংলা - 孟加拉语"}]}},{"languageCode":"my","languageName":{"runs":[{"text":"ဗမာစာ - 缅甸语"}]}},{"languageCode":"hmn","languageName":{"runs":[{"text":"Hmoob - 苗语"}]}},{"languageCode":"af","languageName":{"runs":[{"text":"Afrikaans - 南非荷兰语"}]}},{"languageCode":"st","languageName":{"runs":[{"text":"Sesotho - 南索托语"}]}},{"languageCode":"ne","languageName":{"runs":[{"text":"नेपाली - 尼泊尔语"}]}},{"languageCode":"no","languageName":{"runs":[{"text":"Norsk - 挪威语"}]}},{"languageCode":"pa","languageName":{"runs":[{"text":"ਪੰਜਾਬੀ - 旁遮普语"}]}},{"languageCode":"pt","languageName":{"runs":[{"text":"Português - 葡萄牙语"}]}},{"languageCode":"ps","languageName":{"runs":[{"text":"پښتو - 普什图语"}]}},{"languageCode":"ny","languageName":{"runs":[{"text":"chiCheŵa - 齐切瓦语"}]}},{"languageCode":"ja","languageName":{"runs":[{"text":"日本語 - 日语"}]}},{"languageCode":"sv","languageName":{"runs":[{"text":"Svenska - 瑞典语"}]}},{"languageCode":"sm","languageName":{"runs":[{"text":"Gagana Samoa - 萨摩亚语"}]}},{"languageCode":"sr","languageName":{"runs":[{"text":"Српски језик - 塞尔维亚语"}]}},{"languageCode":"si","languageName":{"runs":[{"text":"සිංහල - 僧伽罗语"}]}},{"languageCode":"sn","languageName":{"runs":[{"text":"ChiShona - 绍纳语"}]}},{"languageCode":"eo","languageName":{"runs":[{"text":"Esperanto - 世界语"}]}},{"languageCode":"sk","languageName":{"runs":[{"text":"Slovenčina - 斯洛伐克语"}]}},{"languageCode":"sl","languageName":{"runs":[{"text":"Slovenščina - 斯洛文尼亚语"}]}},{"languageCode":"sw","languageName":{"runs":[{"text":"Kiswahili - 斯瓦希里语"}]}},{"languageCode":"gd","languageName":{"runs":[{"text":"Gàidhlig - 苏格兰盖尔语"}]}},{"languageCode":"ceb","languageName":{"runs":[{"text":"Cebuano - 宿务语"}]}},{"languageCode":"so","languageName":{"runs":[{"text":"Soomaaliga - 索马里语"}]}},{"languageCode":"tg","languageName":{"runs":[{"text":"тоҷикӣ - 塔吉克语"}]}},{"languageCode":"te","languageName":{"runs":[{"text":"తెలుగు - 泰卢固语"}]}},{"languageCode":"ta","languageName":{"runs":[{"text":"தமிழ் - 泰米尔语"}]}},{"languageCode":"th","languageName":{"runs":[{"text":"ไทย - 泰语"}]}},{"languageCode":"ti","languageName":{"runs":[{"text":"ትግርኛ - 提格利尼亚语"}]}},{"languageCode":"tr","languageName":{"runs":[{"text":"Türkçe - 土耳其语"}]}},{"languageCode":"tk","languageName":{"runs":[{"text":"Türkmen - 土库曼语"}]}},{"languageCode":"cy","languageName":{"runs":[{"text":"Cymraeg - 威尔士语"}]}},{"languageCode":"ug","languageName":{"runs":[{"text":"ئۇيغۇرچە - 维吾尔语"}]}},{"languageCode":"und","languageName":{"runs":[{"text":"Unknown - 未知语言"}]}},{"languageCode":"ur","languageName":{"runs":[{"text":"اردو - 乌尔都语"}]}},{"languageCode":"uk","languageName":{"runs":[{"text":"Українська - 乌克兰语"}]}},{"languageCode":"uz","languageName":{"runs":[{"text":"O‘zbek - 乌兹别克语"}]}},{"languageCode":"es","languageName":{"runs":[{"text":"Español - 西班牙语"}]}},{"languageCode":"fy","languageName":{"runs":[{"text":"Frysk - 西弗里西亚语"}]}},{"languageCode":"iw","languageName":{"runs":[{"text":"עברית - 希伯来语"}]}},{"languageCode":"el","languageName":{"runs":[{"text":"Ελληνικά - 希腊语"}]}},{"languageCode":"haw","languageName":{"runs":[{"text":"ʻŌlelo Hawaiʻi - 夏威夷语"}]}},{"languageCode":"sd","languageName":{"runs":[{"text":"سنڌي - 信德语"}]}},{"languageCode":"hu","languageName":{"runs":[{"text":"Magyar - 匈牙利语"}]}},{"languageCode":"su","languageName":{"runs":[{"text":"Basa Sunda - 巽他语"}]}},{"languageCode":"hy","languageName":{"runs":[{"text":"Հայերեն - 亚美尼亚语"}]}},{"languageCode":"ig","languageName":{"runs":[{"text":"Igbo - 伊博语"}]}},{"languageCode":"it","languageName":{"runs":[{"text":"Italiano - 意大利语"}]}},{"languageCode":"yi","languageName":{"runs":[{"text":"ייִדיש - 意第绪语"}]}},{"languageCode":"hi","languageName":{"runs":[{"text":"हिन्दी - 印地语"}]}},{"languageCode":"id","languageName":{"runs":[{"text":"Bahasa Indonesia - 印度尼西亚语"}]}},{"languageCode":"en","languageName":{"runs":[{"text":"English - 英语"}]}},{"languageCode":"yo","languageName":{"runs":[{"text":"Yorùbá - 约鲁巴语"}]}},{"languageCode":"vi","languageName":{"runs":[{"text":"Tiếng Việt - 越南语"}]}},{"languageCode":"jv","languageName":{"runs":[{"text":"Basa Jawa - 爪哇语"}]}},{"languageCode":"zh-Hant","languageName":{"runs":[{"text":"中文（繁體） - 中文（繁体）"}]}},{"languageCode":"zh-Hans","languageName":{"runs":[{"text":"中文（简体）"}]}},{"languageCode":"zu","languageName":{"runs":[{"text":"isiZulu - 祖鲁语"}]}},{"languageCode":"kri","languageName":{"runs":[{"text":"Krìì - 克里语"}]}}]}}},"Netflix":{"Settings":{"Switch":true,"Type":"Translate","Languages":["AUTO","ZH"]},"Configs":{"Languages":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"}}},"Spotify":{"Settings":{"Switch":true,"Types":["Translate","External"],"Languages":["AUTO","ZH"]}},"Composite":{"Settings":{"CacheSize":20,"ShowOnly":false,"Position":"Reverse","Offset":0,"Tolerance":1000}},"Translate":{"Settings":{"Vendor":"Google","ShowOnly":false,"Position":"Forward","CacheSize":10,"Method":"Part","Times":3,"Interval":500,"Exponential":true},"Configs":{"Languages":{"Google":{"AUTO":"auto","AF":"af","AM":"am","AR":"ar","AS":"as","AY":"ay","AZ":"az","BG":"bg","BE":"be","BM":"bm","BN":"bn","BHO":"bho","CS":"cs","DA":"da","DE":"de","EL":"el","EU":"eu","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","FR-CA":"fr","HU":"hu","IS":"is","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","PA":"pa","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SQ":"sq","ST":"st","SV":"sv","TH":"th","TR":"tr","UK":"uk","UR":"ur","VI":"vi","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"},"Microsoft":{"AUTO":"","AF":"af","AM":"am","AR":"ar","AS":"as","AY":"ay","AZ":"az","BG":"bg","BE":"be","BM":"bm","BN":"bn","BHO":"bho","CS":"cs","DA":"da","DE":"de","EL":"el","EU":"eu","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","FR-CA":"fr-ca","HU":"hu","IS":"is","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt-pt","PT-BR":"pt","PA":"pa","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SQ":"sq","ST":"st","SV":"sv","TH":"th","TR":"tr","UK":"uk","UR":"ur","VI":"vi","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"},"DeepL":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN","EN-GB":"EN","EN-US":"EN","EN-US SDH":"EN","ES":"ES","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT","PT-PT":"PT","PT-BR":"PT","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","TR":"TR","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}}}},"External":{"Settings":{"SubVendor":"URL","LrcVendor":"QQMusic","CacheSize":50}},"API":{"Settings":{"GoogleCloud":{"Version":"v2","Mode":"Key","Auth":""},"Microsoft":{"Version":"Azure","Mode":"Token","Region":"","Auth":""},"DeepL":{"Version":"Free","Auth":""},"DeepLX":{"Endpoint":"","Auth":""},"URL":"","NeteaseMusic":{"PhoneNumber":"","Password":""}}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./src/Composite.Subtitles.response.beta.js ***!
  \**************************************************/
var _database_Database_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/* harmony import */ var _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./URI/URI.mjs */ "./src/URI/URI.mjs");
/* harmony import */ var _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./XML/XML.mjs */ "./src/XML/XML.mjs");
/* harmony import */ var _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WebVTT/WebVTT.mjs */ "./src/WebVTT/WebVTT.mjs");
/* harmony import */ var _function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/setENV.mjs */ "./src/function/setENV.mjs");
/* harmony import */ var _function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/detectPlatform.mjs */ "./src/function/detectPlatform.mjs");
/* harmony import */ var _function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/detectFormat.mjs */ "./src/function/detectFormat.mjs");
/* harmony import */ var _database_Database_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database/Database.json */ "./src/database/Database.json");
/*
README: https://github.com/DualSubs
*/












const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: 🎦 Universal v0.9.5(2) Composite.Subtitles.response.beta");
const URI = new _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]();
const XML = new _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]();
const VTT = new _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_3__["default"](["milliseconds", "timeStamp", "singleLine", "\n"]); // "multiLine"

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 获取平台
const PLATFORM = (0,_function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_5__["default"])(HOST);
$.log(`⚠ ${$.name}, PLATFORM: ${PLATFORM}`, "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = (0,_function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_6__["default"])(URL, $response?.body);
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Composite", "API"], /*#__PURE__*/ (_database_Database_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache || (_database_Database_json__WEBPACK_IMPORTED_MODULE_7___namespace_cache = __webpack_require__.t(_database_Database_json__WEBPACK_IMPORTED_MODULE_7__, 2))));
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
							const { subtitlesPlaylistURL } = getSubtitlesCache($request.url, Caches.Playlists.Subtitle, Languages);
							// 获取字幕播放列表m3u8缓存（map）
							const { masterPlaylistURL, subtitlesPlaylistIndex } = getPlaylistCache(subtitlesPlaylistURL, Caches.Playlists.Master, Languages);
							// 获取字幕文件地址vtt缓存（map）
							const { subtitlesURIArray0, subtitlesURIArray1 } = getSubtitlesArray(masterPlaylistURL, subtitlesPlaylistIndex, Caches.Playlists.Master, Caches.Playlists.Subtitle, Languages);
							// 获取官方字幕请求
							if (subtitlesURIArray1.length) {
								$.log(`🚧 ${$.name}, subtitlesURIArray1.length: ${subtitlesURIArray1.length}`, "");
								// 获取字幕文件名
								let fileName = PATHs?.[PATHs?.length - 1] ?? getSubtitlesFileName($request.url, PLATFORM);
								$.log(`🚧 ${$.name}, fileName: ${fileName}`, "")
								// 构造请求队列
								requests = constructSubtitlesQueue($request, fileName, subtitlesURIArray0, subtitlesURIArray1);
							};
							break;
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
											delete URL.query?.tlang // 原字幕
											let request = {
												"url": URI.stringify(URL),
												"headers": $request.headers
											};
											requests.push(request);
											break;
									};
							};
							break;
						case "Netflix":
							$.log(`🚧 ${$.name}`, "Netflix", "");
							break;
						case "Bilibili":
							$.log(`🚧 ${$.name}`, "Bilibili", "");
							break;
					};
					break;
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
			};
			// 创建字幕Object
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
						SecondSub = await $.http.get(request).then(response => response.body);
						SecondSub = XML.parse(SecondSub);
						//$.log(`🚧 ${$.name}`, `SecondSub: ${JSON.stringify(SecondSub)}`, "");
						OriginSub = CombineDualSubs(OriginSub, SecondSub, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					};
					//$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					$response.body = XML.stringify(OriginSub);
					break;
				case "text/vtt":
				case "application/vtt":
					OriginSub = VTT.parse($response.body);
					$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					for await (let request of requests) {
						SecondSub = await $.http.get(request).then(response => response.body);
						SecondSub = VTT.parse(SecondSub);
						$.log(`🚧 ${$.name}`, `SecondSub: ${JSON.stringify(SecondSub)}`, "");
						OriginSub = CombineDualSubs(OriginSub, SecondSub, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					};
					$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					$response.body = VTT.stringify(OriginSub);
					break;
				case "text/json":
				case "application/json":
					OriginSub = JSON.parse($response.body ?? "{}");
					//$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					for await (let request of requests) {
						SecondSub = await $.http.get(request).then(response => response.body);
						SecondSub = JSON.parse(SecondSub);
						//$.log(`🚧 ${$.name}`, `SecondSub: ${JSON.stringify(SecondSub)}`, "");
						OriginSub = CombineDualSubs(OriginSub, SecondSub, FORMAT, URL.query?.kind, Settings.Offset, Settings.Tolerance, Settings.Position);
					};
					//$.log(`🚧 ${$.name}`, `OriginSub: ${JSON.stringify(OriginSub)}`, "");
					$response.body = JSON.stringify(OriginSub);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "applecation/octet-stream":
					//$.log(`🚧 ${$.name}`, `$response.body: ${JSON.stringify($response.body)}`, "");
					//let rawBody = $.isQuanX() ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//$.log(`🚧 ${$.name}`, `isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					// 写入二进制数据
					//$.log(`🚧 ${$.name}, 调试信息`, `rawBody: ${JSON.stringify(rawBody)}`, "");
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
						case "applecation/octet-stream":
							// 返回二进制数据
							//$.log(`${$response.bodyBytes.byteLength}---${$response.bodyBytes.buffer.byteLength}`);
							$.done({ status: $response.status, headers: $response.headers, bodyBytes: $response.bodyBytes.buffer.slice($response.bodyBytes.byteOffset, $response.bodyBytes.byteLength + $response.bodyBytes.byteOffset) });
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
				};
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
			};
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
	};
	$.log(`✅ ${$.name}, Get Subtitles FileName`, `fileName: ${fileName}`, "");
	return fileName;
};

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
	$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, VTTs1.length: ${VTTs1.length}, VTTs2.length: ${VTTs2.length}`, "")
	//$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, VTTs1: ${JSON.stringify(VTTs1)}, VTTs2.length: ${JSON.stringify(VTTs2)}`, "")
	// 查询当前字幕在原字幕队列中的位置
	const Index1 = VTTs1.findIndex(item => item?.includes(fileName));
	$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, Index1: ${Index1}`, "");
	switch (VTTs2.length) {
		case 0: // 长度为0，无须计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度为 0`, "")
			break;
		case 1: { // 长度为1，无须计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度为 1`, "")
			let request2 = {
				"url": VTTs2[0],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		};
		case VTTs1.length: { // 长度相等，一一对应，无须计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度相等`, "")
			let request2 = {
				"url": VTTs2[Index1],
				"headers": request.headers
			};
			requests.push(request2);
			break;
		};
		default: { // 长度不等，需要计算
			$.log(`⚠ ${$.name}`, `Construct Subtitles Queue, 长度不等，需要计算`, "")
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
		};
	};
	//$.log(`🚧 ${$.name}`, `Construct Subtitles Queue, requests: ${JSON.stringify(requests)}`, "");
	$.log(`✅ ${$.name}`, `Construct Subtitles Queue`, "");
	return requests;
};

/** 
 * Combine Dual Subtitles
 * @param {Object} Sub1 - Sub1
 * @param {Object} Sub2 - Sub2
 * @param {Array} Format - options = ["json", "srv3", "vtt"]
 * @param {Array} Kind - options = ["asr", "captions"]
 * @param {Number} Offset - Offset
 * @param {Number} Tolerance - Tolerance
 * @param {Array} Position - Position = ["Forward", "Reverse"]
 * @return {String} DualSub
 */
function CombineDualSubs(Sub1 = {}, Sub2 = {}, Format = "text/vtt", Kind = "captions", Offset = 0, Tolerance = 0, Position = "Forward") {
	$.log(`⚠ ${$.name}, Combine Dual Subtitles`, `Offset:${Offset}, Tolerance:${Tolerance}, Position:${Position}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub1内容: ${JSON.stringify(Sub1)}`, "");
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`Sub2内容: ${JSON.stringify(Sub2)}`, "");
	//let DualSub = Position.includes("Reverse") ? Sub2 : Sub1
	let DualSub = Sub1;
	//$.log(`🚧 ${$.name}, Combine Dual Subtitles`,`let DualSub内容: ${JSON.stringify(DualSub)}`, "");
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
					$.log(`🚧`, `DualSub是自动生成字幕`, "");
					index0 = 1, index1 = 1, index2 = 1;
					Sub1.events = Sub1.events.map(event => {
						if (event?.segs) {
							if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
						};
						delete event.wWinId;
						return event;
					});
					Sub2.events = Sub2.events.map(event => {
						if (event?.segs) {
							if (Array.isArray(event?.segs)) event.segs = [{ "utf8": event.segs.map(seg => seg.utf8).join("") }];
						};
						delete event.wWinId;
						return event;
					});
					//break; 不要break，连续处理
				case "captions":
				default:
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.events[index1].tStartMs, timeStamp2 = Sub2.events[index2].tStartMs;
						//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							const text1 = Sub1.events[index1]?.segs?.[0].utf8 ?? "", text2 = Sub2.events[index2]?.segs?.[0].utf8 ?? "";
							//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
							DualSub.events[index0].segs = [{ "utf8": (Position === "Reverse") ? `${text2}\n${text1}` : `${text1}\n${text2}` }];
							//$.log(`🚧`, `DualSub.events[index0].segs[0].utf8: ${DualSub.events[index0].segs[0].utf8}`, "");
							//DualSub.body[index0].tStartMs = (Position === "Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.body[index0].index = (Position === "Reverse") ? index2 : index1;
						};
						if (timeStamp2 > timeStamp1) index1++
						else if (timeStamp2 < timeStamp1) index2++
						else { index1++; index2++ };
					};
					break;
			};
			break;
		};
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
							if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join("");
							else para["#"] = para.s?.["#"] ?? "";
							delete para.s;
						};
						return para;
					});
					Sub2.timedtext.body.p = Sub2.timedtext.body.p.map(para => {
						if (para?.s) {
							if (Array.isArray(para?.s)) para["#"] = para?.s.map(seg => seg["#"]).join("");
							else para["#"] = para.s?.["#"] ?? "";
							delete para.s;
						};
						return para;
					});
					//break; 不要break，连续处理
				case "captions":
				default:
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = parseInt(Sub1.timedtext.body.p[index1]["@t"], 10), timeStamp2 = parseInt(Sub2.timedtext.body.p[index2]["@t"], 10);
						//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							const text1 = Sub1.timedtext.body.p[index1]?.["#"] ?? "", text2 = Sub2.timedtext.body.p[index2]?.["#"] ?? "";
							//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
							DualSub.timedtext.body.p[index0]["#"] = (Position === "Reverse") ? `${text2}&#x000A;${text1}` : `${text1}&#x000A;${text2}`;
							//$.log(`🚧`, `DualSub.timedtext.body.p[index0]["#"]: ${DualSub.timedtext.body.p[index0]["#"]}`, "");
							//DualSub.timedtext.body.p[index0]["@t"] = (Position === "Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.timedtext.body.p[index0].index = (Position === "Reverse") ? index2 : index1;
						};
						if (timeStamp2 > timeStamp1) index1++
						else if (timeStamp2 < timeStamp1) index2++
						else { index1++; index2++ };
					};
					break;
			};
			break;
		};
		case "text/vtt":
		case "application/vtt": {
			const length1 = Sub1?.body?.length, length2 = Sub2?.body?.length;
			switch (Kind) {
				case "asr":
					// 自动生成字幕转普通字幕
					$.log(`🚧`, `DualSub是自动生成字幕`, "");
					// vtt字幕不需要特殊处理
					//break; 不要break，连续处理
				case "captions":
				default:
					// 处理普通字幕
					while (index1 < length1 && index2 < length2) {
						//$.log(`🚧`, `index1/length1: ${index1}/${length1}`, `index2/length2: ${index2}/${length2}`, "");
						const timeStamp1 = Sub1.body[index1].timeStamp, timeStamp2 = Sub2.body[index2].timeStamp;
						//$.log(`🚧`, `timeStamp1: ${timeStamp1}`, `timeStamp2: ${timeStamp2}`, "");
						// 处理普通字幕
						const text1 = Sub1.body[index1]?.text ?? "", text2 = Sub2.body[index2]?.text ?? "";
						//$.log(`🚧`, `text1: ${text1}`, `text2: ${text2}`, "");
						if (Math.abs(timeStamp1 - timeStamp2) <= Tolerance) {
							//index0 = (Position === "Reverse") ? index2 : index1;
							index0 = index1;
							// 处理普通字幕
							DualSub.body[index0].text = (Position === "Reverse") ? `${text2}\n${text1}`: `${text1}\n${text2}`;
							//$.log(`🚧`, `index0: ${index0}`, `text: ${DualSub.body[index0].text}`, "");
							//DualSub.body[index0].timeStamp = (Position === "Reverse") ? timeStamp2 : timeStamp1;
							//DualSub.body[index0].index = (Position === "Reverse") ? index2 : index1;
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9zaXRlLlN1YnRpdGxlcy5yZXNwb25zZS5iZXRhLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFVBQVU7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxlQUFlLCtCQUErQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFNBQVMsOENBQThDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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bUMsV0FBVyxrQkFBa0IsV0FBVztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE1BQU0sYUFBYSxNQUFNO0FBQ3hELDZFQUE2RSxNQUFNLFFBQVEsRUFBRSxNQUFNLE9BQU8sTUFBTSxRQUFRLEVBQUUsTUFBTTtBQUNoSSwrREFBK0Qsc0NBQXNDO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTyxHQUFHLFFBQVEsc0JBQXNCLE9BQU8sR0FBRyxRQUFRO0FBQ2pHO0FBQ0EsbUNBQW1DLFdBQVcsa0JBQWtCLFdBQVc7QUFDM0U7QUFDQTtBQUNBLDhCQUE4QixNQUFNLGFBQWEsTUFBTTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxNQUFNLElBQUksTUFBTSxNQUFNLE1BQU0sSUFBSSxNQUFNO0FBQ3ZHLGdDQUFnQyxPQUFPLFlBQVksMEJBQTBCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPLGdEQUFnRCx3QkFBd0I7QUFDOUYsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9FTlYvRU5WLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9VUkkvVVJJLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9XZWJWVFQvV2ViVlRULm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9YTUwvWE1MLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9kZXRlY3RGb3JtYXQubWpzIiwid2VicGFjazovL2R1YWxzdWJzLy4vc3JjL2Z1bmN0aW9uL2RldGVjdFBsYXRmb3JtLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9zZXRFTlYubWpzIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvQ29tcG9zaXRlLlN1YnRpdGxlcy5yZXNwb25zZS5iZXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVOViB7XG5cdGNvbnN0cnVjdG9yKG5hbWUsIG9wdHMpIHtcblx0XHR0aGlzLm5hbWUgPSBuYW1lXG5cdFx0dGhpcy5odHRwID0gbmV3IEh0dHAodGhpcylcblx0XHR0aGlzLmRhdGEgPSBudWxsXG5cdFx0dGhpcy5kYXRhRmlsZSA9ICdib3guZGF0J1xuXHRcdHRoaXMubG9ncyA9IFtdXG5cdFx0dGhpcy5pc011dGUgPSBmYWxzZVxuXHRcdHRoaXMuaXNOZWVkUmV3cml0ZSA9IGZhbHNlXG5cdFx0dGhpcy5sb2dTZXBhcmF0b3IgPSAnXFxuJ1xuXHRcdHRoaXMuZW5jb2RpbmcgPSAndXRmLTgnXG5cdFx0dGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgb3B0cylcblx0XHR0aGlzLmxvZygnJywgYPCfj4EgJHt0aGlzLm5hbWV9LCBFTlYgdjEuMS4wLCDlvIDlp4shYClcblx0fVxuXG5cdHBsYXRmb3JtKCkge1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRlbnZpcm9ubWVudCAmJiAkZW52aXJvbm1lbnRbJ3N1cmdlLXZlcnNpb24nXSlcblx0XHRcdHJldHVybiAnU3VyZ2UnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJGVudmlyb25tZW50ICYmICRlbnZpcm9ubWVudFsnc3Rhc2gtdmVyc2lvbiddKVxuXHRcdFx0cmV0dXJuICdTdGFzaCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUgJiYgISFtb2R1bGUuZXhwb3J0cykgcmV0dXJuICdOb2RlLmpzJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICR0YXNrKSByZXR1cm4gJ1F1YW50dW11bHQgWCdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkbG9vbikgcmV0dXJuICdMb29uJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRyb2NrZXQpIHJldHVybiAnU2hhZG93cm9ja2V0J1xuXHR9XG5cblx0aXNOb2RlKCkge1xuXHRcdHJldHVybiAnTm9kZS5qcycgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNRdWFuWCgpIHtcblx0XHRyZXR1cm4gJ1F1YW50dW11bHQgWCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdXJnZSgpIHtcblx0XHRyZXR1cm4gJ1N1cmdlJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc0xvb24oKSB7XG5cdFx0cmV0dXJuICdMb29uJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1NoYWRvd3JvY2tldCgpIHtcblx0XHRyZXR1cm4gJ1NoYWRvd3JvY2tldCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTdGFzaCgpIHtcblx0XHRyZXR1cm4gJ1N0YXNoJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHR0b09iaihzdHIsIGRlZmF1bHRWYWx1ZSA9IG51bGwpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2Uoc3RyKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdHRvU3RyKG9iaiwgZGVmYXVsdFZhbHVlID0gbnVsbCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdH1cblx0fVxuXG5cdGdldGpzb24oa2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRsZXQganNvbiA9IGRlZmF1bHRWYWx1ZVxuXHRcdGNvbnN0IHZhbCA9IHRoaXMuZ2V0ZGF0YShrZXkpXG5cdFx0aWYgKHZhbCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UodGhpcy5nZXRkYXRhKGtleSkpXG5cdFx0XHR9IGNhdGNoIHsgfVxuXHRcdH1cblx0XHRyZXR1cm4ganNvblxuXHR9XG5cblx0c2V0anNvbih2YWwsIGtleSkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRkYXRhKEpTT04uc3RyaW5naWZ5KHZhbCksIGtleSlcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0fVxuXG5cdGdldFNjcmlwdCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdHRoaXMuZ2V0KHsgdXJsIH0sIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHJlc29sdmUoYm9keSkpXG5cdFx0fSlcblx0fVxuXG5cdHJ1blNjcmlwdChzY3JpcHQsIHJ1bk9wdHMpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGxldCBodHRwYXBpID0gdGhpcy5nZXRkYXRhKCdAY2hhdnlfYm94anNfdXNlckNmZ3MuaHR0cGFwaScpXG5cdFx0XHRodHRwYXBpID0gaHR0cGFwaSA/IGh0dHBhcGkucmVwbGFjZSgvXFxuL2csICcnKS50cmltKCkgOiBodHRwYXBpXG5cdFx0XHRsZXQgaHR0cGFwaV90aW1lb3V0ID0gdGhpcy5nZXRkYXRhKFxuXHRcdFx0XHQnQGNoYXZ5X2JveGpzX3VzZXJDZmdzLmh0dHBhcGlfdGltZW91dCdcblx0XHRcdClcblx0XHRcdGh0dHBhcGlfdGltZW91dCA9IGh0dHBhcGlfdGltZW91dCA/IGh0dHBhcGlfdGltZW91dCAqIDEgOiAyMFxuXHRcdFx0aHR0cGFwaV90aW1lb3V0ID1cblx0XHRcdFx0cnVuT3B0cyAmJiBydW5PcHRzLnRpbWVvdXQgPyBydW5PcHRzLnRpbWVvdXQgOiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdGNvbnN0IFtrZXksIGFkZHJdID0gaHR0cGFwaS5zcGxpdCgnQCcpXG5cdFx0XHRjb25zdCBvcHRzID0ge1xuXHRcdFx0XHR1cmw6IGBodHRwOi8vJHthZGRyfS92MS9zY3JpcHRpbmcvZXZhbHVhdGVgLFxuXHRcdFx0XHRib2R5OiB7XG5cdFx0XHRcdFx0c2NyaXB0X3RleHQ6IHNjcmlwdCxcblx0XHRcdFx0XHRtb2NrX3R5cGU6ICdjcm9uJyxcblx0XHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdFx0fSxcblx0XHRcdFx0aGVhZGVyczogeyAnWC1LZXknOiBrZXksICdBY2NlcHQnOiAnKi8qJyB9LFxuXHRcdFx0XHR0aW1lb3V0OiBodHRwYXBpX3RpbWVvdXRcblx0XHRcdH1cblx0XHRcdHRoaXMucG9zdChvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiByZXNvbHZlKGJvZHkpKVxuXHRcdH0pLmNhdGNoKChlKSA9PiB0aGlzLmxvZ0VycihlKSlcblx0fVxuXG5cdGxvYWRkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGlmIChpc0N1ckRpckRhdGFGaWxlIHx8IGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdGNvbnN0IGRhdFBhdGggPSBpc0N1ckRpckRhdGFGaWxlXG5cdFx0XHRcdFx0PyBjdXJEaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0XHQ6IHJvb3REaXJEYXRhRmlsZVBhdGhcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmZzLnJlYWRGaWxlU3luYyhkYXRQYXRoKSlcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHJldHVybiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgcmV0dXJuIHt9XG5cdFx0fSBlbHNlIHJldHVybiB7fVxuXHR9XG5cblx0d3JpdGVkYXRhKCkge1xuXHRcdGlmICh0aGlzLmlzTm9kZSgpKSB7XG5cdFx0XHR0aGlzLmZzID0gdGhpcy5mcyA/IHRoaXMuZnMgOiByZXF1aXJlKCdmcycpXG5cdFx0XHR0aGlzLnBhdGggPSB0aGlzLnBhdGggPyB0aGlzLnBhdGggOiByZXF1aXJlKCdwYXRoJylcblx0XHRcdGNvbnN0IGN1ckRpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKHRoaXMuZGF0YUZpbGUpXG5cdFx0XHRjb25zdCByb290RGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUoXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdHRoaXMuZGF0YUZpbGVcblx0XHRcdClcblx0XHRcdGNvbnN0IGlzQ3VyRGlyRGF0YUZpbGUgPSB0aGlzLmZzLmV4aXN0c1N5bmMoY3VyRGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QgaXNSb290RGlyRGF0YUZpbGUgPVxuXHRcdFx0XHQhaXNDdXJEaXJEYXRhRmlsZSAmJiB0aGlzLmZzLmV4aXN0c1N5bmMocm9vdERpckRhdGFGaWxlUGF0aClcblx0XHRcdGNvbnN0IGpzb25kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuXHRcdFx0aWYgKGlzQ3VyRGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKGN1ckRpckRhdGFGaWxlUGF0aCwganNvbmRhdGEpXG5cdFx0XHR9IGVsc2UgaWYgKGlzUm9vdERpckRhdGFGaWxlKSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhyb290RGlyRGF0YUZpbGVQYXRoLCBqc29uZGF0YSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgsIGpzb25kYXRhKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvZGFzaF9nZXQoc291cmNlLCBwYXRoLCBkZWZhdWx0VmFsdWUgPSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBwYXRocyA9IHBhdGgucmVwbGFjZSgvXFxbKFxcZCspXFxdL2csICcuJDEnKS5zcGxpdCgnLicpXG5cdFx0bGV0IHJlc3VsdCA9IHNvdXJjZVxuXHRcdGZvciAoY29uc3QgcCBvZiBwYXRocykge1xuXHRcdFx0cmVzdWx0ID0gT2JqZWN0KHJlc3VsdClbcF1cblx0XHRcdGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXG5cdGxvZGFzaF9zZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSByZXR1cm4gb2JqXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKSBwYXRoID0gcGF0aC50b1N0cmluZygpLm1hdGNoKC9bXi5bXFxdXSsvZykgfHwgW11cblx0XHRwYXRoXG5cdFx0XHQuc2xpY2UoMCwgLTEpXG5cdFx0XHQucmVkdWNlKFxuXHRcdFx0XHQoYSwgYywgaSkgPT5cblx0XHRcdFx0XHRPYmplY3QoYVtjXSkgPT09IGFbY11cblx0XHRcdFx0XHRcdD8gYVtjXVxuXHRcdFx0XHRcdFx0OiAoYVtjXSA9IE1hdGguYWJzKHBhdGhbaSArIDFdKSA+PiAwID09PSArcGF0aFtpICsgMV0gPyBbXSA6IHt9KSxcblx0XHRcdFx0b2JqXG5cdFx0XHQpW3BhdGhbcGF0aC5sZW5ndGggLSAxXV0gPSB2YWx1ZVxuXHRcdHJldHVybiBvYmpcblx0fVxuXG5cdGdldGRhdGEoa2V5KSB7XG5cdFx0bGV0IHZhbCA9IHRoaXMuZ2V0dmFsKGtleSlcblx0XHQvLyDlpoLmnpzku6UgQFxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXkgPyB0aGlzLmdldHZhbChvYmprZXkpIDogJydcblx0XHRcdGlmIChvYmp2YWwpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHRcdHZhbCA9IG9iamVkdmFsID8gdGhpcy5sb2Rhc2hfZ2V0KG9iamVkdmFsLCBwYXRocywgJycpIDogdmFsXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHR2YWwgPSAnJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB2YWxcblx0fVxuXG5cdHNldGRhdGEodmFsLCBrZXkpIHtcblx0XHRsZXQgaXNzdWMgPSBmYWxzZVxuXHRcdGlmICgvXkAvLnRlc3Qoa2V5KSkge1xuXHRcdFx0Y29uc3QgWywgb2Jqa2V5LCBwYXRoc10gPSAvXkAoLio/KVxcLiguKj8pJC8uZXhlYyhrZXkpXG5cdFx0XHRjb25zdCBvYmpkYXQgPSB0aGlzLmdldHZhbChvYmprZXkpXG5cdFx0XHRjb25zdCBvYmp2YWwgPSBvYmprZXlcblx0XHRcdFx0PyBvYmpkYXQgPT09ICdudWxsJ1xuXHRcdFx0XHRcdD8gbnVsbFxuXHRcdFx0XHRcdDogb2JqZGF0IHx8ICd7fSdcblx0XHRcdFx0OiAne30nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IEpTT04ucGFyc2Uob2JqdmFsKVxuXHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQob2JqZWR2YWwsIHBhdGhzLCB2YWwpXG5cdFx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwoSlNPTi5zdHJpbmdpZnkob2JqZWR2YWwpLCBvYmprZXkpXG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnN0IG9iamVkdmFsID0ge31cblx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KG9iamVkdmFsLCBwYXRocywgdmFsKVxuXHRcdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKEpTT04uc3RyaW5naWZ5KG9iamVkdmFsKSwgb2Jqa2V5KVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKHZhbCwga2V5KVxuXHRcdH1cblx0XHRyZXR1cm4gaXNzdWNcblx0fVxuXG5cdGdldHZhbChrZXkpIHtcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRyZXR1cm4gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKGtleSlcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJldHVybiAkcHJlZnMudmFsdWVGb3JLZXkoa2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kYXRhW2tleV1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtrZXldKSB8fCBudWxsXG5cdFx0fVxuXHR9XG5cblx0c2V0dmFsKHZhbCwga2V5KSB7XG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0cmV0dXJuICRwZXJzaXN0ZW50U3RvcmUud3JpdGUodmFsLCBrZXkpXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXR1cm4gJHByZWZzLnNldFZhbHVlRm9yS2V5KHZhbCwga2V5KVxuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMubG9hZGRhdGEoKVxuXHRcdFx0XHR0aGlzLmRhdGFba2V5XSA9IHZhbFxuXHRcdFx0XHR0aGlzLndyaXRlZGF0YSgpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFba2V5XSkgfHwgbnVsbFxuXHRcdH1cblx0fVxuXG5cdGluaXRHb3RFbnYob3B0cykge1xuXHRcdHRoaXMuZ290ID0gdGhpcy5nb3QgPyB0aGlzLmdvdCA6IHJlcXVpcmUoJ2dvdCcpXG5cdFx0dGhpcy5ja3RvdWdoID0gdGhpcy5ja3RvdWdoID8gdGhpcy5ja3RvdWdoIDogcmVxdWlyZSgndG91Z2gtY29va2llJylcblx0XHR0aGlzLmNramFyID0gdGhpcy5ja2phciA/IHRoaXMuY2tqYXIgOiBuZXcgdGhpcy5ja3RvdWdoLkNvb2tpZUphcigpXG5cdFx0aWYgKG9wdHMpIHtcblx0XHRcdG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyA/IG9wdHMuaGVhZGVycyA6IHt9XG5cdFx0XHRpZiAodW5kZWZpbmVkID09PSBvcHRzLmhlYWRlcnMuQ29va2llICYmIHVuZGVmaW5lZCA9PT0gb3B0cy5jb29raWVKYXIpIHtcblx0XHRcdFx0b3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KHJlcXVlc3QsIGNhbGxiYWNrID0gKCkgPT4geyB9KSB7XG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnQ29udGVudC1MZW5ndGgnXVxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ2NvbnRlbnQtbGVuZ3RoJ11cblxuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZiAodGhpcy5pc1N1cmdlKCkgJiYgdGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdoZWFkZXJzLlgtU3VyZ2UtU2tpcC1TY3JpcHRpbmcnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkaHR0cENsaWVudC5nZXQocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0dGhpcy5nb3QocmVxdWVzdClcblx0XHRcdFx0XHQub24oJ3JlZGlyZWN0JywgKHJlc3BvbnNlLCBuZXh0T3B0cykgPT4ge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNrID0gcmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddXG5cdFx0XHRcdFx0XHRcdFx0XHQubWFwKHRoaXMuY2t0b3VnaC5Db29raWUucGFyc2UpXG5cdFx0XHRcdFx0XHRcdFx0XHQudG9TdHJpbmcoKVxuXHRcdFx0XHRcdFx0XHRcdGlmIChjaykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ja2phci5zZXRDb29raWVTeW5jKGNrLCBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRuZXh0T3B0cy5jb29raWVKYXIgPSB0aGlzLmNramFyXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5sb2dFcnIoZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHRoaXMuY2tqYXIuc2V0Q29va2llU3luYyhyZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ10ubWFwKENvb2tpZS5wYXJzZSkudG9TdHJpbmcoKSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKFxuXHRcdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRcdHJhd0JvZHlcblx0XHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGJvZHkgPSBpY29udi5kZWNvZGUocmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0XHR7IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgcmF3Qm9keSwgYm9keSB9LFxuXHRcdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBtZXNzYWdlOiBlcnJvciwgcmVzcG9uc2U6IHJlc3BvbnNlIH0gPSBlcnJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UsXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgJiYgaWNvbnYuZGVjb2RlKHJlc3BvbnNlLnJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0cG9zdChyZXF1ZXN0LCBjYWxsYmFjayA9ICgpID0+IHsgfSkge1xuXHRcdGNvbnN0IG1ldGhvZCA9IHJlcXVlc3QubWV0aG9kXG5cdFx0XHQ/IHJlcXVlc3QubWV0aG9kLnRvTG9jYWxlTG93ZXJDYXNlKClcblx0XHRcdDogJ3Bvc3QnXG5cblx0XHQvLyDlpoLmnpzmjIflrprkuobor7fmsYLkvZMsIOS9huayoeaMh+WumiBgQ29udGVudC1UeXBlYOOAgWBjb250ZW50LXR5cGVgLCDliJnoh6rliqjnlJ/miJDjgIJcblx0XHRpZiAoXG5cdFx0XHRyZXF1ZXN0LmJvZHkgJiZcblx0XHRcdHJlcXVlc3QuaGVhZGVycyAmJlxuXHRcdFx0IXJlcXVlc3QuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gJiZcblx0XHRcdCFyZXF1ZXN0LmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddXG5cdFx0KSB7XG5cdFx0XHQvLyBIVFRQLzHjgIFIVFRQLzIg6YO95pSv5oyB5bCP5YaZIGhlYWRlcnNcblx0XHRcdHJlcXVlc3QuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuXHRcdH1cblx0XHQvLyDkuLrpgb/lhY3mjIflrprplJnor68gYGNvbnRlbnQtbGVuZ3RoYCDov5nph4zliKDpmaTor6XlsZ7mgKfvvIznlLHlt6Xlhbfnq68gKEh0dHBDbGllbnQpIOi0n+i0o+mHjeaWsOiuoeeul+W5tui1i+WAvFxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ0NvbnRlbnQtTGVuZ3RoJ11cblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydjb250ZW50LWxlbmd0aCddXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh0aGlzLmlzU3VyZ2UoKSAmJiB0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ2hlYWRlcnMuWC1TdXJnZS1Ta2lwLVNjcmlwdGluZycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRodHRwQ2xpZW50W21ldGhvZF0ocmVxdWVzdCwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRcdGlmICghZXJyb3IgJiYgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlLmJvZHkgPSBib2R5XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UsIGJvZHkpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZFxuXHRcdFx0XHRpZiAodGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdvcHRzLmhpbnRzJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhc2suZmV0Y2gocmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCBib2R5LCBib2R5Qnl0ZXMgfSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyb3IpID0+IGNhbGxiYWNrKChlcnJvciAmJiBlcnJvci5lcnJvcikgfHwgJ1VuZGVmaW5lZEVycm9yJylcblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdGxldCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKVxuXHRcdFx0XHR0aGlzLmluaXRHb3RFbnYocmVxdWVzdClcblx0XHRcdFx0Y29uc3QgeyB1cmwsIC4uLl9yZXF1ZXN0IH0gPSByZXF1ZXN0XG5cdFx0XHRcdHRoaXMuZ290W21ldGhvZF0odXJsLCBfcmVxdWVzdCkudGhlbihcblx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgc3RhdHVzQ29kZTogc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5IH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0Y29uc3QgYm9keSA9IGljb252LmRlY29kZShyYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5LCBib2R5IH0sXG5cdFx0XHRcdFx0XHRcdGJvZHlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnIpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHsgbWVzc2FnZTogZXJyb3IsIHJlc3BvbnNlOiByZXNwb25zZSB9ID0gZXJyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLFxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSAmJiBpY29udi5kZWNvZGUocmVzcG9uc2UucmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqIOekuuS+izokLnRpbWUoJ3l5eXktTU0tZGQgcXEgSEg6bW06c3MuUycpXG5cdCAqICAgIDokLnRpbWUoJ3l5eXlNTWRkSEhtbXNzUycpXG5cdCAqICAgIHk65bm0IE065pyIIGQ65pelIHE65a2jIEg65pe2IG065YiGIHM656eSIFM65q+r56eSXG5cdCAqICAgIOWFtuS4rXnlj6/pgIkwLTTkvY3ljaDkvY3nrKbjgIFT5Y+v6YCJMC0x5L2N5Y2g5L2N56ym77yM5YW25L2Z5Y+v6YCJMC0y5L2N5Y2g5L2N56ymXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQg5qC85byP5YyW5Y+C5pWwXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB0cyDlj6/pgIk6IOagueaNruaMh+WumuaXtumXtOaIs+i/lOWbnuagvOW8j+WMluaXpeacn1xuXHQgKlxuXHQgKi9cblx0dGltZShmb3JtYXQsIHRzID0gbnVsbCkge1xuXHRcdGNvbnN0IGRhdGUgPSB0cyA/IG5ldyBEYXRlKHRzKSA6IG5ldyBEYXRlKClcblx0XHRsZXQgbyA9IHtcblx0XHRcdCdNKyc6IGRhdGUuZ2V0TW9udGgoKSArIDEsXG5cdFx0XHQnZCsnOiBkYXRlLmdldERhdGUoKSxcblx0XHRcdCdIKyc6IGRhdGUuZ2V0SG91cnMoKSxcblx0XHRcdCdtKyc6IGRhdGUuZ2V0TWludXRlcygpLFxuXHRcdFx0J3MrJzogZGF0ZS5nZXRTZWNvbmRzKCksXG5cdFx0XHQncSsnOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxuXHRcdFx0J1MnOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdFx0fVxuXHRcdGlmICgvKHkrKS8udGVzdChmb3JtYXQpKVxuXHRcdFx0Zm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXG5cdFx0XHRcdFJlZ0V4cC4kMSxcblx0XHRcdFx0KGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpXG5cdFx0XHQpXG5cdFx0Zm9yIChsZXQgayBpbiBvKVxuXHRcdFx0aWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmb3JtYXQpKVxuXHRcdFx0XHRmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcblx0XHRcdFx0XHRSZWdFeHAuJDEsXG5cdFx0XHRcdFx0UmVnRXhwLiQxLmxlbmd0aCA9PSAxXG5cdFx0XHRcdFx0XHQ/IG9ba11cblx0XHRcdFx0XHRcdDogKCcwMCcgKyBvW2tdKS5zdWJzdHIoKCcnICsgb1trXSkubGVuZ3RoKVxuXHRcdFx0XHQpXG5cdFx0cmV0dXJuIGZvcm1hdFxuXHR9XG5cblx0LyoqXG5cdCAqIOezu+e7n+mAmuefpVxuXHQgKlxuXHQgKiA+IOmAmuefpeWPguaVsDog5ZCM5pe25pSv5oyBIFF1YW5YIOWSjCBMb29uIOS4pOenjeagvOW8jywgRW52SnPmoLnmja7ov5DooYznjq/looPoh6rliqjovazmjaIsIFN1cmdlIOeOr+Wig+S4jeaUr+aMgeWkmuWqkuS9k+mAmuefpVxuXHQgKlxuXHQgKiDnpLrkvos6XG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCAndHdpdHRlcjovLycpXG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCB7ICdvcGVuLXVybCc6ICd0d2l0dGVyOi8vJywgJ21lZGlhLXVybCc6ICdodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9tb2R1bGVzL29wZW5fZ3JhcGgvZ2l0aHViLW1hcmsucG5nJyB9KVxuXHQgKiAkLm1zZyh0aXRsZSwgc3VidCwgZGVzYywgeyAnb3Blbi11cmwnOiAnaHR0cHM6Ly9iaW5nLmNvbScsICdtZWRpYS11cmwnOiAnaHR0cHM6Ly9naXRodWIuZ2l0aHViYXNzZXRzLmNvbS9pbWFnZXMvbW9kdWxlcy9vcGVuX2dyYXBoL2dpdGh1Yi1tYXJrLnBuZycgfSlcblx0ICpcblx0ICogQHBhcmFtIHsqfSB0aXRsZSDmoIfpophcblx0ICogQHBhcmFtIHsqfSBzdWJ0IOWJr+agh+mimFxuXHQgKiBAcGFyYW0geyp9IGRlc2Mg6YCa55+l6K+m5oOFXG5cdCAqIEBwYXJhbSB7Kn0gb3B0cyDpgJrnn6Xlj4LmlbBcblx0ICpcblx0ICovXG5cdG1zZyh0aXRsZSA9IG5hbWUsIHN1YnQgPSAnJywgZGVzYyA9ICcnLCBvcHRzKSB7XG5cdFx0Y29uc3QgdG9FbnZPcHRzID0gKHJhd29wdHMpID0+IHtcblx0XHRcdHN3aXRjaCAodHlwZW9mIHJhd29wdHMpIHtcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgdXJsOiByYXdvcHRzIH1cblx0XHRcdFx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJhd29wdHNcblx0XHRcdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7ICdvcGVuLXVybCc6IHJhd29wdHMgfVxuXHRcdFx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdGxldCBvcGVuVXJsID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5VcmwgfHwgcmF3b3B0c1snb3Blbi11cmwnXVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyB1cmw6IG9wZW5VcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnTG9vbic6IHtcblx0XHRcdFx0XHRcdFx0bGV0IG9wZW5VcmwgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHMub3BlblVybCB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzWydvcGVuLXVybCddXG5cdFx0XHRcdFx0XHRcdGxldCBtZWRpYVVybCA9IHJhd29wdHMubWVkaWFVcmwgfHwgcmF3b3B0c1snbWVkaWEtdXJsJ11cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgb3BlblVybCwgbWVkaWFVcmwgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzoge1xuXHRcdFx0XHRcdFx0XHRsZXQgb3BlblVybCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1snb3Blbi11cmwnXSB8fCByYXdvcHRzLnVybCB8fCByYXdvcHRzLm9wZW5Vcmxcblx0XHRcdFx0XHRcdFx0bGV0IG1lZGlhVXJsID0gcmF3b3B0c1snbWVkaWEtdXJsJ10gfHwgcmF3b3B0cy5tZWRpYVVybFxuXHRcdFx0XHRcdFx0XHRsZXQgdXBkYXRlUGFzdGVib2FyZCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0c1sndXBkYXRlLXBhc3RlYm9hcmQnXSB8fCByYXdvcHRzLnVwZGF0ZVBhc3RlYm9hcmRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHQnb3Blbi11cmwnOiBvcGVuVXJsLFxuXHRcdFx0XHRcdFx0XHRcdCdtZWRpYS11cmwnOiBtZWRpYVVybCxcblx0XHRcdFx0XHRcdFx0XHQndXBkYXRlLXBhc3RlYm9hcmQnOiB1cGRhdGVQYXN0ZWJvYXJkXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlzTXV0ZSkge1xuXHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdCRub3RpZmljYXRpb24ucG9zdCh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdFx0JG5vdGlmeSh0aXRsZSwgc3VidCwgZGVzYywgdG9FbnZPcHRzKG9wdHMpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghdGhpcy5pc011dGVMb2cpIHtcblx0XHRcdGxldCBsb2dzID0gWycnLCAnPT09PT09PT09PT09PT3wn5Oj57O757uf6YCa55+l8J+Toz09PT09PT09PT09PT09J11cblx0XHRcdGxvZ3MucHVzaCh0aXRsZSlcblx0XHRcdHN1YnQgPyBsb2dzLnB1c2goc3VidCkgOiAnJ1xuXHRcdFx0ZGVzYyA/IGxvZ3MucHVzaChkZXNjKSA6ICcnXG5cdFx0XHRjb25zb2xlLmxvZyhsb2dzLmpvaW4oJ1xcbicpKVxuXHRcdFx0dGhpcy5sb2dzID0gdGhpcy5sb2dzLmNvbmNhdChsb2dzKVxuXHRcdH1cblx0fVxuXG5cdGxvZyguLi5sb2dzKSB7XG5cdFx0aWYgKGxvZ3MubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5sb2dzID0gWy4uLnRoaXMubG9ncywgLi4ubG9nc11cblx0XHR9XG5cdFx0Y29uc29sZS5sb2cobG9ncy5qb2luKHRoaXMubG9nU2VwYXJhdG9yKSlcblx0fVxuXG5cdGxvZ0VycihlcnJvcikge1xuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8gJHt0aGlzLm5hbWV9LCDplJnor68hYCwgZXJyb3IpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5sb2coJycsIGDinZfvuI8ke3RoaXMubmFtZX0sIOmUmeivryFgLCBlcnJvci5zdGFjaylcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHR3YWl0KHRpbWUpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkpXG5cdH1cblxuXHRkb25lKHZhbCA9IHt9KSB7XG5cdFx0Y29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cdFx0Y29uc3QgY29zdFRpbWUgPSAoZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDBcblx0XHR0aGlzLmxvZygnJywgYPCfmqkgJHt0aGlzLm5hbWV9LCDnu5PmnZ8hIPCflZsgJHtjb3N0VGltZX0g56eSYClcblx0XHR0aGlzLmxvZygpXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQkZG9uZSh2YWwpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0cHJvY2Vzcy5leGl0KDEpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcblx0ICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1ZpcmdpbENseW5lL0dldFNvbWVGcmllcy9ibG9iL21haW4vZnVuY3Rpb24vZ2V0RU5WL2dldEVOVi5qc1xuXHQgKiBAYXV0aG9yIFZpcmdpbENseW5lXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBQZXJzaXN0ZW50IFN0b3JlIEtleVxuXHQgKiBAcGFyYW0ge0FycmF5fSBuYW1lcyAtIFBsYXRmb3JtIE5hbWVzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIERlZmF1bHQgRGF0YWJhc2Vcblx0ICogQHJldHVybiB7T2JqZWN0fSB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfVxuXHQgKi9cblx0Z2V0RU5WKGtleSwgbmFtZXMsIGRhdGFiYXNlKSB7XG5cdFx0Ly90aGlzLmxvZyhg4piR77iPICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBCb3hKcyAqKioqKioqKioqKioqKioqKi9cblx0XHQvLyDljIXoo4XkuLrlsYDpg6jlj5jph4/vvIznlKjlrozph4rmlL7lhoXlrZhcblx0XHQvLyBCb3hKc+eahOa4heepuuaTjeS9nOi/lOWbnuWBh+WAvOepuuWtl+espuS4siwg6YC76L6R5oiW5pON5L2c56ym5Lya5Zyo5bem5L6n5pON5L2c5pWw5Li65YGH5YC85pe26L+U5Zue5Y+z5L6n5pON5L2c5pWw44CCXG5cdFx0bGV0IEJveEpzID0gdGhpcy5nZXRqc29uKGtleSwgZGF0YWJhc2UpO1xuXHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEJveEpz57G75Z6LOiAke3R5cGVvZiBCb3hKc31gLCBgQm94SnPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQm94SnMpfWAsIFwiXCIpO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBBcmd1bWVudCAqKioqKioqKioqKioqKioqKi9cblx0XHRsZXQgQXJndW1lbnQgPSB7fTtcblx0XHRpZiAodHlwZW9mICRhcmd1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0aWYgKEJvb2xlYW4oJGFyZ3VtZW50KSkge1xuXHRcdFx0XHQvL3RoaXMubG9nKGDwn46JICR7dGhpcy5uYW1lfSwgJEFyZ3VtZW50YCk7XG5cdFx0XHRcdGxldCBhcmcgPSBPYmplY3QuZnJvbUVudHJpZXMoJGFyZ3VtZW50LnNwbGl0KFwiJlwiKS5tYXAoKGl0ZW0pID0+IGl0ZW0uc3BsaXQoXCI9XCIpLm1hcChpID0+IGkucmVwbGFjZSgvXFxcIi9nLCAnJykpKSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoYXJnKSk7XG5cdFx0XHRcdGZvciAobGV0IGl0ZW0gaW4gYXJnKSB0aGlzLnNldFBhdGgoQXJndW1lbnQsIGl0ZW0sIGFyZ1tpdGVtXSk7XG5cdFx0XHRcdC8vdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpKTtcblx0XHRcdH07XG5cdFx0XHQvL3RoaXMubG9nKGDinIUgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYEFyZ3VtZW5057G75Z6LOiAke3R5cGVvZiBBcmd1bWVudH1gLCBgQXJndW1lbnTlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQXJndW1lbnQpfWAsIFwiXCIpO1xuXHRcdH07XG5cdFx0LyoqKioqKioqKioqKioqKioqIFN0b3JlICoqKioqKioqKioqKioqKioqL1xuXHRcdGNvbnN0IFN0b3JlID0geyBTZXR0aW5nczogZGF0YWJhc2U/LkRlZmF1bHQ/LlNldHRpbmdzIHx8IHt9LCBDb25maWdzOiBkYXRhYmFzZT8uRGVmYXVsdD8uQ29uZmlncyB8fCB7fSwgQ2FjaGVzOiB7fSB9O1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShuYW1lcykpIG5hbWVzID0gW25hbWVzXTtcblx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBuYW1lc+exu+WeizogJHt0eXBlb2YgbmFtZXN9YCwgYG5hbWVz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KG5hbWVzKX1gLCBcIlwiKTtcblx0XHRmb3IgKGxldCBuYW1lIG9mIG5hbWVzKSB7XG5cdFx0XHRTdG9yZS5TZXR0aW5ncyA9IHsgLi4uU3RvcmUuU2V0dGluZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LlNldHRpbmdzLCAuLi5Bcmd1bWVudCwgLi4uQm94SnM/LltuYW1lXT8uU2V0dGluZ3MgfTtcblx0XHRcdFN0b3JlLkNvbmZpZ3MgPSB7IC4uLlN0b3JlLkNvbmZpZ3MsIC4uLmRhdGFiYXNlPy5bbmFtZV0/LkNvbmZpZ3MgfTtcblx0XHRcdGlmIChCb3hKcz8uW25hbWVdPy5DYWNoZXMgJiYgdHlwZW9mIEJveEpzPy5bbmFtZV0/LkNhY2hlcyA9PT0gXCJzdHJpbmdcIikgQm94SnNbbmFtZV0uQ2FjaGVzID0gSlNPTi5wYXJzZShCb3hKcz8uW25hbWVdPy5DYWNoZXMpO1xuXHRcdFx0U3RvcmUuQ2FjaGVzID0geyAuLi5TdG9yZS5DYWNoZXMsIC4uLkJveEpzPy5bbmFtZV0/LkNhY2hlcyB9O1xuXHRcdH07XG5cdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU3RvcmUuU2V0dGluZ3Pnsbvlnos6ICR7dHlwZW9mIFN0b3JlLlNldHRpbmdzfWAsIGBTdG9yZS5TZXR0aW5nczogJHtKU09OLnN0cmluZ2lmeShTdG9yZS5TZXR0aW5ncyl9YCwgXCJcIik7XG5cdFx0dGhpcy50cmF2ZXJzZU9iamVjdChTdG9yZS5TZXR0aW5ncywgKGtleSwgdmFsdWUpID0+IHtcblx0XHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCB0cmF2ZXJzZU9iamVjdGAsIGAke2tleX06ICR7dHlwZW9mIHZhbHVlfWAsIGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWAsIFwiXCIpO1xuXHRcdFx0aWYgKHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpOyAvLyDlrZfnrKbkuLLovaxCb29sZWFuXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0aWYgKHZhbHVlLmluY2x1ZGVzKFwiLFwiKSkgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIixcIikubWFwKGl0ZW0gPT4gdGhpcy5zdHJpbmcybnVtYmVyKGl0ZW0pKTsgLy8g5a2X56ym5Liy6L2s5pWw57uE6L2s5pWw5a2XXG5cdFx0XHRcdGVsc2UgdmFsdWUgPSB0aGlzLnN0cmluZzJudW1iZXIodmFsdWUpOyAvLyDlrZfnrKbkuLLovazmlbDlrZdcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fSk7XG5cdFx0Ly90aGlzLmxvZyhg4pyFICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTdG9yZTogJHt0eXBlb2YgU3RvcmUuQ2FjaGVzfWAsIGBTdG9yZeWGheWuuTogJHtKU09OLnN0cmluZ2lmeShTdG9yZSl9YCwgXCJcIik7XG5cdFx0cmV0dXJuIFN0b3JlO1xuXHR9O1xuXG5cdC8qKioqKioqKioqKioqKioqKiBmdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cblx0c2V0UGF0aChvYmplY3QsIHBhdGgsIHZhbHVlKSB7IHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgobywgcCwgaSkgPT4gb1twXSA9IHBhdGguc3BsaXQoXCIuXCIpLmxlbmd0aCA9PT0gKytpID8gdmFsdWUgOiBvW3BdIHx8IHt9LCBvYmplY3QpIH1cblx0dHJhdmVyc2VPYmplY3QobywgYykgeyBmb3IgKHZhciB0IGluIG8pIHsgdmFyIG4gPSBvW3RdOyBvW3RdID0gXCJvYmplY3RcIiA9PSB0eXBlb2YgbiAmJiBudWxsICE9PSBuID8gdGhpcy50cmF2ZXJzZU9iamVjdChuLCBjKSA6IGModCwgbikgfSByZXR1cm4gbyB9XG5cdHN0cmluZzJudW1iZXIoc3RyaW5nKSB7IGlmIChzdHJpbmcgJiYgIWlzTmFOKHN0cmluZykpIHN0cmluZyA9IHBhcnNlSW50KHN0cmluZywgMTApOyByZXR1cm4gc3RyaW5nIH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0dHAge1xuXHRjb25zdHJ1Y3RvcihlbnYpIHtcblx0XHR0aGlzLmVudiA9IGVudlxuXHR9XG5cblx0c2VuZChvcHRzLCBtZXRob2QgPSAnR0VUJykge1xuXHRcdG9wdHMgPSB0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycgPyB7IHVybDogb3B0cyB9IDogb3B0c1xuXHRcdGxldCBzZW5kZXIgPSB0aGlzLmdldFxuXHRcdGlmIChtZXRob2QgPT09ICdQT1NUJykge1xuXHRcdFx0c2VuZGVyID0gdGhpcy5wb3N0XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRzZW5kZXIuY2FsbCh0aGlzLCBvcHRzLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcikgcmVqZWN0KGVycm9yKVxuXHRcdFx0XHRlbHNlIHJlc29sdmUocmVzcG9uc2UpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRnZXQob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cylcblx0fVxuXG5cdHBvc3Qob3B0cykge1xuXHRcdHJldHVybiB0aGlzLnNlbmQuY2FsbCh0aGlzLmVudiwgb3B0cywgJ1BPU1QnKVxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVUkkge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW10pIHtcblx0XHR0aGlzLm5hbWUgPSBcIlVSSSB2MS4yLjZcIjtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdHRoaXMuanNvbiA9IHsgc2NoZW1lOiBcIlwiLCBob3N0OiBcIlwiLCBwYXRoOiBcIlwiLCBxdWVyeToge30gfTtcblx0fTtcblxuXHRwYXJzZSh1cmwpIHtcblx0XHRjb25zdCBVUkxSZWdleCA9IC8oPzooPzxzY2hlbWU+LispOlxcL1xcLyg/PGhvc3Q+W14vXSspKT9cXC8/KD88cGF0aD5bXj9dKyk/XFw/Pyg/PHF1ZXJ5PlteP10rKT8vO1xuXHRcdGxldCBqc29uID0gdXJsLm1hdGNoKFVSTFJlZ2V4KT8uZ3JvdXBzID8/IG51bGw7XG5cdFx0aWYgKGpzb24/LnBhdGgpIGpzb24ucGF0aHMgPSBqc29uLnBhdGguc3BsaXQoXCIvXCIpOyBlbHNlIGpzb24ucGF0aCA9IFwiXCI7XG5cdFx0Ly9pZiAoanNvbj8ucGF0aHM/LmF0KC0xKT8uaW5jbHVkZXMoXCIuXCIpKSBqc29uLmZvcm1hdCA9IGpzb24ucGF0aHMuYXQoLTEpLnNwbGl0KFwiLlwiKS5hdCgtMSk7XG5cdFx0aWYgKGpzb24/LnBhdGhzKSB7XG5cdFx0XHRjb25zdCBmaWxlTmFtZSA9IGpzb24ucGF0aHNbanNvbi5wYXRocy5sZW5ndGggLSAxXTtcblx0XHRcdGlmIChmaWxlTmFtZT8uaW5jbHVkZXMoXCIuXCIpKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSBmaWxlTmFtZS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdGpzb24uZm9ybWF0ID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoanNvbj8ucXVlcnkpIGpzb24ucXVlcnkgPSBPYmplY3QuZnJvbUVudHJpZXMoanNvbi5xdWVyeS5zcGxpdChcIiZcIikubWFwKChwYXJhbSkgPT4gcGFyYW0uc3BsaXQoXCI9XCIpKSk7XG5cdFx0cmV0dXJuIGpzb25cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IHRoaXMuanNvbikge1xuXHRcdGxldCB1cmwgPSBcIlwiO1xuXHRcdGlmIChqc29uPy5zY2hlbWUgJiYganNvbj8uaG9zdCkgdXJsICs9IGpzb24uc2NoZW1lICsgXCI6Ly9cIiArIGpzb24uaG9zdDtcblx0XHRpZiAoanNvbj8ucGF0aCkgdXJsICs9IChqc29uPy5ob3N0KSA/IFwiL1wiICsganNvbi5wYXRoIDoganNvbi5wYXRoO1xuXHRcdGlmIChqc29uPy5xdWVyeSkgdXJsICs9IFwiP1wiICsgT2JqZWN0LmVudHJpZXMoanNvbi5xdWVyeSkubWFwKHBhcmFtID0+IHBhcmFtLmpvaW4oXCI9XCIpKS5qb2luKFwiJlwiKTtcblx0XHRyZXR1cm4gdXJsXG5cdH07XG59XG4iLCIvLyByZWZlcjogaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYnZ0dDEvXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWVFQge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW1wibWlsbGlzZWNvbmRzXCIsIFwidGltZVN0YW1wXCIsIFwic2luZ2xlTGluZVwiLCBcIlxcblwiXSkge1xuXHRcdHRoaXMubmFtZSA9IFwiV2ViVlRUIHYyLjEuNFwiO1xuXHRcdHRoaXMub3B0cyA9IG9wdHM7XG5cdFx0dGhpcy5saW5lQnJlYWsgPSAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxuXCIpKSA/IFwiXFxuXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXCIpKSA/IFwiXFxyXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXFxuXCIpKSA/IFwiXFxyXFxuXCIgOiBcIlxcblwiO1xuXHRcdHRoaXMudnR0ID0gbmV3IFN0cmluZztcblx0XHR0aGlzLmpzb24gPSB7IGhlYWRlcnM6IHt9LCBjb21tZW50czogW10sIHN0eWxlOiBcIlwiLCBib2R5OiBbXSB9O1xuXHR9O1xuXG5cdHBhcnNlKHZ0dCA9IHRoaXMudnR0KSB7XG5cdFx0Y29uc3QgV2ViVlRUX2N1ZV9SZWdleCA9ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJtaWxsaXNlY29uZHNcIikpID8gL14oKD88aW5kZXg+XFxkKykoXFxyXFxufFxccnxcXG4pKT8oPzx0aW1pbmc+KD88c3RhcnRUaW1lPlswLTk6LixdKykgLS0+ICg/PGVuZFRpbWU+WzAtOTouLF0rKSkgPyg/PHNldHRpbmdzPi4rKT9bXl0oPzx0ZXh0PltcXHNcXFNdKik/JC9cblx0XHRcdDogL14oKD88aW5kZXg+XFxkKykoXFxyXFxufFxccnxcXG4pKT8oPzx0aW1pbmc+KD88c3RhcnRUaW1lPlswLTk6XSspWzAtOS4sXSsgLS0+ICg/PGVuZFRpbWU+WzAtOTpdKylbMC05LixdKykgPyg/PHNldHRpbmdzPi4rKT9bXl0oPzx0ZXh0PltcXHNcXFNdKik/JC9cblx0XHRjb25zdCBBcnJheSA9IHZ0dC5zcGxpdCgvXFxyXFxuXFxyXFxufFxcclxccnxcXG5cXG4vKTtcblx0XHRjb25zdCBKc29uID0geyBoZWFkZXJzOiB7fSwgY29tbWVudHM6IFtdLCBzdHlsZTogXCJcIiwgYm9keTogW10gfTtcblxuXHRcdEFycmF5LmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRpdGVtID0gaXRlbS50cmltKCk7XG5cdFx0XHRzd2l0Y2ggKGl0ZW0uc3Vic3RyaW5nKDAsIDUpLnRyaW0oKSkge1xuXHRcdFx0XHRjYXNlIFwiV0VCVlRcIjoge1xuXHRcdFx0XHRcdGxldCBjdWVzID0gaXRlbS5zcGxpdCgvXFxyXFxufFxccnxcXG4vKTtcblx0XHRcdFx0XHRKc29uLmhlYWRlcnMudHlwZSA9IGN1ZXMuc2hpZnQoKTtcblx0XHRcdFx0XHRKc29uLmhlYWRlcnMub3B0aW9ucyA9IGN1ZXM7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJOT1RFXCI6IHtcblx0XHRcdFx0XHRKc29uLmNvbW1lbnRzLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNhc2UgXCJTVFlMRVwiOiB7XG5cdFx0XHRcdFx0bGV0IGN1ZXMgPSBpdGVtLnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pO1xuXHRcdFx0XHRcdGN1ZXMuc2hpZnQoKTtcblx0XHRcdFx0XHRKc29uLnN0eWxlID0gY3Vlcy5qb2luKHRoaXMubGluZUJyZWFrKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRsZXQgY3VlID0gaXRlbS5tYXRjaChXZWJWVFRfY3VlX1JlZ2V4KT8uZ3JvdXBzO1xuXHRcdFx0XHRcdGlmIChjdWUpIHtcblx0XHRcdFx0XHRcdGlmIChKc29uLmhlYWRlcnM/LnR5cGUgIT09IFwiV0VCVlRUXCIpIHtcblx0XHRcdFx0XHRcdFx0Y3VlLnRpbWluZyA9IGN1ZT8udGltaW5nPy5yZXBsYWNlPy4oXCIsXCIsIFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0Y3VlLnN0YXJ0VGltZSA9IGN1ZT8uc3RhcnRUaW1lPy5yZXBsYWNlPy4oXCIsXCIsIFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0Y3VlLmVuZFRpbWUgPSBjdWU/LmVuZFRpbWU/LnJlcGxhY2U/LihcIixcIiwgXCIuXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0cy5pbmNsdWRlcyhcInRpbWVTdGFtcFwiKSkge1xuXHRcdFx0XHRcdFx0XHRsZXQgSVNPU3RyaW5nID0gY3VlPy5zdGFydFRpbWU/LnJlcGxhY2U/LigvKC4qKS8sIFwiMTk3MC0wMS0wMVQkMVpcIilcblx0XHRcdFx0XHRcdFx0Y3VlLnRpbWVTdGFtcCA9IHRoaXMub3B0cy5pbmNsdWRlcyhcIm1pbGxpc2Vjb25kc1wiKSA/IERhdGUucGFyc2UoSVNPU3RyaW5nKSA6IERhdGUucGFyc2UoSVNPU3RyaW5nKSAvIDEwMDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjdWUudGV4dCA9IGN1ZT8udGV4dD8udHJpbUVuZD8uKCk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRzLmluY2x1ZGVzKFwic2luZ2xlTGluZVwiKSkge1xuXHRcdFx0XHRcdFx0XHRjdWUudGV4dCA9IGN1ZT8udGV4dD8ucmVwbGFjZT8uKC9cXHJcXG58XFxyfFxcbi8sIFwiIFwiKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRzLmluY2x1ZGVzKFwibXVsdGlMaW5lXCIpKSB7XG5cdFx0XHRcdFx0XHRcdGN1ZS50ZXh0ID0gY3VlPy50ZXh0Py5zcGxpdD8uKC9cXHJcXG58XFxyfFxcbi8pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0SnNvbi5ib2R5LnB1c2goY3VlKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBKc29uXG5cdH07XG5cblx0c3RyaW5naWZ5KGpzb24gPSB0aGlzLmpzb24pIHtcblx0XHRsZXQgdnR0ID0gW1xuXHRcdFx0anNvbi5oZWFkZXJzID0gW2pzb24uaGVhZGVycz8udHlwZSB8fCBcIlwiLCBqc29uLmhlYWRlcnM/Lm9wdGlvbnMgfHwgXCJcIl0uZmxhdChJbmZpbml0eSkuam9pbih0aGlzLmxpbmVCcmVhayksXG5cdFx0XHRqc29uLmNvbW1lbnRzID0ganNvbj8uY29tbWVudHM/LmpvaW4/Lih0aGlzLmxpbmVCcmVhayksXG5cdFx0XHRqc29uLnN0eWxlID0gKGpzb24/LnN0eWxlPy5sZW5ndGggPiAwKSA/IFtcIlNUWUxFXCIsIGpzb24uc3R5bGVdLmpvaW4odGhpcy5saW5lQnJlYWspIDogXCJcIixcblx0XHRcdGpzb24uYm9keSA9IGpzb24uYm9keS5tYXAoaXRlbSA9PiB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0udGV4dCkpIGl0ZW0udGV4dCA9IGl0ZW0udGV4dC5qb2luKHRoaXMubGluZUJyZWFrKTtcblx0XHRcdFx0aXRlbSA9IGAkeyhpdGVtLmluZGV4KSA/IGl0ZW0uaW5kZXggKyB0aGlzLmxpbmVCcmVhayA6IFwiXCJ9JHtpdGVtLnRpbWluZ30gJHtpdGVtPy5zZXR0aW5ncyA/PyBcIlwifSR7dGhpcy5saW5lQnJlYWt9JHtpdGVtLnRleHR9YDtcblx0XHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0XHR9KS5qb2luKHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWspXG5cdFx0XS5qb2luKHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWspLnRyaW0oKSArIHRoaXMubGluZUJyZWFrICsgdGhpcy5saW5lQnJlYWs7XG5cdFx0cmV0dXJuIHZ0dFxuXHR9O1xufTtcbiIsIi8vIHJlZmVyOiBodHRwczovL2dpdGh1Yi5jb20vUGVuZy1ZTS9RdWFuWC9ibG9iL21hc3Rlci9Ub29scy9YTUxQYXJzZXIveG1sLXBhcnNlci5qc1xuLy8gcmVmZXI6IGh0dHBzOi8vZ29lc3NuZXIubmV0L2Rvd25sb2FkL3Byai9qc29ueG1sL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWE1MIHtcblx0I0FUVFJJQlVURV9LRVkgPSBcIkBcIjtcblx0I0NISUxEX05PREVfS0VZID0gXCIjXCI7XG5cdCNVTkVTQ0FQRSA9IHtcblx0XHRcIiZhbXA7XCI6IFwiJlwiLFxuXHRcdFwiJmx0O1wiOiBcIjxcIixcblx0XHRcIiZndDtcIjogXCI+XCIsXG5cdFx0XCImYXBvcztcIjogXCInXCIsXG5cdFx0XCImcXVvdDtcIjogJ1wiJ1xuXHR9O1xuXHQjRVNDQVBFID0ge1xuXHRcdFwiJlwiOiBcIiZhbXA7XCIsXG5cdFx0XCI8XCI6IFwiJmx0O1wiLFxuXHRcdFwiPlwiOiBcIiZndDtcIixcblx0XHRcIidcIjogXCImYXBvcztcIixcblx0XHQnXCInOiBcIiZxdW90O1wiXG5cdH07XG5cblx0Y29uc3RydWN0b3Iob3B0cykge1xuXHRcdHRoaXMubmFtZSA9IFwiWE1MIHYwLjQuMC0yXCI7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblx0XHRCaWdJbnQucHJvdG90eXBlLnRvSlNPTiA9ICgpID0+IHRoaXMudG9TdHJpbmcoKTtcblx0fTtcblxuXHRwYXJzZSh4bWwgPSBuZXcgU3RyaW5nLCByZXZpdmVyID0gXCJcIikge1xuXHRcdGNvbnN0IFVORVNDQVBFID0gdGhpcy4jVU5FU0NBUEU7XG5cdFx0Y29uc3QgQVRUUklCVVRFX0tFWSA9IHRoaXMuI0FUVFJJQlVURV9LRVk7XG5cdFx0Y29uc3QgQ0hJTERfTk9ERV9LRVkgPSB0aGlzLiNDSElMRF9OT0RFX0tFWTtcblx0XHRjb25zdCBET00gPSB0b0RPTSh4bWwpO1xuXHRcdGxldCBqc29uID0gZnJvbVhNTChET00sIHJldml2ZXIpO1xuXHRcdHJldHVybiBqc29uO1xuXG5cdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdGZ1bmN0aW9uIHRvRE9NKHRleHQpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSB0ZXh0LnJlcGxhY2UoL15bIFxcdF0rL2dtLCBcIlwiKVxuXHRcdFx0XHQuc3BsaXQoLzwoW14hPD4/XSg/OidbXFxTXFxzXSo/J3xcIltcXFNcXHNdKj9cInxbXidcIjw+XSkqfCEoPzotLVtcXFNcXHNdKj8tLXxcXFtbXlxcW1xcXSdcIjw+XStcXFtbXFxTXFxzXSo/XV18RE9DVFlQRVteXFxbPD5dKj9cXFtbXFxTXFxzXSo/XXwoPzpFTlRJVFlbXlwiPD5dKj9cIltcXFNcXHNdKj9cIik/W1xcU1xcc10qPyl8XFw/W1xcU1xcc10qP1xcPyk+Lyk7XG5cdFx0XHRjb25zdCBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcblxuXHRcdFx0Ly8gcm9vdCBlbGVtZW50XG5cdFx0XHRjb25zdCByb290ID0geyBjaGlsZHJlbjogW10gfTtcblx0XHRcdGxldCBlbGVtID0gcm9vdDtcblxuXHRcdFx0Ly8gZG9tIHRyZWUgc3RhY2tcblx0XHRcdGNvbnN0IHN0YWNrID0gW107XG5cblx0XHRcdC8vIHBhcnNlXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDspIHtcblx0XHRcdFx0Ly8gdGV4dCBub2RlXG5cdFx0XHRcdGNvbnN0IHN0ciA9IGxpc3RbaSsrXTtcblx0XHRcdFx0aWYgKHN0cikgYXBwZW5kVGV4dChzdHIpO1xuXG5cdFx0XHRcdC8vIGNoaWxkIG5vZGVcblx0XHRcdFx0Y29uc3QgdGFnID0gbGlzdFtpKytdO1xuXHRcdFx0XHRpZiAodGFnKSBwYXJzZU5vZGUodGFnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByb290O1xuXHRcdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2VOb2RlKHRhZykge1xuXHRcdFx0XHRjb25zdCB0YWdzID0gdGFnLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0Y29uc3QgbmFtZSA9IHRhZ3Muc2hpZnQoKTtcblx0XHRcdFx0Y29uc3QgbGVuZ3RoID0gdGFncy5sZW5ndGg7XG5cdFx0XHRcdGxldCBjaGlsZCA9IHt9O1xuXHRcdFx0XHRzd2l0Y2ggKG5hbWVbMF0pIHtcblx0XHRcdFx0XHRjYXNlIFwiL1wiOlxuXHRcdFx0XHRcdFx0Ly8gY2xvc2UgdGFnXG5cdFx0XHRcdFx0XHRjb25zdCBjbG9zZWQgPSB0YWcucmVwbGFjZSgvXlxcL3xbXFxzXFwvXS4qJC9nLCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0d2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0YWdOYW1lID0gZWxlbT8ubmFtZT8udG9Mb3dlckNhc2U/LigpO1xuXHRcdFx0XHRcdFx0XHRlbGVtID0gc3RhY2sucG9wKCk7XG5cdFx0XHRcdFx0XHRcdGlmICh0YWdOYW1lID09PSBjbG9zZWQpIGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIj9cIjpcblx0XHRcdFx0XHRcdC8vIFhNTCBkZWNsYXJhdGlvblxuXHRcdFx0XHRcdFx0Y2hpbGQubmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHRjaGlsZC5yYXcgPSB0YWdzLmpvaW4oXCIgXCIpO1xuXHRcdFx0XHRcdFx0YXBwZW5kQ2hpbGQoY2hpbGQpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIiFcIjpcblx0XHRcdFx0XHRcdGlmICgvIVxcW0NEQVRBXFxbKC4rKVxcXVxcXS8udGVzdCh0YWcpKSB7XG5cdFx0XHRcdFx0XHRcdC8vIENEQVRBIHNlY3Rpb25cblx0XHRcdFx0XHRcdFx0Y2hpbGQubmFtZSA9IFwiIUNEQVRBXCI7XG5cdFx0XHRcdFx0XHRcdC8vY2hpbGQucmF3ID0gdGFnLnNsaWNlKDksIC0yKTtcblx0XHRcdFx0XHRcdFx0Y2hpbGQucmF3ID0gdGFnLm1hdGNoKC8hXFxbQ0RBVEFcXFsoLispXFxdXFxdLyk7XG5cdFx0XHRcdFx0XHRcdC8vYXBwZW5kVGV4dCh0YWcuc2xpY2UoOSwgLTIpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIENvbW1lbnQgc2VjdGlvblxuXHRcdFx0XHRcdFx0XHRjaGlsZC5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdFx0Y2hpbGQucmF3ID0gdGFncy5qb2luKFwiIFwiKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Y2hpbGQgPSBvcGVuVGFnKHRhZyk7XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKCh0YWdzPy5bbGVuZ3RoIC0gMV0gPz8gbmFtZSkuc2xpY2UoLTEpKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCIvXCI6XG5cdFx0XHRcdFx0XHRcdFx0Ly9jaGlsZC5oYXNDaGlsZCA9IGZhbHNlOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBjaGlsZC5jaGlsZHJlbjsgLy8gZW1wdHlUYWdcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJsaW5rXCI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vY2hpbGQuaGFzQ2hpbGQgPSBmYWxzZTsgLy8gZW1wdHlUYWdcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGNoaWxkLmNoaWxkcmVuOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN0YWNrLnB1c2goZWxlbSk7IC8vIG9wZW5UYWdcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxlbSA9IGNoaWxkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGZ1bmN0aW9uIG9wZW5UYWcodGFnKSB7XG5cdFx0XHRcdFx0Y29uc3QgZWxlbSA9IHsgY2hpbGRyZW46IFtdIH07XG5cdFx0XHRcdFx0dGFnID0gdGFnLnJlcGxhY2UoL1xccypcXC8/JC8sIFwiXCIpO1xuXHRcdFx0XHRcdGNvbnN0IHBvcyA9IHRhZy5zZWFyY2goL1tcXHM9J1wiXFwvXS8pO1xuXHRcdFx0XHRcdGlmIChwb3MgPCAwKSB7XG5cdFx0XHRcdFx0XHRlbGVtLm5hbWUgPSB0YWc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0ubmFtZSA9IHRhZy5zdWJzdHIoMCwgcG9zKTtcblx0XHRcdFx0XHRcdGVsZW0udGFnID0gdGFnLnN1YnN0cihwb3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdFx0fTtcblx0XHRcdH07XG5cblx0XHRcdGZ1bmN0aW9uIGFwcGVuZFRleHQoc3RyKSB7XG5cdFx0XHRcdC8vc3RyID0gcmVtb3ZlU3BhY2VzKHN0cik7XG5cdFx0XHRcdHN0ciA9IHJlbW92ZUJyZWFrTGluZShzdHIpO1xuXHRcdFx0XHQvL3N0ciA9IHN0cj8udHJpbT8uKCk7XG5cdFx0XHRcdGlmIChzdHIpIGFwcGVuZENoaWxkKHVuZXNjYXBlWE1MKHN0cikpO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIHJlbW92ZUJyZWFrTGluZShzdHIpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RyPy5yZXBsYWNlPy4oL14oXFxyXFxufFxccnxcXG58XFx0KSt8KFxcclxcbnxcXHJ8XFxufFxcdCkrJC9nLCBcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBhcHBlbmRDaGlsZChjaGlsZCkge1xuXHRcdFx0XHRlbGVtLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdGZ1bmN0aW9uIGZyb21QbGlzdChlbGVtLCByZXZpdmVyKSB7XG5cdFx0XHRsZXQgb2JqZWN0O1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgZWxlbSkge1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdGNhc2UgXCJ1bmRlZmluZWRcIjpcblx0XHRcdFx0XHRvYmplY3QgPSBlbGVtO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0Ly9kZWZhdWx0OlxuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBlbGVtLm5hbWU7XG5cdFx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBlbGVtLmNoaWxkcmVuO1xuXG5cdFx0XHRcdFx0b2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0XHRcdGNhc2UgXCJwbGlzdFwiOlxuXHRcdFx0XHRcdFx0XHRsZXQgcGxpc3QgPSBmcm9tUGxpc3QoY2hpbGRyZW5bMF0sIHJldml2ZXIpO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBPYmplY3QuYXNzaWduKG9iamVjdCwgcGxpc3QpXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImRpY3RcIjpcblx0XHRcdFx0XHRcdFx0bGV0IGRpY3QgPSBjaGlsZHJlbi5tYXAoY2hpbGQgPT4gZnJvbVBsaXN0KGNoaWxkLCByZXZpdmVyKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QgPSBjaHVuayhkaWN0LCAyKTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gT2JqZWN0LmZyb21FbnRyaWVzKGRpY3QpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJhcnJheVwiOlxuXHRcdFx0XHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkob2JqZWN0KSkgb2JqZWN0ID0gW107XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IGNoaWxkcmVuLm1hcChjaGlsZCA9PiBmcm9tUGxpc3QoY2hpbGQsIHJldml2ZXIpKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwia2V5XCI6XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGtleSA9IGNoaWxkcmVuWzBdO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBrZXk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcInRydWVcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJmYWxzZVwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCBib29sZWFuID0gbmFtZTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gSlNPTi5wYXJzZShib29sZWFuKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiaW50ZWdlclwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCBpbnRlZ2VyID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdC8vb2JqZWN0ID0gcGFyc2VJbnQoaW50ZWdlcik7XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IEJpZ0ludChpbnRlZ2VyKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwicmVhbFwiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCByZWFsID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdC8vY29uc3QgZGlnaXRzID0gcmVhbC5zcGxpdChcIi5cIilbMV0/Lmxlbmd0aCB8fCAwO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBwYXJzZUZsb2F0KHJlYWwpLy8udG9GaXhlZChkaWdpdHMpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3RyaW5nID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IHN0cmluZztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRpZiAocmV2aXZlcikgb2JqZWN0ID0gcmV2aXZlcihuYW1lIHx8IFwiXCIsIG9iamVjdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXG5cdFx0XHQvKiogXG5cdFx0XHQgKiBDaHVuayBBcnJheVxuXHRcdFx0ICogQGF1dGhvciBWaXJnaWxDbHluZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc291cmNlIC0gc291cmNlXG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIC0gbnVtYmVyXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnJheTwqPn0gdGFyZ2V0XG5cdFx0XHQgKi9cblx0XHRcdGZ1bmN0aW9uIGNodW5rKHNvdXJjZSwgbGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IDAsIHRhcmdldCA9IFtdO1xuXHRcdFx0XHR3aGlsZSAoaW5kZXggPCBzb3VyY2UubGVuZ3RoKSB0YXJnZXQucHVzaChzb3VyY2Uuc2xpY2UoaW5kZXgsIGluZGV4ICs9IGxlbmd0aCkpO1xuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmcm9tWE1MKGVsZW0sIHJldml2ZXIpIHtcblx0XHRcdGxldCBvYmplY3Q7XG5cdFx0XHRzd2l0Y2ggKHR5cGVvZiBlbGVtKSB7XG5cdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0XHRcdG9iamVjdCA9IGVsZW07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHQvL2RlZmF1bHQ6XG5cdFx0XHRcdFx0Y29uc3QgcmF3ID0gZWxlbS5yYXc7XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGVsZW0ubmFtZTtcblx0XHRcdFx0XHRjb25zdCB0YWcgPSBlbGVtLnRhZztcblx0XHRcdFx0XHRjb25zdCBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW47XG5cblx0XHRcdFx0XHRpZiAocmF3KSBvYmplY3QgPSByYXc7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodGFnKSBvYmplY3QgPSBwYXJzZUF0dHJpYnV0ZSh0YWcsIHJldml2ZXIpO1xuXHRcdFx0XHRcdGVsc2UgaWYgKCFjaGlsZHJlbikgb2JqZWN0ID0geyBbbmFtZV06IHVuZGVmaW5lZCB9O1xuXHRcdFx0XHRcdGVsc2Ugb2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRpZiAobmFtZSA9PT0gXCJwbGlzdFwiKSBvYmplY3QgPSBPYmplY3QuYXNzaWduKG9iamVjdCwgZnJvbVBsaXN0KGNoaWxkcmVuWzBdLCByZXZpdmVyKSk7XG5cdFx0XHRcdFx0ZWxzZSBjaGlsZHJlbj8uZm9yRWFjaD8uKChjaGlsZCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJzdHJpbmdcIikgYWRkT2JqZWN0KG9iamVjdCwgQ0hJTERfTk9ERV9LRVksIGZyb21YTUwoY2hpbGQsIHJldml2ZXIpLCB1bmRlZmluZWQpXG5cdFx0XHRcdFx0XHRlbHNlIGlmICghY2hpbGQudGFnICYmICFjaGlsZC5jaGlsZHJlbiAmJiAhY2hpbGQucmF3KSBhZGRPYmplY3Qob2JqZWN0LCBjaGlsZC5uYW1lLCBmcm9tWE1MKGNoaWxkLCByZXZpdmVyKSwgY2hpbGRyZW4/LltpIC0gMV0/Lm5hbWUpXG5cdFx0XHRcdFx0XHRlbHNlIGFkZE9iamVjdChvYmplY3QsIGNoaWxkLm5hbWUsIGZyb21YTUwoY2hpbGQsIHJldml2ZXIpLCB1bmRlZmluZWQpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgYWRkT2JqZWN0KG9iamVjdCwgQ0hJTERfTk9ERV9LRVksIG51bGwsIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdGlmIChlbGVtLm5hbWUpIG9iamVjdFtlbGVtLm5hbWVdID0gKGVsZW0uaGFzQ2hpbGQgPT09IGZhbHNlKSA/IG51bGwgOiBcIlwiO1xuXHRcdFx0XHRcdFx0ZWxzZSBvYmplY3QgPSAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gbnVsbCA6IFwiXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCovXG5cblx0XHRcdFx0XHQvL2lmIChPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PT0gMCkgYWRkT2JqZWN0KG9iamVjdCwgZWxlbS5uYW1lLCAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gbnVsbCA6IFwiXCIpO1xuXHRcdFx0XHRcdC8vaWYgKE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID09PSAwKSBvYmplY3QgPSAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gdW5kZWZpbmVkIDogXCJcIjtcblx0XHRcdFx0XHRpZiAocmV2aXZlcikgb2JqZWN0ID0gcmV2aXZlcihuYW1lIHx8IFwiXCIsIG9iamVjdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGUodGFnLCByZXZpdmVyKSB7XG5cdFx0XHRcdGlmICghdGFnKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSB0YWcuc3BsaXQoLyhbXlxccz0nXCJdKyg/Olxccyo9XFxzKig/OidbXFxTXFxzXSo/J3xcIltcXFNcXHNdKj9cInxbXlxccydcIl0qKSk/KS8pO1xuXHRcdFx0XHRjb25zdCBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0bGV0IGF0dHJpYnV0ZXMsIHZhbDtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGV0IHN0ciA9IHJlbW92ZVNwYWNlcyhsaXN0W2ldKTtcblx0XHRcdFx0XHQvL2xldCBzdHIgPSByZW1vdmVCcmVha0xpbmUobGlzdFtpXSk7XG5cdFx0XHRcdFx0Ly9sZXQgc3RyID0gbGlzdFtpXT8udHJpbT8uKCk7XG5cdFx0XHRcdFx0aWYgKCFzdHIpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdFx0aWYgKCFhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzID0ge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgcG9zID0gc3RyLmluZGV4T2YoXCI9XCIpO1xuXHRcdFx0XHRcdGlmIChwb3MgPCAwKSB7XG5cdFx0XHRcdFx0XHQvLyBiYXJlIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdFx0c3RyID0gQVRUUklCVVRFX0tFWSArIHN0cjtcblx0XHRcdFx0XHRcdHZhbCA9IG51bGw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIGF0dHJpYnV0ZSBrZXkvdmFsdWUgcGFpclxuXHRcdFx0XHRcdFx0dmFsID0gc3RyLnN1YnN0cihwb3MgKyAxKS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuXHRcdFx0XHRcdFx0c3RyID0gQVRUUklCVVRFX0tFWSArIHN0ci5zdWJzdHIoMCwgcG9zKS5yZXBsYWNlKC9cXHMrJC8sIFwiXCIpO1xuXG5cdFx0XHRcdFx0XHQvLyBxdW90ZTogZm9vPVwiRk9PXCIgYmFyPSdCQVInXG5cdFx0XHRcdFx0XHRjb25zdCBmaXJzdENoYXIgPSB2YWxbMF07XG5cdFx0XHRcdFx0XHRjb25zdCBsYXN0Q2hhciA9IHZhbFt2YWwubGVuZ3RoIC0gMV07XG5cdFx0XHRcdFx0XHRpZiAoZmlyc3RDaGFyID09PSBsYXN0Q2hhciAmJiAoZmlyc3RDaGFyID09PSBcIidcIiB8fCBmaXJzdENoYXIgPT09ICdcIicpKSB7XG5cdFx0XHRcdFx0XHRcdHZhbCA9IHZhbC5zdWJzdHIoMSwgdmFsLmxlbmd0aCAtIDIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YWwgPSB1bmVzY2FwZVhNTCh2YWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocmV2aXZlcikgdmFsID0gcmV2aXZlcihzdHIsIHZhbCk7XG5cblx0XHRcdFx0XHRhZGRPYmplY3QoYXR0cmlidXRlcywgc3RyLCB2YWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGF0dHJpYnV0ZXM7XG5cblx0XHRcdFx0ZnVuY3Rpb24gcmVtb3ZlU3BhY2VzKHN0cikge1xuXHRcdFx0XHRcdC8vcmV0dXJuIHN0ciAmJiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHN0cj8udHJpbT8uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYWRkT2JqZWN0KG9iamVjdCwga2V5LCB2YWwsIHByZXZLZXkgPSBrZXkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgcHJldiA9IG9iamVjdFtwcmV2S2V5XTtcblx0XHRcdFx0XHQvL2NvbnN0IGN1cnIgPSBvYmplY3Rba2V5XTtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwcmV2KSkgcHJldi5wdXNoKHZhbCk7XG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJldikgb2JqZWN0W3ByZXZLZXldID0gW3ByZXYsIHZhbF07XG5cdFx0XHRcdFx0ZWxzZSBvYmplY3Rba2V5XSA9IHZhbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVuZXNjYXBlWE1MKHN0cikge1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oJig/Omx0fGd0fGFtcHxhcG9zfHF1b3R8Iyg/OlxcZHsxLDZ9fHhbMC05YS1mQS1GXXsxLDV9KSk7KS9nLCBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0XHRcdGlmIChzdHJbMV0gPT09IFwiI1wiKSB7XG5cdFx0XHRcdFx0Y29uc3QgY29kZSA9IChzdHJbMl0gPT09IFwieFwiKSA/IHBhcnNlSW50KHN0ci5zdWJzdHIoMyksIDE2KSA6IHBhcnNlSW50KHN0ci5zdWJzdHIoMiksIDEwKTtcblx0XHRcdFx0XHRpZiAoY29kZSA+IC0xKSByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gVU5FU0NBUEVbc3RyXSB8fCBzdHI7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IG5ldyBPYmplY3QsIHRhYiA9IFwiXCIpIHtcblx0XHRjb25zdCBFU0NBUEUgPSB0aGlzLiNFU0NBUEU7XG5cdFx0Y29uc3QgQVRUUklCVVRFX0tFWSA9IHRoaXMuI0FUVFJJQlVURV9LRVk7XG5cdFx0Y29uc3QgQ0hJTERfTk9ERV9LRVkgPSB0aGlzLiNDSElMRF9OT0RFX0tFWTtcblx0XHRsZXQgWE1MID0gXCJcIjtcblx0XHRmb3IgKGxldCBlbGVtIGluIGpzb24pIFhNTCArPSB0b1htbChqc29uW2VsZW1dLCBlbGVtLCBcIlwiKTtcblx0XHRYTUwgPSB0YWIgPyBYTUwucmVwbGFjZSgvXFx0L2csIHRhYikgOiBYTUwucmVwbGFjZSgvXFx0fFxcbi9nLCBcIlwiKTtcblx0XHRyZXR1cm4gWE1MO1xuXHRcdC8qKioqKioqKioqKioqKioqKiBGdWN0aW9ucyAqKioqKioqKioqKioqKioqKi9cblx0XHRmdW5jdGlvbiB0b1htbChFbGVtLCBOYW1lLCBJbmQpIHtcblx0XHRcdGxldCB4bWwgPSBcIlwiO1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgRWxlbSkge1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoRWxlbSkpIHtcblx0XHRcdFx0XHRcdHhtbCA9IEVsZW0ucmVkdWNlKFxuXHRcdFx0XHRcdFx0XHQocHJldlhNTCwgY3VyclhNTCkgPT4gcHJldlhNTCArPSBgJHtJbmR9JHt0b1htbChjdXJyWE1MLCBOYW1lLCBgJHtJbmR9XFx0YCl9XFxuYCxcblx0XHRcdFx0XHRcdFx0XCJcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGV0IGF0dHJpYnV0ZSA9IFwiXCI7XG5cdFx0XHRcdFx0XHRsZXQgaGFzQ2hpbGQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGZvciAobGV0IG5hbWUgaW4gRWxlbSkge1xuXHRcdFx0XHRcdFx0XHRpZiAobmFtZVswXSA9PT0gQVRUUklCVVRFX0tFWSkge1xuXHRcdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZSArPSBgICR7bmFtZS5zdWJzdHJpbmcoMSl9PVxcXCIke0VsZW1bbmFtZV0udG9TdHJpbmcoKX1cXFwiYDtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgRWxlbVtuYW1lXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChFbGVtW25hbWVdID09PSB1bmRlZmluZWQpIE5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdFx0XHRlbHNlIGhhc0NoaWxkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCR7TmFtZX0ke2F0dHJpYnV0ZX0keyhoYXNDaGlsZCB8fCBOYW1lID09PSBcImxpbmtcIikgPyBcIlwiIDogXCIvXCJ9PmA7XG5cblx0XHRcdFx0XHRcdGlmIChoYXNDaGlsZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoTmFtZSA9PT0gXCJwbGlzdFwiKSB4bWwgKz0gdG9QbGlzdChFbGVtLCBOYW1lLCBgJHtJbmR9XFx0YCk7XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAobGV0IG5hbWUgaW4gRWxlbSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0hJTERfTk9ERV9LRVk6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0eG1sICs9IEVsZW1bbmFtZV0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR4bWwgKz0gdG9YbWwoRWxlbVtuYW1lXSwgbmFtZSwgYCR7SW5kfVxcdGApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR4bWwgKz0gKHhtbC5zbGljZSgtMSkgPT09IFwiXFxuXCIgPyBJbmQgOiBcIlwiKSArIGA8LyR7TmFtZX0+YDtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdHN3aXRjaCAoTmFtZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIj94bWxcIjpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfSAke0VsZW0udG9TdHJpbmcoKX0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiP1wiOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwke05hbWV9JHtFbGVtLnRvU3RyaW5nKCl9JHtOYW1lfT5gO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCIhXCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCEtLSR7RWxlbS50b1N0cmluZygpfS0tPmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIiFET0NUWVBFXCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCR7TmFtZX0gJHtFbGVtLnRvU3RyaW5nKCl9PmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIiFDREFUQVwiOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwhW0NEQVRBWyR7RWxlbS50b1N0cmluZygpfV1dPmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBDSElMRF9OT0RFX0tFWTpcblx0XHRcdFx0XHRcdFx0eG1sICs9IEVsZW07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfT4ke0VsZW0udG9TdHJpbmcoKX08LyR7TmFtZX0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0XHRcdHhtbCArPSBJbmQgKyBgPCR7TmFtZS50b1N0cmluZygpfS8+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4geG1sO1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiB0b1BsaXN0KEVsZW0sIE5hbWUsIEluZCkge1xuXHRcdFx0bGV0IHBsaXN0ID0gXCJcIjtcblx0XHRcdHN3aXRjaCAodHlwZW9mIEVsZW0pIHtcblx0XHRcdFx0Y2FzZSBcImJvb2xlYW5cIjpcblx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08JHtFbGVtLnRvU3RyaW5nKCl9Lz5gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwibnVtYmVyXCI6XG5cdFx0XHRcdFx0cGxpc3QgPSBgJHtJbmR9PHJlYWw+JHtFbGVtLnRvU3RyaW5nKCl9PC9yZWFsPmA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJiaWdpbnRcIjpcblx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08aW50ZWdlcj4ke0VsZW0udG9TdHJpbmcoKX08L2ludGVnZXI+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdHBsaXN0ID0gYCR7SW5kfTxzdHJpbmc+JHtFbGVtLnRvU3RyaW5nKCl9PC9zdHJpbmc+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHRcdGxldCBhcnJheSA9IFwiXCI7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoRWxlbSkpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwLCBuID0gRWxlbS5sZW5ndGg7IGkgPCBuOyBpKyspIGFycmF5ICs9IGAke0luZH0ke3RvUGxpc3QoRWxlbVtpXSwgTmFtZSwgYCR7SW5kfVxcdGApfWA7XG5cdFx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08YXJyYXk+JHthcnJheX0ke0luZH08L2FycmF5PmA7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxldCBkaWN0ID0gXCJcIjtcblx0XHRcdFx0XHRcdE9iamVjdC5lbnRyaWVzKEVsZW0pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRkaWN0ICs9IGAke0luZH08a2V5PiR7a2V5fTwva2V5PmA7XG5cdFx0XHRcdFx0XHRcdGRpY3QgKz0gdG9QbGlzdCh2YWx1ZSwga2V5LCBJbmQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08ZGljdD4ke2RpY3R9JHtJbmR9PC9kaWN0PmA7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldHVybiBwbGlzdDtcblx0XHR9O1xuXHR9O1xufVxuIiwiLyoqXG4gKiBkZXRlY3QgRm9ybWF0XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge09iamVjdH0gdXJsIC0gUGFyc2VkIFVSTFxuICogQHBhcmFtIHtTdHJpbmd9IGJvZHkgLSByZXNwb25zZSBib2R5XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdCAtIGZvcm1hdFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RGb3JtYXQodXJsLCBib2R5KSB7XG5cdGxldCBmb3JtYXQgPSB1bmRlZmluZWQ7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gZGV0ZWN0Rm9ybWF0LCBmb3JtYXQ6ICR7dXJsLmZvcm1hdCA/PyB1cmwucXVlcnk/LmZtdCA/PyB1cmwucXVlcnk/LmZvcm1hdH1gLCBcIlwiKTtcblx0c3dpdGNoICh1cmwuZm9ybWF0ID8/IHVybC5xdWVyeT8uZm10ID8/IHVybC5xdWVyeT8uZm9ybWF0KSB7XG5cdFx0Y2FzZSBcInR4dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3BsYWluXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwieG1sXCI6XG5cdFx0Y2FzZSBcInNydjNcIjpcblx0XHRjYXNlIFwidHRtbFwiOlxuXHRcdGNhc2UgXCJ0dG1sMlwiOlxuXHRcdGNhc2UgXCJpbXNjXCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQveG1sXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwidnR0XCI6XG5cdFx0Y2FzZSBcIndlYnZ0dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImpzb25cIjpcblx0XHRjYXNlIFwianNvbjNcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIm0zdVwiOlxuXHRcdGNhc2UgXCJtM3U4XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3gtbXBlZ3VybFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInBsaXN0XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3BsaXN0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdGNvbnN0IEhFQURFUiA9IGJvZHk/LnN1YnN0cmluZz8uKDAsIDYpLnRyaW0/LigpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhg8J+apyBkZXRlY3RGb3JtYXQsIEhFQURFUjogJHtIRUFERVJ9YCwgXCJcIik7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGDwn5qnIGRldGVjdEZvcm1hdCwgSEVBREVSPy5zdWJzdHJpbmc/LigwLCAxKTogJHtIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpfWAsIFwiXCIpO1xuXHRcdFx0c3dpdGNoIChIRUFERVIpIHtcblx0XHRcdFx0Y2FzZSBcIjw/eG1sXCI6XG5cdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3htbFwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiV0VCVlRUXCI6XG5cdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHN3aXRjaCAoSEVBREVSPy5zdWJzdHJpbmc/LigwLCAxKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIjBcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCIxXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiMlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjNcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI0XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiNVwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI3XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiOFwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjlcIjpcblx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJ7XCI6XG5cdFx0XHRcdFx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdH07XG5cdGNvbnNvbGUubG9nKGDinIUgZGV0ZWN0Rm9ybWF0LCBmb3JtYXQ6ICR7Zm9ybWF0fWAsIFwiXCIpO1xuXHRyZXR1cm4gZm9ybWF0O1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdFBsYXRmb3JtKHVybCkge1xuXHRjb25zb2xlLmxvZyhg4piR77iPIERldGVjdCBQbGF0Zm9ybWAsIFwiXCIpO1xuXHQvKioqKioqKioqKioqKioqKiogUGxhdGZvcm0gKioqKioqKioqKioqKioqKiovXG5cdGxldCBQbGF0Zm9ybSA9IC9cXC4obmV0ZmxpeFxcLmNvbXxuZmx4dmlkZW9cXC5uZXQpL2kudGVzdCh1cmwpID8gXCJOZXRmbGl4XCJcblx0XHQ6IC8oXFwueW91dHViZXx5b3V0dWJlaVxcLmdvb2dsZWFwaXMpXFwuY29tL2kudGVzdCh1cmwpID8gXCJZb3VUdWJlXCJcblx0XHRcdDogL1xcLnNwb3RpZnkoY2RuKT9cXC5jb20vaS50ZXN0KHVybCkgPyBcIlNwb3RpZnlcIlxuXHRcdFx0XHQ6IC9cXC5hcHBsZVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiQXBwbGVcIlxuXHRcdFx0XHRcdDogL1xcLihkc3NvdHR8c3Rhcm90dClcXC5jb20vaS50ZXN0KHVybCkgPyBcIkRpc25leStcIlxuXHRcdFx0XHRcdFx0OiAvKFxcLihwdi1jZG58YWl2LWNkbnxha2FtYWloZHxjbG91ZGZyb250KVxcLm5ldCl8czNcXC5hbWF6b25hd3NcXC5jb21cXC9haXYtcHJvZC10aW1lZHRleHRcXC8vaS50ZXN0KHVybCkgPyBcIlByaW1lVmlkZW9cIlxuXHRcdFx0XHRcdFx0XHQ6IC9wcmRcXC5tZWRpYVxcLmgyNjRcXC5pby9pLnRlc3QodXJsKSA/IFwiTWF4XCJcblx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oYXBpXFwuaGJvfGhib21heGNkbilcXC5jb20vaS50ZXN0KHVybCkgPyBcIkhCT01heFwiXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oaHVsdXN0cmVhbXxodWx1aW0pXFwuY29tL2kudGVzdCh1cmwpID8gXCJIdWx1XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwuKGNic2FhdmlkZW98Y2JzaXZpZGVvfGNicylcXC5jb20vaS50ZXN0KHVybCkgPyBcIlBhcmFtb3VudCtcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnVwbHlua1xcLmNvbS9pLnRlc3QodXJsKSA/IFwiRGlzY292ZXJ5K1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9kcGx1cy1waC0vaS50ZXN0KHVybCkgPyBcIkRpc2NvdmVyeStQaFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnBlYWNvY2t0dlxcLmNvbS9pLnRlc3QodXJsKSA/IFwiUGVhY29ja1RWXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC5mdWJvXFwudHYvaS50ZXN0KHVybCkgPyBcIkZ1Ym9UVlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC52aWtpXFwuaW8vaS50ZXN0KHVybCkgPyBcIlZpa2lcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC8oZXBpeGhsc1xcLmFrYW1haXplZFxcLm5ldHxlcGl4XFwuc2VydmljZXNcXC5pbykvaS50ZXN0KHVybCkgPyBcIk1HTStcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLm5lYnVsYVxcLmFwcHwvaS50ZXN0KHVybCkgPyBcIk5lYnVsYVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IFwiVW5pdmVyc2FsXCI7XG4gICAgY29uc29sZS5sb2coYOKchSBEZXRlY3QgUGxhdGZvcm0sIFBsYXRmb3JtOiAke1BsYXRmb3JtfWAsIFwiXCIpO1xuXHRyZXR1cm4gUGxhdGZvcm07XG59O1xuIiwiLypcblJFQURNRTogaHR0cHM6Ly9naXRodWIuY29tL0R1YWxTdWJzXG4qL1xuXG5pbXBvcnQgRU5WcyBmcm9tIFwiLi4vRU5WL0VOVi5tanNcIjtcbmNvbnN0ICQgPSBuZXcgRU5WcyhcIvCfjb/vuI8gRHVhbFN1YnM6IFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcIik7XG5cbi8qKlxuICogU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc1xuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBQZXJzaXN0ZW50IFN0b3JlIEtleVxuICogQHBhcmFtIHtBcnJheX0gcGxhdGZvcm1zIC0gUGxhdGZvcm0gTmFtZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIERlZmF1bHQgRGF0YUJhc2VcbiAqIEByZXR1cm4ge09iamVjdH0geyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0RU5WKG5hbWUsIHBsYXRmb3JtcywgZGF0YWJhc2UpIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX1gLCBcIlwiKTtcblx0bGV0IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9ID0gJC5nZXRFTlYobmFtZSwgcGxhdGZvcm1zLCBkYXRhYmFzZSk7XG5cdC8qKioqKioqKioqKioqKioqKiBTZXR0aW5ncyAqKioqKioqKioqKioqKioqKi9cblx0aWYgKCFBcnJheS5pc0FycmF5KFNldHRpbmdzPy5UeXBlcykpIFNldHRpbmdzLlR5cGVzID0gKFNldHRpbmdzLlR5cGVzKSA/IFtTZXR0aW5ncy5UeXBlc10gOiBbXTsgLy8g5Y+q5pyJ5LiA5Liq6YCJ6aG55pe277yM5peg6YCX5Y+35YiG6ZqUXG5cdGlmICgkLmlzTG9vbigpICYmIHBsYXRmb3Jtcy5pbmNsdWRlcyhcIllvdVR1YmVcIikpIHtcblx0XHRTZXR0aW5ncy5BdXRvQ0MgPSAkcGVyc2lzdGVudFN0b3JlLnJlYWQoXCLoh6rliqjmmL7npLrnv7vor5HlrZfluZVcIikgPz8gU2V0dGluZ3MuQXV0b0NDO1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuQXV0b0NDKSB7XG5cdFx0XHRjYXNlIFwi5pivXCI6XG5cdFx0XHRcdFNldHRpbmdzLkF1dG9DQyA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIuWQplwiOlxuXHRcdFx0XHRTZXR0aW5ncy5BdXRvQ0MgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdFNldHRpbmdzLlNob3dPbmx5ID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi5LuF6L6T5Ye66K+R5paHXCIpID8/IFNldHRpbmdzLlNob3dPbmx5O1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuU2hvd09ubHkpIHtcblx0XHRcdGNhc2UgXCLmmK9cIjpcblx0XHRcdFx0U2V0dGluZ3MuU2hvd09ubHkgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCLlkKZcIjpcblx0XHRcdFx0U2V0dGluZ3MuU2hvd09ubHkgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdFNldHRpbmdzLlBvc2l0aW9uID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi5a2X5bmV6K+R5paH5L2N572uXCIpID8/IFNldHRpbmdzLlBvc2l0aW9uO1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuUG9zaXRpb24pIHtcblx0XHRcdGNhc2UgXCLor5HmlofkvY3kuo7lpJbmlofkuYvkuIpcIjpcblx0XHRcdFx0U2V0dGluZ3MuUG9zaXRpb24gPSBcIkZvcndhcmRcIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwi6K+R5paH5L2N5LqO5aSW5paH5LmL5LiLXCI6XG5cdFx0XHRcdFNldHRpbmdzLlBvc2l0aW9uID0gXCJSZXZlcnNlXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0fTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU2V0dGluZ3M6ICR7dHlwZW9mIFNldHRpbmdzfWAsIGBTZXR0aW5nc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShTZXR0aW5ncyl9YCwgXCJcIik7XG5cdC8qKioqKioqKioqKioqKioqKiBDYWNoZXMgKioqKioqKioqKioqKioqKiovXG5cdC8vJC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgQ2FjaGVzOiAke3R5cGVvZiBDYWNoZXN9YCwgYENhY2hlc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShDYWNoZXMpfWAsIFwiXCIpO1xuXHRpZiAodHlwZW9mIENhY2hlcz8uUGxheWxpc3RzICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoQ2FjaGVzPy5QbGF5bGlzdHMpKSBDYWNoZXMuUGxheWxpc3RzID0ge307IC8vIOWIm+W7ulBsYXlsaXN0c+e8k+WtmFxuXHRDYWNoZXMuUGxheWxpc3RzLk1hc3RlciA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlBsYXlsaXN0cz8uTWFzdGVyIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0Q2FjaGVzLlBsYXlsaXN0cy5TdWJ0aXRsZSA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlBsYXlsaXN0cz8uU3VidGl0bGUgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHRpZiAodHlwZW9mIENhY2hlcz8uU3VidGl0bGVzICE9PSBcIm9iamVjdFwiKSBDYWNoZXMuU3VidGl0bGVzID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uU3VidGl0bGVzIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0aWYgKHR5cGVvZiBDYWNoZXM/Lk1ldGFkYXRhcyAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KENhY2hlcz8uTWV0YWRhdGFzKSkgQ2FjaGVzLk1ldGFkYXRhcyA9IHt9OyAvLyDliJvlu7pQbGF5bGlzdHPnvJPlrZhcblx0aWYgKHR5cGVvZiBDYWNoZXM/Lk1ldGFkYXRhcz8uVHJhY2tzICE9PSBcIm9iamVjdFwiKSBDYWNoZXMuTWV0YWRhdGFzLlRyYWNrcyA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/Lk1ldGFkYXRhcz8uVHJhY2tzIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0LyoqKioqKioqKioqKioqKioqIENvbmZpZ3MgKioqKioqKioqKioqKioqKiovXG5cdHJldHVybiB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG5SRUFETUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9EdWFsU3Vic1xuKi9cblxuaW1wb3J0IEVOVnMgZnJvbSBcIi4vRU5WL0VOVi5tanNcIjtcbmltcG9ydCBVUklzIGZyb20gXCIuL1VSSS9VUkkubWpzXCI7XG5pbXBvcnQgWE1McyBmcm9tIFwiLi9YTUwvWE1MLm1qc1wiO1xuaW1wb3J0IFdlYlZUVCBmcm9tIFwiLi9XZWJWVFQvV2ViVlRULm1qc1wiO1xuXG5pbXBvcnQgc2V0RU5WIGZyb20gXCIuL2Z1bmN0aW9uL3NldEVOVi5tanNcIjtcbmltcG9ydCBkZXRlY3RQbGF0Zm9ybSBmcm9tIFwiLi9mdW5jdGlvbi9kZXRlY3RQbGF0Zm9ybS5tanNcIjtcbmltcG9ydCBkZXRlY3RGb3JtYXQgZnJvbSBcIi4vZnVuY3Rpb24vZGV0ZWN0Rm9ybWF0Lm1qc1wiO1xuXG5pbXBvcnQgKiBhcyBEYXRhYmFzZSBmcm9tIFwiLi9kYXRhYmFzZS9EYXRhYmFzZS5qc29uXCI7XG5cbmNvbnN0ICQgPSBuZXcgRU5WcyhcIvCfjb/vuI8gRHVhbFN1YnM6IPCfjqYgVW5pdmVyc2FsIHYwLjkuNSgyKSBDb21wb3NpdGUuU3VidGl0bGVzLnJlc3BvbnNlLmJldGFcIik7XG5jb25zdCBVUkkgPSBuZXcgVVJJcygpO1xuY29uc3QgWE1MID0gbmV3IFhNTHMoKTtcbmNvbnN0IFZUVCA9IG5ldyBXZWJWVFQoW1wibWlsbGlzZWNvbmRzXCIsIFwidGltZVN0YW1wXCIsIFwic2luZ2xlTGluZVwiLCBcIlxcblwiXSk7IC8vIFwibXVsdGlMaW5lXCJcblxuLyoqKioqKioqKioqKioqKioqIFByb2Nlc3NpbmcgKioqKioqKioqKioqKioqKiovXG4vLyDop6PmnoRVUkxcbmNvbnN0IFVSTCA9IFVSSS5wYXJzZSgkcmVxdWVzdC51cmwpO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgVVJMOiAke0pTT04uc3RyaW5naWZ5KFVSTCl9YCwgXCJcIik7XG4vLyDojrflj5bov57mjqXlj4LmlbBcbmNvbnN0IE1FVEhPRCA9ICRyZXF1ZXN0Lm1ldGhvZCwgSE9TVCA9IFVSTC5ob3N0LCBQQVRIID0gVVJMLnBhdGgsIFBBVEhzID0gVVJMLnBhdGhzO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgTUVUSE9EOiAke01FVEhPRH1gLCBcIlwiKTtcbi8vIOiOt+WPluW5s+WPsFxuY29uc3QgUExBVEZPUk0gPSBkZXRlY3RQbGF0Zm9ybShIT1NUKTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBQTEFURk9STTogJHtQTEFURk9STX1gLCBcIlwiKTtcbi8vIOino+aekOagvOW8j1xubGV0IEZPUk1BVCA9ICgkcmVzcG9uc2UuaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdID8/ICRyZXNwb25zZS5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcbmlmIChGT1JNQVQgPT09IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfHwgRk9STUFUID09PSBcInRleHQvcGxhaW5cIikgRk9STUFUID0gZGV0ZWN0Rm9ybWF0KFVSTCwgJHJlc3BvbnNlPy5ib2R5KTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuKGFzeW5jICgpID0+IHtcblx0Ly8g6K+75Y+W6K6+572uXG5cdGNvbnN0IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9ID0gc2V0RU5WKFwiRHVhbFN1YnNcIiwgWyhbXCJZb3VUdWJlXCIsIFwiTmV0ZmxpeFwiLCBcIkJpbGlCaWxpXCIsIFwiU3BvdGlmeVwiXS5pbmNsdWRlcyhQTEFURk9STSkpID8gUExBVEZPUk0gOiBcIlVuaXZlcnNhbFwiLCBcIkNvbXBvc2l0ZVwiLCBcIkFQSVwiXSwgRGF0YWJhc2UpO1xuXHQkLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBTZXR0aW5ncy5Td2l0Y2g6ICR7U2V0dGluZ3M/LlN3aXRjaH1gLCBcIlwiKTtcblx0c3dpdGNoIChTZXR0aW5ncy5Td2l0Y2gpIHtcblx0XHRjYXNlIHRydWU6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdC8vIOiOt+WPluWtl+W5leexu+Wei+S4juivreiogFxuXHRcdFx0Y29uc3QgVHlwZSA9IFVSTC5xdWVyeT8uc3VidHlwZSA/PyBTZXR0aW5ncy5UeXBlLCBMYW5ndWFnZXMgPSBbVVJMLnF1ZXJ5Py5sYW5nPy50b1VwcGVyQ2FzZT8uKCkgPz8gU2V0dGluZ3MuTGFuZ3VhZ2VzWzBdLCAoVVJMLnF1ZXJ5Py50bGFuZyA/PyBDYWNoZXM/LnRsYW5nKT8udG9VcHBlckNhc2U/LigpID8/IFNldHRpbmdzLkxhbmd1YWdlc1sxXV07XG5cdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfSwgVHlwZTogJHtUeXBlfSwgTGFuZ3VhZ2VzOiAke0xhbmd1YWdlc31gLCBcIlwiKTtcblx0XHRcdC8vIOWIm+W7uuWtl+W5leivt+axgumYn+WIl1xuXHRcdFx0bGV0IHJlcXVlc3RzID0gW107XG5cdFx0XHQvLyDlpITnkIbnsbvlnotcblx0XHRcdHN3aXRjaCAoVHlwZSkge1xuXHRcdFx0XHRjYXNlIFwiT2ZmaWNpYWxcIjpcblx0XHRcdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfWAsIFwi5a6Y5pa55a2X5bmVXCIsIFwiXCIpO1xuXHRcdFx0XHRcdHN3aXRjaCAoUExBVEZPUk0pIHtcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdC8vIOiOt+WPluWtl+W5leaWh+S7tuWcsOWdgHZ0dOe8k+WtmO+8iG1hcO+8iVxuXHRcdFx0XHRcdFx0XHRjb25zdCB7IHN1YnRpdGxlc1BsYXlsaXN0VVJMIH0gPSBnZXRTdWJ0aXRsZXNDYWNoZSgkcmVxdWVzdC51cmwsIENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUsIExhbmd1YWdlcyk7XG5cdFx0XHRcdFx0XHRcdC8vIOiOt+WPluWtl+W5leaSreaUvuWIl+ihqG0zdTjnvJPlrZjvvIhtYXDvvIlcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBtYXN0ZXJQbGF5bGlzdFVSTCwgc3VidGl0bGVzUGxheWxpc3RJbmRleCB9ID0gZ2V0UGxheWxpc3RDYWNoZShzdWJ0aXRsZXNQbGF5bGlzdFVSTCwgQ2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXIsIExhbmd1YWdlcyk7XG5cdFx0XHRcdFx0XHRcdC8vIOiOt+WPluWtl+W5leaWh+S7tuWcsOWdgHZ0dOe8k+WtmO+8iG1hcO+8iVxuXHRcdFx0XHRcdFx0XHRjb25zdCB7IHN1YnRpdGxlc1VSSUFycmF5MCwgc3VidGl0bGVzVVJJQXJyYXkxIH0gPSBnZXRTdWJ0aXRsZXNBcnJheShtYXN0ZXJQbGF5bGlzdFVSTCwgc3VidGl0bGVzUGxheWxpc3RJbmRleCwgQ2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXIsIENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUsIExhbmd1YWdlcyk7XG5cdFx0XHRcdFx0XHRcdC8vIOiOt+WPluWumOaWueWtl+W5leivt+axglxuXHRcdFx0XHRcdFx0XHRpZiAoc3VidGl0bGVzVVJJQXJyYXkxLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwgc3VidGl0bGVzVVJJQXJyYXkxLmxlbmd0aDogJHtzdWJ0aXRsZXNVUklBcnJheTEubGVuZ3RofWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdC8vIOiOt+WPluWtl+W5leaWh+S7tuWQjVxuXHRcdFx0XHRcdFx0XHRcdGxldCBmaWxlTmFtZSA9IFBBVEhzPy5bUEFUSHM/Lmxlbmd0aCAtIDFdID8/IGdldFN1YnRpdGxlc0ZpbGVOYW1lKCRyZXF1ZXN0LnVybCwgUExBVEZPUk0pO1xuXHRcdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwgZmlsZU5hbWU6ICR7ZmlsZU5hbWV9YCwgXCJcIilcblx0XHRcdFx0XHRcdFx0XHQvLyDmnoTpgKDor7fmsYLpmJ/liJdcblx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0cyA9IGNvbnN0cnVjdFN1YnRpdGxlc1F1ZXVlKCRyZXF1ZXN0LCBmaWxlTmFtZSwgc3VidGl0bGVzVVJJQXJyYXkwLCBzdWJ0aXRsZXNVUklBcnJheTEpO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJZb3VUdWJlXCI6XG5cdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIFwiWW91VHViZVwiLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0c3dpdGNoIChVUkwucXVlcnk/LnRsYW5nKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfSwg5pyq6YCJ5oup57+76K+R6K+t6KiA77yM6Lez6L+HYCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX0sIOW3sumAieaLqee/u+ivkeivreiogGAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8g6K6+572u5Y+C5pWwXG5cdFx0XHRcdFx0XHRcdFx0XHRTZXR0aW5ncy5PZmZzZXQgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0U2V0dGluZ3MuVG9sZXJhbmNlID0gMTAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0U2V0dGluZ3MuUG9zaXRpb24gPSAoU2V0dGluZ3MuUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IFwiRm9yd2FyZFwiIDogXCJSZXZlcnNlXCI7IC8vIOmTvuaOpeS4u+Wtl+W5leS4uue/u+ivkeWtl+W5le+8jOWJr+Wtl+W5leS4uuWOn+Wtl+W5le+8jOaJgOS7pemcgOimgee/u+i9rOS4gOS4i1xuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChTZXR0aW5ncy5TaG93T25seSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIHRydWU6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX0sIOS7heaYvuekuue/u+ivkeWQjuWtl+W5le+8jOi3s+i/h2AsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9LCDnlJ/miJDlj4zor63lrZfluZVgLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyDojrflj5blrZfluZVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRVUkwucXVlcnkubGFuZyA9IENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUuZ2V0KFVSTC5xdWVyeT8udikgPz8gVVJMLnF1ZXJ5Lmxhbmc7IC8vIOS4u+ivreiogFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBVUkwucXVlcnk/LnRsYW5nIC8vIOWOn+Wtl+W5lVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJ1cmxcIjogVVJJLnN0cmluZ2lmeShVUkwpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJoZWFkZXJzXCI6ICRyZXF1ZXN0LmhlYWRlcnNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcXVlc3RzLnB1c2gocmVxdWVzdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJOZXRmbGl4XCI6XG5cdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIFwiTmV0ZmxpeFwiLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiQmlsaWJpbGlcIjpcblx0XHRcdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgXCJCaWxpYmlsaVwiLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIlRyYW5zbGF0ZVwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg57+76K+R5a2X5bmVYCwgXCJcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJFeHRlcm5hbFwiOlxuXHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwg5aSW5oyC5a2X5bmVYCwgXCJcIik7XG5cdFx0XHRcdFx0bGV0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdFx0XHRcInVybFwiOiBTZXR0aW5ncy5VUkwsXG5cdFx0XHRcdFx0XHRcImhlYWRlcnNcIjoge1xuXHRcdFx0XHRcdFx0XHRcIkFjY2VwdFwiOiBcIiovKlwiLFxuXHRcdFx0XHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJNb3ppbGxhLzUuMCAoaVBob25lOyBDUFUgaVBob25lIE9TIDEyXzIgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzEyLjEgTW9iaWxlLzE1RTE0OCBTYWZhcmkvNjA0LjFcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmVxdWVzdHMucHVzaChyZXF1ZXN0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHQvLyDliJvlu7rlrZfluZVPYmplY3Rcblx0XHRcdGxldCBPcmlnaW5TdWIgPSB7fSwgU2Vjb25kU3ViID0ge307XG5cdFx0XHQvLyDmoLzlvI/liKTmlq1cblx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdGNhc2UgdW5kZWZpbmVkOiAvLyDop4bkuLrml6Bib2R5XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvcGxhaW5cIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvaHRtbFwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1tcGVnVVJMXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LW1wZWd1cmxcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsXCI6XG5cdFx0XHRcdGNhc2UgXCJhdWRpby9tcGVndXJsXCI6XG5cdFx0XHRcdFx0Ly9ib2R5ID0gTTNVOC5wYXJzZSgkcmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgYm9keTogJHtKU09OLnN0cmluZ2lmeShib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvLyRyZXNwb25zZS5ib2R5ID0gTTNVOC5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3htbFwiOlxuXHRcdFx0XHRjYXNlIFwidGV4dC9wbGlzdFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veG1sXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9wbGlzdFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wbGlzdFwiOlxuXHRcdFx0XHRcdE9yaWdpblN1YiA9IFhNTC5wYXJzZSgkcmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgT3JpZ2luU3ViOiAke0pTT04uc3RyaW5naWZ5KE9yaWdpblN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0Zm9yIGF3YWl0IChsZXQgcmVxdWVzdCBvZiByZXF1ZXN0cykge1xuXHRcdFx0XHRcdFx0U2Vjb25kU3ViID0gYXdhaXQgJC5odHRwLmdldChyZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdFx0U2Vjb25kU3ViID0gWE1MLnBhcnNlKFNlY29uZFN1Yik7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBTZWNvbmRTdWI6ICR7SlNPTi5zdHJpbmdpZnkoU2Vjb25kU3ViKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdE9yaWdpblN1YiA9IENvbWJpbmVEdWFsU3VicyhPcmlnaW5TdWIsIFNlY29uZFN1YiwgRk9STUFULCBVUkwucXVlcnk/LmtpbmQsIFNldHRpbmdzLk9mZnNldCwgU2V0dGluZ3MuVG9sZXJhbmNlLCBTZXR0aW5ncy5Qb3NpdGlvbik7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBPcmlnaW5TdWI6ICR7SlNPTi5zdHJpbmdpZnkoT3JpZ2luU3ViKX1gLCBcIlwiKTtcblx0XHRcdFx0XHQkcmVzcG9uc2UuYm9keSA9IFhNTC5zdHJpbmdpZnkoT3JpZ2luU3ViKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInRleHQvdnR0XCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92dHRcIjpcblx0XHRcdFx0XHRPcmlnaW5TdWIgPSBWVFQucGFyc2UoJHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBPcmlnaW5TdWI6ICR7SlNPTi5zdHJpbmdpZnkoT3JpZ2luU3ViKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRmb3IgYXdhaXQgKGxldCByZXF1ZXN0IG9mIHJlcXVlc3RzKSB7XG5cdFx0XHRcdFx0XHRTZWNvbmRTdWIgPSBhd2FpdCAkLmh0dHAuZ2V0KHJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYm9keSk7XG5cdFx0XHRcdFx0XHRTZWNvbmRTdWIgPSBWVFQucGFyc2UoU2Vjb25kU3ViKTtcblx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBTZWNvbmRTdWI6ICR7SlNPTi5zdHJpbmdpZnkoU2Vjb25kU3ViKX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdE9yaWdpblN1YiA9IENvbWJpbmVEdWFsU3VicyhPcmlnaW5TdWIsIFNlY29uZFN1YiwgRk9STUFULCBVUkwucXVlcnk/LmtpbmQsIFNldHRpbmdzLk9mZnNldCwgU2V0dGluZ3MuVG9sZXJhbmNlLCBTZXR0aW5ncy5Qb3NpdGlvbik7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgT3JpZ2luU3ViOiAke0pTT04uc3RyaW5naWZ5KE9yaWdpblN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0JHJlc3BvbnNlLmJvZHkgPSBWVFQuc3RyaW5naWZ5KE9yaWdpblN1Yik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L2pzb25cIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2pzb25cIjpcblx0XHRcdFx0XHRPcmlnaW5TdWIgPSBKU09OLnBhcnNlKCRyZXNwb25zZS5ib2R5ID8/IFwie31cIik7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgT3JpZ2luU3ViOiAke0pTT04uc3RyaW5naWZ5KE9yaWdpblN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0Zm9yIGF3YWl0IChsZXQgcmVxdWVzdCBvZiByZXF1ZXN0cykge1xuXHRcdFx0XHRcdFx0U2Vjb25kU3ViID0gYXdhaXQgJC5odHRwLmdldChyZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdFx0U2Vjb25kU3ViID0gSlNPTi5wYXJzZShTZWNvbmRTdWIpO1xuXHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgU2Vjb25kU3ViOiAke0pTT04uc3RyaW5naWZ5KFNlY29uZFN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRPcmlnaW5TdWIgPSBDb21iaW5lRHVhbFN1YnMoT3JpZ2luU3ViLCBTZWNvbmRTdWIsIEZPUk1BVCwgVVJMLnF1ZXJ5Py5raW5kLCBTZXR0aW5ncy5PZmZzZXQsIFNldHRpbmdzLlRvbGVyYW5jZSwgU2V0dGluZ3MuUG9zaXRpb24pO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgT3JpZ2luU3ViOiAke0pTT04uc3RyaW5naWZ5KE9yaWdpblN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0JHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeShPcmlnaW5TdWIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcHJvdG9idWZcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtcHJvdG9idWZcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUucHJvdG9idWZcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGNcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGMrcHJvdG9cIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxlY2F0aW9uL29jdGV0LXN0cmVhbVwiOlxuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYCRyZXNwb25zZS5ib2R5OiAke0pTT04uc3RyaW5naWZ5KCRyZXNwb25zZS5ib2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvL2xldCByYXdCb2R5ID0gJC5pc1F1YW5YKCkgPyBuZXcgVWludDhBcnJheSgkcmVzcG9uc2UuYm9keUJ5dGVzID8/IFtdKSA6ICRyZXNwb25zZS5ib2R5ID8/IG5ldyBVaW50OEFycmF5KCk7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgaXNCdWZmZXI/ICR7QXJyYXlCdWZmZXIuaXNWaWV3KHJhd0JvZHkpfTogJHtKU09OLnN0cmluZ2lmeShyYXdCb2R5KX1gLCBcIlwiKTtcblx0XHRcdFx0XHQvLyDlhpnlhaXkuozov5vliLbmlbDmja5cblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwg6LCD6K+V5L+h5oGvYCwgYHJhd0JvZHk6ICR7SlNPTi5zdHJpbmdpZnkocmF3Qm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0Ly9pZiAoJC5pc1F1YW5YKCkpICRyZXNwb25zZS5ib2R5Qnl0ZXMgPSByYXdCb2R5XG5cdFx0XHRcdFx0Ly9lbHNlICRyZXNwb25zZS5ib2R5ID0gcmF3Qm9keTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0YnJlYWs7XG5cdH07XG59KSgpXG5cdC5jYXRjaCgoZSkgPT4gJC5sb2dFcnIoZSkpXG5cdC5maW5hbGx5KCgpID0+IHtcblx0XHRzd2l0Y2ggKCRyZXNwb25zZSkge1xuXHRcdFx0ZGVmYXVsdDogeyAvLyDmnInlm57lpI3mlbDmja7vvIzov5Tlm57lm57lpI3mlbDmja5cblx0XHRcdFx0Ly9jb25zdCBGT1JNQVQgPSAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJDb250ZW50LVR5cGVcIl0gPz8gJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcblx0XHRcdFx0JC5sb2coYPCfjokgJHskLm5hbWV9LCBmaW5hbGx5YCwgYCRyZXNwb25zZWAsIGBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuXHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgZmluYWxseWAsIGAkcmVzcG9uc2U6ICR7SlNPTi5zdHJpbmdpZnkoJHJlc3BvbnNlKX1gLCBcIlwiKTtcblx0XHRcdFx0aWYgKCRyZXNwb25zZT8uaGVhZGVycz8uW1wiQ29udGVudC1FbmNvZGluZ1wiXSkgJHJlc3BvbnNlLmhlYWRlcnNbXCJDb250ZW50LUVuY29kaW5nXCJdID0gXCJpZGVudGl0eVwiO1xuXHRcdFx0XHRpZiAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LWVuY29kaW5nXCJdKSAkcmVzcG9uc2UuaGVhZGVyc1tcImNvbnRlbnQtZW5jb2RpbmdcIl0gPSBcImlkZW50aXR5XCI7XG5cdFx0XHRcdGlmICgkLmlzUXVhblgoKSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdFx0XHRjYXNlIHVuZGVmaW5lZDogLy8g6KeG5Li65pegYm9keVxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycyB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycywgYm9keTogJHJlc3BvbnNlLmJvZHkgfSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3Byb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUucHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxlY2F0aW9uL29jdGV0LXN0cmVhbVwiOlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57kuozov5vliLbmlbDmja5cblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhgJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVMZW5ndGh9LS0tJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ1ZmZlci5ieXRlTGVuZ3RofWApO1xuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzLCBib2R5Qnl0ZXM6ICRyZXNwb25zZS5ib2R5Qnl0ZXMuYnVmZmVyLnNsaWNlKCRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCwgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlTGVuZ3RoICsgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlT2Zmc2V0KSB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlICQuZG9uZSgkcmVzcG9uc2UpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDogeyAvLyDml6Dlm57lpI3mlbDmja5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0pXG5cbi8qKioqKioqKioqKioqKioqKiBGdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogR2V0IFBsYXlsaXN0IENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gUmVxdWVzdCBVUkwgLyBNYXN0ZXIgUGxheWxpc3QgVVJMXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBQbGF5bGlzdCBDYWNoZVxuICogQHBhcmFtIHtBcnJheX0gbGFuZ3VhZ2VzIC0gTGFuZ3VhZ2VzXG4gKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdD59IHsgbWFzdGVyUGxheWxpc3RVUkwsIHN1YnRpdGxlc1BsYXlsaXN0LCBzdWJ0aXRsZXNQbGF5bGlzdEluZGV4IH1cbiAqL1xuZnVuY3Rpb24gZ2V0UGxheWxpc3RDYWNoZSh1cmwsIGNhY2hlLCBsYW5ndWFnZXMpIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIGdldFBsYXlsaXN0Q2FjaGVgLCBcIlwiKTtcblx0bGV0IG1hc3RlclBsYXlsaXN0VVJMID0gXCJcIjtcblx0bGV0IHN1YnRpdGxlc1BsYXlsaXN0ID0ge307XG5cdGxldCBzdWJ0aXRsZXNQbGF5bGlzdEluZGV4ID0gMDtcblx0Y2FjaGU/LmZvckVhY2goKFZhbHVlLCBLZXkpID0+IHtcblx0XHRsYW5ndWFnZXM/LmZvckVhY2gobGFuZ3VhZ2UgPT4ge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoVmFsdWU/LltsYW5ndWFnZV0pKSB7XG5cdFx0XHRcdGxldCBBcnJheSA9IFZhbHVlPy5bbGFuZ3VhZ2VdO1xuXHRcdFx0XHRpZiAoQXJyYXk/LnNvbWUoKE9iamVjdCwgSW5kZXgpID0+IHtcblx0XHRcdFx0XHRpZiAodXJsLmluY2x1ZGVzKE9iamVjdD8uVVJJIHx8IE9iamVjdD8uT1BUSU9OPy5VUkkgfHwgbnVsbCkpIHtcblx0XHRcdFx0XHRcdHN1YnRpdGxlc1BsYXlsaXN0SW5kZXggPSBJbmRleDtcblx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwgZ2V0UGxheWxpc3RDYWNoZWAsIGBzdWJ0aXRsZXNQbGF5bGlzdEluZGV4OiAke3N1YnRpdGxlc1BsYXlsaXN0SW5kZXh9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2UgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KSkge1xuXHRcdFx0XHRcdG1hc3RlclBsYXlsaXN0VVJMID0gS2V5O1xuXHRcdFx0XHRcdHN1YnRpdGxlc1BsYXlsaXN0ID0gVmFsdWU7XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIGdldFBsYXlsaXN0Q2FjaGVgLCBgbWFzdGVyUGxheWxpc3RVUkw6ICR7bWFzdGVyUGxheWxpc3RVUkx9YCwgYHN1YnRpdGxlc1BsYXlsaXN0OiAke0pTT04uc3RyaW5naWZ5KHN1YnRpdGxlc1BsYXlsaXN0KX1gLCBcIlwiKTtcblx0XHRcdFx0fTtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH0pO1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgZ2V0UGxheWxpc3RDYWNoZWAsIGBtYXN0ZXJQbGF5bGlzdFVSTDogJHtKU09OLnN0cmluZ2lmeShtYXN0ZXJQbGF5bGlzdFVSTCl9YCwgXCJcIik7XG5cdHJldHVybiB7IG1hc3RlclBsYXlsaXN0VVJMLCBzdWJ0aXRsZXNQbGF5bGlzdCwgc3VidGl0bGVzUGxheWxpc3RJbmRleCB9O1xufTtcblxuLyoqXG4gKiBHZXQgU3VidGl0bGVzIENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gUmVxdWVzdCBVUkwgLyBTdWJ0aXRsZXMgVVJMXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBTdWJ0aXRsZXMgQ2FjaGVcbiAqIEBwYXJhbSB7QXJyYXl9IGxhbmd1YWdlcyAtIExhbmd1YWdlc1xuICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fSB7IHN1YnRpdGxlc1BsYXlsaXN0VVJMLCBzdWJ0aXRsZXMsIHN1YnRpdGxlc0luZGV4IH1cbiAqL1xuZnVuY3Rpb24gZ2V0U3VidGl0bGVzQ2FjaGUodXJsLCBjYWNoZSwgbGFuZ3VhZ2VzKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBnZXRTdWJ0aXRsZXNDYWNoZWAsIFwiXCIpO1xuXHRsZXQgc3VidGl0bGVzUGxheWxpc3RVUkwgPSBcIlwiO1xuXHRsZXQgc3VidGl0bGVzID0gW107XG5cdGxldCBzdWJ0aXRsZXNJbmRleCA9IDA7XG5cdGNhY2hlPy5mb3JFYWNoKChWYWx1ZSwgS2V5KSA9PiB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoVmFsdWUpKSB7XG5cdFx0XHRsZXQgQXJyYXkgPSBWYWx1ZTtcblx0XHRcdGlmIChBcnJheT8uc29tZSgoU3RyaW5nLCBJbmRleCkgPT4ge1xuXHRcdFx0XHRpZiAodXJsLmluY2x1ZGVzKFN0cmluZyB8fCBudWxsKSkge1xuXHRcdFx0XHRcdHN1YnRpdGxlc0luZGV4ID0gSW5kZXg7XG5cdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCBnZXRTdWJ0aXRsZXNDYWNoZWAsIGBzdWJ0aXRsZXNJbmRleDogJHtzdWJ0aXRsZXNJbmRleH1gLCBcIlwiKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHJldHVybiBmYWxzZTtcblx0XHRcdH0pKSB7XG5cdFx0XHRcdHN1YnRpdGxlc1BsYXlsaXN0VVJMID0gS2V5O1xuXHRcdFx0XHRzdWJ0aXRsZXMgPSBWYWx1ZTtcblx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIGdldFN1YnRpdGxlc0NhY2hlLCBzdWJ0aXRsZXNQbGF5bGlzdFVSTDogJHtzdWJ0aXRsZXNQbGF5bGlzdFVSTH1gLCBcIlwiKTtcblx0XHRcdH07XG5cdFx0fTtcblx0fSk7XG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBnZXRTdWJ0aXRsZXNDYWNoZSwgc3VidGl0bGVzUGxheWxpc3RVUkw6ICR7c3VidGl0bGVzUGxheWxpc3RVUkx9YCwgXCJcIik7XG5cdHJldHVybiB7IHN1YnRpdGxlc1BsYXlsaXN0VVJMLCBzdWJ0aXRsZXMsIHN1YnRpdGxlc0luZGV4IH07XG59O1xuXG4vKipcbiAqIEdldCBTdWJ0aXRsZXMgQXJyYXlcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBSZXF1ZXN0IFVSTCAvIE1hc3RlciBQbGF5bGlzdCBVUkxcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIFN1YnRpdGxlcyBQbGF5bGlzdCBJbmRleFxuICogQHBhcmFtIHtNYXB9IHBsYXlsaXN0c0NhY2hlIC0gUGxheWxpc3RzIENhY2hlXG4gKiBAcGFyYW0ge01hcH0gc3VidGl0bGVzQ2FjaGUgLSBTdWJ0aXRsZXMgQ2FjaGVcbiAqIEBwYXJhbSB7QXJyYXl9IGxhbmd1YWdlcyAtIExhbmd1YWdlc1xuICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fSB7IHN1YnRpdGxlc1VSSUFycmF5MCwgc3VidGl0bGVzVVJJQXJyYXkxIH1cbiAqL1xuZnVuY3Rpb24gZ2V0U3VidGl0bGVzQXJyYXkodXJsLCBpbmRleCwgcGxheWxpc3RzQ2FjaGUsIHN1YnRpdGxlc0NhY2hlLCBsYW5ndWFnZXMpIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIGdldFN1YnRpdGxlc0FycmF5YCwgXCJcIik7XG5cdGNvbnN0IHN1YnRpdGxlc1BsYXlsaXN0VmFsdWUgPSBwbGF5bGlzdHNDYWNoZT8uZ2V0KHVybCkgfHwge307XG5cdGxldCBzdWJ0aXRsZXNQbGF5bGlzdFVSTDAgPSBzdWJ0aXRsZXNQbGF5bGlzdFZhbHVlPy5bbGFuZ3VhZ2VzWzBdXT8uW2luZGV4XT8uVVJMIHx8IHN1YnRpdGxlc1BsYXlsaXN0VmFsdWU/LltsYW5ndWFnZXNbMF1dPy5bMF0/LlVSTDtcblx0bGV0IHN1YnRpdGxlc1BsYXlsaXN0VVJMMSA9IHN1YnRpdGxlc1BsYXlsaXN0VmFsdWU/LltsYW5ndWFnZXNbMV1dPy5baW5kZXhdPy5VUkwgfHwgc3VidGl0bGVzUGxheWxpc3RWYWx1ZT8uW2xhbmd1YWdlc1sxXV0/LlswXT8uVVJMO1xuXHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIGdldFN1YnRpdGxlc0FycmF5YCwgYHN1YnRpdGxlc1BsYXlsaXN0VVJMMDogJHtzdWJ0aXRsZXNQbGF5bGlzdFVSTDB9LCBzdWJ0aXRsZXNQbGF5bGlzdFVSTDE6ICR7c3VidGl0bGVzUGxheWxpc3RVUkwxfWAsIFwiXCIpO1xuXHQvLyDmn6Xmib7lrZfluZXmlofku7blnLDlnYB2dHTnvJPlrZjvvIhtYXDvvIlcblx0bGV0IHN1YnRpdGxlc1VSSUFycmF5MCA9IHN1YnRpdGxlc0NhY2hlLmdldChzdWJ0aXRsZXNQbGF5bGlzdFVSTDApIHx8IFtdO1xuXHRsZXQgc3VidGl0bGVzVVJJQXJyYXkxID0gc3VidGl0bGVzQ2FjaGUuZ2V0KHN1YnRpdGxlc1BsYXlsaXN0VVJMMSkgfHwgW107XG5cdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBnZXRTdWJ0aXRsZXNBcnJheWAsIGBzdWJ0aXRsZXNVUklBcnJheTA6ICR7SlNPTi5zdHJpbmdpZnkoc3VidGl0bGVzVVJJQXJyYXkwKX0sIHN1YnRpdGxlc1VSSUFycmF5MTogJHtKU09OLnN0cmluZ2lmeShzdWJ0aXRsZXNVUklBcnJheTEpfWAsIFwiXCIpO1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgZ2V0U3VidGl0bGVzQXJyYXlgLCBcIlwiKTtcblx0cmV0dXJuIHsgc3VidGl0bGVzVVJJQXJyYXkwLCBzdWJ0aXRsZXNVUklBcnJheTEgfTtcbn07XG5cbi8qKlxuICogU2V0IENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBQbGF5bGlzdHMgQ2FjaGUgLyBTdWJ0aXRsZXMgQ2FjaGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBjYWNoZVNpemUgLSBDYWNoZSBTaXplXG4gKiBAcmV0dXJuIHtCb29sZWFufSBpc1NhdmVkXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlKGNhY2hlLCBjYWNoZVNpemUgPSAxMDApIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIFNldCBDYWNoZSwgY2FjaGVTaXplOiAke2NhY2hlU2l6ZX1gLCBcIlwiKTtcblx0Y2FjaGUgPSBBcnJheS5mcm9tKGNhY2hlIHx8IFtdKTsgLy8gTWFw6L2sQXJyYXlcblx0Y2FjaGUgPSBjYWNoZS5zbGljZSgtY2FjaGVTaXplKTsgLy8g6ZmQ5Yi257yT5a2Y5aSn5bCPXG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgQ2FjaGVgLCBcIlwiKTtcblx0cmV0dXJuIGNhY2hlO1xufTtcblxuLyoqXG4gKiBHZXQgU3VidGl0bGVzIEZpbGVOYW1lXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gUmVxdWVzdCBVUkwgLyBTdWJ0aXRsZXMgVVJMXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhdGZvcm0gLSBQbGF0Zm9ybSBOYW1lXG4gKiBAcmV0dXJuIHtTdHJpbmc8Kj59IGZpbGVOYW1lXG4gKi9cbmZ1bmN0aW9uIGdldFN1YnRpdGxlc0ZpbGVOYW1lKHVybCwgcGxhdGZvcm0pIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIEdldCBTdWJ0aXRsZXMgRmlsZU5hbWVgLCBgdXJsOiAke3VybH1gLCBcIlwiKTtcblx0bGV0IGZpbGVOYW1lID0gdW5kZWZpbmVkO1xuXHRzd2l0Y2ggKHBsYXRmb3JtKSB7XG5cdFx0Y2FzZSBcIkFwcGxlXCI6XG5cdFx0XHRmaWxlTmFtZSA9IHJlcXVlc3QudXJsLm1hdGNoKC8uK18oc3VidGl0bGVzKF9WXFxkKT8tXFxkK1xcLndlYnZ0dClcXD8oLiopc3VidHlwZT0vKVsxXTsgLy8gQXBwbGUg54mH5q615YiG5Z6L5bqP5Y+35LiN5ZCMXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiRGlzbmV5K1wiOlxuXHRcdFx0ZmlsZU5hbWUgPSByZXF1ZXN0LnVybC5tYXRjaCgvKFteXFwvXStcXC52dHQpXFw/KC4qKXN1YnR5cGU9LylbMV07IC8vIERpc25leSsg54mH5q615ZCN56ew55u45ZCMXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiSHVsdVwiOlxuXHRcdFx0ZmlsZU5hbWUgPSByZXF1ZXN0LnVybC5tYXRjaCgvLitfKFNFR01FTlRcXGQrXy4rXFwudnR0KVxcPyguKilzdWJ0eXBlPS8pWzFdOyAvLyBIdWx1IOeJh+auteWIhuWei+W6j+WPt+ebuOWQjFxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIlByaW1lVmlkZW9cIjpcblx0XHRjYXNlIFwiSEJPTWF4XCI6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGZpbGVOYW1lID0gbnVsbDsgLy8gQW1hem9uIFByaW1lIFZpZGVvIEhCT19NYXjkuI3mi4bliIblrZfluZXniYfmrrVcblx0XHRcdGJyZWFrO1xuXHR9O1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgR2V0IFN1YnRpdGxlcyBGaWxlTmFtZWAsIGBmaWxlTmFtZTogJHtmaWxlTmFtZX1gLCBcIlwiKTtcblx0cmV0dXJuIGZpbGVOYW1lO1xufTtcblxuLyoqXG4gKiBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWUgLSBSZXF1ZXN0IFVSTFxuICogQHBhcmFtIHtBcnJheX0gVlRUczEgLSBQcmltYXJ5IChTb3VyY2UpIExhbmd1YWdlIFN1YnRpdGxlcyBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gVlRUczIgLSBTZWNvbmQgKFRhcmdldCkgTGFuZ3VhZ2UgU3VidGl0bGVzIEFycmF5XG4gKiBAcmV0dXJuIHtBcnJheTwqPn0gU3VidGl0bGVzIFJlcXVlc3RzIFF1ZXVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdFN1YnRpdGxlc1F1ZXVlKHJlcXVlc3QsIGZpbGVOYW1lLCBWVFRzMSA9IFtdLCBWVFRzMiA9IFtdKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIGZpbGVOYW1lOiAke2ZpbGVOYW1lfWAsIFwiXCIpO1xuXHRsZXQgcmVxdWVzdHMgPSBbXTtcblx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIFZUVHMxLmxlbmd0aDogJHtWVFRzMS5sZW5ndGh9LCBWVFRzMi5sZW5ndGg6ICR7VlRUczIubGVuZ3RofWAsIFwiXCIpXG5cdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIFZUVHMxOiAke0pTT04uc3RyaW5naWZ5KFZUVHMxKX0sIFZUVHMyLmxlbmd0aDogJHtKU09OLnN0cmluZ2lmeShWVFRzMil9YCwgXCJcIilcblx0Ly8g5p+l6K+i5b2T5YmN5a2X5bmV5Zyo5Y6f5a2X5bmV6Zif5YiX5Lit55qE5L2N572uXG5cdGNvbnN0IEluZGV4MSA9IFZUVHMxLmZpbmRJbmRleChpdGVtID0+IGl0ZW0/LmluY2x1ZGVzKGZpbGVOYW1lKSk7XG5cdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCBJbmRleDE6ICR7SW5kZXgxfWAsIFwiXCIpO1xuXHRzd2l0Y2ggKFZUVHMyLmxlbmd0aCkge1xuXHRcdGNhc2UgMDogLy8g6ZW/5bqm5Li6MO+8jOaXoOmhu+iuoeeul1xuXHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwg6ZW/5bqm5Li6IDBgLCBcIlwiKVxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAxOiB7IC8vIOmVv+W6puS4ujHvvIzml6DpobvorqHnrpdcblx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIOmVv+W6puS4uiAxYCwgXCJcIilcblx0XHRcdGxldCByZXF1ZXN0MiA9IHtcblx0XHRcdFx0XCJ1cmxcIjogVlRUczJbMF0sXG5cdFx0XHRcdFwiaGVhZGVyc1wiOiByZXF1ZXN0LmhlYWRlcnNcblx0XHRcdH07XG5cdFx0XHRyZXF1ZXN0cy5wdXNoKHJlcXVlc3QyKTtcblx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0Y2FzZSBWVFRzMS5sZW5ndGg6IHsgLy8g6ZW/5bqm55u4562J77yM5LiA5LiA5a+55bqU77yM5peg6aG76K6h566XXG5cdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCDplb/luqbnm7jnrYlgLCBcIlwiKVxuXHRcdFx0bGV0IHJlcXVlc3QyID0ge1xuXHRcdFx0XHRcInVybFwiOiBWVFRzMltJbmRleDFdLFxuXHRcdFx0XHRcImhlYWRlcnNcIjogcmVxdWVzdC5oZWFkZXJzXG5cdFx0XHR9O1xuXHRcdFx0cmVxdWVzdHMucHVzaChyZXF1ZXN0Mik7XG5cdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdGRlZmF1bHQ6IHsgLy8g6ZW/5bqm5LiN562J77yM6ZyA6KaB6K6h566XXG5cdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCDplb/luqbkuI3nrYnvvIzpnIDopoHorqHnrpdgLCBcIlwiKVxuXHRcdFx0Ly8g6K6h566X5b2T5YmN5a2X5bmV5Zyo5Y6f5a2X5bmV6Zif5YiX5Lit55qE55m+5YiG5q+UXG5cdFx0XHRjb25zdCBQb3NpdGlvbjEgPSAoSW5kZXgxICsgMSkgLyBWVFRzMS5sZW5ndGg7IC8vIOS7jiAwIOW8gOWni+iuoeaVsO+8jOaJgOS7peimgeWKoCAxXG5cdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwgUG9zaXRpb24xOiAke1Bvc2l0aW9uMX0sIEluZGV4MjogJHtJbmRleDF9LyR7VlRUczEubGVuZ3RofWAsIFwiXCIpO1xuXHRcdFx0Ly8g5qC55o2u55m+5YiG5q+U6K6h566X5b2T5YmN5a2X5bmV5Zyo5paw5a2X5bmV6Zif5YiX5Lit55qE5L2N572uXG5cdFx0XHQvL2xldCBJbmRleDIgPSBWVFRzMi5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmluY2x1ZGVzKGZpbGVOYW1lKSk7XG5cdFx0XHRjb25zdCBJbmRleDIgPSBNYXRoLnJvdW5kKFBvc2l0aW9uMSAqIFZUVHMyLmxlbmd0aCAtIDEpOyAvLyDku44gMCDlvIDlp4vorqHmlbDvvIzmiYDku6XopoHlh48gMVxuXHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIFBvc2l0aW9uMjogJHtQb3NpdGlvbjF9LCBJbmRleDI6ICR7SW5kZXgyfS8ke1ZUVHMyLmxlbmd0aH1gLCBcIlwiKTtcblx0XHRcdC8vIOiOt+WPluS4pOWtl+W5lemYn+WIl+mVv+W6puW3ruWAvFxuXHRcdFx0Y29uc3QgZGlmZkxlbmd0aCA9IFZUVHMyLmxlbmd0aCAtIFZUVHMxLmxlbmd0aDtcblx0XHRcdC8vIOiOt+WPluW9k+WJjeWtl+W5leWcqOaWsOWtl+W5lemYn+WIl+S4reeahOWJjeWQjjHkuKrlrZfluZVcblx0XHRcdC8vY29uc3QgQmVnaW5JbmRleCA9IChJbmRleDIgLSAxIDwgMCkgPyAwIDogSW5kZXgyIC0gMSwgRW5kSW5kZXggPSBJbmRleDIgKyAxO1xuXHRcdFx0Y29uc3QgQmVnaW5JbmRleCA9IChJbmRleDIgPiBJbmRleDEpID8gSW5kZXgxIDogSW5kZXgyO1xuXHRcdFx0Y29uc3QgRW5kSW5kZXggPSAoSW5kZXgyID4gSW5kZXgxKSA/IEluZGV4MiA6IEluZGV4MTtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCBkaWZmTGVuZ3RoOiAke2RpZmZMZW5ndGh9LCBCZWdpbkluZGV4OiAke0JlZ2luSW5kZXh9LCBFbmRJbmRleDogJHtFbmRJbmRleH1gLCBcIlwiKTtcblx0XHRcdGNvbnN0IG5lYXJseVZUVHMgPSAoZGlmZkxlbmd0aCA8IDApID8gVlRUczIuc2xpY2UoKEJlZ2luSW5kZXggPCBkaWZmTGVuZ3RoKSA/IDAgOiBCZWdpbkluZGV4IC0gZGlmZkxlbmd0aCwgRW5kSW5kZXggKyAxKVxuXHRcdFx0XHQ6IFZUVHMyLnNsaWNlKEJlZ2luSW5kZXgsIEVuZEluZGV4ICsgZGlmZkxlbmd0aCArIDEpOyAvLyBzbGljZSDkuI3lj5YgRW5kSW5kZXgg5pys6LqrXG5cdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwgbmVhcmx5VlRUczogJHtKU09OLnN0cmluZ2lmeShuZWFybHlWVFRzKX1gLCBcIlwiKTtcblx0XHRcdG5lYXJseVZUVHMuZm9yRWFjaCh1cmwgPT4ge1xuXHRcdFx0XHRsZXQgcmVxdWVzdDIgPSB7XG5cdFx0XHRcdFx0XCJ1cmxcIjogdXJsLFxuXHRcdFx0XHRcdFwiaGVhZGVyc1wiOiByZXF1ZXN0LmhlYWRlcnNcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVxdWVzdHMucHVzaChyZXF1ZXN0Mik7XG5cdFx0XHR9KTtcblx0XHRcdC8qXG5cdFx0XHRyZXF1ZXN0cyA9IG5lYXJseVZUVHMubWFwKHVybCA9PiB7XG5cdFx0XHRcdGxldCBfcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRcInVybFwiOiB1cmwsXG5cdFx0XHRcdFx0XCJoZWFkZXJzXCI6IHJlcXVlc3QuaGVhZGVyc1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4gX3JlcXVlc3Q7XG5cdFx0XHR9KTtcblx0XHRcdCovXG5cdFx0XHRicmVhaztcblx0XHR9O1xuXHR9O1xuXHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCByZXF1ZXN0czogJHtKU09OLnN0cmluZ2lmeShyZXF1ZXN0cyl9YCwgXCJcIik7XG5cdCQubG9nKGDinIUgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWVgLCBcIlwiKTtcblx0cmV0dXJuIHJlcXVlc3RzO1xufTtcblxuLyoqIFxuICogQ29tYmluZSBEdWFsIFN1YnRpdGxlc1xuICogQHBhcmFtIHtPYmplY3R9IFN1YjEgLSBTdWIxXG4gKiBAcGFyYW0ge09iamVjdH0gU3ViMiAtIFN1YjJcbiAqIEBwYXJhbSB7QXJyYXl9IEZvcm1hdCAtIG9wdGlvbnMgPSBbXCJqc29uXCIsIFwic3J2M1wiLCBcInZ0dFwiXVxuICogQHBhcmFtIHtBcnJheX0gS2luZCAtIG9wdGlvbnMgPSBbXCJhc3JcIiwgXCJjYXB0aW9uc1wiXVxuICogQHBhcmFtIHtOdW1iZXJ9IE9mZnNldCAtIE9mZnNldFxuICogQHBhcmFtIHtOdW1iZXJ9IFRvbGVyYW5jZSAtIFRvbGVyYW5jZVxuICogQHBhcmFtIHtBcnJheX0gUG9zaXRpb24gLSBQb3NpdGlvbiA9IFtcIkZvcndhcmRcIiwgXCJSZXZlcnNlXCJdXG4gKiBAcmV0dXJuIHtTdHJpbmd9IER1YWxTdWJcbiAqL1xuZnVuY3Rpb24gQ29tYmluZUR1YWxTdWJzKFN1YjEgPSB7fSwgU3ViMiA9IHt9LCBGb3JtYXQgPSBcInRleHQvdnR0XCIsIEtpbmQgPSBcImNhcHRpb25zXCIsIE9mZnNldCA9IDAsIFRvbGVyYW5jZSA9IDAsIFBvc2l0aW9uID0gXCJGb3J3YXJkXCIpIHtcblx0JC5sb2coYOKaoCAkeyQubmFtZX0sIENvbWJpbmUgRHVhbCBTdWJ0aXRsZXNgLCBgT2Zmc2V0OiR7T2Zmc2V0fSwgVG9sZXJhbmNlOiR7VG9sZXJhbmNlfSwgUG9zaXRpb246JHtQb3NpdGlvbn1gLCBcIlwiKTtcblx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIENvbWJpbmUgRHVhbCBTdWJ0aXRsZXNgLGBTdWIx5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KFN1YjEpfWAsIFwiXCIpO1xuXHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgQ29tYmluZSBEdWFsIFN1YnRpdGxlc2AsYFN1YjLlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoU3ViMil9YCwgXCJcIik7XG5cdC8vbGV0IER1YWxTdWIgPSBQb3NpdGlvbi5pbmNsdWRlcyhcIlJldmVyc2VcIikgPyBTdWIyIDogU3ViMVxuXHRsZXQgRHVhbFN1YiA9IFN1YjE7XG5cdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBDb21iaW5lIER1YWwgU3VidGl0bGVzYCxgbGV0IER1YWxTdWLlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoRHVhbFN1Yil9YCwgXCJcIik7XG5cdC8vIOacieW6j+aVsOWIlyDnlKjkuI3nnYDmjpLluo9cblx0Ly9GaXJzdFN1Yi5ib2R5LnNvcnQoKHgsIHkpID0+IHggLSB5KTtcblx0Ly9TZWNvbmRTdWIuYm9keS5zb3J0KCh4LCB5KSA9PiB4IC0geSk7XG5cdGxldCBpbmRleDAgPSAwLCBpbmRleDEgPSAwLCBpbmRleDIgPSAwO1xuXHQvLyDlj4zmjIfpkojms5Xmn6Xmib7kuKTkuKrmlbDnu4TkuK3nmoTnm7jlkIzlhYPntKBcblx0c3dpdGNoIChGb3JtYXQpIHtcblx0XHRjYXNlIFwidGV4dC9qc29uXCI6XG5cdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuXHRcdFx0Y29uc3QgbGVuZ3RoMSA9IFN1YjE/LmV2ZW50cz8ubGVuZ3RoLCBsZW5ndGgyID0gU3ViMj8uZXZlbnRzPy5sZW5ndGg7XG5cdFx0XHRzd2l0Y2ggKEtpbmQpIHtcblx0XHRcdFx0Y2FzZSBcImFzclwiOlxuXHRcdFx0XHRcdC8vIOiHquWKqOeUn+aIkOWtl+W5lei9rOaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdCQubG9nKGDwn5qnYCwgYER1YWxTdWLmmK/oh6rliqjnlJ/miJDlrZfluZVgLCBcIlwiKTtcblx0XHRcdFx0XHRpbmRleDAgPSAxLCBpbmRleDEgPSAxLCBpbmRleDIgPSAxO1xuXHRcdFx0XHRcdFN1YjEuZXZlbnRzID0gU3ViMS5ldmVudHMubWFwKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRcdGlmIChldmVudD8uc2Vncykge1xuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShldmVudD8uc2VncykpIGV2ZW50LnNlZ3MgPSBbeyBcInV0ZjhcIjogZXZlbnQuc2Vncy5tYXAoc2VnID0+IHNlZy51dGY4KS5qb2luKFwiXCIpIH1dO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGRlbGV0ZSBldmVudC53V2luSWQ7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0U3ViMi5ldmVudHMgPSBTdWIyLmV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50Py5zZWdzKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGV2ZW50Py5zZWdzKSkgZXZlbnQuc2VncyA9IFt7IFwidXRmOFwiOiBldmVudC5zZWdzLm1hcChzZWcgPT4gc2VnLnV0ZjgpLmpvaW4oXCJcIikgfV07XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0ZGVsZXRlIGV2ZW50LndXaW5JZDtcblx0XHRcdFx0XHRcdHJldHVybiBldmVudDtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL2JyZWFrOyDkuI3opoFicmVha++8jOi/nue7reWkhOeQhlxuXHRcdFx0XHRjYXNlIFwiY2FwdGlvbnNcIjpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyDlpITnkIbmma7pgJrlrZfluZVcblx0XHRcdFx0XHR3aGlsZSAoaW5kZXgxIDwgbGVuZ3RoMSAmJiBpbmRleDIgPCBsZW5ndGgyKSB7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnYCwgYGluZGV4MS9sZW5ndGgxOiAke2luZGV4MX0vJHtsZW5ndGgxfWAsIGBpbmRleDIvbGVuZ3RoMjogJHtpbmRleDJ9LyR7bGVuZ3RoMn1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdGNvbnN0IHRpbWVTdGFtcDEgPSBTdWIxLmV2ZW50c1tpbmRleDFdLnRTdGFydE1zLCB0aW1lU3RhbXAyID0gU3ViMi5ldmVudHNbaW5kZXgyXS50U3RhcnRNcztcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgdGltZVN0YW1wMTogJHt0aW1lU3RhbXAxfWAsIGB0aW1lU3RhbXAyOiAke3RpbWVTdGFtcDJ9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRpZiAoTWF0aC5hYnModGltZVN0YW1wMSAtIHRpbWVTdGFtcDIpIDw9IFRvbGVyYW5jZSkge1xuXHRcdFx0XHRcdFx0XHQvL2luZGV4MCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gaW5kZXgyIDogaW5kZXgxO1xuXHRcdFx0XHRcdFx0XHRpbmRleDAgPSBpbmRleDE7XG5cdFx0XHRcdFx0XHRcdC8vIOWkhOeQhuaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0MSA9IFN1YjEuZXZlbnRzW2luZGV4MV0/LnNlZ3M/LlswXS51dGY4ID8/IFwiXCIsIHRleHQyID0gU3ViMi5ldmVudHNbaW5kZXgyXT8uc2Vncz8uWzBdLnV0ZjggPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+ap2AsIGB0ZXh0MTogJHt0ZXh0MX1gLCBgdGV4dDI6ICR7dGV4dDJ9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdER1YWxTdWIuZXZlbnRzW2luZGV4MF0uc2VncyA9IFt7IFwidXRmOFwiOiAoUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IGAke3RleHQyfVxcbiR7dGV4dDF9YCA6IGAke3RleHQxfVxcbiR7dGV4dDJ9YCB9XTtcblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+ap2AsIGBEdWFsU3ViLmV2ZW50c1tpbmRleDBdLnNlZ3NbMF0udXRmODogJHtEdWFsU3ViLmV2ZW50c1tpbmRleDBdLnNlZ3NbMF0udXRmOH1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0Ly9EdWFsU3ViLmJvZHlbaW5kZXgwXS50U3RhcnRNcyA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gdGltZVN0YW1wMiA6IHRpbWVTdGFtcDE7XG5cdFx0XHRcdFx0XHRcdC8vRHVhbFN1Yi5ib2R5W2luZGV4MF0uaW5kZXggPSAoUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IGluZGV4MiA6IGluZGV4MTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRpZiAodGltZVN0YW1wMiA+IHRpbWVTdGFtcDEpIGluZGV4MSsrXG5cdFx0XHRcdFx0XHRlbHNlIGlmICh0aW1lU3RhbXAyIDwgdGltZVN0YW1wMSkgaW5kZXgyKytcblx0XHRcdFx0XHRcdGVsc2UgeyBpbmRleDErKzsgaW5kZXgyKysgfTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0Y2FzZSBcInRleHQveG1sXCI6XG5cdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3htbFwiOiB7XG5cdFx0XHRjb25zdCBsZW5ndGgxID0gU3ViMT8udGltZWR0ZXh0Py5ib2R5Py5wPy5sZW5ndGgsIGxlbmd0aDIgPSBTdWIyPy50aW1lZHRleHQ/LmJvZHk/LnA/Lmxlbmd0aDtcblx0XHRcdHN3aXRjaCAoS2luZCkge1xuXHRcdFx0XHRjYXNlIFwiYXNyXCI6XG5cdFx0XHRcdFx0Ly8g6Ieq5Yqo55Sf5oiQ5a2X5bmV6L2s5pmu6YCa5a2X5bmVXG5cdFx0XHRcdFx0JC5sb2coYPCfmqdgLCBgRHVhbFN1YuaYr+iHquWKqOeUn+aIkOWtl+W5lWAsIFwiXCIpO1xuXHRcdFx0XHRcdER1YWxTdWIudGltZWR0ZXh0LmhlYWQud3BbMV1bXCJAcmNcIl0gPSBcIjFcIjtcblx0XHRcdFx0XHRTdWIxLnRpbWVkdGV4dC5ib2R5LnAgPSBTdWIxLnRpbWVkdGV4dC5ib2R5LnAubWFwKHBhcmEgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHBhcmE/LnMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocGFyYT8ucykpIHBhcmFbXCIjXCJdID0gcGFyYT8ucy5tYXAoc2VnID0+IHNlZ1tcIiNcIl0pLmpvaW4oXCJcIik7XG5cdFx0XHRcdFx0XHRcdGVsc2UgcGFyYVtcIiNcIl0gPSBwYXJhLnM/LltcIiNcIl0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHBhcmEucztcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFyYTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRTdWIyLnRpbWVkdGV4dC5ib2R5LnAgPSBTdWIyLnRpbWVkdGV4dC5ib2R5LnAubWFwKHBhcmEgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHBhcmE/LnMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocGFyYT8ucykpIHBhcmFbXCIjXCJdID0gcGFyYT8ucy5tYXAoc2VnID0+IHNlZ1tcIiNcIl0pLmpvaW4oXCJcIik7XG5cdFx0XHRcdFx0XHRcdGVsc2UgcGFyYVtcIiNcIl0gPSBwYXJhLnM/LltcIiNcIl0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHBhcmEucztcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFyYTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL2JyZWFrOyDkuI3opoFicmVha++8jOi/nue7reWkhOeQhlxuXHRcdFx0XHRjYXNlIFwiY2FwdGlvbnNcIjpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyDlpITnkIbmma7pgJrlrZfluZVcblx0XHRcdFx0XHR3aGlsZSAoaW5kZXgxIDwgbGVuZ3RoMSAmJiBpbmRleDIgPCBsZW5ndGgyKSB7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnYCwgYGluZGV4MS9sZW5ndGgxOiAke2luZGV4MX0vJHtsZW5ndGgxfWAsIGBpbmRleDIvbGVuZ3RoMjogJHtpbmRleDJ9LyR7bGVuZ3RoMn1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdGNvbnN0IHRpbWVTdGFtcDEgPSBwYXJzZUludChTdWIxLnRpbWVkdGV4dC5ib2R5LnBbaW5kZXgxXVtcIkB0XCJdLCAxMCksIHRpbWVTdGFtcDIgPSBwYXJzZUludChTdWIyLnRpbWVkdGV4dC5ib2R5LnBbaW5kZXgyXVtcIkB0XCJdLCAxMCk7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnYCwgYHRpbWVTdGFtcDE6ICR7dGltZVN0YW1wMX1gLCBgdGltZVN0YW1wMjogJHt0aW1lU3RhbXAyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0aWYgKE1hdGguYWJzKHRpbWVTdGFtcDEgLSB0aW1lU3RhbXAyKSA8PSBUb2xlcmFuY2UpIHtcblx0XHRcdFx0XHRcdFx0Ly9pbmRleDAgPSAoUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IGluZGV4MiA6IGluZGV4MTtcblx0XHRcdFx0XHRcdFx0aW5kZXgwID0gaW5kZXgxO1xuXHRcdFx0XHRcdFx0XHQvLyDlpITnkIbmma7pgJrlrZfluZVcblx0XHRcdFx0XHRcdFx0Y29uc3QgdGV4dDEgPSBTdWIxLnRpbWVkdGV4dC5ib2R5LnBbaW5kZXgxXT8uW1wiI1wiXSA/PyBcIlwiLCB0ZXh0MiA9IFN1YjIudGltZWR0ZXh0LmJvZHkucFtpbmRleDJdPy5bXCIjXCJdID8/IFwiXCI7XG5cdFx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgdGV4dDE6ICR7dGV4dDF9YCwgYHRleHQyOiAke3RleHQyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHREdWFsU3ViLnRpbWVkdGV4dC5ib2R5LnBbaW5kZXgwXVtcIiNcIl0gPSAoUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IGAke3RleHQyfSYjeDAwMEE7JHt0ZXh0MX1gIDogYCR7dGV4dDF9JiN4MDAwQTske3RleHQyfWA7XG5cdFx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgRHVhbFN1Yi50aW1lZHRleHQuYm9keS5wW2luZGV4MF1bXCIjXCJdOiAke0R1YWxTdWIudGltZWR0ZXh0LmJvZHkucFtpbmRleDBdW1wiI1wiXX1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0Ly9EdWFsU3ViLnRpbWVkdGV4dC5ib2R5LnBbaW5kZXgwXVtcIkB0XCJdID0gKFBvc2l0aW9uID09PSBcIlJldmVyc2VcIikgPyB0aW1lU3RhbXAyIDogdGltZVN0YW1wMTtcblx0XHRcdFx0XHRcdFx0Ly9EdWFsU3ViLnRpbWVkdGV4dC5ib2R5LnBbaW5kZXgwXS5pbmRleCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gaW5kZXgyIDogaW5kZXgxO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGlmICh0aW1lU3RhbXAyID4gdGltZVN0YW1wMSkgaW5kZXgxKytcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHRpbWVTdGFtcDIgPCB0aW1lU3RhbXAxKSBpbmRleDIrK1xuXHRcdFx0XHRcdFx0ZWxzZSB7IGluZGV4MSsrOyBpbmRleDIrKyB9O1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRjYXNlIFwidGV4dC92dHRcIjpcblx0XHRjYXNlIFwiYXBwbGljYXRpb24vdnR0XCI6IHtcblx0XHRcdGNvbnN0IGxlbmd0aDEgPSBTdWIxPy5ib2R5Py5sZW5ndGgsIGxlbmd0aDIgPSBTdWIyPy5ib2R5Py5sZW5ndGg7XG5cdFx0XHRzd2l0Y2ggKEtpbmQpIHtcblx0XHRcdFx0Y2FzZSBcImFzclwiOlxuXHRcdFx0XHRcdC8vIOiHquWKqOeUn+aIkOWtl+W5lei9rOaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdCQubG9nKGDwn5qnYCwgYER1YWxTdWLmmK/oh6rliqjnlJ/miJDlrZfluZVgLCBcIlwiKTtcblx0XHRcdFx0XHQvLyB2dHTlrZfluZXkuI3pnIDopoHnibnmrorlpITnkIZcblx0XHRcdFx0XHQvL2JyZWFrOyDkuI3opoFicmVha++8jOi/nue7reWkhOeQhlxuXHRcdFx0XHRjYXNlIFwiY2FwdGlvbnNcIjpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyDlpITnkIbmma7pgJrlrZfluZVcblx0XHRcdFx0XHR3aGlsZSAoaW5kZXgxIDwgbGVuZ3RoMSAmJiBpbmRleDIgPCBsZW5ndGgyKSB7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnYCwgYGluZGV4MS9sZW5ndGgxOiAke2luZGV4MX0vJHtsZW5ndGgxfWAsIGBpbmRleDIvbGVuZ3RoMjogJHtpbmRleDJ9LyR7bGVuZ3RoMn1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdGNvbnN0IHRpbWVTdGFtcDEgPSBTdWIxLmJvZHlbaW5kZXgxXS50aW1lU3RhbXAsIHRpbWVTdGFtcDIgPSBTdWIyLmJvZHlbaW5kZXgyXS50aW1lU3RhbXA7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnYCwgYHRpbWVTdGFtcDE6ICR7dGltZVN0YW1wMX1gLCBgdGltZVN0YW1wMjogJHt0aW1lU3RhbXAyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0Ly8g5aSE55CG5pmu6YCa5a2X5bmVXG5cdFx0XHRcdFx0XHRjb25zdCB0ZXh0MSA9IFN1YjEuYm9keVtpbmRleDFdPy50ZXh0ID8/IFwiXCIsIHRleHQyID0gU3ViMi5ib2R5W2luZGV4Ml0/LnRleHQgPz8gXCJcIjtcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgdGV4dDE6ICR7dGV4dDF9YCwgYHRleHQyOiAke3RleHQyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0aWYgKE1hdGguYWJzKHRpbWVTdGFtcDEgLSB0aW1lU3RhbXAyKSA8PSBUb2xlcmFuY2UpIHtcblx0XHRcdFx0XHRcdFx0Ly9pbmRleDAgPSAoUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IGluZGV4MiA6IGluZGV4MTtcblx0XHRcdFx0XHRcdFx0aW5kZXgwID0gaW5kZXgxO1xuXHRcdFx0XHRcdFx0XHQvLyDlpITnkIbmma7pgJrlrZfluZVcblx0XHRcdFx0XHRcdFx0RHVhbFN1Yi5ib2R5W2luZGV4MF0udGV4dCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gYCR7dGV4dDJ9XFxuJHt0ZXh0MX1gOiBgJHt0ZXh0MX1cXG4ke3RleHQyfWA7XG5cdFx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgaW5kZXgwOiAke2luZGV4MH1gLCBgdGV4dDogJHtEdWFsU3ViLmJvZHlbaW5kZXgwXS50ZXh0fWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHQvL0R1YWxTdWIuYm9keVtpbmRleDBdLnRpbWVTdGFtcCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gdGltZVN0YW1wMiA6IHRpbWVTdGFtcDE7XG5cdFx0XHRcdFx0XHRcdC8vRHVhbFN1Yi5ib2R5W2luZGV4MF0uaW5kZXggPSAoUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IGluZGV4MiA6IGluZGV4MTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRpZiAodGltZVN0YW1wMiA+IHRpbWVTdGFtcDEpIGluZGV4MSsrXG5cdFx0XHRcdFx0XHRlbHNlIGlmICh0aW1lU3RhbXAyIDwgdGltZVN0YW1wMSkgaW5kZXgyKytcblx0XHRcdFx0XHRcdGVsc2UgeyBpbmRleDErKzsgaW5kZXgyKysgfVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0fTtcblx0Ly8kLmxvZyhg8J+OiSAkeyQubmFtZX0sIENvbWJpbmUgRHVhbCBTdWJ0aXRsZXNgLCBgcmV0dXJuIER1YWxTdWLlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoRHVhbFN1Yil9YCwgXCJcIik7XG5cdCQubG9nKGDwn46JICR7JC5uYW1lfSwgQ29tYmluZSBEdWFsIFN1YnRpdGxlc2AsIFwiXCIpO1xuXHRyZXR1cm4gRHVhbFN1Yjtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=