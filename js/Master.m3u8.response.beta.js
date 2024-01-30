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
/*!******************************************!*\
  !*** ./src/Master.m3u8.response.beta.js ***!
  \******************************************/
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











const $ = new _ENV_ENV_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]("🍿️ DualSubs: 🎦 Universal v0.9.6(2) Master.m3u8.response.beta");
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
	const { Settings, Caches, Configs } = (0,_function_setENV_mjs__WEBPACK_IMPORTED_MODULE_3__["default"])("DualSubs", [(["YouTube", "Netflix", "BiliBili", "Spotify"].includes(PLATFORM)) ? PLATFORM : "Universal"], /*#__PURE__*/ (_database_Database_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache || (_database_Database_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache = __webpack_require__.t(_database_Database_json__WEBPACK_IMPORTED_MODULE_6__, 2))));
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = URL.query?.subtype ?? Settings.Type, Languages = [URL.query?.lang?.toUpperCase?.() ?? Settings.Languages[0], (URL.query?.tlang ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ ${$.name}, Type: ${Type}, Languages: ${Languages}`, "");
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
				case "text/html":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					// 序列化M3U8
					body = M3U8.parse($response.body);
					//$.log(`🚧 ${$.name}`, "M3U8.parse($response.body)", JSON.stringify(body), "");
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
					$.setjson(Caches.Playlists.Master, `@DualSubs.${"Composite"}.Caches.Playlists.Master`);
					// 写入选项
					body = setAttrList(body, playlistCache, Settings.Types, Languages, PLATFORM, STANDARD, DEVICE);
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
 * Get Attribute List
 * @author VirgilClyne
 * @param {String} url - Request URL
 * @param {Object} m3u8 - Parsed M3U8
 * @param {String} type - Content Type
 * @param {Array} langCodes - Language Codes Array
 * @return {Array} datas
 */
function getAttrList(url = "", m3u8 = {}, type = "", langCodes = []) {
	$.log(`☑️ $${$.name}, Get Attribute List`, `langCodes: ${langCodes}`, "");
	let attrList = m3u8.filter(item => item?.OPTION?.TYPE === type && item?.OPTION?.FORCED !== "YES"); // 过滤强制内容
	//$.log(`🚧 ${$.name}`, "attrList", JSON.stringify(attrList), "");
	let matchList = [];
	//查询是否有符合语言的内容
	for (let langcode of langCodes) {
		$.log(`🚧 ${$.name}, Get Attribute List`, "for (let langcode of langcodes)", `langcode: ${langcode}`, "");
		matchList = attrList.filter(item => item?.OPTION?.LANGUAGE?.toLowerCase() === langcode?.toLowerCase());
		if (matchList.length !== 0) break;
	};
	matchList = matchList.map(data => {
		data.URL = aPath(url, data?.OPTION?.URI ?? null);
		return data;
	})
	$.log(`✅ $${$.name}, Get Attribute List`, `matchList: ${JSON.stringify(matchList)}`, "");
	return matchList;

	/***************** Fuctions *****************/
	// Get Absolute Path
	function aPath(aURL = "", URL = "") { return (/^https?:\/\//i.test(URL)) ? URL : aURL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URL };
};

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
	//if (playlists1?.length !== 0) $.log(`🚧 ${$.name}, Set Attribute List, 有主字幕语言（源语言）字幕`, "");
	//else types = types.filter(e => e !== "Translate"); // 无源语言字幕时删除翻译字幕选项
	//if (playlists2?.length !== 0) $.log(`🚧 ${$.name}, Set Attribute List, 有副字幕语言（目标语言）字幕`, "");
	//else types = types.filter(e => e !== "Official"); // 无目标语言字幕时删除官方字幕选项
	$.log(`☑️ ${$.name}, Set Attribute List`, `types: ${types}`, "");
	playlists1?.forEach(playlist1 => {
		const index1 = m3u8.findIndex(item => item?.OPTION?.URI === playlist1.OPTION.URI); // 主语言（源语言）字幕位置
		types.forEach(type => {
			$.log(`🚧 ${$.name}, Set Attribute List, type: ${type}`, "");
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
									};
									break;
								default:
									option = setOption(playlist1, playlist2, type, platform, standard, device);
									break;
							};
						};
					});
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
			};
			if (Object.keys(option).length !== 0) {
				if (standard) m3u8.splice(index1 + 1, 0, option)
				else m3u8.splice(index1, 1, option);
			};
		});
	});
	//$.log(`✅ ${$.name}, Set Attribute List`, `m3u8: ${JSON.stringify(m3u8)}`, "");
	$.log(`✅ ${$.name}, Set Attribute List`, "");
	return m3u8;
};

/**
 * Set DualSubs Subtitle Options
 * @author VirgilClyne
 * @param {String} platform - platform
 * @param {Array} playlist1 - Subtitles Playlist (Languages 0)
 * @param {Array} playlist2 - Subtitles Playlist (Languages 1)
 * @param {Array} enabledTypes - Enabled Types
 * @param {Array} translateTypes - Translate Types
 * @param {String} Standard - Standard
 * @return {Promise<*>}
 */
function setOption(playlist1 = {}, playlist2 = {}, type = "", platform = "", standard = true, device = "iPhone") {
	$.log(`☑️ ${$.name}, Set DualSubs Subtitle Option, type: ${type}, standard: ${standard}, device: ${device}`, "");
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
	};
	// 修改语言代码
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
			};
			break;
		case "Disney+": // AppleCoreMedia 语言列表名称显示为NAME字符串 自动映射NAME为本地语言NAME 按LANGUAGE区分语言
		case "PrimeVideo": // AppleCoreMedia 语言列表名称显示为NAME字符串 按LANGUAGE区分语言
		case "Hulu": // AppleCoreMedia 语言列表名称显示为LANGUAGE字符串 自动映射LANGUAGE为本地语言NAME 空格分割
		case "Nebula":  // AppleCoreMedia 语言列表名称显示为LANGUAGE字符串 自动映射LANGUAGE为本地语言NAME
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
		default:
			newOption.OPTION.LANGUAGE = LANGUAGE1;
			break;
	};
	// 增加/修改类型参数
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
	$.log(`✅ ${$.name}, Set DualSubs Subtitle Option`, `newOption: ${JSON.stringify(newOption)}`, "");
	return newOption;
};

/**
 * is Standard?
 * Determine whether Standard Media Player
 * @author VirgilClyne
 * @param {String} _url - Parsed Request URL
 * @param {Object} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
function isStandard(_url, headers, platform) {
	$.log(`☑️ ${$.name}, is Standard`, "");
	//let _url = URI.parse(url);
	const UA = (headers?.["user-agent"] ?? headers?.["User-Agent"]);
	$.log(`🚧 ${$.name}, is Standard, UA: ${UA}`, "");
	let standard = true;
	let device = "iPhone";
	if (UA?.includes("Mozilla/5.0")) device = "Web";
	else if (UA?.includes("iPhone")) device = "iPhone";
	else if (UA?.includes("iPad")) device = "iPad";
	else if (UA?.includes("Macintosh")) device = "Macintosh";
	else if (UA?.includes("AppleTV")) device = "AppleTV";
	else if (UA?.includes("Apple TV")) device = "AppleTV";
	switch (platform) {
		case "Max":
		case "HBOMax":
		case "Viki":
			if (UA?.includes("Mozilla/5.0")) standard = false;
			else if (UA?.includes("iPhone")) standard = false;
			else if (UA?.includes("iPad")) standard = false;
			else if (UA?.includes("Macintosh")) standard = false;
			else if (headers?.["x-hbo-device-name"]?.includes("ios")) standard = false, device = "iPhone";
			else if (_url?.query?.["device-code"] === "iphone") standard = false, device = "iPhone";
			break;
		case "PeacockTV":
			if (UA?.includes("Mozilla/5.0")) standard = false;
			else if (UA?.includes("iPhone")) standard = false;
			else if (UA?.includes("iPad")) standard = false;
			else if (UA?.includes("Macintosh")) standard = false;
			else if (UA?.includes("PeacockMobile")) standard = false;
			break;
		case "FuboTV":
			if (UA?.includes("iPhone")) standard = false;
			else if (UA?.includes("iPad")) standard = false;
			else if (UA?.includes("Macintosh")) standard = false;
			break;
		case "TED":
			if (UA?.includes("Mozilla/5.0")) standard = false;
			break;
	};
	$.log(`✅ ${$.name}, is Standard, standard: ${standard}, device: ${device}`, "");
	return {standard, device};
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFzdGVyLm0zdTgucmVzcG9uc2UuYmV0YS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixVQUFVO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZUFBZSwrQkFBK0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxTQUFTLDhDQUE4QztBQUN2RDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPLDJCQUEyQixTQUFTLFlBQVksT0FBTztBQUMxRSxTQUFTO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9FTlYvRU5WLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9FWFRNM1UvRVhUTTNVLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9VUkkvVVJJLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9kZXRlY3RGb3JtYXQubWpzIiwid2VicGFjazovL2R1YWxzdWJzLy4vc3JjL2Z1bmN0aW9uL2RldGVjdFBsYXRmb3JtLm1qcyIsIndlYnBhY2s6Ly9kdWFsc3Vicy8uL3NyYy9mdW5jdGlvbi9zZXRFTlYubWpzIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kdWFsc3Vicy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2R1YWxzdWJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHVhbHN1YnMvLi9zcmMvTWFzdGVyLm0zdTgucmVzcG9uc2UuYmV0YS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBFTlYge1xuXHRjb25zdHJ1Y3RvcihuYW1lLCBvcHRzKSB7XG5cdFx0dGhpcy5uYW1lID0gbmFtZVxuXHRcdHRoaXMuaHR0cCA9IG5ldyBIdHRwKHRoaXMpXG5cdFx0dGhpcy5kYXRhID0gbnVsbFxuXHRcdHRoaXMuZGF0YUZpbGUgPSAnYm94LmRhdCdcblx0XHR0aGlzLmxvZ3MgPSBbXVxuXHRcdHRoaXMuaXNNdXRlID0gZmFsc2Vcblx0XHR0aGlzLmlzTmVlZFJld3JpdGUgPSBmYWxzZVxuXHRcdHRoaXMubG9nU2VwYXJhdG9yID0gJ1xcbidcblx0XHR0aGlzLmVuY29kaW5nID0gJ3V0Zi04J1xuXHRcdHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIG9wdHMpXG5cdFx0dGhpcy5sb2coJycsIGDwn4+BICR7dGhpcy5uYW1lfSwgRU5WIHYxLjEuMCwg5byA5aeLIWApXG5cdH1cblxuXHRwbGF0Zm9ybSgpIHtcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkZW52aXJvbm1lbnQgJiYgJGVudmlyb25tZW50WydzdXJnZS12ZXJzaW9uJ10pXG5cdFx0XHRyZXR1cm4gJ1N1cmdlJ1xuXHRcdGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mICRlbnZpcm9ubWVudCAmJiAkZW52aXJvbm1lbnRbJ3N0YXNoLXZlcnNpb24nXSlcblx0XHRcdHJldHVybiAnU3Rhc2gnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlICYmICEhbW9kdWxlLmV4cG9ydHMpIHJldHVybiAnTm9kZS5qcydcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkdGFzaykgcmV0dXJuICdRdWFudHVtdWx0IFgnXG5cdFx0aWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgJGxvb24pIHJldHVybiAnTG9vbidcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAkcm9ja2V0KSByZXR1cm4gJ1NoYWRvd3JvY2tldCdcblx0fVxuXG5cdGlzTm9kZSgpIHtcblx0XHRyZXR1cm4gJ05vZGUuanMnID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdGlzUXVhblgoKSB7XG5cdFx0cmV0dXJuICdRdWFudHVtdWx0IFgnID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdGlzU3VyZ2UoKSB7XG5cdFx0cmV0dXJuICdTdXJnZScgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNMb29uKCkge1xuXHRcdHJldHVybiAnTG9vbicgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0aXNTaGFkb3dyb2NrZXQoKSB7XG5cdFx0cmV0dXJuICdTaGFkb3dyb2NrZXQnID09PSB0aGlzLnBsYXRmb3JtKClcblx0fVxuXG5cdGlzU3Rhc2goKSB7XG5cdFx0cmV0dXJuICdTdGFzaCcgPT09IHRoaXMucGxhdGZvcm0oKVxuXHR9XG5cblx0dG9PYmooc3RyLCBkZWZhdWx0VmFsdWUgPSBudWxsKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBKU09OLnBhcnNlKHN0cilcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWVcblx0XHR9XG5cdH1cblxuXHR0b1N0cihvYmosIGRlZmF1bHRWYWx1ZSA9IG51bGwpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iailcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWVcblx0XHR9XG5cdH1cblxuXHRnZXRqc29uKGtleSwgZGVmYXVsdFZhbHVlKSB7XG5cdFx0bGV0IGpzb24gPSBkZWZhdWx0VmFsdWVcblx0XHRjb25zdCB2YWwgPSB0aGlzLmdldGRhdGEoa2V5KVxuXHRcdGlmICh2YWwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHRoaXMuZ2V0ZGF0YShrZXkpKVxuXHRcdFx0fSBjYXRjaCB7IH1cblx0XHR9XG5cdFx0cmV0dXJuIGpzb25cblx0fVxuXG5cdHNldGpzb24odmFsLCBrZXkpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0ZGF0YShKU09OLnN0cmluZ2lmeSh2YWwpLCBrZXkpXG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdH1cblxuXHRnZXRTY3JpcHQodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHR0aGlzLmdldCh7IHVybCB9LCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiByZXNvbHZlKGJvZHkpKVxuXHRcdH0pXG5cdH1cblxuXHRydW5TY3JpcHQoc2NyaXB0LCBydW5PcHRzKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRsZXQgaHR0cGFwaSA9IHRoaXMuZ2V0ZGF0YSgnQGNoYXZ5X2JveGpzX3VzZXJDZmdzLmh0dHBhcGknKVxuXHRcdFx0aHR0cGFwaSA9IGh0dHBhcGkgPyBodHRwYXBpLnJlcGxhY2UoL1xcbi9nLCAnJykudHJpbSgpIDogaHR0cGFwaVxuXHRcdFx0bGV0IGh0dHBhcGlfdGltZW91dCA9IHRoaXMuZ2V0ZGF0YShcblx0XHRcdFx0J0BjaGF2eV9ib3hqc191c2VyQ2Zncy5odHRwYXBpX3RpbWVvdXQnXG5cdFx0XHQpXG5cdFx0XHRodHRwYXBpX3RpbWVvdXQgPSBodHRwYXBpX3RpbWVvdXQgPyBodHRwYXBpX3RpbWVvdXQgKiAxIDogMjBcblx0XHRcdGh0dHBhcGlfdGltZW91dCA9XG5cdFx0XHRcdHJ1bk9wdHMgJiYgcnVuT3B0cy50aW1lb3V0ID8gcnVuT3B0cy50aW1lb3V0IDogaHR0cGFwaV90aW1lb3V0XG5cdFx0XHRjb25zdCBba2V5LCBhZGRyXSA9IGh0dHBhcGkuc3BsaXQoJ0AnKVxuXHRcdFx0Y29uc3Qgb3B0cyA9IHtcblx0XHRcdFx0dXJsOiBgaHR0cDovLyR7YWRkcn0vdjEvc2NyaXB0aW5nL2V2YWx1YXRlYCxcblx0XHRcdFx0Ym9keToge1xuXHRcdFx0XHRcdHNjcmlwdF90ZXh0OiBzY3JpcHQsXG5cdFx0XHRcdFx0bW9ja190eXBlOiAnY3JvbicsXG5cdFx0XHRcdFx0dGltZW91dDogaHR0cGFwaV90aW1lb3V0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGhlYWRlcnM6IHsgJ1gtS2V5Jzoga2V5LCAnQWNjZXB0JzogJyovKicgfSxcblx0XHRcdFx0dGltZW91dDogaHR0cGFwaV90aW1lb3V0XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnBvc3Qob3B0cywgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4gcmVzb2x2ZShib2R5KSlcblx0XHR9KS5jYXRjaCgoZSkgPT4gdGhpcy5sb2dFcnIoZSkpXG5cdH1cblxuXHRsb2FkZGF0YSgpIHtcblx0XHRpZiAodGhpcy5pc05vZGUoKSkge1xuXHRcdFx0dGhpcy5mcyA9IHRoaXMuZnMgPyB0aGlzLmZzIDogcmVxdWlyZSgnZnMnKVxuXHRcdFx0dGhpcy5wYXRoID0gdGhpcy5wYXRoID8gdGhpcy5wYXRoIDogcmVxdWlyZSgncGF0aCcpXG5cdFx0XHRjb25zdCBjdXJEaXJEYXRhRmlsZVBhdGggPSB0aGlzLnBhdGgucmVzb2x2ZSh0aGlzLmRhdGFGaWxlKVxuXHRcdFx0Y29uc3Qgcm9vdERpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKFxuXHRcdFx0XHRwcm9jZXNzLmN3ZCgpLFxuXHRcdFx0XHR0aGlzLmRhdGFGaWxlXG5cdFx0XHQpXG5cdFx0XHRjb25zdCBpc0N1ckRpckRhdGFGaWxlID0gdGhpcy5mcy5leGlzdHNTeW5jKGN1ckRpckRhdGFGaWxlUGF0aClcblx0XHRcdGNvbnN0IGlzUm9vdERpckRhdGFGaWxlID1cblx0XHRcdFx0IWlzQ3VyRGlyRGF0YUZpbGUgJiYgdGhpcy5mcy5leGlzdHNTeW5jKHJvb3REaXJEYXRhRmlsZVBhdGgpXG5cdFx0XHRpZiAoaXNDdXJEaXJEYXRhRmlsZSB8fCBpc1Jvb3REaXJEYXRhRmlsZSkge1xuXHRcdFx0XHRjb25zdCBkYXRQYXRoID0gaXNDdXJEaXJEYXRhRmlsZVxuXHRcdFx0XHRcdD8gY3VyRGlyRGF0YUZpbGVQYXRoXG5cdFx0XHRcdFx0OiByb290RGlyRGF0YUZpbGVQYXRoXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UodGhpcy5mcy5yZWFkRmlsZVN5bmMoZGF0UGF0aCkpXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4ge31cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHJldHVybiB7fVxuXHRcdH0gZWxzZSByZXR1cm4ge31cblx0fVxuXG5cdHdyaXRlZGF0YSgpIHtcblx0XHRpZiAodGhpcy5pc05vZGUoKSkge1xuXHRcdFx0dGhpcy5mcyA9IHRoaXMuZnMgPyB0aGlzLmZzIDogcmVxdWlyZSgnZnMnKVxuXHRcdFx0dGhpcy5wYXRoID0gdGhpcy5wYXRoID8gdGhpcy5wYXRoIDogcmVxdWlyZSgncGF0aCcpXG5cdFx0XHRjb25zdCBjdXJEaXJEYXRhRmlsZVBhdGggPSB0aGlzLnBhdGgucmVzb2x2ZSh0aGlzLmRhdGFGaWxlKVxuXHRcdFx0Y29uc3Qgcm9vdERpckRhdGFGaWxlUGF0aCA9IHRoaXMucGF0aC5yZXNvbHZlKFxuXHRcdFx0XHRwcm9jZXNzLmN3ZCgpLFxuXHRcdFx0XHR0aGlzLmRhdGFGaWxlXG5cdFx0XHQpXG5cdFx0XHRjb25zdCBpc0N1ckRpckRhdGFGaWxlID0gdGhpcy5mcy5leGlzdHNTeW5jKGN1ckRpckRhdGFGaWxlUGF0aClcblx0XHRcdGNvbnN0IGlzUm9vdERpckRhdGFGaWxlID1cblx0XHRcdFx0IWlzQ3VyRGlyRGF0YUZpbGUgJiYgdGhpcy5mcy5leGlzdHNTeW5jKHJvb3REaXJEYXRhRmlsZVBhdGgpXG5cdFx0XHRjb25zdCBqc29uZGF0YSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcblx0XHRcdGlmIChpc0N1ckRpckRhdGFGaWxlKSB7XG5cdFx0XHRcdHRoaXMuZnMud3JpdGVGaWxlU3luYyhjdXJEaXJEYXRhRmlsZVBhdGgsIGpzb25kYXRhKVxuXHRcdFx0fSBlbHNlIGlmIChpc1Jvb3REaXJEYXRhRmlsZSkge1xuXHRcdFx0XHR0aGlzLmZzLndyaXRlRmlsZVN5bmMocm9vdERpckRhdGFGaWxlUGF0aCwganNvbmRhdGEpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmZzLndyaXRlRmlsZVN5bmMoY3VyRGlyRGF0YUZpbGVQYXRoLCBqc29uZGF0YSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRsb2Rhc2hfZ2V0KHNvdXJjZSwgcGF0aCwgZGVmYXVsdFZhbHVlID0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc3QgcGF0aHMgPSBwYXRoLnJlcGxhY2UoL1xcWyhcXGQrKVxcXS9nLCAnLiQxJykuc3BsaXQoJy4nKVxuXHRcdGxldCByZXN1bHQgPSBzb3VyY2Vcblx0XHRmb3IgKGNvbnN0IHAgb2YgcGF0aHMpIHtcblx0XHRcdHJlc3VsdCA9IE9iamVjdChyZXN1bHQpW3BdXG5cdFx0XHRpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cblxuXHRsb2Rhc2hfc2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcblx0XHRpZiAoT2JqZWN0KG9iaikgIT09IG9iaikgcmV0dXJuIG9ialxuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSkgcGF0aCA9IHBhdGgudG9TdHJpbmcoKS5tYXRjaCgvW14uW1xcXV0rL2cpIHx8IFtdXG5cdFx0cGF0aFxuXHRcdFx0LnNsaWNlKDAsIC0xKVxuXHRcdFx0LnJlZHVjZShcblx0XHRcdFx0KGEsIGMsIGkpID0+XG5cdFx0XHRcdFx0T2JqZWN0KGFbY10pID09PSBhW2NdXG5cdFx0XHRcdFx0XHQ/IGFbY11cblx0XHRcdFx0XHRcdDogKGFbY10gPSBNYXRoLmFicyhwYXRoW2kgKyAxXSkgPj4gMCA9PT0gK3BhdGhbaSArIDFdID8gW10gOiB7fSksXG5cdFx0XHRcdG9ialxuXHRcdFx0KVtwYXRoW3BhdGgubGVuZ3RoIC0gMV1dID0gdmFsdWVcblx0XHRyZXR1cm4gb2JqXG5cdH1cblxuXHRnZXRkYXRhKGtleSkge1xuXHRcdGxldCB2YWwgPSB0aGlzLmdldHZhbChrZXkpXG5cdFx0Ly8g5aaC5p6c5LulIEBcblx0XHRpZiAoL15ALy50ZXN0KGtleSkpIHtcblx0XHRcdGNvbnN0IFssIG9iamtleSwgcGF0aHNdID0gL15AKC4qPylcXC4oLio/KSQvLmV4ZWMoa2V5KVxuXHRcdFx0Y29uc3Qgb2JqdmFsID0gb2Jqa2V5ID8gdGhpcy5nZXR2YWwob2Jqa2V5KSA6ICcnXG5cdFx0XHRpZiAob2JqdmFsKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Y29uc3Qgb2JqZWR2YWwgPSBKU09OLnBhcnNlKG9ianZhbClcblx0XHRcdFx0XHR2YWwgPSBvYmplZHZhbCA/IHRoaXMubG9kYXNoX2dldChvYmplZHZhbCwgcGF0aHMsICcnKSA6IHZhbFxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dmFsID0gJydcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdmFsXG5cdH1cblxuXHRzZXRkYXRhKHZhbCwga2V5KSB7XG5cdFx0bGV0IGlzc3VjID0gZmFsc2Vcblx0XHRpZiAoL15ALy50ZXN0KGtleSkpIHtcblx0XHRcdGNvbnN0IFssIG9iamtleSwgcGF0aHNdID0gL15AKC4qPylcXC4oLio/KSQvLmV4ZWMoa2V5KVxuXHRcdFx0Y29uc3Qgb2JqZGF0ID0gdGhpcy5nZXR2YWwob2Jqa2V5KVxuXHRcdFx0Y29uc3Qgb2JqdmFsID0gb2Jqa2V5XG5cdFx0XHRcdD8gb2JqZGF0ID09PSAnbnVsbCdcblx0XHRcdFx0XHQ/IG51bGxcblx0XHRcdFx0XHQ6IG9iamRhdCB8fCAne30nXG5cdFx0XHRcdDogJ3t9J1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgb2JqZWR2YWwgPSBKU09OLnBhcnNlKG9ianZhbClcblx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KG9iamVkdmFsLCBwYXRocywgdmFsKVxuXHRcdFx0XHRpc3N1YyA9IHRoaXMuc2V0dmFsKEpTT04uc3RyaW5naWZ5KG9iamVkdmFsKSwgb2Jqa2V5KVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zdCBvYmplZHZhbCA9IHt9XG5cdFx0XHRcdHRoaXMubG9kYXNoX3NldChvYmplZHZhbCwgcGF0aHMsIHZhbClcblx0XHRcdFx0aXNzdWMgPSB0aGlzLnNldHZhbChKU09OLnN0cmluZ2lmeShvYmplZHZhbCksIG9iamtleSlcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aXNzdWMgPSB0aGlzLnNldHZhbCh2YWwsIGtleSlcblx0XHR9XG5cdFx0cmV0dXJuIGlzc3VjXG5cdH1cblxuXHRnZXR2YWwoa2V5KSB7XG5cdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdGNhc2UgJ0xvb24nOlxuXHRcdFx0Y2FzZSAnU3Rhc2gnOlxuXHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0cmV0dXJuICRwZXJzaXN0ZW50U3RvcmUucmVhZChrZXkpXG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRyZXR1cm4gJHByZWZzLnZhbHVlRm9yS2V5KGtleSlcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHR0aGlzLmRhdGEgPSB0aGlzLmxvYWRkYXRhKClcblx0XHRcdFx0cmV0dXJuIHRoaXMuZGF0YVtrZXldXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGFba2V5XSkgfHwgbnVsbFxuXHRcdH1cblx0fVxuXG5cdHNldHZhbCh2YWwsIGtleSkge1xuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdHJldHVybiAkcGVyc2lzdGVudFN0b3JlLndyaXRlKHZhbCwga2V5KVxuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0cmV0dXJuICRwcmVmcy5zZXRWYWx1ZUZvcktleSh2YWwsIGtleSlcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHR0aGlzLmRhdGEgPSB0aGlzLmxvYWRkYXRhKClcblx0XHRcdFx0dGhpcy5kYXRhW2tleV0gPSB2YWxcblx0XHRcdFx0dGhpcy53cml0ZWRhdGEoKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhW2tleV0pIHx8IG51bGxcblx0XHR9XG5cdH1cblxuXHRpbml0R290RW52KG9wdHMpIHtcblx0XHR0aGlzLmdvdCA9IHRoaXMuZ290ID8gdGhpcy5nb3QgOiByZXF1aXJlKCdnb3QnKVxuXHRcdHRoaXMuY2t0b3VnaCA9IHRoaXMuY2t0b3VnaCA/IHRoaXMuY2t0b3VnaCA6IHJlcXVpcmUoJ3RvdWdoLWNvb2tpZScpXG5cdFx0dGhpcy5ja2phciA9IHRoaXMuY2tqYXIgPyB0aGlzLmNramFyIDogbmV3IHRoaXMuY2t0b3VnaC5Db29raWVKYXIoKVxuXHRcdGlmIChvcHRzKSB7XG5cdFx0XHRvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgPyBvcHRzLmhlYWRlcnMgOiB7fVxuXHRcdFx0aWYgKHVuZGVmaW5lZCA9PT0gb3B0cy5oZWFkZXJzLkNvb2tpZSAmJiB1bmRlZmluZWQgPT09IG9wdHMuY29va2llSmFyKSB7XG5cdFx0XHRcdG9wdHMuY29va2llSmFyID0gdGhpcy5ja2phclxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldChyZXF1ZXN0LCBjYWxsYmFjayA9ICgpID0+IHsgfSkge1xuXHRcdGRlbGV0ZSByZXF1ZXN0Py5oZWFkZXJzPy5bJ0NvbnRlbnQtTGVuZ3RoJ11cblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydjb250ZW50LWxlbmd0aCddXG5cblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKHRoaXMuaXNTdXJnZSgpICYmIHRoaXMuaXNOZWVkUmV3cml0ZSkge1xuXHRcdFx0XHRcdHRoaXMubG9kYXNoX3NldChyZXF1ZXN0LCAnaGVhZGVycy5YLVN1cmdlLVNraXAtU2NyaXB0aW5nJywgZmFsc2UpXG5cdFx0XHRcdH1cblx0XHRcdFx0JGh0dHBDbGllbnQuZ2V0KHJlcXVlc3QsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcblx0XHRcdFx0XHRpZiAoIWVycm9yICYmIHJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5ib2R5ID0gYm9keVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1cyA/IHJlc3BvbnNlLnN0YXR1cyA6IHJlc3BvbnNlLnN0YXR1c0NvZGVcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1c0NvZGVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLCBib2R5KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0aWYgKHRoaXMuaXNOZWVkUmV3cml0ZSkge1xuXHRcdFx0XHRcdHRoaXMubG9kYXNoX3NldChyZXF1ZXN0LCAnb3B0cy5oaW50cycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR0YXNrLmZldGNoKHJlcXVlc3QpLnRoZW4oXG5cdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGU6IHN0YXR1cyxcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdFx0aGVhZGVycyxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHR9ID0gcmVzcG9uc2Vcblx0XHRcdFx0XHRcdGNhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdFx0XHR7IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgYm9keSwgYm9keUJ5dGVzIH0sXG5cdFx0XHRcdFx0XHRcdGJvZHksXG5cdFx0XHRcdFx0XHRcdGJvZHlCeXRlc1xuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGVycm9yKSA9PiBjYWxsYmFjaygoZXJyb3IgJiYgZXJyb3IuZXJyb3IpIHx8ICdVbmRlZmluZWRFcnJvcicpXG5cdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRsZXQgaWNvbnYgPSByZXF1aXJlKCdpY29udi1saXRlJylcblx0XHRcdFx0dGhpcy5pbml0R290RW52KHJlcXVlc3QpXG5cdFx0XHRcdHRoaXMuZ290KHJlcXVlc3QpXG5cdFx0XHRcdFx0Lm9uKCdyZWRpcmVjdCcsIChyZXNwb25zZSwgbmV4dE9wdHMpID0+IHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ10pIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBjayA9IHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXVxuXHRcdFx0XHRcdFx0XHRcdFx0Lm1hcCh0aGlzLmNrdG91Z2guQ29va2llLnBhcnNlKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnRvU3RyaW5nKClcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2spIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuY2tqYXIuc2V0Q29va2llU3luYyhjaywgbnVsbClcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0bmV4dE9wdHMuY29va2llSmFyID0gdGhpcy5ja2phclxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMubG9nRXJyKGUpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyB0aGlzLmNramFyLnNldENvb2tpZVN5bmMocmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddLm1hcChDb29raWUucGFyc2UpLnRvU3RyaW5nKCkpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihcblx0XHRcdFx0XHRcdChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZTogc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVycyxcblx0XHRcdFx0XHRcdFx0XHRyYXdCb2R5XG5cdFx0XHRcdFx0XHRcdH0gPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0XHRjb25zdCBib2R5ID0gaWNvbnYuZGVjb2RlKHJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdFx0eyBzdGF0dXMsIHN0YXR1c0NvZGUsIGhlYWRlcnMsIHJhd0JvZHksIGJvZHkgfSxcblx0XHRcdFx0XHRcdFx0XHRib2R5XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQoZXJyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHsgbWVzc2FnZTogZXJyb3IsIHJlc3BvbnNlOiByZXNwb25zZSB9ID0gZXJyXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yLFxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLFxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlICYmIGljb252LmRlY29kZShyZXNwb25zZS5yYXdCb2R5LCB0aGlzLmVuY29kaW5nKVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdHBvc3QocmVxdWVzdCwgY2FsbGJhY2sgPSAoKSA9PiB7IH0pIHtcblx0XHRjb25zdCBtZXRob2QgPSByZXF1ZXN0Lm1ldGhvZFxuXHRcdFx0PyByZXF1ZXN0Lm1ldGhvZC50b0xvY2FsZUxvd2VyQ2FzZSgpXG5cdFx0XHQ6ICdwb3N0J1xuXG5cdFx0Ly8g5aaC5p6c5oyH5a6a5LqG6K+35rGC5L2TLCDkvYbmsqHmjIflrpogYENvbnRlbnQtVHlwZWDjgIFgY29udGVudC10eXBlYCwg5YiZ6Ieq5Yqo55Sf5oiQ44CCXG5cdFx0aWYgKFxuXHRcdFx0cmVxdWVzdC5ib2R5ICYmXG5cdFx0XHRyZXF1ZXN0LmhlYWRlcnMgJiZcblx0XHRcdCFyZXF1ZXN0LmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddICYmXG5cdFx0XHQhcmVxdWVzdC5oZWFkZXJzWydjb250ZW50LXR5cGUnXVxuXHRcdCkge1xuXHRcdFx0Ly8gSFRUUC8x44CBSFRUUC8yIOmDveaUr+aMgeWwj+WGmSBoZWFkZXJzXG5cdFx0XHRyZXF1ZXN0LmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcblx0XHR9XG5cdFx0Ly8g5Li66YG/5YWN5oyH5a6a6ZSZ6K+vIGBjb250ZW50LWxlbmd0aGAg6L+Z6YeM5Yig6Zmk6K+l5bGe5oCn77yM55Sx5bel5YW356uvIChIdHRwQ2xpZW50KSDotJ/otKPph43mlrDorqHnrpflubbotYvlgLxcblx0XHRkZWxldGUgcmVxdWVzdD8uaGVhZGVycz8uWydDb250ZW50LUxlbmd0aCddXG5cdFx0ZGVsZXRlIHJlcXVlc3Q/LmhlYWRlcnM/LlsnY29udGVudC1sZW5ndGgnXVxuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZiAodGhpcy5pc1N1cmdlKCkgJiYgdGhpcy5pc05lZWRSZXdyaXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2Rhc2hfc2V0KHJlcXVlc3QsICdoZWFkZXJzLlgtU3VyZ2UtU2tpcC1TY3JpcHRpbmcnLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0XHQkaHR0cENsaWVudFttZXRob2RdKHJlcXVlc3QsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcblx0XHRcdFx0XHRpZiAoIWVycm9yICYmIHJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0XHRyZXNwb25zZS5ib2R5ID0gYm9keVxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1cyA/IHJlc3BvbnNlLnN0YXR1cyA6IHJlc3BvbnNlLnN0YXR1c0NvZGVcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1c0NvZGVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLCBib2R5KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdFx0cmVxdWVzdC5tZXRob2QgPSBtZXRob2Rcblx0XHRcdFx0aWYgKHRoaXMuaXNOZWVkUmV3cml0ZSkge1xuXHRcdFx0XHRcdHRoaXMubG9kYXNoX3NldChyZXF1ZXN0LCAnb3B0cy5oaW50cycsIGZhbHNlKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR0YXNrLmZldGNoKHJlcXVlc3QpLnRoZW4oXG5cdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGU6IHN0YXR1cyxcblx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdFx0aGVhZGVycyxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0Ym9keUJ5dGVzXG5cdFx0XHRcdFx0XHR9ID0gcmVzcG9uc2Vcblx0XHRcdFx0XHRcdGNhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdFx0XHR7IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgYm9keSwgYm9keUJ5dGVzIH0sXG5cdFx0XHRcdFx0XHRcdGJvZHksXG5cdFx0XHRcdFx0XHRcdGJvZHlCeXRlc1xuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGVycm9yKSA9PiBjYWxsYmFjaygoZXJyb3IgJiYgZXJyb3IuZXJyb3IpIHx8ICdVbmRlZmluZWRFcnJvcicpXG5cdFx0XHRcdClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRsZXQgaWNvbnYgPSByZXF1aXJlKCdpY29udi1saXRlJylcblx0XHRcdFx0dGhpcy5pbml0R290RW52KHJlcXVlc3QpXG5cdFx0XHRcdGNvbnN0IHsgdXJsLCAuLi5fcmVxdWVzdCB9ID0gcmVxdWVzdFxuXHRcdFx0XHR0aGlzLmdvdFttZXRob2RdKHVybCwgX3JlcXVlc3QpLnRoZW4oXG5cdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCB7IHN0YXR1c0NvZGU6IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgcmF3Qm9keSB9ID0gcmVzcG9uc2Vcblx0XHRcdFx0XHRcdGNvbnN0IGJvZHkgPSBpY29udi5kZWNvZGUocmF3Qm9keSwgdGhpcy5lbmNvZGluZylcblx0XHRcdFx0XHRcdGNhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdFx0XHR7IHN0YXR1cywgc3RhdHVzQ29kZSwgaGVhZGVycywgcmF3Qm9keSwgYm9keSB9LFxuXHRcdFx0XHRcdFx0XHRib2R5XG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZXJyKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCB7IG1lc3NhZ2U6IGVycm9yLCByZXNwb25zZTogcmVzcG9uc2UgfSA9IGVyclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdGVycm9yLFxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSxcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgJiYgaWNvbnYuZGVjb2RlKHJlc3BvbnNlLnJhd0JvZHksIHRoaXMuZW5jb2RpbmcpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cdC8qKlxuXHQgKlxuXHQgKiDnpLrkvos6JC50aW1lKCd5eXl5LU1NLWRkIHFxIEhIOm1tOnNzLlMnKVxuXHQgKiAgICA6JC50aW1lKCd5eXl5TU1kZEhIbW1zc1MnKVxuXHQgKiAgICB5OuW5tCBNOuaciCBkOuaXpSBxOuWtoyBIOuaXtiBtOuWIhiBzOuenkiBTOuavq+enklxuXHQgKiAgICDlhbbkuK155Y+v6YCJMC005L2N5Y2g5L2N56ym44CBU+WPr+mAiTAtMeS9jeWNoOS9jeespu+8jOWFtuS9meWPr+mAiTAtMuS9jeWNoOS9jeesplxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0IOagvOW8j+WMluWPguaVsFxuXHQgKiBAcGFyYW0ge251bWJlcn0gdHMg5Y+v6YCJOiDmoLnmja7mjIflrprml7bpl7TmiLPov5Tlm57moLzlvI/ljJbml6XmnJ9cblx0ICpcblx0ICovXG5cdHRpbWUoZm9ybWF0LCB0cyA9IG51bGwpIHtcblx0XHRjb25zdCBkYXRlID0gdHMgPyBuZXcgRGF0ZSh0cykgOiBuZXcgRGF0ZSgpXG5cdFx0bGV0IG8gPSB7XG5cdFx0XHQnTSsnOiBkYXRlLmdldE1vbnRoKCkgKyAxLFxuXHRcdFx0J2QrJzogZGF0ZS5nZXREYXRlKCksXG5cdFx0XHQnSCsnOiBkYXRlLmdldEhvdXJzKCksXG5cdFx0XHQnbSsnOiBkYXRlLmdldE1pbnV0ZXMoKSxcblx0XHRcdCdzKyc6IGRhdGUuZ2V0U2Vjb25kcygpLFxuXHRcdFx0J3ErJzogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSxcblx0XHRcdCdTJzogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuXHRcdH1cblx0XHRpZiAoLyh5KykvLnRlc3QoZm9ybWF0KSlcblx0XHRcdGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKFxuXHRcdFx0XHRSZWdFeHAuJDEsXG5cdFx0XHRcdChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKVxuXHRcdFx0KVxuXHRcdGZvciAobGV0IGsgaW4gbylcblx0XHRcdGlmIChuZXcgUmVnRXhwKCcoJyArIGsgKyAnKScpLnRlc3QoZm9ybWF0KSlcblx0XHRcdFx0Zm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXG5cdFx0XHRcdFx0UmVnRXhwLiQxLFxuXHRcdFx0XHRcdFJlZ0V4cC4kMS5sZW5ndGggPT0gMVxuXHRcdFx0XHRcdFx0PyBvW2tdXG5cdFx0XHRcdFx0XHQ6ICgnMDAnICsgb1trXSkuc3Vic3RyKCgnJyArIG9ba10pLmxlbmd0aClcblx0XHRcdFx0KVxuXHRcdHJldHVybiBmb3JtYXRcblx0fVxuXG5cdC8qKlxuXHQgKiDns7vnu5/pgJrnn6Vcblx0ICpcblx0ICogPiDpgJrnn6Xlj4LmlbA6IOWQjOaXtuaUr+aMgSBRdWFuWCDlkowgTG9vbiDkuKTnp43moLzlvI8sIEVudkpz5qC55o2u6L+Q6KGM546v5aKD6Ieq5Yqo6L2s5o2iLCBTdXJnZSDnjq/looPkuI3mlK/mjIHlpJrlqpLkvZPpgJrnn6Vcblx0ICpcblx0ICog56S65L6LOlxuXHQgKiAkLm1zZyh0aXRsZSwgc3VidCwgZGVzYywgJ3R3aXR0ZXI6Ly8nKVxuXHQgKiAkLm1zZyh0aXRsZSwgc3VidCwgZGVzYywgeyAnb3Blbi11cmwnOiAndHdpdHRlcjovLycsICdtZWRpYS11cmwnOiAnaHR0cHM6Ly9naXRodWIuZ2l0aHViYXNzZXRzLmNvbS9pbWFnZXMvbW9kdWxlcy9vcGVuX2dyYXBoL2dpdGh1Yi1tYXJrLnBuZycgfSlcblx0ICogJC5tc2codGl0bGUsIHN1YnQsIGRlc2MsIHsgJ29wZW4tdXJsJzogJ2h0dHBzOi8vYmluZy5jb20nLCAnbWVkaWEtdXJsJzogJ2h0dHBzOi8vZ2l0aHViLmdpdGh1YmFzc2V0cy5jb20vaW1hZ2VzL21vZHVsZXMvb3Blbl9ncmFwaC9naXRodWItbWFyay5wbmcnIH0pXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdGl0bGUg5qCH6aKYXG5cdCAqIEBwYXJhbSB7Kn0gc3VidCDlia/moIfpophcblx0ICogQHBhcmFtIHsqfSBkZXNjIOmAmuefpeivpuaDhVxuXHQgKiBAcGFyYW0geyp9IG9wdHMg6YCa55+l5Y+C5pWwXG5cdCAqXG5cdCAqL1xuXHRtc2codGl0bGUgPSBuYW1lLCBzdWJ0ID0gJycsIGRlc2MgPSAnJywgb3B0cykge1xuXHRcdGNvbnN0IHRvRW52T3B0cyA9IChyYXdvcHRzKSA9PiB7XG5cdFx0XHRzd2l0Y2ggKHR5cGVvZiByYXdvcHRzKSB7XG5cdFx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRcdHJldHVybiByYXdvcHRzXG5cdFx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdFx0c3dpdGNoICh0aGlzLnBsYXRmb3JtKCkpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7IHVybDogcmF3b3B0cyB9XG5cdFx0XHRcdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdFx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRcdFx0XHRcdHJldHVybiByYXdvcHRzXG5cdFx0XHRcdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyAnb3Blbi11cmwnOiByYXdvcHRzIH1cblx0XHRcdFx0XHRcdGNhc2UgJ05vZGUuanMnOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRcdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRcdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRcdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRsZXQgb3BlblVybCA9XG5cdFx0XHRcdFx0XHRcdFx0cmF3b3B0cy51cmwgfHwgcmF3b3B0cy5vcGVuVXJsIHx8IHJhd29wdHNbJ29wZW4tdXJsJ11cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgdXJsOiBvcGVuVXJsIH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgJ0xvb24nOiB7XG5cdFx0XHRcdFx0XHRcdGxldCBvcGVuVXJsID1cblx0XHRcdFx0XHRcdFx0XHRyYXdvcHRzLm9wZW5VcmwgfHwgcmF3b3B0cy51cmwgfHwgcmF3b3B0c1snb3Blbi11cmwnXVxuXHRcdFx0XHRcdFx0XHRsZXQgbWVkaWFVcmwgPSByYXdvcHRzLm1lZGlhVXJsIHx8IHJhd29wdHNbJ21lZGlhLXVybCddXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7IG9wZW5VcmwsIG1lZGlhVXJsIH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgJ1F1YW50dW11bHQgWCc6IHtcblx0XHRcdFx0XHRcdFx0bGV0IG9wZW5VcmwgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHNbJ29wZW4tdXJsJ10gfHwgcmF3b3B0cy51cmwgfHwgcmF3b3B0cy5vcGVuVXJsXG5cdFx0XHRcdFx0XHRcdGxldCBtZWRpYVVybCA9IHJhd29wdHNbJ21lZGlhLXVybCddIHx8IHJhd29wdHMubWVkaWFVcmxcblx0XHRcdFx0XHRcdFx0bGV0IHVwZGF0ZVBhc3RlYm9hcmQgPVxuXHRcdFx0XHRcdFx0XHRcdHJhd29wdHNbJ3VwZGF0ZS1wYXN0ZWJvYXJkJ10gfHwgcmF3b3B0cy51cGRhdGVQYXN0ZWJvYXJkXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdFx0J29wZW4tdXJsJzogb3BlblVybCxcblx0XHRcdFx0XHRcdFx0XHQnbWVkaWEtdXJsJzogbWVkaWFVcmwsXG5cdFx0XHRcdFx0XHRcdFx0J3VwZGF0ZS1wYXN0ZWJvYXJkJzogdXBkYXRlUGFzdGVib2FyZFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghdGhpcy5pc011dGUpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRcdGNhc2UgJ1N1cmdlJzpcblx0XHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdFx0Y2FzZSAnU2hhZG93cm9ja2V0Jzpcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQkbm90aWZpY2F0aW9uLnBvc3QodGl0bGUsIHN1YnQsIGRlc2MsIHRvRW52T3B0cyhvcHRzKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0XHRcdCRub3RpZnkodGl0bGUsIHN1YnQsIGRlc2MsIHRvRW52T3B0cyhvcHRzKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlICdOb2RlLmpzJzpcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIXRoaXMuaXNNdXRlTG9nKSB7XG5cdFx0XHRsZXQgbG9ncyA9IFsnJywgJz09PT09PT09PT09PT098J+To+ezu+e7n+mAmuefpfCfk6M9PT09PT09PT09PT09PSddXG5cdFx0XHRsb2dzLnB1c2godGl0bGUpXG5cdFx0XHRzdWJ0ID8gbG9ncy5wdXNoKHN1YnQpIDogJydcblx0XHRcdGRlc2MgPyBsb2dzLnB1c2goZGVzYykgOiAnJ1xuXHRcdFx0Y29uc29sZS5sb2cobG9ncy5qb2luKCdcXG4nKSlcblx0XHRcdHRoaXMubG9ncyA9IHRoaXMubG9ncy5jb25jYXQobG9ncylcblx0XHR9XG5cdH1cblxuXHRsb2coLi4ubG9ncykge1xuXHRcdGlmIChsb2dzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMubG9ncyA9IFsuLi50aGlzLmxvZ3MsIC4uLmxvZ3NdXG5cdFx0fVxuXHRcdGNvbnNvbGUubG9nKGxvZ3Muam9pbih0aGlzLmxvZ1NlcGFyYXRvcikpXG5cdH1cblxuXHRsb2dFcnIoZXJyb3IpIHtcblx0XHRzd2l0Y2ggKHRoaXMucGxhdGZvcm0oKSkge1xuXHRcdFx0Y2FzZSAnU3VyZ2UnOlxuXHRcdFx0Y2FzZSAnTG9vbic6XG5cdFx0XHRjYXNlICdTdGFzaCc6XG5cdFx0XHRjYXNlICdTaGFkb3dyb2NrZXQnOlxuXHRcdFx0Y2FzZSAnUXVhbnR1bXVsdCBYJzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRoaXMubG9nKCcnLCBg4p2X77iPICR7dGhpcy5uYW1lfSwg6ZSZ6K+vIWAsIGVycm9yKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHRoaXMubG9nKCcnLCBg4p2X77iPJHt0aGlzLm5hbWV9LCDplJnor68hYCwgZXJyb3Iuc3RhY2spXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0d2FpdCh0aW1lKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpKVxuXHR9XG5cblx0ZG9uZSh2YWwgPSB7fSkge1xuXHRcdGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdGNvbnN0IGNvc3RUaW1lID0gKGVuZFRpbWUgLSB0aGlzLnN0YXJ0VGltZSkgLyAxMDAwXG5cdFx0dGhpcy5sb2coJycsIGDwn5qpICR7dGhpcy5uYW1lfSwg57uT5p2fISDwn5WbICR7Y29zdFRpbWV9IOenkmApXG5cdFx0dGhpcy5sb2coKVxuXHRcdHN3aXRjaCAodGhpcy5wbGF0Zm9ybSgpKSB7XG5cdFx0XHRjYXNlICdTdXJnZSc6XG5cdFx0XHRjYXNlICdMb29uJzpcblx0XHRcdGNhc2UgJ1N0YXNoJzpcblx0XHRcdGNhc2UgJ1NoYWRvd3JvY2tldCc6XG5cdFx0XHRjYXNlICdRdWFudHVtdWx0IFgnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0JGRvbmUodmFsKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnTm9kZS5qcyc6XG5cdFx0XHRcdHByb2Nlc3MuZXhpdCgxKVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzXG5cdCAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9WaXJnaWxDbHluZS9HZXRTb21lRnJpZXMvYmxvYi9tYWluL2Z1bmN0aW9uL2dldEVOVi9nZXRFTlYuanNcblx0ICogQGF1dGhvciBWaXJnaWxDbHluZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gUGVyc2lzdGVudCBTdG9yZSBLZXlcblx0ICogQHBhcmFtIHtBcnJheX0gbmFtZXMgLSBQbGF0Zm9ybSBOYW1lc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YWJhc2UgLSBEZWZhdWx0IERhdGFiYXNlXG5cdCAqIEByZXR1cm4ge09iamVjdH0geyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH1cblx0ICovXG5cdGdldEVOVihrZXksIG5hbWVzLCBkYXRhYmFzZSkge1xuXHRcdC8vdGhpcy5sb2coYOKYke+4jyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBcIlwiKTtcblx0XHQvKioqKioqKioqKioqKioqKiogQm94SnMgKioqKioqKioqKioqKioqKiovXG5cdFx0Ly8g5YyF6KOF5Li65bGA6YOo5Y+Y6YeP77yM55So5a6M6YeK5pS+5YaF5a2YXG5cdFx0Ly8gQm94SnPnmoTmuIXnqbrmk43kvZzov5Tlm57lgYflgLznqbrlrZfnrKbkuLIsIOmAu+i+keaIluaTjeS9nOespuS8muWcqOW3puS+p+aTjeS9nOaVsOS4uuWBh+WAvOaXtui/lOWbnuWPs+S+p+aTjeS9nOaVsOOAglxuXHRcdGxldCBCb3hKcyA9IHRoaXMuZ2V0anNvbihrZXksIGRhdGFiYXNlKTtcblx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBCb3hKc+exu+WeizogJHt0eXBlb2YgQm94SnN9YCwgYEJveEpz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KEJveEpzKX1gLCBcIlwiKTtcblx0XHQvKioqKioqKioqKioqKioqKiogQXJndW1lbnQgKioqKioqKioqKioqKioqKiovXG5cdFx0bGV0IEFyZ3VtZW50ID0ge307XG5cdFx0aWYgKHR5cGVvZiAkYXJndW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdGlmIChCb29sZWFuKCRhcmd1bWVudCkpIHtcblx0XHRcdFx0Ly90aGlzLmxvZyhg8J+OiSAke3RoaXMubmFtZX0sICRBcmd1bWVudGApO1xuXHRcdFx0XHRsZXQgYXJnID0gT2JqZWN0LmZyb21FbnRyaWVzKCRhcmd1bWVudC5zcGxpdChcIiZcIikubWFwKChpdGVtKSA9PiBpdGVtLnNwbGl0KFwiPVwiKS5tYXAoaSA9PiBpLnJlcGxhY2UoL1xcXCIvZywgJycpKSkpO1xuXHRcdFx0XHQvL3RoaXMubG9nKEpTT04uc3RyaW5naWZ5KGFyZykpO1xuXHRcdFx0XHRmb3IgKGxldCBpdGVtIGluIGFyZykgdGhpcy5zZXRQYXRoKEFyZ3VtZW50LCBpdGVtLCBhcmdbaXRlbV0pO1xuXHRcdFx0XHQvL3RoaXMubG9nKEpTT04uc3RyaW5naWZ5KEFyZ3VtZW50KSk7XG5cdFx0XHR9O1xuXHRcdFx0Ly90aGlzLmxvZyhg4pyFICR7dGhpcy5uYW1lfSwgR2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBBcmd1bWVudOexu+WeizogJHt0eXBlb2YgQXJndW1lbnR9YCwgYEFyZ3VtZW505YaF5a65OiAke0pTT04uc3RyaW5naWZ5KEFyZ3VtZW50KX1gLCBcIlwiKTtcblx0XHR9O1xuXHRcdC8qKioqKioqKioqKioqKioqKiBTdG9yZSAqKioqKioqKioqKioqKioqKi9cblx0XHRjb25zdCBTdG9yZSA9IHsgU2V0dGluZ3M6IGRhdGFiYXNlPy5EZWZhdWx0Py5TZXR0aW5ncyB8fCB7fSwgQ29uZmlnczogZGF0YWJhc2U/LkRlZmF1bHQ/LkNvbmZpZ3MgfHwge30sIENhY2hlczoge30gfTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkobmFtZXMpKSBuYW1lcyA9IFtuYW1lc107XG5cdFx0Ly90aGlzLmxvZyhg8J+apyAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgbmFtZXPnsbvlnos6ICR7dHlwZW9mIG5hbWVzfWAsIGBuYW1lc+WGheWuuTogJHtKU09OLnN0cmluZ2lmeShuYW1lcyl9YCwgXCJcIik7XG5cdFx0Zm9yIChsZXQgbmFtZSBvZiBuYW1lcykge1xuXHRcdFx0U3RvcmUuU2V0dGluZ3MgPSB7IC4uLlN0b3JlLlNldHRpbmdzLCAuLi5kYXRhYmFzZT8uW25hbWVdPy5TZXR0aW5ncywgLi4uQXJndW1lbnQsIC4uLkJveEpzPy5bbmFtZV0/LlNldHRpbmdzIH07XG5cdFx0XHRTdG9yZS5Db25maWdzID0geyAuLi5TdG9yZS5Db25maWdzLCAuLi5kYXRhYmFzZT8uW25hbWVdPy5Db25maWdzIH07XG5cdFx0XHRpZiAoQm94SnM/LltuYW1lXT8uQ2FjaGVzICYmIHR5cGVvZiBCb3hKcz8uW25hbWVdPy5DYWNoZXMgPT09IFwic3RyaW5nXCIpIEJveEpzW25hbWVdLkNhY2hlcyA9IEpTT04ucGFyc2UoQm94SnM/LltuYW1lXT8uQ2FjaGVzKTtcblx0XHRcdFN0b3JlLkNhY2hlcyA9IHsgLi4uU3RvcmUuQ2FjaGVzLCAuLi5Cb3hKcz8uW25hbWVdPy5DYWNoZXMgfTtcblx0XHR9O1xuXHRcdC8vdGhpcy5sb2coYPCfmqcgJHt0aGlzLm5hbWV9LCBHZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzYCwgYFN0b3JlLlNldHRpbmdz57G75Z6LOiAke3R5cGVvZiBTdG9yZS5TZXR0aW5nc31gLCBgU3RvcmUuU2V0dGluZ3M6ICR7SlNPTi5zdHJpbmdpZnkoU3RvcmUuU2V0dGluZ3MpfWAsIFwiXCIpO1xuXHRcdHRoaXMudHJhdmVyc2VPYmplY3QoU3RvcmUuU2V0dGluZ3MsIChrZXksIHZhbHVlKSA9PiB7XG5cdFx0XHQvL3RoaXMubG9nKGDwn5qnICR7dGhpcy5uYW1lfSwgdHJhdmVyc2VPYmplY3RgLCBgJHtrZXl9OiAke3R5cGVvZiB2YWx1ZX1gLCBgJHtrZXl9OiAke0pTT04uc3RyaW5naWZ5KHZhbHVlKX1gLCBcIlwiKTtcblx0XHRcdGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUgPT09IFwiZmFsc2VcIikgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTsgLy8g5a2X56ym5Liy6L2sQm9vbGVhblxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh2YWx1ZS5pbmNsdWRlcyhcIixcIikpIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIsXCIpLm1hcChpdGVtID0+IHRoaXMuc3RyaW5nMm51bWJlcihpdGVtKSk7IC8vIOWtl+espuS4sui9rOaVsOe7hOi9rOaVsOWtl1xuXHRcdFx0XHRlbHNlIHZhbHVlID0gdGhpcy5zdHJpbmcybnVtYmVyKHZhbHVlKTsgLy8g5a2X56ym5Liy6L2s5pWw5a2XXG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH0pO1xuXHRcdC8vdGhpcy5sb2coYOKchSAke3RoaXMubmFtZX0sIEdldCBFbnZpcm9ubWVudCBWYXJpYWJsZXNgLCBgU3RvcmU6ICR7dHlwZW9mIFN0b3JlLkNhY2hlc31gLCBgU3RvcmXlhoXlrrk6ICR7SlNPTi5zdHJpbmdpZnkoU3RvcmUpfWAsIFwiXCIpO1xuXHRcdHJldHVybiBTdG9yZTtcblx0fTtcblxuXHQvKioqKioqKioqKioqKioqKiogZnVuY3Rpb24gKioqKioqKioqKioqKioqKiovXG5cdHNldFBhdGgob2JqZWN0LCBwYXRoLCB2YWx1ZSkgeyBwYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKG8sIHAsIGkpID0+IG9bcF0gPSBwYXRoLnNwbGl0KFwiLlwiKS5sZW5ndGggPT09ICsraSA/IHZhbHVlIDogb1twXSB8fCB7fSwgb2JqZWN0KSB9XG5cdHRyYXZlcnNlT2JqZWN0KG8sIGMpIHsgZm9yICh2YXIgdCBpbiBvKSB7IHZhciBuID0gb1t0XTsgb1t0XSA9IFwib2JqZWN0XCIgPT0gdHlwZW9mIG4gJiYgbnVsbCAhPT0gbiA/IHRoaXMudHJhdmVyc2VPYmplY3QobiwgYykgOiBjKHQsIG4pIH0gcmV0dXJuIG8gfVxuXHRzdHJpbmcybnVtYmVyKHN0cmluZykgeyBpZiAoc3RyaW5nICYmICFpc05hTihzdHJpbmcpKSBzdHJpbmcgPSBwYXJzZUludChzdHJpbmcsIDEwKTsgcmV0dXJuIHN0cmluZyB9XG59XG5cbmV4cG9ydCBjbGFzcyBIdHRwIHtcblx0Y29uc3RydWN0b3IoZW52KSB7XG5cdFx0dGhpcy5lbnYgPSBlbnZcblx0fVxuXG5cdHNlbmQob3B0cywgbWV0aG9kID0gJ0dFVCcpIHtcblx0XHRvcHRzID0gdHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnID8geyB1cmw6IG9wdHMgfSA6IG9wdHNcblx0XHRsZXQgc2VuZGVyID0gdGhpcy5nZXRcblx0XHRpZiAobWV0aG9kID09PSAnUE9TVCcpIHtcblx0XHRcdHNlbmRlciA9IHRoaXMucG9zdFxuXHRcdH1cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0c2VuZGVyLmNhbGwodGhpcywgb3B0cywgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXHRcdFx0XHRpZiAoZXJyb3IpIHJlamVjdChlcnJvcilcblx0XHRcdFx0ZWxzZSByZXNvbHZlKHJlc3BvbnNlKVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0Z2V0KG9wdHMpIHtcblx0XHRyZXR1cm4gdGhpcy5zZW5kLmNhbGwodGhpcy5lbnYsIG9wdHMpXG5cdH1cblxuXHRwb3N0KG9wdHMpIHtcblx0XHRyZXR1cm4gdGhpcy5zZW5kLmNhbGwodGhpcy5lbnYsIG9wdHMsICdQT1NUJylcblx0fVxufVxuIiwiLy8gcmVmZXI6IGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvZHJhZnQtcGFudG9zLWh0dHAtbGl2ZS1zdHJlYW1pbmctMDhcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVYVE0zVSB7XG5cdGNvbnN0cnVjdG9yKG9wdHMpIHtcblx0XHR0aGlzLm5hbWUgPSBcIkVYVE0zVSB2MC44LjZcIjtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdHRoaXMubmV3TGluZSA9ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJcXG5cIikpID8gXCJcXG5cIiA6ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJcXHJcIikpID8gXCJcXHJcIiA6ICh0aGlzLm9wdHMuaW5jbHVkZXMoXCJcXHJcXG5cIikpID8gXCJcXHJcXG5cIiA6IFwiXFxuXCI7XG5cdH07XG5cblx0cGFyc2UobTN1OCA9IG5ldyBTdHJpbmcpIHtcblx0XHRjb25zdCBFWFRNM1VfUmVnZXggPSAvXig/Oig/PFRBRz4jKD86RVhUfEFJVilbXiM6XFxzXFxyXFxuXSspKD86Oig/PE9QVElPTj5bXlxcclxcbl0rKSk/KD86KD86XFxyXFxufFxccnxcXG4pKD88VVJJPlteI1xcc1xcclxcbl0rKSk/fCg/PE5PVEU+I1teXFxyXFxuXSspPykoPzpcXHJcXG58XFxyfFxcbik/JC9nbTtcblx0XHRsZXQganNvbiA9IFsuLi5tM3U4Lm1hdGNoQWxsKEVYVE0zVV9SZWdleCldLm1hcChpdGVtID0+IHtcblx0XHRcdGl0ZW0gPSBpdGVtPy5ncm91cHMgfHwgaXRlbTtcblx0XHRcdGlmICgvPS8udGVzdChpdGVtPy5PUFRJT04pKSBpdGVtLk9QVElPTiA9IE9iamVjdC5mcm9tRW50cmllcyhgJHtpdGVtLk9QVElPTn1cXCxgLnNwbGl0KC8sXFxzKig/IVteXCJdKlwiLCkvKS5zbGljZSgwLCAtMSkubWFwKG9wdGlvbiA9PiB7XG5cdFx0XHRcdG9wdGlvbiA9IG9wdGlvbi5zcGxpdCgvPSguKikvKTtcblx0XHRcdFx0b3B0aW9uWzFdID0gKGlzTmFOKG9wdGlvblsxXSkpID8gb3B0aW9uWzFdLnJlcGxhY2UoL15cIiguKilcIiQvLCBcIiQxXCIpIDogcGFyc2VJbnQob3B0aW9uWzFdLCAxMCk7XG5cdFx0XHRcdHJldHVybiBvcHRpb247XG5cdFx0XHR9KSk7XG5cdFx0XHRyZXR1cm4gaXRlbVxuXHRcdH0pO1xuXHRcdHJldHVybiBqc29uXG5cdH07XG5cblx0c3RyaW5naWZ5KGpzb24gPSBuZXcgQXJyYXkpIHtcblx0XHRpZiAoanNvbj8uWzBdPy5UQUcgIT09IFwiI0VYVE0zVVwiKSBqc29uLnVuc2hpZnQoeyBcIlRBR1wiOiBcIiNFWFRNM1VcIiB9KVxuXHRcdGNvbnN0IE9QVElPTl92YWx1ZV9SZWdleCA9IC9eKCgtP1xcZCtbeC5cXGRdKyl8WzAtOUEtWi1dKykkLztcblx0XHRsZXQgbTN1OCA9IGpzb24ubWFwKGl0ZW0gPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBpdGVtPy5PUFRJT04gPT09IFwib2JqZWN0XCIpIGl0ZW0uT1BUSU9OID0gT2JqZWN0LmVudHJpZXMoaXRlbS5PUFRJT04pLm1hcChvcHRpb24gPT4ge1xuXHRcdFx0XHRpZiAoaXRlbT8uVEFHID09PSBcIiNFWFQtWC1TRVNTSU9OLURBVEFcIikgb3B0aW9uWzFdID0gYFwiJHtvcHRpb25bMV19XCJgO1xuXHRcdFx0XHRlbHNlIGlmICghaXNOYU4ob3B0aW9uWzFdKSkgb3B0aW9uWzFdID0gKHR5cGVvZiBvcHRpb25bMV0gPT09IFwibnVtYmVyXCIpID8gb3B0aW9uWzFdIDogYFwiJHtvcHRpb25bMV19XCJgO1xuXHRcdFx0XHRlbHNlIGlmIChvcHRpb25bMF0gPT09IFwiSURcIiB8fCBvcHRpb25bMF0gPT09IFwiSU5TVFJFQU0tSURcIiB8fCBvcHRpb25bMF0gPT09IFwiS0VZRk9STUFUXCIpIG9wdGlvblsxXSA9IGBcIiR7b3B0aW9uWzFdfVwiYDtcblx0XHRcdFx0ZWxzZSBpZiAoIU9QVElPTl92YWx1ZV9SZWdleC50ZXN0KG9wdGlvblsxXSkpIG9wdGlvblsxXSA9IGBcIiR7b3B0aW9uWzFdfVwiYDtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbi5qb2luKFwiPVwiKTtcblx0XHRcdH0pLmpvaW4oXCIsXCIpO1xuXHRcdFx0cmV0dXJuIGl0ZW0gPSAoaXRlbT8uVVJJKSA/IGl0ZW0uVEFHICsgXCI6XCIgKyBpdGVtLk9QVElPTiArIHRoaXMubmV3TGluZSArIGl0ZW0uVVJJXG5cdFx0XHRcdDogKGl0ZW0/Lk9QVElPTikgPyBpdGVtLlRBRyArIFwiOlwiICsgaXRlbS5PUFRJT05cblx0XHRcdFx0XHQ6IChpdGVtPy5UQUcpID8gaXRlbS5UQUdcblx0XHRcdFx0XHRcdDogKGl0ZW0/Lk5PVEUpID8gaXRlbS5OT1RFXG5cdFx0XHRcdFx0XHRcdDogXCJcIjtcblx0XHR9KS5qb2luKHRoaXMubmV3TGluZSk7XG5cdFx0cmV0dXJuIG0zdThcblx0fTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVUkkge1xuXHRjb25zdHJ1Y3RvcihvcHRzID0gW10pIHtcblx0XHR0aGlzLm5hbWUgPSBcIlVSSSB2MS4yLjZcIjtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXHRcdHRoaXMuanNvbiA9IHsgc2NoZW1lOiBcIlwiLCBob3N0OiBcIlwiLCBwYXRoOiBcIlwiLCBxdWVyeToge30gfTtcblx0fTtcblxuXHRwYXJzZSh1cmwpIHtcblx0XHRjb25zdCBVUkxSZWdleCA9IC8oPzooPzxzY2hlbWU+LispOlxcL1xcLyg/PGhvc3Q+W14vXSspKT9cXC8/KD88cGF0aD5bXj9dKyk/XFw/Pyg/PHF1ZXJ5PlteP10rKT8vO1xuXHRcdGxldCBqc29uID0gdXJsLm1hdGNoKFVSTFJlZ2V4KT8uZ3JvdXBzID8/IG51bGw7XG5cdFx0aWYgKGpzb24/LnBhdGgpIGpzb24ucGF0aHMgPSBqc29uLnBhdGguc3BsaXQoXCIvXCIpOyBlbHNlIGpzb24ucGF0aCA9IFwiXCI7XG5cdFx0Ly9pZiAoanNvbj8ucGF0aHM/LmF0KC0xKT8uaW5jbHVkZXMoXCIuXCIpKSBqc29uLmZvcm1hdCA9IGpzb24ucGF0aHMuYXQoLTEpLnNwbGl0KFwiLlwiKS5hdCgtMSk7XG5cdFx0aWYgKGpzb24/LnBhdGhzKSB7XG5cdFx0XHRjb25zdCBmaWxlTmFtZSA9IGpzb24ucGF0aHNbanNvbi5wYXRocy5sZW5ndGggLSAxXTtcblx0XHRcdGlmIChmaWxlTmFtZT8uaW5jbHVkZXMoXCIuXCIpKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3QgPSBmaWxlTmFtZS5zcGxpdChcIi5cIik7XG5cdFx0XHRcdGpzb24uZm9ybWF0ID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoanNvbj8ucXVlcnkpIGpzb24ucXVlcnkgPSBPYmplY3QuZnJvbUVudHJpZXMoanNvbi5xdWVyeS5zcGxpdChcIiZcIikubWFwKChwYXJhbSkgPT4gcGFyYW0uc3BsaXQoXCI9XCIpKSk7XG5cdFx0cmV0dXJuIGpzb25cblx0fTtcblxuXHRzdHJpbmdpZnkoanNvbiA9IHRoaXMuanNvbikge1xuXHRcdGxldCB1cmwgPSBcIlwiO1xuXHRcdGlmIChqc29uPy5zY2hlbWUgJiYganNvbj8uaG9zdCkgdXJsICs9IGpzb24uc2NoZW1lICsgXCI6Ly9cIiArIGpzb24uaG9zdDtcblx0XHRpZiAoanNvbj8ucGF0aCkgdXJsICs9IChqc29uPy5ob3N0KSA/IFwiL1wiICsganNvbi5wYXRoIDoganNvbi5wYXRoO1xuXHRcdGlmIChqc29uPy5xdWVyeSkgdXJsICs9IFwiP1wiICsgT2JqZWN0LmVudHJpZXMoanNvbi5xdWVyeSkubWFwKHBhcmFtID0+IHBhcmFtLmpvaW4oXCI9XCIpKS5qb2luKFwiJlwiKTtcblx0XHRyZXR1cm4gdXJsXG5cdH07XG59XG4iLCIvKipcbiAqIGRldGVjdCBGb3JtYXRcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7T2JqZWN0fSB1cmwgLSBQYXJzZWQgVVJMXG4gKiBAcGFyYW0ge1N0cmluZ30gYm9keSAtIHJlc3BvbnNlIGJvZHlcbiAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0IC0gZm9ybWF0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGVjdEZvcm1hdCh1cmwsIGJvZHkpIHtcblx0bGV0IGZvcm1hdCA9IHVuZGVmaW5lZDtcblx0Y29uc29sZS5sb2coYOKYke+4jyBkZXRlY3RGb3JtYXQsIGZvcm1hdDogJHt1cmwuZm9ybWF0ID8/IHVybC5xdWVyeT8uZm10ID8/IHVybC5xdWVyeT8uZm9ybWF0fWAsIFwiXCIpO1xuXHRzd2l0Y2ggKHVybC5mb3JtYXQgPz8gdXJsLnF1ZXJ5Py5mbXQgPz8gdXJsLnF1ZXJ5Py5mb3JtYXQpIHtcblx0XHRjYXNlIFwidHh0XCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQvcGxhaW5cIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ4bWxcIjpcblx0XHRjYXNlIFwic3J2M1wiOlxuXHRcdGNhc2UgXCJ0dG1sXCI6XG5cdFx0Y2FzZSBcInR0bWwyXCI6XG5cdFx0Y2FzZSBcImltc2NcIjpcblx0XHRcdGZvcm1hdCA9IFwidGV4dC94bWxcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ2dHRcIjpcblx0XHRjYXNlIFwid2VidnR0XCI6XG5cdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwianNvblwiOlxuXHRcdGNhc2UgXCJqc29uM1wiOlxuXHRcdFx0Zm9ybWF0ID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwibTN1XCI6XG5cdFx0Y2FzZSBcIm0zdThcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24veC1tcGVndXJsXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwicGxpc3RcIjpcblx0XHRcdGZvcm1hdCA9IFwiYXBwbGljYXRpb24vcGxpc3RcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0Y29uc3QgSEVBREVSID0gYm9keT8uc3Vic3RyaW5nPy4oMCwgNikudHJpbT8uKCk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGDwn5qnIGRldGVjdEZvcm1hdCwgSEVBREVSOiAke0hFQURFUn1gLCBcIlwiKTtcblx0XHRcdC8vY29uc29sZS5sb2coYPCfmqcgZGV0ZWN0Rm9ybWF0LCBIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpOiAke0hFQURFUj8uc3Vic3RyaW5nPy4oMCwgMSl9YCwgXCJcIik7XG5cdFx0XHRzd2l0Y2ggKEhFQURFUikge1xuXHRcdFx0XHRjYXNlIFwiPD94bWxcIjpcblx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQveG1sXCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJXRUJWVFRcIjpcblx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0c3dpdGNoIChIRUFERVI/LnN1YnN0cmluZz8uKDAsIDEpKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwiMFwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjFcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCIyXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiM1wiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjRcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI1XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiNlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcIjdcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCI4XCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiOVwiOlxuXHRcdFx0XHRcdFx0XHRmb3JtYXQgPSBcInRleHQvdnR0XCI7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcIntcIjpcblx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0XHRicmVhaztcblx0fTtcblx0Y29uc29sZS5sb2coYOKchSBkZXRlY3RGb3JtYXQsIGZvcm1hdDogJHtmb3JtYXR9YCwgXCJcIik7XG5cdHJldHVybiBmb3JtYXQ7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGV0ZWN0UGxhdGZvcm0odXJsKSB7XG5cdGNvbnNvbGUubG9nKGDimJHvuI8gRGV0ZWN0IFBsYXRmb3JtYCwgXCJcIik7XG5cdC8qKioqKioqKioqKioqKioqKiBQbGF0Zm9ybSAqKioqKioqKioqKioqKioqKi9cblx0bGV0IFBsYXRmb3JtID0gL1xcLihuZXRmbGl4XFwuY29tfG5mbHh2aWRlb1xcLm5ldCkvaS50ZXN0KHVybCkgPyBcIk5ldGZsaXhcIlxuXHRcdDogLyhcXC55b3V0dWJlfHlvdXR1YmVpXFwuZ29vZ2xlYXBpcylcXC5jb20vaS50ZXN0KHVybCkgPyBcIllvdVR1YmVcIlxuXHRcdFx0OiAvXFwuc3BvdGlmeShjZG4pP1xcLmNvbS9pLnRlc3QodXJsKSA/IFwiU3BvdGlmeVwiXG5cdFx0XHRcdDogL1xcLmFwcGxlXFwuY29tL2kudGVzdCh1cmwpID8gXCJBcHBsZVwiXG5cdFx0XHRcdFx0OiAvXFwuKGRzc290dHxzdGFyb3R0KVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiRGlzbmV5K1wiXG5cdFx0XHRcdFx0XHQ6IC8oXFwuKHB2LWNkbnxhaXYtY2RufGFrYW1haWhkfGNsb3VkZnJvbnQpXFwubmV0KXxzM1xcLmFtYXpvbmF3c1xcLmNvbVxcL2Fpdi1wcm9kLXRpbWVkdGV4dFxcLy9pLnRlc3QodXJsKSA/IFwiUHJpbWVWaWRlb1wiXG5cdFx0XHRcdFx0XHRcdDogL3ByZFxcLm1lZGlhXFwuaDI2NFxcLmlvL2kudGVzdCh1cmwpID8gXCJNYXhcIlxuXHRcdFx0XHRcdFx0XHRcdDogL1xcLihhcGlcXC5oYm98aGJvbWF4Y2RuKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiSEJPTWF4XCJcblx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLihodWx1c3RyZWFtfGh1bHVpbSlcXC5jb20vaS50ZXN0KHVybCkgPyBcIkh1bHVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IC9cXC4oY2JzYWF2aWRlb3xjYnNpdmlkZW98Y2JzKVxcLmNvbS9pLnRlc3QodXJsKSA/IFwiUGFyYW1vdW50K1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwudXBseW5rXFwuY29tL2kudGVzdCh1cmwpID8gXCJEaXNjb3ZlcnkrXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL2RwbHVzLXBoLS9pLnRlc3QodXJsKSA/IFwiRGlzY292ZXJ5K1BoXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwucGVhY29ja3R2XFwuY29tL2kudGVzdCh1cmwpID8gXCJQZWFjb2NrVFZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLmZ1Ym9cXC50di9pLnRlc3QodXJsKSA/IFwiRnVib1RWXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogL1xcLnZpa2lcXC5pby9pLnRlc3QodXJsKSA/IFwiVmlraVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogLyhlcGl4aGxzXFwuYWthbWFpemVkXFwubmV0fGVwaXhcXC5zZXJ2aWNlc1xcLmlvKS9pLnRlc3QodXJsKSA/IFwiTUdNK1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiAvXFwubmVidWxhXFwuYXBwfC9pLnRlc3QodXJsKSA/IFwiTmVidWxhXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogXCJVbml2ZXJzYWxcIjtcbiAgICBjb25zb2xlLmxvZyhg4pyFIERldGVjdCBQbGF0Zm9ybSwgUGxhdGZvcm06ICR7UGxhdGZvcm19YCwgXCJcIik7XG5cdHJldHVybiBQbGF0Zm9ybTtcbn07XG4iLCIvKlxuUkVBRE1FOiBodHRwczovL2dpdGh1Yi5jb20vRHVhbFN1YnNcbiovXG5cbmltcG9ydCBFTlZzIGZyb20gXCIuLi9FTlYvRU5WLm1qc1wiO1xuY29uc3QgJCA9IG5ldyBFTlZzKFwi8J+Nv++4jyBEdWFsU3ViczogU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc1wiKTtcblxuLyoqXG4gKiBTZXQgRW52aXJvbm1lbnQgVmFyaWFibGVzXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBlcnNpc3RlbnQgU3RvcmUgS2V5XG4gKiBAcGFyYW0ge0FycmF5fSBwbGF0Zm9ybXMgLSBQbGF0Zm9ybSBOYW1lc1xuICogQHBhcmFtIHtPYmplY3R9IGRhdGFiYXNlIC0gRGVmYXVsdCBEYXRhQmFzZVxuICogQHJldHVybiB7T2JqZWN0fSB7IFNldHRpbmdzLCBDYWNoZXMsIENvbmZpZ3MgfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRFTlYobmFtZSwgcGxhdGZvcm1zLCBkYXRhYmFzZSkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfWAsIFwiXCIpO1xuXHRsZXQgeyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH0gPSAkLmdldEVOVihuYW1lLCBwbGF0Zm9ybXMsIGRhdGFiYXNlKTtcblx0LyoqKioqKioqKioqKioqKioqIFNldHRpbmdzICoqKioqKioqKioqKioqKioqL1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoU2V0dGluZ3M/LlR5cGVzKSkgU2V0dGluZ3MuVHlwZXMgPSAoU2V0dGluZ3MuVHlwZXMpID8gW1NldHRpbmdzLlR5cGVzXSA6IFtdOyAvLyDlj6rmnInkuIDkuKrpgInpobnml7bvvIzml6DpgJflj7fliIbpmpRcblx0aWYgKCQuaXNMb29uKCkgJiYgcGxhdGZvcm1zLmluY2x1ZGVzKFwiWW91VHViZVwiKSkge1xuXHRcdFNldHRpbmdzLkF1dG9DQyA9ICRwZXJzaXN0ZW50U3RvcmUucmVhZChcIuiHquWKqOaYvuekuue/u+ivkeWtl+W5lVwiKSA/PyBTZXR0aW5ncy5BdXRvQ0M7XG5cdFx0c3dpdGNoIChTZXR0aW5ncy5BdXRvQ0MpIHtcblx0XHRcdGNhc2UgXCLmmK9cIjpcblx0XHRcdFx0U2V0dGluZ3MuQXV0b0NDID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwi5ZCmXCI6XG5cdFx0XHRcdFNldHRpbmdzLkF1dG9DQyA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0U2V0dGluZ3MuU2hvd09ubHkgPSAkcGVyc2lzdGVudFN0b3JlLnJlYWQoXCLku4XovpPlh7ror5HmlodcIikgPz8gU2V0dGluZ3MuU2hvd09ubHk7XG5cdFx0c3dpdGNoIChTZXR0aW5ncy5TaG93T25seSkge1xuXHRcdFx0Y2FzZSBcIuaYr1wiOlxuXHRcdFx0XHRTZXR0aW5ncy5TaG93T25seSA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIuWQplwiOlxuXHRcdFx0XHRTZXR0aW5ncy5TaG93T25seSA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH07XG5cdFx0U2V0dGluZ3MuUG9zaXRpb24gPSAkcGVyc2lzdGVudFN0b3JlLnJlYWQoXCLlrZfluZXor5HmlofkvY3nva5cIikgPz8gU2V0dGluZ3MuUG9zaXRpb247XG5cdFx0c3dpdGNoIChTZXR0aW5ncy5Qb3NpdGlvbikge1xuXHRcdFx0Y2FzZSBcIuivkeaWh+S9jeS6juWkluaWh+S5i+S4ilwiOlxuXHRcdFx0XHRTZXR0aW5ncy5Qb3NpdGlvbiA9IFwiRm9yd2FyZFwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCLor5HmlofkvY3kuo7lpJbmlofkuYvkuItcIjpcblx0XHRcdFx0U2V0dGluZ3MuUG9zaXRpb24gPSBcIlJldmVyc2VcIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVhaztcblx0XHR9O1xuXHR9O1xuXHQkLmxvZyhg4pyFICR7JC5uYW1lfSwgU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBTZXR0aW5nczogJHt0eXBlb2YgU2V0dGluZ3N9YCwgYFNldHRpbmdz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KFNldHRpbmdzKX1gLCBcIlwiKTtcblx0LyoqKioqKioqKioqKioqKioqIENhY2hlcyAqKioqKioqKioqKioqKioqKi9cblx0Ly8kLmxvZyhg4pyFICR7JC5uYW1lfSwgU2V0IEVudmlyb25tZW50IFZhcmlhYmxlc2AsIGBDYWNoZXM6ICR7dHlwZW9mIENhY2hlc31gLCBgQ2FjaGVz5YaF5a65OiAke0pTT04uc3RyaW5naWZ5KENhY2hlcyl9YCwgXCJcIik7XG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5QbGF5bGlzdHMgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShDYWNoZXM/LlBsYXlsaXN0cykpIENhY2hlcy5QbGF5bGlzdHMgPSB7fTsgLy8g5Yib5bu6UGxheWxpc3Rz57yT5a2YXG5cdENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uUGxheWxpc3RzPy5NYXN0ZXIgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHRDYWNoZXMuUGxheWxpc3RzLlN1YnRpdGxlID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uUGxheWxpc3RzPy5TdWJ0aXRsZSB8fCBcIltdXCIpKTsgLy8gU3RyaW5nc+i9rEFycmF56L2sTWFwXG5cdGlmICh0eXBlb2YgQ2FjaGVzPy5TdWJ0aXRsZXMgIT09IFwib2JqZWN0XCIpIENhY2hlcy5TdWJ0aXRsZXMgPSBuZXcgTWFwKEpTT04ucGFyc2UoQ2FjaGVzPy5TdWJ0aXRsZXMgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHRpZiAodHlwZW9mIENhY2hlcz8uTWV0YWRhdGFzICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoQ2FjaGVzPy5NZXRhZGF0YXMpKSBDYWNoZXMuTWV0YWRhdGFzID0ge307IC8vIOWIm+W7ulBsYXlsaXN0c+e8k+WtmFxuXHRpZiAodHlwZW9mIENhY2hlcz8uTWV0YWRhdGFzPy5UcmFja3MgIT09IFwib2JqZWN0XCIpIENhY2hlcy5NZXRhZGF0YXMuVHJhY2tzID0gbmV3IE1hcChKU09OLnBhcnNlKENhY2hlcz8uTWV0YWRhdGFzPy5UcmFja3MgfHwgXCJbXVwiKSk7IC8vIFN0cmluZ3PovaxBcnJheei9rE1hcFxuXHQvKioqKioqKioqKioqKioqKiogQ29uZmlncyAqKioqKioqKioqKioqKioqKi9cblx0cmV0dXJuIHsgU2V0dGluZ3MsIENhY2hlcywgQ29uZmlncyB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcblJFQURNRTogaHR0cHM6Ly9naXRodWIuY29tL0R1YWxTdWJzXG4qL1xuXG5pbXBvcnQgRU5WcyBmcm9tIFwiLi9FTlYvRU5WLm1qc1wiO1xuaW1wb3J0IFVSSXMgZnJvbSBcIi4vVVJJL1VSSS5tanNcIjtcbmltcG9ydCBFWFRNM1UgZnJvbSBcIi4vRVhUTTNVL0VYVE0zVS5tanNcIjtcblxuaW1wb3J0IHNldEVOViBmcm9tIFwiLi9mdW5jdGlvbi9zZXRFTlYubWpzXCI7XG5pbXBvcnQgZGV0ZWN0UGxhdGZvcm0gZnJvbSBcIi4vZnVuY3Rpb24vZGV0ZWN0UGxhdGZvcm0ubWpzXCI7XG5pbXBvcnQgZGV0ZWN0Rm9ybWF0IGZyb20gXCIuL2Z1bmN0aW9uL2RldGVjdEZvcm1hdC5tanNcIjtcblxuaW1wb3J0ICogYXMgRGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2UvRGF0YWJhc2UuanNvblwiO1xuXG5jb25zdCAkID0gbmV3IEVOVnMoXCLwn42/77iPIER1YWxTdWJzOiDwn46mIFVuaXZlcnNhbCB2MC45LjYoMikgTWFzdGVyLm0zdTgucmVzcG9uc2UuYmV0YVwiKTtcbmNvbnN0IFVSSSA9IG5ldyBVUklzKCk7XG5jb25zdCBNM1U4ID0gbmV3IEVYVE0zVShbXCJcXG5cIl0pO1xuXG4vKioqKioqKioqKioqKioqKiogUHJvY2Vzc2luZyAqKioqKioqKioqKioqKioqKi9cbi8vIOino+aehFVSTFxuY29uc3QgVVJMID0gVVJJLnBhcnNlKCRyZXF1ZXN0LnVybCk7XG4kLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBVUkw6ICR7SlNPTi5zdHJpbmdpZnkoVVJMKX1gLCBcIlwiKTtcbi8vIOiOt+WPlui/nuaOpeWPguaVsFxuY29uc3QgTUVUSE9EID0gJHJlcXVlc3QubWV0aG9kLCBIT1NUID0gVVJMLmhvc3QsIFBBVEggPSBVUkwucGF0aCwgUEFUSHMgPSBVUkwucGF0aHM7XG4kLmxvZyhg4pqgICR7JC5uYW1lfWAsIGBNRVRIT0Q6ICR7TUVUSE9EfWAsIFwiXCIpO1xuLy8g6I635Y+W5bmz5Y+wXG5jb25zdCBQTEFURk9STSA9IGRldGVjdFBsYXRmb3JtKEhPU1QpO1xuJC5sb2coYOKaoCAkeyQubmFtZX0sIFBMQVRGT1JNOiAke1BMQVRGT1JNfWAsIFwiXCIpO1xuLy8g6Kej5p6Q5qC85byPXG5sZXQgRk9STUFUID0gKCRyZXNwb25zZS5oZWFkZXJzPy5bXCJDb250ZW50LVR5cGVcIl0gPz8gJHJlc3BvbnNlLmhlYWRlcnM/LltcImNvbnRlbnQtdHlwZVwiXSk/LnNwbGl0KFwiO1wiKT8uWzBdO1xuaWYgKEZPUk1BVCA9PT0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiB8fCBGT1JNQVQgPT09IFwidGV4dC9wbGFpblwiKSBGT1JNQVQgPSBkZXRlY3RGb3JtYXQoVVJMLCAkcmVzcG9uc2U/LmJvZHkpO1xuJC5sb2coYOKaoCAkeyQubmFtZX0sIEZPUk1BVDogJHtGT1JNQVR9YCwgXCJcIik7XG4oYXN5bmMgKCkgPT4ge1xuXHQvLyDor7vlj5borr7nva5cblx0Y29uc3QgeyBTZXR0aW5ncywgQ2FjaGVzLCBDb25maWdzIH0gPSBzZXRFTlYoXCJEdWFsU3Vic1wiLCBbKFtcIllvdVR1YmVcIiwgXCJOZXRmbGl4XCIsIFwiQmlsaUJpbGlcIiwgXCJTcG90aWZ5XCJdLmluY2x1ZGVzKFBMQVRGT1JNKSkgPyBQTEFURk9STSA6IFwiVW5pdmVyc2FsXCJdLCBEYXRhYmFzZSk7XG5cdCQubG9nKGDimqAgJHskLm5hbWV9YCwgYFNldHRpbmdzLlN3aXRjaDogJHtTZXR0aW5ncz8uU3dpdGNofWAsIFwiXCIpO1xuXHRzd2l0Y2ggKFNldHRpbmdzLlN3aXRjaCkge1xuXHRcdGNhc2UgdHJ1ZTpcblx0XHRkZWZhdWx0OlxuXHRcdFx0Ly8g6I635Y+W5a2X5bmV57G75Z6L5LiO6K+t6KiAXG5cdFx0XHRjb25zdCBUeXBlID0gVVJMLnF1ZXJ5Py5zdWJ0eXBlID8/IFNldHRpbmdzLlR5cGUsIExhbmd1YWdlcyA9IFtVUkwucXVlcnk/Lmxhbmc/LnRvVXBwZXJDYXNlPy4oKSA/PyBTZXR0aW5ncy5MYW5ndWFnZXNbMF0sIChVUkwucXVlcnk/LnRsYW5nID8/IENhY2hlcz8udGxhbmcpPy50b1VwcGVyQ2FzZT8uKCkgPz8gU2V0dGluZ3MuTGFuZ3VhZ2VzWzFdXTtcblx0XHRcdCQubG9nKGDimqAgJHskLm5hbWV9LCBUeXBlOiAke1R5cGV9LCBMYW5ndWFnZXM6ICR7TGFuZ3VhZ2VzfWAsIFwiXCIpO1xuXHRcdFx0Ly8g5YW85a655oCn5Yik5patXG5cdFx0XHRjb25zdCB7IHN0YW5kYXJkOiBTVEFOREFSRCwgZGV2aWNlOiBERVZJQ0UgfSA9IGlzU3RhbmRhcmQoVVJMLCAkcmVxdWVzdC5oZWFkZXJzLCBQTEFURk9STSk7XG5cdFx0XHQvLyDliJvlu7rnqbrmlbDmja5cblx0XHRcdGxldCBib2R5ID0ge307XG5cdFx0XHQvLyDmoLzlvI/liKTmlq1cblx0XHRcdHN3aXRjaCAoRk9STUFUKSB7XG5cdFx0XHRcdGNhc2UgdW5kZWZpbmVkOiAvLyDop4bkuLrml6Bib2R5XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvcGxhaW5cIjpcblx0XHRcdFx0Y2FzZSBcInRleHQvaHRtbFwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24veC1tcGVnVVJMXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LW1wZWd1cmxcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsXCI6XG5cdFx0XHRcdGNhc2UgXCJhdWRpby9tcGVndXJsXCI6XG5cdFx0XHRcdFx0Ly8g5bqP5YiX5YyWTTNVOFxuXHRcdFx0XHRcdGJvZHkgPSBNM1U4LnBhcnNlKCRyZXNwb25zZS5ib2R5KTtcblx0XHRcdFx0XHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIFwiTTNVOC5wYXJzZSgkcmVzcG9uc2UuYm9keSlcIiwgSlNPTi5zdHJpbmdpZnkoYm9keSksIFwiXCIpO1xuXHRcdFx0XHRcdC8vIOivu+WPluW3suWtmOaVsOaNrlxuXHRcdFx0XHRcdGxldCBwbGF5bGlzdENhY2hlID0gQ2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXIuZ2V0KCRyZXF1ZXN0LnVybCkgfHwge307XG5cdFx0XHRcdFx0Ly8g6I635Y+W54m55a6a6K+t6KiA55qE5a2X5bmVXG5cdFx0XHRcdFx0cGxheWxpc3RDYWNoZVtMYW5ndWFnZXNbMF1dID0gZ2V0QXR0ckxpc3QoJHJlcXVlc3QudXJsLCBib2R5LCBcIlNVQlRJVExFU1wiLCBDb25maWdzLkxhbmd1YWdlc1tMYW5ndWFnZXNbMF1dKTtcblx0XHRcdFx0XHRwbGF5bGlzdENhY2hlW0xhbmd1YWdlc1sxXV0gPSBnZXRBdHRyTGlzdCgkcmVxdWVzdC51cmwsIGJvZHksIFwiU1VCVElUTEVTXCIsIENvbmZpZ3MuTGFuZ3VhZ2VzW0xhbmd1YWdlc1sxXV0pO1xuXHRcdFx0XHRcdC8vIOWGmeWFpeaVsOaNrlxuXHRcdFx0XHRcdENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyLnNldCgkcmVxdWVzdC51cmwsIHBsYXlsaXN0Q2FjaGUpO1xuXHRcdFx0XHRcdC8vIOagvOW8j+WMlue8k+WtmFxuXHRcdFx0XHRcdENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyID0gc2V0Q2FjaGUoQ2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXIsIFNldHRpbmdzLkNhY2hlU2l6ZSk7XG5cdFx0XHRcdFx0Ly8g5YaZ5YWl5oyB5LmF5YyW5YKo5a2YXG5cdFx0XHRcdFx0JC5zZXRqc29uKENhY2hlcy5QbGF5bGlzdHMuTWFzdGVyLCBgQER1YWxTdWJzLiR7XCJDb21wb3NpdGVcIn0uQ2FjaGVzLlBsYXlsaXN0cy5NYXN0ZXJgKTtcblx0XHRcdFx0XHQvLyDlhpnlhaXpgInpoblcblx0XHRcdFx0XHRib2R5ID0gc2V0QXR0ckxpc3QoYm9keSwgcGxheWxpc3RDYWNoZSwgU2V0dGluZ3MuVHlwZXMsIExhbmd1YWdlcywgUExBVEZPUk0sIFNUQU5EQVJELCBERVZJQ0UpO1xuXHRcdFx0XHRcdC8vIOWtl+espuS4sk0zVThcblx0XHRcdFx0XHQkcmVzcG9uc2UuYm9keSA9IE0zVTguc3RyaW5naWZ5KGJvZHkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgZmFsc2U6XG5cdFx0XHRicmVhaztcblx0fTtcbn0pKClcblx0LmNhdGNoKChlKSA9PiAkLmxvZ0VycihlKSlcblx0LmZpbmFsbHkoKCkgPT4ge1xuXHRcdHN3aXRjaCAoJHJlc3BvbnNlKSB7XG5cdFx0XHRkZWZhdWx0OiB7IC8vIOacieWbnuWkjeaVsOaNru+8jOi/lOWbnuWbnuWkjeaVsOaNrlxuXHRcdFx0XHQvL2NvbnN0IEZPUk1BVCA9ICgkcmVzcG9uc2U/LmhlYWRlcnM/LltcIkNvbnRlbnQtVHlwZVwiXSA/PyAkcmVzcG9uc2U/LmhlYWRlcnM/LltcImNvbnRlbnQtdHlwZVwiXSk/LnNwbGl0KFwiO1wiKT8uWzBdO1xuXHRcdFx0XHQkLmxvZyhg8J+OiSAkeyQubmFtZX0sIGZpbmFsbHlgLCBgJHJlc3BvbnNlYCwgYEZPUk1BVDogJHtGT1JNQVR9YCwgXCJcIik7XG5cdFx0XHRcdC8vJC5sb2coYPCfmqcgJHskLm5hbWV9LCBmaW5hbGx5YCwgYCRyZXNwb25zZTogJHtKU09OLnN0cmluZ2lmeSgkcmVzcG9uc2UpfWAsIFwiXCIpO1xuXHRcdFx0XHRpZiAoJHJlc3BvbnNlPy5oZWFkZXJzPy5bXCJDb250ZW50LUVuY29kaW5nXCJdKSAkcmVzcG9uc2UuaGVhZGVyc1tcIkNvbnRlbnQtRW5jb2RpbmdcIl0gPSBcImlkZW50aXR5XCI7XG5cdFx0XHRcdGlmICgkcmVzcG9uc2U/LmhlYWRlcnM/LltcImNvbnRlbnQtZW5jb2RpbmdcIl0pICRyZXNwb25zZS5oZWFkZXJzW1wiY29udGVudC1lbmNvZGluZ1wiXSA9IFwiaWRlbnRpdHlcIjtcblx0XHRcdFx0aWYgKCQuaXNRdWFuWCgpKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChGT1JNQVQpIHtcblx0XHRcdFx0XHRcdGNhc2UgdW5kZWZpbmVkOiAvLyDop4bkuLrml6Bib2R5XG5cdFx0XHRcdFx0XHRcdC8vIOi/lOWbnuaZrumAmuaVsOaNrlxuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzIH0pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdC8vIOi/lOWbnuaZrumAmuaVsOaNrlxuXHRcdFx0XHRcdFx0XHQkLmRvbmUoeyBzdGF0dXM6ICRyZXNwb25zZS5zdGF0dXMsIGhlYWRlcnM6ICRyZXNwb25zZS5oZWFkZXJzLCBib2R5OiAkcmVzcG9uc2UuYm9keSB9KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vcHJvdG9idWZcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi94LXByb3RvYnVmXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS5wcm90b2J1ZlwiOlxuXHRcdFx0XHRcdFx0Y2FzZSBcImFwcGxpY2F0aW9uL2dycGNcIjpcblx0XHRcdFx0XHRcdGNhc2UgXCJhcHBsaWNhdGlvbi9ncnBjK3Byb3RvXCI6XG5cdFx0XHRcdFx0XHRjYXNlIFwiYXBwbGVjYXRpb24vb2N0ZXQtc3RyZWFtXCI6XG5cdFx0XHRcdFx0XHRcdC8vIOi/lOWbnuS6jOi/m+WItuaVsOaNrlxuXHRcdFx0XHRcdFx0XHQvLyQubG9nKGAkeyRyZXNwb25zZS5ib2R5Qnl0ZXMuYnl0ZUxlbmd0aH0tLS0keyRyZXNwb25zZS5ib2R5Qnl0ZXMuYnVmZmVyLmJ5dGVMZW5ndGh9YCk7XG5cdFx0XHRcdFx0XHRcdCQuZG9uZSh7IHN0YXR1czogJHJlc3BvbnNlLnN0YXR1cywgaGVhZGVyczogJHJlc3BvbnNlLmhlYWRlcnMsIGJvZHlCeXRlczogJHJlc3BvbnNlLmJvZHlCeXRlcy5idWZmZXIuc2xpY2UoJHJlc3BvbnNlLmJvZHlCeXRlcy5ieXRlT2Zmc2V0LCAkcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVMZW5ndGggKyAkcmVzcG9uc2UuYm9keUJ5dGVzLmJ5dGVPZmZzZXQpIH0pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9IGVsc2UgJC5kb25lKCRyZXNwb25zZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGNhc2UgdW5kZWZpbmVkOiB7IC8vIOaXoOWbnuWkjeaVsOaNrlxuXHRcdFx0XHRicmVhaztcblx0XHRcdH07XG5cdFx0fTtcblx0fSlcblxuLyoqKioqKioqKioqKioqKioqIEZ1bmN0aW9uICoqKioqKioqKioqKioqKioqL1xuLyoqXG4gKiBTZXQgQ2FjaGVcbiAqIEBhdXRob3IgVmlyZ2lsQ2x5bmVcbiAqIEBwYXJhbSB7TWFwfSBjYWNoZSAtIFBsYXlsaXN0cyBDYWNoZSAvIFN1YnRpdGxlcyBDYWNoZVxuICogQHBhcmFtIHtOdW1iZXJ9IGNhY2hlU2l6ZSAtIENhY2hlIFNpemVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGlzU2F2ZWRcbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGUoY2FjaGUsIGNhY2hlU2l6ZSA9IDEwMCkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgU2V0IENhY2hlLCBjYWNoZVNpemU6ICR7Y2FjaGVTaXplfWAsIFwiXCIpO1xuXHRjYWNoZSA9IEFycmF5LmZyb20oY2FjaGUgfHwgW10pOyAvLyBNYXDovaxBcnJheVxuXHRjYWNoZSA9IGNhY2hlLnNsaWNlKC1jYWNoZVNpemUpOyAvLyDpmZDliLbnvJPlrZjlpKflsI9cblx0JC5sb2coYOKchSAkeyQubmFtZX0sIFNldCBDYWNoZWAsIFwiXCIpO1xuXHRyZXR1cm4gY2FjaGU7XG59O1xuXG4vKipcbiAqIEdldCBBdHRyaWJ1dGUgTGlzdFxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFJlcXVlc3QgVVJMXG4gKiBAcGFyYW0ge09iamVjdH0gbTN1OCAtIFBhcnNlZCBNM1U4XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIENvbnRlbnQgVHlwZVxuICogQHBhcmFtIHtBcnJheX0gbGFuZ0NvZGVzIC0gTGFuZ3VhZ2UgQ29kZXMgQXJyYXlcbiAqIEByZXR1cm4ge0FycmF5fSBkYXRhc1xuICovXG5mdW5jdGlvbiBnZXRBdHRyTGlzdCh1cmwgPSBcIlwiLCBtM3U4ID0ge30sIHR5cGUgPSBcIlwiLCBsYW5nQ29kZXMgPSBbXSkge1xuXHQkLmxvZyhg4piR77iPICQkeyQubmFtZX0sIEdldCBBdHRyaWJ1dGUgTGlzdGAsIGBsYW5nQ29kZXM6ICR7bGFuZ0NvZGVzfWAsIFwiXCIpO1xuXHRsZXQgYXR0ckxpc3QgPSBtM3U4LmZpbHRlcihpdGVtID0+IGl0ZW0/Lk9QVElPTj8uVFlQRSA9PT0gdHlwZSAmJiBpdGVtPy5PUFRJT04/LkZPUkNFRCAhPT0gXCJZRVNcIik7IC8vIOi/h+a7pOW8uuWItuWGheWuuVxuXHQvLyQubG9nKGDwn5qnICR7JC5uYW1lfWAsIFwiYXR0ckxpc3RcIiwgSlNPTi5zdHJpbmdpZnkoYXR0ckxpc3QpLCBcIlwiKTtcblx0bGV0IG1hdGNoTGlzdCA9IFtdO1xuXHQvL+afpeivouaYr+WQpuacieespuWQiOivreiogOeahOWGheWuuVxuXHRmb3IgKGxldCBsYW5nY29kZSBvZiBsYW5nQ29kZXMpIHtcblx0XHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIEdldCBBdHRyaWJ1dGUgTGlzdGAsIFwiZm9yIChsZXQgbGFuZ2NvZGUgb2YgbGFuZ2NvZGVzKVwiLCBgbGFuZ2NvZGU6ICR7bGFuZ2NvZGV9YCwgXCJcIik7XG5cdFx0bWF0Y2hMaXN0ID0gYXR0ckxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbT8uT1BUSU9OPy5MQU5HVUFHRT8udG9Mb3dlckNhc2UoKSA9PT0gbGFuZ2NvZGU/LnRvTG93ZXJDYXNlKCkpO1xuXHRcdGlmIChtYXRjaExpc3QubGVuZ3RoICE9PSAwKSBicmVhaztcblx0fTtcblx0bWF0Y2hMaXN0ID0gbWF0Y2hMaXN0Lm1hcChkYXRhID0+IHtcblx0XHRkYXRhLlVSTCA9IGFQYXRoKHVybCwgZGF0YT8uT1BUSU9OPy5VUkkgPz8gbnVsbCk7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH0pXG5cdCQubG9nKGDinIUgJCR7JC5uYW1lfSwgR2V0IEF0dHJpYnV0ZSBMaXN0YCwgYG1hdGNoTGlzdDogJHtKU09OLnN0cmluZ2lmeShtYXRjaExpc3QpfWAsIFwiXCIpO1xuXHRyZXR1cm4gbWF0Y2hMaXN0O1xuXG5cdC8qKioqKioqKioqKioqKioqKiBGdWN0aW9ucyAqKioqKioqKioqKioqKioqKi9cblx0Ly8gR2V0IEFic29sdXRlIFBhdGhcblx0ZnVuY3Rpb24gYVBhdGgoYVVSTCA9IFwiXCIsIFVSTCA9IFwiXCIpIHsgcmV0dXJuICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KFVSTCkpID8gVVJMIDogYVVSTC5tYXRjaCgvXihodHRwcz86XFwvXFwvKD86W14/XSspXFwvKS9pKT8uWzBdICsgVVJMIH07XG59O1xuXG4vKipcbiAqIFNldCBBdHRyaWJ1dGUgTGlzdFxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IHBsYXRmb3JtIC0gUGxhdGZvcm1cbiAqIEBwYXJhbSB7T2JqZWN0fSBtM3U4IC0gUGFyc2VkIG0zdThcbiAqIEBwYXJhbSB7QXJyYXl9IHBsYXlsaXN0czEgLSBQcmltYXJ5IChTb3VyY2UpIExhbmd1YWdlcyBQbGF5bGlzdHNcbiAqIEBwYXJhbSB7QXJyYXl9IHBsYXlsaXN0czIgLSBTZWNvbmQgKFRhcmdldCkgTGFuZ3VhZ2VzIFBsYXlsaXN0c1xuICogQHBhcmFtIHtBcnJheX0gdHlwZXMgLSBUeXBlc1xuICogQHBhcmFtIHtBcnJheX0gbGFuZ3VhZ2VzIC0gTGFuZ3VhZ2VzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFN0YW5kYXJkIC0gU3RhbmRhcmRcbiAqIEByZXR1cm4ge09iamVjdH0gbTN1OFxuICovXG5mdW5jdGlvbiBzZXRBdHRyTGlzdChtM3U4ID0ge30sIHBsYXlsaXN0cyA9IHt9LCB0eXBlcyA9IFtdLCBsYW5ndWFnZXMgPSBbXSwgcGxhdGZvcm0gPSBcIlwiLCBzdGFuZGFyZCA9IHRydWUsIGRldmljZSA9IFwiaVBob25lXCIpIHtcblx0Ly90eXBlcyA9IChzdGFuZGFyZCA9PSB0cnVlKSA/IHR5cGVzIDogW1wiVHJhbnNsYXRlXCJdO1xuXHR0eXBlcyA9IChzdGFuZGFyZCA9PSB0cnVlKSA/IHR5cGVzIDogW3R5cGVzLmF0KC0xKV07XG5cdGNvbnN0IHBsYXlsaXN0czEgPSBwbGF5bGlzdHM/LltsYW5ndWFnZXM/LlswXV07XG5cdGNvbnN0IHBsYXlsaXN0czIgPSBwbGF5bGlzdHM/LltsYW5ndWFnZXM/LlsxXV07XG5cdC8vaWYgKHBsYXlsaXN0czE/Lmxlbmd0aCAhPT0gMCkgJC5sb2coYPCfmqcgJHskLm5hbWV9LCBTZXQgQXR0cmlidXRlIExpc3QsIOacieS4u+Wtl+W5leivreiogO+8iOa6kOivreiogO+8ieWtl+W5lWAsIFwiXCIpO1xuXHQvL2Vsc2UgdHlwZXMgPSB0eXBlcy5maWx0ZXIoZSA9PiBlICE9PSBcIlRyYW5zbGF0ZVwiKTsgLy8g5peg5rqQ6K+t6KiA5a2X5bmV5pe25Yig6Zmk57+76K+R5a2X5bmV6YCJ6aG5XG5cdC8vaWYgKHBsYXlsaXN0czI/Lmxlbmd0aCAhPT0gMCkgJC5sb2coYPCfmqcgJHskLm5hbWV9LCBTZXQgQXR0cmlidXRlIExpc3QsIOacieWJr+Wtl+W5leivreiogO+8iOebruagh+ivreiogO+8ieWtl+W5lWAsIFwiXCIpO1xuXHQvL2Vsc2UgdHlwZXMgPSB0eXBlcy5maWx0ZXIoZSA9PiBlICE9PSBcIk9mZmljaWFsXCIpOyAvLyDml6Dnm67moIfor63oqIDlrZfluZXml7bliKDpmaTlrpjmlrnlrZfluZXpgInpoblcblx0JC5sb2coYOKYke+4jyAkeyQubmFtZX0sIFNldCBBdHRyaWJ1dGUgTGlzdGAsIGB0eXBlczogJHt0eXBlc31gLCBcIlwiKTtcblx0cGxheWxpc3RzMT8uZm9yRWFjaChwbGF5bGlzdDEgPT4ge1xuXHRcdGNvbnN0IGluZGV4MSA9IG0zdTguZmluZEluZGV4KGl0ZW0gPT4gaXRlbT8uT1BUSU9OPy5VUkkgPT09IHBsYXlsaXN0MS5PUFRJT04uVVJJKTsgLy8g5Li76K+t6KiA77yI5rqQ6K+t6KiA77yJ5a2X5bmV5L2N572uXG5cdFx0dHlwZXMuZm9yRWFjaCh0eXBlID0+IHtcblx0XHRcdCQubG9nKGDwn5qnICR7JC5uYW1lfSwgU2V0IEF0dHJpYnV0ZSBMaXN0LCB0eXBlOiAke3R5cGV9YCwgXCJcIik7XG5cdFx0XHRsZXQgb3B0aW9uID0ge307XG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcIk9mZmljaWFsXCI6XG5cdFx0XHRcdFx0cGxheWxpc3RzMj8uZm9yRWFjaChwbGF5bGlzdDIgPT4ge1xuXHRcdFx0XHRcdFx0Ly9jb25zdCBpbmRleDIgPSBtM3U4LmZpbmRJbmRleChpdGVtID0+IGl0ZW0/Lk9QVElPTj8uVVJJID09PSBwbGF5bGlzdDIuT1BUSU9OLlVSSSk7IC8vIOWJr+ivreiogO+8iOa6kOivreiogO+8ieWtl+W5leS9jee9rlxuXHRcdFx0XHRcdFx0aWYgKHBsYXlsaXN0MT8uT1BUSU9OPy5bXCJHUk9VUC1JRFwiXSA9PT0gcGxheWxpc3QyPy5PUFRJT04/LltcIkdST1VQLUlEXCJdKSB7XG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAocGxhdGZvcm0pIHsgLy8g5YW85a655oCn5L+u5q2jXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIkFwcGxlXCI6XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocGxheWxpc3QxPy5PUFRJT04uQ0hBUkFDVEVSSVNUSUNTID09IHBsYXlsaXN0Mj8uT1BUSU9OLkNIQVJBQ1RFUklTVElDUykgeyAgLy8g5Y+q55Sf5oiQ5bGe5oCn55u45ZCMXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbiA9IHNldE9wdGlvbihwbGF5bGlzdDEsIHBsYXlsaXN0MiwgdHlwZSwgcGxhdGZvcm0sIHN0YW5kYXJkLCBkZXZpY2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb24gPSBzZXRPcHRpb24ocGxheWxpc3QxLCBwbGF5bGlzdDIsIHR5cGUsIHBsYXRmb3JtLCBzdGFuZGFyZCwgZGV2aWNlKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIlRyYW5zbGF0ZVwiOlxuXHRcdFx0XHRjYXNlIFwiRXh0ZXJuYWxcIjpcblx0XHRcdFx0XHRjb25zdCBwbGF5bGlzdDIgPSB7XG5cdFx0XHRcdFx0XHRcIk9QVElPTlwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiVFlQRVwiOiBcIlNVQlRJVExFU1wiLFxuXHRcdFx0XHRcdFx0XHQvL1wiR1JPVVAtSURcIjogcGxheWxpc3Q/Lk9QVElPTj8uW1wiR1JPVVAtSURcIl0sXG5cdFx0XHRcdFx0XHRcdFwiTkFNRVwiOiBwbGF5bGlzdHMyPy5bMF0/Lk9QVElPTj8uTkFNRSA/PyBsYW5ndWFnZXNbMV0udG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdFx0XCJMQU5HVUFHRVwiOiBwbGF5bGlzdHMyPy5bMF0/Lk9QVElPTj8uTEFOR1VBR0UgPz8gbGFuZ3VhZ2VzWzFdLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdC8vXCJVUklcIjogcGxheWxpc3Q/LlVSSSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdG9wdGlvbiA9IHNldE9wdGlvbihwbGF5bGlzdDEsIHBsYXlsaXN0MiwgdHlwZSwgcGxhdGZvcm0sIHN0YW5kYXJkLCBkZXZpY2UpO1xuXHRcdFx0XHRcdG9wdGlvbi5PUFRJT04uVVJJICs9IGAmbGFuZz0ke3BsYXlsaXN0MT8uT1BUSU9OPy5MQU5HVUFHRT8udG9VcHBlckNhc2UoKX1gO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyhvcHRpb24pLmxlbmd0aCAhPT0gMCkge1xuXHRcdFx0XHRpZiAoc3RhbmRhcmQpIG0zdTguc3BsaWNlKGluZGV4MSArIDEsIDAsIG9wdGlvbilcblx0XHRcdFx0ZWxzZSBtM3U4LnNwbGljZShpbmRleDEsIDEsIG9wdGlvbik7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9KTtcblx0Ly8kLmxvZyhg4pyFICR7JC5uYW1lfSwgU2V0IEF0dHJpYnV0ZSBMaXN0YCwgYG0zdTg6ICR7SlNPTi5zdHJpbmdpZnkobTN1OCl9YCwgXCJcIik7XG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgQXR0cmlidXRlIExpc3RgLCBcIlwiKTtcblx0cmV0dXJuIG0zdTg7XG59O1xuXG4vKipcbiAqIFNldCBEdWFsU3VicyBTdWJ0aXRsZSBPcHRpb25zXG4gKiBAYXV0aG9yIFZpcmdpbENseW5lXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhdGZvcm0gLSBwbGF0Zm9ybVxuICogQHBhcmFtIHtBcnJheX0gcGxheWxpc3QxIC0gU3VidGl0bGVzIFBsYXlsaXN0IChMYW5ndWFnZXMgMClcbiAqIEBwYXJhbSB7QXJyYXl9IHBsYXlsaXN0MiAtIFN1YnRpdGxlcyBQbGF5bGlzdCAoTGFuZ3VhZ2VzIDEpXG4gKiBAcGFyYW0ge0FycmF5fSBlbmFibGVkVHlwZXMgLSBFbmFibGVkIFR5cGVzXG4gKiBAcGFyYW0ge0FycmF5fSB0cmFuc2xhdGVUeXBlcyAtIFRyYW5zbGF0ZSBUeXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IFN0YW5kYXJkIC0gU3RhbmRhcmRcbiAqIEByZXR1cm4ge1Byb21pc2U8Kj59XG4gKi9cbmZ1bmN0aW9uIHNldE9wdGlvbihwbGF5bGlzdDEgPSB7fSwgcGxheWxpc3QyID0ge30sIHR5cGUgPSBcIlwiLCBwbGF0Zm9ybSA9IFwiXCIsIHN0YW5kYXJkID0gdHJ1ZSwgZGV2aWNlID0gXCJpUGhvbmVcIikge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgU2V0IER1YWxTdWJzIFN1YnRpdGxlIE9wdGlvbiwgdHlwZTogJHt0eXBlfSwgc3RhbmRhcmQ6ICR7c3RhbmRhcmR9LCBkZXZpY2U6ICR7ZGV2aWNlfWAsIFwiXCIpO1xuXHRjb25zdCBOQU1FMSA9IHBsYXlsaXN0MT8uT1BUSU9OPy5OQU1FLnRyaW0oKSwgTkFNRTIgPSBwbGF5bGlzdDI/Lk9QVElPTj8uTkFNRS50cmltKCk7XG5cdGNvbnN0IExBTkdVQUdFMSA9IHBsYXlsaXN0MT8uT1BUSU9OPy5MQU5HVUFHRS50cmltKCksIExBTkdVQUdFMiA9IHBsYXlsaXN0Mj8uT1BUSU9OPy5MQU5HVUFHRS50cmltKCk7XG5cdC8vIOWkjeWItuatpOivreiogOmAiemhuVxuXHRsZXQgbmV3T3B0aW9uID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwbGF5bGlzdDEpKTtcblx0Ly8g5L+u5pS55ZCN56ewXG5cdHN3aXRjaCAodHlwZSkge1xuXHRcdGNhc2UgXCJPZmZpY2lhbFwiOlxuXHRcdFx0bmV3T3B0aW9uLk9QVElPTi5OQU1FID0gYOWumOaWueWtl+W5lSAoJHtOQU1FMX0vJHtOQU1FMn0pYDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJUcmFuc2xhdGVcIjpcblx0XHRcdG5ld09wdGlvbi5PUFRJT04uTkFNRSA9IGDnv7vor5HlrZfluZUgKCR7TkFNRTF9LyR7TkFNRTJ9KWA7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiRXh0ZXJuYWxcIjpcblx0XHRcdG5ld09wdGlvbi5PUFRJT04uTkFNRSA9IGDlpJbmjILlrZfluZUgKCR7TkFNRTF9KWA7XG5cdFx0XHRicmVhaztcblx0fTtcblx0Ly8g5L+u5pS56K+t6KiA5Luj56CBXG5cdHN3aXRjaCAocGxhdGZvcm0pIHtcblx0XHRjYXNlIFwiQXBwbGVcIjogLy8gQVZLaXQg6K+t6KiA5YiX6KGo5ZCN56ew5pi+56S65Li6TEFOR1VBR0XlrZfnrKbkuLIg6Ieq5Yqo5pig5bCETEFOR1VBR0XkuLrmnKzlnLDor63oqIBOQU1FIOS4jeaMiUxBTkdVQUdF5Yy65YiG6K+t6KiAXG5cdFx0Y2FzZSBcIk1HTStcIjogLy8gQVZLaXQg6K+t6KiA5YiX6KGo5ZCN56ew5pi+56S65Li6TEFOR1VBR0XlrZfnrKbkuLIg6Ieq5Yqo5pig5bCETEFOR1VBR0XkuLrmnKzlnLDor63oqIBOQU1FXG5cdFx0XHRzd2l0Y2ggKGRldmljZSkge1xuXHRcdFx0XHRjYXNlIFwiV2ViXCI6XG5cdFx0XHRcdGNhc2UgXCJNYWNpbnRvc2hcIjpcblx0XHRcdFx0XHRuZXdPcHRpb24uT1BUSU9OLkxBTkdVQUdFID0gTEFOR1VBR0UxO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vbmV3T3B0aW9uLk9QVElPTi5MQU5HVUFHRSA9IGAke05BTUUxfS8ke05BTUUyfSBbJHt0eXBlfV1gO1xuXHRcdFx0XHRcdG5ld09wdGlvbi5PUFRJT04uTEFOR1VBR0UgPSBgJHt0eXBlfSAoJHtMQU5HVUFHRTF9LyR7TEFOR1VBR0UyfSlgO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJEaXNuZXkrXCI6IC8vIEFwcGxlQ29yZU1lZGlhIOivreiogOWIl+ihqOWQjeensOaYvuekuuS4uk5BTUXlrZfnrKbkuLIg6Ieq5Yqo5pig5bCETkFNReS4uuacrOWcsOivreiogE5BTUUg5oyJTEFOR1VBR0XljLrliIbor63oqIBcblx0XHRjYXNlIFwiUHJpbWVWaWRlb1wiOiAvLyBBcHBsZUNvcmVNZWRpYSDor63oqIDliJfooajlkI3np7DmmL7npLrkuLpOQU1F5a2X56ym5LiyIOaMiUxBTkdVQUdF5Yy65YiG6K+t6KiAXG5cdFx0Y2FzZSBcIkh1bHVcIjogLy8gQXBwbGVDb3JlTWVkaWEg6K+t6KiA5YiX6KGo5ZCN56ew5pi+56S65Li6TEFOR1VBR0XlrZfnrKbkuLIg6Ieq5Yqo5pig5bCETEFOR1VBR0XkuLrmnKzlnLDor63oqIBOQU1FIOepuuagvOWIhuWJslxuXHRcdGNhc2UgXCJOZWJ1bGFcIjogIC8vIEFwcGxlQ29yZU1lZGlhIOivreiogOWIl+ihqOWQjeensOaYvuekuuS4ukxBTkdVQUdF5a2X56ym5LiyIOiHquWKqOaYoOWwhExBTkdVQUdF5Li65pys5Zyw6K+t6KiATkFNRVxuXHRcdFx0bmV3T3B0aW9uLk9QVElPTi5MQU5HVUFHRSA9IGAke3R5cGV9ICgke0xBTkdVQUdFMX0vJHtMQU5HVUFHRTJ9KWA7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiTWF4XCI6IC8vIEFwcGxlQ29yZU1lZGlhXG5cdFx0Y2FzZSBcIkhCT01heFwiOiAvLyBBcHBsZUNvcmVNZWRpYVxuXHRcdGNhc2UgXCJWaWtpXCI6XG5cdFx0XHQvL2lmICghc3RhbmRhcmQpIG5ld09wdGlvbi5PUFRJT04uTkFNRSA9IE5BTUUxO1xuXHRcdFx0bmV3T3B0aW9uLk9QVElPTi5MQU5HVUFHRSA9IExBTkdVQUdFMTtcblx0XHRcdC8vaWYgKCFzdGFuZGFyZCkgZGVsZXRlIG5ld09wdGlvbi5PUFRJT05bXCJBU1NPQy1MQU5HVUFHRVwiXTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJQYXJhbW91bnQrXCI6XG5cdFx0Y2FzZSBcIkRpc2NvdmVyeStQaFwiOlxuXHRcdFx0Ly9uZXdPcHRpb24uT1BUSU9OLk5BTUUgPSBgJHtOQU1FMX0gLyAke05BTUUyfSBbJHt0eXBlfV1gO1xuXHRcdFx0bmV3T3B0aW9uLk9QVElPTi5MQU5HVUFHRSA9IGAke3R5cGV9ICgke0xBTkdVQUdFMX0vJHtMQU5HVUFHRTJ9KWA7XG5cdFx0XHQvL25ld09wdGlvbi5PUFRJT05bXCJBU1NPQy1MQU5HVUFHRVwiXSA9IGAke0xBTkdVQUdFMn0gWyR7dHlwZX1dYDtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRuZXdPcHRpb24uT1BUSU9OLkxBTkdVQUdFID0gTEFOR1VBR0UxO1xuXHRcdFx0YnJlYWs7XG5cdH07XG5cdC8vIOWinuWKoC/kv67mlLnnsbvlnovlj4LmlbBcblx0Ly9jb25zdCBzZXBhcmF0b3IgPSAobmV3T3B0aW9uPy5PUFRJT04/LkNIQVJBQ1RFUklTVElDUykgPyBcIixcIiA6IFwiXCI7XG5cdC8vbmV3T3B0aW9uLk9QVElPTi5DSEFSQUNURVJJU1RJQ1MgKz0gYCR7c2VwYXJhdG9yID8/IFwiXCJ9RHVhbFN1YnMuJHt0eXBlfWA7XG5cdC8vIOWinuWKoOWJr+ivreiogFxuXHRuZXdPcHRpb24uT1BUSU9OW1wiQVNTT0MtTEFOR1VBR0VcIl0gPSBMQU5HVUFHRTI7XG5cdC8vIOS/ruaUuemTvuaOpVxuXHRjb25zdCBzeW1ib2wgPSAobmV3T3B0aW9uLk9QVElPTi5VUkkuaW5jbHVkZXMoXCI/XCIpKSA/IFwiJlwiIDogXCI/XCI7XG5cdG5ld09wdGlvbi5PUFRJT04uVVJJICs9IGAke3N5bWJvbH1zdWJ0eXBlPSR7dHlwZX1gO1xuXHQvL2lmICghc3RhbmRhcmQpIG5ld09wdGlvbi5PUFRJT04uVVJJICs9IGAmbGFuZz0ke0xBTkdVQUdFMX1gO1xuXHQvLyDoh6rliqjpgInmi6lcblx0bmV3T3B0aW9uLk9QVElPTi5BVVRPU0VMRUNUID0gXCJZRVNcIjtcblx0Ly8g5YW85a655oCn5L+u5q2jXG5cdGlmICghc3RhbmRhcmQpIG5ld09wdGlvbi5PUFRJT04uREVGQVVMVCA9IFwiWUVTXCI7XG5cdCQubG9nKGDinIUgJHskLm5hbWV9LCBTZXQgRHVhbFN1YnMgU3VidGl0bGUgT3B0aW9uYCwgYG5ld09wdGlvbjogJHtKU09OLnN0cmluZ2lmeShuZXdPcHRpb24pfWAsIFwiXCIpO1xuXHRyZXR1cm4gbmV3T3B0aW9uO1xufTtcblxuLyoqXG4gKiBpcyBTdGFuZGFyZD9cbiAqIERldGVybWluZSB3aGV0aGVyIFN0YW5kYXJkIE1lZGlhIFBsYXllclxuICogQGF1dGhvciBWaXJnaWxDbHluZVxuICogQHBhcmFtIHtTdHJpbmd9IF91cmwgLSBQYXJzZWQgUmVxdWVzdCBVUkxcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJzIC0gUmVxdWVzdCBIZWFkZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhdGZvcm0gLSBTdGVhbWluZyBNZWRpYSBQbGF0Zm9ybVxuICogQHJldHVybiB7UHJvbWlzZTwqPn1cbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZChfdXJsLCBoZWFkZXJzLCBwbGF0Zm9ybSkge1xuXHQkLmxvZyhg4piR77iPICR7JC5uYW1lfSwgaXMgU3RhbmRhcmRgLCBcIlwiKTtcblx0Ly9sZXQgX3VybCA9IFVSSS5wYXJzZSh1cmwpO1xuXHRjb25zdCBVQSA9IChoZWFkZXJzPy5bXCJ1c2VyLWFnZW50XCJdID8/IGhlYWRlcnM/LltcIlVzZXItQWdlbnRcIl0pO1xuXHQkLmxvZyhg8J+apyAkeyQubmFtZX0sIGlzIFN0YW5kYXJkLCBVQTogJHtVQX1gLCBcIlwiKTtcblx0bGV0IHN0YW5kYXJkID0gdHJ1ZTtcblx0bGV0IGRldmljZSA9IFwiaVBob25lXCI7XG5cdGlmIChVQT8uaW5jbHVkZXMoXCJNb3ppbGxhLzUuMFwiKSkgZGV2aWNlID0gXCJXZWJcIjtcblx0ZWxzZSBpZiAoVUE/LmluY2x1ZGVzKFwiaVBob25lXCIpKSBkZXZpY2UgPSBcImlQaG9uZVwiO1xuXHRlbHNlIGlmIChVQT8uaW5jbHVkZXMoXCJpUGFkXCIpKSBkZXZpY2UgPSBcImlQYWRcIjtcblx0ZWxzZSBpZiAoVUE/LmluY2x1ZGVzKFwiTWFjaW50b3NoXCIpKSBkZXZpY2UgPSBcIk1hY2ludG9zaFwiO1xuXHRlbHNlIGlmIChVQT8uaW5jbHVkZXMoXCJBcHBsZVRWXCIpKSBkZXZpY2UgPSBcIkFwcGxlVFZcIjtcblx0ZWxzZSBpZiAoVUE/LmluY2x1ZGVzKFwiQXBwbGUgVFZcIikpIGRldmljZSA9IFwiQXBwbGVUVlwiO1xuXHRzd2l0Y2ggKHBsYXRmb3JtKSB7XG5cdFx0Y2FzZSBcIk1heFwiOlxuXHRcdGNhc2UgXCJIQk9NYXhcIjpcblx0XHRjYXNlIFwiVmlraVwiOlxuXHRcdFx0aWYgKFVBPy5pbmNsdWRlcyhcIk1vemlsbGEvNS4wXCIpKSBzdGFuZGFyZCA9IGZhbHNlO1xuXHRcdFx0ZWxzZSBpZiAoVUE/LmluY2x1ZGVzKFwiaVBob25lXCIpKSBzdGFuZGFyZCA9IGZhbHNlO1xuXHRcdFx0ZWxzZSBpZiAoVUE/LmluY2x1ZGVzKFwiaVBhZFwiKSkgc3RhbmRhcmQgPSBmYWxzZTtcblx0XHRcdGVsc2UgaWYgKFVBPy5pbmNsdWRlcyhcIk1hY2ludG9zaFwiKSkgc3RhbmRhcmQgPSBmYWxzZTtcblx0XHRcdGVsc2UgaWYgKGhlYWRlcnM/LltcIngtaGJvLWRldmljZS1uYW1lXCJdPy5pbmNsdWRlcyhcImlvc1wiKSkgc3RhbmRhcmQgPSBmYWxzZSwgZGV2aWNlID0gXCJpUGhvbmVcIjtcblx0XHRcdGVsc2UgaWYgKF91cmw/LnF1ZXJ5Py5bXCJkZXZpY2UtY29kZVwiXSA9PT0gXCJpcGhvbmVcIikgc3RhbmRhcmQgPSBmYWxzZSwgZGV2aWNlID0gXCJpUGhvbmVcIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJQZWFjb2NrVFZcIjpcblx0XHRcdGlmIChVQT8uaW5jbHVkZXMoXCJNb3ppbGxhLzUuMFwiKSkgc3RhbmRhcmQgPSBmYWxzZTtcblx0XHRcdGVsc2UgaWYgKFVBPy5pbmNsdWRlcyhcImlQaG9uZVwiKSkgc3RhbmRhcmQgPSBmYWxzZTtcblx0XHRcdGVsc2UgaWYgKFVBPy5pbmNsdWRlcyhcImlQYWRcIikpIHN0YW5kYXJkID0gZmFsc2U7XG5cdFx0XHRlbHNlIGlmIChVQT8uaW5jbHVkZXMoXCJNYWNpbnRvc2hcIikpIHN0YW5kYXJkID0gZmFsc2U7XG5cdFx0XHRlbHNlIGlmIChVQT8uaW5jbHVkZXMoXCJQZWFjb2NrTW9iaWxlXCIpKSBzdGFuZGFyZCA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkZ1Ym9UVlwiOlxuXHRcdFx0aWYgKFVBPy5pbmNsdWRlcyhcImlQaG9uZVwiKSkgc3RhbmRhcmQgPSBmYWxzZTtcblx0XHRcdGVsc2UgaWYgKFVBPy5pbmNsdWRlcyhcImlQYWRcIikpIHN0YW5kYXJkID0gZmFsc2U7XG5cdFx0XHRlbHNlIGlmIChVQT8uaW5jbHVkZXMoXCJNYWNpbnRvc2hcIikpIHN0YW5kYXJkID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiVEVEXCI6XG5cdFx0XHRpZiAoVUE/LmluY2x1ZGVzKFwiTW96aWxsYS81LjBcIikpIHN0YW5kYXJkID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0fTtcblx0JC5sb2coYOKchSAkeyQubmFtZX0sIGlzIFN0YW5kYXJkLCBzdGFuZGFyZDogJHtzdGFuZGFyZH0sIGRldmljZTogJHtkZXZpY2V9YCwgXCJcIik7XG5cdHJldHVybiB7c3RhbmRhcmQsIGRldmljZX07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9