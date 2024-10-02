import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
import { useState } from 'react';
import { Translations } from "../../language-management/Translations";
import { Tooltip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import EmotionGroupForm from "./EmotionGroupForm";
import ErrorModal from './ErrorModal'; // Import the modal component

/**
 * GestureDisplay component provides a user interface for filtering gestures
 * by emotion, group, subject, and date range. It also allows adding new gestures,
 * and displays error messages if a new gesture is attempted to be added without a current subject.
 * 
 * @param {object} props - The component properties.
 * @param {function} props.setGestureID - A function to set the gesture ID when editing a gesture.
 * 
 * @returns {JSX.Element} A UI to filter gestures and add new gestures with appropriate error handling.
 */
function GestureDisplay({ setGestureID }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);  // State to store selected emotions for filtering gestures
  const [selectedGroups, setSelectedGroups] = useState([]);  // State to store selected groups for filtering gestures
  const [selectedSubjects, setSelectedSubjects] = useState([]);  // State to store selected subjects for filtering gestures
  const [currentSubject, setCurrentSubject] = useState('');  // State to store the currently selected subject
  const [startDate, setStartDate] = useState(null);  // State to store the start date for filtering gestures
  const [endDate, setEndDate] = useState(null);  // State to store the end date for filtering gestures
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control the visibility of the error modal
  const [highlightCurrentSubject, setHighlightCurrentSubject] = useState(false);  // Flag to highlight the current subject field if required

  let navigate = useNavigate();

  /**
   * Handle changes in selected emotions.
   * 
   * @param {Array} selectedOptions - The selected emotions from the form.
   */
  const handleGestureChange = (selectedOptions) => {
    setSelectedEmotions(selectedOptions);  // Update the state with selected emotions
  };

  /**
   * Handle changes in selected groups.
   * 
   * @param {Array} selectedOptions - The selected groups from the form.
   */
  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);  // Update the state with selected groups
  };

  /**
   * Handle changes in selected subjects.
   * 
   * @param {Array} selectedOptions - The selected subjects from the form.
   */
  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions ? selectedOptions.map(option => option.value) : []);  // Update the state with selected subjects
  };

  /**
   * Handle changes in the current subject.
   * 
   * @param {object} selectedOption - The selected current subject.
   */
  const handleCurrentSubjectChange = (selectedOption) => {
    setCurrentSubject(selectedOption ? selectedOption.value : '');  // Update the state with the current subject
    setHighlightCurrentSubject(false);  // Remove the highlight from the subject field when selected
  };

  /**
   * Handle changes in the selected date range.
   * 
   * @param {Date} start - The start date of the range.
   * @param {Date} end - The end date of the range.
   */
  const handleDateRangeChange = (start, end) => {
    setStartDate(start);  // Update the state with the start date
    setEndDate(end);  // Update the state with the end date
  };

  /**
   * Handle adding a new gesture.
   * If no current subject is selected, open the error modal.
   * Otherwise, navigate to the video window to add the gesture.
   */
  const handleAddNewGesture = () => {
    if (!currentSubject) {
      setIsModalOpen(true);  // Open the modal if no subject is selected
      setHighlightCurrentSubject(true);  // Highlight the subject field to indicate it's required
      return;
    }
    navigate("/videoWindow", {
      state: { currentSubject: currentSubject },  // Pass the current subject as state when navigating
    });
  };

  /**
   * Close the error modal and remove the subject field highlight.
   */
  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
    setHighlightCurrentSubject(false);  // Remove the highlight from the subject field
  };

  return (
    <Translations>
      {({ translate }) => (
        <div>
          {/* Form for selecting emotions, groups, subjects, and date range */}
          <EmotionGroupForm
            translate={translate}
            handleGestureChange={handleGestureChange}
            handleGroupChange={handleGroupChange}
            selectedGroups={selectedGroups}
            handleDateRangeChange={handleDateRangeChange}
            handleSubjectChange={handleSubjectChange}
            selectedSubjects={selectedSubjects}
            handleCurrentSubjectChange={handleCurrentSubjectChange}
            currentSubject={currentSubject}
            selectedEmotions={selectedEmotions}
            startDate={startDate}  // Pass start date to the form
            endDate={endDate}  // Pass end date to the form
            highlightCurrentSubject={highlightCurrentSubject}  // Pass highlight flag to indicate missing subject
          />

          {/* Display gestures based on the selected filters */}
          <GestureSection
            emotion={selectedEmotions}
            group={selectedGroups}
            subjects={selectedSubjects}
            currentSubject={currentSubject}
            setGestureID={setGestureID}
            startDate={startDate}
            endDate={endDate}
          />

          {/* Add new gesture button */}
          <div className="actions-container">
            <Tooltip title={translate("Add New Gesture")} aria-label="add">
              <Fab aria-label="add" onClick={handleAddNewGesture}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>

          {/* Error modal that appears if no subject is selected when trying to add a new gesture */}
          <ErrorModal
            translate={translate}
            show={isModalOpen}
            message="Please select a current subject before adding a new gesture."
            onClose={closeModal}
          />
        </div>
      )}
    </Translations>
  );
}

export default GestureDisplay;
