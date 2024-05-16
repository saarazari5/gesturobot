import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useContext } from 'react';
import { AuthContext } from '../pages/userLogin/AuthContext';

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
    // Redirect to the root page after logout
    navigate('/');
  };

  return (
    <nav id="nav" className="navbar" style={{ position: '' }}>
      {location.pathname !== '/' && location.pathname !== '/GestureManagement' && (
        <Link to={user ? "/GestureManagement" : "/"}>
          <img
            src="/home.png"
            height="30"
            style={{ marginLeft: '25px' }}
            className="d-inline-block align-top"
            alt=""
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

      <div className="navbar-brand">
        <button
          value="en"
          onClick={handleLanguageChange}
          disabled={language === 'en'}
          style={{ marginRight: '5px' }}
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
