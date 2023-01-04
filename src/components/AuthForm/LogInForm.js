import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";

import Alert from "react-bootstrap/Alert";

import { BiHide, BiShow } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import { COLORS } from "constants/theme";
import FormButton from "components/AuthForm/AuthButton";
import "components/AuthForm/css/authForm.css";

import { logIn } from "components/AuthForm/auth_api/authFunctions";

const { innerWidth } = window;

function LogInForm(props) {
  const { authRedirectUrl } = props;

  const [showPassWord, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.email.length > 0) {
      console.log("logIn-form submitted ", formData);
      logIn(formData).then((res) => {
        if (res === undefined) {
          setEmailError("Not a registered user");
          return;
        }
        if (res.status) {
          console.log(res.message);
          navigate(`${authRedirectUrl}`, {
            replace: true,
          });
        } else {
          setEmailError(res.message);
        }
      });
    } else {
      setEmailError("Enter Valid Email");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {emailError && <Alert variant={"danger"}>{emailError}</Alert>}
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
              type={showPassWord ? "text" : "password"}
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
              {showPassWord ? (
                <BiShow
                  className="password-hide-show-icon"
                  onClick={() => setShowPassword(!showPassWord)}
                />
              ) : (
                <BiHide
                  className="password-hide-show-icon"
                  onClick={() => setShowPassword(!showPassWord)}
                />
              )}
            </div>
          </Form.Group>
          <FormButton label={"Log In"} />
          <p
            style={{
              textAlign: "center",
              color: COLORS.blue,
              cursor: "pointer",
              marginTop: 15,
            }}
            onClick={() => {
              navigate(`${authRedirectUrl}auth/forgotPassword`, {
                replace: true,
              });
            }}
          >
            Forgotten Password ?
          </p>
          <p style={{ borderTop: `1px solid ${COLORS.secondaryTwo}` }}></p>
          <p
            style={{
              textAlign: "center",
              color: COLORS.blue,
              cursor: "pointer",
            }}
          >
            Don't have an account ?{" "}
            <span
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
              onClick={() => {
                navigate(`${authRedirectUrl}auth/register`, {
                  replace: true,
                });
              }}
            >
              Sign Up
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default LogInForm;
