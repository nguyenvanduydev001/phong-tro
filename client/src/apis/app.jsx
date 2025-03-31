import axios from "../axios"
import instance from "axios"

export const apiGetCategories = () =>
  axios({
    method: "get",
    url: "/common/category/",
  })
export const apiGetOptions = () =>
  axios({
    method: "get",
    url: "/common/options/",
  })
export const apiGetRoles = () =>
  axios({
    method: "get",
    url: "/common/roles/",
  })
export const apiUpdateViews = (data) =>
  axios({
    method: "put",
    url: "/common/views/",
    data,
  })
export const apiGetDashboard = (params) =>
  axios({
    method: "get",
    url: "/common/dashboard/",
    params,
  })
export const apiGetProvinces = () =>
  instance({
    method: "get",
    url: "https://vietnam-administrative-division-json-server-swart.vercel.app/province",
  })
export const apiGetDistrictsFromProvinceId = (id) =>
  instance({
    method: "get",
    url: `https://vietnam-administrative-division-json-server-swart.vercel.app/district/?idProvince=${id}`,
  })
export const apiGetWardsFromDistrictId = (id) =>
  instance({
    method: "get",
    url: `https://vietnam-administrative-division-json-server-swart.vercel.app/commune/?idDistrict=${id}`,
  })
export const apiUploadImageCloudinary = (data) =>
  instance({
    method: "post",
    url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
    data,
  })
export const apiGetLongtitudeAndLatitudeFromAddress = (address) =>
  instance({
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${
      import.meta.env.VITE_API_GEOAPIFY
    }`,
  })
