import {Octokit} from "@octokit/core";


const octokit = new Octokit({
    auth: import.meta.env.VITE_REACT_API_KEY_GIT_HUB,
});



export async function gitGetApi(search) {
    const getAPICall = async (URL) => {
        return await octokit.request(`GET ${URL}`)
    }
    const repos = await getAPICall("/repos/ceo-py/softuni/contents/Python%20Basics/Conditional%20Statements%20-%20Exercise?ref=main")
    for (const x of repos.data) {
        const output = await getAPICall(x.url)
        if (!output.data.name.includes(search.trim())) continue
        return {content: atob(output.data.content),
                name: output.data.name}
    }
}