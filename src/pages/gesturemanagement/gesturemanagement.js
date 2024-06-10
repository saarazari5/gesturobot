import "./gestureManagement.css";
import { Translations } from "../../language-management/Translations";
import { useNavigate } from "react-router-dom";

function GestureManagement({setGestureID}) {
  let navigate = useNavigate();

  const moveToViewGestures = () => {
    navigate("/GestureDisplay");
  };

  const moveToMovmentLibrary = () => {
    setGestureID(0)
    navigate("/createNewExperiment");
  };
  return (
    <Translations>
      {({ translate }) => (
        <div>
          <div class="container">
            <div class="card1" onClick={moveToViewGestures}>
              <div class="face face1">
                <div class="face face2">
                  <h2>{translate("Gesture Management")}</h2>
                </div>
              </div>
            </div>
            <div class="card1" onClick={moveToMovmentLibrary}>
              <div class="face face1">
                <div class="face face2">
                  <h2>{translate("Experiment Management")}</h2>
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
