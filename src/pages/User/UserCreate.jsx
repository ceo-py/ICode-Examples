// import {useState} from "react";
// import CreateUser from "../../api/user/CreateUser.jsx";
//
//
//
// function UserCreate() {
//   // State to manage form inputs
//   const [userData, setUserData] = useState({
//     username: '',
//     password: '',
//   });
//
//   // Function to handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };
//
//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await CreateUser(userData)
//     console.log('User Data:', userData);
//   };
//
//   return (
//     <div>
//       <h2>Register User</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={userData.username}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={userData.password}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// }
//
// export default UserCreate


import CreateUser from '../../api/user/CreateUser.jsx';
import {useState} from "react";
import {passwordValidation} from "../../utils/passwordValidation.jsx";
import {usernameValidation} from "../../utils/usernameValidation.jsx";

function UserCreate() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });

        setValidationErrors({
            ...validationErrors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform client-side validation
        const {username, password} = userData;
        const newValidationErrors = {};

        const passwordMessage = passwordValidation(password)
        const userMessage = usernameValidation(username)

        if (passwordMessage) newValidationErrors.password = passwordMessage
        if (userMessage) newValidationErrors.username = userMessage

        // If there are validation errors, update the state and prevent submission
        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            return;
        }

        // If no validation errors, submit the data
        await CreateUser(userData);
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
                    <span className="error">{validationErrors.username}</span>
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
                    <span className="error">{validationErrors.password}</span>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default UserCreate;
