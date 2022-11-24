import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import FormButton from "components/AuthForm/AuthButton";
import "components/AuthForm/css/authForm.css";
import { logIn, sendOTP } from "components/AuthForm/auth_api/authFunctions";

const { innerWidth } = window;

const RegisterForm = (props) => {
  const { authRedirectUrl } = props;
  // const { state = {} } = useLocation();
  // const { emailAddress } = state;

  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState(false);
  const [message, setMessage] = useState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const navigateToPhone = () => {
  //   navigate(`${authRedirectUrl}auth/phone`, { replace: true });
  // };
  // const resendOTP = () => {
  //   sendOTP(emailAddress, authRedirectUrl).then((res) => {
  //     setMessage(res.message);
  //     setOtpError(null);
  //   });
  // };

  const onSubmit = () => {
    // if (otp.length === 4) {
    //   logIn(emailAddress, otp).then((res) => {
    //     if (res.status) {
    //       navigate(authRedirectUrl, { replace: true });
    //     } else {
    //       setOtpError(true);
    //       setMessage(res.message);
    //     }
    //   });
    // } else {
    //   setOtpError(true);
    // }
  };

  return (
    <>
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
          height: "fit-content",
          margin: "20px auto",
          border: "1px solid black",
          borderRadius: 10,
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className={isBrowser && "login-formGroup-container"}>
            <Form.Group className="login-formGroup">
              <p className="login-formLabel">E mail</p>
              <Form.Control
                type="email"
                placeholder={"Enter Registered Email Address"}
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="login-formGroup">
              <p className="login-formLabel">Password</p>
              <Form.Control
                type="password"
                placeholder={"Enter Registered Email Address"}
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
          </div>

          {/* <FormButton label={"Log In"} />

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <button
              className="button-outline"
              style={{ width: "100%", height: 50 }}
              onClick={navigateToPhone}
            >
              Change Email
            </button>

            <button
              className="button-outline"
              style={{ width: "100%", height: 50 }}
              onClick={resendOTP}
            >
              Resend Verification Code
            </button>
          </div> */}
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;
