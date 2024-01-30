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

/***/ "./src/function/setCache.mjs":
/*!***********************************!*\
  !*** ./src/function/setCache.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setCache)
/* harmony export */ });
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
var _database_Database_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/* harmony import */ var _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./URI/URI.mjs */ "./src/URI/URI.mjs");
/* harmony import */ var _XML_XML_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./XML/XML.mjs */ "./src/XML/XML.mjs");
/* harmony import */ var _WebVTT_WebVTT_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WebVTT/WebVTT.mjs */ "./src/WebVTT/WebVTT.mjs");
/* harmony import */ var _function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/setENV.mjs */ "./src/function/setENV.mjs");
/* harmony import */ var _function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/detectPlatform.mjs */ "./src/function/detectPlatform.mjs");
/* harmony import */ var _function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/detectFormat.mjs */ "./src/function/detectFormat.mjs");
/* harmony import */ var _function_setCache_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./function/setCache.mjs */ "./src/function/setCache.mjs");
/* harmony import */ var _database_Database_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./database/Database.json */ "./src/database/Database.json");
/*
README: https://github.com/DualSubs
*/













const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: 🎦 Universal v0.9.5(3) Composite.Subtitles.response.beta");
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
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Composite", "API"], /*#__PURE__*/ (_database_Database_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache || (_database_Database_json__WEBPACK_IMPORTED_MODULE_8___namespace_cache = __webpack_require__.t(_database_Database_json__WEBPACK_IMPORTED_MODULE_8__, 2))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9zaXRlLlN1YnRpdGxlcy5yZXNwb25zZS5iZXRhLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFVBQVU7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxlQUFlLCtCQUErQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFNBQVMsOENBQThDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LFdBQVcsa0JBQWtCLFdBQVc7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixNQUFNLGFBQWEsTUFBTTtBQUN4RCw2RUFBNkUsTUFBTSxRQUFRLEVBQUUsTUFBTSxPQUFPLE1BQU0sUUFBUSxFQUFFLE1BQU07QUFDaEksK0RBQStELHNDQUFzQztBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU8sR0FBRyxRQUFRLHNCQUFzQixPQUFPLEdBQUcsUUFBUTtBQUNqRztBQUNBLG1DQUFtQyxXQUFXLGtCQUFrQixXQUFXO0FBQzNFO0FBQ0E7QUFDQSw4QkFBOEIsTUFBTSxhQUFhLE1BQU07QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsTUFBTSxJQUFJLE1BQU0sTUFBTSxNQUFNLElBQUksTUFBTTtBQUN2RyxnQ0FBZ0MsT0FBTyxZQUFZLDBCQUEwQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTyxnREFBZ0Qsd0JBQXdCO0FBQzlGLGFBQWEsT0FBTztBQUNwQjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvRU5WL0VOVi5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvVVJJL1VSSS5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvV2ViVlRUL1dlYlZUVC5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvWE1ML1hNTC5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvZnVuY3Rpb24vZGV0ZWN0Rm9ybWF0Lm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9kZXRlY3RQbGF0Zm9ybS5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvZnVuY3Rpb24vc2V0Q2FjaGUubWpzIiwid2VicGFjazovL2R1YWxzdWJzLy4vc3JjL2Z1bmN0aW9uL3NldEVOVi5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9Db21wb3NpdGUuU3VidGl0bGVzLnJlc3BvbnNlLmJldGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRU5WIHtcblx0Y29uc3RydWN0b3IobmFtZSwgb3B0cykge1xuXHRcdHRoaXMubmFtZSA9IG5hbWVcblx0XHR0aGlzLmh0dHAgPSBuZXcgSHR0cCh0aGlzKVxuXHRcdHRoaXMuZGF0YSA9IG51bGxcblx0XHR0aGlzLmRhdGFGaWxlID0gJ2JveC5kYXQnXG5cdFx0dGhpcy5sb2dzID0gW11cblx0XHR0aGlzLmlzTXV0ZSA9IGZhbHNlXG5cdFx0dGhpcy5pc05lZWRSZXdyaXRlID0gZmFsc2Vcblx0XHR0aGlzLmxvZ1NlcGFyYXRvciA9ICdcXG4nXG5cdFx0dGhpcy5lbmNvZGluZyA9ICd1dGYtOCdcblx0XHR0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBvcHRzKVxuXHRcdHRoaXMubG9nKCcnLCBg8J+PgSAke3RoaXMubmFtZX0sIEVOViB2MS4xLjAsIOW8gOWniyFgKVxuXHR9XG5cblx0cGxhdGZvcm0oKSB7XG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJGVudmlyb25tZW50ICYmICRlbnZpcm9ubWVudFsnc3VyZ2UtdmVyc2lvbiddKVxuXHRcdFx0cmV0dXJuICdTdXJnZSdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkZW52aXJvbm1lbnQgJiYgJGVudmlyb25tZW50WydzdGFzaC12ZXJzaW9uJ10pXG5cdFx0XHRyZXR1cm4gJ1N0YXNoJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSAmJiAhIW1vZHVsZS5leHBvcnRzKSByZXR1cm4gJ05vZGUuanMnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJHRhc2spIHJldHVybiAnUXVhbnR1bXVsdCBYJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRsb29uKSByZXR1cm4gJ0xvb24nXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJHJvY2tldCkgcmV0dXJuICdTaGFkb3dyb2NrZXQnXG5cdH1cblxuXHRpc05vZGUoKSB7XG5cdFx0cmV0dXJuICdOb2RlLmpzJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1F1YW5YKCkge1xuXHRcdHJldHVybiAnUXVhbnR1bXVsdCBYJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1N1cmdlKCkge1xuXHRcdHJldHVybiAnU3VyZ2UnID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdGlzTG9vbigpIHtcblx0XHRyZXR1cm4gJ0xvb24nID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdGlzU2hhZG93cm9ja2V0KCkge1xuXHRcdHJldHVybiAnU2hhZG93cm9ja2V0JyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1N0YXNoKCkge1xuXHRcdHJldHVybiAnU3Rhc2gnID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdHRvT2JqKHN0ciwgZGVmYXVsdFZhbHVlID0gbnVsbCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShzdHIpXG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0fVxuXHR9XG5cblx0dG9TdHIob2JqLCBkZWZhdWx0VmFsdWUgPSBudWxsKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0fVxuXHR9XG5cblx0Z2V0anNvbihrZXksIGRlZmF1bHRWYWx1ZSkge1xuXHRcdGxldCBqc29uID0gZGVmYXVsdFZhbHVlXG5cdFx0Y29uc3QgdmFsID0gdGhpcy5nZXRkYXRhKGtleSlcblx0XHRpZiAodmFsKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZSh0aGlzLmdldGRhdGEoa2V5KSlcblx0XHRcdH0gY2F0Y2ggeyB9XG5cdFx0fVxuXHRcdHJldHVybiBqc29uXG5cdH1cblxuXHRzZXRqc29uKHZhbCwga2V5KSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiB0aGlzLnNldGRhdGEoSlNPTi5zdHJpbmdpZnkodmFsKSwga2V5KVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHR9XG5cblx0Z2V0U2NyaXB0KHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0dGhpcy5nZXQoeyB1cmwgfSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4gcmVzb2x2ZShib2R5KSlcblx0XHR9KVxuXHR9XG5cblx0cnVuU2NyaXB0KHNjcmlwdCwgcnVuT3B0cykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0bGV0IGh0dHBhcGkgPSB0aGlzLmdldGRhdGEoJ0BjaGF2eV9ib3hqc191c2VyQ2Zncy5odHRwYXBpJylcblx0XHRcdGh0dHBhcGkgPSBodHRwYXBpID8gaHR0cGFwaS5yZXBsYWNlKC9cXG4vZywgJycpLnRyaW0oKSA6IGh0dHBhcGlcblx0XHRcdGxldCBodHRwYXBpX3RpbWVvdXQgPSB0aGlzLmdldGRhdGEoXG5cdFx0XHRcdCdAY2hhdnlfYm94anNfdXNlckNmZ3MuaHR0cGFwaV90aW1lb3V0J1xuXHRcdFx0KVxuXHRcdFx0aHR0cGFwaV90aW1lb3V0ID0gaHR0cGFwaV90aW1lb3V0ID8gaHR0cGFwaV90aW1lb3V0ICogMSA6IDIwXG5cdFx0XHRodHRwYXBpX3RpbWVvdXQgPVxuXHRcdFx0XHRydW5PcHRzICYmIHJ1bk9wdHMudGltZW91dCA/IHJ1bk9wdHMudGltZW91dCA6IGh0dHBhcGlfdGltZW91dFxuXHRcdFx0Y29uc3QgW2tleSwgYWRkcl0gPSBodHRwYXBpLnNwbGl0KCdAJylcblx0XHRcdGNvbnN0IG9wdHMgPSB7XG5cdFx0XHRcdHVybDogYGh0dHA6Ly8ke2FkZHJ9L3YxL3NjcmlwdGluZy9ldmFsdWF0ZWAsXG5cdFx0XHRcdGJvZHk6IHtcblx0XHRcdFx0XHRzY3JpcHRfdGV4dDogc2NyaXB0LFxuXHRcdFx0XHRcdG1vY2tfdHlwZTogJ2Nyb24nLFxuXHRcdFx0XHRcdHRpbWVvdXQ6IGh0dHBhcGlfdGltZW91dFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRoZWFkZXJzOiB7ICdYLUtleSc6IGtleSwgJ0FjY2VwdCc6ICcqLyonIH0sXG5cdFx0XHRcdHRpbWVvdXQ6IGh0dHBhcGlfdGltZW91dFxuXHRcdFx0fVxuXHRcdFx0dGhpcy5wb3N0KG9wdHMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHJlc29sdmUoYm9keSkpXG5cdFx0fSkuY2F0Y2goKGUpID0+IHRoaXMubG9nRXJyKGUpKVxuXHR9XG5cblx0bG9hZGRhdGEoKSB7XG5cdFx0aWYgKHRoaXMuaXNOb2RlKCkpIHtcblx0XHRcdHRoaXMuZnMgPSB0aGlzLmZzID8gdGhpcy5mcyA6IHJlcXVpcmUoJ2ZzJylcblx0XHRcdHRoaXMucGF0aCA9IHRoaXMucGF0aCA/IHRoaXMucGF0aCA6IHJlcXVpcmUoJ3BhdGgnKVxuXHRcdFx0Y29uc3QgY3VyRGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUodGhpcy5kYXRhRmlsZSlcblx0XHRcdGNvbnN0IHJvb3REaXJEYXRhRmlsZVBhdGggPSB0aGlzLnBhdGgucmVzb2x2ZShcblx0XHRcdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRcdFx0dGhpcy5kYXRhRmlsZVxuXHRcdFx0KVxuXHRcdFx0Y29uc3QgaXNDdXJEaXJEYXRhRmlsZSA9IHRoaXMuZnMuZXhpc3RzU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgpXG5cdFx0XHRjb25zdCBpc1Jvb3REaXJEYXRhRmlsZSA9XG5cdFx0XHRcdCFpc0N1ckRpckRhdGFGaWxlICYmIHRoaXMuZnMuZXhpc3RzU3luYyhyb290RGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0aWYgKGlzQ3VyRGlyRGF0YUZpbGUgfHwgaXNSb290RGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0Y29uc3QgZGF0UGF0aCA9IGlzQ3VyRGlyRGF0YUZpbGVcblx0XHRcdFx0XHQ/IGN1ckRpckRhdGFGaWxlUGF0aFxuXHRcdFx0XHRcdDogcm9vdERpckRhdGFGaWxlUGF0aFxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJldHVybiBKU09OLnBhcnNlKHRoaXMuZnMucmVhZEZpbGVTeW5jKGRhdFBhdGgpKVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHt9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSByZXR1cm4ge31cblx0XHR9IGVsc2UgcmV0dXJuIHt9XG5cdH1cblxuXHR3cml0ZWRhdGEoKSB7XG5cdFx0aWYgKHRoaXMuaXNOb2RlKCkpIHtcblx0XHRcdHRoaXMuZnMgPSB0aGlzLmZzID8gdGhpcy5mcyA6IHJlcXVpcmUoJ2ZzJylcblx0XHRcdHRoaXMucGF0aCA9IHRoaXMucGF0aCA/IHRoaXMucGF0aCA6IHJlcXVpcmUoJ3BhdGgnKVxuXHRcdFx0Y29uc3QgY3VyRGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUodGhpcy5kYXRhRmlsZSlcblx0XHRcdGNvbnN0IHJvb3REaXJEYXRhRmlsZVBhdGggPSB0aGlzLnBhdGgucmVzb2x2ZShcblx0XHRcdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRcdFx0dGhpcy5kYXRhRmlsZVxuXHRcdFx0KVxuXHRcdFx0Y29uc3QgaXNDdXJEaXJEYXRhRmlsZSA9IHRoaXMuZnMuZXhpc3RzU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgpXG5cdFx0XHRjb25zdCBpc1Jvb3REaXJEYXRhRmlsZSA9XG5cdFx0XHRcdCFpc0N1ckRpckRhdGFGaWxlICYmIHRoaXMuZnMuZXhpc3RzU3luYyhyb290RGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QganNvbmRhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpXG5cdFx0XHRpZiAoaXNDdXJEaXJEYXRhRmlsZSkge1xuXHRcdFx0XHR0aGlzLmZzLndyaXRlRmlsZVN5bmMoY3VyRGlyRGF0YUZpbGVQYXRoLCBqc29uZGF0YSlcblx0XHRcdH0gZWxzZSBpZiAoaXNSb290RGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKHJvb3REaXJEYXRhRmlsZVBhdGgsIGpzb25kYXRhKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKGN1ckRpckRhdGFGaWxlUGF0aCwganNvbmRhdGEpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bG9kYXNoX2dldChzb3VyY2UsIHBhdGgsIGRlZmF1bHRWYWx1ZSA9IHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IHBhdGhzID0gcGF0aC5yZXBsYWNlKC9cXFsoXFxkKylcXF0vZywgJy4kMScpLnNwbGl0KCcuJylcblx0XHRsZXQgcmVzdWx0ID0gc291cmNlXG5cdFx0Zm9yIChjb25zdCBwIG9mIHBhdGhzKSB7XG5cdFx0XHRyZXN1bHQgPSBPYmplY3QocmVzdWx0KVtwXVxuXHRcdFx0aWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWVcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0bG9kYXNoX3NldChvYmosIHBhdGgsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdChvYmopICE9PSBvYmopIHJldHVybiBvYmpcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpIHBhdGggPSBwYXRoLnRvU3RyaW5nKCkubWF0Y2goL1teLltcXF1dKy9nKSB8fCBbXVxuXHRcdHBhdGhcblx0XHRcdC5zbGljZSgwLCAtMSlcblx0XHRcdC5yZWR1Y2UoXG5cdFx0XHRcdChhLCBjLCBpKSA9PlxuXHRcdFx0XHRcdE9iamVjdChhW2NdKSA9PT0gYVtjXVxuXHRcdFx0XHRcdFx0PyBhW2NdXG5cdFx0XHRcdFx0XHQ6IChhW2NdID0gTWF0aC5hYnMocGF0aFtpICsgMV0pID4+IDAgPT09ICtwYXRoW2kgKyAxXSA/IFtdIDoge30pLFxuXHRcdFx0XHRvYmpcblx0XHRcdClbcGF0aFtwYXRoLmxlbmd0aCAtIDFdXSA9IHZhbHVlXG5cdFx0cmV0dXJuIG9ialxuXHR9XG5cblx0Z2V0ZGF0YShrZXkpIHtcblx0XHRsZXQgdmFsID0gdGhpcy5nZXR2YWwoa2V5KVxuXHRcdC8vIOWmguaenOS7pSBAXG5cdFx0aWYgKC9eQC8udGVzdChrZXkpKSB7XG5cdFx0XHRjb25zdCBbLCBvYmprZXksIHBhdGhzXSA9IC9eQCguKj8pXFwuKC4qPykkLy5leGVjKGtleSlcblx0XHRcdGNvbnN0IG9ianZhbCA9IG9iamtleSA/IHRoaXMuZ2V0dmFsKG9iamtleSkgOiAnJ1xuXHRcdFx0aWYgKG9ianZhbCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IG9iamVkdmFsID0gSlNPTi5wYXJzZShvYmp2YWwpXG5cdFx0XHRcdFx0dmFsID0gb2JqZWR2YWwgPyB0aGlzLmxvZGFzaF9nZXQob2JqZWR2YWwsIHBhdGhzLCAnJykgOiB2YWxcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHZhbCA9ICcnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHZhbFxuXHR9XG5cblx0c2V0ZGF0YSh2YWwsIGtleSkge1xuXHRcdGxldCBpc3N1YyA9IGZhbHNlXG5cdFx0aWYgKC9eQC8udGVzdChrZXkpKSB7XG5cdFx0XHRjb25zdCBbLCBvYmprZXksIHBhdGhzXSA9IC9eQCguKj8pXFwuKC4qPykkLy5leGVjKGtleSlcblx0XHRcdGNvbnN0IG9iamRhdCA9IHRoaXMuZ2V0dmFsKG9iamtleSlcblx0XHRcdGNvbnN0IG9ianZhbCA9IG9iamtleVxuXHRcdFx0XHQ/IG9iamRhdCA9PT0gJ251bGwnXG5cdFx0XHRcdFx0PyBudWxsXG5cdFx0XHRcdFx0OiBvYmpkYXQgfHwgJ3t9J1xuXHRcdFx0XHQ6ICd7fSdcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IG9iamVkdmFsID0gSlNPTi5wYXJzZShvYmp2YWwpXG5cdFx0XHRcdHRoaXMubG9kYXNoX3NldChvYmplZHZhbCwgcGF0aHMsIHZhbClcblx0XHRcdFx0aXNzdWMgPSB0aGlzLnNldHZhbChKU09OLnN0cmluZ2lmeShvYmplZHZhbCksIG9iamtleSlcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc3Qgb2JqZWR2YWwgPSB7fVxuXHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQob2JqZWR2YWwsIHBhdGhzLCB2YWwpXG5cdFx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwoSlNPTi5zdHJpbmdpZnkob2JqZWR2YWwpLCBvYmprZXkpXG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwodmFsLCBrZXkpXG5cdFx0fVxuXHRcdHJldHVybiBpc3N1Y1xuXHR9XG5cblx0Z2V0dmFsKGtleSkge1xuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdHJldHVybiAkcGVyc2lzdGVudFN0b3JlLnJlYWQoa2V5KVxuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0cmV0dXJuICRwcmVmcy52YWx1ZUZvcktleShrZXkpXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5sb2FkZGF0YSgpXG5cdFx0XHRcdHJldHVybiB0aGlzLmRhdGFba2V5XVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2tleV0pIHx8IG51bGxcblx0XHR9XG5cdH1cblxuXHRzZXR2YWwodmFsLCBrZXkpIHtcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRyZXR1cm4gJHBlcnNpc3RlbnRTdG9yZS53cml0ZSh2YWwsIGtleSlcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJldHVybiAkcHJlZnMuc2V0VmFsdWVGb3JLZXkodmFsLCBrZXkpXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5sb2FkZGF0YSgpXG5cdFx0XHRcdHRoaXMuZGF0YVtrZXldID0gdmFsXG5cdFx0XHRcdHRoaXMud3JpdGVkYXRhKClcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtrZXldKSB8fCBudWxsXG5cdFx0fVxuXHR9XG5cblx0aW5pdEdvdEVudihvcHRzKSB7XG5cdFx0dGhpcy5nb3QgPSB0aGlzLmdvdCA/IHRoaXMuZ290IDogcmVxdWlyZSgnZ290Jylcblx0XHR0aGlzLmNrdG91Z2ggPSB0aGlzLmNrdG91Z2ggPyB0aGlzLmNrdG91Z2ggOiByZXF1aXJlKCd0b3VnaC1jb29raWUnKVxuXHRcdHRoaXMuY2tqYXIgPSB0aGlzLmNramFyID8gdGhpcy5ja2phciA6IG5ldyB0aGlzLmNrdG91Z2guQ29va2llSmFyKClcblx0XHRpZiAob3B0cykge1xuXHRcdFx0b3B0cy5oZWFkZXJzID0gb3B0cy5oZWFkZXJzID8gb3B0cy5oZWFkZXJzIDoge31cblx0XHRcdGlmICh1bmRlZmluZWQgPT09IG9wdHMuaGVhZGVycy5Db29raWUgJiYgdW5kZWZpbmVkID09PSBvcHRzLmNvb2tpZUphcikge1xuXHRcdFx0XHRvcHRzLmNvb2tpZUphciA9IHRoaXMuY2tqYXJcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQocmVxdWVzdCwgY2FsbGJhY2sgPSAoKSA9PiB7IH0pIHtcblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydDb250ZW50LUxlbmd0aCddXG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnY29udGVudC1sZW5ndGgnXVxuXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh0aGlzLmlzU3VyZ2UoKSAmJiB0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ2hlYWRlcnMuWC1TdXJnZS1Ta2lwLVNjcmlwdGluZycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRodHRwQ2xpZW50LmdldChyZXF1ZXN0LCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFlcnJvciAmJiByZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UuYm9keSA9IGJvZHlcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhbGxiYWNrKGVycm9yLCByZXNwb25zZSwgYm9keSlcblx0XHRcdFx0fSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdGlmICh0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ29wdHMuaGludHMnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkdGFzay5mZXRjaChyZXF1ZXN0KS50aGVuKFxuXHRcdFx0XHRcdChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnMsXG5cdFx0XHRcdFx0XHRcdGJvZHksXG5cdFx0XHRcdFx0XHRcdGJvZHlCeXRlc1xuXHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0eyBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIGJvZHksIGJvZHlCeXRlcyB9LFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnJvcikgPT4gY2FsbGJhY2soKGVycm9yICYmIGVycm9yLmVycm9yKSB8fCAnVW5kZWZpbmVkRXJyb3InKVxuXHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0bGV0IGljb252ID0gcmVxdWlyZSgnaWNvbnYtbGl0ZScpXG5cdFx0XHRcdHRoaXMuaW5pdEdvdEVudihyZXF1ZXN0KVxuXHRcdFx0XHR0aGlzLmdvdChyZXF1ZXN0KVxuXHRcdFx0XHRcdC5vbigncmVkaXJlY3QnLCAocmVzcG9uc2UsIG5leHRPcHRzKSA9PiB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2sgPSByZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ11cblx0XHRcdFx0XHRcdFx0XHRcdC5tYXAodGhpcy5ja3RvdWdoLkNvb2tpZS5wYXJzZSlcblx0XHRcdFx0XHRcdFx0XHRcdC50b1N0cmluZygpXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmNramFyLnNldENvb2tpZVN5bmMoY2ssIG51bGwpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdG5leHRPcHRzLmNvb2tpZUphciA9IHRoaXMuY2tqYXJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmxvZ0VycihlKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gdGhpcy5ja2phci5zZXRDb29raWVTeW5jKHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXS5tYXAoQ29va2llLnBhcnNlKS50b1N0cmluZygpKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oXG5cdFx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGU6IHN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRcdGhlYWRlcnMsXG5cdFx0XHRcdFx0XHRcdFx0cmF3Qm9keVxuXHRcdFx0XHRcdFx0XHR9ID0gcmVzcG9uc2Vcblx0XHRcdFx0XHRcdFx0Y29uc3QgYm9keSA9IGljb252LmRlY29kZShyYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5LCBib2R5IH0sXG5cdFx0XHRcdFx0XHRcdFx0Ym9keVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0KGVycikgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB7IG1lc3NhZ2U6IGVycm9yLCByZXNwb25zZTogcmVzcG9uc2UgfSA9IGVyclxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0XHRlcnJvcixcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSxcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSAmJiBpY29udi5kZWNvZGUocmVzcG9uc2UucmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHRwb3N0KHJlcXVlc3QsIGNhbGxiYWNrID0gKCkgPT4geyB9KSB7XG5cdFx0Y29uc3QgbWV0aG9kID0gcmVxdWVzdC5tZXRob2Rcblx0XHRcdD8gcmVxdWVzdC5tZXRob2QudG9Mb2NhbGVMb3dlckNhc2UoKVxuXHRcdFx0OiAncG9zdCdcblxuXHRcdC8vIOWmguaenOaMh+WumuS6huivt+axguS9kywg5L2G5rKh5oyH5a6aIGBDb250ZW50LVR5cGVg44CBYGNvbnRlbnQtdHlwZWAsIOWImeiHquWKqOeUn+aIkOOAglxuXHRcdGlmIChcblx0XHRcdHJlcXVlc3QuYm9keSAmJlxuXHRcdFx0cmVxdWVzdC5oZWFkZXJzICYmXG5cdFx0XHQhcmVxdWVzdC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSAmJlxuXHRcdFx0IXJlcXVlc3QuaGVhZGVyc1snY29udGVudC10eXBlJ11cblx0XHQpIHtcblx0XHRcdC8vIEhUVFAvMeOAgUhUVFAvMiDpg73mlK/mjIHlsI/lhpkgaGVhZGVyc1xuXHRcdFx0cmVxdWVzdC5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG5cdFx0fVxuXHRcdC8vIOS4uumBv+WFjeaMh+WumumUmeivryBgY29udGVudC1sZW5ndGhgIOi/memHjOWIoOmZpOivpeWxnuaAp++8jOeUseW3peWFt+erryAoSHR0cENsaWVudCkg6LSf6LSj6YeN5paw6K6h566X5bm26LWL5YC8XG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnQ29udGVudC1MZW5ndGgnXVxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ2NvbnRlbnQtbGVuZ3RoJ11cblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKHRoaXMuaXNTdXJnZSgpICYmIHRoaXMuaXNOZWVkUmV3cml0ZSkge1xuXHRcdFx0XHRcdHRoaXMubG9kYXNoX3NldChyZXF1ZXN0LCAnaGVhZGVycy5YLVN1cmdlLVNraXAtU2NyaXB0aW5nJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JGh0dHBDbGllbnRbbWV0aG9kXShyZXF1ZXN0LCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFlcnJvciAmJiByZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UuYm9keSA9IGJvZHlcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhbGxiYWNrKGVycm9yLCByZXNwb25zZSwgYm9keSlcblx0XHRcdFx0fSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJlcXVlc3QubWV0aG9kID0gbWV0aG9kXG5cdFx0XHRcdGlmICh0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ29wdHMuaGludHMnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkdGFzay5mZXRjaChyZXF1ZXN0KS50aGVuKFxuXHRcdFx0XHRcdChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnMsXG5cdFx0XHRcdFx0XHRcdGJvZHksXG5cdFx0XHRcdFx0XHRcdGJvZHlCeXRlc1xuXHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0eyBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIGJvZHksIGJvZHlCeXRlcyB9LFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnJvcikgPT4gY2FsbGJhY2soKGVycm9yICYmIGVycm9yLmVycm9yKSB8fCAnVW5kZWZpbmVkRXJyb3InKVxuXHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0bGV0IGljb252ID0gcmVxdWlyZSgnaWNvbnYtbGl0ZScpXG5cdFx0XHRcdHRoaXMuaW5pdEdvdEVudihyZXF1ZXN0KVxuXHRcdFx0XHRjb25zdCB7IHVybCwgLi4uX3JlcXVlc3QgfSA9IHJlcXVlc3Rcblx0XHRcdFx0dGhpcy5nb3RbbWV0aG9kXSh1cmwsIF9yZXF1ZXN0KS50aGVuKFxuXHRcdFx0XHRcdChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBzdGF0dXNDb2RlOiBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIHJhd0JvZHkgfSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRjb25zdCBib2R5ID0gaWNvbnYuZGVjb2RlKHJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0eyBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIHJhd0JvZHksIGJvZHkgfSxcblx0XHRcdFx0XHRcdFx0Ym9keVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGVycikgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBtZXNzYWdlOiBlcnJvciwgcmVzcG9uc2U6IHJlc3BvbnNlIH0gPSBlcnJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRlcnJvcixcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlICYmIGljb252LmRlY29kZShyZXNwb25zZS5yYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXHQvKipcblx0ICpcblx0ICog56S65L6LOiQudGltZSgneXl5eS1NTS1kZCBxcSBISDptbTpzcy5TJylcblx0ICogICAgOiQudGltZSgneXl5eU1NZGRISG1tc3NTJylcblx0ICogICAgeTrlubQgTTrmnIggZDrml6UgcTrlraMgSDrml7YgbTrliIYgczrnp5IgUzrmr6vnp5Jcblx0ICogICAg5YW25LiteeWPr+mAiTAtNOS9jeWNoOS9jeespuOAgVPlj6/pgIkwLTHkvY3ljaDkvY3nrKbvvIzlhbbkvZnlj6/pgIkwLTLkvY3ljaDkvY3nrKZcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdCDmoLzlvI/ljJblj4LmlbBcblx0ICogQHBhcmFtIHtudW1iZXJ9IHRzIOWPr+mAiTog5qC55o2u5oyH5a6a5pe26Ze05oiz6L+U5Zue5qC85byP5YyW5pel5pyfXG5cdCAqXG5cdCAqL1xuXHR0aW1lKGZvcm1hdCwgdHMgPSBudWxsKSB7XG5cdFx0Y29uc3QgZGF0ZSA9IHRzID8gbmV3IERhdGUodHMpIDogbmV3IERhdGUoKVxuXHRcdGxldCBvID0ge1xuXHRcdFx0J00rJzogZGF0ZS5nZXRNb250aCgpICsgMSxcblx0XHRcdCdkKyc6IGRhdGUuZ2V0RGF0ZSgpLFxuXHRcdFx0J0grJzogZGF0ZS5nZXRIb3VycygpLFxuXHRcdFx0J20rJzogZGF0ZS5nZXRNaW51dGVzKCksXG5cdFx0XHQncysnOiBkYXRlLmdldFNlY29uZHMoKSxcblx0XHRcdCdxKyc6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksXG5cdFx0XHQnUyc6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcblx0XHR9XG5cdFx0aWYgKC8oeSspLy50ZXN0KGZvcm1hdCkpXG5cdFx0XHRmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcblx0XHRcdFx0UmVnRXhwLiQxLFxuXHRcdFx0XHQoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aClcblx0XHRcdClcblx0XHRmb3IgKGxldCBrIGluIG8pXG5cdFx0XHRpZiAobmV3IFJlZ0V4cCgnKCcgKyBrICsgJyknKS50ZXN0KGZvcm1hdCkpXG5cdFx0XHRcdGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFxuXHRcdFx0XHRcdFJlZ0V4cC4kMSxcblx0XHRcdFx0XHRSZWdFeHAuJDEubGVuZ3RoID09IDFcblx0XHRcdFx0XHRcdD8gb1trXVxuXHRcdFx0XHRcdFx0OiAoJzAwJyArIG9ba10pLnN1YnN0cigoJycgKyBvW2tdKS5sZW5ndGgpXG5cdFx0XHRcdClcblx0XHRyZXR1cm4gZm9ybWF0XG5cdH1cblxuXHQvKipcblx0ICog57O757uf6YCa55+lXG5cdCAqXG5cdCAqID4g6YCa55+l5Y+C5pWwOiDlkIzml7bmlK/mjIEgUXVhblgg5ZKMIExvb24g5Lik56eN5qC85byPLCBFbnZKc+agueaNrui/kOihjOeOr+Wig+iHquWKqOi9rOaNoiwgU3VyZ2Ug546v5aKD5LiN5pSv5oyB5aSa5aqS5L2T6YCa55+lXG5cdCAqXG5cdCAqIOekuuS+izpcblx0ICogJC5tc2codGl0bGUsIHN1YnQsIGRlc2MsICd0d2l0dGVyOi8vJylcblx0ICogJC5tc2codGl0bGUsIHN1YnQsIGRlc2MsIHsgJ29wZW4tdXJsJzogJ3R3aXR0ZXI6Ly8nLCAnbWVkaWEtdXJsJzogJ2h0dHBzOi8vZ2l0aHViLmdpdGh1YmFzc2V0cy5jb20vaW1hZ2VzL21vZHVsZXMvb3Blbl9ncmFwaC9naXRodWItbWFyay5wbmcnIH0pXG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCB7ICdvcGVuLXVybCc6ICdodHRwczovL2JpbmcuY29tJywgJ21lZGlhLXVybCc6ICdodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9tb2R1bGVzL29wZW5fZ3JhcGgvZ2l0aHViLW1hcmsucG5nJyB9KVxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHRpdGxlIOagh+mimFxuXHQgKiBAcGFyYW0geyp9IHN1YnQg5Ymv5qCH6aKYXG5cdCAqIEBwYXJhbSB7Kn0gZGVzYyDpgJrnn6Xor6bmg4Vcblx0ICogQHBhcmFtIHsqfSBvcHRzIOmAmuefpeWPguaVsFxuXHQgKlxuXHQgKi9cblx0bXNnKHRpdGxlID0gbmFtZSwgc3VidCA9ICcnLCBkZXNjID0gJycsIG9wdHMpIHtcblx0XHRjb25zdCB0b0Vudk9wdHMgPSAocmF3b3B0cykgPT4ge1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgcmF3b3B0cykge1xuXHRcdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0XHRyZXR1cm4gcmF3b3B0c1xuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRcdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRcdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyB1cmw6IHJhd29wdHMgfVxuXHRcdFx0XHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRcdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmF3b3B0c1xuXHRcdFx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgJ29wZW4tdXJsJzogcmF3b3B0cyB9XG5cdFx0XHRcdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0bGV0IG9wZW5VcmwgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHMudXJsIHx8IHJhd29wdHMub3BlblVybCB8fCByYXdvcHRzWydvcGVuLXVybCddXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7IHVybDogb3BlblVybCB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlICdMb29uJzoge1xuXHRcdFx0XHRcdFx0XHRsZXQgb3BlblVybCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0cy5vcGVuVXJsIHx8IHJhd29wdHMudXJsIHx8IHJhd29wdHNbJ29wZW4tdXJsJ11cblx0XHRcdFx0XHRcdFx0bGV0IG1lZGlhVXJsID0gcmF3b3B0cy5tZWRpYVVybCB8fCByYXdvcHRzWydtZWRpYS11cmwnXVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyBvcGVuVXJsLCBtZWRpYVVybCB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOiB7XG5cdFx0XHRcdFx0XHRcdGxldCBvcGVuVXJsID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzWydvcGVuLXVybCddIHx8IHJhd29wdHMudXJsIHx8IHJhd29wdHMub3BlblVybFxuXHRcdFx0XHRcdFx0XHRsZXQgbWVkaWFVcmwgPSByYXdvcHRzWydtZWRpYS11cmwnXSB8fCByYXdvcHRzLm1lZGlhVXJsXG5cdFx0XHRcdFx0XHRcdGxldCB1cGRhdGVQYXN0ZWJvYXJkID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzWyd1cGRhdGUtcGFzdGVib2FyZCddIHx8IHJhd29wdHMudXBkYXRlUGFzdGVib2FyZFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdCdvcGVuLXVybCc6IG9wZW5VcmwsXG5cdFx0XHRcdFx0XHRcdFx0J21lZGlhLXVybCc6IG1lZGlhVXJsLFxuXHRcdFx0XHRcdFx0XHRcdCd1cGRhdGUtcGFzdGVib2FyZCc6IHVwZGF0ZVBhc3RlYm9hcmRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIXRoaXMuaXNNdXRlKSB7XG5cdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0JG5vdGlmaWNhdGlvbi5wb3N0KHRpdGxlLCBzdWJ0LCBkZXNjLCB0b0Vudk9wdHMob3B0cykpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0XHQkbm90aWZ5KHRpdGxlLCBzdWJ0LCBkZXNjLCB0b0Vudk9wdHMob3B0cykpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlzTXV0ZUxvZykge1xuXHRcdFx0bGV0IGxvZ3MgPSBbJycsICc9PT09PT09PT09PT09PfCfk6Pns7vnu5/pgJrnn6Xwn5OjPT09PT09PT09PT09PT0nXVxuXHRcdFx0bG9ncy5wdXNoKHRpdGxlKVxuXHRcdFx0c3VidCA/IGxvZ3MucHVzaChzdWJ0KSA6ICcnXG5cdFx0XHRkZXNjID8gbG9ncy5wdXNoKGRlc2MpIDogJydcblx0XHRcdGNvbnNvbGUubG9nKGxvZ3Muam9pbignXFxuJykpXG5cdFx0XHR0aGlzLmxvZ3MgPSB0aGlzLmxvZ3MuY29uY2F0KGxvZ3MpXG5cdFx0fVxuXHR9XG5cblx0bG9nKC4uLmxvZ3MpIHtcblx0XHRpZiAobG9ncy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmxvZ3MgPSBbLi4udGhpcy5sb2dzLCAuLi5sb2dzXVxuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhsb2dzLmpvaW4odGhpcy5sb2dTZXBhcmF0b3IpKVxuXHR9XG5cblx0bG9nRXJyKGVycm9yKSB7XG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aGlzLmxvZygnJywgYOKdl++4jyAke3RoaXMubmFtZX0sIOmUmeivryFgLCBlcnJvcilcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHR0aGlzLmxvZygnJywgYOKdl++4jyR7dGhpcy5uYW1lfSwg6ZSZ6K+vIWAsIGVycm9yLnN0YWNrKVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdHdhaXQodGltZSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKSlcblx0fVxuXG5cdGRvbmUodmFsID0ge30pIHtcblx0XHRjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblx0XHRjb25zdCBjb3N0VGltZSA9IChlbmRUaW1lIC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMFxuXHRcdHRoaXMubG9nKCcnLCBg8J+aqSAke3RoaXMubmFtZX0sIOe7k+adnyEg8J+VmyAke2Nvc3RUaW1lfSDnp5JgKVxuXHRcdHRoaXMubG9nKClcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdCRkb25lKHZhbClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRwcm9jZXNzLmV4aXQoMSlcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc1xuXHQgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vVmlyZ2lsQ2x5bmUvR2V0U29tZUZyaWVzL2Jsb2IvbWFpbi9mdW5jdGlvbi9nZXRFTlYvZ2V0RU5WLmpzXG5cdCAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIFBlcnNpc3RlbnQgU3RvcmUgS2V5XG5cdCAqIEBwYXJhbSB7QXJyYXl9IG5hbWVzIC0gUGxhdGZvcm0gTmFtZXNcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGFiYXNlIC0gRGVmYXVsdCBEYXRhYmFzZVxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9XG5cdCAqL1xuXHRnZXRFTlYoa2V5LCBuYW1lcywgZGF0YWJhc2UpIHtcblx0XHQvL3RoaXMubG9nKGDimJHvuI8gJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgXCJcIik7XG5cdFx0LyoqKioqKioqKioqKioqKioqIEJveEpzICoqKioqKioqKioqKioqKioqL1xuXHRcdC8vIOWMheijheS4uuWxgOmDqOWPmOmHj++8jOeUqOWujOmHiuaUvuWGheWtmFxuXHRcdC8vIEJveEpz55qE5riF56m65pON5L2c6L+U5Zue5YGH5YC856m65a2X56ym5LiyLCDpgLvovpHmiJbmk43kvZznrKbkvJrlnKjlt6bkvqfmk43kvZzmlbDkuLrlgYflgLzml7bov5Tlm57lj7Pkvqfmk43kvZzmlbDjgIJcblx0XHRsZXQgQm94SnMgPSB0aGlzLmdldGpzb24oa2V5LCBkYXRhYmFzZSk7XG5cdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgQm94SnPnsbvlnos6ICR7dHlwZW9mIEJveEpzfWAsIGBCb3hKc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShCb3hKcyl9YCwgXCJcIik7XG5cdFx0LyoqKioqKioqKioqKioqKioqIEFyZ3VtZW50ICoqKioqKioqKioqKioqKioqL1xuXHRcdGxldCBBcmd1bWVudCA9IHt9O1xuXHRcdGlmICh0eXBlb2YgJGFyZ3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRpZiAoQm9vbGVhbigkYXJndW1lbnQpKSB7XG5cdFx0XHRcdC8vdGhpcy5sb2coYPCfjokgJHt0aGlzLm5hbWV9LCAkQXJndW1lbnRgKTtcblx0XHRcdFx0bGV0IGFyZyA9IE9iamVjdC5mcm9tRW50cmllcygkYXJndW1lbnQuc3BsaXQoXCImXCIpLm1hcCgoaXRlbSkgPT4gaXRlbS5zcGxpdChcIj1cIikubWFwKGkgPT4gaS5yZXBsYWNlKC9cXFwiL2csICcnKSkpKTtcblx0XHRcdFx0Ly90aGlzLmxvZyhKU09OLnN0cmluZ2lmeShhcmcpKTtcblx0XHRcdFx0Zm9yIChsZXQgaXRlbSBpbiBhcmcpIHRoaXMuc2V0UGF0aChBcmd1bWVudCwgaXRlbSwgYXJnW2l0ZW1dKTtcblx0XHRcdFx0Ly90aGlzLmxvZyhKU09OLnN0cmluZ2lmeShBcmd1bWVudCkpO1xuXHRcdFx0fTtcblx0XHRcdC8vdGhpcy5sb2coYOKchSAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgQXJndW1lbnTnsbvlnos6ICR7dHlwZW9mIEFyZ3VtZW50fWAsIGBBcmd1bWVudOWGheWuuTogJHtKU09OLnN0cmluZ2lmeShBcmd1bWVudCl9YCwgXCJcIik7XG5cdFx0fTtcblx0XHQvKioqKioqKioqKioqKioqKiogU3RvcmUgKioqKioqKioqKioqKioqKiovXG5cdFx0Y29uc3QgU3RvcmUgPSB7IFNldHRpbmdzOiBkYXRhYmFzZT8uRGVmYXVsdD8uU2V0dGluZ3MgfHwge30sIENvbmZpZ3M6IGRhdGFiYXNlPy5EZWZhdWx0Py5Db25maWdzIHx8IHt9LCBDYWNoZXM6IHt9IH07XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KG5hbWVzKSkgbmFtZXMgPSBbbmFtZXNdO1xuXHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYG5hbWVz57G75Z6LOiAke3R5cGVvZiBuYW1lc31gLCBgbmFtZXPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkobmFtZXMpfWAsIFwiXCIpO1xuXHRcdGZvciAobGV0IG5hbWUgb2YgbmFtZXMpIHtcblx0XHRcdFN0b3JlLlNldHRpbmdzID0geyAuLi5TdG9yZS5TZXR0aW5ncywgLi4uZGF0YWJhc2U/LltuYW1lXT8uU2V0dGluZ3MsIC4uLkFyZ3VtZW50LCAuLi5Cb3hKcz8uW25hbWVdPy5TZXR0aW5ncyB9O1xuXHRcdFx0U3RvcmUuQ29uZmlncyA9IHsgLi4uU3RvcmUuQ29uZmlncywgLi4uZGF0YWJhc2U/LltuYW1lXT8uQ29uZmlncyB9O1xuXHRcdFx0aWYgKEJveEpzPy5bbmFtZV0/LkNhY2hlcyAmJiB0eXBlb2YgQm94SnM/LltuYW1lXT8uQ2FjaGVzID09PSBcInN0cmluZ1wiKSBCb3hKc1tuYW1lXS5DYWNoZXMgPSBKU09OLnBhcnNlKEJveEpzPy5bbmFtZV0/LkNhY2hlcyk7XG5cdFx0XHRTdG9yZS5DYWNoZXMgPSB7IC4uLlN0b3JlLkNhY2hlcywgLi4uQm94SnM/LltuYW1lXT8uQ2FjaGVzIH07XG5cdFx0fTtcblx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTdG9yZS5TZXR0aW5nc+exu+WeizogJHt0eXBlb2YgU3RvcmUuU2V0dGluZ3N9YCwgYFN0b3JlLlNldHRpbmdzOiAke0pTT04uc3RyaW5naWZ5KFN0b3JlLlNldHRpbmdzKX1gLCBcIlwiKTtcblx0XHR0aGlzLnRyYXZlcnNlT2JqZWN0KFN0b3JlLlNldHRpbmdzLCAoa2V5LCB2YWx1ZSkgPT4ge1xuXHRcdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIHRyYXZlcnNlT2JqZWN0YCwgYCR7a2V5fTogJHt0eXBlb2YgdmFsdWV9YCwgYCR7a2V5fTogJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCwgXCJcIik7XG5cdFx0XHRpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09PSBcImZhbHNlXCIpIHZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7IC8vIOWtl+espuS4sui9rEJvb2xlYW5cblx0XHRcdGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAodmFsdWUuaW5jbHVkZXMoXCIsXCIpKSB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiLFwiKS5tYXAoaXRlbSA9PiB0aGlzLnN0cmluZzJudW1iZXIoaXRlbSkpOyAvLyDlrZfnrKbkuLLovazmlbDnu4TovazmlbDlrZdcblx0XHRcdFx0ZWxzZSB2YWx1ZSA9IHRoaXMuc3RyaW5nMm51bWJlcih2YWx1ZSk7IC8vIOWtl+espuS4sui9rOaVsOWtl1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9KTtcblx0XHQvL3RoaXMubG9nKGDinIUgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYFN0b3JlOiAke3R5cGVvZiBTdG9yZS5DYWNoZXN9YCwgYFN0b3Jl5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KFN0b3JlKX1gLCBcIlwiKTtcblx0XHRyZXR1cm4gU3RvcmU7XG5cdH07XG5cblx0LyoqKioqKioqKioqKioqKioqIGZ1bmN0aW9uICoqKioqKioqKioqKioqKioqL1xuXHRzZXRQYXRoKG9iamVjdCwgcGF0aCwgdmFsdWUpIHsgcGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChvLCBwLCBpKSA9PiBvW3BdID0gcGF0aC5zcGxpdChcIi5cIikubGVuZ3RoID09PSArK2kgPyB2YWx1ZSA6IG9bcF0gfHwge30sIG9iamVjdCkgfVxuXHR0cmF2ZXJzZU9iamVjdChvLCBjKSB7IGZvciAodmFyIHQgaW4gbykgeyB2YXIgbiA9IG9bdF07IG9bdF0gPSBcIm9iamVjdFwiID09IHR5cGVvZiBuICYmIG51bGwgIT09IG4gPyB0aGlzLnRyYXZlcnNlT2JqZWN0KG4sIGMpIDogYyh0LCBuKSB9IHJldHVybiBvIH1cblx0c3RyaW5nMm51bWJlcihzdHJpbmcpIHsgaWYgKHN0cmluZyAmJiAhaXNOYU4oc3RyaW5nKSkgc3RyaW5nID0gcGFyc2VJbnQoc3RyaW5nLCAxMCk7IHJldHVybiBzdHJpbmcgfVxufVxuXG5leHBvcnQgY2xhc3MgSHR0cCB7XG5cdGNvbnN0cnVjdG9yKGVudikge1xuXHRcdHRoaXMuZW52ID0gZW52XG5cdH1cblxuXHRzZW5kKG9wdHMsIG1ldGhvZCA9ICdHRVQnKSB7XG5cdFx0b3B0cyA9IHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJyA/IHsgdXJsOiBvcHRzIH0gOiBvcHRzXG5cdFx0bGV0IHNlbmRlciA9IHRoaXMuZ2V0XG5cdFx0aWYgKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG5cdFx0XHRzZW5kZXIgPSB0aGlzLnBvc3Rcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHNlbmRlci5jYWxsKHRoaXMsIG9wdHMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSByZWplY3QoZXJyb3IpXG5cdFx0XHRcdGVsc2UgcmVzb2x2ZShyZXNwb25zZSlcblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdGdldChvcHRzKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2VuZC5jYWxsKHRoaXMuZW52LCBvcHRzKVxuXHR9XG5cblx0cG9zdChvcHRzKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2VuZC5jYWxsKHRoaXMuZW52LCBvcHRzLCAnUE9TVCcpXG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVSSSB7XG5cdGNvbnN0cnVjdG9yKG9wdHMgPSBbXSkge1xuXHRcdHRoaXMubmFtZSA9IFwiVVJJIHYxLjIuNlwiO1xuXHRcdHRoaXMub3B0cyA9IG9wdHM7XG5cdFx0dGhpcy5qc29uID0geyBzY2hlbWU6IFwiXCIsIGhvc3Q6IFwiXCIsIHBhdGg6IFwiXCIsIHF1ZXJ5OiB7fSB9O1xuXHR9O1xuXG5cdHBhcnNlKHVybCkge1xuXHRcdGNvbnN0IFVSTFJlZ2V4ID0gLyg/Oig/PHNjaGVtZT4uKyk6XFwvXFwvKD88aG9zdD5bXi9dKykpP1xcLz8oPzxwYXRoPlteP10rKT9cXD8/KD88cXVlcnk+W14/XSspPy87XG5cdFx0bGV0IGpzb24gPSB1cmwubWF0Y2goVVJMUmVnZXgpPy5ncm91cHMgPz8gbnVsbDtcblx0XHRpZiAoanNvbj8ucGF0aCkganNvbi5wYXRocyA9IGpzb24ucGF0aC5zcGxpdChcIi9cIik7IGVsc2UganNvbi5wYXRoID0gXCJcIjtcblx0XHQvL2lmIChqc29uPy5wYXRocz8uYXQoLTEpPy5pbmNsdWRlcyhcIi5cIikpIGpzb24uZm9ybWF0ID0ganNvbi5wYXRocy5hdCgtMSkuc3BsaXQoXCIuXCIpLmF0KC0xKTtcblx0XHRpZiAoanNvbj8ucGF0aHMpIHtcblx0XHRcdGNvbnN0IGZpbGVOYW1lID0ganNvbi5wYXRoc1tqc29uLnBhdGhzLmxlbmd0aCAtIDFdO1xuXHRcdFx0aWYgKGZpbGVOYW1lPy5pbmNsdWRlcyhcIi5cIikpIHtcblx0XHRcdFx0Y29uc3QgbGlzdCA9IGZpbGVOYW1lLnNwbGl0KFwiLlwiKTtcblx0XHRcdFx0anNvbi5mb3JtYXQgPSBsaXN0W2xpc3QubGVuZ3RoIC0gMV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChqc29uPy5xdWVyeSkganNvbi5xdWVyeSA9IE9iamVjdC5mcm9tRW50cmllcyhqc29uLnF1ZXJ5LnNwbGl0KFwiJlwiKS5tYXAoKHBhcmFtKSA9PiBwYXJhbS5zcGxpdChcIj1cIikpKTtcblx0XHRyZXR1cm4ganNvblxuXHR9O1xuXG5cdHN0cmluZ2lmeShqc29uID0gdGhpcy5qc29uKSB7XG5cdFx0bGV0IHVybCA9IFwiXCI7XG5cdFx0aWYgKGpzb24/LnNjaGVtZSAmJiBqc29uPy5ob3N0KSB1cmwgKz0ganNvbi5zY2hlbWUgKyBcIjovL1wiICsganNvbi5ob3N0O1xuXHRcdGlmIChqc29uPy5wYXRoKSB1cmwgKz0gKGpzb24/Lmhvc3QpID8gXCIvXCIgKyBqc29uLnBhdGggOiBqc29uLnBhdGg7XG5cdFx0aWYgKGpzb24/LnF1ZXJ5KSB1cmwgKz0gXCI/XCIgKyBPYmplY3QuZW50cmllcyhqc29uLnF1ZXJ5KS5tYXAocGFyYW0gPT4gcGFyYW0uam9pbihcIj1cIikpLmpvaW4oXCImXCIpO1xuXHRcdHJldHVybiB1cmxcblx0fTtcbn1cbiIsIi8vIHJlZmVyOiBodHRwczovL3d3dy53My5vcmcvVFIvd2VidnR0MS9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlZUVCB7XG5cdGNvbnN0cnVjdG9yKG9wdHMgPSBbXCJtaWxsaXNlY29uZHNcIiwgXCJ0aW1lU3RhbXBcIiwgXCJzaW5nbGVMaW5lXCIsIFwiXFxuXCJdKSB7XG5cdFx0dGhpcy5uYW1lID0gXCJXZWJWVFQgdjIuMS40XCI7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblx0XHR0aGlzLmxpbmVCcmVhayA9ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJcXG5cIikpID8gXCJcXG5cIiA6ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJcXHJcIikpID8gXCJcXHJcIiA6ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJcXHJcXG5cIikpID8gXCJcXHJcXG5cIiA6IFwiXFxuXCI7XG5cdFx0dGhpcy52dHQgPSBuZXcgU3RyaW5nO1xuXHRcdHRoaXMuanNvbiA9IHsgaGVhZGVyczoge30sIGNvbW1lbnRzOiBbXSwgc3R5bGU6IFwiXCIsIGJvZHk6IFtdIH07XG5cdH07XG5cblx0cGFyc2UodnR0ID0gdGhpcy52dHQpIHtcblx0XHRjb25zdCBXZWJWVFRfY3VlX1JlZ2V4ID0gKHRoaXMub3B0cy5pbmNsdWRlcyhcIm1pbGxpc2Vjb25kc1wiKSkgPyAvXigoPzxpbmRleD5cXGQrKShcXHJcXG58XFxyfFxcbikpPyg/PHRpbWluZz4oPzxzdGFydFRpbWU+WzAtOTouLF0rKSAtLT4gKD88ZW5kVGltZT5bMC05Oi4sXSspKSA/KD88c2V0dGluZ3M+LispP1teXSg/PHRleHQ+W1xcc1xcU10qKT8kL1xuXHRcdFx0OiAvXigoPzxpbmRleD5cXGQrKShcXHJcXG58XFxyfFxcbikpPyg/PHRpbWluZz4oPzxzdGFydFRpbWU+WzAtOTpdKylbMC05LixdKyAtLT4gKD88ZW5kVGltZT5bMC05Ol0rKVswLTkuLF0rKSA/KD88c2V0dGluZ3M+LispP1teXSg/PHRleHQ+W1xcc1xcU10qKT8kL1xuXHRcdGNvbnN0IEFycmF5ID0gdnR0LnNwbGl0KC9cXHJcXG5cXHJcXG58XFxyXFxyfFxcblxcbi8pO1xuXHRcdGNvbnN0IEpzb24gPSB7IGhlYWRlcnM6IHt9LCBjb21tZW50czogW10sIHN0eWxlOiBcIlwiLCBib2R5OiBbXSB9O1xuXG5cdFx0QXJyYXkuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGl0ZW0gPSBpdGVtLnRyaW0oKTtcblx0XHRcdHN3aXRjaCAoaXRlbS5zdWJzdHJpbmcoMCwgNSkudHJpbSgpKSB7XG5cdFx0XHRcdGNhc2UgXCJXRUJWVFwiOiB7XG5cdFx0XHRcdFx0bGV0IGN1ZXMgPSBpdGVtLnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pO1xuXHRcdFx0XHRcdEpzb24uaGVhZGVycy50eXBlID0gY3Vlcy5zaGlmdCgpO1xuXHRcdFx0XHRcdEpzb24uaGVhZGVycy5vcHRpb25zID0gY3Vlcztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2FzZSBcIk5PVEVcIjoge1xuXHRcdFx0XHRcdEpzb24uY29tbWVudHMucHVzaChpdGVtKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2FzZSBcIlNUWUxFXCI6IHtcblx0XHRcdFx0XHRsZXQgY3VlcyA9IGl0ZW0uc3BsaXQoL1xcclxcbnxcXHJ8XFxuLyk7XG5cdFx0XHRcdFx0Y3Vlcy5zaGlmdCgpO1xuXHRcdFx0XHRcdEpzb24uc3R5bGUgPSBjdWVzLmpvaW4odGhpcy5saW5lQnJlYWspO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGxldCBjdWUgPSBpdGVtLm1hdGNoKFdlYlZUVF9jdWVfUmVnZXgpPy5ncm91cHM7XG5cdFx0XHRcdFx0aWYgKGN1ZSkge1xuXHRcdFx0XHRcdFx0aWYgKEpzb24uaGVhZGVycz8udHlwZSAhPT0gXCJXRUJWVFRcIikge1xuXHRcdFx0XHRcdFx0XHRjdWUudGltaW5nID0gY3VlPy50aW1pbmc/LnJlcGxhY2U/LihcIixcIiwgXCIuXCIpO1xuXHRcdFx0XHRcdFx0XHRjdWUuc3RhcnRUaW1lID0gY3VlPy5zdGFydFRpbWU/LnJlcGxhY2U/LihcIixcIiwgXCIuXCIpO1xuXHRcdFx0XHRcdFx0XHRjdWUuZW5kVGltZSA9IGN1ZT8uZW5kVGltZT8ucmVwbGFjZT8uKFwiLFwiLCBcIi5cIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRzLmluY2x1ZGVzKFwidGltZVN0YW1wXCIpKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBJU09TdHJpbmcgPSBjdWU/LnN0YXJ0VGltZT8ucmVwbGFjZT8uKC8oLiopLywgXCIxOTcwLTAxLTAxVCQxWlwiKVxuXHRcdFx0XHRcdFx0XHRjdWUudGltZVN0YW1wID0gdGhpcy5vcHRzLmluY2x1ZGVzKFwibWlsbGlzZWNvbmRzXCIpID8gRGF0ZS5wYXJzZShJU09TdHJpbmcpIDogRGF0ZS5wYXJzZShJU09TdHJpbmcpIC8gMTAwMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1ZS50ZXh0ID0gY3VlPy50ZXh0Py50cmltRW5kPy4oKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJzaW5nbGVMaW5lXCIpKSB7XG5cdFx0XHRcdFx0XHRcdGN1ZS50ZXh0ID0gY3VlPy50ZXh0Py5yZXBsYWNlPy4oL1xcclxcbnxcXHJ8XFxuLywgXCIgXCIpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJtdWx0aUxpbmVcIikpIHtcblx0XHRcdFx0XHRcdFx0Y3VlLnRleHQgPSBjdWU/LnRleHQ/LnNwbGl0Py4oL1xcclxcbnxcXHJ8XFxuLyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRKc29uLmJvZHkucHVzaChjdWUpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIEpzb25cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IHRoaXMuanNvbikge1xuXHRcdGxldCB2dHQgPSBbXG5cdFx0XHRqc29uLmhlYWRlcnMgPSBbanNvbi5oZWFkZXJzPy50eXBlIHx8IFwiXCIsIGpzb24uaGVhZGVycz8ub3B0aW9ucyB8fCBcIlwiXS5mbGF0KEluZmluaXR5KS5qb2luKHRoaXMubGluZUJyZWFrKSxcblx0XHRcdGpzb24uY29tbWVudHMgPSBqc29uPy5jb21tZW50cz8uam9pbj8uKHRoaXMubGluZUJyZWFrKSxcblx0XHRcdGpzb24uc3R5bGUgPSAoanNvbj8uc3R5bGU/Lmxlbmd0aCA+IDApID8gW1wiU1RZTEVcIiwganNvbi5zdHlsZV0uam9pbih0aGlzLmxpbmVCcmVhaykgOiBcIlwiLFxuXHRcdFx0anNvbi5ib2R5ID0ganNvbi5ib2R5Lm1hcChpdGVtID0+IHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbS50ZXh0KSkgaXRlbS50ZXh0ID0gaXRlbS50ZXh0LmpvaW4odGhpcy5saW5lQnJlYWspO1xuXHRcdFx0XHRpdGVtID0gYCR7KGl0ZW0uaW5kZXgpID8gaXRlbS5pbmRleCArIHRoaXMubGluZUJyZWFrIDogXCJcIn0ke2l0ZW0udGltaW5nfSAke2l0ZW0/LnNldHRpbmdzID8/IFwiXCJ9JHt0aGlzLmxpbmVCcmVha30ke2l0ZW0udGV4dH1gO1xuXHRcdFx0XHRyZXR1cm4gaXRlbTtcblx0XHRcdH0pLmpvaW4odGhpcy5saW5lQnJlYWsgKyB0aGlzLmxpbmVCcmVhaylcblx0XHRdLmpvaW4odGhpcy5saW5lQnJlYWsgKyB0aGlzLmxpbmVCcmVhaykudHJpbSgpICsgdGhpcy5saW5lQnJlYWsgKyB0aGlzLmxpbmVCcmVhaztcblx0XHRyZXR1cm4gdnR0XG5cdH07XG59O1xuIiwiLy8gcmVmZXI6IGh0dHBzOi8vZ2l0aHViLmNvbS9QZW5nLVlNL1F1YW5YL2Jsb2IvbWFzdGVyL1Rvb2xzL1hNTFBhcnNlci94bWwtcGFyc2VyLmpzXG4vLyByZWZlcjogaHR0cHM6Ly9nb2Vzc25lci5uZXQvZG93bmxvYWQvcHJqL2pzb254bWwvXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYTUwge1xuXHQjQVRUUklCVVRFX0tFWSA9IFwiQFwiO1xuXHQjQ0hJTERfTk9ERV9LRVkgPSBcIiNcIjtcblx0I1VORVNDQVBFID0ge1xuXHRcdFwiJmFtcDtcIjogXCImXCIsXG5cdFx0XCImbHQ7XCI6IFwiPFwiLFxuXHRcdFwiJmd0O1wiOiBcIj5cIixcblx0XHRcIiZhcG9zO1wiOiBcIidcIixcblx0XHRcIiZxdW90O1wiOiAnXCInXG5cdH07XG5cdCNFU0NBUEUgPSB7XG5cdFx0XCImXCI6IFwiJmFtcDtcIixcblx0XHRcIjxcIjogXCImbHQ7XCIsXG5cdFx0XCI+XCI6IFwiJmd0O1wiLFxuXHRcdFwiJ1wiOiBcIiZhcG9zO1wiLFxuXHRcdCdcIic6IFwiJnF1b3Q7XCJcblx0fTtcblxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XG5cdFx0dGhpcy5uYW1lID0gXCJYTUwgdjAuNC4wLTJcIjtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdEJpZ0ludC5wcm90b3R5cGUudG9KU09OID0gKCkgPT4gdGhpcy50b1N0cmluZygpO1xuXHR9O1xuXG5cdHBhcnNlKHhtbCA9IG5ldyBTdHJpbmcsIHJldml2ZXIgPSBcIlwiKSB7XG5cdFx0Y29uc3QgVU5FU0NBUEUgPSB0aGlzLiNVTkVTQ0FQRTtcblx0XHRjb25zdCBBVFRSSUJVVEVfS0VZID0gdGhpcy4jQVRUUklCVVRFX0tFWTtcblx0XHRjb25zdCBDSElMRF9OT0RFX0tFWSA9IHRoaXMuI0NISUxEX05PREVfS0VZO1xuXHRcdGNvbnN0IERPTSA9IHRvRE9NKHhtbCk7XG5cdFx0bGV0IGpzb24gPSBmcm9tWE1MKERPTSwgcmV2aXZlcik7XG5cdFx0cmV0dXJuIGpzb247XG5cblx0XHQvKioqKioqKioqKioqKioqKiogRnVjdGlvbnMgKioqKioqKioqKioqKioqKiovXG5cdFx0ZnVuY3Rpb24gdG9ET00odGV4dCkge1xuXHRcdFx0Y29uc3QgbGlzdCA9IHRleHQucmVwbGFjZSgvXlsgXFx0XSsvZ20sIFwiXCIpXG5cdFx0XHRcdC5zcGxpdCgvPChbXiE8Pj9dKD86J1tcXFNcXHNdKj8nfFwiW1xcU1xcc10qP1wifFteJ1wiPD5dKSp8ISg/Oi0tW1xcU1xcc10qPy0tfFxcW1teXFxbXFxdJ1wiPD5dK1xcW1tcXFNcXHNdKj9dXXxET0NUWVBFW15cXFs8Pl0qP1xcW1tcXFNcXHNdKj9dfCg/OkVOVElUWVteXCI8Pl0qP1wiW1xcU1xcc10qP1wiKT9bXFxTXFxzXSo/KXxcXD9bXFxTXFxzXSo/XFw/KT4vKTtcblx0XHRcdGNvbnN0IGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuXG5cdFx0XHQvLyByb290IGVsZW1lbnRcblx0XHRcdGNvbnN0IHJvb3QgPSB7IGNoaWxkcmVuOiBbXSB9O1xuXHRcdFx0bGV0IGVsZW0gPSByb290O1xuXG5cdFx0XHQvLyBkb20gdHJlZSBzdGFja1xuXHRcdFx0Y29uc3Qgc3RhY2sgPSBbXTtcblxuXHRcdFx0Ly8gcGFyc2Vcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOykge1xuXHRcdFx0XHQvLyB0ZXh0IG5vZGVcblx0XHRcdFx0Y29uc3Qgc3RyID0gbGlzdFtpKytdO1xuXHRcdFx0XHRpZiAoc3RyKSBhcHBlbmRUZXh0KHN0cik7XG5cblx0XHRcdFx0Ly8gY2hpbGQgbm9kZVxuXHRcdFx0XHRjb25zdCB0YWcgPSBsaXN0W2krK107XG5cdFx0XHRcdGlmICh0YWcpIHBhcnNlTm9kZSh0YWcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0XHQvKioqKioqKioqKioqKioqKiogRnVjdGlvbnMgKioqKioqKioqKioqKioqKiovXG5cdFx0XHRmdW5jdGlvbiBwYXJzZU5vZGUodGFnKSB7XG5cdFx0XHRcdGNvbnN0IHRhZ3MgPSB0YWcuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRjb25zdCBuYW1lID0gdGFncy5zaGlmdCgpO1xuXHRcdFx0XHRjb25zdCBsZW5ndGggPSB0YWdzLmxlbmd0aDtcblx0XHRcdFx0bGV0IGNoaWxkID0ge307XG5cdFx0XHRcdHN3aXRjaCAobmFtZVswXSkge1xuXHRcdFx0XHRcdGNhc2UgXCIvXCI6XG5cdFx0XHRcdFx0XHQvLyBjbG9zZSB0YWdcblx0XHRcdFx0XHRcdGNvbnN0IGNsb3NlZCA9IHRhZy5yZXBsYWNlKC9eXFwvfFtcXHNcXC9dLiokL2csIFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRhZ05hbWUgPSBlbGVtPy5uYW1lPy50b0xvd2VyQ2FzZT8uKCk7XG5cdFx0XHRcdFx0XHRcdGVsZW0gPSBzdGFjay5wb3AoKTtcblx0XHRcdFx0XHRcdFx0aWYgKHRhZ05hbWUgPT09IGNsb3NlZCkgYnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiP1wiOlxuXHRcdFx0XHRcdFx0Ly8gWE1MIGRlY2xhcmF0aW9uXG5cdFx0XHRcdFx0XHRjaGlsZC5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdGNoaWxkLnJhdyA9IHRhZ3Muam9pbihcIiBcIik7XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiIVwiOlxuXHRcdFx0XHRcdFx0aWYgKC8hXFxbQ0RBVEFcXFsoLispXFxdXFxdLy50ZXN0KHRhZykpIHtcblx0XHRcdFx0XHRcdFx0Ly8gQ0RBVEEgc2VjdGlvblxuXHRcdFx0XHRcdFx0XHRjaGlsZC5uYW1lID0gXCIhQ0RBVEFcIjtcblx0XHRcdFx0XHRcdFx0Ly9jaGlsZC5yYXcgPSB0YWcuc2xpY2UoOSwgLTIpO1xuXHRcdFx0XHRcdFx0XHRjaGlsZC5yYXcgPSB0YWcubWF0Y2goLyFcXFtDREFUQVxcWyguKylcXF1cXF0vKTtcblx0XHRcdFx0XHRcdFx0Ly9hcHBlbmRUZXh0KHRhZy5zbGljZSg5LCAtMikpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gQ29tbWVudCBzZWN0aW9uXG5cdFx0XHRcdFx0XHRcdGNoaWxkLm5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdFx0XHRjaGlsZC5yYXcgPSB0YWdzLmpvaW4oXCIgXCIpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGFwcGVuZENoaWxkKGNoaWxkKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRjaGlsZCA9IG9wZW5UYWcodGFnKTtcblx0XHRcdFx0XHRcdGFwcGVuZENoaWxkKGNoaWxkKTtcblx0XHRcdFx0XHRcdHN3aXRjaCAoKHRhZ3M/LltsZW5ndGggLSAxXSA/PyBuYW1lKS5zbGljZSgtMSkpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSBcIi9cIjpcblx0XHRcdFx0XHRcdFx0XHQvL2NoaWxkLmhhc0NoaWxkID0gZmFsc2U7IC8vIGVtcHR5VGFnXG5cdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGNoaWxkLmNoaWxkcmVuOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAobmFtZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBcImxpbmtcIjpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9jaGlsZC5oYXNDaGlsZCA9IGZhbHNlOyAvLyBlbXB0eVRhZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgY2hpbGQuY2hpbGRyZW47IC8vIGVtcHR5VGFnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3RhY2sucHVzaChlbGVtKTsgLy8gb3BlblRhZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbGVtID0gY2hpbGQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0ZnVuY3Rpb24gb3BlblRhZyh0YWcpIHtcblx0XHRcdFx0XHRjb25zdCBlbGVtID0geyBjaGlsZHJlbjogW10gfTtcblx0XHRcdFx0XHR0YWcgPSB0YWcucmVwbGFjZSgvXFxzKlxcLz8kLywgXCJcIik7XG5cdFx0XHRcdFx0Y29uc3QgcG9zID0gdGFnLnNlYXJjaCgvW1xccz0nXCJcXC9dLyk7XG5cdFx0XHRcdFx0aWYgKHBvcyA8IDApIHtcblx0XHRcdFx0XHRcdGVsZW0ubmFtZSA9IHRhZztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5uYW1lID0gdGFnLnN1YnN0cigwLCBwb3MpO1xuXHRcdFx0XHRcdFx0ZWxlbS50YWcgPSB0YWcuc3Vic3RyKHBvcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBlbGVtO1xuXHRcdFx0XHR9O1xuXHRcdFx0fTtcblxuXHRcdFx0ZnVuY3Rpb24gYXBwZW5kVGV4dChzdHIpIHtcblx0XHRcdFx0Ly9zdHIgPSByZW1vdmVTcGFjZXMoc3RyKTtcblx0XHRcdFx0c3RyID0gcmVtb3ZlQnJlYWtMaW5lKHN0cik7XG5cdFx0XHRcdC8vc3RyID0gc3RyPy50cmltPy4oKTtcblx0XHRcdFx0aWYgKHN0cikgYXBwZW5kQ2hpbGQodW5lc2NhcGVYTUwoc3RyKSk7XG5cblx0XHRcdFx0ZnVuY3Rpb24gcmVtb3ZlQnJlYWtMaW5lKHN0cikge1xuXHRcdFx0XHRcdHJldHVybiBzdHI/LnJlcGxhY2U/LigvXihcXHJcXG58XFxyfFxcbnxcXHQpK3woXFxyXFxufFxccnxcXG58XFx0KSskL2csIFwiXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGFwcGVuZENoaWxkKGNoaWxkKSB7XG5cdFx0XHRcdGVsZW0uY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHQvKioqKioqKioqKioqKioqKiogRnVjdGlvbnMgKioqKioqKioqKioqKioqKiovXG5cdFx0ZnVuY3Rpb24gZnJvbVBsaXN0KGVsZW0sIHJldml2ZXIpIHtcblx0XHRcdGxldCBvYmplY3Q7XG5cdFx0XHRzd2l0Y2ggKHR5cGVvZiBlbGVtKSB7XG5cdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0XHRcdG9iamVjdCA9IGVsZW07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHQvL2RlZmF1bHQ6XG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IGVsZW0ubmFtZTtcblx0XHRcdFx0XHRjb25zdCBjaGlsZHJlbiA9IGVsZW0uY2hpbGRyZW47XG5cblx0XHRcdFx0XHRvYmplY3QgPSB7fTtcblxuXHRcdFx0XHRcdHN3aXRjaCAobmFtZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcInBsaXN0XCI6XG5cdFx0XHRcdFx0XHRcdGxldCBwbGlzdCA9IGZyb21QbGlzdChjaGlsZHJlblswXSwgcmV2aXZlcik7XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IE9iamVjdC5hc3NpZ24ob2JqZWN0LCBwbGlzdClcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiZGljdFwiOlxuXHRcdFx0XHRcdFx0XHRsZXQgZGljdCA9IGNoaWxkcmVuLm1hcChjaGlsZCA9PiBmcm9tUGxpc3QoY2hpbGQsIHJldml2ZXIpKTtcblx0XHRcdFx0XHRcdFx0ZGljdCA9IGNodW5rKGRpY3QsIDIpO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBPYmplY3QuZnJvbUVudHJpZXMoZGljdCk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImFycmF5XCI6XG5cdFx0XHRcdFx0XHRcdGlmICghQXJyYXkuaXNBcnJheShvYmplY3QpKSBvYmplY3QgPSBbXTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gY2hpbGRyZW4ubWFwKGNoaWxkID0+IGZyb21QbGlzdChjaGlsZCwgcmV2aXZlcikpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJrZXlcIjpcblx0XHRcdFx0XHRcdFx0Y29uc3Qga2V5ID0gY2hpbGRyZW5bMF07XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IGtleTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwidHJ1ZVwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImZhbHNlXCI6XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGJvb2xlYW4gPSBuYW1lO1xuXHRcdFx0XHRcdFx0XHRvYmplY3QgPSBKU09OLnBhcnNlKGJvb2xlYW4pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJpbnRlZ2VyXCI6XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGludGVnZXIgPSBjaGlsZHJlblswXTtcblx0XHRcdFx0XHRcdFx0Ly9vYmplY3QgPSBwYXJzZUludChpbnRlZ2VyKTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gQmlnSW50KGludGVnZXIpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJyZWFsXCI6XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHJlYWwgPSBjaGlsZHJlblswXTtcblx0XHRcdFx0XHRcdFx0Ly9jb25zdCBkaWdpdHMgPSByZWFsLnNwbGl0KFwiLlwiKVsxXT8ubGVuZ3RoIHx8IDA7XG5cdFx0XHRcdFx0XHRcdG9iamVjdCA9IHBhcnNlRmxvYXQocmVhbCkvLy50b0ZpeGVkKGRpZ2l0cyk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdFx0XHRjb25zdCBzdHJpbmcgPSBjaGlsZHJlblswXTtcblx0XHRcdFx0XHRcdFx0b2JqZWN0ID0gc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGlmIChyZXZpdmVyKSBvYmplY3QgPSByZXZpdmVyKG5hbWUgfHwgXCJcIiwgb2JqZWN0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmplY3Q7XG5cblx0XHRcdC8qKiBcblx0XHRcdCAqIENodW5rIEFycmF5XG5cdFx0XHQgKiBAYXV0aG9yIFZpcmdpbENseW5lXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgLSBzb3VyY2Vcblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXJcblx0XHRcdCAqIEByZXR1cm4ge0FycmF5PCo+fSB0YXJnZXRcblx0XHRcdCAqL1xuXHRcdFx0ZnVuY3Rpb24gY2h1bmsoc291cmNlLCBsZW5ndGgpIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gMCwgdGFyZ2V0ID0gW107XG5cdFx0XHRcdHdoaWxlIChpbmRleCA8IHNvdXJjZS5sZW5ndGgpIHRhcmdldC5wdXNoKHNvdXJjZS5zbGljZShpbmRleCwgaW5kZXggKz0gbGVuZ3RoKSk7XG5cdFx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGZyb21YTUwoZWxlbSwgcmV2aXZlcikge1xuXHRcdFx0bGV0IG9iamVjdDtcblx0XHRcdHN3aXRjaCAodHlwZW9mIGVsZW0pIHtcblx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRjYXNlIFwidW5kZWZpbmVkXCI6XG5cdFx0XHRcdFx0b2JqZWN0ID0gZWxlbTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHRcdC8vZGVmYXVsdDpcblx0XHRcdFx0XHRjb25zdCByYXcgPSBlbGVtLnJhdztcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gZWxlbS5uYW1lO1xuXHRcdFx0XHRcdGNvbnN0IHRhZyA9IGVsZW0udGFnO1xuXHRcdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gZWxlbS5jaGlsZHJlbjtcblxuXHRcdFx0XHRcdGlmIChyYXcpIG9iamVjdCA9IHJhdztcblx0XHRcdFx0XHRlbHNlIGlmICh0YWcpIG9iamVjdCA9IHBhcnNlQXR0cmlidXRlKHRhZywgcmV2aXZlcik7XG5cdFx0XHRcdFx0ZWxzZSBpZiAoIWNoaWxkcmVuKSBvYmplY3QgPSB7IFtuYW1lXTogdW5kZWZpbmVkIH07XG5cdFx0XHRcdFx0ZWxzZSBvYmplY3QgPSB7fTtcblxuXHRcdFx0XHRcdGlmIChuYW1lID09PSBcInBsaXN0XCIpIG9iamVjdCA9IE9iamVjdC5hc3NpZ24ob2JqZWN0LCBmcm9tUGxpc3QoY2hpbGRyZW5bMF0sIHJldml2ZXIpKTtcblx0XHRcdFx0XHRlbHNlIGNoaWxkcmVuPy5mb3JFYWNoPy4oKGNoaWxkLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGNoaWxkID09PSBcInN0cmluZ1wiKSBhZGRPYmplY3Qob2JqZWN0LCBDSElMRF9OT0RFX0tFWSwgZnJvbVhNTChjaGlsZCwgcmV2aXZlciksIHVuZGVmaW5lZClcblx0XHRcdFx0XHRcdGVsc2UgaWYgKCFjaGlsZC50YWcgJiYgIWNoaWxkLmNoaWxkcmVuICYmICFjaGlsZC5yYXcpIGFkZE9iamVjdChvYmplY3QsIGNoaWxkLm5hbWUsIGZyb21YTUwoY2hpbGQsIHJldml2ZXIpLCBjaGlsZHJlbj8uW2kgLSAxXT8ubmFtZSlcblx0XHRcdFx0XHRcdGVsc2UgYWRkT2JqZWN0KG9iamVjdCwgY2hpbGQubmFtZSwgZnJvbVhNTChjaGlsZCwgcmV2aXZlciksIHVuZGVmaW5lZClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAwKSBhZGRPYmplY3Qob2JqZWN0LCBDSElMRF9OT0RFX0tFWSwgbnVsbCwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdGlmIChPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0aWYgKGVsZW0ubmFtZSkgb2JqZWN0W2VsZW0ubmFtZV0gPSAoZWxlbS5oYXNDaGlsZCA9PT0gZmFsc2UpID8gbnVsbCA6IFwiXCI7XG5cdFx0XHRcdFx0XHRlbHNlIG9iamVjdCA9IChlbGVtLmhhc0NoaWxkID09PSBmYWxzZSkgPyBudWxsIDogXCJcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ki9cblxuXHRcdFx0XHRcdC8vaWYgKE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID09PSAwKSBhZGRPYmplY3Qob2JqZWN0LCBlbGVtLm5hbWUsIChlbGVtLmhhc0NoaWxkID09PSBmYWxzZSkgPyBudWxsIDogXCJcIik7XG5cdFx0XHRcdFx0Ly9pZiAoT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDApIG9iamVjdCA9IChlbGVtLmhhc0NoaWxkID09PSBmYWxzZSkgPyB1bmRlZmluZWQgOiBcIlwiO1xuXHRcdFx0XHRcdGlmIChyZXZpdmVyKSBvYmplY3QgPSByZXZpdmVyKG5hbWUgfHwgXCJcIiwgb2JqZWN0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHQvKioqKioqKioqKioqKioqKiogRnVjdGlvbnMgKioqKioqKioqKioqKioqKiovXG5cdFx0XHRmdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZSh0YWcsIHJldml2ZXIpIHtcblx0XHRcdFx0aWYgKCF0YWcpIHJldHVybjtcblx0XHRcdFx0Y29uc3QgbGlzdCA9IHRhZy5zcGxpdCgvKFteXFxzPSdcIl0rKD86XFxzKj1cXHMqKD86J1tcXFNcXHNdKj8nfFwiW1xcU1xcc10qP1wifFteXFxzJ1wiXSopKT8pLyk7XG5cdFx0XHRcdGNvbnN0IGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRsZXQgYXR0cmlidXRlcywgdmFsO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgc3RyID0gcmVtb3ZlU3BhY2VzKGxpc3RbaV0pO1xuXHRcdFx0XHRcdC8vbGV0IHN0ciA9IHJlbW92ZUJyZWFrTGluZShsaXN0W2ldKTtcblx0XHRcdFx0XHQvL2xldCBzdHIgPSBsaXN0W2ldPy50cmltPy4oKTtcblx0XHRcdFx0XHRpZiAoIXN0cikgY29udGludWU7XG5cblx0XHRcdFx0XHRpZiAoIWF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMgPSB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBwb3MgPSBzdHIuaW5kZXhPZihcIj1cIik7XG5cdFx0XHRcdFx0aWYgKHBvcyA8IDApIHtcblx0XHRcdFx0XHRcdC8vIGJhcmUgYXR0cmlidXRlXG5cdFx0XHRcdFx0XHRzdHIgPSBBVFRSSUJVVEVfS0VZICsgc3RyO1xuXHRcdFx0XHRcdFx0dmFsID0gbnVsbDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gYXR0cmlidXRlIGtleS92YWx1ZSBwYWlyXG5cdFx0XHRcdFx0XHR2YWwgPSBzdHIuc3Vic3RyKHBvcyArIDEpLnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG5cdFx0XHRcdFx0XHRzdHIgPSBBVFRSSUJVVEVfS0VZICsgc3RyLnN1YnN0cigwLCBwb3MpLnJlcGxhY2UoL1xccyskLywgXCJcIik7XG5cblx0XHRcdFx0XHRcdC8vIHF1b3RlOiBmb289XCJGT09cIiBiYXI9J0JBUidcblx0XHRcdFx0XHRcdGNvbnN0IGZpcnN0Q2hhciA9IHZhbFswXTtcblx0XHRcdFx0XHRcdGNvbnN0IGxhc3RDaGFyID0gdmFsW3ZhbC5sZW5ndGggLSAxXTtcblx0XHRcdFx0XHRcdGlmIChmaXJzdENoYXIgPT09IGxhc3RDaGFyICYmIChmaXJzdENoYXIgPT09IFwiJ1wiIHx8IGZpcnN0Q2hhciA9PT0gJ1wiJykpIHtcblx0XHRcdFx0XHRcdFx0dmFsID0gdmFsLnN1YnN0cigxLCB2YWwubGVuZ3RoIC0gMik7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhbCA9IHVuZXNjYXBlWE1MKHZhbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChyZXZpdmVyKSB2YWwgPSByZXZpdmVyKHN0ciwgdmFsKTtcblxuXHRcdFx0XHRcdGFkZE9iamVjdChhdHRyaWJ1dGVzLCBzdHIsIHZhbCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYXR0cmlidXRlcztcblxuXHRcdFx0XHRmdW5jdGlvbiByZW1vdmVTcGFjZXMoc3RyKSB7XG5cdFx0XHRcdFx0Ly9yZXR1cm4gc3RyICYmIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHRcdFx0XHRyZXR1cm4gc3RyPy50cmltPy4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBhZGRPYmplY3Qob2JqZWN0LCBrZXksIHZhbCwgcHJldktleSA9IGtleSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBwcmV2ID0gb2JqZWN0W3ByZXZLZXldO1xuXHRcdFx0XHRcdC8vY29uc3QgY3VyciA9IG9iamVjdFtrZXldO1xuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHByZXYpKSBwcmV2LnB1c2godmFsKTtcblx0XHRcdFx0XHRlbHNlIGlmIChwcmV2KSBvYmplY3RbcHJldktleV0gPSBbcHJldiwgdmFsXTtcblx0XHRcdFx0XHRlbHNlIG9iamVjdFtrZXldID0gdmFsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdW5lc2NhcGVYTUwoc3RyKSB7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoLygmKD86bHR8Z3R8YW1wfGFwb3N8cXVvdHwjKD86XFxkezEsNn18eFswLTlhLWZBLUZdezEsNX0pKTspL2csIGZ1bmN0aW9uIChzdHIpIHtcblx0XHRcdFx0aWYgKHN0clsxXSA9PT0gXCIjXCIpIHtcblx0XHRcdFx0XHRjb25zdCBjb2RlID0gKHN0clsyXSA9PT0gXCJ4XCIpID8gcGFyc2VJbnQoc3RyLnN1YnN0cigzKSwgMTYpIDogcGFyc2VJbnQoc3RyLnN1YnN0cigyKSwgMTApO1xuXHRcdFx0XHRcdGlmIChjb2RlID4gLTEpIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBVTkVTQ0FQRVtzdHJdIHx8IHN0cjtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9O1xuXG5cdHN0cmluZ2lmeShqc29uID0gbmV3IE9iamVjdCwgdGFiID0gXCJcIikge1xuXHRcdGNvbnN0IEVTQ0FQRSA9IHRoaXMuI0VTQ0FQRTtcblx0XHRjb25zdCBBVFRSSUJVVEVfS0VZID0gdGhpcy4jQVRUUklCVVRFX0tFWTtcblx0XHRjb25zdCBDSElMRF9OT0RFX0tFWSA9IHRoaXMuI0NISUxEX05PREVfS0VZO1xuXHRcdGxldCBYTUwgPSBcIlwiO1xuXHRcdGZvciAobGV0IGVsZW0gaW4ganNvbikgWE1MICs9IHRvWG1sKGpzb25bZWxlbV0sIGVsZW0sIFwiXCIpO1xuXHRcdFhNTCA9IHRhYiA/IFhNTC5yZXBsYWNlKC9cXHQvZywgdGFiKSA6IFhNTC5yZXBsYWNlKC9cXHR8XFxuL2csIFwiXCIpO1xuXHRcdHJldHVybiBYTUw7XG5cdFx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRcdGZ1bmN0aW9uIHRvWG1sKEVsZW0sIE5hbWUsIEluZCkge1xuXHRcdFx0bGV0IHhtbCA9IFwiXCI7XG5cdFx0XHRzd2l0Y2ggKHR5cGVvZiBFbGVtKSB7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShFbGVtKSkge1xuXHRcdFx0XHRcdFx0eG1sID0gRWxlbS5yZWR1Y2UoXG5cdFx0XHRcdFx0XHRcdChwcmV2WE1MLCBjdXJyWE1MKSA9PiBwcmV2WE1MICs9IGAke0luZH0ke3RvWG1sKGN1cnJYTUwsIE5hbWUsIGAke0luZH1cXHRgKX1cXG5gLFxuXHRcdFx0XHRcdFx0XHRcIlwiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsZXQgYXR0cmlidXRlID0gXCJcIjtcblx0XHRcdFx0XHRcdGxldCBoYXNDaGlsZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgbmFtZSBpbiBFbGVtKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChuYW1lWzBdID09PSBBVFRSSUJVVEVfS0VZKSB7XG5cdFx0XHRcdFx0XHRcdFx0YXR0cmlidXRlICs9IGAgJHtuYW1lLnN1YnN0cmluZygxKX09XFxcIiR7RWxlbVtuYW1lXS50b1N0cmluZygpfVxcXCJgO1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBFbGVtW25hbWVdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKEVsZW1bbmFtZV0gPT09IHVuZGVmaW5lZCkgTmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHRcdGVsc2UgaGFzQ2hpbGQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfSR7YXR0cmlidXRlfSR7KGhhc0NoaWxkIHx8IE5hbWUgPT09IFwibGlua1wiKSA/IFwiXCIgOiBcIi9cIn0+YDtcblxuXHRcdFx0XHRcdFx0aWYgKGhhc0NoaWxkKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChOYW1lID09PSBcInBsaXN0XCIpIHhtbCArPSB0b1BsaXN0KEVsZW0sIE5hbWUsIGAke0luZH1cXHRgKTtcblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgbmFtZSBpbiBFbGVtKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDSElMRF9OT0RFX0tFWTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR4bWwgKz0gRWxlbVtuYW1lXSA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHhtbCArPSB0b1htbChFbGVtW25hbWVdLCBuYW1lLCBgJHtJbmR9XFx0YCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdHhtbCArPSAoeG1sLnNsaWNlKC0xKSA9PT0gXCJcXG5cIiA/IEluZCA6IFwiXCIpICsgYDwvJHtOYW1lfT5gO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0c3dpdGNoIChOYW1lKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiP3htbFwiOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwke05hbWV9ICR7RWxlbS50b1N0cmluZygpfT5gO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCI/XCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCR7TmFtZX0ke0VsZW0udG9TdHJpbmcoKX0ke05hbWV9PmA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIiFcIjpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08IS0tJHtFbGVtLnRvU3RyaW5nKCl9LS0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiIURPQ1RZUEVcIjpcblx0XHRcdFx0XHRcdFx0eG1sICs9IGAke0luZH08JHtOYW1lfSAke0VsZW0udG9TdHJpbmcoKX0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiIUNEQVRBXCI6XG5cdFx0XHRcdFx0XHRcdHhtbCArPSBgJHtJbmR9PCFbQ0RBVEFbJHtFbGVtLnRvU3RyaW5nKCl9XV0+YDtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIENISUxEX05PREVfS0VZOlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gRWxlbTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHR4bWwgKz0gYCR7SW5kfTwke05hbWV9PiR7RWxlbS50b1N0cmluZygpfTwvJHtOYW1lfT5gO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5kZWZpbmVkXCI6XG5cdFx0XHRcdFx0eG1sICs9IEluZCArIGA8JHtOYW1lLnRvU3RyaW5nKCl9Lz5gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB4bWw7XG5cdFx0fTtcblxuXHRcdGZ1bmN0aW9uIHRvUGxpc3QoRWxlbSwgTmFtZSwgSW5kKSB7XG5cdFx0XHRsZXQgcGxpc3QgPSBcIlwiO1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgRWxlbSkge1xuXHRcdFx0XHRjYXNlIFwiYm9vbGVhblwiOlxuXHRcdFx0XHRcdHBsaXN0ID0gYCR7SW5kfTwke0VsZW0udG9TdHJpbmcoKX0vPmA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJudW1iZXJcIjpcblx0XHRcdFx0XHRwbGlzdCA9IGAke0luZH08cmVhbD4ke0VsZW0udG9TdHJpbmcoKX08L3JlYWw+YDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImJpZ2ludFwiOlxuXHRcdFx0XHRcdHBsaXN0ID0gYCR7SW5kfTxpbnRlZ2VyPiR7RWxlbS50b1N0cmluZygpfTwvaW50ZWdlcj5gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0cGxpc3QgPSBgJHtJbmR9PHN0cmluZz4ke0VsZW0udG9TdHJpbmcoKX08L3N0cmluZz5gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0bGV0IGFycmF5ID0gXCJcIjtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShFbGVtKSkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG4gPSBFbGVtLmxlbmd0aDsgaSA8IG47IGkrKykgYXJyYXkgKz0gYCR7SW5kfSR7dG9QbGlzdChFbGVtW2ldLCBOYW1lLCBgJHtJbmR9XFx0YCl9YDtcblx0XHRcdFx0XHRcdHBsaXN0ID0gYCR7SW5kfTxhcnJheT4ke2FycmF5fSR7SW5kfTwvYXJyYXk+YDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGV0IGRpY3QgPSBcIlwiO1xuXHRcdFx0XHRcdFx0T2JqZWN0LmVudHJpZXMoRWxlbSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGRpY3QgKz0gYCR7SW5kfTxrZXk+JHtrZXl9PC9rZXk+YDtcblx0XHRcdFx0XHRcdFx0ZGljdCArPSB0b1BsaXN0KHZhbHVlLCBrZXksIEluZCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHBsaXN0ID0gYCR7SW5kfTxkaWN0PiR7ZGljdH0ke0luZH08L2RpY3Q+YDtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBsaXN0O1xuXHRcdH07XG5cdH07XG59XG4iLCIvKipcbiAqIGRldGVjdCBGb3JtYXRcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7T2JqZWN0fSB1cmwgLSBQYXJzZWQgVVJMXG4gKiBAcGFyYW0ge1N0cmluZ30gYm9keSAtIHJlc3BvbnNlIGJvZHlcbiAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0IC0gZm9ybWF0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdEZvcm1hdCh1cmwsIGJvZHkpIHtcblx0bGV0IGZvcm1hdCA9IHVuZGVmaW5lZDtcblx0Y29uc29sZS5sb2coYOKYke+4jyBkZXRlY3RGb3JtYXQsIGZvcm1hdDogJHt1cmwuZm9ybWF0ID8/IHVybC5xdWVyeT8uZm10ID8/IHVybC5xdWVyeT8uZm9ybWF0fWAsIFwiXCIpO1xuXHRzd2l0Y2ggKHVybC5mb3JtYXQgPz8gdXJsLnF1ZXJ5Py5mbXQgPz8gdXJsLnF1ZXJ5Py5mb3JtYXQpIHtcblx0XHRjYXNlIFwidHh0XCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQvcGxhaW5cIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ4bWxcIjpcblx0XHRjYXNlIFwic3J2M1wiOlxuXHRcdGNhc2UgXCJ0dG1sXCI6XG5cdFx0Y2FzZSBcInR0bWwyXCI6XG5cdFx0Y2FzZSBcImltc2NcIjpcblx0XHRcdGZvcm1hdCA9IFwidGV4dC94bWxcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ2dHRcIjpcblx0XHRjYXNlIFwid2VidnR0XCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwianNvblwiOlxuXHRcdGNhc2UgXCJqc29uM1wiOlxuXHRcdFx0Zm9ybWF0ID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwibTN1XCI6XG5cdFx0Y2FzZSBcIm0zdThcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24veC1tcGVndXJsXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwicGxpc3RcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vcGxpc3RcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0Y29uc3QgSEVBREVSID0gYm9keT8uc3Vic3RyaW5nPy4oMCwgNikudHJpbT8uKCk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGDwn5qnIGRldGVjdEZvcm1hdCwgSEVBREVSOiAke0hFQURFUn1gLCBcIlwiKTtcblx0XHRcdC8vY29uc29sZS5sb2coYPCfmqcgZGV0ZWN0Rm9ybWF0LCBIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpOiAke0hFQURFUj8uc3Vic3RyaW5nPy4oMCwgMSl9YCwgXCJcIik7XG5cdFx0XHRzd2l0Y2ggKEhFQURFUikge1xuXHRcdFx0XHRjYXNlIFwiPD94bWxcIjpcblx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQveG1sXCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJXRUJWVFRcIjpcblx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0c3dpdGNoIChIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiMFwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjFcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCIyXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiM1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjRcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI1XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiNlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjdcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI4XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiOVwiOlxuXHRcdFx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIntcIjpcblx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0fTtcblx0Y29uc29sZS5sb2coYOKchSBkZXRlY3RGb3JtYXQsIGZvcm1hdDogJHtmb3JtYXR9YCwgXCJcIik7XG5cdHJldHVybiBmb3JtYXQ7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGV0ZWN0UGxhdGZvcm0odXJsKSB7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gRGV0ZWN0IFBsYXRmb3JtYCwgXCJcIik7XG5cdC8qKioqKioqKioqKioqKioqKiBQbGF0Zm9ybSAqKioqKioqKioqKioqKioqKi9cblx0bGV0IFBsYXRmb3JtID0gL1xcLihuZXRmbGl4XFwuY29tfG5mbHh2aWRlb1xcLm5ldCkvaS50ZXN0KHVybCkgPyBcIk5ldGZsaXhcIlxuXHRcdDogLyhcXC55b3V0dWJlfHlvdXR1YmVpXFwuZ29vZ2xlYXBpcylcXC5jb20vaS50ZXN0KHVybCkgPyBcIllvdVR1YmVcIlxuXHRcdFx0OiAvXFwuc3BvdGlmeShjZG4pP1xcLmNvbS9pLnRlc3QodXJsKSA/IFwiU3BvdGlmeVwiXG5cdFx0XHRcdDogL1xcLmFwcGxlXFwuY29tL2kudGVzdCh1cmwpID8gXCJBcHBsZVwiXG5cdFx0XHRcdFx0OiAvXFwuKGRzc290dHxzdGFyb3R0KVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiRGlzbmV5K1wiXG5cdFx0XHRcdFx0XHQ6IC8oXFwuKHB2LWNkbnxhaXYtY2RufGFrYW1haWhkfGNsb3VkZnJvbnQpXFwubmV0KXxzM1xcLmFtYXpvbmF3c1xcLmNvbVxcL2Fpdi1wcm9kLXRpbWVkdGV4dFxcLy9pLnRlc3QodXJsKSA/IFwiUHJpbWVWaWRlb1wiXG5cdFx0XHRcdFx0XHRcdDogL3ByZFxcLm1lZGlhXFwuaDI2NFxcLmlvL2kudGVzdCh1cmwpID8gXCJNYXhcIlxuXHRcdFx0XHRcdFx0XHRcdDogL1xcLihhcGlcXC5oYm98aGJvbWF4Y2RuKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiSEJPTWF4XCJcblx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLihodWx1c3RyZWFtfGh1bHVpbSlcXC5jb20vaS50ZXN0KHVybCkgPyBcIkh1bHVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oY2JzYWF2aWRlb3xjYnNpdmlkZW98Y2JzKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiUGFyYW1vdW50K1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwudXBseW5rXFwuY29tL2kudGVzdCh1cmwpID8gXCJEaXNjb3ZlcnkrXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL2RwbHVzLXBoLS9pLnRlc3QodXJsKSA/IFwiRGlzY292ZXJ5K1BoXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwucGVhY29ja3R2XFwuY29tL2kudGVzdCh1cmwpID8gXCJQZWFjb2NrVFZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLmZ1Ym9cXC50di9pLnRlc3QodXJsKSA/IFwiRnVib1RWXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnZpa2lcXC5pby9pLnRlc3QodXJsKSA/IFwiVmlraVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogLyhlcGl4aGxzXFwuYWthbWFpemVkXFwubmV0fGVwaXhcXC5zZXJ2aWNlc1xcLmlvKS9pLnRlc3QodXJsKSA/IFwiTUdNK1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwubmVidWxhXFwuYXBwfC9pLnRlc3QodXJsKSA/IFwiTmVidWxhXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogXCJVbml2ZXJzYWxcIjtcbiAgICBjb25zb2xlLmxvZyhg4pyFIERldGVjdCBQbGF0Zm9ybSwgUGxhdGZvcm06ICR7UGxhdGZvcm19YCwgXCJcIik7XG5cdHJldHVybiBQbGF0Zm9ybTtcbn07XG4iLCIvKipcbiAqIFNldCBDYWNoZVxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtNYXB9IGNhY2hlIC0gUGxheWxpc3RzIENhY2hlIC8gU3VidGl0bGVzIENhY2hlXG4gKiBAcGFyYW0ge051bWJlcn0gY2FjaGVTaXplIC0gQ2FjaGUgU2l6ZVxuICogQHJldHVybiB7Qm9vbGVhbn0gaXNTYXZlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRDYWNoZShjYWNoZSwgY2FjaGVTaXplID0gMTAwKSB7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gU2V0IENhY2hlLCBjYWNoZVNpemU6ICR7Y2FjaGVTaXplfWAsIFwiXCIpO1xuXHRjYWNoZSA9IEFycmF5LmZyb20oY2FjaGUgfHwgW10pOyAvLyBNYXDovaxBcnJheVxuXHRjYWNoZSA9IGNhY2hlLnNsaWNlKC1jYWNoZVNpemUpOyAvLyDpmZDliLbnvJPlrZjlpKflsI9cblx0Y29uc29sZS5sb2coYOKchSBTZXQgQ2FjaGVgLCBcIlwiKTtcblx0cmV0dXJuIGNhY2hlO1xufTtcbiIsIi8qXG5SRUFETUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9EdWFsU3Vic1xuKi9cblxuaW1wb3J0IEVOVnMgZnJvbSBcIi4uL0VOVi9FTlYubWpzXCI7XG5jb25zdCAkID0gbmV3IEVOVnMoXCLwn42/77iPIER1YWxTdWJzOiBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzXCIpO1xuXG4vKipcbiAqIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGVyc2lzdGVudCBTdG9yZSBLZXlcbiAqIEBwYXJhbSB7QXJyYXl9IHBsYXRmb3JtcyAtIFBsYXRmb3JtIE5hbWVzXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YWJhc2UgLSBEZWZhdWx0IERhdGFCYXNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldEVOVihuYW1lLCBwbGF0Zm9ybXMsIGRhdGFiYXNlKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9YCwgXCJcIik7XG5cdGxldCB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfSA9ICQuZ2V0RU5WKG5hbWUsIHBsYXRmb3JtcywgZGF0YWJhc2UpO1xuXHQvKioqKioqKioqKioqKioqKiogU2V0dGluZ3MgKioqKioqKioqKioqKioqKiovXG5cdGlmICghQXJyYXkuaXNBcnJheShTZXR0aW5ncz8uVHlwZXMpKSBTZXR0aW5ncy5UeXBlcyA9IChTZXR0aW5ncy5UeXBlcykgPyBbU2V0dGluZ3MuVHlwZXNdIDogW107IC8vIOWPquacieS4gOS4qumAiemhueaXtu+8jOaXoOmAl+WPt+WIhumalFxuXHRpZiAoJC5pc0xvb24oKSAmJiBwbGF0Zm9ybXMuaW5jbHVkZXMoXCJZb3VUdWJlXCIpKSB7XG5cdFx0U2V0dGluZ3MuQXV0b0NDID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi6Ieq5Yqo5pi+56S657+76K+R5a2X5bmVXCIpID8/IFNldHRpbmdzLkF1dG9DQztcblx0XHRzd2l0Y2ggKFNldHRpbmdzLkF1dG9DQykge1xuXHRcdFx0Y2FzZSBcIuaYr1wiOlxuXHRcdFx0XHRTZXR0aW5ncy5BdXRvQ0MgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCLlkKZcIjpcblx0XHRcdFx0U2V0dGluZ3MuQXV0b0NDID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRTZXR0aW5ncy5TaG93T25seSA9ICRwZXJzaXN0ZW50U3RvcmUucmVhZChcIuS7hei+k+WHuuivkeaWh1wiKSA/PyBTZXR0aW5ncy5TaG93T25seTtcblx0XHRzd2l0Y2ggKFNldHRpbmdzLlNob3dPbmx5KSB7XG5cdFx0XHRjYXNlIFwi5pivXCI6XG5cdFx0XHRcdFNldHRpbmdzLlNob3dPbmx5ID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwi5ZCmXCI6XG5cdFx0XHRcdFNldHRpbmdzLlNob3dPbmx5ID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRTZXR0aW5ncy5Qb3NpdGlvbiA9ICRwZXJzaXN0ZW50U3RvcmUucmVhZChcIuWtl+W5leivkeaWh+S9jee9rlwiKSA/PyBTZXR0aW5ncy5Qb3NpdGlvbjtcblx0XHRzd2l0Y2ggKFNldHRpbmdzLlBvc2l0aW9uKSB7XG5cdFx0XHRjYXNlIFwi6K+R5paH5L2N5LqO5aSW5paH5LmL5LiKXCI6XG5cdFx0XHRcdFNldHRpbmdzLlBvc2l0aW9uID0gXCJGb3J3YXJkXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIuivkeaWh+S9jeS6juWkluaWh+S5i+S4i1wiOlxuXHRcdFx0XHRTZXR0aW5ncy5Qb3NpdGlvbiA9IFwiUmV2ZXJzZVwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdH07XG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYFNldHRpbmdzOiAke3R5cGVvZiBTZXR0aW5nc31gLCBgU2V0dGluZ3PlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoU2V0dGluZ3MpfWAsIFwiXCIpO1xuXHQvKioqKioqKioqKioqKioqKiogQ2FjaGVzICoqKioqKioqKioqKioqKioqL1xuXHQvLyQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYENhY2hlczogJHt0eXBlb2YgQ2FjaGVzfWAsIGBDYWNoZXPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoQ2FjaGVzKX1gLCBcIlwiKTtcblx0aWYgKHR5cGVvZiBDYWNoZXM/LlBsYXlsaXN0cyAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KENhY2hlcz8uUGxheWxpc3RzKSkgQ2FjaGVzLlBsYXlsaXN0cyA9IHt9OyAvLyDliJvlu7pQbGF5bGlzdHPnvJPlrZhcblx0Q2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXIgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5QbGF5bGlzdHM/Lk1hc3RlciB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5QbGF5bGlzdHM/LlN1YnRpdGxlIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0aWYgKHR5cGVvZiBDYWNoZXM/LlN1YnRpdGxlcyAhPT0gXCJvYmplY3RcIikgQ2FjaGVzLlN1YnRpdGxlcyA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlN1YnRpdGxlcyB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5NZXRhZGF0YXMgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShDYWNoZXM/Lk1ldGFkYXRhcykpIENhY2hlcy5NZXRhZGF0YXMgPSB7fTsgLy8g5Yib5bu6UGxheWxpc3Rz57yT5a2YXG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5NZXRhZGF0YXM/LlRyYWNrcyAhPT0gXCJvYmplY3RcIikgQ2FjaGVzLk1ldGFkYXRhcy5UcmFja3MgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5NZXRhZGF0YXM/LlRyYWNrcyB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdC8qKioqKioqKioqKioqKioqKiBDb25maWdzICoqKioqKioqKioqKioqKioqL1xuXHRyZXR1cm4geyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuUkVBRE1FOiBodHRwczovL2dpdGh1Yi5jb20vRHVhbFN1YnNcbiovXG5cbmltcG9ydCBFTlZzIGZyb20gXCIuL0VOVi9FTlYubWpzXCI7XG5pbXBvcnQgVVJJcyBmcm9tIFwiLi9VUkkvVVJJLm1qc1wiO1xuaW1wb3J0IFhNTHMgZnJvbSBcIi4vWE1ML1hNTC5tanNcIjtcbmltcG9ydCBXZWJWVFQgZnJvbSBcIi4vV2ViVlRUL1dlYlZUVC5tanNcIjtcblxuaW1wb3J0IHNldEVOViBmcm9tIFwiLi9mdW5jdGlvbi9zZXRFTlYubWpzXCI7XG5pbXBvcnQgZGV0ZWN0UGxhdGZvcm0gZnJvbSBcIi4vZnVuY3Rpb24vZGV0ZWN0UGxhdGZvcm0ubWpzXCI7XG5pbXBvcnQgZGV0ZWN0Rm9ybWF0IGZyb20gXCIuL2Z1bmN0aW9uL2RldGVjdEZvcm1hdC5tanNcIjtcbmltcG9ydCBzZXRDYWNoZSBmcm9tIFwiLi9mdW5jdGlvbi9zZXRDYWNoZS5tanNcIjtcblxuaW1wb3J0ICogYXMgRGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2UvRGF0YWJhc2UuanNvblwiO1xuXG5jb25zdCAkID0gbmV3IEVOVnMoXCLwn42/77iPIER1YWxTdWJzOiDwn46mIFVuaXZlcnNhbCB2MC45LjUoMykgQ29tcG9zaXRlLlN1YnRpdGxlcy5yZXNwb25zZS5iZXRhXCIpO1xuY29uc3QgVVJJID0gbmV3IFVSSXMoKTtcbmNvbnN0IFhNTCA9IG5ldyBYTUxzKCk7XG5jb25zdCBWVFQgPSBuZXcgV2ViVlRUKFtcIm1pbGxpc2Vjb25kc1wiLCBcInRpbWVTdGFtcFwiLCBcInNpbmdsZUxpbmVcIiwgXCJcXG5cIl0pOyAvLyBcIm11bHRpTGluZVwiXG5cbi8qKioqKioqKioqKioqKioqKiBQcm9jZXNzaW5nICoqKioqKioqKioqKioqKioqL1xuLy8g6Kej5p6EVVJMXG5jb25zdCBVUkwgPSBVUkkucGFyc2UoJHJlcXVlc3QudXJsKTtcbiQubG9nKGDimqAgJHskLm5hbWV9YCwgYFVSTDogJHtKU09OLnN0cmluZ2lmeShVUkwpfWAsIFwiXCIpO1xuLy8g6I635Y+W6L+e5o6l5Y+C5pWwXG5jb25zdCBNRVRIT0QgPSAkcmVxdWVzdC5tZXRob2QsIEhPU1QgPSBVUkwuaG9zdCwgUEFUSCA9IFVSTC5wYXRoLCBQQVRIcyA9IFVSTC5wYXRocztcbiQubG9nKGDimqAgJHskLm5hbWV9YCwgYE1FVEhPRDogJHtNRVRIT0R9YCwgXCJcIik7XG4vLyDojrflj5blubPlj7BcbmNvbnN0IFBMQVRGT1JNID0gZGV0ZWN0UGxhdGZvcm0oSE9TVCk7XG4kLmxvZyhg4pqgICR7JC5uYW1lfSwgUExBVEZPUk06ICR7UExBVEZPUk19YCwgXCJcIik7XG4vLyDop6PmnpDmoLzlvI9cbmxldCBGT1JNQVQgPSAoJHJlc3BvbnNlLmhlYWRlcnM/LltcIkNvbnRlbnQtVHlwZVwiXSA/PyAkcmVzcG9uc2UuaGVhZGVycz8uW1wiY29udGVudC10eXBlXCJdKT8uc3BsaXQoXCI7XCIpPy5bMF07XG5pZiAoRk9STUFUID09PSBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiIHx8IEZPUk1BVCA9PT0gXCJ0ZXh0L3BsYWluXCIpIEZPUk1BVCA9IGRldGVjdEZvcm1hdChVUkwsICRyZXNwb25zZT8uYm9keSk7XG4kLmxvZyhg4pqgICR7JC5uYW1lfSwgRk9STUFUOiAke0ZPUk1BVH1gLCBcIlwiKTtcbihhc3luYyAoKSA9PiB7XG5cdC8vIOivu+WPluiuvue9rlxuXHRjb25zdCB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfSA9IHNldEVOVihcIkR1YWxTdWJzXCIsIFsoW1wiWW91VHViZVwiLCBcIk5ldGZsaXhcIiwgXCJCaWxpQmlsaVwiLCBcIlNwb3RpZnlcIl0uaW5jbHVkZXMoUExBVEZPUk0pKSA/IFBMQVRGT1JNIDogXCJVbml2ZXJzYWxcIiwgXCJDb21wb3NpdGVcIiwgXCJBUElcIl0sIERhdGFiYXNlKTtcblx0JC5sb2coYOKaoCAkeyQubmFtZX1gLCBgU2V0dGluZ3MuU3dpdGNoOiAke1NldHRpbmdzPy5Td2l0Y2h9YCwgXCJcIik7XG5cdHN3aXRjaCAoU2V0dGluZ3MuU3dpdGNoKSB7XG5cdFx0Y2FzZSB0cnVlOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHQvLyDojrflj5blrZfluZXnsbvlnovkuI7or63oqIBcblx0XHRcdGNvbnN0IFR5cGUgPSBVUkwucXVlcnk/LnN1YnR5cGUgPz8gU2V0dGluZ3MuVHlwZSwgTGFuZ3VhZ2VzID0gW1VSTC5xdWVyeT8ubGFuZz8udG9VcHBlckNhc2U/LigpID8/IFNldHRpbmdzLkxhbmd1YWdlc1swXSwgKFVSTC5xdWVyeT8udGxhbmcgPz8gQ2FjaGVzPy50bGFuZyk/LnRvVXBwZXJDYXNlPy4oKSA/PyBTZXR0aW5ncy5MYW5ndWFnZXNbMV1dO1xuXHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX0sIFR5cGU6ICR7VHlwZX0sIExhbmd1YWdlczogJHtMYW5ndWFnZXN9YCwgXCJcIik7XG5cdFx0XHQvLyDliJvlu7rlrZfluZXor7fmsYLpmJ/liJdcblx0XHRcdGxldCByZXF1ZXN0cyA9IFtdO1xuXHRcdFx0Ly8g5aSE55CG57G75Z6LXG5cdFx0XHRzd2l0Y2ggKFR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcIk9mZmljaWFsXCI6XG5cdFx0XHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX1gLCBcIuWumOaWueWtl+W5lVwiLCBcIlwiKTtcblx0XHRcdFx0XHRzd2l0Y2ggKFBMQVRGT1JNKSB7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHQvLyDojrflj5blrZfluZXmlofku7blnLDlnYB2dHTnvJPlrZjvvIhtYXDvvIlcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBzdWJ0aXRsZXNQbGF5bGlzdFVSTCB9ID0gZ2V0U3VidGl0bGVzQ2FjaGUoJHJlcXVlc3QudXJsLCBDYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlLCBMYW5ndWFnZXMpO1xuXHRcdFx0XHRcdFx0XHQvLyDojrflj5blrZfluZXmkq3mlL7liJfooahtM3U457yT5a2Y77yIbWFw77yJXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHsgbWFzdGVyUGxheWxpc3RVUkwsIHN1YnRpdGxlc1BsYXlsaXN0SW5kZXggfSA9IGdldFBsYXlsaXN0Q2FjaGUoc3VidGl0bGVzUGxheWxpc3RVUkwsIENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyLCBMYW5ndWFnZXMpO1xuXHRcdFx0XHRcdFx0XHQvLyDojrflj5blrZfluZXmlofku7blnLDlnYB2dHTnvJPlrZjvvIhtYXDvvIlcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBzdWJ0aXRsZXNVUklBcnJheTAsIHN1YnRpdGxlc1VSSUFycmF5MSB9ID0gZ2V0U3VidGl0bGVzQXJyYXkobWFzdGVyUGxheWxpc3RVUkwsIHN1YnRpdGxlc1BsYXlsaXN0SW5kZXgsIENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyLCBDYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlLCBMYW5ndWFnZXMpO1xuXHRcdFx0XHRcdFx0XHQvLyDojrflj5blrpjmlrnlrZfluZXor7fmsYJcblx0XHRcdFx0XHRcdFx0aWYgKHN1YnRpdGxlc1VSSUFycmF5MS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIHN1YnRpdGxlc1VSSUFycmF5MS5sZW5ndGg6ICR7c3VidGl0bGVzVVJJQXJyYXkxLmxlbmd0aH1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHQvLyDojrflj5blrZfluZXmlofku7blkI1cblx0XHRcdFx0XHRcdFx0XHRsZXQgZmlsZU5hbWUgPSBQQVRIcz8uW1BBVEhzPy5sZW5ndGggLSAxXSA/PyBnZXRTdWJ0aXRsZXNGaWxlTmFtZSgkcmVxdWVzdC51cmwsIFBMQVRGT1JNKTtcblx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIGZpbGVOYW1lOiAke2ZpbGVOYW1lfWAsIFwiXCIpXG5cdFx0XHRcdFx0XHRcdFx0Ly8g5p6E6YCg6K+35rGC6Zif5YiXXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWVzdHMgPSBjb25zdHJ1Y3RTdWJ0aXRsZXNRdWV1ZSgkcmVxdWVzdCwgZmlsZU5hbWUsIHN1YnRpdGxlc1VSSUFycmF5MCwgc3VidGl0bGVzVVJJQXJyYXkxKTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiWW91VHViZVwiOlxuXHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBcIllvdVR1YmVcIiwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoVVJMLnF1ZXJ5Py50bGFuZykge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRcdFx0XHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX0sIOacqumAieaLqee/u+ivkeivreiogO+8jOi3s+i/h2AsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9LCDlt7LpgInmi6nnv7vor5Hor63oqIBgLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIOiuvue9ruWPguaVsFxuXHRcdFx0XHRcdFx0XHRcdFx0U2V0dGluZ3MuT2Zmc2V0ID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdFNldHRpbmdzLlRvbGVyYW5jZSA9IDEwMDtcblx0XHRcdFx0XHRcdFx0XHRcdFNldHRpbmdzLlBvc2l0aW9uID0gKFNldHRpbmdzLlBvc2l0aW9uID09PSBcIlJldmVyc2VcIikgPyBcIkZvcndhcmRcIiA6IFwiUmV2ZXJzZVwiOyAvLyDpk77mjqXkuLvlrZfluZXkuLrnv7vor5HlrZfluZXvvIzlia/lrZfluZXkuLrljp/lrZfluZXvvIzmiYDku6XpnIDopoHnv7vovazkuIDkuItcblx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoU2V0dGluZ3MuU2hvd09ubHkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSB0cnVlOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9LCDku4XmmL7npLrnv7vor5HlkI7lrZfluZXvvIzot7Pov4dgLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBmYWxzZTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfSwg55Sf5oiQ5Y+M6K+t5a2X5bmVYCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8g6I635Y+W5a2X5bmVXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0VVJMLnF1ZXJ5LmxhbmcgPSBDYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlLmdldChVUkwucXVlcnk/LnYpID8/IFVSTC5xdWVyeS5sYW5nOyAvLyDkuLvor63oqIBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgVVJMLnF1ZXJ5Py50bGFuZyAvLyDljp/lrZfluZVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwidXJsXCI6IFVSSS5zdHJpbmdpZnkoVVJMKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiaGVhZGVyc1wiOiAkcmVxdWVzdC5oZWFkZXJzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXF1ZXN0cy5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiTmV0ZmxpeFwiOlxuXHRcdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBcIk5ldGZsaXhcIiwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIkJpbGliaWxpXCI6XG5cdFx0XHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIFwiQmlsaWJpbGlcIiwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJUcmFuc2xhdGVcIjpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIOe/u+ivkeWtl+W5lWAsIFwiXCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiRXh0ZXJuYWxcIjpcblx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIOWkluaMguWtl+W5lWAsIFwiXCIpO1xuXHRcdFx0XHRcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdFx0XCJ1cmxcIjogU2V0dGluZ3MuVVJMLFxuXHRcdFx0XHRcdFx0XCJoZWFkZXJzXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJBY2NlcHRcIjogXCIqLypcIixcblx0XHRcdFx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxMl8yIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi8xMi4xIE1vYmlsZS8xNUUxNDggU2FmYXJpLzYwNC4xXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHJlcXVlc3RzLnB1c2gocmVxdWVzdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0Ly8g5Yib5bu65a2X5bmVT2JqZWN0XG5cdFx0XHRsZXQgT3JpZ2luU3ViID0ge30sIFNlY29uZFN1YiA9IHt9O1xuXHRcdFx0Ly8g5qC85byP5Yik5patXG5cdFx0XHRzd2l0Y2ggKEZPUk1BVCkge1xuXHRcdFx0XHRjYXNlIHVuZGVmaW5lZDogLy8g6KeG5Li65pegYm9keVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI6XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3BsYWluXCI6XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L2h0bWxcIjpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtbXBlZ1VSTFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1tcGVndXJsXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybFwiOlxuXHRcdFx0XHRjYXNlIFwiYXVkaW8vbXBlZ3VybFwiOlxuXHRcdFx0XHRcdC8vYm9keSA9IE0zVTgucGFyc2UoJHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0Ly8kcmVzcG9uc2UuYm9keSA9IE0zVTguc3RyaW5naWZ5KGJvZHkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidGV4dC94bWxcIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvcGxpc3RcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3htbFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcGxpc3RcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtcGxpc3RcIjpcblx0XHRcdFx0XHRPcmlnaW5TdWIgPSBYTUwucGFyc2UoJHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYE9yaWdpblN1YjogJHtKU09OLnN0cmluZ2lmeShPcmlnaW5TdWIpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGZvciBhd2FpdCAobGV0IHJlcXVlc3Qgb2YgcmVxdWVzdHMpIHtcblx0XHRcdFx0XHRcdFNlY29uZFN1YiA9IGF3YWl0ICQuaHR0cC5nZXQocmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHRcdFNlY29uZFN1YiA9IFhNTC5wYXJzZShTZWNvbmRTdWIpO1xuXHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgU2Vjb25kU3ViOiAke0pTT04uc3RyaW5naWZ5KFNlY29uZFN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRPcmlnaW5TdWIgPSBDb21iaW5lRHVhbFN1YnMoT3JpZ2luU3ViLCBTZWNvbmRTdWIsIEZPUk1BVCwgVVJMLnF1ZXJ5Py5raW5kLCBTZXR0aW5ncy5PZmZzZXQsIFNldHRpbmdzLlRvbGVyYW5jZSwgU2V0dGluZ3MuUG9zaXRpb24pO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgT3JpZ2luU3ViOiAke0pTT04uc3RyaW5naWZ5KE9yaWdpblN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0JHJlc3BvbnNlLmJvZHkgPSBYTUwuc3RyaW5naWZ5KE9yaWdpblN1Yik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0ZXh0L3Z0dFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdnR0XCI6XG5cdFx0XHRcdFx0T3JpZ2luU3ViID0gVlRULnBhcnNlKCRyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgT3JpZ2luU3ViOiAke0pTT04uc3RyaW5naWZ5KE9yaWdpblN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0Zm9yIGF3YWl0IChsZXQgcmVxdWVzdCBvZiByZXF1ZXN0cykge1xuXHRcdFx0XHRcdFx0U2Vjb25kU3ViID0gYXdhaXQgJC5odHRwLmdldChyZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdFx0U2Vjb25kU3ViID0gVlRULnBhcnNlKFNlY29uZFN1Yik7XG5cdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgU2Vjb25kU3ViOiAke0pTT04uc3RyaW5naWZ5KFNlY29uZFN1Yil9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRPcmlnaW5TdWIgPSBDb21iaW5lRHVhbFN1YnMoT3JpZ2luU3ViLCBTZWNvbmRTdWIsIEZPUk1BVCwgVVJMLnF1ZXJ5Py5raW5kLCBTZXR0aW5ncy5PZmZzZXQsIFNldHRpbmdzLlRvbGVyYW5jZSwgU2V0dGluZ3MuUG9zaXRpb24pO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYE9yaWdpblN1YjogJHtKU09OLnN0cmluZ2lmeShPcmlnaW5TdWIpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdCRyZXNwb25zZS5ib2R5ID0gVlRULnN0cmluZ2lmeShPcmlnaW5TdWIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidGV4dC9qc29uXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9qc29uXCI6XG5cdFx0XHRcdFx0T3JpZ2luU3ViID0gSlNPTi5wYXJzZSgkcmVzcG9uc2UuYm9keSA/PyBcInt9XCIpO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYE9yaWdpblN1YjogJHtKU09OLnN0cmluZ2lmeShPcmlnaW5TdWIpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdGZvciBhd2FpdCAobGV0IHJlcXVlc3Qgb2YgcmVxdWVzdHMpIHtcblx0XHRcdFx0XHRcdFNlY29uZFN1YiA9IGF3YWl0ICQuaHR0cC5nZXQocmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHRcdFNlY29uZFN1YiA9IEpTT04ucGFyc2UoU2Vjb25kU3ViKTtcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYFNlY29uZFN1YjogJHtKU09OLnN0cmluZ2lmeShTZWNvbmRTdWIpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0T3JpZ2luU3ViID0gQ29tYmluZUR1YWxTdWJzKE9yaWdpblN1YiwgU2Vjb25kU3ViLCBGT1JNQVQsIFVSTC5xdWVyeT8ua2luZCwgU2V0dGluZ3MuT2Zmc2V0LCBTZXR0aW5ncy5Ub2xlcmFuY2UsIFNldHRpbmdzLlBvc2l0aW9uKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYE9yaWdpblN1YjogJHtKU09OLnN0cmluZ2lmeShPcmlnaW5TdWIpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdCRyZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoT3JpZ2luU3ViKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3Byb3RvYnVmXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLnByb3RvYnVmXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsZWNhdGlvbi9vY3RldC1zdHJlYW1cIjpcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGAkcmVzcG9uc2UuYm9keTogJHtKU09OLnN0cmluZ2lmeSgkcmVzcG9uc2UuYm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0Ly9sZXQgcmF3Qm9keSA9ICQuaXNRdWFuWCgpID8gbmV3IFVpbnQ4QXJyYXkoJHJlc3BvbnNlLmJvZHlCeXRlcyA/PyBbXSkgOiAkcmVzcG9uc2UuYm9keSA/PyBuZXcgVWludDhBcnJheSgpO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYGlzQnVmZmVyPyAke0FycmF5QnVmZmVyLmlzVmlldyhyYXdCb2R5KX06ICR7SlNPTi5zdHJpbmdpZnkocmF3Qm9keSl9YCwgXCJcIik7XG5cdFx0XHRcdFx0Ly8g5YaZ5YWl5LqM6L+b5Yi25pWw5o2uXG5cdFx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIOiwg+ivleS/oeaBr2AsIGByYXdCb2R5OiAke0pTT04uc3RyaW5naWZ5KHJhd0JvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdC8vaWYgKCQuaXNRdWFuWCgpKSAkcmVzcG9uc2UuYm9keUJ5dGVzID0gcmF3Qm9keVxuXHRcdFx0XHRcdC8vZWxzZSAkcmVzcG9uc2UuYm9keSA9IHJhd0JvZHk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBmYWxzZTpcblx0XHRcdGJyZWFrO1xuXHR9O1xufSkoKVxuXHQuY2F0Y2goKGUpID0+ICQubG9nRXJyKGUpKVxuXHQuZmluYWxseSgoKSA9PiB7XG5cdFx0c3dpdGNoICgkcmVzcG9uc2UpIHtcblx0XHRcdGRlZmF1bHQ6IHsgLy8g5pyJ5Zue5aSN5pWw5o2u77yM6L+U5Zue5Zue5aSN5pWw5o2uXG5cdFx0XHRcdC8vY29uc3QgRk9STUFUID0gKCRyZXNwb25zZT8uaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdID8/ICRyZXNwb25zZT8uaGVhZGVycz8uW1wiY29udGVudC10eXBlXCJdKT8uc3BsaXQoXCI7XCIpPy5bMF07XG5cdFx0XHRcdCQubG9nKGDwn46JICR7JC5uYW1lfSwgZmluYWxseWAsIGAkcmVzcG9uc2VgLCBgRk9STUFUOiAke0ZPUk1BVH1gLCBcIlwiKTtcblx0XHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIGZpbmFsbHlgLCBgJHJlc3BvbnNlOiAke0pTT04uc3RyaW5naWZ5KCRyZXNwb25zZSl9YCwgXCJcIik7XG5cdFx0XHRcdGlmICgkcmVzcG9uc2U/LmhlYWRlcnM/LltcIkNvbnRlbnQtRW5jb2RpbmdcIl0pICRyZXNwb25zZS5oZWFkZXJzW1wiQ29udGVudC1FbmNvZGluZ1wiXSA9IFwiaWRlbnRpdHlcIjtcblx0XHRcdFx0aWYgKCRyZXNwb25zZT8uaGVhZGVycz8uW1wiY29udGVudC1lbmNvZGluZ1wiXSkgJHJlc3BvbnNlLmhlYWRlcnNbXCJjb250ZW50LWVuY29kaW5nXCJdID0gXCJpZGVudGl0eVwiO1xuXHRcdFx0XHRpZiAoJC5pc1F1YW5YKCkpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKEZPUk1BVCkge1xuXHRcdFx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6IC8vIOinhuS4uuaXoGJvZHlcblx0XHRcdFx0XHRcdFx0Ly8g6L+U5Zue5pmu6YCa5pWw5o2uXG5cdFx0XHRcdFx0XHRcdCQuZG9uZSh7IHN0YXR1czogJHJlc3BvbnNlLnN0YXR1cywgaGVhZGVyczogJHJlc3BvbnNlLmhlYWRlcnMgfSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0Ly8g6L+U5Zue5pmu6YCa5pWw5o2uXG5cdFx0XHRcdFx0XHRcdCQuZG9uZSh7IHN0YXR1czogJHJlc3BvbnNlLnN0YXR1cywgaGVhZGVyczogJHJlc3BvbnNlLmhlYWRlcnMsIGJvZHk6ICRyZXNwb25zZS5ib2R5IH0pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtcHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLnByb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwY1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGMrcHJvdG9cIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsZWNhdGlvbi9vY3RldC1zdHJlYW1cIjpcblx0XHRcdFx0XHRcdFx0Ly8g6L+U5Zue5LqM6L+b5Yi25pWw5o2uXG5cdFx0XHRcdFx0XHRcdC8vJC5sb2coYCR7JHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlTGVuZ3RofS0tLSR7JHJlc3BvbnNlLmJvZHlCeXRlcy5idWZmZXIuYnl0ZUxlbmd0aH1gKTtcblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycywgYm9keUJ5dGVzOiAkcmVzcG9uc2UuYm9keUJ5dGVzLmJ1ZmZlci5zbGljZSgkcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVPZmZzZXQsICRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZUxlbmd0aCArICRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCkgfSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0gZWxzZSAkLmRvbmUoJHJlc3BvbnNlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0Y2FzZSB1bmRlZmluZWQ6IHsgLy8g5peg5Zue5aSN5pWw5o2uXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9KVxuXG4vKioqKioqKioqKioqKioqKiogRnVuY3Rpb24gKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIEdldCBQbGF5bGlzdCBDYWNoZVxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFJlcXVlc3QgVVJMIC8gTWFzdGVyIFBsYXlsaXN0IFVSTFxuICogQHBhcmFtIHtNYXB9IGNhY2hlIC0gUGxheWxpc3QgQ2FjaGVcbiAqIEBwYXJhbSB7QXJyYXl9IGxhbmd1YWdlcyAtIExhbmd1YWdlc1xuICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fSB7IG1hc3RlclBsYXlsaXN0VVJMLCBzdWJ0aXRsZXNQbGF5bGlzdCwgc3VidGl0bGVzUGxheWxpc3RJbmRleCB9XG4gKi9cbmZ1bmN0aW9uIGdldFBsYXlsaXN0Q2FjaGUodXJsLCBjYWNoZSwgbGFuZ3VhZ2VzKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBnZXRQbGF5bGlzdENhY2hlYCwgXCJcIik7XG5cdGxldCBtYXN0ZXJQbGF5bGlzdFVSTCA9IFwiXCI7XG5cdGxldCBzdWJ0aXRsZXNQbGF5bGlzdCA9IHt9O1xuXHRsZXQgc3VidGl0bGVzUGxheWxpc3RJbmRleCA9IDA7XG5cdGNhY2hlPy5mb3JFYWNoKChWYWx1ZSwgS2V5KSA9PiB7XG5cdFx0bGFuZ3VhZ2VzPy5mb3JFYWNoKGxhbmd1YWdlID0+IHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KFZhbHVlPy5bbGFuZ3VhZ2VdKSkge1xuXHRcdFx0XHRsZXQgQXJyYXkgPSBWYWx1ZT8uW2xhbmd1YWdlXTtcblx0XHRcdFx0aWYgKEFycmF5Py5zb21lKChPYmplY3QsIEluZGV4KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHVybC5pbmNsdWRlcyhPYmplY3Q/LlVSSSB8fCBPYmplY3Q/Lk9QVElPTj8uVVJJIHx8IG51bGwpKSB7XG5cdFx0XHRcdFx0XHRzdWJ0aXRsZXNQbGF5bGlzdEluZGV4ID0gSW5kZXg7XG5cdFx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIGdldFBsYXlsaXN0Q2FjaGVgLCBgc3VidGl0bGVzUGxheWxpc3RJbmRleDogJHtzdWJ0aXRsZXNQbGF5bGlzdEluZGV4fWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSkpIHtcblx0XHRcdFx0XHRtYXN0ZXJQbGF5bGlzdFVSTCA9IEtleTtcblx0XHRcdFx0XHRzdWJ0aXRsZXNQbGF5bGlzdCA9IFZhbHVlO1xuXHRcdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBnZXRQbGF5bGlzdENhY2hlYCwgYG1hc3RlclBsYXlsaXN0VVJMOiAke21hc3RlclBsYXlsaXN0VVJMfWAsIGBzdWJ0aXRsZXNQbGF5bGlzdDogJHtKU09OLnN0cmluZ2lmeShzdWJ0aXRsZXNQbGF5bGlzdCl9YCwgXCJcIik7XG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9KTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIGdldFBsYXlsaXN0Q2FjaGVgLCBgbWFzdGVyUGxheWxpc3RVUkw6ICR7SlNPTi5zdHJpbmdpZnkobWFzdGVyUGxheWxpc3RVUkwpfWAsIFwiXCIpO1xuXHRyZXR1cm4geyBtYXN0ZXJQbGF5bGlzdFVSTCwgc3VidGl0bGVzUGxheWxpc3QsIHN1YnRpdGxlc1BsYXlsaXN0SW5kZXggfTtcbn07XG5cbi8qKlxuICogR2V0IFN1YnRpdGxlcyBDYWNoZVxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFJlcXVlc3QgVVJMIC8gU3VidGl0bGVzIFVSTFxuICogQHBhcmFtIHtNYXB9IGNhY2hlIC0gU3VidGl0bGVzIENhY2hlXG4gKiBAcGFyYW0ge0FycmF5fSBsYW5ndWFnZXMgLSBMYW5ndWFnZXNcbiAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn0geyBzdWJ0aXRsZXNQbGF5bGlzdFVSTCwgc3VidGl0bGVzLCBzdWJ0aXRsZXNJbmRleCB9XG4gKi9cbmZ1bmN0aW9uIGdldFN1YnRpdGxlc0NhY2hlKHVybCwgY2FjaGUsIGxhbmd1YWdlcykge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgZ2V0U3VidGl0bGVzQ2FjaGVgLCBcIlwiKTtcblx0bGV0IHN1YnRpdGxlc1BsYXlsaXN0VVJMID0gXCJcIjtcblx0bGV0IHN1YnRpdGxlcyA9IFtdO1xuXHRsZXQgc3VidGl0bGVzSW5kZXggPSAwO1xuXHRjYWNoZT8uZm9yRWFjaCgoVmFsdWUsIEtleSkgPT4ge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KFZhbHVlKSkge1xuXHRcdFx0bGV0IEFycmF5ID0gVmFsdWU7XG5cdFx0XHRpZiAoQXJyYXk/LnNvbWUoKFN0cmluZywgSW5kZXgpID0+IHtcblx0XHRcdFx0aWYgKHVybC5pbmNsdWRlcyhTdHJpbmcgfHwgbnVsbCkpIHtcblx0XHRcdFx0XHRzdWJ0aXRsZXNJbmRleCA9IEluZGV4O1xuXHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwgZ2V0U3VidGl0bGVzQ2FjaGVgLCBgc3VidGl0bGVzSW5kZXg6ICR7c3VidGl0bGVzSW5kZXh9YCwgXCJcIik7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gZWxzZSByZXR1cm4gZmFsc2U7XG5cdFx0XHR9KSkge1xuXHRcdFx0XHRzdWJ0aXRsZXNQbGF5bGlzdFVSTCA9IEtleTtcblx0XHRcdFx0c3VidGl0bGVzID0gVmFsdWU7XG5cdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBnZXRTdWJ0aXRsZXNDYWNoZSwgc3VidGl0bGVzUGxheWxpc3RVUkw6ICR7c3VidGl0bGVzUGxheWxpc3RVUkx9YCwgXCJcIik7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0pO1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgZ2V0U3VidGl0bGVzQ2FjaGUsIHN1YnRpdGxlc1BsYXlsaXN0VVJMOiAke3N1YnRpdGxlc1BsYXlsaXN0VVJMfWAsIFwiXCIpO1xuXHRyZXR1cm4geyBzdWJ0aXRsZXNQbGF5bGlzdFVSTCwgc3VidGl0bGVzLCBzdWJ0aXRsZXNJbmRleCB9O1xufTtcblxuLyoqXG4gKiBHZXQgU3VidGl0bGVzIEFycmF5XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gUmVxdWVzdCBVUkwgLyBNYXN0ZXIgUGxheWxpc3QgVVJMXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBTdWJ0aXRsZXMgUGxheWxpc3QgSW5kZXhcbiAqIEBwYXJhbSB7TWFwfSBwbGF5bGlzdHNDYWNoZSAtIFBsYXlsaXN0cyBDYWNoZVxuICogQHBhcmFtIHtNYXB9IHN1YnRpdGxlc0NhY2hlIC0gU3VidGl0bGVzIENhY2hlXG4gKiBAcGFyYW0ge0FycmF5fSBsYW5ndWFnZXMgLSBMYW5ndWFnZXNcbiAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn0geyBzdWJ0aXRsZXNVUklBcnJheTAsIHN1YnRpdGxlc1VSSUFycmF5MSB9XG4gKi9cbmZ1bmN0aW9uIGdldFN1YnRpdGxlc0FycmF5KHVybCwgaW5kZXgsIHBsYXlsaXN0c0NhY2hlLCBzdWJ0aXRsZXNDYWNoZSwgbGFuZ3VhZ2VzKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBnZXRTdWJ0aXRsZXNBcnJheWAsIFwiXCIpO1xuXHRjb25zdCBzdWJ0aXRsZXNQbGF5bGlzdFZhbHVlID0gcGxheWxpc3RzQ2FjaGU/LmdldCh1cmwpIHx8IHt9O1xuXHRsZXQgc3VidGl0bGVzUGxheWxpc3RVUkwwID0gc3VidGl0bGVzUGxheWxpc3RWYWx1ZT8uW2xhbmd1YWdlc1swXV0/LltpbmRleF0/LlVSTCB8fCBzdWJ0aXRsZXNQbGF5bGlzdFZhbHVlPy5bbGFuZ3VhZ2VzWzBdXT8uWzBdPy5VUkw7XG5cdGxldCBzdWJ0aXRsZXNQbGF5bGlzdFVSTDEgPSBzdWJ0aXRsZXNQbGF5bGlzdFZhbHVlPy5bbGFuZ3VhZ2VzWzFdXT8uW2luZGV4XT8uVVJMIHx8IHN1YnRpdGxlc1BsYXlsaXN0VmFsdWU/LltsYW5ndWFnZXNbMV1dPy5bMF0/LlVSTDtcblx0JC5sb2coYPCfmqcgJHskLm5hbWV9LCBnZXRTdWJ0aXRsZXNBcnJheWAsIGBzdWJ0aXRsZXNQbGF5bGlzdFVSTDA6ICR7c3VidGl0bGVzUGxheWxpc3RVUkwwfSwgc3VidGl0bGVzUGxheWxpc3RVUkwxOiAke3N1YnRpdGxlc1BsYXlsaXN0VVJMMX1gLCBcIlwiKTtcblx0Ly8g5p+l5om+5a2X5bmV5paH5Lu25Zyw5Z2AdnR057yT5a2Y77yIbWFw77yJXG5cdGxldCBzdWJ0aXRsZXNVUklBcnJheTAgPSBzdWJ0aXRsZXNDYWNoZS5nZXQoc3VidGl0bGVzUGxheWxpc3RVUkwwKSB8fCBbXTtcblx0bGV0IHN1YnRpdGxlc1VSSUFycmF5MSA9IHN1YnRpdGxlc0NhY2hlLmdldChzdWJ0aXRsZXNQbGF5bGlzdFVSTDEpIHx8IFtdO1xuXHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgZ2V0U3VidGl0bGVzQXJyYXlgLCBgc3VidGl0bGVzVVJJQXJyYXkwOiAke0pTT04uc3RyaW5naWZ5KHN1YnRpdGxlc1VSSUFycmF5MCl9LCBzdWJ0aXRsZXNVUklBcnJheTE6ICR7SlNPTi5zdHJpbmdpZnkoc3VidGl0bGVzVVJJQXJyYXkxKX1gLCBcIlwiKTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIGdldFN1YnRpdGxlc0FycmF5YCwgXCJcIik7XG5cdHJldHVybiB7IHN1YnRpdGxlc1VSSUFycmF5MCwgc3VidGl0bGVzVVJJQXJyYXkxIH07XG59O1xuXG4vKipcbiAqIEdldCBTdWJ0aXRsZXMgRmlsZU5hbWVcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBSZXF1ZXN0IFVSTCAvIFN1YnRpdGxlcyBVUkxcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbGF0Zm9ybSAtIFBsYXRmb3JtIE5hbWVcbiAqIEByZXR1cm4ge1N0cmluZzwqPn0gZmlsZU5hbWVcbiAqL1xuZnVuY3Rpb24gZ2V0U3VidGl0bGVzRmlsZU5hbWUodXJsLCBwbGF0Zm9ybSkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgR2V0IFN1YnRpdGxlcyBGaWxlTmFtZWAsIGB1cmw6ICR7dXJsfWAsIFwiXCIpO1xuXHRsZXQgZmlsZU5hbWUgPSB1bmRlZmluZWQ7XG5cdHN3aXRjaCAocGxhdGZvcm0pIHtcblx0XHRjYXNlIFwiQXBwbGVcIjpcblx0XHRcdGZpbGVOYW1lID0gcmVxdWVzdC51cmwubWF0Y2goLy4rXyhzdWJ0aXRsZXMoX1ZcXGQpPy1cXGQrXFwud2VidnR0KVxcPyguKilzdWJ0eXBlPS8pWzFdOyAvLyBBcHBsZSDniYfmrrXliIblnovluo/lj7fkuI3lkIxcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJEaXNuZXkrXCI6XG5cdFx0XHRmaWxlTmFtZSA9IHJlcXVlc3QudXJsLm1hdGNoKC8oW15cXC9dK1xcLnZ0dClcXD8oLiopc3VidHlwZT0vKVsxXTsgLy8gRGlzbmV5KyDniYfmrrXlkI3np7Dnm7jlkIxcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJIdWx1XCI6XG5cdFx0XHRmaWxlTmFtZSA9IHJlcXVlc3QudXJsLm1hdGNoKC8uK18oU0VHTUVOVFxcZCtfLitcXC52dHQpXFw/KC4qKXN1YnR5cGU9LylbMV07IC8vIEh1bHUg54mH5q615YiG5Z6L5bqP5Y+355u45ZCMXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiUHJpbWVWaWRlb1wiOlxuXHRcdGNhc2UgXCJIQk9NYXhcIjpcblx0XHRkZWZhdWx0OlxuXHRcdFx0ZmlsZU5hbWUgPSBudWxsOyAvLyBBbWF6b24gUHJpbWUgVmlkZW8gSEJPX01heOS4jeaLhuWIhuWtl+W5leeJh+autVxuXHRcdFx0YnJlYWs7XG5cdH07XG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBHZXQgU3VidGl0bGVzIEZpbGVOYW1lYCwgYGZpbGVOYW1lOiAke2ZpbGVOYW1lfWAsIFwiXCIpO1xuXHRyZXR1cm4gZmlsZU5hbWU7XG59O1xuXG4vKipcbiAqIENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWVcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlTmFtZSAtIFJlcXVlc3QgVVJMXG4gKiBAcGFyYW0ge0FycmF5fSBWVFRzMSAtIFByaW1hcnkgKFNvdXJjZSkgTGFuZ3VhZ2UgU3VidGl0bGVzIEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBWVFRzMiAtIFNlY29uZCAoVGFyZ2V0KSBMYW5ndWFnZSBTdWJ0aXRsZXMgQXJyYXlcbiAqIEByZXR1cm4ge0FycmF5PCo+fSBTdWJ0aXRsZXMgUmVxdWVzdHMgUXVldWVcbiAqL1xuZnVuY3Rpb24gY29uc3RydWN0U3VidGl0bGVzUXVldWUocmVxdWVzdCwgZmlsZU5hbWUsIFZUVHMxID0gW10sIFZUVHMyID0gW10pIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwgZmlsZU5hbWU6ICR7ZmlsZU5hbWV9YCwgXCJcIik7XG5cdGxldCByZXF1ZXN0cyA9IFtdO1xuXHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwgVlRUczEubGVuZ3RoOiAke1ZUVHMxLmxlbmd0aH0sIFZUVHMyLmxlbmd0aDogJHtWVFRzMi5sZW5ndGh9YCwgXCJcIilcblx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwgVlRUczE6ICR7SlNPTi5zdHJpbmdpZnkoVlRUczEpfSwgVlRUczIubGVuZ3RoOiAke0pTT04uc3RyaW5naWZ5KFZUVHMyKX1gLCBcIlwiKVxuXHQvLyDmn6Xor6LlvZPliY3lrZfluZXlnKjljp/lrZfluZXpmJ/liJfkuK3nmoTkvY3nva5cblx0Y29uc3QgSW5kZXgxID0gVlRUczEuZmluZEluZGV4KGl0ZW0gPT4gaXRlbT8uaW5jbHVkZXMoZmlsZU5hbWUpKTtcblx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIEluZGV4MTogJHtJbmRleDF9YCwgXCJcIik7XG5cdHN3aXRjaCAoVlRUczIubGVuZ3RoKSB7XG5cdFx0Y2FzZSAwOiAvLyDplb/luqbkuLow77yM5peg6aG76K6h566XXG5cdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCDplb/luqbkuLogMGAsIFwiXCIpXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDE6IHsgLy8g6ZW/5bqm5Li6Me+8jOaXoOmhu+iuoeeul1xuXHRcdFx0JC5sb2coYOKaoCAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwg6ZW/5bqm5Li6IDFgLCBcIlwiKVxuXHRcdFx0bGV0IHJlcXVlc3QyID0ge1xuXHRcdFx0XHRcInVybFwiOiBWVFRzMlswXSxcblx0XHRcdFx0XCJoZWFkZXJzXCI6IHJlcXVlc3QuaGVhZGVyc1xuXHRcdFx0fTtcblx0XHRcdHJlcXVlc3RzLnB1c2gocmVxdWVzdDIpO1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRjYXNlIFZUVHMxLmxlbmd0aDogeyAvLyDplb/luqbnm7jnrYnvvIzkuIDkuIDlr7nlupTvvIzml6DpobvorqHnrpdcblx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIOmVv+W6puebuOetiWAsIFwiXCIpXG5cdFx0XHRsZXQgcmVxdWVzdDIgPSB7XG5cdFx0XHRcdFwidXJsXCI6IFZUVHMyW0luZGV4MV0sXG5cdFx0XHRcdFwiaGVhZGVyc1wiOiByZXF1ZXN0LmhlYWRlcnNcblx0XHRcdH07XG5cdFx0XHRyZXF1ZXN0cy5wdXNoKHJlcXVlc3QyKTtcblx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0ZGVmYXVsdDogeyAvLyDplb/luqbkuI3nrYnvvIzpnIDopoHorqHnrpdcblx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIOmVv+W6puS4jeetie+8jOmcgOimgeiuoeeul2AsIFwiXCIpXG5cdFx0XHQvLyDorqHnrpflvZPliY3lrZfluZXlnKjljp/lrZfluZXpmJ/liJfkuK3nmoTnmb7liIbmr5Rcblx0XHRcdGNvbnN0IFBvc2l0aW9uMSA9IChJbmRleDEgKyAxKSAvIFZUVHMxLmxlbmd0aDsgLy8g5LuOIDAg5byA5aeL6K6h5pWw77yM5omA5Lul6KaB5YqgIDFcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCBQb3NpdGlvbjE6ICR7UG9zaXRpb24xfSwgSW5kZXgyOiAke0luZGV4MX0vJHtWVFRzMS5sZW5ndGh9YCwgXCJcIik7XG5cdFx0XHQvLyDmoLnmja7nmb7liIbmr5TorqHnrpflvZPliY3lrZfluZXlnKjmlrDlrZfluZXpmJ/liJfkuK3nmoTkvY3nva5cblx0XHRcdC8vbGV0IEluZGV4MiA9IFZUVHMyLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaW5jbHVkZXMoZmlsZU5hbWUpKTtcblx0XHRcdGNvbnN0IEluZGV4MiA9IE1hdGgucm91bmQoUG9zaXRpb24xICogVlRUczIubGVuZ3RoIC0gMSk7IC8vIOS7jiAwIOW8gOWni+iuoeaVsO+8jOaJgOS7peimgeWHjyAxXG5cdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZSwgUG9zaXRpb24yOiAke1Bvc2l0aW9uMX0sIEluZGV4MjogJHtJbmRleDJ9LyR7VlRUczIubGVuZ3RofWAsIFwiXCIpO1xuXHRcdFx0Ly8g6I635Y+W5Lik5a2X5bmV6Zif5YiX6ZW/5bqm5beu5YC8XG5cdFx0XHRjb25zdCBkaWZmTGVuZ3RoID0gVlRUczIubGVuZ3RoIC0gVlRUczEubGVuZ3RoO1xuXHRcdFx0Ly8g6I635Y+W5b2T5YmN5a2X5bmV5Zyo5paw5a2X5bmV6Zif5YiX5Lit55qE5YmN5ZCOMeS4quWtl+W5lVxuXHRcdFx0Ly9jb25zdCBCZWdpbkluZGV4ID0gKEluZGV4MiAtIDEgPCAwKSA/IDAgOiBJbmRleDIgLSAxLCBFbmRJbmRleCA9IEluZGV4MiArIDE7XG5cdFx0XHRjb25zdCBCZWdpbkluZGV4ID0gKEluZGV4MiA+IEluZGV4MSkgPyBJbmRleDEgOiBJbmRleDI7XG5cdFx0XHRjb25zdCBFbmRJbmRleCA9IChJbmRleDIgPiBJbmRleDEpID8gSW5kZXgyIDogSW5kZXgxO1xuXHRcdFx0JC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIGRpZmZMZW5ndGg6ICR7ZGlmZkxlbmd0aH0sIEJlZ2luSW5kZXg6ICR7QmVnaW5JbmRleH0sIEVuZEluZGV4OiAke0VuZEluZGV4fWAsIFwiXCIpO1xuXHRcdFx0Y29uc3QgbmVhcmx5VlRUcyA9IChkaWZmTGVuZ3RoIDwgMCkgPyBWVFRzMi5zbGljZSgoQmVnaW5JbmRleCA8IGRpZmZMZW5ndGgpID8gMCA6IEJlZ2luSW5kZXggLSBkaWZmTGVuZ3RoLCBFbmRJbmRleCArIDEpXG5cdFx0XHRcdDogVlRUczIuc2xpY2UoQmVnaW5JbmRleCwgRW5kSW5kZXggKyBkaWZmTGVuZ3RoICsgMSk7IC8vIHNsaWNlIOS4jeWPliBFbmRJbmRleCDmnKzouqtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBDb25zdHJ1Y3QgU3VidGl0bGVzIFF1ZXVlLCBuZWFybHlWVFRzOiAke0pTT04uc3RyaW5naWZ5KG5lYXJseVZUVHMpfWAsIFwiXCIpO1xuXHRcdFx0bmVhcmx5VlRUcy5mb3JFYWNoKHVybCA9PiB7XG5cdFx0XHRcdGxldCByZXF1ZXN0MiA9IHtcblx0XHRcdFx0XHRcInVybFwiOiB1cmwsXG5cdFx0XHRcdFx0XCJoZWFkZXJzXCI6IHJlcXVlc3QuaGVhZGVyc1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXF1ZXN0cy5wdXNoKHJlcXVlc3QyKTtcblx0XHRcdH0pO1xuXHRcdFx0Lypcblx0XHRcdHJlcXVlc3RzID0gbmVhcmx5VlRUcy5tYXAodXJsID0+IHtcblx0XHRcdFx0bGV0IF9yZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdFwidXJsXCI6IHVybCxcblx0XHRcdFx0XHRcImhlYWRlcnNcIjogcmVxdWVzdC5oZWFkZXJzXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiBfcmVxdWVzdDtcblx0XHRcdH0pO1xuXHRcdFx0Ki9cblx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdH07XG5cdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9YCwgYENvbnN0cnVjdCBTdWJ0aXRsZXMgUXVldWUsIHJlcXVlc3RzOiAke0pTT04uc3RyaW5naWZ5KHJlcXVlc3RzKX1gLCBcIlwiKTtcblx0JC5sb2coYOKchSAkeyQubmFtZX1gLCBgQ29uc3RydWN0IFN1YnRpdGxlcyBRdWV1ZWAsIFwiXCIpO1xuXHRyZXR1cm4gcmVxdWVzdHM7XG59O1xuXG4vKiogXG4gKiBDb21iaW5lIER1YWwgU3VidGl0bGVzXG4gKiBAcGFyYW0ge09iamVjdH0gU3ViMSAtIFN1YjFcbiAqIEBwYXJhbSB7T2JqZWN0fSBTdWIyIC0gU3ViMlxuICogQHBhcmFtIHtBcnJheX0gRm9ybWF0IC0gb3B0aW9ucyA9IFtcImpzb25cIiwgXCJzcnYzXCIsIFwidnR0XCJdXG4gKiBAcGFyYW0ge0FycmF5fSBLaW5kIC0gb3B0aW9ucyA9IFtcImFzclwiLCBcImNhcHRpb25zXCJdXG4gKiBAcGFyYW0ge051bWJlcn0gT2Zmc2V0IC0gT2Zmc2V0XG4gKiBAcGFyYW0ge051bWJlcn0gVG9sZXJhbmNlIC0gVG9sZXJhbmNlXG4gKiBAcGFyYW0ge0FycmF5fSBQb3NpdGlvbiAtIFBvc2l0aW9uID0gW1wiRm9yd2FyZFwiLCBcIlJldmVyc2VcIl1cbiAqIEByZXR1cm4ge1N0cmluZ30gRHVhbFN1YlxuICovXG5mdW5jdGlvbiBDb21iaW5lRHVhbFN1YnMoU3ViMSA9IHt9LCBTdWIyID0ge30sIEZvcm1hdCA9IFwidGV4dC92dHRcIiwgS2luZCA9IFwiY2FwdGlvbnNcIiwgT2Zmc2V0ID0gMCwgVG9sZXJhbmNlID0gMCwgUG9zaXRpb24gPSBcIkZvcndhcmRcIikge1xuXHQkLmxvZyhg4pqgICR7JC5uYW1lfSwgQ29tYmluZSBEdWFsIFN1YnRpdGxlc2AsIGBPZmZzZXQ6JHtPZmZzZXR9LCBUb2xlcmFuY2U6JHtUb2xlcmFuY2V9LCBQb3NpdGlvbjoke1Bvc2l0aW9ufWAsIFwiXCIpO1xuXHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgQ29tYmluZSBEdWFsIFN1YnRpdGxlc2AsYFN1YjHlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoU3ViMSl9YCwgXCJcIik7XG5cdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBDb21iaW5lIER1YWwgU3VidGl0bGVzYCxgU3ViMuWGheWuuTogJHtKU09OLnN0cmluZ2lmeShTdWIyKX1gLCBcIlwiKTtcblx0Ly9sZXQgRHVhbFN1YiA9IFBvc2l0aW9uLmluY2x1ZGVzKFwiUmV2ZXJzZVwiKSA/IFN1YjIgOiBTdWIxXG5cdGxldCBEdWFsU3ViID0gU3ViMTtcblx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIENvbWJpbmUgRHVhbCBTdWJ0aXRsZXNgLGBsZXQgRHVhbFN1YuWGheWuuTogJHtKU09OLnN0cmluZ2lmeShEdWFsU3ViKX1gLCBcIlwiKTtcblx0Ly8g5pyJ5bqP5pWw5YiXIOeUqOS4jeedgOaOkuW6j1xuXHQvL0ZpcnN0U3ViLmJvZHkuc29ydCgoeCwgeSkgPT4geCAtIHkpO1xuXHQvL1NlY29uZFN1Yi5ib2R5LnNvcnQoKHgsIHkpID0+IHggLSB5KTtcblx0bGV0IGluZGV4MCA9IDAsIGluZGV4MSA9IDAsIGluZGV4MiA9IDA7XG5cdC8vIOWPjOaMh+mSiOazleafpeaJvuS4pOS4quaVsOe7hOS4reeahOebuOWQjOWFg+e0oFxuXHRzd2l0Y2ggKEZvcm1hdCkge1xuXHRcdGNhc2UgXCJ0ZXh0L2pzb25cIjpcblx0XHRjYXNlIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG5cdFx0XHRjb25zdCBsZW5ndGgxID0gU3ViMT8uZXZlbnRzPy5sZW5ndGgsIGxlbmd0aDIgPSBTdWIyPy5ldmVudHM/Lmxlbmd0aDtcblx0XHRcdHN3aXRjaCAoS2luZCkge1xuXHRcdFx0XHRjYXNlIFwiYXNyXCI6XG5cdFx0XHRcdFx0Ly8g6Ieq5Yqo55Sf5oiQ5a2X5bmV6L2s5pmu6YCa5a2X5bmVXG5cdFx0XHRcdFx0JC5sb2coYPCfmqdgLCBgRHVhbFN1YuaYr+iHquWKqOeUn+aIkOWtl+W5lWAsIFwiXCIpO1xuXHRcdFx0XHRcdGluZGV4MCA9IDEsIGluZGV4MSA9IDEsIGluZGV4MiA9IDE7XG5cdFx0XHRcdFx0U3ViMS5ldmVudHMgPSBTdWIxLmV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50Py5zZWdzKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGV2ZW50Py5zZWdzKSkgZXZlbnQuc2VncyA9IFt7IFwidXRmOFwiOiBldmVudC5zZWdzLm1hcChzZWcgPT4gc2VnLnV0ZjgpLmpvaW4oXCJcIikgfV07XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0ZGVsZXRlIGV2ZW50LndXaW5JZDtcblx0XHRcdFx0XHRcdHJldHVybiBldmVudDtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRTdWIyLmV2ZW50cyA9IFN1YjIuZXZlbnRzLm1hcChldmVudCA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQ/LnNlZ3MpIHtcblx0XHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZXZlbnQ/LnNlZ3MpKSBldmVudC5zZWdzID0gW3sgXCJ1dGY4XCI6IGV2ZW50LnNlZ3MubWFwKHNlZyA9PiBzZWcudXRmOCkuam9pbihcIlwiKSB9XTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRkZWxldGUgZXZlbnQud1dpbklkO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGV2ZW50O1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vYnJlYWs7IOS4jeimgWJyZWFr77yM6L+e57ut5aSE55CGXG5cdFx0XHRcdGNhc2UgXCJjYXB0aW9uc1wiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIOWkhOeQhuaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdHdoaWxlIChpbmRleDEgPCBsZW5ndGgxICYmIGluZGV4MiA8IGxlbmd0aDIpIHtcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgaW5kZXgxL2xlbmd0aDE6ICR7aW5kZXgxfS8ke2xlbmd0aDF9YCwgYGluZGV4Mi9sZW5ndGgyOiAke2luZGV4Mn0vJHtsZW5ndGgyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0Y29uc3QgdGltZVN0YW1wMSA9IFN1YjEuZXZlbnRzW2luZGV4MV0udFN0YXJ0TXMsIHRpbWVTdGFtcDIgPSBTdWIyLmV2ZW50c1tpbmRleDJdLnRTdGFydE1zO1xuXHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+ap2AsIGB0aW1lU3RhbXAxOiAke3RpbWVTdGFtcDF9YCwgYHRpbWVTdGFtcDI6ICR7dGltZVN0YW1wMn1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdGlmIChNYXRoLmFicyh0aW1lU3RhbXAxIC0gdGltZVN0YW1wMikgPD0gVG9sZXJhbmNlKSB7XG5cdFx0XHRcdFx0XHRcdC8vaW5kZXgwID0gKFBvc2l0aW9uID09PSBcIlJldmVyc2VcIikgPyBpbmRleDIgOiBpbmRleDE7XG5cdFx0XHRcdFx0XHRcdGluZGV4MCA9IGluZGV4MTtcblx0XHRcdFx0XHRcdFx0Ly8g5aSE55CG5pmu6YCa5a2X5bmVXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRleHQxID0gU3ViMS5ldmVudHNbaW5kZXgxXT8uc2Vncz8uWzBdLnV0ZjggPz8gXCJcIiwgdGV4dDIgPSBTdWIyLmV2ZW50c1tpbmRleDJdPy5zZWdzPy5bMF0udXRmOCA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnYCwgYHRleHQxOiAke3RleHQxfWAsIGB0ZXh0MjogJHt0ZXh0Mn1gLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0RHVhbFN1Yi5ldmVudHNbaW5kZXgwXS5zZWdzID0gW3sgXCJ1dGY4XCI6IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gYCR7dGV4dDJ9XFxuJHt0ZXh0MX1gIDogYCR7dGV4dDF9XFxuJHt0ZXh0Mn1gIH1dO1xuXHRcdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnYCwgYER1YWxTdWIuZXZlbnRzW2luZGV4MF0uc2Vnc1swXS51dGY4OiAke0R1YWxTdWIuZXZlbnRzW2luZGV4MF0uc2Vnc1swXS51dGY4fWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHQvL0R1YWxTdWIuYm9keVtpbmRleDBdLnRTdGFydE1zID0gKFBvc2l0aW9uID09PSBcIlJldmVyc2VcIikgPyB0aW1lU3RhbXAyIDogdGltZVN0YW1wMTtcblx0XHRcdFx0XHRcdFx0Ly9EdWFsU3ViLmJvZHlbaW5kZXgwXS5pbmRleCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gaW5kZXgyIDogaW5kZXgxO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGlmICh0aW1lU3RhbXAyID4gdGltZVN0YW1wMSkgaW5kZXgxKytcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHRpbWVTdGFtcDIgPCB0aW1lU3RhbXAxKSBpbmRleDIrK1xuXHRcdFx0XHRcdFx0ZWxzZSB7IGluZGV4MSsrOyBpbmRleDIrKyB9O1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0XHRjYXNlIFwidGV4dC94bWxcIjpcblx0XHRjYXNlIFwiYXBwbGljYXRpb24veG1sXCI6IHtcblx0XHRcdGNvbnN0IGxlbmd0aDEgPSBTdWIxPy50aW1lZHRleHQ/LmJvZHk/LnA/Lmxlbmd0aCwgbGVuZ3RoMiA9IFN1YjI/LnRpbWVkdGV4dD8uYm9keT8ucD8ubGVuZ3RoO1xuXHRcdFx0c3dpdGNoIChLaW5kKSB7XG5cdFx0XHRcdGNhc2UgXCJhc3JcIjpcblx0XHRcdFx0XHQvLyDoh6rliqjnlJ/miJDlrZfluZXovazmma7pgJrlrZfluZVcblx0XHRcdFx0XHQkLmxvZyhg8J+ap2AsIGBEdWFsU3Vi5piv6Ieq5Yqo55Sf5oiQ5a2X5bmVYCwgXCJcIik7XG5cdFx0XHRcdFx0RHVhbFN1Yi50aW1lZHRleHQuaGVhZC53cFsxXVtcIkByY1wiXSA9IFwiMVwiO1xuXHRcdFx0XHRcdFN1YjEudGltZWR0ZXh0LmJvZHkucCA9IFN1YjEudGltZWR0ZXh0LmJvZHkucC5tYXAocGFyYSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocGFyYT8ucykge1xuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXJhPy5zKSkgcGFyYVtcIiNcIl0gPSBwYXJhPy5zLm1hcChzZWcgPT4gc2VnW1wiI1wiXSkuam9pbihcIlwiKTtcblx0XHRcdFx0XHRcdFx0ZWxzZSBwYXJhW1wiI1wiXSA9IHBhcmEucz8uW1wiI1wiXSA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgcGFyYS5zO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJldHVybiBwYXJhO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFN1YjIudGltZWR0ZXh0LmJvZHkucCA9IFN1YjIudGltZWR0ZXh0LmJvZHkucC5tYXAocGFyYSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocGFyYT8ucykge1xuXHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXJhPy5zKSkgcGFyYVtcIiNcIl0gPSBwYXJhPy5zLm1hcChzZWcgPT4gc2VnW1wiI1wiXSkuam9pbihcIlwiKTtcblx0XHRcdFx0XHRcdFx0ZWxzZSBwYXJhW1wiI1wiXSA9IHBhcmEucz8uW1wiI1wiXSA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgcGFyYS5zO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJldHVybiBwYXJhO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vYnJlYWs7IOS4jeimgWJyZWFr77yM6L+e57ut5aSE55CGXG5cdFx0XHRcdGNhc2UgXCJjYXB0aW9uc1wiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIOWkhOeQhuaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdHdoaWxlIChpbmRleDEgPCBsZW5ndGgxICYmIGluZGV4MiA8IGxlbmd0aDIpIHtcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgaW5kZXgxL2xlbmd0aDE6ICR7aW5kZXgxfS8ke2xlbmd0aDF9YCwgYGluZGV4Mi9sZW5ndGgyOiAke2luZGV4Mn0vJHtsZW5ndGgyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0Y29uc3QgdGltZVN0YW1wMSA9IHBhcnNlSW50KFN1YjEudGltZWR0ZXh0LmJvZHkucFtpbmRleDFdW1wiQHRcIl0sIDEwKSwgdGltZVN0YW1wMiA9IHBhcnNlSW50KFN1YjIudGltZWR0ZXh0LmJvZHkucFtpbmRleDJdW1wiQHRcIl0sIDEwKTtcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgdGltZVN0YW1wMTogJHt0aW1lU3RhbXAxfWAsIGB0aW1lU3RhbXAyOiAke3RpbWVTdGFtcDJ9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRpZiAoTWF0aC5hYnModGltZVN0YW1wMSAtIHRpbWVTdGFtcDIpIDw9IFRvbGVyYW5jZSkge1xuXHRcdFx0XHRcdFx0XHQvL2luZGV4MCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gaW5kZXgyIDogaW5kZXgxO1xuXHRcdFx0XHRcdFx0XHRpbmRleDAgPSBpbmRleDE7XG5cdFx0XHRcdFx0XHRcdC8vIOWkhOeQhuaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdFx0XHRjb25zdCB0ZXh0MSA9IFN1YjEudGltZWR0ZXh0LmJvZHkucFtpbmRleDFdPy5bXCIjXCJdID8/IFwiXCIsIHRleHQyID0gU3ViMi50aW1lZHRleHQuYm9keS5wW2luZGV4Ml0/LltcIiNcIl0gPz8gXCJcIjtcblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+ap2AsIGB0ZXh0MTogJHt0ZXh0MX1gLCBgdGV4dDI6ICR7dGV4dDJ9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdER1YWxTdWIudGltZWR0ZXh0LmJvZHkucFtpbmRleDBdW1wiI1wiXSA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gYCR7dGV4dDJ9JiN4MDAwQTske3RleHQxfWAgOiBgJHt0ZXh0MX0mI3gwMDBBOyR7dGV4dDJ9YDtcblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+ap2AsIGBEdWFsU3ViLnRpbWVkdGV4dC5ib2R5LnBbaW5kZXgwXVtcIiNcIl06ICR7RHVhbFN1Yi50aW1lZHRleHQuYm9keS5wW2luZGV4MF1bXCIjXCJdfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0XHQvL0R1YWxTdWIudGltZWR0ZXh0LmJvZHkucFtpbmRleDBdW1wiQHRcIl0gPSAoUG9zaXRpb24gPT09IFwiUmV2ZXJzZVwiKSA/IHRpbWVTdGFtcDIgOiB0aW1lU3RhbXAxO1xuXHRcdFx0XHRcdFx0XHQvL0R1YWxTdWIudGltZWR0ZXh0LmJvZHkucFtpbmRleDBdLmluZGV4ID0gKFBvc2l0aW9uID09PSBcIlJldmVyc2VcIikgPyBpbmRleDIgOiBpbmRleDE7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0aWYgKHRpbWVTdGFtcDIgPiB0aW1lU3RhbXAxKSBpbmRleDErK1xuXHRcdFx0XHRcdFx0ZWxzZSBpZiAodGltZVN0YW1wMiA8IHRpbWVTdGFtcDEpIGluZGV4MisrXG5cdFx0XHRcdFx0XHRlbHNlIHsgaW5kZXgxKys7IGluZGV4MisrIH07XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdGNhc2UgXCJ0ZXh0L3Z0dFwiOlxuXHRcdGNhc2UgXCJhcHBsaWNhdGlvbi92dHRcIjoge1xuXHRcdFx0Y29uc3QgbGVuZ3RoMSA9IFN1YjE/LmJvZHk/Lmxlbmd0aCwgbGVuZ3RoMiA9IFN1YjI/LmJvZHk/Lmxlbmd0aDtcblx0XHRcdHN3aXRjaCAoS2luZCkge1xuXHRcdFx0XHRjYXNlIFwiYXNyXCI6XG5cdFx0XHRcdFx0Ly8g6Ieq5Yqo55Sf5oiQ5a2X5bmV6L2s5pmu6YCa5a2X5bmVXG5cdFx0XHRcdFx0JC5sb2coYPCfmqdgLCBgRHVhbFN1YuaYr+iHquWKqOeUn+aIkOWtl+W5lWAsIFwiXCIpO1xuXHRcdFx0XHRcdC8vIHZ0dOWtl+W5leS4jemcgOimgeeJueauiuWkhOeQhlxuXHRcdFx0XHRcdC8vYnJlYWs7IOS4jeimgWJyZWFr77yM6L+e57ut5aSE55CGXG5cdFx0XHRcdGNhc2UgXCJjYXB0aW9uc1wiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIOWkhOeQhuaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdHdoaWxlIChpbmRleDEgPCBsZW5ndGgxICYmIGluZGV4MiA8IGxlbmd0aDIpIHtcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgaW5kZXgxL2xlbmd0aDE6ICR7aW5kZXgxfS8ke2xlbmd0aDF9YCwgYGluZGV4Mi9sZW5ndGgyOiAke2luZGV4Mn0vJHtsZW5ndGgyfWAsIFwiXCIpO1xuXHRcdFx0XHRcdFx0Y29uc3QgdGltZVN0YW1wMSA9IFN1YjEuYm9keVtpbmRleDFdLnRpbWVTdGFtcCwgdGltZVN0YW1wMiA9IFN1YjIuYm9keVtpbmRleDJdLnRpbWVTdGFtcDtcblx0XHRcdFx0XHRcdC8vJC5sb2coYPCfmqdgLCBgdGltZVN0YW1wMTogJHt0aW1lU3RhbXAxfWAsIGB0aW1lU3RhbXAyOiAke3RpbWVTdGFtcDJ9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHQvLyDlpITnkIbmma7pgJrlrZfluZVcblx0XHRcdFx0XHRcdGNvbnN0IHRleHQxID0gU3ViMS5ib2R5W2luZGV4MV0/LnRleHQgPz8gXCJcIiwgdGV4dDIgPSBTdWIyLmJvZHlbaW5kZXgyXT8udGV4dCA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+ap2AsIGB0ZXh0MTogJHt0ZXh0MX1gLCBgdGV4dDI6ICR7dGV4dDJ9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRpZiAoTWF0aC5hYnModGltZVN0YW1wMSAtIHRpbWVTdGFtcDIpIDw9IFRvbGVyYW5jZSkge1xuXHRcdFx0XHRcdFx0XHQvL2luZGV4MCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gaW5kZXgyIDogaW5kZXgxO1xuXHRcdFx0XHRcdFx0XHRpbmRleDAgPSBpbmRleDE7XG5cdFx0XHRcdFx0XHRcdC8vIOWkhOeQhuaZrumAmuWtl+W5lVxuXHRcdFx0XHRcdFx0XHREdWFsU3ViLmJvZHlbaW5kZXgwXS50ZXh0ID0gKFBvc2l0aW9uID09PSBcIlJldmVyc2VcIikgPyBgJHt0ZXh0Mn1cXG4ke3RleHQxfWA6IGAke3RleHQxfVxcbiR7dGV4dDJ9YDtcblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhg8J+ap2AsIGBpbmRleDA6ICR7aW5kZXgwfWAsIGB0ZXh0OiAke0R1YWxTdWIuYm9keVtpbmRleDBdLnRleHR9YCwgXCJcIik7XG5cdFx0XHRcdFx0XHRcdC8vRHVhbFN1Yi5ib2R5W2luZGV4MF0udGltZVN0YW1wID0gKFBvc2l0aW9uID09PSBcIlJldmVyc2VcIikgPyB0aW1lU3RhbXAyIDogdGltZVN0YW1wMTtcblx0XHRcdFx0XHRcdFx0Ly9EdWFsU3ViLmJvZHlbaW5kZXgwXS5pbmRleCA9IChQb3NpdGlvbiA9PT0gXCJSZXZlcnNlXCIpID8gaW5kZXgyIDogaW5kZXgxO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGlmICh0aW1lU3RhbXAyID4gdGltZVN0YW1wMSkgaW5kZXgxKytcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHRpbWVTdGFtcDIgPCB0aW1lU3RhbXAxKSBpbmRleDIrK1xuXHRcdFx0XHRcdFx0ZWxzZSB7IGluZGV4MSsrOyBpbmRleDIrKyB9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0XHR9O1xuXHR9O1xuXHQvLyQubG9nKGDwn46JICR7JC5uYW1lfSwgQ29tYmluZSBEdWFsIFN1YnRpdGxlc2AsIGByZXR1cm4gRHVhbFN1YuWGheWuuTogJHtKU09OLnN0cmluZ2lmeShEdWFsU3ViKX1gLCBcIlwiKTtcblx0JC5sb2coYPCfjokgJHskLm5hbWV9LCBDb21iaW5lIER1YWwgU3VidGl0bGVzYCwgXCJcIik7XG5cdHJldHVybiBEdWFsU3ViO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==