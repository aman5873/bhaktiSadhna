import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logOutFunc } from "components/AuthForm/auth_api/authFunctions";
import ActivityLoader from "components/ActivityLoader";
import LogInForm from "./LogInForm";

function LogOutComp(props) {
  const { authRedirectUrl } = props;
  const navigate = useNavigate();
  logOutFunc()
  // useEffect(() => {
  //   logOutFunc();
  //   window.location.reload(false);
  //   // navigate('/auth/login', {
  //   //   replace: true,
  //   // });
  // }, []);
  // return <ActivityLoader isRefreshing={true} />;
}

export default LogOutComp;
