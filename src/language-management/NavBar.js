import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from './LanguageContext';
import { useContext } from 'react';
import { AuthContext } from '../pages/userLogin/AuthContext';
import { FiArrowRight } from "react-icons/fi";  // Import the back arrow icon
import './NavBar.css';  // Ensure this path is correct

/**
 * NavBar component handles the application's navigation bar, including:
 * - Back button navigation.
 * - Home button navigation based on the user's authentication state.
 * - Language switching between English and Hebrew.
 * - Logout functionality.
 * 
 * The component uses React Router's `useLocation` and `useNavigate` hooks to determine the current route
 * and handle navigation. It also uses the `AuthContext` to manage user authentication status and `useLanguage`
 * to manage language switching.
 * 
 * @param {function} handleGoBack - Function to handle custom back navigation when the back button is clicked.
 * 
 * @returns {JSX.Element} A navigation bar with conditional rendering of home, back, language, and logout buttons.
 */
export const NavBar = ({ handleGoBack }) => {
  const { language, changeLanguage } = useLanguage();  // Access language and language switching function from context
  const { user, logout } = useContext(AuthContext);  // Access user authentication and logout function from AuthContext
  const location = useLocation();  // Get the current route
  const navigate = useNavigate();  // Hook to navigate between routes programmatically

  /**
   * handleLanguageChange changes the current language when the user selects a different language option.
   * 
   * @param {object} e - Event object representing the language button click.
   */
  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);  // Change the application language using the LanguageContext
  };

  /**
   * handleLogout logs out the current user by clearing their session and redirects them to the home page.
   */
  const handleLogout = () => {
    logout();  // Log out the user using AuthContext
    navigate('/');  // Redirect to the home page after logging out
  };

  return (
    <nav id="nav" className="navbar">
      {/* Conditionally render the home button if the user is not on the login or GestureManagement page */}
      {location.pathname !== '/' && location.pathname !== '/GestureManagement' && (
        <Link to={user ? "/GestureManagement" : "/"}>
          <img
            src="/home.png"
            height="30"
            style={{ marginLeft: '25px' }}
            className="d-inline-block align-top"
            alt="Home"
          />
        </Link>
      )}

      {/* Conditionally render the logout button if the user is on the GestureManagement page */}
      {location.pathname === '/GestureManagement' && user && (
        <div className="navbar-brand">
          <img
            src="/logout.png"
            alt="Logout"
            height="30"
            style={{ marginLeft: '5px', cursor: 'pointer' }}
            onClick={handleLogout}  // Trigger logout on click
          />
        </div>
      )}

      {/* Conditionally render the back button if the user is not on the login page */}
      {location.pathname !== '/' && (
        <button onClick={handleGoBack} className="back-button">  {/* Use handleGoBack prop for custom back button logic */}
          <FiArrowRight size={20} /> {/* Back arrow icon */}
        </button>
      )}

      {/* Language switching buttons */}
      <div className="language-buttons">
        <button
          value="en"
          onClick={handleLanguageChange}  // Switch to English when clicked
          disabled={language === 'en'}  // Disable the button if English is already selected
        >
          English
        </button>
        <button
          value="he"
          onClick={handleLanguageChange}  // Switch to Hebrew when clicked
          disabled={language === 'he'}  // Disable the button if Hebrew is already selected
        >
          עברית
        </button>
      </div>
    </nav>
  );
};
