import {useEffect, useState} from "react";
import ListAllUsers from "../../api/user/ListAllUsers.jsx";
import DeleteUser from "../../api/user/DeleteUser.jsx";


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useLoadUsers(setUsers, setLoading);

    const handleDeleteUser = async (username) => {
        await DeleteUser(username)
        setUsers(users.filter(x => x.username !== username))
    }


    return (
        <div>
            <h2>User List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.username}>
                            Username - {user.username} @@ Password {user.password}
                            <br/>
                            <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;

function useLoadUsers(setUsers, setLoading) {
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ListAllUsers();
                console.log('loading')
                if (response) {
                    setUsers(response);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
}
