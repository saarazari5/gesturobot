import React, { useState } from 'react';
import './ConfirmationModal.css'; // Adjust path if needed

const LabelModal = ({ onSaveLabel, onCancel }) => {
    const [label, setLabel] = useState('');

    const handleSaveLabel = () => {
        onSaveLabel(label);
        setLabel('');
    };

    return (
        <div className="modalBackdrop">
            <div className="modalContent">
                <p className='lableMessage'>Please label this gesture:</p>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Enter label"
                />
                <div className="buttonContainer">
                    <button className="modalButton" onClick={handleSaveLabel}>Save</button>
                    <button className="modalButton" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LabelModal;
