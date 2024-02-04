import channelsReducer from '@/store/Slices/channelsSlice'
import darkModeReducer from '@/store/Slices/colorModeSlice'
import DropDownReducer from '@/store/Slices/dropDownSlice'
import loadingIndicatorReducer from '@/store/Slices/loadingIndicator'
import loggedInUserReducer from '@/store/Slices/loggedInUserSlice'
import modalSliceReducer from '@/store/Slices/modal'
import notFoundReducer from '@/store/Slices/not-found'
import postReducer from '@/store/Slices/postSlice'
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
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, darkModeReducer)

const store = configureStore({
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
