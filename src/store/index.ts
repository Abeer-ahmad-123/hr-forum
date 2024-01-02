import channelsReducer from '@/store/Slices/channelsSlice'
import darkModeReducer from '@/store/Slices/colorModeSlice'
import DropDownReducer from '@/store/Slices/dropDownSlice'
import loadingIndicatorReducer from '@/store/Slices/loadingIndicator'
import loggedInUserReducer from '@/store/Slices/loggedInUserSlice'
import modalSliceReducer from '@/store/Slices/modal'
import postReducer from '@/store/Slices/postSlice'
import { configureStore } from '@reduxjs/toolkit'

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
