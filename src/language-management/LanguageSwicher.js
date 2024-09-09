import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useContext } from 'react';
import { AuthContext } from '../pages/userLogin/AuthContext';
import { FiArrowRight } from "react-icons/fi"; // Import the back arrow icon
import './LanguageSwicher.css'; // Ensure this path is correct

export const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the home page or login page
  };

  // Function to handle going back
  const handleGoBack = () => {
    navigate(-1); // This navigates to the previous page
  };

  return (
    <nav id="nav" className="navbar">
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

      {location.pathname === '/GestureManagement' && user && (
        <div className="navbar-brand">
          <img
            src="/logout.png"
            alt="Logout"
            height="30"
            style={{ marginLeft: '5px', cursor: 'pointer' }}
            onClick={handleLogout}
          />
        </div>
      )}

      {/* Conditionally show the Back button, but not on the login page */}
      {location.pathname !== '/' && (
        <button onClick={handleGoBack} className="back-button">
          <FiArrowRight size={20} /> {/* Back arrow icon */}
        </button>
      )}

      <div className="language-buttons">
        <button
          value="en"
          onClick={handleLanguageChange}
          disabled={language === 'en'}
        >
          English
        </button>
        <button
          value="he"
          onClick={handleLanguageChange}
          disabled={language === 'he'}
        >
          עברית
        </button>
      </div>
    </nav>
  );
};
