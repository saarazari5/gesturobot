import React, { useState, useEffect } from 'react';
import config from '../../config/config.json'; // Adjust the path according to your project structure
import { Translations } from "../../language-management/Translations";


const EmotionGroupForm = ({ translate, handleGestureChange, handleGroupChange, selectedGroup, handleSubjectsChange, selectedSubjects, handleSubjectChange, selectedSubject }) => {
  const [emotions, setEmotions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Load the config data when the component mounts
    setEmotions(config.emotions);
    setGroups(config.groups);
    setSubjects(config.subjects);
  }, []);

  return (
    <Translations>
      {({ translate }) => (
        <form className="form-container">
          <div className="form-row">
            <div className="form-column emotion-filter">
              <div className="label-container">
                <label htmlFor="gesture-select">{translate('Emotion:')}</label>
              </div>
              <select id="new-gesture-name-3" onChange={handleGestureChange}>
                <option value=""></option>
                {emotions.map((emotion) => (
                  <option key={emotion} value={emotion}>
                    {translate(emotion)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-column group-filter">
              <div className="label-container">
                <label htmlFor="group-dropdown">{translate('Group:')}</label>
              </div>
              <select
                id="group-dropdown"
                value={selectedGroup}
                onChange={handleGroupChange}
              >
                <option value=""></option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {translate(group)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <div className="form-column subject-multichoice-filter">
            <div className="label-container">
              <label>{translate('Subjects (Multiple):')}</label>
            </div>
            <select
              id="subject-dropdown"
              value={selectedSubject}
              onChange={handleSubjectsChange}
            >
              <option value=""></option>
              {subjects.map((subject) => (
                <option key={subject}>
                  <input
                    type="checkbox"
                    value={subject}
                    checked={selectedSubjects.includes(subject)}
                    onChange={handleSubjectsChange}
                  />
                  {translate(subject)}
                </option>
              ))}
            </select>

          </div> */}
        </form>


      )}
    </Translations>
  );
};

export default EmotionGroupForm;
