import channelsReducer from '@/store/Slices/channelsSlice'
import darkModeReducer from '@/store/Slices/colorModeSlice'
import DropDownReducer from '@/store/Slices/dropDownSlice'
import loadingIndicatorReducer from '@/store/Slices/loadingIndicator'
import loggedInUserReducer from '@/store/Slices/loggedInUserSlice'
import modalSliceReducer from '@/store/Slices/modal'
import notFoundReducer from '@/store/Slices/not-found'
import postReducer from '@/store/Slices/postSlice'
// import { getCookie, removeCookie, setCookie } from '@/utils/helper/cookies'
import { configureStore } from '@reduxjs/toolkit'

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

export const createNoopStorage = () => ({
  async getItem(_key: string) {
    // return JSON.parse((await getCookie(_key)) ?? '{}')
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('OK')
      }, 4000)
    })
    // return localStorage.getItem(_key)
  },
  async setItem(_key: string, value: any) {
    // return await setCookie(_key, JSON.stringify(value))
    // return Promise.resolve()
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('OK')
      }, 4000)
    })
  },
  async removeItem(_key: string) {
    // return await removeCookie(_key)
    // return Promise.resolve()
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('OK')
      }, 4000)
    })
  },
})

export const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, darkModeReducer)

const store = configureStore({
  reducer: {
    // colorMode: persistedReducer,
    modal: modalSliceReducer,
    dropDown: DropDownReducer,
    loggedInUser: loggedInUserReducer,
    loadingIndicator: loadingIndicatorReducer,
    channels: channelsReducer,
    posts: postReducer,
    notFound: notFoundReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const initializeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      colorMode: persistedReducer,
      modal: modalSliceReducer,
      dropDown: DropDownReducer,
      loggedInUser: loggedInUserReducer,
      loadingIndicator: loadingIndicatorReducer,
      channels: channelsReducer,
      posts: postReducer,
      notFound: notFoundReducer,
    },
    preloadedState,
  })
}
