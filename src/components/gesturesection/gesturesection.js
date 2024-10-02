import React, { useState, useEffect, useContext } from 'react';
import './gesturesection.css';
import { getAllGestures, deleteGesture } from '../../databases/gesturesAPI';
import LoopOfMovements from '../loopOfMovements/loopOfMovements';
import { LanguageContext } from '../../language-management/LanguageContext';
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from '@mui/material';
import ConfirmationModal from './ConfirmationModal';
import { Translations } from '../../language-management/Translations';

function GestureSection({ emotion, group, subjects, setGestureID, startDate, endDate }) {
  let navigate = useNavigate();
  const language = useContext(LanguageContext);
  const [gestures, setGestures] = useState([]);
  const [hoveredGestureId, setHoveredGestureId] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [gestureToDelete, setGestureToDelete] = useState(null);

  useEffect(() => {
    const fetchGestures = async () => {
      const data = await getAllGestures();
      setGestures(data);
    };

    fetchGestures();
  }, []);

  const filterGesturesByDate = (gestures) => {
    if (!startDate || !endDate) return gestures; // If no dates are selected, return all gestures

    return gestures.filter(gesture => {
      const createdDate = new Date(gesture.createdDate);
      return createdDate >= startDate && createdDate <= endDate; // Check if gesture date falls within range
    });
  };

  const filterGesturesByName = (gestures) => {
    return gestures.filter(gesture => {
      if (subjects.length === 0) return true;
      return subjects.some(subject => gesture.name === subject);
    });
  };

  const handleDeleteGesture = async (gestureId) => {
    await deleteGesture(gestureId);
    setGestures(gestures.filter(gesture => gesture.id !== gestureId));
  };

  const handleEditGesture = (gesture) => {
    setGestureID(gesture.id);
    navigate("/VideoWindow", {
      state: { gestureId: gesture },
    });
  };

  const confirmDeleteGesture = (gestureId) => {
    setGestureToDelete(gestureId);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    if (gestureToDelete) {
      handleDeleteGesture(gestureToDelete);
      setGestureToDelete(null);
    }
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setGestureToDelete(null);
    setShowConfirmationModal(false);
  };

  const filteredGestures = filterGesturesByDate(gestures)
    .filter(gesture => {
      const gestureLabel = language.language === 'en' ? gesture.realLabel[0] : gesture.realLabel[1];
      if (emotion.length === 0) return true;
      return emotion.some(e => gestureLabel.toLowerCase().includes(e.toLowerCase()));
    })
    .filter(gesture => {
      if (group.length === 0) return true;
      return group.some(g => gesture.group === g);
    })
    .filter(gesture => filterGesturesByName([gesture]).length > 0);

  return (
    <Translations>
      {({ translate }) => (
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
                  <div className="delete-gesture" onClick={() => confirmDeleteGesture(gesture.id)}>
                    &#10006; {/* Delete icon */}
                  </div>
                  <div className="edit-gesture" onClick={() => handleEditGesture(gesture)}>
                    {String.fromCharCode(9998)} {/* Edit icon */}
                  </div>

                  <Tooltip
                    title={
                      <>
                        {"ID: " + gesture.id} <br />
                        {translate("Label") + ": " + gesture.realLabel[0]} <br />
                        {translate("Date") + ": " + new Date(gesture.createdDate).toLocaleDateString()} <br />
                        {translate("Group" + ": " + gesture.group)}
                      </>
                    }
                    aria-label="info"
                  >
                    <div
                      className="info-gesture"
                      onMouseEnter={() => setShowTooltip(gesture.id)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      {String.fromCharCode(9432)} {/* Info icon */}
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

          {showConfirmationModal && (
            <ConfirmationModal
              message={translate("Are you sure you want to delete this gesture?")}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      )}
    </Translations>
  );
}

export default GestureSection;
