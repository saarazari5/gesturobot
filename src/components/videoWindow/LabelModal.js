import React, { useState, useEffect } from 'react';
import config from '../../config/config.json'; // Import the configuration file for labels
import './ConfirmationModal.css'; // Ensure you have the correct path for your CSS file

const LabelModal = ({ onSaveLabel, onCancel, initialLabel = '' }) => {
    // State for the selected label, error handling, and label options
    const [label, setLabel] = useState(initialLabel);
    const [error, setError] = useState(false);
    const [labelOptions, setLabelOptions] = useState([]); // State to hold label options

    // Load labels from config file when component mounts
    useEffect(() => {
        setLabelOptions(config.emotions); // Load labels from config
    }, []);

    // Function to handle saving the selected label
    const handleSaveLabel = () => {
        if (label.trim().length === 0) {
            setError(true); // Set error state if no label is selected
            return;
        }

        onSaveLabel(label.trim()); // Pass the selected label back to the parent component
        setError(false); // Reset error state
    };

    // Function to handle changes in the dropdown selection
    const handleChange = (e) => {
        setLabel(e.target.value); // Update the selected label state
        setError(false); // Reset error state if user makes a valid selection
    };

    // Render the modal with a dropdown list for label selection
    return (
        <div className="modalBackdrop">
            <div className="modalContent">
                <p className='labelMessage'>Please select a label for this gesture:</p>
                <select
                    value={label}
                    onChange={handleChange}
                    placeholder="Select label"
                >
                    <option value="">Select a label</option>
                    {labelOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {error && <p className="errorMessage">Label cannot be empty</p>}
                <div className="buttonContainer">
                    <button className="modalButton" onClick={handleSaveLabel}>Save</button>
                    <button className="modalButton" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LabelModal;
