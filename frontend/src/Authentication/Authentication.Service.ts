import { BehaviorSubject } from "rxjs";
import axiosInstance from "../Core/Axios";

//Environment Variales
import { config } from '../environment';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem(config.LS) || "{}")
);

function getUserData() {
  return JSON.parse(localStorage.getItem(config.LS) || "{}");
}

export const authenticationService = {
  login,
  logout,
  isLoggedIn,
  getUserData,
  // currentUser: currentUserSubject.asObservable(),
  // get currentUserValue() {
  //   return currentUserSubject.value;
  // },
};

function login(accessToken, provider) {
  let data = {
    accessToken: accessToken,
    provider: provider,
  };

  return axiosInstance
    .post("/socialLogin", data)
    .then(function (response) {
      localStorage.setItem(config.LS, JSON.stringify(response.data.data));
      // currentUserSubject.next(response.data.data);

      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

  function isLoggedIn(): boolean {
    if (!isEmpty(getUserData())) return true;
    return false;
  }

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(config.LS);
    // currentUserSubject.next(null);
  }