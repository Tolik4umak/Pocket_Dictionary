import { createSlice, current } from "@reduxjs/toolkit";
import localServices from '../services'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        list: [],
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
            state.list.unshift(payload)
            localServices.addCardToLocal(payload)
        },
        addNewList: (state, {payload}) => {
            const list = payload.filter((card) => {
                const target = state.list.find(item => item.id === card.id)
                return !target
            })
            state.list = [ ...list, ...state.list]
            localServices.addListToLocal(payload)
        },
        removeCard: (state, {payload}) => {
            state.list = state.list.filter(({id}) => id !== payload.id)
            localServices.removeCardFromLocal(payload)
        },
        editCard: (state, {payload}) => {
            state.list = state.list.map((card) => card.id === payload.id ? payload : card)
            localServices.editCardInLocal(payload)
        },
        refreshUserScore: (state, {payload}) => {
            const {correct , wrong} = state.currentUser.userScore ?? {correct: 0, wrong: 0}
            
            if((correct - wrong < payload.correct - payload.wrong) || (correct === 0 && wrong === 0)){
                state.currentUser = {...state.currentUser, userScore: payload}
                localServices.refreshUserScoreLocal(state.currentUser.userId , payload)
            }
        }

    }
})

export const {authorizeUser, removeUser, addNewCard, removeCard, addNewList, editCard, refreshUserScore} = userSlice.actions
export default userSlice.reducer