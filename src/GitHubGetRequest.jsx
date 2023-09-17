import {Octokit} from "@octokit/core";
import {formatTitle} from "./utils/formatTitle.jsx";


const octokit = new Octokit({
    auth: import.meta.env.VITE_REACT_API_KEY_GIT_HUB,
});


async function db(language, topic) {
    const url = `${import.meta.env.VITE_REACT_API_URL}language=${language}&contest=${topic}`
    const options = {
        method: 'GET'
    }
    const output = await fetch(url,
        options)
    return await output.json()
}

function convertUrl(url, branch) {
    return url.split(`/${branch}/`)[1].split('/').join('/');

}

function generateRepoAndBranch(url) {
    const output = url.split('/')
    const [repo, branch] = [output[4], output[6]]
    return [repo, branch]
}

async function getAPICall(URL) {
    try {
        return await octokit.request(`GET ${URL}`);
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

export async function gitHubApiCall(url) {
    try {
        const [repo, branch] = generateRepoAndBranch(url)
        console.log(repo)
        console.log(branch)
        console.log(`Initial URL - ${url}`)
        const genUrl = convertUrl(url, branch)

        const generatedUrl = `/repos/ceo-py/${repo}/contents/${genUrl}`

        console.log(`Generated URL - ${generatedUrl}`)
        const tasks = await getAPICall(generatedUrl)

        if (!tasks || tasks.status !== 200) return

        console.log(tasks);
        console.log(`Full content\n${atob(tasks.data.content)}`);
        return {content: atob(tasks.data.content),
                name: formatTitle(tasks.data.name)};

    } catch (e) {
        console.error(`Error: `, e.message);
        throw e;
    }
}


export async function gitGetApi({language, module, topic}) {

    const result = []
    console.log(`language is ${language}`)
    const data = await db(language, topic)
    console.log(`Topic : - ${topic}`)
    console.log(`Main: URL Definer`)
    console.log(data)

    data.forEach(x => {
        result.push({
            url: x['task url'],
            name: formatTitle(x['task name']),
            id: crypto.randomUUID()
        })
    })
    return result

}