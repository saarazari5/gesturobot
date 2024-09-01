import './InputBar.css';
import { useState } from "react";
import InputBarPopOver from "./InputBarPopOver.js";
import { Translations } from "../../../language-management/Translations.js"; // Import Translations

function InputBar({ iconId, iconClass, infoId, placeholder, inputName, type, onChange, wasErr, errMsg, id }) {
    const [showPopover, setShowPopover] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePopOver = () => {
        setShowPopover(!showPopover);
    };

    const onEyeClick = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Translations>
            {({ translate }) => (
                <>
                    <div className='input-group login-input-group' id={inputName}>
                        <span className="input-group-text login-input-group-text" id={iconId}>
                            <i className={iconClass}></i>
                        </span>
                        <input
                            type={type}
                            className="form-control"
                            name={inputName}
                            placeholder={translate(placeholder)} // Apply translation here
                            aria-describedby={iconId}
                            autoComplete="off"
                            onChange={onChange}
                            id={id}
                        ></input>
                        <span
                            className="input-group-text info-icon"
                            onMouseEnter={togglePopOver}
                            onMouseLeave={togglePopOver}
                        >
                        </span>
                        {showPopover && (
                            <div className="popover info-popover" id="login-popover" style={{ left: "calc(100% + 10px)" }}>
                            </div>
                        )}
                    </div>
                    {wasErr && (<InputBarPopOver errMsg={errMsg} />)}
                </>
            )}
        </Translations>
    );
}

export default InputBar;
