import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
import { useState } from 'react';
import { Translations } from "../../language-management/Translations";
import { Tooltip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import EmotionGroupForm from "./EmotionGroupForm";


function GestureDisplay({ setGestureID }) {

  const [selectedGesture, setSelectedGesture] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  let navigate = useNavigate();


  const handleGestureChange = (e) => {
    setSelectedGesture(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };


  const handleClick = () => {
    navigate("/CreateNewGesture");
  };


  return (
    <Translations>
      {({ translate }) => (
        <div>
          <EmotionGroupForm
            translate={translate}
            handleGestureChange={handleGestureChange}
            handleGroupChange={handleGroupChange}
            selectedGroup={selectedGroup}
          />

          <GestureSection emotion={selectedGesture} group={selectedGroup} setGestureID={setGestureID} />

          {/* Container for checkbox and add icon */}
          <div className="actions-container">
            {/* Checkbox */}
            <Tooltip title="Add New Gesture" aria-label="add">
              <Fab color="primary" aria-label="add" onClick={handleClick} >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>
      )}
    </Translations>
  );
}

export default GestureDisplay;
