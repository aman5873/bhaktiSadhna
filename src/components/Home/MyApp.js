import React, { useState } from "react";

const { innerHeight } = window;
function MyApp() {
  // Login screen demo data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h3>MyApp Page ...............</h3>
      <h3>{innerHeight}</h3>
    </>
  );
}

export default MyApp;
