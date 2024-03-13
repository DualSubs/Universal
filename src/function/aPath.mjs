// Get Absolute Path
export default function aPath(aURL = "", URL = "") { return (/^https?:\/\//i.test(URL)) ? URL : aURL.match(/^(https?:\/\/(?:[^?]+)\/)/i)?.[0] + URL };
