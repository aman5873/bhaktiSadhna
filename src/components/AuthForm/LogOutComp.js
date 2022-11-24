import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logOutFunc } from "components/AuthForm/auth_api/authFunctions";

function LogOutComp(props) {
  const { authRedirectUrl } = props;
  const navigate = useNavigate();
  useEffect(() => {
    logOutFunc();
    navigate(authRedirectUrl, { replace: true });
  }, []);
  return <div>Logging Out....</div>;
}

export default LogOutComp;
