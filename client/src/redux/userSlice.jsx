import { createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "./actions";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: null,
        token: null,
        mes: '',
        guestInfo: null
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.guestInfo = null
        },
        logout: (state) => {
            state.current = null
            state.token = null
            state.mes = ''
            state.guestInfo = null
        },
        clearMessage: (state) => {
            state.mes = ''
        },
        guestRegister: (state, action) => {
            state.guestInfo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrent.fulfilled, (state, action) => {
            state.current = action.payload.user;
        });
        builder.addCase(getCurrent.rejected, (state, action) => {
            state.current = null;
            state.token = null
            state.mes = action.payload.mes
        });
    }
})
export const { login, logout, clearMessage } = userSlice.actions

export default userSlice.reducer