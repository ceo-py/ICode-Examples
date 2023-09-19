import {useState} from "react";
import CreateUser from "../../api/user/CreateUser.jsx";



function UserCreate() {
  // State to manage form inputs
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateUser(userData)
    console.log('User Data:', userData);
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default UserCreate