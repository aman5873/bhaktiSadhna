import React, { useRef, useEffect, useState } from "react";

import { COLORS } from "constants/theme";
import "css/otpInput.css";

function OtpInput(props) {
  const { otpLength, onChangeOtp, otpError } = props;

  const [otp, setOtp] = useState(new Array(otpLength).fill(""));

  const inputRef = useRef();
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    // if (element.nextSibling) {
    //   element.nextSibling.focus();
    // }
  };

  useEffect(() => {
    onChangeOtp(otp.join(""));
  }, [otp]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      {otp.map((data, index) => {
        return (
          <input
            ref={index === 0 ? inputRef : null}
            className="otp-field"
            type="text"
            name="otp"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="1"
            style={{
              border: otpError && `2px solid ${COLORS.error}`,
            }}
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            onKeyUp={(e) => {
              if (e.key === "ArrowLeft" || e.key === "Backspace") {
                e.target.previousSibling && e.target.previousSibling.focus();
              } else if (
                (e.key >= 0 && e.key <= 9) ||
                e.key === "ArrowRight" ||
                e.key === "Delete"
              ) {
                e.target.nextSibling && e.target.nextSibling.focus();
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default OtpInput;
