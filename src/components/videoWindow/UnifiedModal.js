import React, { useState, useEffect } from 'react';
import { Translations } from "../../language-management/Translations"; // Import Translations context
import config from '../../config/config.json'; // Import the configuration file for labels and subjects
import './ConfirmationModal.css'; // Ensure you have the correct path for your CSS file

const UnifiedModal = ({ onSave, onCancel, initialLabel = '', initialName = '', initialGroup = '' }) => {
    const [label, setLabel] = useState(initialLabel);
    const [name, setName] = useState(initialName);
    const [group, setGroup] = useState(initialGroup);
    const [error, setError] = useState({ label: false, name: false });
    const [labelOptions, setLabelOptions] = useState([]); // State to hold label options
    const [nameOptions, setNameOptions] = useState([]); // State to hold name options
    const [groupOptions, setGroupOptions] = useState([]);

    // Load labels and names from config file when component mounts
    useEffect(() => {
        setLabelOptions(config.emotions); // Load label options from config
        setNameOptions(config.subjects);  // Load name options from config
        setGroupOptions(config.groups);
    }, []);

    const handleSave = () => {
        let isError = false;
        if (label.trim().length === 0) {
            setError(prev => ({ ...prev, label: true }));
            isError = true;
        }
        if (name.trim().length === 0) {
            setError(prev => ({ ...prev, name: true }));
            isError = true;
        }

        if (group.trim().length === 0) {
            setError(prev => ({ ...prev, group: true }));
            isError = true;
        }

        if (isError) return;

        onSave({ label: label.trim(), name: name.trim(), group: group.trim() });
        setLabel('');
        setName('');
        setGroup('');
        setError({ label: false, name: false, group: false });
    };

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
        setError(prev => ({ ...prev, label: false }));
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setError(prev => ({ ...prev, name: false }));
    };

    const handleGroupChange = (e) => {
        setGroup(e.target.value);
        setError(prev => ({ ...prev, group: false }));
    };

    return (
        <Translations>
            {({ translate }) => (
                <div className="modalBackdrop">
                    <div className="modalContent">
                        <p className='lableMessage'>{translate('Please label this gesture:')}</p>
                        <select
                            value={label}
                            onChange={handleLabelChange}
                            placeholder="Select label"
                        >
                            <option value="">{translate('Select a label')}</option>
                            {labelOptions.map((option) => (
                                <option key={option} value={option}>
                                    {translate(option)}
                                </option>
                            ))}
                        </select>
                        {error.label && <p className="errorMessage">{translate('Label cannot be empty')}</p>}

                        <p className='lableMessage '>{translate('Please choose a subject:')}</p>
                        <select
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Select name"
                        >
                            <option value="">{translate('Select a subject')}</option>
                            {nameOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {error.name && <p className="errorMessage">{translate('Subject cannot be empty')}</p>}

                        <p className='lableMessage'>{translate('Please choose a group:')}</p>
                        <select
                            value={group}
                            onChange={handleGroupChange}
                            placeholder="Select group"
                        >
                            <option value="">{translate('Select a group')}</option>
                            {groupOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {error.group && <p className="errorMessage">{translate('Group cannot be empty')}</p>}


                        <div className="buttonContainer">
                            <button className="modalButton" onClick={handleSave}>
                                {translate('Save')}
                            </button>
                            <button className="modalButton" onClick={onCancel}>
                                {translate('Cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Translations>
    );
};

export default UnifiedModal;
