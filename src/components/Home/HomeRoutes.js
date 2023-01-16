import React from "react";

import { Routes, Route } from "react-router-dom";

import MyApp from "./MyApp";
function HomeRoutes() {
  return (
    <Routes>
      <Route path={"/*"} element={<MyApp />} />
    </Routes>
  );
}

export default HomeRoutes;
