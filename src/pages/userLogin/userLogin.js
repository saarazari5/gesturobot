import React, { useState, useContext } from "react";
import { Translations } from "../../language-management/Translations.js";
import "./userLogin.css";
import { getUsers } from "../../databases/usersAPI.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.js"  // Import AuthContext

function UserLogin() {
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

  const handleGuestUser = () => {
    navigate("/LabelFeedBack");
  }

  const moveToGestureManagement = () => {
    navigate("/GestureManagement");
  };

  const HandleLogin = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters and contain at least one letter and one number"
      );
    } else {
      const usersData = await getUsers();
      const user = usersData.find(
        (u) => u.name === username && u.password === password
      );
      if (user) {
        login(user);  // Save the user in the context and local storage
        moveToGestureManagement();
      } else {
        setErrorMessage("password or username incorrect");
      }
    }
  };

  return (
    <Translations>
      {({ translate }) => (
        <div id="login-container" class="container">
          <form onSubmit={HandleLogin} class="login-form">
            <label id="loginTitle">GestuRobot</label>
            <div>
              <label htmlFor="username-input">{translate("Username")}</label>
              <input
                id="username-input"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password-input">{translate("Password")}</label>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {errorMessage && <div class="error-message">{errorMessage}</div>}
            <div>
              <button type="submit">{"Login"}</button>
            </div>
            <div>
              <button onClick={handleGuestUser} id="btn-guest">{"sign in as guest"}</button>
            </div>
          </form>
        </div>
      )}
    </Translations>
  );
}

export default UserLogin;
