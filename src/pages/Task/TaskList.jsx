import {Link} from "react-router-dom";


// eslint-disable-next-line react/prop-types
export function TaskList({output, setSelectedUrl}) {

    if (!output) return


    return (
        <div>
            {output.map((x) => (
                <div key={x.id}>
                    <h2 >
                        <Link to={`/details`} onClick={() => setSelectedUrl(x.url)}>
                            {x.name}
                        </Link>
                    </h2>
                    {/*<pre>{x.content}</pre>*/}
                </div>
            ))}
        </div>
    );
}