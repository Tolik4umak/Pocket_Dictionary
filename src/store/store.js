import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig ={
    key: 'user',
    version: 1,
    storage
}

const persistedUserReducer = persistReducer(persistConfig, userSlice)


const store = configureStore({
    reducer: {
        user: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store