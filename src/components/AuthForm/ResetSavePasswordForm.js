import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { COLORS } from "constants/theme";
import FormButton from "components/AuthForm/AuthButton";
import { sendForgotPasswordOtp } from "./auth_api/authFunctions";

const { innerWidth } = window;

function ResetSavePasswordForm(props) {
  const { authRedirectUrl } = props;
  const { state = {} } = useLocation();
  const { userEmail } = state;

  const [isPasswordMatch, setIsPasswordMatch] = useState(null);
  const [formData, setFormData] = useState({
    email: userEmail,
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

  // useEffect(() => {
  //   formData.confirmPassword === formData.password && setIsPasswordMatch(true);
  // }, [formData.confirmPassword]);

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
              required
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
              required
              type={"text"}
              placeholder={"Enter password"}
              value={formData.confirmPassword}
              style={{
                paddingRight: 30,
              }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
                e.target.value.length
                  ? formData.password.length &&
                    formData.password === e.target.value
                    ? setIsPasswordMatch(true)
                    : setIsPasswordMatch(false)
                  : setIsPasswordMatch(null);
              }}
            />
            {isPasswordMatch !== null && (
              <div style={{ position: "relative" }}>
                {isPasswordMatch ? (
                  <TiTick
                    className="password-hide-show-icon"
                    style={{ color: COLORS.green }}
                  />
                ) : (
                  <ImCross
                    className="password-hide-show-icon"
                    style={{ color: COLORS.error }}
                  />
                )}
              </div>
            )}
          </Form.Group>
          <FormButton label={"Reset & Save Password"} />
        </Form>
      </div>
    </div>
  );
}

export default ResetSavePasswordForm;
