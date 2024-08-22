import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.css';
import ShakingField from "../InputBar/ShakingField.js";
import InputBar from '../InputBar/InputBar.js';
import { Translations } from "../../../language-management/Translations.js";
import { getUsers } from "../../../databases/usersAPI.js";
import { AuthContext } from "../AuthContext.js"  // Import AuthContext

function LoginForm() {
  let navigate = useNavigate();
  const { login } = useContext(AuthContext);  // Use the login function from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleGuestUser = (event) => {
    event.preventDefault();
    navigate("/LabelFeedBack");
  };

  const moveToGestureManagement = () => {
    navigate("/GestureManagement");
  };

  const HandleLogin = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!password && !username){
      setErrorMessage(
        "Insert username and password."
      );
      ShakingField('username');
      ShakingField('password');
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters and contain at least one letter and one number"
      );
      ShakingField('password');
    } else {
      const usersData = await getUsers();
      const user = usersData.find(
        (u) => u.name === username && u.password === password
      );
      if (user) {
        login(user);  // Save the user in the context and local storage
        moveToGestureManagement();
      } else {
        setErrorMessage("Password or username incorrect");
        ShakingField('username');
        ShakingField('password');
      }
    }
  };

  return (
    <form id="login-form" onSubmit={HandleLogin}>
      {/* Username */}
      <InputBar
        id="username"
        iconId='login-username-icon'
        iconClass='bi bi-person-circle'
        infoId='username-info'
        placeholder='Username'
        inputName='username'
        onChange={handleUsernameChange}
        value={username}
      />
      {/* Password */}
      <InputBar
        id="password"
        iconId='login-password-icon'
        iconClass='bi bi-lock-fill'
        infoId='password-info'
        placeholder='Password'
        inputName='password'
        type='password'
        onChange={handlePasswordChange}
        value={password}
      />
      <b></b>
      {/* Error Message Container */}
      <div id="error-container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <button type="submit" className="btn btn-primary" id="login-btn">Login</button>
      <b></b>
      <div className="center-container">
        <p className="links" style={{fontSize: 'medium' }}>
          <a href="#" onClick={handleGuestUser}>Continue as a guest</a>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
