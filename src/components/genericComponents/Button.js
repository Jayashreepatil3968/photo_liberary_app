import React from "react";

const Button = ({
    onClick,
    children,
    buttonClassName = "",
    type = "button",
    disabled = false
}) => (
    <button
        type={type}
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;