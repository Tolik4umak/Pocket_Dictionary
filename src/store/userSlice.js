import { createSlice } from "@reduxjs/toolkit";
import localServices from '../services'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        list: []
    },
    reducers: {
        authorizeUser: (state, {payload}) => {
            state.currentUser = payload
            state.list = localServices.readLocal()?.dictionary
                            .filter(({userId}) => userId === payload.userId)
        },
        removeUser: (state) => {
            state.currentUser = null
            state.list = null
        },
        addNewCard: (state, {payload}) => {
            state.list.push(payload)
            localServices.addCardToLocal(payload)
        }
    }
})

export const {authorizeUser, removeUser, addNewCard} = userSlice.actions
export default userSlice.reducer