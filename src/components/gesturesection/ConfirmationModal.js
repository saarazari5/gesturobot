import React from 'react';
import './ConfirmationModal.css'; // Make sure to create appropriate styles

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modalBackdrop">
            <div className="modalContent">
                <p>{message}</p>
                <div className="buttonContainer">
                    <button className="modalButton" onClick={onConfirm}>Yes</button>
                    <button className="modalButton" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
