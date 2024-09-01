import React, { useState, useEffect } from 'react';
import config from '../../config/config.json'; // Adjust the path according to your project structure
import { Translations } from "../../language-management/Translations";


const EmotionGroupForm = ({ translate, handleGestureChange, handleGroupChange, selectedGroup }) => {
  const [emotions, setEmotions] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Load the config data when the component mounts
    setEmotions(config.emotions);
    setGroups(config.groups);
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
        </form>
      )}
    </Translations>
  );
};

export default EmotionGroupForm;
