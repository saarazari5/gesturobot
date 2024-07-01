import React, { useState, useEffect, useContext } from 'react';
import './gesturesection.css';
import { getAllGestures, deleteGesture } from '../../databases/gesturesAPI';
import LoopOfMovements from '../loopOfMovements/loopOfMovements';
import { LanguageContext } from '../../language-management/LanguageContext';
import { useNavigate } from "react-router-dom";

function GestureSection(props) {
  let navigate = useNavigate();
  const language = useContext(LanguageContext);
  const [gestures, setGestures] = useState([]);
  const [hoveredGestureId, setHoveredGestureId] = useState(null);

  useEffect(() => {
    const fetchGestures = async () => {
      const data = await getAllGestures();
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
          <div className="card-gestureSection">
            <div className="card-video">
              <LoopOfMovements ids={gesture.movements} />
              <div className="card-title-overlay">
                <h5 className="card-title">{gesture.name}</h5>
              </div>
            </div>
            <div className="icon-container">
              <div className="delete-gesture" onClick={() => handleDeleteGesture(gesture.id)}>
                &#10006; {/* Delete icon */}
              </div>
              <div className="edit-gesture" onClick={() => handleEditGesture(gesture)}>
                {String.fromCharCode(9998)} {/* Edit icon */}
              </div>
            </div>

            {/* <div className="card-body">
              <p className="card-text">{gesture.creator[0]}</p>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GestureSection;
