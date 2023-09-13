import {useState} from "react";
import {gitGetApi} from "./GitHubGetRequest.jsx";
import {SolutionsCode} from "./SolutionsCode.jsx";


function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [output, setOutput] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async () => {
        console.log(searchTerm);
        setOutput(await gitGetApi(searchTerm))
    };

    return (
        <>
            <div className="App">
                <h1>Search App</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearchSubmit}>Search</button>
            </div>
            <SolutionsCode output={output}/>
        </>
    )
}


export default App
