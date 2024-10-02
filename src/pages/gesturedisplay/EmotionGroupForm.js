import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import config from '../../config/config.json'; // Adjust the path according to your project structure
import { Translations } from "../../language-management/Translations";
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles


const EmotionGroupForm = ({ translate, handleGestureChange, handleGroupChange, selectedGroups, handleDateRangeChange, handleSubjectChange, selectedSubjects, handleCurrentSubjectChange, currentSubject, selectedEmotions, startDate, endDate, highlightCurrentSubject }) => {
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

    const sortedSubjects = config.subjects
      .map(subject => ({ label: translate(subject), value: subject }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort subjects alphabetically

    setEmotions(sortedEmotions);
    setGroups(sortedGroups);
    setSubjects(sortedSubjects);
  }, [translate]);

  const handleEmotionChange = (selectedOptions) => {
    handleGestureChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleGroupChangeSelect = (selectedOptions) => {
    handleGroupChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    handleDateRangeChange(start, end); // Send the selected dates back to parent
  };

  return (
    <Translations>
      {({ translate }) => (
        <form className="form-container">
          {/* Inline custom style to ensure the DatePicker is on top */}
          <style>
            {`
              .react-datepicker-popper {
                z-index: 9999; /* Increase the z-index */
              }
              .highlight-subject {
                z-index: 9999;
              }
              
              .filterable {
                z-index: 1;
              }
            `}
          </style>
          <div className="form-row">
            {/* Emotion Dropdown with Multiple Selection */}
            <div className="form-column emotion-filter">
              <div className="label-container">
                <label htmlFor="gesture-select">{translate('Emotion:')}</label>
              </div>
              <Select
                options={emotions}
                onChange={handleEmotionChange}
                value={emotions.filter(option => selectedEmotions.includes(option.value))}
                placeholder={translate('choose emotions...')}
                isClearable
                isMulti
                className={`react-select-container ${highlightCurrentSubject ? 'filterable' : ''}`}
                classNamePrefix="react-select"
              />
            </div>

            {/* Group Dropdown with Multiple Selection */}
            <div className="form-column group-filter">
              <div className="label-container">
                <label htmlFor="group-select">{translate('Group:')}</label>
              </div>
              <Select
                options={groups}
                onChange={handleGroupChangeSelect}
                value={groups.filter(option => selectedGroups.includes(option.value))}
                placeholder={translate('choose groups...')}
                isClearable
                isMulti
                className={`react-select-container ${highlightCurrentSubject ? 'filterable' : ''}`}
                classNamePrefix="react-select"
              />
            </div>

            {/* Subject Dropdown with Multiple Selection */}
            <div className="form-column subject-filter">
              <div className="label-container">
                <label htmlFor="subject-select">{translate('Subjects:')}</label>
              </div>
              <Select
                options={subjects}
                onChange={handleSubjectChange}
                value={subjects.filter(option => selectedSubjects.includes(option.value))}
                placeholder={translate('choose subjects...')}
                isClearable
                isMulti
                className={`react-select-container ${highlightCurrentSubject ? 'filterable' : ''}`}
                classNamePrefix="react-select"
              />
            </div>

            {/* Date Range Picker */}
            <div className="form-column date-filter">
              <div className="label-container">
                <label htmlFor="date-select">{translate('Date Range:')}</label>
              </div>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange} // Set start and end date
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                className="form-control"
                placeholderText={translate("Select date range")}
              />
            </div>

            {/* Current Subject Dropdown */}
            <div className="form-column current-subject-filter">
              <div className="label-container">
                <label htmlFor="current-subject-select">{translate('Current Subject:')}</label>
              </div>
              <Select
                options={subjects}
                onChange={handleCurrentSubjectChange}
                value={subjects.find(option => option.value === currentSubject)}
                placeholder={translate('Select current subject...')}
                isClearable
                className={`react-select-container ${highlightCurrentSubject ? 'highlight-subject' : ''}`}
                classNamePrefix="react-select"
              />
            </div>
          </div>
        </form>
      )}
    </Translations>
  );
};

export default EmotionGroupForm;
