import React from 'react';

const EmotionGroupForm = ({
  translate,
  handleGestureChange,
  handleGroupChange,
  selectedGroup,
}) => {
  return (
    <form className="form-container">
      <div className="form-row">
        <div className="form-column emotion-filter">
          <div className="label-container">
            <label htmlFor="gesture-select">{translate('Emotion:')}</label>
          </div>
          <select id="new-gesture-name-3" onChange={handleGestureChange}>
            <option value=""></option>
            <option value="Joy">Joy</option>
            <option value="Sadness">Sadness</option>
            <option value="Anger">Anger</option>
            <option value="Fear">Fear</option>
            <option value="Love">Love</option>
            <option value="Hate">Hate</option>
            <option value="Guilt">Guilt</option>
            <option value="Shame">Shame</option>
            <option value="Envy">Envy</option>
            <option value="Jealousy">Jealousy</option>
            <option value="Pride">Pride</option>
            <option value="Gratitude">Gratitude</option>
            <option value="Hope">Hope</option>
            <option value="Despair">Despair</option>
            <option value="Confusion">Confusion</option>
            <option value="Curiosity">Curiosity</option>
            <option value="Surprise">Surprise</option>
            <option value="Excitement">Excitement</option>
            <option value="Disappointment">Disappointment</option>
            <option value="Contentment">Contentment</option>
            <option value="Loneliness">Loneliness</option>
            <option value="Nostalgia">Nostalgia</option>
            <option value="Relief">Relief</option>
            <option value="Pity">Pity</option>
            <option value="Boredom">Boredom</option>
            <option value="Empathy">Empathy</option>
            <option value="Compassion">Compassion</option>
            <option value="Apathy">Apathy</option>
            <option value="Satisfaction">Satisfaction</option>
            <option value="Disgust">Disgust</option>
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
            <option value="group1">Group 1</option>
            <option value="group2">Group 2</option>
            <option value="group3">Group 3</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default EmotionGroupForm;
