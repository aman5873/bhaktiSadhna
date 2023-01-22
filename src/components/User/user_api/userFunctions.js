import axios from "axios";
import * as config from "config";
import {
  refreshAuthToken,
  saveAuthorizationToken,
} from "components/AuthForm/auth_api/authFunctions";

export async function getAttendance(data) {
  const api_url = `${config.host}/attendence/`;
  const refresh = localStorage.getItem("refresh_token");

  return refreshAuthToken(refresh).then((res) => {
    if (res.data.status) {
      return axios
        .post(api_url, data, {
          headers: {
            Authorization: `Token ${res.data.data.access}`,
          },
        })
        .then((res) => {
          return res.data;
        });
    }
  });
}

export async function markTodayAttendance(data) {
  const api_url = `${config.host}/attendence/`;
  const refresh = localStorage.getItem("refresh_token");

  if (refresh) {
    refreshAuthToken(refresh).then((res) => {
      if (res.data.status) {
        axios
          .post(api_url, data, {
            headers: {
              Authorization: `Token ${res.data.data.access}`,
            },
          })
          .then((res) => {
            if (res) {
              console.log("Here ........", res);
              return res;
            }
          })
          .catch((error) => {
            console.warn(error);
          });
      }
    });
  }
}
