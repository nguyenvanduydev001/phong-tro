import axios from "@/axios"

export const apiCreateNewComment = (data) =>
  axios({
    method: "post",
    url: "/comment/",
    data,
  })
export const apiGetComments = (pid) =>
  axios({
    method: "get",
    url: "/comment/" + pid,
  })
