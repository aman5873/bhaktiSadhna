import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import RegisterForm from "components/AuthForm/RegisterForm";
import LogInForm from "components/AuthForm/LogInForm";
import ForgotPasswordForm from "components/AuthForm/ForgotPasswordForm";
import ResetSavePasswordForm from "components/AuthForm/ResetSavePasswordForm";
import LogOutComp from "components/AuthForm/LogOutComp";
import OtpForm from "components/AuthForm/OtpForm";
import NotFound from "components/NotFound";

function AuthRoute(props) {
  const { isAuthenticated, authRedirectUrl } = props;

  // console.log("path authRoute ", useLocation().pathname);

  if (isAuthenticated) {
    return (
      <Routes>
        <Route
          key="logout"
          path="/logout"
          element={<LogOutComp />}
        />
        <Route
          path="*"
          exact={true}
          element={<Navigate replace to={authRedirectUrl} />}
        />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route
          // key="login"
          path="/login"
          element={<LogInForm authRedirectUrl={"/home"} />}
        />
        <Route
          // key="register"
          path="/register"
          element={<RegisterForm authRedirectUrl={authRedirectUrl} />}
        />
        <Route
          // key="forgotPassword"
          path="/forgotPassword"
          element={<ForgotPasswordForm authRedirectUrl={authRedirectUrl} />}
        />
        <Route
          // key="forgotPassword"
          path="/resetPassword"
          element={<ResetSavePasswordForm authRedirectUrl={authRedirectUrl} />}
        />
        <Route
          // key="forgotPassword"
          path="/otp"
          element={<OtpForm authRedirectUrl={authRedirectUrl} />}
        />
        <Route
          path="/logout"
          element={<LogOutComp />}
        />
        <Route
          path="/*"
          element={<NotFound />}
        />
      </Routes>
    );
  }
}

export default AuthRoute;
