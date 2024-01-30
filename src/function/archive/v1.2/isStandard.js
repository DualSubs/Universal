/**
 * is Standard?
 * Determine whether Standard Media Player
 * @author VirgilClyne
 * @param {String} url - Request URL
 * @param {Object} headers - Request Headers
 * @param {String} platform - Steaming Media Platform
 * @return {Promise<*>}
 */
async function isStandard(platform, url, headers) {
	$.log(`⚠ ${$.name}, is Standard`, "");
	let _url = URL.parse(url);
	let standard = true;
	for (const [key, value] of Object.entries(headers)) {
		delete headers[key]
		headers[key.toLowerCase()] = value
	}
	switch (platform) {
		case "HBO_Max":
			if (headers?.["user-agent"]?.includes("Mozilla/5.0")) standard = false;
			else if (headers?.["user-agent"]?.includes("iPhone")) standard = false;
			else if (headers?.["user-agent"]?.includes("iPad")) standard = false;
			else if (headers?.["x-hbo-device-name"]?.includes("ios")) standard = false;
			else if (_url.params["device-code"] === "iphone") standard = false;
			break;
		case "Peacock_TV":
			if (headers?.["user-agent"]?.includes("Mozilla/5.0")) standard = false;
			else if (headers?.["user-agent"]?.includes("iPhone")) standard = false;
			else if (headers?.["user-agent"]?.includes("iPad")) standard = false;
			else if (headers?.["user-agent"]?.includes("PeacockMobile")) standard = false;
			break;
		case "Fubo_TV":
			if (headers?.["user-agent"]?.includes("iPhone")) standard = false;
			else if (headers?.["user-agent"]?.includes("iPad")) standard = false;
			break;
		case "TED":
			if (headers?.["user-agent"]?.includes("Mozilla/5.0")) standard = false;
	}
	$.log(`🎉 ${$.name}, is Standard`, `standard: ${standard}`, "");
	return standard
};
