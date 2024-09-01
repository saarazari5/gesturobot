import React from 'react';
import { Translations } from "../../language-management/Translations";
import './ConfirmationModal.css'; // Create a CSS file for modal styling if needed

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <Translations>
            {({ translate }) => (
                <div className="modalBackdrop">
                    <div className="modalContent">
                        <p>{translate(message)}</p>
                        <div className="buttonContainer">
                            <button className="modalButton" onClick={onConfirm}>
                                {translate("Yes")}
                            </button>
                            <button className="modalButton" onClick={onCancel}>
                                {translate("No")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Translations>
    );
};

export default ConfirmationModal;
