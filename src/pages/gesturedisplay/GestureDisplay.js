import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
import { useState } from 'react';
import { Translations } from "../../language-management/Translations";
import { Tooltip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import EmotionGroupForm from "./EmotionGroupForm";
import Select from 'react-select';

function GestureDisplay({ setGestureID }) {
  const [selectedGesture, setSelectedGesture] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [dateFilter, setDateFilter] = useState('recentWeek'); // Date filter state
  let navigate = useNavigate();

  const handleGestureChange = (e) => {
    setSelectedGesture(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleDateFilterChange = (selectedOption) => {
    setDateFilter(selectedOption.value); // Update date filter
  };

  const handleEditGesture = (gesture) => {
    setGestureID(gesture.id);
    navigate("/VideoWindow", {
      state: { gestureId: gesture },
    });
  };

  const handleClick = () => {
    navigate("/videoWindow");
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
          />

          <Select
            options={dateOptions}
            onChange={handleDateFilterChange}
            value={dateOptions.find(option => option.value === dateFilter)}
            placeholder={translate('Select date range')}
            isClearable={false}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{ menu: provided => ({ ...provided, zIndex: 1000 }) }}
          />

          <GestureSection
            emotion={selectedGesture}
            group={selectedGroup}
            setGestureID={setGestureID}
            dateFilter={dateFilter} // Pass date filter to GestureSection
          />

          <div className="actions-container">
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
