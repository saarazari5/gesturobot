import React from 'react';
import './ErrorModal.css'; // Ensure you style the modal properly

const ErrorModal = ({ show, message, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Please Choose Subject</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ErrorModal;
