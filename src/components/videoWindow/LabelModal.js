import React, { useState } from 'react';
import './ConfirmationModal.css'; // Adjust path if needed

const LabelModal = ({ onSaveLabel, onCancel }) => {
    const [label, setLabel] = useState('');
    const [error, setError] = useState(false);

    const handleSaveLabel = () => {
        if (label.trim().length === 0) {
            setError(true); // Show error if label is empty
            return;
        }

        onSaveLabel(label.trim());
        setLabel('');
        setError(false); // Reset error state
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveLabel();
        }
    };

    const handleChange = (e) => {
        setLabel(e.target.value);
        setError(false); // Reset error when user types in the input
    };

    return (
        <div className="modalBackdrop">
            <div className="modalContent">
                <p className='lableMessage'>Please label this gesture:</p>
                <input
                    type="text"
                    value={label}
                    onChange={handleChange} // Handle change in input value
                    onKeyPress={handleKeyPress} // Handle key press event
                    placeholder="Enter label"
                />
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
