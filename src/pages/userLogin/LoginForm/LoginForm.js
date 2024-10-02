/**
 * LoginForm component manages the login functionality of the application.
 * 
 * This component uses:
 * - `useState` to manage form inputs and error messages.
 * - `useContext` to handle user authentication through `AuthContext`.
 * - React Router's `useNavigate` for programmatic navigation upon successful login.
 * - Custom components such as `ShakingField` and `InputBar` to handle form inputs.
 * - `Translations` component to handle multilingual translations for the login form.
 */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";  // React Router hooks for navigation
import './LoginForm.css';  // Custom CSS for styling the login form
import ShakingField from "../InputBar/ShakingField.js";  // A component to shake input fields on validation failure
import InputBar from '../InputBar/InputBar.js';  // Custom input component used for form fields
import { Translations } from "../../../language-management/Translations.js";  // A component for translating strings
import { getUsers } from "../../../databases/usersAPI.js";  // API to fetch user data
import { AuthContext } from "../AuthContext.js";  // Context for managing authentication state

function LoginForm() {
  let navigate = useNavigate();  // React Router hook to programmatically navigate between routes
  const { login } = useContext(AuthContext);  // Access the login function from AuthContext

  // State variables for form inputs and error message
  const [username, setUsername] = useState("");  // State for the username input field
  const [password, setPassword] = useState("");  // State for the password input field
  const [errorMessage, setErrorMessage] = useState("");  // State for handling error messages

  // Handle input change for username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle input change for password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle guest login and redirect to the label feedback page
  const handleGuestUser = (event) => {
    event.preventDefault();
    navigate("/LabelFeedBack");
  };

  // Navigate to the Gesture Management page upon successful login
  const moveToGestureManagement = () => {
    navigate("/GestureManagement");
  };

  /**
   * HandleLogin function is triggered on form submission.
   * - Validates the username and password fields.
   * - Checks if the password meets a regex pattern for at least 8 characters, 
   *   including one letter and one number.
   * - If the inputs are valid, fetches the users data, checks if the entered
   *   username and password match, and performs login if the user is found.
   * 
   * @param {object} event - The form submit event.
   */
  const HandleLogin = async (event) => {
    event.preventDefault();  // Prevent default form submission behavior

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;  // Regex to validate password

    // Validation: Check if both username and password are provided
    if (!password && !username) {
      setErrorMessage("Insert username and password");
      ShakingField('username');  // Shake the username field to indicate error
      ShakingField('password');  // Shake the password field to indicate error
    } 
    // Validation: Check if password meets the regex pattern
    else if (!passwordRegex.test(password)) {
      setErrorMessage("Password must be at least 8 characters and contain at least one letter and one number");
      ShakingField('password');  // Shake the password field to indicate error
    } 
    // Proceed with login if inputs are valid
    else {
      const usersData = await getUsers();  // Fetch the list of users from the database
      const user = usersData.find(
        (u) => u.name === username && u.password === password  // Find the user matching the provided credentials
      );

      // If user is found, perform login and navigate to Gesture Management page
      if (user) {
        login(user);  // Trigger the login function from AuthContext
        moveToGestureManagement();  // Redirect to Gesture Management page
      } 
      // If credentials are incorrect, show error message
      else {
        setErrorMessage("Password or username incorrect");
        ShakingField('username');  // Shake the username field to indicate error
        ShakingField('password');  // Shake the password field to indicate error
      }
    }
  };

  return (
    /**
     * Translations component is used to wrap the form and provide translation
     * for strings like 'Username', 'Password', and error messages.
     */
    <Translations>
      {({ translate }) => (
        <form id="login-form" onSubmit={HandleLogin}>
          {/* Username Input Field */}
          <InputBar
            id="username"
            iconId='login-username-icon'
            iconClass='bi bi-person-circle'
            infoId='username-info'
            placeholder={translate('Username')}  // Translated label for the Username field
            inputName='username'
            onChange={handleUsernameChange}  // Handle username input change
            value={username}  // Set the value of the username field
          />

          {/* Password Input Field */}
          <InputBar
            id="password"
            iconId='login-password-icon'
            iconClass='bi bi-lock-fill'
            infoId='password-info'
            placeholder={translate('Password')}  // Translated label for the Password field
            inputName='password'
            type='password'  // Set the input type to password
            onChange={handlePasswordChange}  // Handle password input change
            value={password}  // Set the value of the password field
          />

          {/* Error Message Container */}
          <div id="error-container">
            {errorMessage && <div className="error-message">{translate(errorMessage)}</div>}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary" id="login-btn">
            {translate('Login')}
          </button>
        </form>
      )}
    </Translations>
  );
}

export default LoginForm;
