import { createSlice } from "@reduxjs/toolkit"
import { getCategories, getDataVn, getOptions, getRoles } from "./actions"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roles: [],
    isLoading: false,
    isShowModal: false,
    modalContent: null,
    categories: null,
    datavn: [],
    prices: [],
    areas: [],
    isPaymentSuccess: false,
  },
  reducers: {
    toggleLoading: (state, action) => {
      state.isLoading = action.payload
    },
    modal: (state, action) => {
      state.isShowModal = action.payload.isShowModal
      state.modalContent = action.payload.modalContent
    },
    setPaymentStatus: (state, action) => {
      state.isPaymentSuccess = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(getDataVn.fulfilled, (state, action) => {
      state.datavn = action.payload
    })
    builder.addCase(getOptions.fulfilled, (state, action) => {
      state.prices = action.payload.prices
      state.areas = action.payload.areas
    })
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.roles = action.payload
    })
  },
})
export const { toggleLoading, modal, setPaymentStatus } = appSlice.actions

export default appSlice.reducer
