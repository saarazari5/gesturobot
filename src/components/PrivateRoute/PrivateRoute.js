import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../pages/userLogin/AuthContext';

/**
 * PrivateRoute component is used to protect routes that require authentication.
 * It checks if the user is logged in, and if not, it redirects them to the login page ("/").
 * 
 * @param {object} children - The child components or routes that need protection.
 * 
 * @returns {JSX.Element} The child components if the user is authenticated, otherwise redirects to the login page.
 */
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);  // Access the current user from AuthContext

  /**
   * If the user is authenticated, render the children components (protected content).
   * If the user is not authenticated, redirect to the login page ("/").
   */
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
