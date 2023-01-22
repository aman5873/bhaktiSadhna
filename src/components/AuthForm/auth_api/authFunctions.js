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

export function saveAuthorizationToken(token) {
  if (token) {
    localStorage.setItem("access_token", token);
  } else {
    localStorage.removeItem("access_token");
  }
}

export function saveRefreshToken(refresh_token) {
  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
  } else {
    localStorage.removeItem("refresh_token");
  }
  window.dispatchEvent(new Event("tokenChange"));
}

export async function checkIsAuthenticated() {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken ? true : false;
}

export async function refreshAuthToken(token) {
  const data = { refresh: token };
  const api_url = `${config.host}/login_refresh/`;
  return axios.post(api_url, data);
}

export async function sendRegistrationOtp(data) {
  const api_url = `${config.host}/register/`;
  return axios.post(api_url, data).then((res) => {
    saveAuthorizationToken(res.data.data.token);
    return res;
  });
}

export async function validateRegistrationOtp(otp) {
  const data = { otp: otp };
  const api_url = `${config.host}/registration_otp/`;
  const headers = {
    Authorization: `token ${localStorage.getItem("access_token")}`,
  };
  return axios.post(api_url, data, { headers: headers }).then((res) => {
    saveRefreshToken(res.data.data.refresh_token);
    localStorage.setItem("isAuthenticated", "true");
    return res;
  });
}
export async function sendForgotPasswordOtp(email) {
  const data = { email: email };
  const api_url = `${config.host}/forget_password/`;

  return axios.post(api_url, data).then((res) => {
    if (res.data.status) {
      saveAuthorizationToken(res.data.token);
    }
  });
}
export async function validateForgotPasswordOtp(otp) {
  const data = { otp: otp };
  const api_url = `${config.host}/forget_password_otp/`;
  const headers = {
    Authorization: `token ${localStorage.getItem("access_token")}`,
  };
  return axios.post(api_url, data, { headers: headers }).then((res) => {
    if (res.data.status) {
      saveAuthorizationToken(res.data.access_token);
      saveRefreshToken(res.data.refresh_token);
      localStorage.setItem("isAuthenticated", true);
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
      localStorage.setItem("isAuthenticated", true);
      return true;
    }
    return false;
  });
}

export async function logOutFunc() {
  // saveAuthorizationToken(null);
  // saveRefreshToken(null);

  console.log("logging out................");
  const api_url = `${config.host}/logout/`;
  const refresh = localStorage.getItem("refresh_token");
  const data = { refresh_token: refresh };

  if (refresh) {
    refreshAuthToken(refresh).then((res) => {
      if (res.data.status) {
        saveAuthorizationToken(res.data.data.access);
        let headers = {
          Authorization: `token ${res.data.data.access}`,
        };
        axios
          .post(api_url, data, {
            headers: {
              Authorization: `Token ${res.data.data.access}`,
            },
          })
          .then((res) => {
            if (res.data.status) {
              console.log(res);
              saveAuthorizationToken(null);
              saveRefreshToken(null);
              return true;
            } else return false;
          })
          .catch((error) => {
            console.warn(error);
          });
      }
    });
  }
}
