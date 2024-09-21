import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import config from '../../config/config.json'; // Adjust the path according to your project structure
import { Translations } from "../../language-management/Translations";

const EmotionGroupForm = ({ translate, handleGestureChange, handleGroupChange, selectedGroup, dateFilter, handleDateFilterChange, dateOptions, handleSubjectChange, selectedSubjects, handleCurrentSubjectChange, currentSubject }) => {
  const [emotions, setEmotions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]); // State for subjects
  const [translatedDateOptions, setTranslatedDateOptions] = useState([]); // State for translated date options

  useEffect(() => {
    const sortedEmotions = config.emotions
      .map(emotion => ({ label: translate(emotion), value: emotion }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort emotions alphabetically

    const sortedGroups = config.groups
      .map(group => ({ label: translate(group), value: group }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort groups alphabetically

    const sortedSubjects = config.subjects
      .map(subject => ({ label: translate(subject), value: subject }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort subjects alphabetically

    const translatedDates = dateOptions
      .map(dateOption => ({ label: translate(dateOption.label), value: dateOption.value })); // Translate date options

    setEmotions(sortedEmotions);
    setGroups(sortedGroups);
    setSubjects(sortedSubjects); // Set subjects from config
    setTranslatedDateOptions(translatedDates); // Set translated date options
  }, [translate, dateOptions]); // Add dateOptions to dependencies to update when they change

  const handleEmotionChange = (selectedOption) => {
    handleGestureChange({ target: { value: selectedOption ? selectedOption.value : '' } });
  };

  const handleGroupChangeSelect = (selectedOption) => {
    handleGroupChange({ target: { value: selectedOption ? selectedOption.value : '' } });
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      opacity: 1,
      zIndex: 1000,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      boxShadow: 'none',
      zIndex: 1000,
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
                placeholder={translate('choose emotion...')}
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
                filterOption={(option, inputValue) => option.label.toLowerCase().startsWith(inputValue.toLowerCase())}
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
                placeholder={translate('choose group...')}
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
                filterOption={(option, inputValue) => option.label.toLowerCase().startsWith(inputValue.toLowerCase())}
              />
            </div>

            {/* Subject Dropdown with Multiple Selection */}
            <div className="form-column subject-filter">
              <div className="label-container">
                <label htmlFor="subject-select">{translate('Subjects:')}</label>
              </div>
              <Select
                options={subjects} // Subject options from config
                onChange={handleSubjectChange}
                value={subjects.filter(option => selectedSubjects.includes(option.value))} // Show selected subjects
                placeholder={translate('choose subjects...')}
                isClearable
                isMulti // Enable multiple selection
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
              />
            </div>

            {/* Date Filter Dropdown */}
            <div className="form-column date-filter">
              <div className="label-container">
                <label htmlFor="date-select">{translate('Date:')}</label>
              </div>
              <Select
                options={translatedDateOptions} // Use translated date options
                onChange={handleDateFilterChange}
                value={translatedDateOptions.find(option => option.value === dateFilter)}
                placeholder={translate('Select date range')}
                isClearable={false}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
              />
            </div>

            {/* New Current Subject Dropdown */}
            <div className="form-column current-subject-filter">
              <div className="label-container">
                <label htmlFor="current-subject-select">{translate('Current Subject:')}</label>
              </div>
              <Select
                options={subjects} // Use the same subjects list
                onChange={handleCurrentSubjectChange}
                value={subjects.find(option => option.value === currentSubject)} // Show selected current subject
                placeholder={translate('Select current subject...')}
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
              />
            </div>
          </div>
        </form>
      )}
    </Translations>
  );
};

export default EmotionGroupForm;
