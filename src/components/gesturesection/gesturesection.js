  import React, { useState, useEffect, useContext } from 'react';
  import './gesturesection.css';
  import { getAllGestures, deleteGesture } from '../../databases/gesturesAPI';
  import LoopOfMovements from '../loopOfMovements/loopOfMovements';
  import { LanguageContext } from '../../language-management/LanguageContext';
  import { useNavigate } from "react-router-dom";
  import { Tooltip, IconButton} from '@mui/material';


  function GestureSection(props) {
    let navigate = useNavigate();
    const language = useContext(LanguageContext);
    const [gestures, setGestures] = useState([]);
    const [hoveredGestureId, setHoveredGestureId] = useState(null);
    const [showTooltip, setShowTooltip] = useState(null); // State to handle tooltip visibility
    
    useEffect(() => {
      const fetchGestures = async () => {
        const data = await getAllGestures();
        console.log(data);
        setGestures(data);
      };

      fetchGestures();
    }, []);

    const handleDeleteGesture = async (gestureId) => {
      await deleteGesture(gestureId);
      setGestures(gestures.filter(gesture => gesture.id !== gestureId));
    };
    
    const handleEditGesture = (gesture) => {
      props.setGestureID(gesture.id);
      navigate("/VideoWindow", {
        state: { gestureId: gesture },
      });
    };

    const filteredGestures = gestures.filter(gesture => {
      const temp = language.language === 'en' ? gesture.realLabel[0] : gesture.realLabel[1];
      return (
        temp.toLowerCase().includes(props.emotion.toLowerCase()) &&
        gesture.group === props.group
      );
    });

  return (
    <div className="row">
      {filteredGestures.map(gesture => (
        <div
          className="col-lg-4 col-sm-6 col-12 mb-4"
          key={gesture.id}
          onMouseEnter={() => setHoveredGestureId(gesture.id)}
          onMouseLeave={() => setHoveredGestureId(null)}
        >
          <div className="card-video">
            <div className="icon-container">
              <div className="delete-gesture" onClick={() => handleDeleteGesture(gesture.id)}>
                &#10006; {/* Delete icon */}
              </div>
              <div className="edit-gesture" onClick={() => handleEditGesture(gesture)}>
                {String.fromCharCode(9998)} {/* Edit icon */}
              </div>

              <Tooltip title={"id: " + gesture.id + ", " + "label: " + gesture.realLabel[0]} aria-label="info">
              <div className="info-gesture"   
                onMouseEnter={() => setShowTooltip(gesture.id)}
                onMouseLeave={() => setShowTooltip(null)}>
                {String.fromCharCode(9432)} {/* Edit icon */}
              </div>
            </Tooltip>

            </div>
            <LoopOfMovements ids={gesture.movements} />
            <div className="card-title-overlay">
              <h5 className="card-title">{gesture.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

  export default GestureSection;
