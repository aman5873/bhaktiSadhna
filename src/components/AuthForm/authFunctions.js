import axios from "axios";

import * as config from "config";

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       saveAuthorizationToken(null);
//     }
//     return error;
//   }
// );

// export function setAuthorizationToken(token) {
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `token ${token}`;
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//   }
// }

// export function saveAuthorizationToken(token) {
//   if (token) {
//     localStorage.setItem("token", token);
//   } else {
//     localStorage.removeItem("token");
//   }
//   setAuthorizationToken(token);
//   window.dispatchEvent(new Event("tokenChange"));
// }

// export async function checkPhoneNumber(phoneNumber) {
//   const api_url = `${config.host}/accounts/check_phone/${phoneNumber}/`;
//   return axios.get(api_url).then((res) => {
//     return res.data;
//   });
// }

// export async function validateAuthToken(token) {
//   const api_url = `${config.host}/accounts/validate_token/${token}/`;
//   return axios.get(api_url).then((res) => {
//     return res.data;
//   });
//   return {
//     status: true,
//     is_valid: false,
//   };
// }

// export async function isValidAuthToken(authToken) {
//   if (authToken) {
//     return validateAuthToken(authToken).then((res) => {
//       if (res.status) {
//         if (res.is_valid) {
//           setAuthorizationToken(authToken);
//           return true;
//         } else {
//           saveAuthorizationToken(null);
//           return false;
//         }
//       }
//     });
//   } else {
//     return false;
//   }
// }

export async function checkIsAuthenticated() {
  const authToken = localStorage.getItem("token");
  console.log("authToken ---", authToken);
  return false;
}

// export async function sendOTP(phoneNumber) {
//   const api_url = `${config.host}/accounts/send_otp/${phoneNumber}/?a=true`;
//   return axios.get(api_url).then((res) => {
//     return res.data;
//   });
// }

// export async function logIn(phoneNumber, otp) {
//   const api_url = `${config.host}/accounts/login/`;
//   const data = {
//     phone: phoneNumber,
//     otp: otp,
//   };
//   return axios.post(api_url, data).then((res) => {
//     if (res.data.status) {
//       saveAuthorizationToken(res.data.token);
//     }
//     return res.data;
//   });
// }

// export async function logOutFunc() {
//   const api_url = `${config.host}/accounts/logout/`;
//   axios
//     .get(api_url)
//     .then((res) => {
//       saveAuthorizationToken(res.token);
//     })
//     .catch((error) => {
//       console.warn(error);
//       saveAuthorizationToken(null);
//     });
// }
