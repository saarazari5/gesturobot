import React, { createContext, useState, useEffect } from 'react';

/**
 * AuthContext is a React context that provides authentication-related data and functions 
 * (such as login, logout, and the current user) to components that need access to this information.
 * 
 * The context allows the application to share the user's login state across different components
 * without needing to pass props manually through each level of the component tree.
 */
export const AuthContext = createContext();

/**
 * AuthProvider component manages the authentication state of the application.
 * It stores the current user's information and provides functions to log in and log out.
 * It uses localStorage to persist the user's login state across page reloads.
 * 
 * @param {object} children - The child components that need access to the authentication context.
 * 
 * @returns {JSX.Element} The AuthContext.Provider wrapping the child components, providing the 
 *                        user, login, and logout values.
 */
export const AuthProvider = ({ children }) => {
  // State to store the current user's data
  const [user, setUser] = useState(null);

  /**
   * useEffect runs on the component mount and checks localStorage for saved user data.
   * If user data is found, it sets the user state, keeping the user logged in across page reloads.
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('user');  // Check if user data exists in localStorage
    if (savedUser) {
      setUser(JSON.parse(savedUser));  // Parse and set the saved user data into the state
    }
  }, []);  // Empty dependency array ensures this effect runs only once, on component mount

  /**
   * login function handles logging in the user by:
   * - Storing the user's data in localStorage for persistence.
   * - Updating the `user` state with the provided user data.
   * 
   * @param {object} userData - The user data to store in the state and localStorage.
   */
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));  // Save user data to localStorage
    setUser(userData);  // Update the state with the logged-in user data
  };

  /**
   * logout function handles logging out the user by:
   * - Removing the user data from localStorage.
   * - Resetting the `user` state to `null` to indicate no user is logged in.
   */
  const logout = () => {
    localStorage.removeItem('user');  // Remove user data from localStorage
    setUser(null);  // Clear the user state
  };

  /**
   * AuthContext.Provider: Wraps the application and provides the `user`, `login`, and `logout`
   * values to any child component that subscribes to this context.
   */
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}  {/* Render child components that can consume the AuthContext */}
    </AuthContext.Provider>
  );
};
