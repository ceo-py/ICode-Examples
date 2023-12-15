const generateUrl = (url) => {
    url = url.replace("https://github.com/", '');
    const [user, repo, , branch, ...path] = url.split("/");
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path.join('/')}`;
};

export async function checkValidGithubAddress (url) {
    try {
        const response = await fetch(generateUrl(url));
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

