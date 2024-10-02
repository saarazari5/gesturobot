import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/userLogin/Login";
import GestureManagement from "./pages/gesturemanagement/gesturemanagement";
import GestureDisplay from "./pages/gesturedisplay/GestureDisplay";
import { NavBar } from "./language-management/NavBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import VideoWindow from "./components/videoWindow/VideoWindow.js";
import ExportGestures from "./pages/exportGestures/exportGestures.js";

function App() {
  const [gestureID, setGestureID] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const backPressed = useRef(false);  // Flag to track custom back button presses


  const handlePopState = (event) => {
    console.log("in back button")
    // Block the browser's back button for specific routes
    if (!backPressed.current &&
        (location.pathname === "/GestureManagement" || 
         location.pathname === "/GestureDisplay" || 
         location.pathname === "/videoWindow")) {
      // Prevent the browser's default back navigation
      window.history.pushState(null, document.title, window.location.href);
    } else if (!backPressed.current) {
      // Navigate normally if back button was not pressed programmatically
      navigate(-1);
    }
    backPressed.current = false;  // Reset after handling
  };


  useEffect(() => {
        window.addEventListener('popstate', handlePopState);
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
   }, []);

  // Custom back button logic for NavBar
  const handleGoBack = () => {
    backPressed.current = true;  // Mark that the custom back button was pressed
    navigate(-1);  // Navigate to the previous route
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div dir="ltr">
        <NavBar handleGoBack={handleGoBack} />  {/* Pass handleGoBack to NavBar */}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/exportGestures/*" element={<ExportGestures id={gestureID} />} />
        <Route path="/GestureManagement" element={
          <PrivateRoute>
            <GestureManagement setGestureID={setGestureID} />
          </PrivateRoute>} 
        />
        <Route path="/GestureDisplay" element={<GestureDisplay setGestureID={setGestureID} />} />
        <Route path="/videoWindow" element={
          <PrivateRoute>
            <VideoWindow setGestureID={setGestureID} />
          </PrivateRoute>} 
        />
      </Routes>
    </DndProvider>
  );
}

export default App;
