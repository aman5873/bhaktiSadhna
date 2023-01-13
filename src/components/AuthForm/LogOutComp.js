import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logOutFunc } from "components/AuthForm/auth_api/authFunctions";
import ActivityLoader from "components/ActivityLoader";

function LogOutComp(props) {
  const { authRedirectUrl } = props;
  const navigate = useNavigate();

  useEffect(() => {
    logOutFunc();
    // window.location.reload(false);
    navigate(`${authRedirectUrl}`, {
      replace: true,
    });
  }, []);
  return <ActivityLoader isRefreshing={true} />;
}

export default LogOutComp;
