/**
 * is Standard?
 * Determine whether Standard Media Player
 * @author VirgilClyne
 * @param {String} platform - platform
 * @param {String} url - url
 * @param {Object} headers - headers
 * @return {Promise<*>}
 */
async function isStandard(platform, url, headers) {
	$.log(`⚠ ${$.name}, is Standard`, "");
	let _url = URL.parse(url);
	let standard = true;
	if (platform == "HBO_Max") {
		if (headers?.["User-Agent"]?.includes("Mozilla/5.0")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPad")) standard = false;
		else if (headers?.["X-Hbo-Device-Name"]?.includes("ios")) standard = false;
		else if (_url.params["device-code"] === "iphone") standard = false;
	} else if (platform == "Peacock_TV") {
		if (headers?.["User-Agent"]?.includes("Mozilla/5.0")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPad")) standard = false;
		else if (headers?.["User-Agent"]?.includes("PeacockMobile")) standard = false;
	} else if (platform == "Fubo_TV") {
		if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPad")) standard = false;
	}
	$.log(`🎉 ${$.name}, is Standard`, `standard: ${standard}`, "");
	return standard
};
