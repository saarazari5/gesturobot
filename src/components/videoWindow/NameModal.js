import React, { useState } from 'react';
import './ConfirmationModal.css'; // Adjust path if needed

const NameModal = ({ onSaveName, onCancel, initialName = '' }) => {
    const [name, setName] = useState(initialName);
    const [error, setError] = useState(false);

    const handleSaveName = () => {
        if (name.trim().length === 0) {
            setError(true);
            return;
        }

        onSaveName(name.trim());
        setName('');
        setError(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveName();
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
        setError(false);
    };

    return (
        <div className="modalBackdrop">
            <div className="modalContent">
                <p className='lableMessage'>Please enter the gesture name:</p>
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter name"
                />
                {error && <p className="errorMessage">Name cannot be empty</p>}
                <div className="buttonContainer">
                    <button className="modalButton" onClick={handleSaveName}>Save</button>
                    <button className="modalButton" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NameModal;
