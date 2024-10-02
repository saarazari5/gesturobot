import "./gestureManagement.css";
import { Translations } from "../../language-management/Translations";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";


function GestureManagement({setGestureID}) {
  let navigate = useNavigate();

  const moveToViewGestures = () => {
    navigate("/GestureDisplay");
  };

  const moveToExport = () => {
    setGestureID(0)
    navigate("/exportGestures");
  };
  return (
    <Translations>
      {({ translate }) => (
        <div>
          <div className="container">
            <div className="card1" onClick={moveToViewGestures}>
              <div className="face face1">
                <div className="face face2">
                  <h2>{translate("Gesture Management")}</h2>
                </div>
              </div>
            </div>
            <div className="card1" onClick={moveToExport}>
              <div className="face face1">
                <div className="face face2">
                  <h2>{translate("Export Gesutres")}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Translations>
  );
}

export default GestureManagement;
