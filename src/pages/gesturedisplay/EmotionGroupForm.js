import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import config from '../../config/config.json'; // Adjust the path according to your project structure
import { Translations } from "../../language-management/Translations";

const EmotionGroupForm = ({ translate, handleGestureChange, handleGroupChange, selectedGroup, handleSubjectsChange, selectedSubjects, handleSubjectChange, selectedSubject }) => {
  const [emotions, setEmotions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const sortedEmotions = config.emotions
      .map(emotion => ({ label: translate(emotion), value: emotion }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort emotions alphabetically

    const sortedGroups = config.groups
      .map(group => ({ label: translate(group), value: group }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort groups alphabetically

    setEmotions(sortedEmotions);
    setGroups(sortedGroups);
    setSubjects(config.subjects);
  }, []);

  const handleEmotionChange = (selectedOption) => {
    handleGestureChange({ target: { value: selectedOption ? selectedOption.value : '' } });
  };

  const handleGroupChangeSelect = (selectedOption) => {
    handleGroupChange({ target: { value: selectedOption ? selectedOption.value : '' } });
  };

  // Custom styles to remove transparency and set z-index
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white', // Set background to white
      opacity: 1, // Remove any transparency
      zIndex: 1000, // Set a high z-index to ensure it appears on top
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white', // Set background to white
      border: '1px solid #ccc',
      boxShadow: 'none',
      zIndex: 1000, // Ensure control is above other elements
    }),
  };

  return (
    <Translations>
      {({ translate }) => (
        <form className="form-container">
          <div className="form-row">
            {/* Emotion Dropdown */}
            <div className="form-column emotion-filter">
              <div className="label-container">
                <label htmlFor="gesture-select">{translate('Emotion:')}</label>
              </div>
              <Select
                options={emotions}
                onChange={handleEmotionChange}
                placeholder={translate('Search for an emotion...')}
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles} // Apply custom styles with z-index here
                filterOption={(option, inputValue) => option.label.toLowerCase().startsWith(inputValue.toLowerCase())} // Filter by order
              />
            </div>

            {/* Group Dropdown */}
            <div className="form-column group-filter">
              <div className="label-container">
                <label htmlFor="group-select">{translate('Group:')}</label>
              </div>
              <Select
                options={groups}
                onChange={handleGroupChangeSelect}
                placeholder={translate('Search for a group...')}
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles} // Apply custom styles with z-index here
                filterOption={(option, inputValue) => option.label.toLowerCase().startsWith(inputValue.toLowerCase())} // Filter by order
              />
            </div>
          </div>
        </form>
      )}
    </Translations>
  );
};

export default EmotionGroupForm;
