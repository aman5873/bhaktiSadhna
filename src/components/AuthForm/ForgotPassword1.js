import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { COLORS } from "constants/theme";
import FormButton from "components/AuthForm/AuthButton";

const { innerWidth } = window;
function ResetSavePasswordForm(props) {
  const { email, authRedirectUrl } = props;

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [formData, setFormData] = useState({
    email: email,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("reset-password-form-submit", formData);
    // resetUserPassword(formData).then((res) => {
    //   if (res.status) {
    //     navigate(`${authRedirectUrl}auth/forgotPassword`, {
    //       replace: true,
    //       state: { email: email },
    //     });
    //   }
    // });
  };

  useEffect(() => {
    formData.confirmPassword === formData.password && setIsPasswordMatch(true);
  }, [formData.confirmPassword]);

  return (
    <div style={{ width: "100%" }}>
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
            <Form.Control disabled type="email" value={formData.email} />
          </Form.Group>
          <Form.Group className="login-formGroup">
            <p className="login-formLabel">Reset Password</p>
            <Form.Control
              type={"text"}
              placeholder={"Enter password"}
              value={formData.password}
              style={{
                paddingRight: 30,
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="login-formGroup">
            <p className="login-formLabel">Confirm Password</p>
            <Form.Control
              type={"text"}
              placeholder={"Enter password"}
              value={formData.password}
              style={{
                paddingRight: 30,
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
            <div style={{ position: "relative" }}>
              {isPasswordMatch ? (
                <TiTick className="password-hide-show-icon" />
              ) : (
                <ImCross className="password-hide-show-icon" />
              )}
            </div>
          </Form.Group>
          <FormButton label={"Reset & Save Password"} />
        </Form>
      </div>
    </div>
  );
}

function VerifySelectEmailForm(props) {
  const { authRedirectUrl } = props;

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate(`${authRedirectUrl}auth/forgotPassword`, {
        replace: true,
        state: { email: email },
      });
    }
  };
  return (
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
      </Form>
    </div>
  );
}
function ForgotPasswordForm(props) {
  const { isAuthenticated, authRedirectUrl } = props;

  const [email, setEmail] = useState(null);

  // const { state = {} } = useLocation();
  // const { email } = state?.email;

  if (email) {
    return (
      <ResetSavePasswordForm email={email} authRedirectUrl={authRedirectUrl} />
    );
  } else {
    <VerifySelectEmailForm authRedirectUrl={authRedirectUrl} />;
  }
}
export default ForgotPasswordForm;
