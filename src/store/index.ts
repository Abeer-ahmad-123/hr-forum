import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from '@/store/Slices/colorModeSlice'
import modalSliceReducer from '@/store/Slices/modal'
import DropDownReducer from './Slices/dropDownSlice'
import loggedInUserReducer from './Slices/loggedInUserSlice'
import loadingIndicatorReducer from './Slices/loadingIndicator'
import channelsReducer from './Slices/channelsSlice'
import postReducer from './Slices/postSlice'

const store = configureStore({
  reducer: {
    colorMode: darkModeReducer,
    modal: modalSliceReducer,
    dropDown: DropDownReducer,
    loggedInUser: loggedInUserReducer,
    loadingIndicator: loadingIndicatorReducer,
    channels: channelsReducer,
    posts: postReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
