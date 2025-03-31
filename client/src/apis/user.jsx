import axios from "../axios"

export const apiRegister = (data) =>
  axios({
    method: "post",
    url: "/user/register",
    data,
  })
export const apiLogin = (data) =>
  axios({
    method: "post",
    url: "/user/login",
    data,
  })
export const apiGetCurrent = () =>
  axios({
    method: "get",
    url: "/user/current",
  })
export const apiUpdateProfile = (data) =>
  axios({
    method: "put",
    url: "/user/current",
    data,
  })
export const apiCheckPassword = (data) =>
  axios({
    method: "post",
    url: "/user/confirm",
    data,
  })
export const apiResetPassword = (data) =>
  axios({
    method: "put",
    url: "/user/change-pass",
    data,
  })
export const apiGetUsers = (params) =>
  axios({
    method: "get",
    url: "/user/",
    params,
  })
export const apiUpdateUser = (data, uid) =>
  axios({
    method: "put",
    url: "/user/" + uid,
    data,
  })
export const apiDeleteUser = (uid) =>
  axios({
    method: "delete",
    url: "/user/" + uid,
  })
export const apiSendOtp = (data) =>
  axios({
    method: "post",
    url: "/user/send-otp",
    data,
  })
export const apiVerifyOtp = (data) =>
  axios({
    method: "post",
    url: "/user/verify-otp",
    data,
  })
