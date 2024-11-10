import axios from "axios";

// store user data and token in local storage
export const doLoginLocalStorage = (user, token, refreshToken) => {
  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
};

// get user data from local storage
export const getUserFromLocalStorage = () => {
  const data = localStorage.getItem("userData");
  if (data !== null) {
    return JSON.parse(data);
  } else {
    return null;
  }
};

// get token from local storage
export const getTokenFromLocalStorage = () => {
  const data = localStorage.getItem("token");
  if (data !== null) {
    return JSON.parse(data);
  } else {
    return null;
  }
};

// check user is logged in or not
export const isLoggedIn = () => {
  if (getTokenFromLocalStorage() !== null) {
    return true;
  } else {
    return false;
  }
};

export const isAdminUser = () => {
  if (isLoggedIn) {
    // const roles = getUserFromLocalStorage()?.roles;
    // if (roles.find((role) => role.roleName === "ROLE_ADMIN")) {
    const roles = getUserFromLocalStorage()?.userName;
    if (roles === "tuan") {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

// Logout API call
export const logoutUser = async () => {
  const tokenObject = JSON.parse(localStorage.getItem("token"));
  const token = tokenObject?.token;
  const response = await axios.post(
    "http://localhost:8080/api/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// remove user data and token from local storage
export const doLogoutLocalStorage = async () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
