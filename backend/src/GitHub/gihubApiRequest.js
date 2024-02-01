const { Octokit } = require("@octokit/rest");
const dotenv = require('dotenv');
const path = require('path');
const syntaxHighlight = require("../utils/syntaxHighlight");
const reorderKeyToEnd = require("../utils/objectKeyMoveToLastPos");


const pathToEnvFile = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: pathToEnvFile });
const CORRECT_FILE_TYPES = ['py', 'cpp', 'css', 'html', 'js', 'jsx', 'cs', 'java'];

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
},);

const generateUrl = (url) => {
    const [user, repo, , , ...address] = url.split('/')
    return `/repos/${user}/${repo}/contents/${address.join('/')}`
}

const getCodeContent = async (url) => {
    try {
        const response = await octokit.request(`GET ${generateUrl(url)}`)
        let decodedContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
        const fileExtension = url.split("/").slice(-1)[0].split(".")[1]
        if (decodedContent.includes('using System') && fileExtension === 'cs') {
            decodedContent = decodedContent.slice(decodedContent.indexOf('using System'))
        }
        
        return syntaxHighlight(decodedContent, fileExtension)
    } catch (e) {
        console.error('getCodeContent Error:\n', e.message);
        return e
    }
}

const correctFileTypes = () => {
    return CORRECT_FILE_TYPES;
}

const generateMultiFileDirectoryProject = async (url, data = {}) => {
    try {
        const response = await octokit.request(`GET ${generateUrl(url)}`);

        for (const x of response.data) {
            if (x.type === 'dir') {
                data[x.name] = await generateMultiFileDirectoryProject(
                    x.html_url.replace(process.env.URL_ADDRESS, ''),
                    {}
                );
            } else if (x.type === 'file' && correctFileTypes().includes(x.name.split('.')[1])) {
                if (!data?.files) data.files = [];
                data.files.push({ fileName: x.name, filePath: x.html_url.replace(process.env.URL_ADDRESS, '') });
            }
        }

        return JSON.stringify(reorderKeyToEnd(data, 'files'));
    } catch (e) {
        console.error('generateMultiFileDirectoryProject Error:\n', e.message);
        return e;
    }
};

module.exports = { getCodeContent, generateMultiFileDirectoryProject };
