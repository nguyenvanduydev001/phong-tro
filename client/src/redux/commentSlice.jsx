import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "comment",
  initialState: {
    updateComments: false,
  },
  reducers: {
    render: (state) => {
      state.updateComments = !state.updateComments
    },
  },
})
export const { render } = appSlice.actions

export default appSlice.reducer
