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
                            ?.filter(({userId}) => userId === payload.userId) ?? []
        },
        removeUser: (state) => {
            state.currentUser = null
            state.list = []
        },
        addNewCard: (state, {payload}) => {
            state.list.push(payload)
            localServices.addCardToLocal(payload)
        },
        addNewList: (state, {payload}) => {
            const list = payload.filter((card) => {
                const target = state.list.find(item => item.id === card.id)
                return !target
            })
            state.list = [...state.list, ...list]
            localServices.addListToLocal(payload)
        },
        removeCard: (state, {payload}) => {
            state.list = state.list.filter(({id}) => id !== payload)
            localServices.removeCardFromLocal(payload)
        },
        editCard: (state, {payload}) => {
            state.list = state.list.map((card) => card.id === payload.id ? payload : card)
            localServices.editCardInLocal(payload)
        }

    }
})

export const {authorizeUser, removeUser, addNewCard, removeCard, addNewList, editCard} = userSlice.actions
export default userSlice.reducer