import {Octokit} from "@octokit/core";
import {formatTitle} from "./utils/formatTitle.jsx";


const octokit = new Octokit({
    auth: import.meta.env.VITE_REACT_API_KEY_GIT_HUB,
});


function repoIdentifier(language) {

    const repo = {
        python: '/main/',
        js: '/master/',
        'html_css': '/main/',
        mssql: '/main/'
    }
    return repo[language]
}

async function db(language, topic) {
    const url = `http://127.0.0.1:3000/api/contests?language=${language}&contest=${topic}`
    const options = {
        method: 'GET'
    }
    const output = await fetch(url,
        options)
    return await output.json()
}

function convertUrl(url, language) {
    return url.split(repoIdentifier(language))[1].split('/').slice(0, -1).join('/');

}

async function getAPICall(URL) {
    return await octokit.request(`GET ${URL}`)
}

async function gitHubApiCall() {
    try {
        const url = convertUrl(data[0]['task url'])
        const generatedUrl = `${import.meta.env.VITE_REACT_PY_URL}${url}?ref=main`
        const tasks = await getAPICall(generatedUrl)

        for (const x of tasks.data) {
            const output = await getAPICall(x.url)

            // if (output.data.name.includes('.zip')) continue
            // if (output.data.name.includes('__')) continue

            console.log(output)
            result.push({
                content: atob(output.data.content),
                name: formatTitle(output.data.name),
            })
        }
        return result

    } catch (e) {
        console.error(`Error getting property`, e);
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
            content: x['task url'],
            name: formatTitle(x['task name']),
        })
    })
    return result

}