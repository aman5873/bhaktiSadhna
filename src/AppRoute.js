import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";

import AuthRoute from "./components/AuthForm/AuthRoute";
import { checkIsAuthenticated } from "components/AuthForm/auth_api/authFunctions";

import SideNavBar from "components/SideNavBar";

import AdminRoutes from "components/Admin/AdminRoutes";
import HomeRoutes from "components/Home/HomeRoutes";

const { innerHeight } = window;

function HomeRoute(props) {
  const { isAuthenticated } = props;
  const [isExpanded, setExpendState] = useState(false);

  // console.log("path homeRoute ", useLocation().pathname);
  return (
    <div style={{ display: "flex", height: innerHeight }}>
      <SideNavBar isExpanded={isExpanded} setExpendState={setExpendState} />
      <div style={{ marginLeft: 55 }}>
        <Routes>
          <Route path={"home/*"} element={<HomeRoutes />} />
          <Route path={"admin/*"} element={<AdminRoutes />} />
          <Route path="*" element={<Navigate to="home/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function AppRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  const onTokenChange = () => {
    checkIsAuthenticated().then((res) => {
      setIsAuthenticated(res);
    });
  };

  useEffect(() => {
    if (isAuthenticated === undefined) {
      onTokenChange();
      window.addEventListener("tokenChange", onTokenChange);
    }
  }, []);

  console.log("isAuthenticated ", isAuthenticated);

  return (
    <>
      <Router>
        {isAuthenticated !== undefined && (
          <Routes>
            <Route
              path="auth/*"
              element={
                <AuthRoute
                  isAuthenticated={isAuthenticated}
                  authRedirectUrl={"/"}
                />
              }
            />
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <HomeRoute isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/auth/" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default AppRoute;
