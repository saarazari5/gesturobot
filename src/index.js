import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./language-management/LanguageContext.js";
import { AuthProvider } from "./pages/userLogin/AuthContext"; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap with AuthProvider */}
      <LanguageProvider> {/* Then wrap with LanguageProvider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
