import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { logOutFunc } from "components/AuthForm/auth_api/authFunctions";
import ActivityLoader from "components/ActivityLoader";

function LogOutComp(props) {
  // const { authRedirectUrl } = props;
  // const navigate = useNavigate();
  logOutFunc();
  // useEffect(() => {
  //   logOutFunc().then((res) => {
  //     if (res) {
  //       console.log("logout res here.....", res);
  //       navigate(`${authRedirectUrl}`, {
  //         replace: true,
  //       });
  //     }
  //   });
  // }, []);
  return <ActivityLoader isRefreshing={true} />;
}

export default LogOutComp;
