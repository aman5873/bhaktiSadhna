import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { BiHide, BiShow } from "react-icons/bi";

import { useNavigate, useLocation } from "react-router-dom";

import { COLORS } from "constants/theme";
import FormButton from "components/AuthForm/AuthButton";
import "components/AuthForm/css/authForm.css";
import { sendRegistrationOtp } from "components/AuthForm/auth_api/authFunctions";

const { innerWidth } = window;

export function PasswordInput(props) {
  const {
    label = "Password",
    password,
    onChangePassword,
    isShowPasswordIcon = null,
  } = props;
  const [showPassWord, setShowPassword] = useState(isShowPasswordIcon);
  return (
    <Form.Group className="login-formGroup">
      <p className="login-formLabel">{label}</p>
      <Form.Control
        type={showPassWord ? "text" : "password"}
        placeholder={"Enter password"}
        value={password}
        style={{
          paddingRight: 30,
        }}
        onChange={onChangePassword}
      />
      {showPassWord !== null && (
        <div style={{ position: "relative" }}>
          {showPassWord ? (
            <BiHide
              className="password-hide-show-icon"
              onClick={() => setShowPassword(!showPassWord)}
            />
          ) : (
            <BiShow
              className="password-hide-show-icon"
              onClick={() => setShowPassword(!showPassWord)}
            />
          )}
        </div>
      )}
    </Form.Group>
  );
}
const RegisterForm = (props) => {
  const { authRedirectUrl } = props;

  const navigate = useNavigate();
  const [otpError, setOtpError] = useState(false);
  const [message, setMessage] = useState();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  function onChangePassword(event) {
    setFormData({ ...formData, password: event.target.value });
  }
  function onChangePassword2(event) {
    setFormData({ ...formData, password2: event.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    sendRegistrationOtp(formData).then((res) => {
      if (res.status) {
        navigate(`/auth/otp`, {
          replace: true,
          state: { formData: formData, otpFor: "Register" },
        });
      }
    });
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
              <p className="login-formLabel">Name</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <Form.Control
                  type="text"
                  placeholder={"Enter First Name"}
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      first_name: e.target.value,
                    })
                  }
                />
                <Form.Control
                  type="last_name"
                  placeholder={"Enter Last Name"}
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      last_name: e.target.value,
                    })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group className="login-formGroup">
              <p className="login-formLabel">E mail</p>
              <Form.Control
                type="email"
                placeholder={"Enter Email Address"}
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <PasswordInput
              label="Password"
              password={formData.password}
              onChangePassword={onChangePassword}
              isShowPasswordIcon={false}
            />
            <PasswordInput
              label="Confirm Password"
              password={formData.password2}
              onChangePassword={onChangePassword2}
            />

            <FormButton label={"Register"} />

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
      </div>
    </>
  );
};

export default RegisterForm;
