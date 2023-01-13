import axios from "axios";

import * as config from "config";

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       saveAuthorizationToken(null);
//       saveRefreshToken(null);
//     }
//     return error;
//   }
// );

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
export function saveAuthorizationToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  setAuthorizationToken(token);
  window.dispatchEvent(new Event("tokenChange"));
}

export function setRefreshToken(token) {
  if (token) {
    axios.defaults.headers.common["refresh_token"] = `token ${token}`;
  } else {
    delete axios.defaults.headers.common["refresh_token"];
  }
}
export function saveRefreshToken(refresh_token) {
  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
  } else {
    localStorage.removeItem("refresh_token");
  }
  setRefreshToken(refresh_token);
}

export async function validateAuthToken(token) {
  const data = { refresh: token };
  const api_url = `${config.host}/login_refresh/`;
  return axios.post(api_url, data).then((res) => {
    return res.data;
  });
}
export async function isValidAuthToken(authToken) {
  if (authToken) {
    return validateAuthToken(authToken).then((res) => {
      if (res.access) {
        setAuthorizationToken(res.access);
        return true;
      } else {
        saveAuthorizationToken(null);
        saveRefreshToken(null);
        return false;
      }
    });
  } else {
    return false;
  }
}
export async function checkIsAuthenticated() {
  const authToken = localStorage.getItem("refresh_token");
  return isValidAuthToken(authToken);
}

export async function sendRegistrationOtp(data) {
  const api_url = `${config.host}/register/`;

  localStorage.removeItem("token");
  return axios.post(api_url, data).then((res) => {
    if (res.data.status) {
      saveAuthorizationToken(res.data.token);
    }
    return res.data;
  });
}
export async function validateRegistrationOtp(otp) {
  const data = { otp: otp };
  const api_url = `${config.host}/registration_otp/`;
  return axios.post(api_url, data).then((res) => {
    if (res.status) {
      saveAuthorizationToken(res.data.access_token);
      saveRefreshToken(res.data.refresh_token);
    }
    return res.data;
  });
}
export async function sendForgotPasswordOtp(email) {
  const data = { email: email };
  const api_url = `${config.host}/forget_password/`;
  return axios.post(api_url, data).then((res) => {
    if (res.data.status) {
      saveAuthorizationToken(res.data.token);
    }
    return res.data;
  });
}
export async function validateForgotPasswordOtp(otp) {
  const data = { otp: otp };
  const api_url = `${config.host}/forget_password_otp/`;
  return axios.post(api_url, data).then((res) => {
    if (res.data.status) {
      saveAuthorizationToken(res.data.access_token);
      saveRefreshToken(res.data.refresh_token);
    }
    return res.data;
  });
}
export async function logIn(data) {
  const api_url = `${config.host}/login/`;

  return axios.post(api_url, data).then((res) => {
    console.log("login response ......", res);
    if (res.data.status) {
      saveAuthorizationToken(res.data.access_token);
      saveRefreshToken(res.data.refresh_token);
      return true;
    }
    return false;
  });
}

export async function logOutFunc() {
  // console.log("logout .......... ");
  // saveAuthorizationToken(null);
  // saveRefreshToken(null);

  const api_url = `${config.host}/logout/`;
  const refresh = localStorage.getItem("refresh_token");
  const data = { refresh_token: refresh };

  let isRefreshed = false;
  if (refresh) {
    isRefreshed = validateAuthToken(refresh).then((res) => {
      if (res.access) {
        saveAuthorizationToken(res.access);
        return true;
      } else {
        saveAuthorizationToken(null);
        saveRefreshToken(null);
        return false;
      }
    });
  }
  console.log("isRefreshed ", isRefreshed);

  if (isRefreshed) {
    axios
      .post(api_url, data)
      .then((res) => {
        console.log(" logout..... api res", res);
        if (res.data.status) {
          saveAuthorizationToken(null);
          saveRefreshToken(null);
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.warn(error);
        saveAuthorizationToken(null);
        saveRefreshToken(null);
      });
  }
}
