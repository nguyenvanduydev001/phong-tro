import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiGetCurrent } from "@/apis/user"
import { apiGetCategories, apiGetOptions, apiGetProvinces, apiGetRoles, apiUpdateViews } from "@/apis/app"
import { apiGetResponseChatbot } from "@/apis/chatbot"

export const getCurrent = createAsyncThunk("user/current", async (data, { rejectWithValue }) => {
  const response = await apiGetCurrent()
  if (!response.success) return rejectWithValue(response)
  return response || {}
})
export const getRoles = createAsyncThunk("app/roles", async (data, { rejectWithValue }) => {
  const response = await apiGetRoles()
  if (!response.success) return rejectWithValue(response)
  return response.roles || []
})
export const getCategories = createAsyncThunk("app/categories", async (data, { rejectWithValue }) => {
  const response = await apiGetCategories()
  if (!response.success) return rejectWithValue(response)
  return response.categories || []
})
export const getOptions = createAsyncThunk("app/options", async (data, { rejectWithValue }) => {
  const response = await apiGetOptions()
  if (!response.success) return rejectWithValue(response)
  return response.options || []
})
export const getDataVn = createAsyncThunk("app/datavn", async (data, { rejectWithValue }) => {
  const response = await apiGetProvinces()
  if (response.status !== 200) return rejectWithValue(response)
  return response?.data || []
})
export const getResponseChatbot = createAsyncThunk("messege/chatbot", async (data, { rejectWithValue }) => {
  const response = await apiGetResponseChatbot(data)
  if (!response.success) return rejectWithValue(response)
  return response.messages || []
})
// export const updateViews = createAsyncThunk("app/views", async (data, { rejectWithValue }) => {
//   const response = await apiUpdateViews(data)
//   if (!response.success) return rejectWithValue(response)
//   return response.messages || []
// })
