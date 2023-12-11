const { Octokit } = require("@octokit/rest");
const dotenv = require('dotenv');
const path = require('path');


const pathToEnvFile = path.resolve(__dirname, '../../.env');
dotenv.config({ path: pathToEnvFile });

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN },);

const generateUrl = (url) => {
    const [user, repo, , , ...address] = url.split('/')
    return `/repos/${user}/${repo}/contents/${address.join('/')}`
}

const getCodeContent = async (url) => {

    try {
        const response = await octokit.request(`GET ${generateUrl(url)}1`)
        return atob(response.data.content)
    } catch (e) { return e }
}

module.exports = { getCodeContent };

