// Determine whether Standard Media Player
async function isStandard(platform, url, headers) {
    $.log(`⚠ ${$.name}, is Standard`, "");
    if (platform == "Prime_Video" && headers?.Referer.includes("amazon.com")) return false;
    else if (platform == "HBO_Max") {
        if (headers?.Referer.includes("hbomax.com")) return false;
    } else return true;
};
