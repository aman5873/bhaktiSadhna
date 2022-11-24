import React from "react";
import Button from "react-bootstrap/Button";

const FormButton = (props) => {
  const { label, disabled } = props;
  return (
    <button
      style={{
        width: "100%",
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
        outline: 0,
      }}
      className="button-submit"
      type="submit"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FormButton;
