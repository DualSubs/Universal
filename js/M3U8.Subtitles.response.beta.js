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

/***/ "./src/EXTM3U/EXTM3U.mjs":
/*!*******************************!*\
  !*** ./src/EXTM3U/EXTM3U.mjs ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EXTM3U)
/* harmony export */ });
// refer: https://datatracker.ietf.org/doc/html/draft-pantos-http-live-streaming-08
class EXTM3U {
	constructor(opts) {
		this.name = "EXTM3U v0.8.6";
		this.opts = opts;
		this.newLine = (this.opts.includes("\n")) ? "\n" : (this.opts.includes("\r")) ? "\r" : (this.opts.includes("\r\n")) ? "\r\n" : "\n";
	};

	parse(m3u8 = new String) {
		const EXTM3U_Regex = /^(?:(?<TAG>#(?:EXT|AIV)[^#:\s\r\n]+)(?::(?<OPTION>[^\r\n]+))?(?:(?:\r\n|\r|\n)(?<URI>[^#\s\r\n]+))?|(?<NOTE>#[^\r\n]+)?)(?:\r\n|\r|\n)?$/gm;
		let json = [...m3u8.matchAll(EXTM3U_Regex)].map(item => {
			item = item?.groups || item;
			if (/=/.test(item?.OPTION)) item.OPTION = Object.fromEntries(`${item.OPTION}\,`.split(/,\s*(?![^"]*",)/).slice(0, -1).map(option => {
				option = option.split(/=(.*)/);
				option[1] = (isNaN(option[1])) ? option[1].replace(/^"(.*)"$/, "$1") : parseInt(option[1], 10);
				return option;
			}));
			return item
		});
		return json
	};

	stringify(json = new Array) {
		if (json?.[0]?.TAG !== "#EXTM3U") json.unshift({ "TAG": "#EXTM3U" })
		const OPTION_value_Regex = /^((-?\d+[x.\d]+)|[0-9A-Z-]+)$/;
		let m3u8 = json.map(item => {
			if (typeof item?.OPTION === "object") item.OPTION = Object.entries(item.OPTION).map(option => {
				if (item?.TAG === "#EXT-X-SESSION-DATA") option[1] = `"${option[1]}"`;
				else if (!isNaN(option[1])) option[1] = (typeof option[1] === "number") ? option[1] : `"${option[1]}"`;
				else if (option[0] === "ID" || option[0] === "INSTREAM-ID" || option[0] === "KEYFORMAT") option[1] = `"${option[1]}"`;
				else if (!OPTION_value_Regex.test(option[1])) option[1] = `"${option[1]}"`;
				return option.join("=");
			}).join(",");
			return item = (item?.URI) ? item.TAG + ":" + item.OPTION + this.newLine + item.URI
				: (item?.OPTION) ? item.TAG + ":" + item.OPTION
					: (item?.TAG) ? item.TAG
						: (item?.NOTE) ? item.NOTE
							: "";
		}).join(this.newLine);
		return m3u8
	};
};


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
/*!*********************************************!*\
  !*** ./src/M3U8.Subtitles.response.beta.js ***!
  \*********************************************/
var _database_Database_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ENV/ENV.mjs */ "./src/ENV/ENV.mjs");
/* harmony import */ var _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./URI/URI.mjs */ "./src/URI/URI.mjs");
/* harmony import */ var _EXTM3U_EXTM3U_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EXTM3U/EXTM3U.mjs */ "./src/EXTM3U/EXTM3U.mjs");
/* harmony import */ var _function_setENV_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./function/setENV.mjs */ "./src/function/setENV.mjs");
/* harmony import */ var _function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/detectPlatform.mjs */ "./src/function/detectPlatform.mjs");
/* harmony import */ var _function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/detectFormat.mjs */ "./src/function/detectFormat.mjs");
/* harmony import */ var _database_Database_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./database/Database.json */ "./src/database/Database.json");
/*
README: https://github.com/DualSubs
*/











const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: 🎦 Universal v0.9.5(2) M3U8.Subtitles.response.beta");
const URI = new _URI_URI_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]();
const M3U8 = new _EXTM3U_EXTM3U_mjs__WEBPACK_IMPORTED_MODULE_2__["default"](["\n"]);

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 获取平台
const PLATFORM = (0,_function_detectPlatform_mjs__WEBPACK_IMPORTED_MODULE_4__["default"])(HOST);
$.log(`⚠ ${$.name}, PLATFORM: ${PLATFORM}`, "");
// 解析格式
let FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
if (FORMAT === "application/octet-stream" || FORMAT === "text/plain") FORMAT = (0,_function_detectFormat_mjs__WEBPACK_IMPORTED_MODULE_5__["default"])(URL, $response?.body);
$.log(`⚠ ${$.name}, FORMAT: ${FORMAT}`, "");
(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_3__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal", "Composite"], /*#__PURE__*/ (_database_Database_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache || (_database_Database_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache = __webpack_require__.t(_database_Database_json__WEBPACK_IMPORTED_MODULE_6__, 2))));
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ ${$.name}, Type: ${Type}, Languages: ${Languages}`, "");
			// 创建空数据
			let body = {};
			// 处理类型
			switch (Type) {
				case "Official":
					$.log(`🚧 ${$.name}`, "官方字幕", "");
					// 获取字幕播放列表m3u8缓存（map）
					const { subtitlesPlaylist, subtitlesPlaylistIndex } = getPlaylistCache($request.url, Caches.Playlists.Master, Languages[0]) ?? getPlaylistCache($request.url, Caches.Playlists.Master, Languages[1]);
					// 写入字幕文件地址vtt缓存（map）
					Caches.Playlists.Subtitle = await setSubtitlesCache(Caches.Playlists.Subtitle, subtitlesPlaylist, Languages[0], subtitlesPlaylistIndex, PLATFORM);
					Caches.Playlists.Subtitle = await setSubtitlesCache(Caches.Playlists.Subtitle, subtitlesPlaylist, Languages[1], subtitlesPlaylistIndex, PLATFORM);
					// 格式化缓存
					Caches.Playlists.Subtitle = setCache(Caches?.Playlists.Subtitle, Settings.CacheSize);
					// 写入缓存
					$.setjson(Caches.Playlists.Subtitle, `@DualSubs.${"Composite"}.Caches.Playlists.Subtitle`);
					break;
				case "Translate":
				default:
					$.log(`🚧 ${$.name}, 翻译字幕`, "");
					break;
				case "External":
					$.log(`🚧 ${$.name}, 外挂字幕`, "");
					break;
			};
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
					// 序列化M3U8
					body = M3U8.parse($response.body);
					$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					// WebVTT.m3u8加参数
					body = body.map(item => {
						if (item?.URI) {
						//if (item?.URI?.includes("vtt") || item?.URI?.includes("ttml")) {
							const symbol = (item.URI.includes("?")) ? "&" : "?";
							if (item?.URI?.includes("empty")) {}
							else if (item?.URI?.includes("blank")) {}
							else if (item?.URI?.includes("default")) {}
							else {
								//if (URL.query?.sublang) item.URI += `${symbol}subtype=${Type}&sublang=${URL.query.sublang}`;
								//else item.URI += `${symbol}subtype=${Type}`;
								item.URI += `${symbol}subtype=${Type}`;
								if (URL.query?.lang) item.URI += `&lang=${URL.query.lang}`;
							};
						};
						return item;
					})
					if (PLATFORM === "PrimeVideo") {
						// 删除BYTERANGE
						//body = body.filter(({ TAG }) => TAG !== "#EXT-X-BYTERANGE");
						body = body.map((item, i) => {
							if (item.TAG === "#EXT-X-BYTERANGE") body[i - 1].URI = item.URI;
							else return item;
						}).filter(e => e);
						//$.log(`🚧 ${$.name}`, "body.map", JSON.stringify(body), "");
					}
					// 字符串M3U8
					$response.body = M3U8.stringify(body);
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
 * @param {String} language - Language
 * @return {Promise<Object>} { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex }
 */
function getPlaylistCache(url, cache, language) {
	$.log(`☑️ ${$.name}, getPlaylistCache, language: ${language}`, "");
	let masterPlaylistURL = "";
	let subtitlesPlaylist = {};
	let subtitlesPlaylistIndex = 0;
	cache?.forEach((Value, Key) => {
		//$.log(`🚧 ${$.name}, getPlaylistCache, Key: ${Key}, Value: ${JSON.stringify(Value)}`, "");
		if (Array.isArray(Value?.[language])) {
			let Array = Value?.[language];
			//$.log(`🚧 ${$.name}, getPlaylistCache`, `Array: ${JSON.stringify(Array)}`, "");
			if (Array?.some((Object, Index) => {
				if (url.includes(Object?.URI ?? Object?.OPTION?.URI ?? null)) {
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
	$.log(`✅ ${$.name}, getPlaylistCache`, `masterPlaylistURL: ${JSON.stringify(masterPlaylistURL)}`, "");
	return { masterPlaylistURL, subtitlesPlaylist, subtitlesPlaylistIndex };
};

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
	$.log(`☑️ ${$.name}, setSubtitlesCache, language: ${language}, index: ${index}`, "");
	await Promise.all(playlist?.[language]?.map(async (val, ind, arr) => {
		//$.log(`🚧 ${$.name}, setSubtitlesCache, ind: ${ind}, val: ${JSON.stringify(val)}`, "");
		if ((arr[index] && (ind === index)) || (!arr[index])) {
			// 查找字幕文件地址vtt缓存（map）
			let subtitlesURLarray = cache.get(val.URL) ?? [];
			//$.log(`🚧 ${$.name}, setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(subtitlesURLarray)}`, "");
			//$.log(`🚧 ${$.name}, setSubtitlesCache`, `val?.URL: ${val?.URL}`, "");
			// 获取字幕文件地址vtt/ttml缓存（按语言）
			subtitlesURLarray = await getSubtitles(val?.URL, $request.headers, platform);
			//$.log(`🚧 ${$.name}, setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(subtitlesURLarray)}`, "");
			// 写入字幕文件地址vtt/ttml缓存到map
			cache = cache.set(val.URL, subtitlesURLarray);
			//$.log(`✅ ${$.name}, setSubtitlesCache`, `subtitlesURLarray: ${JSON.stringify(cache.get(val?.URL))}`, "");
			$.log(`✅ ${$.name}, setSubtitlesCache`, `val?.URL: ${val?.URL}`, "");
		};
	}));
	return cache;
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
 * Get Subtitle *.vtt URLs
 * @author VirgilClyne
 * @param {String} url - VTT URL
 * @param {String} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
async function getSubtitles(url, headers, platform) {
	$.log(`☑️ ${$.name}, Get Subtitle *.vtt *.ttml URLs`, "");
	let response = await $.http.get({ url: url, headers: headers });
	//$.log(`🚧 ${$.name}, Get Subtitle *.vtt *.ttml URLs`, `response: ${JSON.stringify(response)}`, "");
	let subtitlePlayList = M3U8.parse(response.body);
	subtitlePlayList = subtitlePlayList.filter(({ URI }) => (/^.+\.((web)?vtt|ttml2?|xml)(\?.+)?$/.test(URI)));
	subtitlePlayList = subtitlePlayList.filter(({ URI }) => !/empty/.test(URI));
	subtitlePlayList = subtitlePlayList.filter(({ URI }) => !/blank/.test(URI));
	subtitlePlayList = subtitlePlayList.filter(({ URI }) => !/default/.test(URI));
	let subtitles = subtitlePlayList.map(({ URI }) => aPath(url, URI));
	switch (platform) {
		case "Disney+":
			if (subtitles.some(item => /\/.+-MAIN\//.test(item))) subtitles = subtitles.filter(item => /\/.+-MAIN\//.test(item))
			break;
		case "PrimeVideo":
			if (subtitles.some(item => /\/aiv-prod-timedtext\//.test(item))) subtitles = subtitles.filter(item => /\/aiv-prod-timedtext\//.test(item));
			//Array.from(new Set(subtitles));
			subtitles = subtitles.filter((item, index, array) => {
				// 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
				return array.indexOf(item, 0) === index;
			}); // 数组去重
			break;
		default:
			break;
	};
	$.log(`✅ ${$.name}, Get Subtitle *.vtt *.ttml URLs, subtitles: ${subtitles}`, "");
	return subtitles;
	/***************** Fuctions *****************/
	function aPath(aURL = "", URL = "") { return (/^https?:\/\//i.test(URL)) ? URL : aURL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URL };
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTTNVOC5TdWJ0aXRsZXMucmVzcG9uc2UuYmV0YS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixVQUFVO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZUFBZSwrQkFBK0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxTQUFTLDhDQUE4QztBQUN2RDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFD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QU8sMEJBQTBCLFVBQVU7QUFDeEQsa0NBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQyxZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixtQ0FBbUMsNEJBQTRCO0FBQy9ELGVBQWUsT0FBTyxnREFBZ0QseUJBQXlCO0FBQy9GO0FBQ0EsK0NBQStDLEtBQUs7QUFDcEQsK0NBQStDLEtBQUs7QUFDcEQsK0NBQStDLEtBQUs7QUFDcEQsK0NBQStDLEtBQUs7QUFDcEQseUNBQXlDLEtBQUs7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEdBQUc7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTywrQ0FBK0MsVUFBVTtBQUM1RTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvRU5WL0VOVi5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvRVhUTTNVL0VYVE0zVS5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvVVJJL1VSSS5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvZnVuY3Rpb24vZGV0ZWN0Rm9ybWF0Lm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9kZXRlY3RQbGF0Zm9ybS5tanMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvZnVuY3Rpb24vc2V0RU5WLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1YWxzdWJzLy4vc3JjL00zVTguU3VidGl0bGVzLnJlc3BvbnNlLmJldGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRU5WIHtcblx0Y29uc3RydWN0b3IobmFtZSwgb3B0cykge1xuXHRcdHRoaXMubmFtZSA9IG5hbWVcblx0XHR0aGlzLmh0dHAgPSBuZXcgSHR0cCh0aGlzKVxuXHRcdHRoaXMuZGF0YSA9IG51bGxcblx0XHR0aGlzLmRhdGFGaWxlID0gJ2JveC5kYXQnXG5cdFx0dGhpcy5sb2dzID0gW11cblx0XHR0aGlzLmlzTXV0ZSA9IGZhbHNlXG5cdFx0dGhpcy5pc05lZWRSZXdyaXRlID0gZmFsc2Vcblx0XHR0aGlzLmxvZ1NlcGFyYXRvciA9ICdcXG4nXG5cdFx0dGhpcy5lbmNvZGluZyA9ICd1dGYtOCdcblx0XHR0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBvcHRzKVxuXHRcdHRoaXMubG9nKCcnLCBg8J+PgSAke3RoaXMubmFtZX0sIEVOViB2MS4xLjAsIOW8gOWniyFgKVxuXHR9XG5cblx0cGxhdGZvcm0oKSB7XG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJGVudmlyb25tZW50ICYmICRlbnZpcm9ubWVudFsnc3VyZ2UtdmVyc2lvbiddKVxuXHRcdFx0cmV0dXJuICdTdXJnZSdcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkZW52aXJvbm1lbnQgJiYgJGVudmlyb25tZW50WydzdGFzaC12ZXJzaW9uJ10pXG5cdFx0XHRyZXR1cm4gJ1N0YXNoJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSAmJiAhIW1vZHVsZS5leHBvcnRzKSByZXR1cm4gJ05vZGUuanMnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJHRhc2spIHJldHVybiAnUXVhbnR1bXVsdCBYJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRsb29uKSByZXR1cm4gJ0xvb24nXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJHJvY2tldCkgcmV0dXJuICdTaGFkb3dyb2NrZXQnXG5cdH1cblxuXHRpc05vZGUoKSB7XG5cdFx0cmV0dXJuICdOb2RlLmpzJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1F1YW5YKCkge1xuXHRcdHJldHVybiAnUXVhbnR1bXVsdCBYJyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1N1cmdlKCkge1xuXHRcdHJldHVybiAnU3VyZ2UnID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdGlzTG9vbigpIHtcblx0XHRyZXR1cm4gJ0xvb24nID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdGlzU2hhZG93cm9ja2V0KCkge1xuXHRcdHJldHVybiAnU2hhZG93cm9ja2V0JyA9PT0gdGhpcy5wbGF0Zm9ybSgpXG5cdH1cblxuXHRpc1N0YXNoKCkge1xuXHRcdHJldHVybiAnU3Rhc2gnID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdHRvT2JqKHN0ciwgZGVmYXVsdFZhbHVlID0gbnVsbCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShzdHIpXG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0fVxuXHR9XG5cblx0dG9TdHIob2JqLCBkZWZhdWx0VmFsdWUgPSBudWxsKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlXG5cdFx0fVxuXHR9XG5cblx0Z2V0anNvbihrZXksIGRlZmF1bHRWYWx1ZSkge1xuXHRcdGxldCBqc29uID0gZGVmYXVsdFZhbHVlXG5cdFx0Y29uc3QgdmFsID0gdGhpcy5nZXRkYXRhKGtleSlcblx0XHRpZiAodmFsKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZSh0aGlzLmdldGRhdGEoa2V5KSlcblx0XHRcdH0gY2F0Y2ggeyB9XG5cdFx0fVxuXHRcdHJldHVybiBqc29uXG5cdH1cblxuXHRzZXRqc29uKHZhbCwga2V5KSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiB0aGlzLnNldGRhdGEoSlNPTi5zdHJpbmdpZnkodmFsKSwga2V5KVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHR9XG5cblx0Z2V0U2NyaXB0KHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0dGhpcy5nZXQoeyB1cmwgfSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4gcmVzb2x2ZShib2R5KSlcblx0XHR9KVxuXHR9XG5cblx0cnVuU2NyaXB0KHNjcmlwdCwgcnVuT3B0cykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0bGV0IGh0dHBhcGkgPSB0aGlzLmdldGRhdGEoJ0BjaGF2eV9ib3hqc191c2VyQ2Zncy5odHRwYXBpJylcblx0XHRcdGh0dHBhcGkgPSBodHRwYXBpID8gaHR0cGFwaS5yZXBsYWNlKC9cXG4vZywgJycpLnRyaW0oKSA6IGh0dHBhcGlcblx0XHRcdGxldCBodHRwYXBpX3RpbWVvdXQgPSB0aGlzLmdldGRhdGEoXG5cdFx0XHRcdCdAY2hhdnlfYm94anNfdXNlckNmZ3MuaHR0cGFwaV90aW1lb3V0J1xuXHRcdFx0KVxuXHRcdFx0aHR0cGFwaV90aW1lb3V0ID0gaHR0cGFwaV90aW1lb3V0ID8gaHR0cGFwaV90aW1lb3V0ICogMSA6IDIwXG5cdFx0XHRodHRwYXBpX3RpbWVvdXQgPVxuXHRcdFx0XHRydW5PcHRzICYmIHJ1bk9wdHMudGltZW91dCA/IHJ1bk9wdHMudGltZW91dCA6IGh0dHBhcGlfdGltZW91dFxuXHRcdFx0Y29uc3QgW2tleSwgYWRkcl0gPSBodHRwYXBpLnNwbGl0KCdAJylcblx0XHRcdGNvbnN0IG9wdHMgPSB7XG5cdFx0XHRcdHVybDogYGh0dHA6Ly8ke2FkZHJ9L3YxL3NjcmlwdGluZy9ldmFsdWF0ZWAsXG5cdFx0XHRcdGJvZHk6IHtcblx0XHRcdFx0XHRzY3JpcHRfdGV4dDogc2NyaXB0LFxuXHRcdFx0XHRcdG1vY2tfdHlwZTogJ2Nyb24nLFxuXHRcdFx0XHRcdHRpbWVvdXQ6IGh0dHBhcGlfdGltZW91dFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRoZWFkZXJzOiB7ICdYLUtleSc6IGtleSwgJ0FjY2VwdCc6ICcqLyonIH0sXG5cdFx0XHRcdHRpbWVvdXQ6IGh0dHBhcGlfdGltZW91dFxuXHRcdFx0fVxuXHRcdFx0dGhpcy5wb3N0KG9wdHMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHJlc29sdmUoYm9keSkpXG5cdFx0fSkuY2F0Y2goKGUpID0+IHRoaXMubG9nRXJyKGUpKVxuXHR9XG5cblx0bG9hZGRhdGEoKSB7XG5cdFx0aWYgKHRoaXMuaXNOb2RlKCkpIHtcblx0XHRcdHRoaXMuZnMgPSB0aGlzLmZzID8gdGhpcy5mcyA6IHJlcXVpcmUoJ2ZzJylcblx0XHRcdHRoaXMucGF0aCA9IHRoaXMucGF0aCA/IHRoaXMucGF0aCA6IHJlcXVpcmUoJ3BhdGgnKVxuXHRcdFx0Y29uc3QgY3VyRGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUodGhpcy5kYXRhRmlsZSlcblx0XHRcdGNvbnN0IHJvb3REaXJEYXRhRmlsZVBhdGggPSB0aGlzLnBhdGgucmVzb2x2ZShcblx0XHRcdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRcdFx0dGhpcy5kYXRhRmlsZVxuXHRcdFx0KVxuXHRcdFx0Y29uc3QgaXNDdXJEaXJEYXRhRmlsZSA9IHRoaXMuZnMuZXhpc3RzU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgpXG5cdFx0XHRjb25zdCBpc1Jvb3REaXJEYXRhRmlsZSA9XG5cdFx0XHRcdCFpc0N1ckRpckRhdGFGaWxlICYmIHRoaXMuZnMuZXhpc3RzU3luYyhyb290RGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0aWYgKGlzQ3VyRGlyRGF0YUZpbGUgfHwgaXNSb290RGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0Y29uc3QgZGF0UGF0aCA9IGlzQ3VyRGlyRGF0YUZpbGVcblx0XHRcdFx0XHQ/IGN1ckRpckRhdGFGaWxlUGF0aFxuXHRcdFx0XHRcdDogcm9vdERpckRhdGFGaWxlUGF0aFxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJldHVybiBKU09OLnBhcnNlKHRoaXMuZnMucmVhZEZpbGVTeW5jKGRhdFBhdGgpKVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHt9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSByZXR1cm4ge31cblx0XHR9IGVsc2UgcmV0dXJuIHt9XG5cdH1cblxuXHR3cml0ZWRhdGEoKSB7XG5cdFx0aWYgKHRoaXMuaXNOb2RlKCkpIHtcblx0XHRcdHRoaXMuZnMgPSB0aGlzLmZzID8gdGhpcy5mcyA6IHJlcXVpcmUoJ2ZzJylcblx0XHRcdHRoaXMucGF0aCA9IHRoaXMucGF0aCA/IHRoaXMucGF0aCA6IHJlcXVpcmUoJ3BhdGgnKVxuXHRcdFx0Y29uc3QgY3VyRGlyRGF0YUZpbGVQYXRoID0gdGhpcy5wYXRoLnJlc29sdmUodGhpcy5kYXRhRmlsZSlcblx0XHRcdGNvbnN0IHJvb3REaXJEYXRhRmlsZVBhdGggPSB0aGlzLnBhdGgucmVzb2x2ZShcblx0XHRcdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRcdFx0dGhpcy5kYXRhRmlsZVxuXHRcdFx0KVxuXHRcdFx0Y29uc3QgaXNDdXJEaXJEYXRhRmlsZSA9IHRoaXMuZnMuZXhpc3RzU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgpXG5cdFx0XHRjb25zdCBpc1Jvb3REaXJEYXRhRmlsZSA9XG5cdFx0XHRcdCFpc0N1ckRpckRhdGFGaWxlICYmIHRoaXMuZnMuZXhpc3RzU3luYyhyb290RGlyRGF0YUZpbGVQYXRoKVxuXHRcdFx0Y29uc3QganNvbmRhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpXG5cdFx0XHRpZiAoaXNDdXJEaXJEYXRhRmlsZSkge1xuXHRcdFx0XHR0aGlzLmZzLndyaXRlRmlsZVN5bmMoY3VyRGlyRGF0YUZpbGVQYXRoLCBqc29uZGF0YSlcblx0XHRcdH0gZWxzZSBpZiAoaXNSb290RGlyRGF0YUZpbGUpIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKHJvb3REaXJEYXRhRmlsZVBhdGgsIGpzb25kYXRhKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5mcy53cml0ZUZpbGVTeW5jKGN1ckRpckRhdGFGaWxlUGF0aCwganNvbmRhdGEpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bG9kYXNoX2dldChzb3VyY2UsIHBhdGgsIGRlZmF1bHRWYWx1ZSA9IHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IHBhdGhzID0gcGF0aC5yZXBsYWNlKC9cXFsoXFxkKylcXF0vZywgJy4kMScpLnNwbGl0KCcuJylcblx0XHRsZXQgcmVzdWx0ID0gc291cmNlXG5cdFx0Zm9yIChjb25zdCBwIG9mIHBhdGhzKSB7XG5cdFx0XHRyZXN1bHQgPSBPYmplY3QocmVzdWx0KVtwXVxuXHRcdFx0aWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWVcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0bG9kYXNoX3NldChvYmosIHBhdGgsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdChvYmopICE9PSBvYmopIHJldHVybiBvYmpcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpIHBhdGggPSBwYXRoLnRvU3RyaW5nKCkubWF0Y2goL1teLltcXF1dKy9nKSB8fCBbXVxuXHRcdHBhdGhcblx0XHRcdC5zbGljZSgwLCAtMSlcblx0XHRcdC5yZWR1Y2UoXG5cdFx0XHRcdChhLCBjLCBpKSA9PlxuXHRcdFx0XHRcdE9iamVjdChhW2NdKSA9PT0gYVtjXVxuXHRcdFx0XHRcdFx0PyBhW2NdXG5cdFx0XHRcdFx0XHQ6IChhW2NdID0gTWF0aC5hYnMocGF0aFtpICsgMV0pID4+IDAgPT09ICtwYXRoW2kgKyAxXSA/IFtdIDoge30pLFxuXHRcdFx0XHRvYmpcblx0XHRcdClbcGF0aFtwYXRoLmxlbmd0aCAtIDFdXSA9IHZhbHVlXG5cdFx0cmV0dXJuIG9ialxuXHR9XG5cblx0Z2V0ZGF0YShrZXkpIHtcblx0XHRsZXQgdmFsID0gdGhpcy5nZXR2YWwoa2V5KVxuXHRcdC8vIOWmguaenOS7pSBAXG5cdFx0aWYgKC9eQC8udGVzdChrZXkpKSB7XG5cdFx0XHRjb25zdCBbLCBvYmprZXksIHBhdGhzXSA9IC9eQCguKj8pXFwuKC4qPykkLy5leGVjKGtleSlcblx0XHRcdGNvbnN0IG9ianZhbCA9IG9iamtleSA/IHRoaXMuZ2V0dmFsKG9iamtleSkgOiAnJ1xuXHRcdFx0aWYgKG9ianZhbCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IG9iamVkdmFsID0gSlNPTi5wYXJzZShvYmp2YWwpXG5cdFx0XHRcdFx0dmFsID0gb2JqZWR2YWwgPyB0aGlzLmxvZGFzaF9nZXQob2JqZWR2YWwsIHBhdGhzLCAnJykgOiB2YWxcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHZhbCA9ICcnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHZhbFxuXHR9XG5cblx0c2V0ZGF0YSh2YWwsIGtleSkge1xuXHRcdGxldCBpc3N1YyA9IGZhbHNlXG5cdFx0aWYgKC9eQC8udGVzdChrZXkpKSB7XG5cdFx0XHRjb25zdCBbLCBvYmprZXksIHBhdGhzXSA9IC9eQCguKj8pXFwuKC4qPykkLy5leGVjKGtleSlcblx0XHRcdGNvbnN0IG9iamRhdCA9IHRoaXMuZ2V0dmFsKG9iamtleSlcblx0XHRcdGNvbnN0IG9ianZhbCA9IG9iamtleVxuXHRcdFx0XHQ/IG9iamRhdCA9PT0gJ251bGwnXG5cdFx0XHRcdFx0PyBudWxsXG5cdFx0XHRcdFx0OiBvYmpkYXQgfHwgJ3t9J1xuXHRcdFx0XHQ6ICd7fSdcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IG9iamVkdmFsID0gSlNPTi5wYXJzZShvYmp2YWwpXG5cdFx0XHRcdHRoaXMubG9kYXNoX3NldChvYmplZHZhbCwgcGF0aHMsIHZhbClcblx0XHRcdFx0aXNzdWMgPSB0aGlzLnNldHZhbChKU09OLnN0cmluZ2lmeShvYmplZHZhbCksIG9iamtleSlcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc3Qgb2JqZWR2YWwgPSB7fVxuXHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQob2JqZWR2YWwsIHBhdGhzLCB2YWwpXG5cdFx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwoSlNPTi5zdHJpbmdpZnkob2JqZWR2YWwpLCBvYmprZXkpXG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlzc3VjID0gdGhpcy5zZXR2YWwodmFsLCBrZXkpXG5cdFx0fVxuXHRcdHJldHVybiBpc3N1Y1xuXHR9XG5cblx0Z2V0dmFsKGtleSkge1xuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdHJldHVybiAkcGVyc2lzdGVudFN0b3JlLnJlYWQoa2V5KVxuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0cmV0dXJuICRwcmVmcy52YWx1ZUZvcktleShrZXkpXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5sb2FkZGF0YSgpXG5cdFx0XHRcdHJldHVybiB0aGlzLmRhdGFba2V5XVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2tleV0pIHx8IG51bGxcblx0XHR9XG5cdH1cblxuXHRzZXR2YWwodmFsLCBrZXkpIHtcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRyZXR1cm4gJHBlcnNpc3RlbnRTdG9yZS53cml0ZSh2YWwsIGtleSlcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJldHVybiAkcHJlZnMuc2V0VmFsdWVGb3JLZXkodmFsLCBrZXkpXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5sb2FkZGF0YSgpXG5cdFx0XHRcdHRoaXMuZGF0YVtrZXldID0gdmFsXG5cdFx0XHRcdHRoaXMud3JpdGVkYXRhKClcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YVtrZXldKSB8fCBudWxsXG5cdFx0fVxuXHR9XG5cblx0aW5pdEdvdEVudihvcHRzKSB7XG5cdFx0dGhpcy5nb3QgPSB0aGlzLmdvdCA/IHRoaXMuZ290IDogcmVxdWlyZSgnZ290Jylcblx0XHR0aGlzLmNrdG91Z2ggPSB0aGlzLmNrdG91Z2ggPyB0aGlzLmNrdG91Z2ggOiByZXF1aXJlKCd0b3VnaC1jb29raWUnKVxuXHRcdHRoaXMuY2tqYXIgPSB0aGlzLmNramFyID8gdGhpcy5ja2phciA6IG5ldyB0aGlzLmNrdG91Z2guQ29va2llSmFyKClcblx0XHRpZiAob3B0cykge1xuXHRcdFx0b3B0cy5oZWFkZXJzID0gb3B0cy5oZWFkZXJzID8gb3B0cy5oZWFkZXJzIDoge31cblx0XHRcdGlmICh1bmRlZmluZWQgPT09IG9wdHMuaGVhZGVycy5Db29raWUgJiYgdW5kZWZpbmVkID09PSBvcHRzLmNvb2tpZUphcikge1xuXHRcdFx0XHRvcHRzLmNvb2tpZUphciA9IHRoaXMuY2tqYXJcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQocmVxdWVzdCwgY2FsbGJhY2sgPSAoKSA9PiB7IH0pIHtcblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydDb250ZW50LUxlbmd0aCddXG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnY29udGVudC1sZW5ndGgnXVxuXG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh0aGlzLmlzU3VyZ2UoKSAmJiB0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ2hlYWRlcnMuWC1TdXJnZS1Ta2lwLVNjcmlwdGluZycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCRodHRwQ2xpZW50LmdldChyZXF1ZXN0LCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFlcnJvciAmJiByZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UuYm9keSA9IGJvZHlcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhbGxiYWNrKGVycm9yLCByZXNwb25zZSwgYm9keSlcblx0XHRcdFx0fSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdGlmICh0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ29wdHMuaGludHMnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkdGFzay5mZXRjaChyZXF1ZXN0KS50aGVuKFxuXHRcdFx0XHRcdChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnMsXG5cdFx0XHRcdFx0XHRcdGJvZHksXG5cdFx0XHRcdFx0XHRcdGJvZHlCeXRlc1xuXHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0eyBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIGJvZHksIGJvZHlCeXRlcyB9LFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnJvcikgPT4gY2FsbGJhY2soKGVycm9yICYmIGVycm9yLmVycm9yKSB8fCAnVW5kZWZpbmVkRXJyb3InKVxuXHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0bGV0IGljb252ID0gcmVxdWlyZSgnaWNvbnYtbGl0ZScpXG5cdFx0XHRcdHRoaXMuaW5pdEdvdEVudihyZXF1ZXN0KVxuXHRcdFx0XHR0aGlzLmdvdChyZXF1ZXN0KVxuXHRcdFx0XHRcdC5vbigncmVkaXJlY3QnLCAocmVzcG9uc2UsIG5leHRPcHRzKSA9PiB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2sgPSByZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ11cblx0XHRcdFx0XHRcdFx0XHRcdC5tYXAodGhpcy5ja3RvdWdoLkNvb2tpZS5wYXJzZSlcblx0XHRcdFx0XHRcdFx0XHRcdC50b1N0cmluZygpXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmNramFyLnNldENvb2tpZVN5bmMoY2ssIG51bGwpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdG5leHRPcHRzLmNvb2tpZUphciA9IHRoaXMuY2tqYXJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmxvZ0VycihlKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gdGhpcy5ja2phci5zZXRDb29raWVTeW5jKHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXS5tYXAoQ29va2llLnBhcnNlKS50b1N0cmluZygpKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oXG5cdFx0XHRcdFx0XHQocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGU6IHN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0XHRcdFx0XHRcdGhlYWRlcnMsXG5cdFx0XHRcdFx0XHRcdFx0cmF3Qm9keVxuXHRcdFx0XHRcdFx0XHR9ID0gcmVzcG9uc2Vcblx0XHRcdFx0XHRcdFx0Y29uc3QgYm9keSA9IGljb252LmRlY29kZShyYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdFx0XHRcdHsgc3RhdHVzLCBzdGF0dXNDb2RlLCBoZWFkZXJzLCByYXdCb2R5LCBib2R5IH0sXG5cdFx0XHRcdFx0XHRcdFx0Ym9keVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0KGVycikgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB7IG1lc3NhZ2U6IGVycm9yLCByZXNwb25zZTogcmVzcG9uc2UgfSA9IGVyclxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0XHRlcnJvcixcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSxcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSAmJiBpY29udi5kZWNvZGUocmVzcG9uc2UucmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHRwb3N0KHJlcXVlc3QsIGNhbGxiYWNrID0gKCkgPT4geyB9KSB7XG5cdFx0Y29uc3QgbWV0aG9kID0gcmVxdWVzdC5tZXRob2Rcblx0XHRcdD8gcmVxdWVzdC5tZXRob2QudG9Mb2NhbGVMb3dlckNhc2UoKVxuXHRcdFx0OiAncG9zdCdcblxuXHRcdC8vIOWmguaenOaMh+WumuS6huivt+axguS9kywg5L2G5rKh5oyH5a6aIGBDb250ZW50LVR5cGVg44CBYGNvbnRlbnQtdHlwZWAsIOWImeiHquWKqOeUn+aIkOOAglxuXHRcdGlmIChcblx0XHRcdHJlcXVlc3QuYm9keSAmJlxuXHRcdFx0cmVxdWVzdC5oZWFkZXJzICYmXG5cdFx0XHQhcmVxdWVzdC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSAmJlxuXHRcdFx0IXJlcXVlc3QuaGVhZGVyc1snY29udGVudC10eXBlJ11cblx0XHQpIHtcblx0XHRcdC8vIEhUVFAvMeOAgUhUVFAvMiDpg73mlK/mjIHlsI/lhpkgaGVhZGVyc1xuXHRcdFx0cmVxdWVzdC5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG5cdFx0fVxuXHRcdC8vIOS4uumBv+WFjeaMh+WumumUmeivryBgY29udGVudC1sZW5ndGhgIOi/memHjOWIoOmZpOivpeWxnuaAp++8jOeUseW3peWFt+erryAoSHR0cENsaWVudCkg6LSf6LSj6YeN5paw6K6h566X5bm26LWL5YC8XG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnQ29udGVudC1MZW5ndGgnXVxuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ2NvbnRlbnQtbGVuZ3RoJ11cblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKHRoaXMuaXNTdXJnZSgpICYmIHRoaXMuaXNOZWVkUmV3cml0ZSkge1xuXHRcdFx0XHRcdHRoaXMubG9kYXNoX3NldChyZXF1ZXN0LCAnaGVhZGVycy5YLVN1cmdlLVNraXAtU2NyaXB0aW5nJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JGh0dHBDbGllbnRbbWV0aG9kXShyZXF1ZXN0LCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFlcnJvciAmJiByZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UuYm9keSA9IGJvZHlcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXNDb2RlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhbGxiYWNrKGVycm9yLCByZXNwb25zZSwgYm9keSlcblx0XHRcdFx0fSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRcdHJlcXVlc3QubWV0aG9kID0gbWV0aG9kXG5cdFx0XHRcdGlmICh0aGlzLmlzTmVlZFJld3JpdGUpIHtcblx0XHRcdFx0XHR0aGlzLmxvZGFzaF9zZXQocmVxdWVzdCwgJ29wdHMuaGludHMnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkdGFzay5mZXRjaChyZXF1ZXN0KS50aGVuKFxuXHRcdFx0XHRcdChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0XHRzdGF0dXNDb2RlOiBzdGF0dXMsXG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnMsXG5cdFx0XHRcdFx0XHRcdGJvZHksXG5cdFx0XHRcdFx0XHRcdGJvZHlCeXRlc1xuXHRcdFx0XHRcdFx0fSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0eyBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIGJvZHksIGJvZHlCeXRlcyB9LFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRib2R5Qnl0ZXNcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlcnJvcikgPT4gY2FsbGJhY2soKGVycm9yICYmIGVycm9yLmVycm9yKSB8fCAnVW5kZWZpbmVkRXJyb3InKVxuXHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0bGV0IGljb252ID0gcmVxdWlyZSgnaWNvbnYtbGl0ZScpXG5cdFx0XHRcdHRoaXMuaW5pdEdvdEVudihyZXF1ZXN0KVxuXHRcdFx0XHRjb25zdCB7IHVybCwgLi4uX3JlcXVlc3QgfSA9IHJlcXVlc3Rcblx0XHRcdFx0dGhpcy5nb3RbbWV0aG9kXSh1cmwsIF9yZXF1ZXN0KS50aGVuKFxuXHRcdFx0XHRcdChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBzdGF0dXNDb2RlOiBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIHJhd0JvZHkgfSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRjb25zdCBib2R5ID0gaWNvbnYuZGVjb2RlKHJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcblx0XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0eyBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIHJhd0JvZHksIGJvZHkgfSxcblx0XHRcdFx0XHRcdFx0Ym9keVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGVycikgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgeyBtZXNzYWdlOiBlcnJvciwgcmVzcG9uc2U6IHJlc3BvbnNlIH0gPSBlcnJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRlcnJvcixcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlICYmIGljb252LmRlY29kZShyZXNwb25zZS5yYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXHQvKipcblx0ICpcblx0ICog56S65L6LOiQudGltZSgneXl5eS1NTS1kZCBxcSBISDptbTpzcy5TJylcblx0ICogICAgOiQudGltZSgneXl5eU1NZGRISG1tc3NTJylcblx0ICogICAgeTrlubQgTTrmnIggZDrml6UgcTrlraMgSDrml7YgbTrliIYgczrnp5IgUzrmr6vnp5Jcblx0ICogICAg5YW25LiteeWPr+mAiTAtNOS9jeWNoOS9jeespuOAgVPlj6/pgIkwLTHkvY3ljaDkvY3nrKbvvIzlhbbkvZnlj6/pgIkwLTLkvY3ljaDkvY3nrKZcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdCDmoLzlvI/ljJblj4LmlbBcblx0ICogQHBhcmFtIHtudW1iZXJ9IHRzIOWPr+mAiTog5qC55o2u5oyH5a6a5pe26Ze05oiz6L+U5Zue5qC85byP5YyW5pel5pyfXG5cdCAqXG5cdCAqL1xuXHR0aW1lKGZvcm1hdCwgdHMgPSBudWxsKSB7XG5cdFx0Y29uc3QgZGF0ZSA9IHRzID8gbmV3IERhdGUodHMpIDogbmV3IERhdGUoKVxuXHRcdGxldCBvID0ge1xuXHRcdFx0J00rJzogZGF0ZS5nZXRNb250aCgpICsgMSxcblx0XHRcdCdkKyc6IGRhdGUuZ2V0RGF0ZSgpLFxuXHRcdFx0J0grJzogZGF0ZS5nZXRIb3VycygpLFxuXHRcdFx0J20rJzogZGF0ZS5nZXRNaW51dGVzKCksXG5cdFx0XHQncysnOiBkYXRlLmdldFNlY29uZHMoKSxcblx0XHRcdCdxKyc6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksXG5cdFx0XHQnUyc6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcblx0XHR9XG5cdFx0aWYgKC8oeSspLy50ZXN0KGZvcm1hdCkpXG5cdFx0XHRmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShcblx0XHRcdFx0UmVnRXhwLiQxLFxuXHRcdFx0XHQoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aClcblx0XHRcdClcblx0XHRmb3IgKGxldCBrIGluIG8pXG5cdFx0XHRpZiAobmV3IFJlZ0V4cCgnKCcgKyBrICsgJyknKS50ZXN0KGZvcm1hdCkpXG5cdFx0XHRcdGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFxuXHRcdFx0XHRcdFJlZ0V4cC4kMSxcblx0XHRcdFx0XHRSZWdFeHAuJDEubGVuZ3RoID09IDFcblx0XHRcdFx0XHRcdD8gb1trXVxuXHRcdFx0XHRcdFx0OiAoJzAwJyArIG9ba10pLnN1YnN0cigoJycgKyBvW2tdKS5sZW5ndGgpXG5cdFx0XHRcdClcblx0XHRyZXR1cm4gZm9ybWF0XG5cdH1cblxuXHQvKipcblx0ICog57O757uf6YCa55+lXG5cdCAqXG5cdCAqID4g6YCa55+l5Y+C5pWwOiDlkIzml7bmlK/mjIEgUXVhblgg5ZKMIExvb24g5Lik56eN5qC85byPLCBFbnZKc+agueaNrui/kOihjOeOr+Wig+iHquWKqOi9rOaNoiwgU3VyZ2Ug546v5aKD5LiN5pSv5oyB5aSa5aqS5L2T6YCa55+lXG5cdCAqXG5cdCAqIOekuuS+izpcblx0ICogJC5tc2codGl0bGUsIHN1YnQsIGRlc2MsICd0d2l0dGVyOi8vJylcblx0ICogJC5tc2codGl0bGUsIHN1YnQsIGRlc2MsIHsgJ29wZW4tdXJsJzogJ3R3aXR0ZXI6Ly8nLCAnbWVkaWEtdXJsJzogJ2h0dHBzOi8vZ2l0aHViLmdpdGh1YmFzc2V0cy5jb20vaW1hZ2VzL21vZHVsZXMvb3Blbl9ncmFwaC9naXRodWItbWFyay5wbmcnIH0pXG5cdCAqICQubXNnKHRpdGxlLCBzdWJ0LCBkZXNjLCB7ICdvcGVuLXVybCc6ICdodHRwczovL2JpbmcuY29tJywgJ21lZGlhLXVybCc6ICdodHRwczovL2dpdGh1Yi5naXRodWJhc3NldHMuY29tL2ltYWdlcy9tb2R1bGVzL29wZW5fZ3JhcGgvZ2l0aHViLW1hcmsucG5nJyB9KVxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHRpdGxlIOagh+mimFxuXHQgKiBAcGFyYW0geyp9IHN1YnQg5Ymv5qCH6aKYXG5cdCAqIEBwYXJhbSB7Kn0gZGVzYyDpgJrnn6Xor6bmg4Vcblx0ICogQHBhcmFtIHsqfSBvcHRzIOmAmuefpeWPguaVsFxuXHQgKlxuXHQgKi9cblx0bXNnKHRpdGxlID0gbmFtZSwgc3VidCA9ICcnLCBkZXNjID0gJycsIG9wdHMpIHtcblx0XHRjb25zdCB0b0Vudk9wdHMgPSAocmF3b3B0cykgPT4ge1xuXHRcdFx0c3dpdGNoICh0eXBlb2YgcmF3b3B0cykge1xuXHRcdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0XHRyZXR1cm4gcmF3b3B0c1xuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRcdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRcdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyB1cmw6IHJhd29wdHMgfVxuXHRcdFx0XHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRcdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmF3b3B0c1xuXHRcdFx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgJ29wZW4tdXJsJzogcmF3b3B0cyB9XG5cdFx0XHRcdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0XHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0bGV0IG9wZW5VcmwgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHMudXJsIHx8IHJhd29wdHMub3BlblVybCB8fCByYXdvcHRzWydvcGVuLXVybCddXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7IHVybDogb3BlblVybCB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlICdMb29uJzoge1xuXHRcdFx0XHRcdFx0XHRsZXQgb3BlblVybCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0cy5vcGVuVXJsIHx8IHJhd29wdHMudXJsIHx8IHJhd29wdHNbJ29wZW4tdXJsJ11cblx0XHRcdFx0XHRcdFx0bGV0IG1lZGlhVXJsID0gcmF3b3B0cy5tZWRpYVVybCB8fCByYXdvcHRzWydtZWRpYS11cmwnXVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyBvcGVuVXJsLCBtZWRpYVVybCB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOiB7XG5cdFx0XHRcdFx0XHRcdGxldCBvcGVuVXJsID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzWydvcGVuLXVybCddIHx8IHJhd29wdHMudXJsIHx8IHJhd29wdHMub3BlblVybFxuXHRcdFx0XHRcdFx0XHRsZXQgbWVkaWFVcmwgPSByYXdvcHRzWydtZWRpYS11cmwnXSB8fCByYXdvcHRzLm1lZGlhVXJsXG5cdFx0XHRcdFx0XHRcdGxldCB1cGRhdGVQYXN0ZWJvYXJkID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzWyd1cGRhdGUtcGFzdGVib2FyZCddIHx8IHJhd29wdHMudXBkYXRlUGFzdGVib2FyZFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdCdvcGVuLXVybCc6IG9wZW5VcmwsXG5cdFx0XHRcdFx0XHRcdFx0J21lZGlhLXVybCc6IG1lZGlhVXJsLFxuXHRcdFx0XHRcdFx0XHRcdCd1cGRhdGUtcGFzdGVib2FyZCc6IHVwZGF0ZVBhc3RlYm9hcmRcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIXRoaXMuaXNNdXRlKSB7XG5cdFx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0JG5vdGlmaWNhdGlvbi5wb3N0KHRpdGxlLCBzdWJ0LCBkZXNjLCB0b0Vudk9wdHMob3B0cykpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0XHQkbm90aWZ5KHRpdGxlLCBzdWJ0LCBkZXNjLCB0b0Vudk9wdHMob3B0cykpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlzTXV0ZUxvZykge1xuXHRcdFx0bGV0IGxvZ3MgPSBbJycsICc9PT09PT09PT09PT09PfCfk6Pns7vnu5/pgJrnn6Xwn5OjPT09PT09PT09PT09PT0nXVxuXHRcdFx0bG9ncy5wdXNoKHRpdGxlKVxuXHRcdFx0c3VidCA/IGxvZ3MucHVzaChzdWJ0KSA6ICcnXG5cdFx0XHRkZXNjID8gbG9ncy5wdXNoKGRlc2MpIDogJydcblx0XHRcdGNvbnNvbGUubG9nKGxvZ3Muam9pbignXFxuJykpXG5cdFx0XHR0aGlzLmxvZ3MgPSB0aGlzLmxvZ3MuY29uY2F0KGxvZ3MpXG5cdFx0fVxuXHR9XG5cblx0bG9nKC4uLmxvZ3MpIHtcblx0XHRpZiAobG9ncy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmxvZ3MgPSBbLi4udGhpcy5sb2dzLCAuLi5sb2dzXVxuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhsb2dzLmpvaW4odGhpcy5sb2dTZXBhcmF0b3IpKVxuXHR9XG5cblx0bG9nRXJyKGVycm9yKSB7XG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aGlzLmxvZygnJywgYOKdl++4jyAke3RoaXMubmFtZX0sIOmUmeivryFgLCBlcnJvcilcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHR0aGlzLmxvZygnJywgYOKdl++4jyR7dGhpcy5uYW1lfSwg6ZSZ6K+vIWAsIGVycm9yLnN0YWNrKVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdHdhaXQodGltZSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKSlcblx0fVxuXG5cdGRvbmUodmFsID0ge30pIHtcblx0XHRjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblx0XHRjb25zdCBjb3N0VGltZSA9IChlbmRUaW1lIC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMFxuXHRcdHRoaXMubG9nKCcnLCBg8J+aqSAke3RoaXMubmFtZX0sIOe7k+adnyEg8J+VmyAke2Nvc3RUaW1lfSDnp5JgKVxuXHRcdHRoaXMubG9nKClcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdCRkb25lKHZhbClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRwcm9jZXNzLmV4aXQoMSlcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc1xuXHQgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vVmlyZ2lsQ2x5bmUvR2V0U29tZUZyaWVzL2Jsb2IvbWFpbi9mdW5jdGlvbi9nZXRFTlYvZ2V0RU5WLmpzXG5cdCAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIFBlcnNpc3RlbnQgU3RvcmUgS2V5XG5cdCAqIEBwYXJhbSB7QXJyYXl9IG5hbWVzIC0gUGxhdGZvcm0gTmFtZXNcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGFiYXNlIC0gRGVmYXVsdCBEYXRhYmFzZVxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9XG5cdCAqL1xuXHRnZXRFTlYoa2V5LCBuYW1lcywgZGF0YWJhc2UpIHtcblx0XHQvL3RoaXMubG9nKGDimJHvuI8gJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgXCJcIik7XG5cdFx0LyoqKioqKioqKioqKioqKioqIEJveEpzICoqKioqKioqKioqKioqKioqL1xuXHRcdC8vIOWMheijheS4uuWxgOmDqOWPmOmHj++8jOeUqOWujOmHiuaUvuWGheWtmFxuXHRcdC8vIEJveEpz55qE5riF56m65pON5L2c6L+U5Zue5YGH5YC856m65a2X56ym5LiyLCDpgLvovpHmiJbmk43kvZznrKbkvJrlnKjlt6bkvqfmk43kvZzmlbDkuLrlgYflgLzml7bov5Tlm57lj7Pkvqfmk43kvZzmlbDjgIJcblx0XHRsZXQgQm94SnMgPSB0aGlzLmdldGpzb24oa2V5LCBkYXRhYmFzZSk7XG5cdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgQm94SnPnsbvlnos6ICR7dHlwZW9mIEJveEpzfWAsIGBCb3hKc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShCb3hKcyl9YCwgXCJcIik7XG5cdFx0LyoqKioqKioqKioqKioqKioqIEFyZ3VtZW50ICoqKioqKioqKioqKioqKioqL1xuXHRcdGxldCBBcmd1bWVudCA9IHt9O1xuXHRcdGlmICh0eXBlb2YgJGFyZ3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRpZiAoQm9vbGVhbigkYXJndW1lbnQpKSB7XG5cdFx0XHRcdC8vdGhpcy5sb2coYPCfjokgJHt0aGlzLm5hbWV9LCAkQXJndW1lbnRgKTtcblx0XHRcdFx0bGV0IGFyZyA9IE9iamVjdC5mcm9tRW50cmllcygkYXJndW1lbnQuc3BsaXQoXCImXCIpLm1hcCgoaXRlbSkgPT4gaXRlbS5zcGxpdChcIj1cIikubWFwKGkgPT4gaS5yZXBsYWNlKC9cXFwiL2csICcnKSkpKTtcblx0XHRcdFx0Ly90aGlzLmxvZyhKU09OLnN0cmluZ2lmeShhcmcpKTtcblx0XHRcdFx0Zm9yIChsZXQgaXRlbSBpbiBhcmcpIHRoaXMuc2V0UGF0aChBcmd1bWVudCwgaXRlbSwgYXJnW2l0ZW1dKTtcblx0XHRcdFx0Ly90aGlzLmxvZyhKU09OLnN0cmluZ2lmeShBcmd1bWVudCkpO1xuXHRcdFx0fTtcblx0XHRcdC8vdGhpcy5sb2coYOKchSAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgQXJndW1lbnTnsbvlnos6ICR7dHlwZW9mIEFyZ3VtZW50fWAsIGBBcmd1bWVudOWGheWuuTogJHtKU09OLnN0cmluZ2lmeShBcmd1bWVudCl9YCwgXCJcIik7XG5cdFx0fTtcblx0XHQvKioqKioqKioqKioqKioqKiogU3RvcmUgKioqKioqKioqKioqKioqKiovXG5cdFx0Y29uc3QgU3RvcmUgPSB7IFNldHRpbmdzOiBkYXRhYmFzZT8uRGVmYXVsdD8uU2V0dGluZ3MgfHwge30sIENvbmZpZ3M6IGRhdGFiYXNlPy5EZWZhdWx0Py5Db25maWdzIHx8IHt9LCBDYWNoZXM6IHt9IH07XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KG5hbWVzKSkgbmFtZXMgPSBbbmFtZXNdO1xuXHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYG5hbWVz57G75Z6LOiAke3R5cGVvZiBuYW1lc31gLCBgbmFtZXPlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkobmFtZXMpfWAsIFwiXCIpO1xuXHRcdGZvciAobGV0IG5hbWUgb2YgbmFtZXMpIHtcblx0XHRcdFN0b3JlLlNldHRpbmdzID0geyAuLi5TdG9yZS5TZXR0aW5ncywgLi4uZGF0YWJhc2U/LltuYW1lXT8uU2V0dGluZ3MsIC4uLkFyZ3VtZW50LCAuLi5Cb3hKcz8uW25hbWVdPy5TZXR0aW5ncyB9O1xuXHRcdFx0U3RvcmUuQ29uZmlncyA9IHsgLi4uU3RvcmUuQ29uZmlncywgLi4uZGF0YWJhc2U/LltuYW1lXT8uQ29uZmlncyB9O1xuXHRcdFx0aWYgKEJveEpzPy5bbmFtZV0/LkNhY2hlcyAmJiB0eXBlb2YgQm94SnM/LltuYW1lXT8uQ2FjaGVzID09PSBcInN0cmluZ1wiKSBCb3hKc1tuYW1lXS5DYWNoZXMgPSBKU09OLnBhcnNlKEJveEpzPy5bbmFtZV0/LkNhY2hlcyk7XG5cdFx0XHRTdG9yZS5DYWNoZXMgPSB7IC4uLlN0b3JlLkNhY2hlcywgLi4uQm94SnM/LltuYW1lXT8uQ2FjaGVzIH07XG5cdFx0fTtcblx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTdG9yZS5TZXR0aW5nc+exu+WeizogJHt0eXBlb2YgU3RvcmUuU2V0dGluZ3N9YCwgYFN0b3JlLlNldHRpbmdzOiAke0pTT04uc3RyaW5naWZ5KFN0b3JlLlNldHRpbmdzKX1gLCBcIlwiKTtcblx0XHR0aGlzLnRyYXZlcnNlT2JqZWN0KFN0b3JlLlNldHRpbmdzLCAoa2V5LCB2YWx1ZSkgPT4ge1xuXHRcdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIHRyYXZlcnNlT2JqZWN0YCwgYCR7a2V5fTogJHt0eXBlb2YgdmFsdWV9YCwgYCR7a2V5fTogJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCwgXCJcIik7XG5cdFx0XHRpZiAodmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09PSBcImZhbHNlXCIpIHZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7IC8vIOWtl+espuS4sui9rEJvb2xlYW5cblx0XHRcdGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAodmFsdWUuaW5jbHVkZXMoXCIsXCIpKSB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiLFwiKS5tYXAoaXRlbSA9PiB0aGlzLnN0cmluZzJudW1iZXIoaXRlbSkpOyAvLyDlrZfnrKbkuLLovazmlbDnu4TovazmlbDlrZdcblx0XHRcdFx0ZWxzZSB2YWx1ZSA9IHRoaXMuc3RyaW5nMm51bWJlcih2YWx1ZSk7IC8vIOWtl+espuS4sui9rOaVsOWtl1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9KTtcblx0XHQvL3RoaXMubG9nKGDinIUgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYFN0b3JlOiAke3R5cGVvZiBTdG9yZS5DYWNoZXN9YCwgYFN0b3Jl5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KFN0b3JlKX1gLCBcIlwiKTtcblx0XHRyZXR1cm4gU3RvcmU7XG5cdH07XG5cblx0LyoqKioqKioqKioqKioqKioqIGZ1bmN0aW9uICoqKioqKioqKioqKioqKioqL1xuXHRzZXRQYXRoKG9iamVjdCwgcGF0aCwgdmFsdWUpIHsgcGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChvLCBwLCBpKSA9PiBvW3BdID0gcGF0aC5zcGxpdChcIi5cIikubGVuZ3RoID09PSArK2kgPyB2YWx1ZSA6IG9bcF0gfHwge30sIG9iamVjdCkgfVxuXHR0cmF2ZXJzZU9iamVjdChvLCBjKSB7IGZvciAodmFyIHQgaW4gbykgeyB2YXIgbiA9IG9bdF07IG9bdF0gPSBcIm9iamVjdFwiID09IHR5cGVvZiBuICYmIG51bGwgIT09IG4gPyB0aGlzLnRyYXZlcnNlT2JqZWN0KG4sIGMpIDogYyh0LCBuKSB9IHJldHVybiBvIH1cblx0c3RyaW5nMm51bWJlcihzdHJpbmcpIHsgaWYgKHN0cmluZyAmJiAhaXNOYU4oc3RyaW5nKSkgc3RyaW5nID0gcGFyc2VJbnQoc3RyaW5nLCAxMCk7IHJldHVybiBzdHJpbmcgfVxufVxuXG5leHBvcnQgY2xhc3MgSHR0cCB7XG5cdGNvbnN0cnVjdG9yKGVudikge1xuXHRcdHRoaXMuZW52ID0gZW52XG5cdH1cblxuXHRzZW5kKG9wdHMsIG1ldGhvZCA9ICdHRVQnKSB7XG5cdFx0b3B0cyA9IHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJyA/IHsgdXJsOiBvcHRzIH0gOiBvcHRzXG5cdFx0bGV0IHNlbmRlciA9IHRoaXMuZ2V0XG5cdFx0aWYgKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG5cdFx0XHRzZW5kZXIgPSB0aGlzLnBvc3Rcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHNlbmRlci5jYWxsKHRoaXMsIG9wdHMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSByZWplY3QoZXJyb3IpXG5cdFx0XHRcdGVsc2UgcmVzb2x2ZShyZXNwb25zZSlcblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdGdldChvcHRzKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2VuZC5jYWxsKHRoaXMuZW52LCBvcHRzKVxuXHR9XG5cblx0cG9zdChvcHRzKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2VuZC5jYWxsKHRoaXMuZW52LCBvcHRzLCAnUE9TVCcpXG5cdH1cbn1cbiIsIi8vIHJlZmVyOiBodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL2RyYWZ0LXBhbnRvcy1odHRwLWxpdmUtc3RyZWFtaW5nLTA4XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFWFRNM1Uge1xuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XG5cdFx0dGhpcy5uYW1lID0gXCJFWFRNM1UgdjAuOC42XCI7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblx0XHR0aGlzLm5ld0xpbmUgPSAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxuXCIpKSA/IFwiXFxuXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXCIpKSA/IFwiXFxyXCIgOiAodGhpcy5vcHRzLmluY2x1ZGVzKFwiXFxyXFxuXCIpKSA/IFwiXFxyXFxuXCIgOiBcIlxcblwiO1xuXHR9O1xuXG5cdHBhcnNlKG0zdTggPSBuZXcgU3RyaW5nKSB7XG5cdFx0Y29uc3QgRVhUTTNVX1JlZ2V4ID0gL14oPzooPzxUQUc+Iyg/OkVYVHxBSVYpW14jOlxcc1xcclxcbl0rKSg/OjooPzxPUFRJT04+W15cXHJcXG5dKykpPyg/Oig/OlxcclxcbnxcXHJ8XFxuKSg/PFVSST5bXiNcXHNcXHJcXG5dKykpP3woPzxOT1RFPiNbXlxcclxcbl0rKT8pKD86XFxyXFxufFxccnxcXG4pPyQvZ207XG5cdFx0bGV0IGpzb24gPSBbLi4ubTN1OC5tYXRjaEFsbChFWFRNM1VfUmVnZXgpXS5tYXAoaXRlbSA9PiB7XG5cdFx0XHRpdGVtID0gaXRlbT8uZ3JvdXBzIHx8IGl0ZW07XG5cdFx0XHRpZiAoLz0vLnRlc3QoaXRlbT8uT1BUSU9OKSkgaXRlbS5PUFRJT04gPSBPYmplY3QuZnJvbUVudHJpZXMoYCR7aXRlbS5PUFRJT059XFwsYC5zcGxpdCgvLFxccyooPyFbXlwiXSpcIiwpLykuc2xpY2UoMCwgLTEpLm1hcChvcHRpb24gPT4ge1xuXHRcdFx0XHRvcHRpb24gPSBvcHRpb24uc3BsaXQoLz0oLiopLyk7XG5cdFx0XHRcdG9wdGlvblsxXSA9IChpc05hTihvcHRpb25bMV0pKSA/IG9wdGlvblsxXS5yZXBsYWNlKC9eXCIoLiopXCIkLywgXCIkMVwiKSA6IHBhcnNlSW50KG9wdGlvblsxXSwgMTApO1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9uO1xuXHRcdFx0fSkpO1xuXHRcdFx0cmV0dXJuIGl0ZW1cblx0XHR9KTtcblx0XHRyZXR1cm4ganNvblxuXHR9O1xuXG5cdHN0cmluZ2lmeShqc29uID0gbmV3IEFycmF5KSB7XG5cdFx0aWYgKGpzb24/LlswXT8uVEFHICE9PSBcIiNFWFRNM1VcIikganNvbi51bnNoaWZ0KHsgXCJUQUdcIjogXCIjRVhUTTNVXCIgfSlcblx0XHRjb25zdCBPUFRJT05fdmFsdWVfUmVnZXggPSAvXigoLT9cXGQrW3guXFxkXSspfFswLTlBLVotXSspJC87XG5cdFx0bGV0IG0zdTggPSBqc29uLm1hcChpdGVtID0+IHtcblx0XHRcdGlmICh0eXBlb2YgaXRlbT8uT1BUSU9OID09PSBcIm9iamVjdFwiKSBpdGVtLk9QVElPTiA9IE9iamVjdC5lbnRyaWVzKGl0ZW0uT1BUSU9OKS5tYXAob3B0aW9uID0+IHtcblx0XHRcdFx0aWYgKGl0ZW0/LlRBRyA9PT0gXCIjRVhULVgtU0VTU0lPTi1EQVRBXCIpIG9wdGlvblsxXSA9IGBcIiR7b3B0aW9uWzFdfVwiYDtcblx0XHRcdFx0ZWxzZSBpZiAoIWlzTmFOKG9wdGlvblsxXSkpIG9wdGlvblsxXSA9ICh0eXBlb2Ygb3B0aW9uWzFdID09PSBcIm51bWJlclwiKSA/IG9wdGlvblsxXSA6IGBcIiR7b3B0aW9uWzFdfVwiYDtcblx0XHRcdFx0ZWxzZSBpZiAob3B0aW9uWzBdID09PSBcIklEXCIgfHwgb3B0aW9uWzBdID09PSBcIklOU1RSRUFNLUlEXCIgfHwgb3B0aW9uWzBdID09PSBcIktFWUZPUk1BVFwiKSBvcHRpb25bMV0gPSBgXCIke29wdGlvblsxXX1cImA7XG5cdFx0XHRcdGVsc2UgaWYgKCFPUFRJT05fdmFsdWVfUmVnZXgudGVzdChvcHRpb25bMV0pKSBvcHRpb25bMV0gPSBgXCIke29wdGlvblsxXX1cImA7XG5cdFx0XHRcdHJldHVybiBvcHRpb24uam9pbihcIj1cIik7XG5cdFx0XHR9KS5qb2luKFwiLFwiKTtcblx0XHRcdHJldHVybiBpdGVtID0gKGl0ZW0/LlVSSSkgPyBpdGVtLlRBRyArIFwiOlwiICsgaXRlbS5PUFRJT04gKyB0aGlzLm5ld0xpbmUgKyBpdGVtLlVSSVxuXHRcdFx0XHQ6IChpdGVtPy5PUFRJT04pID8gaXRlbS5UQUcgKyBcIjpcIiArIGl0ZW0uT1BUSU9OXG5cdFx0XHRcdFx0OiAoaXRlbT8uVEFHKSA/IGl0ZW0uVEFHXG5cdFx0XHRcdFx0XHQ6IChpdGVtPy5OT1RFKSA/IGl0ZW0uTk9URVxuXHRcdFx0XHRcdFx0XHQ6IFwiXCI7XG5cdFx0fSkuam9pbih0aGlzLm5ld0xpbmUpO1xuXHRcdHJldHVybiBtM3U4XG5cdH07XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVVJJIHtcblx0Y29uc3RydWN0b3Iob3B0cyA9IFtdKSB7XG5cdFx0dGhpcy5uYW1lID0gXCJVUkkgdjEuMi42XCI7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblx0XHR0aGlzLmpzb24gPSB7IHNjaGVtZTogXCJcIiwgaG9zdDogXCJcIiwgcGF0aDogXCJcIiwgcXVlcnk6IHt9IH07XG5cdH07XG5cblx0cGFyc2UodXJsKSB7XG5cdFx0Y29uc3QgVVJMUmVnZXggPSAvKD86KD88c2NoZW1lPi4rKTpcXC9cXC8oPzxob3N0PlteL10rKSk/XFwvPyg/PHBhdGg+W14/XSspP1xcPz8oPzxxdWVyeT5bXj9dKyk/Lztcblx0XHRsZXQganNvbiA9IHVybC5tYXRjaChVUkxSZWdleCk/Lmdyb3VwcyA/PyBudWxsO1xuXHRcdGlmIChqc29uPy5wYXRoKSBqc29uLnBhdGhzID0ganNvbi5wYXRoLnNwbGl0KFwiL1wiKTsgZWxzZSBqc29uLnBhdGggPSBcIlwiO1xuXHRcdC8vaWYgKGpzb24/LnBhdGhzPy5hdCgtMSk/LmluY2x1ZGVzKFwiLlwiKSkganNvbi5mb3JtYXQgPSBqc29uLnBhdGhzLmF0KC0xKS5zcGxpdChcIi5cIikuYXQoLTEpO1xuXHRcdGlmIChqc29uPy5wYXRocykge1xuXHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBqc29uLnBhdGhzW2pzb24ucGF0aHMubGVuZ3RoIC0gMV07XG5cdFx0XHRpZiAoZmlsZU5hbWU/LmluY2x1ZGVzKFwiLlwiKSkge1xuXHRcdFx0XHRjb25zdCBsaXN0ID0gZmlsZU5hbWUuc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHRqc29uLmZvcm1hdCA9IGxpc3RbbGlzdC5sZW5ndGggLSAxXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGpzb24/LnF1ZXJ5KSBqc29uLnF1ZXJ5ID0gT2JqZWN0LmZyb21FbnRyaWVzKGpzb24ucXVlcnkuc3BsaXQoXCImXCIpLm1hcCgocGFyYW0pID0+IHBhcmFtLnNwbGl0KFwiPVwiKSkpO1xuXHRcdHJldHVybiBqc29uXG5cdH07XG5cblx0c3RyaW5naWZ5KGpzb24gPSB0aGlzLmpzb24pIHtcblx0XHRsZXQgdXJsID0gXCJcIjtcblx0XHRpZiAoanNvbj8uc2NoZW1lICYmIGpzb24/Lmhvc3QpIHVybCArPSBqc29uLnNjaGVtZSArIFwiOi8vXCIgKyBqc29uLmhvc3Q7XG5cdFx0aWYgKGpzb24/LnBhdGgpIHVybCArPSAoanNvbj8uaG9zdCkgPyBcIi9cIiArIGpzb24ucGF0aCA6IGpzb24ucGF0aDtcblx0XHRpZiAoanNvbj8ucXVlcnkpIHVybCArPSBcIj9cIiArIE9iamVjdC5lbnRyaWVzKGpzb24ucXVlcnkpLm1hcChwYXJhbSA9PiBwYXJhbS5qb2luKFwiPVwiKSkuam9pbihcIiZcIik7XG5cdFx0cmV0dXJuIHVybFxuXHR9O1xufVxuIiwiLyoqXG4gKiBkZXRlY3QgRm9ybWF0XG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge09iamVjdH0gdXJsIC0gUGFyc2VkIFVSTFxuICogQHBhcmFtIHtTdHJpbmd9IGJvZHkgLSByZXNwb25zZSBib2R5XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdCAtIGZvcm1hdFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RGb3JtYXQodXJsLCBib2R5KSB7XG5cdGxldCBmb3JtYXQgPSB1bmRlZmluZWQ7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gZGV0ZWN0Rm9ybWF0LCBmb3JtYXQ6ICR7dXJsLmZvcm1hdCA/PyB1cmwucXVlcnk/LmZtdCA/PyB1cmwucXVlcnk/LmZvcm1hdH1gLCBcIlwiKTtcblx0c3dpdGNoICh1cmwuZm9ybWF0ID8/IHVybC5xdWVyeT8uZm10ID8/IHVybC5xdWVyeT8uZm9ybWF0KSB7XG5cdFx0Y2FzZSBcInR4dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3BsYWluXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwieG1sXCI6XG5cdFx0Y2FzZSBcInNydjNcIjpcblx0XHRjYXNlIFwidHRtbFwiOlxuXHRcdGNhc2UgXCJ0dG1sMlwiOlxuXHRcdGNhc2UgXCJpbXNjXCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQveG1sXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwidnR0XCI6XG5cdFx0Y2FzZSBcIndlYnZ0dFwiOlxuXHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImpzb25cIjpcblx0XHRjYXNlIFwianNvbjNcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIm0zdVwiOlxuXHRcdGNhc2UgXCJtM3U4XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3gtbXBlZ3VybFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInBsaXN0XCI6XG5cdFx0XHRmb3JtYXQgPSBcImFwcGxpY2F0aW9uL3BsaXN0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdGNvbnN0IEhFQURFUiA9IGJvZHk/LnN1YnN0cmluZz8uKDAsIDYpLnRyaW0/LigpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhg8J+apyBkZXRlY3RGb3JtYXQsIEhFQURFUjogJHtIRUFERVJ9YCwgXCJcIik7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGDwn5qnIGRldGVjdEZvcm1hdCwgSEVBREVSPy5zdWJzdHJpbmc/LigwLCAxKTogJHtIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpfWAsIFwiXCIpO1xuXHRcdFx0c3dpdGNoIChIRUFERVIpIHtcblx0XHRcdFx0Y2FzZSBcIjw/eG1sXCI6XG5cdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3htbFwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiV0VCVlRUXCI6XG5cdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHN3aXRjaCAoSEVBREVSPy5zdWJzdHJpbmc/LigwLCAxKSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIjBcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCIxXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiMlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjNcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI0XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiNVwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI3XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiOFwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjlcIjpcblx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gXCJ0ZXh0L3Z0dFwiO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJ7XCI6XG5cdFx0XHRcdFx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdFx0YnJlYWs7XG5cdH07XG5cdGNvbnNvbGUubG9nKGDinIUgZGV0ZWN0Rm9ybWF0LCBmb3JtYXQ6ICR7Zm9ybWF0fWAsIFwiXCIpO1xuXHRyZXR1cm4gZm9ybWF0O1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdFBsYXRmb3JtKHVybCkge1xuXHRjb25zb2xlLmxvZyhg4piR77iPIERldGVjdCBQbGF0Zm9ybWAsIFwiXCIpO1xuXHQvKioqKioqKioqKioqKioqKiogUGxhdGZvcm0gKioqKioqKioqKioqKioqKiovXG5cdGxldCBQbGF0Zm9ybSA9IC9cXC4obmV0ZmxpeFxcLmNvbXxuZmx4dmlkZW9cXC5uZXQpL2kudGVzdCh1cmwpID8gXCJOZXRmbGl4XCJcblx0XHQ6IC8oXFwueW91dHViZXx5b3V0dWJlaVxcLmdvb2dsZWFwaXMpXFwuY29tL2kudGVzdCh1cmwpID8gXCJZb3VUdWJlXCJcblx0XHRcdDogL1xcLnNwb3RpZnkoY2RuKT9cXC5jb20vaS50ZXN0KHVybCkgPyBcIlNwb3RpZnlcIlxuXHRcdFx0XHQ6IC9cXC5hcHBsZVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiQXBwbGVcIlxuXHRcdFx0XHRcdDogL1xcLihkc3NvdHR8c3Rhcm90dClcXC5jb20vaS50ZXN0KHVybCkgPyBcIkRpc25leStcIlxuXHRcdFx0XHRcdFx0OiAvKFxcLihwdi1jZG58YWl2LWNkbnxha2FtYWloZHxjbG91ZGZyb250KVxcLm5ldCl8czNcXC5hbWF6b25hd3NcXC5jb21cXC9haXYtcHJvZC10aW1lZHRleHRcXC8vaS50ZXN0KHVybCkgPyBcIlByaW1lVmlkZW9cIlxuXHRcdFx0XHRcdFx0XHQ6IC9wcmRcXC5tZWRpYVxcLmgyNjRcXC5pby9pLnRlc3QodXJsKSA/IFwiTWF4XCJcblx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oYXBpXFwuaGJvfGhib21heGNkbilcXC5jb20vaS50ZXN0KHVybCkgPyBcIkhCT01heFwiXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oaHVsdXN0cmVhbXxodWx1aW0pXFwuY29tL2kudGVzdCh1cmwpID8gXCJIdWx1XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwuKGNic2FhdmlkZW98Y2JzaXZpZGVvfGNicylcXC5jb20vaS50ZXN0KHVybCkgPyBcIlBhcmFtb3VudCtcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnVwbHlua1xcLmNvbS9pLnRlc3QodXJsKSA/IFwiRGlzY292ZXJ5K1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9kcGx1cy1waC0vaS50ZXN0KHVybCkgPyBcIkRpc2NvdmVyeStQaFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnBlYWNvY2t0dlxcLmNvbS9pLnRlc3QodXJsKSA/IFwiUGVhY29ja1RWXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC5mdWJvXFwudHYvaS50ZXN0KHVybCkgPyBcIkZ1Ym9UVlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC52aWtpXFwuaW8vaS50ZXN0KHVybCkgPyBcIlZpa2lcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC8oZXBpeGhsc1xcLmFrYW1haXplZFxcLm5ldHxlcGl4XFwuc2VydmljZXNcXC5pbykvaS50ZXN0KHVybCkgPyBcIk1HTStcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLm5lYnVsYVxcLmFwcHwvaS50ZXN0KHVybCkgPyBcIk5lYnVsYVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IFwiVW5pdmVyc2FsXCI7XG4gICAgY29uc29sZS5sb2coYOKchSBEZXRlY3QgUGxhdGZvcm0sIFBsYXRmb3JtOiAke1BsYXRmb3JtfWAsIFwiXCIpO1xuXHRyZXR1cm4gUGxhdGZvcm07XG59O1xuIiwiLypcblJFQURNRTogaHR0cHM6Ly9naXRodWIuY29tL0R1YWxTdWJzXG4qL1xuXG5pbXBvcnQgRU5WcyBmcm9tIFwiLi4vRU5WL0VOVi5tanNcIjtcbmNvbnN0ICQgPSBuZXcgRU5WcyhcIvCfjb/vuI8gRHVhbFN1YnM6IFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNcIik7XG5cbi8qKlxuICogU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc1xuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBQZXJzaXN0ZW50IFN0b3JlIEtleVxuICogQHBhcmFtIHtBcnJheX0gcGxhdGZvcm1zIC0gUGxhdGZvcm0gTmFtZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZSAtIERlZmF1bHQgRGF0YUJhc2VcbiAqIEByZXR1cm4ge09iamVjdH0geyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0RU5WKG5hbWUsIHBsYXRmb3JtcywgZGF0YWJhc2UpIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX1gLCBcIlwiKTtcblx0bGV0IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9ID0gJC5nZXRFTlYobmFtZSwgcGxhdGZvcm1zLCBkYXRhYmFzZSk7XG5cdC8qKioqKioqKioqKioqKioqKiBTZXR0aW5ncyAqKioqKioqKioqKioqKioqKi9cblx0aWYgKCFBcnJheS5pc0FycmF5KFNldHRpbmdzPy5UeXBlcykpIFNldHRpbmdzLlR5cGVzID0gKFNldHRpbmdzLlR5cGVzKSA/IFtTZXR0aW5ncy5UeXBlc10gOiBbXTsgLy8g5Y+q5pyJ5LiA5Liq6YCJ6aG55pe277yM5peg6YCX5Y+35YiG6ZqUXG5cdGlmICgkLmlzTG9vbigpICYmIHBsYXRmb3Jtcy5pbmNsdWRlcyhcIllvdVR1YmVcIikpIHtcblx0XHRTZXR0aW5ncy5BdXRvQ0MgPSAkcGVyc2lzdGVudFN0b3JlLnJlYWQoXCLoh6rliqjmmL7npLrnv7vor5HlrZfluZVcIikgPz8gU2V0dGluZ3MuQXV0b0NDO1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuQXV0b0NDKSB7XG5cdFx0XHRjYXNlIFwi5pivXCI6XG5cdFx0XHRcdFNldHRpbmdzLkF1dG9DQyA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIuWQplwiOlxuXHRcdFx0XHRTZXR0aW5ncy5BdXRvQ0MgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdFNldHRpbmdzLlNob3dPbmx5ID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi5LuF6L6T5Ye66K+R5paHXCIpID8/IFNldHRpbmdzLlNob3dPbmx5O1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuU2hvd09ubHkpIHtcblx0XHRcdGNhc2UgXCLmmK9cIjpcblx0XHRcdFx0U2V0dGluZ3MuU2hvd09ubHkgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCLlkKZcIjpcblx0XHRcdFx0U2V0dGluZ3MuU2hvd09ubHkgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHRcdFNldHRpbmdzLlBvc2l0aW9uID0gJHBlcnNpc3RlbnRTdG9yZS5yZWFkKFwi5a2X5bmV6K+R5paH5L2N572uXCIpID8/IFNldHRpbmdzLlBvc2l0aW9uO1xuXHRcdHN3aXRjaCAoU2V0dGluZ3MuUG9zaXRpb24pIHtcblx0XHRcdGNhc2UgXCLor5HmlofkvY3kuo7lpJbmlofkuYvkuIpcIjpcblx0XHRcdFx0U2V0dGluZ3MuUG9zaXRpb24gPSBcIkZvcndhcmRcIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwi6K+R5paH5L2N5LqO5aSW5paH5LmL5LiLXCI6XG5cdFx0XHRcdFNldHRpbmdzLlBvc2l0aW9uID0gXCJSZXZlcnNlXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fTtcblx0fTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU2V0dGluZ3M6ICR7dHlwZW9mIFNldHRpbmdzfWAsIGBTZXR0aW5nc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShTZXR0aW5ncyl9YCwgXCJcIik7XG5cdC8qKioqKioqKioqKioqKioqKiBDYWNoZXMgKioqKioqKioqKioqKioqKiovXG5cdC8vJC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgQ2FjaGVzOiAke3R5cGVvZiBDYWNoZXN9YCwgYENhY2hlc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShDYWNoZXMpfWAsIFwiXCIpO1xuXHRpZiAodHlwZW9mIENhY2hlcz8uUGxheWxpc3RzICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoQ2FjaGVzPy5QbGF5bGlzdHMpKSBDYWNoZXMuUGxheWxpc3RzID0ge307IC8vIOWIm+W7ulBsYXlsaXN0c+e8k+WtmFxuXHRDYWNoZXMuUGxheWxpc3RzLk1hc3RlciA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlBsYXlsaXN0cz8uTWFzdGVyIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0Q2FjaGVzLlBsYXlsaXN0cy5TdWJ0aXRsZSA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/LlBsYXlsaXN0cz8uU3VidGl0bGUgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHRpZiAodHlwZW9mIENhY2hlcz8uU3VidGl0bGVzICE9PSBcIm9iamVjdFwiKSBDYWNoZXMuU3VidGl0bGVzID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uU3VidGl0bGVzIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0aWYgKHR5cGVvZiBDYWNoZXM/Lk1ldGFkYXRhcyAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KENhY2hlcz8uTWV0YWRhdGFzKSkgQ2FjaGVzLk1ldGFkYXRhcyA9IHt9OyAvLyDliJvlu7pQbGF5bGlzdHPnvJPlrZhcblx0aWYgKHR5cGVvZiBDYWNoZXM/Lk1ldGFkYXRhcz8uVHJhY2tzICE9PSBcIm9iamVjdFwiKSBDYWNoZXMuTWV0YWRhdGFzLlRyYWNrcyA9IG5ldyBNYXAoSlNPTi5wYXJzZShDYWNoZXM/Lk1ldGFkYXRhcz8uVHJhY2tzIHx8IFwiW11cIikpOyAvLyBTdHJpbmdz6L2sQXJyYXnovaxNYXBcblx0LyoqKioqKioqKioqKioqKioqIENvbmZpZ3MgKioqKioqKioqKioqKioqKiovXG5cdHJldHVybiB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG5SRUFETUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9EdWFsU3Vic1xuKi9cblxuaW1wb3J0IEVOVnMgZnJvbSBcIi4vRU5WL0VOVi5tanNcIjtcbmltcG9ydCBVUklzIGZyb20gXCIuL1VSSS9VUkkubWpzXCI7XG5pbXBvcnQgRVhUTTNVIGZyb20gXCIuL0VYVE0zVS9FWFRNM1UubWpzXCI7XG5cbmltcG9ydCBzZXRFTlYgZnJvbSBcIi4vZnVuY3Rpb24vc2V0RU5WLm1qc1wiO1xuaW1wb3J0IGRldGVjdFBsYXRmb3JtIGZyb20gXCIuL2Z1bmN0aW9uL2RldGVjdFBsYXRmb3JtLm1qc1wiO1xuaW1wb3J0IGRldGVjdEZvcm1hdCBmcm9tIFwiLi9mdW5jdGlvbi9kZXRlY3RGb3JtYXQubWpzXCI7XG5cbmltcG9ydCAqIGFzIERhdGFiYXNlIGZyb20gXCIuL2RhdGFiYXNlL0RhdGFiYXNlLmpzb25cIjtcblxuY29uc3QgJCA9IG5ldyBFTlZzKFwi8J+Nv++4jyBEdWFsU3Viczog8J+OpiBVbml2ZXJzYWwgdjAuOS41KDIpIE0zVTguU3VidGl0bGVzLnJlc3BvbnNlLmJldGFcIik7XG5jb25zdCBVUkkgPSBuZXcgVVJJcygpO1xuY29uc3QgTTNVOCA9IG5ldyBFWFRNM1UoW1wiXFxuXCJdKTtcblxuLyoqKioqKioqKioqKioqKioqIFByb2Nlc3NpbmcgKioqKioqKioqKioqKioqKiovXG4vLyDop6PmnoRVUkxcbmNvbnN0IFVSTCA9IFVSSS5wYXJzZSgkcmVxdWVzdC51cmwpO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgVVJMOiAke0pTT04uc3RyaW5naWZ5KFVSTCl9YCwgXCJcIik7XG4vLyDojrflj5bov57mjqXlj4LmlbBcbmNvbnN0IE1FVEhPRCA9ICRyZXF1ZXN0Lm1ldGhvZCwgSE9TVCA9IFVSTC5ob3N0LCBQQVRIID0gVVJMLnBhdGgsIFBBVEhzID0gVVJMLnBhdGhzO1xuJC5sb2coYOKaoCAkeyQubmFtZX1gLCBgTUVUSE9EOiAke01FVEhPRH1gLCBcIlwiKTtcbi8vIOiOt+WPluW5s+WPsFxuY29uc3QgUExBVEZPUk0gPSBkZXRlY3RQbGF0Zm9ybShIT1NUKTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBQTEFURk9STTogJHtQTEFURk9STX1gLCBcIlwiKTtcbi8vIOino+aekOagvOW8j1xubGV0IEZPUk1BVCA9ICgkcmVzcG9uc2UuaGVhZGVycz8uW1wiQ29udGVudC1UeXBlXCJdID8/ICRyZXNwb25zZS5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcbmlmIChGT1JNQVQgPT09IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfHwgRk9STUFUID09PSBcInRleHQvcGxhaW5cIikgRk9STUFUID0gZGV0ZWN0Rm9ybWF0KFVSTCwgJHJlc3BvbnNlPy5ib2R5KTtcbiQubG9nKGDimqAgJHskLm5hbWV9LCBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuKGFzeW5jICgpID0+IHtcblx0Ly8g6K+75Y+W6K6+572uXG5cdGNvbnN0IHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9ID0gc2V0RU5WKFwiRHVhbFN1YnNcIiwgWyhbXCJZb3VUdWJlXCIsIFwiTmV0ZmxpeFwiLCBcIkJpbGlCaWxpXCIsIFwiU3BvdGlmeVwiXS5pbmNsdWRlcyhQTEFURk9STSkpID8gUExBVEZPUk0gOiBcIlVuaXZlcnNhbFwiLCBcIkNvbXBvc2l0ZVwiXSwgRGF0YWJhc2UpO1xuXHQkLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBTZXR0aW5ncy5Td2l0Y2g6ICR7U2V0dGluZ3M/LlN3aXRjaH1gLCBcIlwiKTtcblx0c3dpdGNoIChTZXR0aW5ncy5Td2l0Y2gpIHtcblx0XHRjYXNlIHRydWU6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdC8vIOiOt+WPluWtl+W5leexu+Wei+S4juivreiogFxuXHRcdFx0Y29uc3QgVHlwZSA9IFVSTC5xdWVyeT8uc3VidHlwZSA/PyBTZXR0aW5ncy5UeXBlLCBMYW5ndWFnZXMgPSBbVVJMLnF1ZXJ5Py5sYW5nPy50b1VwcGVyQ2FzZT8uKCkgPz8gU2V0dGluZ3MuTGFuZ3VhZ2VzWzBdLCAoVVJMLnF1ZXJ5Py50bGFuZyA/PyBDYWNoZXM/LnRsYW5nKT8udG9VcHBlckNhc2U/LigpID8/IFNldHRpbmdzLkxhbmd1YWdlc1sxXV07XG5cdFx0XHQkLmxvZyhg4pqgICR7JC5uYW1lfSwgVHlwZTogJHtUeXBlfSwgTGFuZ3VhZ2VzOiAke0xhbmd1YWdlc31gLCBcIlwiKTtcblx0XHRcdC8vIOWIm+W7uuepuuaVsOaNrlxuXHRcdFx0bGV0IGJvZHkgPSB7fTtcblx0XHRcdC8vIOWkhOeQhuexu+Wei1xuXHRcdFx0c3dpdGNoIChUeXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJPZmZpY2lhbFwiOlxuXHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIFwi5a6Y5pa55a2X5bmVXCIsIFwiXCIpO1xuXHRcdFx0XHRcdC8vIOiOt+WPluWtl+W5leaSreaUvuWIl+ihqG0zdTjnvJPlrZjvvIhtYXDvvIlcblx0XHRcdFx0XHRjb25zdCB7IHN1YnRpdGxlc1BsYXlsaXN0LCBzdWJ0aXRsZXNQbGF5bGlzdEluZGV4IH0gPSBnZXRQbGF5bGlzdENhY2hlKCRyZXF1ZXN0LnVybCwgQ2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXIsIExhbmd1YWdlc1swXSkgPz8gZ2V0UGxheWxpc3RDYWNoZSgkcmVxdWVzdC51cmwsIENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyLCBMYW5ndWFnZXNbMV0pO1xuXHRcdFx0XHRcdC8vIOWGmeWFpeWtl+W5leaWh+S7tuWcsOWdgHZ0dOe8k+WtmO+8iG1hcO+8iVxuXHRcdFx0XHRcdENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUgPSBhd2FpdCBzZXRTdWJ0aXRsZXNDYWNoZShDYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlLCBzdWJ0aXRsZXNQbGF5bGlzdCwgTGFuZ3VhZ2VzWzBdLCBzdWJ0aXRsZXNQbGF5bGlzdEluZGV4LCBQTEFURk9STSk7XG5cdFx0XHRcdFx0Q2FjaGVzLlBsYXlsaXN0cy5TdWJ0aXRsZSA9IGF3YWl0IHNldFN1YnRpdGxlc0NhY2hlKENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUsIHN1YnRpdGxlc1BsYXlsaXN0LCBMYW5ndWFnZXNbMV0sIHN1YnRpdGxlc1BsYXlsaXN0SW5kZXgsIFBMQVRGT1JNKTtcblx0XHRcdFx0XHQvLyDmoLzlvI/ljJbnvJPlrZhcblx0XHRcdFx0XHRDYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlID0gc2V0Q2FjaGUoQ2FjaGVzPy5QbGF5bGlzdHMuU3VidGl0bGUsIFNldHRpbmdzLkNhY2hlU2l6ZSk7XG5cdFx0XHRcdFx0Ly8g5YaZ5YWl57yT5a2YXG5cdFx0XHRcdFx0JC5zZXRqc29uKENhY2hlcy5QbGF5bGlzdHMuU3VidGl0bGUsIGBARHVhbFN1YnMuJHtcIkNvbXBvc2l0ZVwifS5DYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlYCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJUcmFuc2xhdGVcIjpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIOe/u+ivkeWtl+W5lWAsIFwiXCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiRXh0ZXJuYWxcIjpcblx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIOWkluaMguWtl+W5lWAsIFwiXCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdC8vIOagvOW8j+WIpOaWrVxuXHRcdFx0c3dpdGNoIChGT1JNQVQpIHtcblx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6IC8vIOinhuS4uuaXoGJvZHlcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiOlxuXHRcdFx0XHRjYXNlIFwidGV4dC9wbGFpblwiOlxuXHRcdFx0XHRjYXNlIFwidGV4dC9odG1sXCI6XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LW1wZWdVUkxcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3gtbXBlZ3VybFwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmxcIjpcblx0XHRcdFx0Y2FzZSBcImF1ZGlvL21wZWd1cmxcIjpcblx0XHRcdFx0XHQvLyDluo/liJfljJZNM1U4XG5cdFx0XHRcdFx0Ym9keSA9IE0zVTgucGFyc2UoJHJlc3BvbnNlLmJvZHkpO1xuXHRcdFx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfWAsIGBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAsIFwiXCIpO1xuXHRcdFx0XHRcdC8vIFdlYlZUVC5tM3U45Yqg5Y+C5pWwXG5cdFx0XHRcdFx0Ym9keSA9IGJvZHkubWFwKGl0ZW0gPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGl0ZW0/LlVSSSkge1xuXHRcdFx0XHRcdFx0Ly9pZiAoaXRlbT8uVVJJPy5pbmNsdWRlcyhcInZ0dFwiKSB8fCBpdGVtPy5VUkk/LmluY2x1ZGVzKFwidHRtbFwiKSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBzeW1ib2wgPSAoaXRlbS5VUkkuaW5jbHVkZXMoXCI/XCIpKSA/IFwiJlwiIDogXCI/XCI7XG5cdFx0XHRcdFx0XHRcdGlmIChpdGVtPy5VUkk/LmluY2x1ZGVzKFwiZW1wdHlcIikpIHt9XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGl0ZW0/LlVSST8uaW5jbHVkZXMoXCJibGFua1wiKSkge31cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoaXRlbT8uVVJJPy5pbmNsdWRlcyhcImRlZmF1bHRcIikpIHt9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdC8vaWYgKFVSTC5xdWVyeT8uc3VibGFuZykgaXRlbS5VUkkgKz0gYCR7c3ltYm9sfXN1YnR5cGU9JHtUeXBlfSZzdWJsYW5nPSR7VVJMLnF1ZXJ5LnN1Ymxhbmd9YDtcblx0XHRcdFx0XHRcdFx0XHQvL2Vsc2UgaXRlbS5VUkkgKz0gYCR7c3ltYm9sfXN1YnR5cGU9JHtUeXBlfWA7XG5cdFx0XHRcdFx0XHRcdFx0aXRlbS5VUkkgKz0gYCR7c3ltYm9sfXN1YnR5cGU9JHtUeXBlfWA7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKFVSTC5xdWVyeT8ubGFuZykgaXRlbS5VUkkgKz0gYCZsYW5nPSR7VVJMLnF1ZXJ5Lmxhbmd9YDtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdGlmIChQTEFURk9STSA9PT0gXCJQcmltZVZpZGVvXCIpIHtcblx0XHRcdFx0XHRcdC8vIOWIoOmZpEJZVEVSQU5HRVxuXHRcdFx0XHRcdFx0Ly9ib2R5ID0gYm9keS5maWx0ZXIoKHsgVEFHIH0pID0+IFRBRyAhPT0gXCIjRVhULVgtQllURVJBTkdFXCIpO1xuXHRcdFx0XHRcdFx0Ym9keSA9IGJvZHkubWFwKChpdGVtLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChpdGVtLlRBRyA9PT0gXCIjRVhULVgtQllURVJBTkdFXCIpIGJvZHlbaSAtIDFdLlVSSSA9IGl0ZW0uVVJJO1xuXHRcdFx0XHRcdFx0XHRlbHNlIHJldHVybiBpdGVtO1xuXHRcdFx0XHRcdFx0fSkuZmlsdGVyKGUgPT4gZSk7XG5cdFx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIFwiYm9keS5tYXBcIiwgSlNPTi5zdHJpbmdpZnkoYm9keSksIFwiXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyDlrZfnrKbkuLJNM1U4XG5cdFx0XHRcdFx0JHJlc3BvbnNlLmJvZHkgPSBNM1U4LnN0cmluZ2lmeShib2R5KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0YnJlYWs7XG5cdH07XG59KSgpXG5cdC5jYXRjaCgoZSkgPT4gJC5sb2dFcnIoZSkpXG5cdC5maW5hbGx5KCgpID0+IHtcblx0XHRzd2l0Y2ggKCRyZXNwb25zZSkge1xuXHRcdFx0ZGVmYXVsdDogeyAvLyDmnInlm57lpI3mlbDmja7vvIzov5Tlm57lm57lpI3mlbDmja5cblx0XHRcdFx0Ly9jb25zdCBGT1JNQVQgPSAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJDb250ZW50LVR5cGVcIl0gPz8gJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LXR5cGVcIl0pPy5zcGxpdChcIjtcIik/LlswXTtcblx0XHRcdFx0JC5sb2coYPCfjokgJHskLm5hbWV9LCBmaW5hbGx5YCwgYCRyZXNwb25zZWAsIGBGT1JNQVQ6ICR7Rk9STUFUfWAsIFwiXCIpO1xuXHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgZmluYWxseWAsIGAkcmVzcG9uc2U6ICR7SlNPTi5zdHJpbmdpZnkoJHJlc3BvbnNlKX1gLCBcIlwiKTtcblx0XHRcdFx0aWYgKCRyZXNwb25zZT8uaGVhZGVycz8uW1wiQ29udGVudC1FbmNvZGluZ1wiXSkgJHJlc3BvbnNlLmhlYWRlcnNbXCJDb250ZW50LUVuY29kaW5nXCJdID0gXCJpZGVudGl0eVwiO1xuXHRcdFx0XHRpZiAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJjb250ZW50LWVuY29kaW5nXCJdKSAkcmVzcG9uc2UuaGVhZGVyc1tcImNvbnRlbnQtZW5jb2RpbmdcIl0gPSBcImlkZW50aXR5XCI7XG5cdFx0XHRcdGlmICgkLmlzUXVhblgoKSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdFx0XHRjYXNlIHVuZGVmaW5lZDogLy8g6KeG5Li65pegYm9keVxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycyB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57mma7pgJrmlbDmja5cblx0XHRcdFx0XHRcdFx0JC5kb25lKHsgc3RhdHVzOiAkcmVzcG9uc2Uuc3RhdHVzLCBoZWFkZXJzOiAkcmVzcG9uc2UuaGVhZGVycywgYm9keTogJHJlc3BvbnNlLmJvZHkgfSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3Byb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUucHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vZ3JwYytwcm90b1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxlY2F0aW9uL29jdGV0LXN0cmVhbVwiOlxuXHRcdFx0XHRcdFx0XHQvLyDov5Tlm57kuozov5vliLbmlbDmja5cblx0XHRcdFx0XHRcdFx0Ly8kLmxvZyhgJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVMZW5ndGh9LS0tJHskcmVzcG9uc2UuYm9keUJ5dGVzLmJ1ZmZlci5ieXRlTGVuZ3RofWApO1xuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzLCBib2R5Qnl0ZXM6ICRyZXNwb25zZS5ib2R5Qnl0ZXMuYnVmZmVyLnNsaWNlKCRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZU9mZnNldCwgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlTGVuZ3RoICsgJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlT2Zmc2V0KSB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlICQuZG9uZSgkcmVzcG9uc2UpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDogeyAvLyDml6Dlm57lpI3mlbDmja5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0pXG5cbi8qKioqKioqKioqKioqKioqKiBGdW5jdGlvbiAqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogR2V0IFBsYXlsaXN0IENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gUmVxdWVzdCBVUkwgLyBNYXN0ZXIgUGxheWxpc3QgVVJMXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBQbGF5bGlzdCBDYWNoZVxuICogQHBhcmFtIHtTdHJpbmd9IGxhbmd1YWdlIC0gTGFuZ3VhZ2VcbiAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn0geyBtYXN0ZXJQbGF5bGlzdFVSTCwgc3VidGl0bGVzUGxheWxpc3QsIHN1YnRpdGxlc1BsYXlsaXN0SW5kZXggfVxuICovXG5mdW5jdGlvbiBnZXRQbGF5bGlzdENhY2hlKHVybCwgY2FjaGUsIGxhbmd1YWdlKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBnZXRQbGF5bGlzdENhY2hlLCBsYW5ndWFnZTogJHtsYW5ndWFnZX1gLCBcIlwiKTtcblx0bGV0IG1hc3RlclBsYXlsaXN0VVJMID0gXCJcIjtcblx0bGV0IHN1YnRpdGxlc1BsYXlsaXN0ID0ge307XG5cdGxldCBzdWJ0aXRsZXNQbGF5bGlzdEluZGV4ID0gMDtcblx0Y2FjaGU/LmZvckVhY2goKFZhbHVlLCBLZXkpID0+IHtcblx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfSwgZ2V0UGxheWxpc3RDYWNoZSwgS2V5OiAke0tleX0sIFZhbHVlOiAke0pTT04uc3RyaW5naWZ5KFZhbHVlKX1gLCBcIlwiKTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShWYWx1ZT8uW2xhbmd1YWdlXSkpIHtcblx0XHRcdGxldCBBcnJheSA9IFZhbHVlPy5bbGFuZ3VhZ2VdO1xuXHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIGdldFBsYXlsaXN0Q2FjaGVgLCBgQXJyYXk6ICR7SlNPTi5zdHJpbmdpZnkoQXJyYXkpfWAsIFwiXCIpO1xuXHRcdFx0aWYgKEFycmF5Py5zb21lKChPYmplY3QsIEluZGV4KSA9PiB7XG5cdFx0XHRcdGlmICh1cmwuaW5jbHVkZXMoT2JqZWN0Py5VUkkgPz8gT2JqZWN0Py5PUFRJT04/LlVSSSA/PyBudWxsKSkge1xuXHRcdFx0XHRcdHN1YnRpdGxlc1BsYXlsaXN0SW5kZXggPSBJbmRleDtcblx0XHRcdFx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIGdldFBsYXlsaXN0Q2FjaGVgLCBgc3VidGl0bGVzUGxheWxpc3RJbmRleDogJHtzdWJ0aXRsZXNQbGF5bGlzdEluZGV4fWAsIFwiXCIpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGVsc2UgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fSkpIHtcblx0XHRcdFx0bWFzdGVyUGxheWxpc3RVUkwgPSBLZXk7XG5cdFx0XHRcdHN1YnRpdGxlc1BsYXlsaXN0ID0gVmFsdWU7XG5cdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBnZXRQbGF5bGlzdENhY2hlYCwgYG1hc3RlclBsYXlsaXN0VVJMOiAke21hc3RlclBsYXlsaXN0VVJMfWAsIGBzdWJ0aXRsZXNQbGF5bGlzdDogJHtKU09OLnN0cmluZ2lmeShzdWJ0aXRsZXNQbGF5bGlzdCl9YCwgXCJcIik7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0pO1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgZ2V0UGxheWxpc3RDYWNoZWAsIGBtYXN0ZXJQbGF5bGlzdFVSTDogJHtKU09OLnN0cmluZ2lmeShtYXN0ZXJQbGF5bGlzdFVSTCl9YCwgXCJcIik7XG5cdHJldHVybiB7IG1hc3RlclBsYXlsaXN0VVJMLCBzdWJ0aXRsZXNQbGF5bGlzdCwgc3VidGl0bGVzUGxheWxpc3RJbmRleCB9O1xufTtcblxuLyoqXG4gKiBTZXQgU3VidGl0bGVzIENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBTdWJ0aXRsZXMgQ2FjaGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBwbGF5bGlzdCAtIFN1YnRpdGxlcyBQbGF5bGlzdCBDYWNoZVxuICogQHBhcmFtIHtBcnJheX0gbGFuZ3VhZ2UgLSBMYW5ndWFnZVxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gU3VidGl0bGVzIFBsYXlsaXN0IEluZGV4XG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhdGZvcm0gLSBTdGVhbWluZyBNZWRpYSBQbGF0Zm9ybVxuICogQHJldHVybiB7UHJvbWlzZTxPYmplY3Q+fSB7IG1hc3RlclBsYXlsaXN0VVJMLCBzdWJ0aXRsZXNQbGF5bGlzdCwgc3VidGl0bGVzUGxheWxpc3RJbmRleCB9XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNldFN1YnRpdGxlc0NhY2hlKGNhY2hlLCBwbGF5bGlzdCwgbGFuZ3VhZ2UsIGluZGV4ID0gMCwgcGxhdGZvcm0gPSBcIlVuaXZlcnNhbFwiKSB7XG5cdCQubG9nKGDimJHvuI8gJHskLm5hbWV9LCBzZXRTdWJ0aXRsZXNDYWNoZSwgbGFuZ3VhZ2U6ICR7bGFuZ3VhZ2V9LCBpbmRleDogJHtpbmRleH1gLCBcIlwiKTtcblx0YXdhaXQgUHJvbWlzZS5hbGwocGxheWxpc3Q/LltsYW5ndWFnZV0/Lm1hcChhc3luYyAodmFsLCBpbmQsIGFycikgPT4ge1xuXHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBzZXRTdWJ0aXRsZXNDYWNoZSwgaW5kOiAke2luZH0sIHZhbDogJHtKU09OLnN0cmluZ2lmeSh2YWwpfWAsIFwiXCIpO1xuXHRcdGlmICgoYXJyW2luZGV4XSAmJiAoaW5kID09PSBpbmRleCkpIHx8ICghYXJyW2luZGV4XSkpIHtcblx0XHRcdC8vIOafpeaJvuWtl+W5leaWh+S7tuWcsOWdgHZ0dOe8k+WtmO+8iG1hcO+8iVxuXHRcdFx0bGV0IHN1YnRpdGxlc1VSTGFycmF5ID0gY2FjaGUuZ2V0KHZhbC5VUkwpID8/IFtdO1xuXHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIHNldFN1YnRpdGxlc0NhY2hlYCwgYHN1YnRpdGxlc1VSTGFycmF5OiAke0pTT04uc3RyaW5naWZ5KHN1YnRpdGxlc1VSTGFycmF5KX1gLCBcIlwiKTtcblx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBzZXRTdWJ0aXRsZXNDYWNoZWAsIGB2YWw/LlVSTDogJHt2YWw/LlVSTH1gLCBcIlwiKTtcblx0XHRcdC8vIOiOt+WPluWtl+W5leaWh+S7tuWcsOWdgHZ0dC90dG1s57yT5a2Y77yI5oyJ6K+t6KiA77yJXG5cdFx0XHRzdWJ0aXRsZXNVUkxhcnJheSA9IGF3YWl0IGdldFN1YnRpdGxlcyh2YWw/LlVSTCwgJHJlcXVlc3QuaGVhZGVycywgcGxhdGZvcm0pO1xuXHRcdFx0Ly8kLmxvZyhg8J+apyAkeyQubmFtZX0sIHNldFN1YnRpdGxlc0NhY2hlYCwgYHN1YnRpdGxlc1VSTGFycmF5OiAke0pTT04uc3RyaW5naWZ5KHN1YnRpdGxlc1VSTGFycmF5KX1gLCBcIlwiKTtcblx0XHRcdC8vIOWGmeWFpeWtl+W5leaWh+S7tuWcsOWdgHZ0dC90dG1s57yT5a2Y5YiwbWFwXG5cdFx0XHRjYWNoZSA9IGNhY2hlLnNldCh2YWwuVVJMLCBzdWJ0aXRsZXNVUkxhcnJheSk7XG5cdFx0XHQvLyQubG9nKGDinIUgJHskLm5hbWV9LCBzZXRTdWJ0aXRsZXNDYWNoZWAsIGBzdWJ0aXRsZXNVUkxhcnJheTogJHtKU09OLnN0cmluZ2lmeShjYWNoZS5nZXQodmFsPy5VUkwpKX1gLCBcIlwiKTtcblx0XHRcdCQubG9nKGDinIUgJHskLm5hbWV9LCBzZXRTdWJ0aXRsZXNDYWNoZWAsIGB2YWw/LlVSTDogJHt2YWw/LlVSTH1gLCBcIlwiKTtcblx0XHR9O1xuXHR9KSk7XG5cdHJldHVybiBjYWNoZTtcbn07XG5cbi8qKlxuICogU2V0IENhY2hlXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge01hcH0gY2FjaGUgLSBQbGF5bGlzdHMgQ2FjaGUgLyBTdWJ0aXRsZXMgQ2FjaGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBjYWNoZVNpemUgLSBDYWNoZSBTaXplXG4gKiBAcmV0dXJuIHtCb29sZWFufSBpc1NhdmVkXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlKGNhY2hlLCBjYWNoZVNpemUgPSAxMDApIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIFNldCBDYWNoZSwgY2FjaGVTaXplOiAke2NhY2hlU2l6ZX1gLCBcIlwiKTtcblx0Y2FjaGUgPSBBcnJheS5mcm9tKGNhY2hlIHx8IFtdKTsgLy8gTWFw6L2sQXJyYXlcblx0Y2FjaGUgPSBjYWNoZS5zbGljZSgtY2FjaGVTaXplKTsgLy8g6ZmQ5Yi257yT5a2Y5aSn5bCPXG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgQ2FjaGVgLCBcIlwiKTtcblx0cmV0dXJuIGNhY2hlO1xufTtcblxuLyoqXG4gKiBHZXQgU3VidGl0bGUgKi52dHQgVVJMc1xuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFZUVCBVUkxcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIC0gUmVxdWVzdCBIZWFkZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhdGZvcm0gLSBTdGVhbWluZyBNZWRpYSBQbGF0Zm9ybVxuICogQHJldHVybiB7UHJvbWlzZTwqPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0U3VidGl0bGVzKHVybCwgaGVhZGVycywgcGxhdGZvcm0pIHtcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIEdldCBTdWJ0aXRsZSAqLnZ0dCAqLnR0bWwgVVJMc2AsIFwiXCIpO1xuXHRsZXQgcmVzcG9uc2UgPSBhd2FpdCAkLmh0dHAuZ2V0KHsgdXJsOiB1cmwsIGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBHZXQgU3VidGl0bGUgKi52dHQgKi50dG1sIFVSTHNgLCBgcmVzcG9uc2U6ICR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpfWAsIFwiXCIpO1xuXHRsZXQgc3VidGl0bGVQbGF5TGlzdCA9IE0zVTgucGFyc2UocmVzcG9uc2UuYm9keSk7XG5cdHN1YnRpdGxlUGxheUxpc3QgPSBzdWJ0aXRsZVBsYXlMaXN0LmZpbHRlcigoeyBVUkkgfSkgPT4gKC9eLitcXC4oKHdlYik/dnR0fHR0bWwyP3x4bWwpKFxcPy4rKT8kLy50ZXN0KFVSSSkpKTtcblx0c3VidGl0bGVQbGF5TGlzdCA9IHN1YnRpdGxlUGxheUxpc3QuZmlsdGVyKCh7IFVSSSB9KSA9PiAhL2VtcHR5Ly50ZXN0KFVSSSkpO1xuXHRzdWJ0aXRsZVBsYXlMaXN0ID0gc3VidGl0bGVQbGF5TGlzdC5maWx0ZXIoKHsgVVJJIH0pID0+ICEvYmxhbmsvLnRlc3QoVVJJKSk7XG5cdHN1YnRpdGxlUGxheUxpc3QgPSBzdWJ0aXRsZVBsYXlMaXN0LmZpbHRlcigoeyBVUkkgfSkgPT4gIS9kZWZhdWx0Ly50ZXN0KFVSSSkpO1xuXHRsZXQgc3VidGl0bGVzID0gc3VidGl0bGVQbGF5TGlzdC5tYXAoKHsgVVJJIH0pID0+IGFQYXRoKHVybCwgVVJJKSk7XG5cdHN3aXRjaCAocGxhdGZvcm0pIHtcblx0XHRjYXNlIFwiRGlzbmV5K1wiOlxuXHRcdFx0aWYgKHN1YnRpdGxlcy5zb21lKGl0ZW0gPT4gL1xcLy4rLU1BSU5cXC8vLnRlc3QoaXRlbSkpKSBzdWJ0aXRsZXMgPSBzdWJ0aXRsZXMuZmlsdGVyKGl0ZW0gPT4gL1xcLy4rLU1BSU5cXC8vLnRlc3QoaXRlbSkpXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiUHJpbWVWaWRlb1wiOlxuXHRcdFx0aWYgKHN1YnRpdGxlcy5zb21lKGl0ZW0gPT4gL1xcL2Fpdi1wcm9kLXRpbWVkdGV4dFxcLy8udGVzdChpdGVtKSkpIHN1YnRpdGxlcyA9IHN1YnRpdGxlcy5maWx0ZXIoaXRlbSA9PiAvXFwvYWl2LXByb2QtdGltZWR0ZXh0XFwvLy50ZXN0KGl0ZW0pKTtcblx0XHRcdC8vQXJyYXkuZnJvbShuZXcgU2V0KHN1YnRpdGxlcykpO1xuXHRcdFx0c3VidGl0bGVzID0gc3VidGl0bGVzLmZpbHRlcigoaXRlbSwgaW5kZXgsIGFycmF5KSA9PiB7XG5cdFx0XHRcdC8vIOW9k+WJjeWFg+e0oO+8jOWcqOWOn+Wni+aVsOe7hOS4reeahOesrOS4gOS4que0ouW8lT095b2T5YmN57Si5byV5YC877yM5ZCm5YiZ6L+U5Zue5b2T5YmN5YWD57SgXG5cdFx0XHRcdHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0sIDApID09PSBpbmRleDtcblx0XHRcdH0pOyAvLyDmlbDnu4Tljrvph41cblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRicmVhaztcblx0fTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIEdldCBTdWJ0aXRsZSAqLnZ0dCAqLnR0bWwgVVJMcywgc3VidGl0bGVzOiAke3N1YnRpdGxlc31gLCBcIlwiKTtcblx0cmV0dXJuIHN1YnRpdGxlcztcblx0LyoqKioqKioqKioqKioqKioqIEZ1Y3Rpb25zICoqKioqKioqKioqKioqKioqL1xuXHRmdW5jdGlvbiBhUGF0aChhVVJMID0gXCJcIiwgVVJMID0gXCJcIikgeyByZXR1cm4gKC9eaHR0cHM/OlxcL1xcLy9pLnRlc3QoVVJMKSkgPyBVUkwgOiBhVVJMLm1hdGNoKC9eKGh0dHBzPzpcXC9cXC8oPzpbXj9dKylcXC8pL2kpPy5bMF0gKyBVUkwgfTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=