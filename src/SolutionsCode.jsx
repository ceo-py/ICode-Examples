// eslint-disable-next-line react/prop-types
export function SolutionsCode({output}) {
    if (!output) return
    return (
        <div>
            {output.map((item, index) => (
                <div key={index}>
                    <h2>{item.name}</h2>
                    <pre>{item.content}</pre>
                </div>
            ))}
        </div>
    );
}