import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Attendance from "./Attendance";
function UserRoutes() {
  return (
    <Routes>
      <Route path={"attendance/*"} element={<Attendance />} />
      <Route path="*" element={<Navigate to="user/attendance" replace />} />
    </Routes>
  );
}

export default UserRoutes;
