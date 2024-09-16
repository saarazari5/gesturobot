import React, { useState, useEffect, useContext } from 'react';
import './gesturesection.css';
import { getAllGestures, deleteGesture } from '../../databases/gesturesAPI';
import LoopOfMovements from '../loopOfMovements/loopOfMovements';
import { LanguageContext } from '../../language-management/LanguageContext';
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from '@mui/material';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component
import { Translations } from '../../language-management/Translations';

function GestureSection({ emotion, group, subjects, setGestureID, dateFilter }) { // Add subjects prop here
  let navigate = useNavigate();
  const language = useContext(LanguageContext);
  const [gestures, setGestures] = useState([]);
  const [hoveredGestureId, setHoveredGestureId] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null); // State to handle tooltip visibility
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to control modal visibility
  const [gestureToDelete, setGestureToDelete] = useState(null); // State to store which gesture to delete

  useEffect(() => {
    const fetchGestures = async () => {
      const data = await getAllGestures();
      console.log(data);
      setGestures(data);
    };

    fetchGestures();
  }, []);

  const filterGesturesByDate = (gestures) => {
    const now = new Date();
    return gestures.filter(gesture => {
      const createdDate = new Date(gesture.createdDate);
      switch (dateFilter) {
        case 'recentWeek':
          return (now - createdDate) <= (7 * 24 * 60 * 60 * 1000);
        case 'recentMonth':
          return (now - createdDate) <= (30 * 24 * 60 * 60 * 1000);
        case 'recent3Months':
          return (now - createdDate) <= (3 * 30 * 24 * 60 * 60 * 1000);
        case 'recent6Months':
          return (now - createdDate) <= (6 * 30 * 24 * 60 * 60 * 1000);
        default:
          return true;
      }
    });
  };

  const filterGesturesByName = (gestures) => {
    return gestures.filter(gesture => {
      // If no subjects (gesture names) are selected, return all gestures
      if (subjects.length === 0) return true;

      // Check if the gesture name matches any of the selected subjects exactly
      return subjects.some(subject => gesture.name === subject); // Exact match using '==='
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
    setGestureToDelete(gestureId); // Set the gesture ID to delete
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  const handleConfirmDelete = () => {
    if (gestureToDelete) {
      handleDeleteGesture(gestureToDelete); // Perform the delete operation
      setGestureToDelete(null); // Reset the gesture to delete
    }
    setShowConfirmationModal(false); // Hide the modal
  };

  const handleCancelDelete = () => {
    setGestureToDelete(null); // Reset the gesture to delete
    setShowConfirmationModal(false); // Hide the modal
  };

  const filteredGestures = filterGesturesByDate(gestures)
    .filter(gesture => {
      const temp = language.language === 'en' ? gesture.realLabel[0] : gesture.realLabel[1];
      return temp.toLowerCase().includes(emotion.toLowerCase());
    })
    .filter(gesture => {
      if (group) {
        return gesture.group === group; // Ensure group matches
      }
      return true;
    })
    .filter(gesture => filterGesturesByName([gesture]).length > 0); // Filter by gesture name (subject)

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
                        {translate("ID") + ": " + gesture.id} <br />
                        {translate("Label") + ": " + translate(gesture.realLabel[0])} <br />
                        {translate("Date") + ": " + new Date(gesture.createdDate).toLocaleDateString()} <br />
                        {translate("Group") + ": " + translate(gesture.group)}
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
          {/* Render the ConfirmationModal */}
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
