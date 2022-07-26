import  userReducer  from "../features/userSlice";
import  videoReducer  from "../features/videoSlice";
import  commentReducer  from "../features/commentSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

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
  
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers(
    {
      user:userReducer,
      video: videoReducer,
      comment: commentReducer
    }
  )

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)