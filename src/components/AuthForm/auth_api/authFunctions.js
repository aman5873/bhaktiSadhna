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
  // window.dispatchEvent(new Event("tokenChange"));
}

export function setRefreshToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
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
      console.log(res);
      if (res.access) {
        setAuthorizationToken(res.access);
        return true;
      } else {
        saveAuthorizationToken(null);
        setRefreshToken(null);
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

// export async function sendOTP(phoneNumber, authRedirectUrl) {
//   let api_url =
//     authRedirectUrl && authRedirectUrl === "/admin/"
//       ? `${config.host}/accounts/send_otp/${phoneNumber}/?a=true`
//       : `${config.host}/accounts/send_otp/${phoneNumber}/`;

//   return axios.get(api_url).then((res) => {
//     return res.data;
//   });
// }

export async function sendRegistrationOtp(data) {
  const api_url = `${config.host}/register/`;

  console.log("send reg otp before sendRegistrationOtp ");
  return axios.post(api_url, data).then((res) => {
    console.log("send reg otp res ", res);
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
    console.log("validate reg otp res ", res);
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
    if (res.data.status) {
      console.log("login ", res);
      saveAuthorizationToken(res.data.access_token);
      saveRefreshToken(res.data.refresh_token);
    }
    return res.data;
  });
}

export async function logOutFunc() {
  const api_url = `${config.host}/logout/`;
  return checkIsAuthenticated().then((res) => {
    console.log("res refresh in logout.....");
    if (res) {
      axios
        .post(api_url)
        .then((res) => {
          console.log(" logout.....");
          saveAuthorizationToken(null);
        })
        .catch((error) => {
          console.warn(error);
          saveAuthorizationToken(null);
        });
    }
  });
}
