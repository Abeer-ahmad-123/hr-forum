import { createSlice } from '@reduxjs/toolkit'

export const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
  },
})

export const { setPosts } = posts.actions

export default posts.reducer
