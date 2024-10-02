import { createContext, useContext, useState } from "react";

/**
 * LanguageContext provides a way to store and access the application's language state
 * across different components, without passing props manually through each level.
 */
export const LanguageContext = createContext();

/**
 * LanguageProvider component manages the application's language state.
 * It provides the current language and a function to change the language to its children components.
 * 
 * @param {object} children - The child components that need access to the language context.
 * 
 * @returns {JSX.Element} A provider that wraps the application, making `language` and `changeLanguage`
 *                        available to all child components via the `LanguageContext`.
 */
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");  // Default language is set to English ("en")

  /**
   * changeLanguage function updates the current language of the application.
   * 
   * @param {string} lang - The new language to set, e.g., "en" for English or "he" for Hebrew.
   */
  const changeLanguage = (lang) => {
    setLanguage(lang);  // Update the state with the new language
  };

  /**
   * LanguageContext.Provider wraps the child components and provides the current language
   * and the function to change the language to any subscribed component.
   */
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}  {/* Render the child components that can consume the language context */}
    </LanguageContext.Provider>
  );
};

/**
 * useLanguage is a custom hook that allows components to consume the `language` state
 * and `changeLanguage` function from the LanguageContext.
 * 
 * This hook ensures that it is used within a `LanguageProvider`. If not, it throws an error.
 * 
 * @returns {object} The current language and the function to change the language.
 * 
 * @throws {Error} Throws an error if used outside of a `LanguageProvider`.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);  // Access the LanguageContext

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");  // Ensure it's used within LanguageProvider
  }

  return context;  // Return the context value: { language, changeLanguage }
};
