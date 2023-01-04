import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import AuthRoute from "./components/AuthForm/AuthRoute";
import { checkIsAuthenticated } from "components/AuthForm/auth_api/authFunctions";

import SideNavBar from "components/SideNavBar";

import AdminRoutes from "components/Admin/AdminRoutes";
import HomeRoutes from "components/Home/HomeRoutes";

const { innerHeight } = window;

function HomeRoute(props) {
  const {} = props;
  return (
    <div style={{ display: "flex", height: innerHeight }}>
      <SideNavBar />
      <div style={{ marginLeft: 55 }}>
        <Routes>
          <Route path={"home/*"} element={<HomeRoutes />} />
          <Route path={"admin/*"} element={<AdminRoutes />} />
          <Route path="/*" element={<Navigate to="home/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function AppRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onTokenChange = () => {
    checkIsAuthenticated().then((res) => {
      setIsAuthenticated(res);
    });
  };

  document.addEventListener("wheel", (event) => {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  });
  useEffect(() => {
    onTokenChange();
    // window.addEventListener("tokenChange", onTokenChange);
  }, []);

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
                  <HomeRoute />
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
