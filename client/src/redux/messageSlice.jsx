import { createSlice } from "@reduxjs/toolkit"
import { getResponseChatbot } from "./actions"

export const messegeSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    isPending: false,
    currentCode: null,
    dataChatbot: {},
    isStart: false,
  },
  reducers: {
    sendMessagesUser: (state, actions) => {
      state.messages = [...state.messages, { text: actions.payload.text }]
      state.isPending = true
    },
    sendMessagesBot: (state, actions) => {
      state.isPending = false
      state.messages = actions.payload.messeges
        ? [
            ...state.messages,
            actions.payload.messages?.map((el) => ({
              text: el.text,
              postcard: el.postcard,
              classname: el.classname,
              isBot: true,
              list: el.list,
            })),
          ]
        : state.messages
    },
    reset: (state) => {
      state.messages = []
      state.dataChatbot = {}
      state.isStart = false
    },
    isPending: (state, action) => {
      state.isPending = action.payload
    },
    setCurrentCode: (state, action) => {
      state.currentCode = action.payload.code
    },
    updateDataChatbot: (state, action) => {
      state.dataChatbot = { ...state.dataChatbot, ...action.payload }
    },
    start: (state) => {
      state.isStart = true
    },
    end: (state) => {
      state.isStart = false
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getResponseChatbot.fulfilled, (state, actions) => {
      state.isPending = false
      state.messages = actions.payload
        ? [
            ...state.messages,
            ...actions.payload?.map((el) => ({
              text: el.text,
              postcard: el.postcard,
              className: el.className,
              isBot: true,
              list: el.list,
              options: el.options,
              selects: el.selects,
              filterCode: el.filterCode,
            })),
          ]
        : state.messages
      state.currentCode = actions.payload?.find((el) => el.code !== undefined)?.code
    })
  },
})
export const { sendMessagesUser, updateDataChatbot, sendMessagesBot, reset, isPending, setCurrentCode, start, end } =
  messegeSlice.actions

export default messegeSlice.reducer
