import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { COLORS } from "constants/theme";
import { sendForgotPasswordOtp } from "components/AuthForm/auth_api/authFunctions";

const { innerWidth } = window;

function VerifySelectEmailForm(props) {
  const { authRedirectUrl } = props;

  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setAlertMessage(null);
    if (email.length > 0) {
      sendForgotPasswordOtp(email).then((res) => {
        console.log("after send otp forget-password ", res);
        if (res.status) {
          navigate(`${authRedirectUrl}auth/otp`, {
            replace: true,
            state: { formData: { email: email }, otpFor: "Reset Password" },
          });
        } else {
          res.message
            ? setAlertMessage(res.message)
            : setAlertMessage("Internal Server Error!");
        }
      });
    }
  };

  return (
    <>
      {alertMessage && <Alert variant={"danger"}>{alertMessage}</Alert>}

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
        <Form onSubmit={onSubmit}>
          <Form.Group className="login-formGroup">
            <p className="login-formLabel">E mail</p>
            <Form.Control
              type="email"
              placeholder={"Enter Registered Email Address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: alertMessage
                  ? `1px solid ${COLORS.error}`
                  : `1px solid ${COLORS.secondaryTwo}`,
              }}
            />
          </Form.Group>

          <Button
            variant={email.length > 0 ? "primary" : "secondary"}
            type="submit"
            style={{ marginTop: 20, width: "100%" }}
            // onClick={onClickNext}
            disabled={email.length === 0}
          >
            NEXT
          </Button>
          <p style={{ borderTop: `1px solid ${COLORS.secondaryTwo}` }}></p>
          <p
            style={{
              textAlign: "center",
              color: COLORS.blue,
              cursor: "pointer",
            }}
          >
            Registered User ?{" "}
            <span
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
              onClick={() => {
                navigate(`${authRedirectUrl}auth/login`, {
                  replace: true,
                });
              }}
            >
              Log In
            </span>
          </p>
        </Form>
      </div>
    </>
  );
}

export default VerifySelectEmailForm;
