import React from "react";

import { Routes, Route } from "react-router-dom";

import Admin from "./Admin";
function AdminRoutes() {
  return (
    <Routes>
      <Route path={"/*"} element={<Admin />} />
      {/* <Route path="/*" exact={true} element={<Navigate to="admin/" />} /> */}
    </Routes>
  );
}

export default AdminRoutes;
