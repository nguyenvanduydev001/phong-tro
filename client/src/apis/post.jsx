import axios from "../axios"

export const apiCreateNewPost = (data) =>
  axios({
    method: "post",
    url: "/post/new",
    data, 
  })
export const apiGetPosts = (params) =>
  axios({
    method: "get",
    url: "/post/",
    params,
  })
export const apiGetPostById = (pid) =>
  axios({
    method: "get",
    url: "/post/" + pid,
  })
export const apiUpdatePost = (data, pid) =>
  axios({
    method: "put",
    url: "/post/" + pid,
    data,
  })
export const apiDeletePost = (pid) =>
  axios({
    method: "delete",
    url: "/post/" + pid,
  })
export const apiCreateRequestExpired = (data) =>
  axios({
    method: "post",
    url: "/post/expired/",
    data,
  })
export const apiGetExpireds = (params) =>
  axios({
    method: "get",
    url: "/post/expired/",
    params,
  })
export const apiUpdateExpired = (data, id) =>
  axios({
    method: "put",
    url: "/post/expired/" + id,
    data,
  })
export const apiRemoveExpired = (id) =>
  axios({
    method: "delete",
    url: "/post/expired/" + id,
  })
export const apiUpdateWishlist = (pid) =>
  axios({
    method: "put",
    url: "/post/wishlist/" + pid,
  })
export const apiRatings = (data, pid) =>
  axios({
    method: "post",
    url: "/post/ratings/" + pid,
    data,
  })
