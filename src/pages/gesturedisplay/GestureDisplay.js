import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
import { useState } from 'react';
import { Translations } from "../../language-management/Translations";
import { Tooltip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import EmotionGroupForm from "./EmotionGroupForm";
import ErrorModal from './ErrorModal'; // Import the modal component

function GestureDisplay({ setGestureID }) {
  const [selectedGesture, setSelectedGesture] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]); // For multi-subject selection
  const [currentSubject, setCurrentSubject] = useState(''); // New state for current subject
  const [dateFilter, setDateFilter] = useState('recentWeek'); // Date filter state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  let navigate = useNavigate();

  const handleGestureChange = (e) => {
    setSelectedGesture(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions ? selectedOptions.map(option => option.value) : []); // Store multiple selected subjects
  };

  const handleCurrentSubjectChange = (selectedOption) => {
    setCurrentSubject(selectedOption ? selectedOption.value : ''); // Store current subject
  };

  const handleDateFilterChange = (selectedOption) => {
    setDateFilter(selectedOption.value); // Update date filter
  };

  const handleAddNewGesture = () => {
    if (!currentSubject) {
      // If no subject is selected, open the modal
      setIsModalOpen(true);
      return;
    }

    // Navigate to VideoWindow and pass the current subject as the default user
    navigate("/videoWindow", {
      state: { currentSubject: currentSubject },
    });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const dateOptions = [
    { label: 'Recent Week', value: 'recentWeek' },
    { label: 'Recent Month', value: 'recentMonth' },
    { label: 'Recent 3 Months', value: 'recent3Months' },
    { label: 'Recent 6 Months', value: 'recent6Months' },
  ];

  return (
    <Translations>
      {({ translate }) => (
        <div>
          <EmotionGroupForm
            translate={translate}
            handleGestureChange={handleGestureChange}
            handleGroupChange={handleGroupChange}
            selectedGroup={selectedGroup}
            dateFilter={dateFilter} // Pass the current date filter value
            handleDateFilterChange={handleDateFilterChange} // Pass the date filter handler
            dateOptions={dateOptions} // Pass the date options
            handleSubjectChange={handleSubjectChange} // Pass the subject handler
            selectedSubjects={selectedSubjects} // Pass the selected subjects (array)
            handleCurrentSubjectChange={handleCurrentSubjectChange} // Pass the current subject handler
            currentSubject={currentSubject} // Pass the current subject value
          />

          <GestureSection
            emotion={selectedGesture}
            group={selectedGroup}
            subjects={selectedSubjects} // Pass selected subjects to GestureSection
            currentSubject={currentSubject} // Pass current subject to GestureSection if needed
            setGestureID={setGestureID}
            dateFilter={dateFilter} // Pass date filter to GestureSection
          />

          <div className="actions-container">
            <Tooltip title={translate("Add New Gesture")} aria-label="add">
              <Fab
                aria-label="add"
                onClick={handleAddNewGesture}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>

          {/* Error Modal for missing subject */}
          <ErrorModal
            show={isModalOpen}
            message="Please choose a current subject before adding a new gesture."
            onClose={closeModal}
          />
        </div>
      )}
    </Translations>
  );
}

export default GestureDisplay;
