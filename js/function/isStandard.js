// Determine whether Standard Media Player
async function isStandard(platform, url, headers) {
    $.log(`⚠ ${$.name}, is Standard`, "");
    let standard = true;
    if (platform == "HBO_Max") {
		if (headers?.["User-Agent"]?.includes("Mozilla/5.0")) standard = false;
		else if (headers?.["User-Agent"]?.includes("iPhone")) standard = false;
        else if (headers?.["X-Hbo-Device-Name"]?.includes("ios")) standard = false;
        else if (url?.includes("device-code=iphone")) standard = false;
    }
    $.log(`🎉 ${$.name}, is Standard`, `standard: ${standard}`, "");
    return standard
};
