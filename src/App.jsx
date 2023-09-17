import {Route, Routes} from 'react-router-dom'
import {TaskSearch} from "./pages/Task/TaskSearch.jsx";
import {TaskDetails} from "./pages/Task/TaskDetails.jsx";
import {useState} from "react";

function App() {
    const [selectedUrl, setSelectedUrl] = useState(null);

    return (
        <>
            <TaskSearch setSelectedUrl={setSelectedUrl}/>
            <Routes>
                <Route path="/" element={<h3>Results</h3>}/>
                <Route path="/details"
                       element={<TaskDetails selectedUrl={selectedUrl} />}
                />
            </Routes>
        </>
    )
}

export default App