import React from 'react';
import './ErrorModal.css'; // Ensure you style the modal properly
import { Translations } from "../../language-management/Translations";

const ErrorModal = ({ translate, show, message, onClose }) => {
    if (!show) return null;

    return (
        <Translations>
            {({ translate }) => (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>{translate("Please Choose Subject")}</h2>
                        <p>{translate(message)}</p>
                        <button onClick={onClose}>{translate("Close")}</button>
                    </div>
                </div>
            )}
        </Translations>
    );
};

export default ErrorModal;
