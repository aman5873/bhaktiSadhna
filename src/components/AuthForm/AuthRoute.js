import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import RegisterForm from "components/AuthForm/RegisterForm";
import LogInForm from "components/AuthForm/LogInForm";
// import SignUpForm from "components/AuthForm/SignUpForm";
import LogOutComp from "components/AuthForm/LogOutComp";

function AuthRoute(props) {
  const { isAuthenticated, authRedirectUrl } = props;
  const { state = {} } = useLocation();
  const phoneNumber = state?.phoneNumber;

  if (isAuthenticated) {
    return (
      <Routes>
        <Route
          key="logout"
          path="/logout"
          element={<LogOutComp authRedirectUrl={authRedirectUrl} />}
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
          key="login"
          path="/login"
          element={<LogInForm authRedirectUrl={authRedirectUrl} />}
        />
        {phoneNumber && (
          <>
            <Route
              key="register"
              path="/register"
              element={<RegisterForm authRedirectUrl={authRedirectUrl} />}
            />
          </>
        )}
        <Route
          path="*"
          exact={true}
          element={<Navigate replace to="login" />}
        />
      </Routes>
    );
  }
}

export default AuthRoute;
