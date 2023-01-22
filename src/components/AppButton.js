import React from "react";

import { COLORS, FONTS } from "constants/theme";

const AppButton = (props) => {
  const {
    label,
    disabled,
    onClick,
    fontSize = "16px",
    type = "fill",
    color = COLORS.primary,
    width = "100%",
    height = "43px",
    margin = "0px",
    style,
    buttonClass,
    children,
  } = props;

  return (
    <button
      className={buttonClass}
      style={{
        fontSize: fontSize,
        fontFamily: "poppins-medium",
        borderRadius: 8,
        outline: 0,
        border: disabled
          ? `1px solid ${COLORS.secondary}`
          : `1px solid ${color}`,
        backgroundColor: disabled ? "white" : type === "fill" ? color : "white",
        width: width,
        height: height,
        margin: margin,
        color: disabled ? COLORS.secondary : type === "fill" ? "white" : color,
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "center",
        ...style,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {label}
    </button>
  );
};

export default AppButton;
