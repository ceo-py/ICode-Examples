import {Route, Routes, Link} from 'react-router-dom'
import {TaskSearch} from "./pages/Task/TaskSearch.jsx";
import {TaskDetails} from "./pages/Task/TaskDetails.jsx";
import {useState} from "react";
import UserCreate from "./pages/User/UserCreate.jsx";
import UserList from "./pages/User/UserList.jsx";
import UserLog from "./pages/User/UserLog.jsx";

function App() {
    const [selectedUrl, setSelectedUrl] = useState(null);

    return (<>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/users">List All Users</Link>
                    </li>
                </ul>
            </nav>
            <TaskSearch setSelectedUrl={setSelectedUrl}/>
            <Routes>
                <Route path="/" element={<h3>Results</h3>}/>
                <Route path="/details"
                       element={<TaskDetails selectedUrl={selectedUrl}/>}
                />
                <Route path="/register" element={<UserCreate/>}/>
                <Route path="/login" element={<UserLog/>}/>
                <Route path="/users" element={<UserList/>}/>
            </Routes>
        </>)
}

export default App