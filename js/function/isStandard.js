// Determine whether Standard Media Player
async function isStandard(platform, url, headers) {
    $.log(`⚠ ${$.name}, is Standard`, "");
    let standard = (platform == "Prime_Video" && headers?.["User-Agent"].includes("Mozilla/5.0")) ? false
        : (platform == "HBO_Max" && headers?.["User-Agent"].includes("Mozilla/5.0")) ? false
            : true;
    $.log(`🎉 ${$.name}, is Standard`, `standard: ${standard}`, "");
    return standard
};
