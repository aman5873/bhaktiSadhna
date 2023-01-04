import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import OtpInput from "components/OtpInput";
import { COLORS, FONTS } from "constants/theme";

import { useNavigate, useLocation } from "react-router-dom";

import FormButton from "components/AuthForm/AuthButton";

import "components/AuthForm/css/authForm.css";

import {
  validateRegistrationOtp,
  sendRegistrationOtp,
  validateForgotPasswordOtp,
  sendForgotPasswordOtp,
} from "components/AuthForm/auth_api/authFunctions";

const { innerWidth } = window;

export function MaskEmail(email) {
  let masked_email = "";
  var prefix = email.substring(0, email.lastIndexOf("@"));
  var postfix = email.substring(email.lastIndexOf("@"));

  for (var i = 0; i < prefix.length; i++) {
    if (i == 0 || i == prefix.length - 1) {
      masked_email = masked_email + prefix[i].toString();
    } else {
      masked_email = masked_email + "*";
    }
  }
  masked_email = masked_email + postfix;
  return masked_email;
}
function OtpForm(props) {
  const { authRedirectUrl } = props;
  const { state = {} } = useLocation();
  const { formData, otpFor } = state;

  const userMail = MaskEmail(otpFor === "Register" ? formData.email : formData);

  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState(false);
  const [message, setMessage] = useState();

  const navigateToChangeEmail = () => {
    const path =
      otpFor === "Register"
        ? `${authRedirectUrl}auth/register`
        : `${authRedirectUrl}auth/forgotPassword`;
    navigate(path, {
      replace: true,
    });
  };
  const resendOTP = () => {
    otpFor === "Register"
      ? sendRegistrationOtp(formData).then((res) => {
          setMessage(res.message);
          setOtpError(null);
        })
      : sendForgotPasswordOtp(formData).then((res) => {
          setMessage(res.message);
          setOtpError(null);
        });
  };

  const onSubmit = () => {
    if (otp.length === 6) {
      otpFor === "Register"
        ? validateRegistrationOtp(otp).then((res) => {
            if (res.status) {
              navigate(authRedirectUrl, { replace: true });
            } else {
              setOtpError(true);
              setMessage(res.message);
            }
          })
        : validateForgotPasswordOtp(otp).then((res) => {
            if (res.status) {
              navigate(`${authRedirectUrl}auth/resetPassword`, {
                replace: true,
                state: { userEmail: formData.email },
              });
            } else {
              setOtpError(true);
              setMessage(res.message);
            }
          });
    } else {
      setOtpError(true);
    }
  };

  // console.log(otpError);
  // console.log(message);
  return (
    <div style={{ width: "100%" }}>
      {message && (
        <Alert
          variant={otpError === null ? "info" : "danger"}
          onClose={() => setMessage(null)}
          dismissible
        >
          {message}
        </Alert>
      )}
      <div
        style={{
          width: innerWidth > 500 ? 500 : innerWidth - 20,
          margin: "50px auto",
          border: `1px solid ${COLORS.secondaryTwo}`,
          borderRadius: 10,
          padding: 20,
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Row>
            <p style={{ textAlign: "center" }}>
              Otp sent to{" "}
              <span style={{ ...FONTS.H4, color: COLORS.greenTwo }}>
                {userMail}
              </span>
            </p>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {"Enter OTP"}
            <OtpInput
              onChangeOtp={(otp) => setOtp(otp)}
              otpLength={6}
              otpError={otpError}
            />
          </Row>

          <FormButton label={otpFor} />

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <button
              className="button-outline"
              style={{ width: "100%", height: 50 }}
              onClick={navigateToChangeEmail}
            >
              Change Email
            </button>

            <button
              className="button-outline"
              style={{ width: "100%", height: 50 }}
              onClick={resendOTP}
            >
              Resend OTP
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default OtpForm;
