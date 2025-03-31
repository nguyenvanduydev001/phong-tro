import axios from "@/axios"

export const apiGetResponseChatbot = (data) =>
  axios({
    method: "post",
    url: "/message/",
    data,
  })
