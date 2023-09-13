// eslint-disable-next-line react/prop-types
export function SolutionsCode({output}) {
    if (!output) return
    return (<div>
        {/* eslint-disable-next-line react/prop-types */}
        <p>{output.name}</p>
        <pre>
            {/* eslint-disable-next-line react/prop-types */}
                    {output.content}
                </pre>
    </div>)
}