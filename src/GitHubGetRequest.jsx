import {Octokit} from "@octokit/core";
import {formatTitle} from "./utils/formatTitle.jsx";


const octokit = new Octokit({
    auth: import.meta.env.VITE_REACT_API_KEY_GIT_HUB,
});



export async function gitGetApi({language, module, topic}) {
    const getAPICall = async (URL) => {
        return await octokit.request(`GET ${URL}`)
    }
    const result = []
    const languageModul = !topic.includes('More') ? `${language} ${module}`: 'PB - More Exercises'
    const url = `${import.meta.env.VITE_REACT_PY_URL}${encodeURIComponent(languageModul)}/${encodeURIComponent(topic)}`
    const repos = await getAPICall(url)
    for (const x of repos.data) {
        const output = await getAPICall(x.url)
        result.push({content: atob(output.data.content),
                name: formatTitle(output.data.name)})
    }
    console.log(result)
    return result
}