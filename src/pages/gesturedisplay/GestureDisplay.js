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
  // const [selectedSubjects, setSelectedSubjects] = useState([]);
  // const [selectedSubject, setSelectedSubject] = useState('');
  let navigate = useNavigate();


  const handleGestureChange = (e) => {
    setSelectedGesture(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  // const handleSubjectsChange = (e) => {
  //   const value = e.target.value;
  //   setSelectedSubjects((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((subject) => subject !== value)
  //       : [...prev, value]
  //   );
  // };

  // const handleSubjectChange = (e) => {
  //   setSelectedSubject(e.target.value);
  // };

  const handleEditGesture = (gesture) => {
    setGestureID(gesture.id); // Set the gesture ID for the gesture being edited
    navigate("/VideoWindow", {
      state: { gestureId: gesture }, // Navigate and pass gesture data
    });
  };

  const handleClick = () => {
    navigate("/videoWindow");
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
          // handleSubjectsChange={handleSubjectsChange}
          // selectedSubjects={selectedSubjects}
          // handleSubjectChange={handleSubjectChange}
          // selectedSubject={selectedSubject}
          />

          <GestureSection emotion={selectedGesture} group={selectedGroup} setGestureID={setGestureID} />

          {/* Container for checkbox and add icon */}
          <div className="actions-container">
            {/* Checkbox */}
            <Tooltip title={translate("Add New Gesture")} aria-label="add">
              <Fab aria-label="add" onClick={handleClick}>
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
