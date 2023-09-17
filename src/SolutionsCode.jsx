import {gitHubApiCall} from "./GitHubGetRequest.jsx";

// eslint-disable-next-line react/prop-types
export function SolutionsCode({output}) {
    if (!output) return

    async function handleNameClick(url) {
        await gitHubApiCall(url)
    }

    return (
        <div>
            {output.map((x) => (
                <div key={x.id}>
                    <h2>
                        <a href="#" onClick={() => handleNameClick(x.url)}>
                            {x.name}
                        </a>
                    </h2>
                    {/*<pre>{x.content}</pre>*/}
                </div>
            ))}
        </div>
    );
}