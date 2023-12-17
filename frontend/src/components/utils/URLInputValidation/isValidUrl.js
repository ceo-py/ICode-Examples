const URLBase = {
    "youtube": ["https://www.youtube.com/", "https://youtu.be/"],
    "github": ["https://github.com/"],
    "linkedin": ["https://www.linkedin.com/"]

}


export function isValidUrl(url, urlToCheck) {   
    return URLBase[url].some(x => urlToCheck.includes(x));
};