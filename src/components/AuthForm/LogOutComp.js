import React from "react";

import { logOutFunc } from "components/AuthForm/auth_api/authFunctions";
import ActivityLoader from "components/ActivityLoader";

function LogOutComp() {
  logOutFunc();

  return <ActivityLoader isRefreshing={true} />;
}

export default LogOutComp;
