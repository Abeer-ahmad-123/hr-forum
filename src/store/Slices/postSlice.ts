import { PostsStateStore } from '@/utils/interfaces/posts'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    commentCount: {},
  } as PostsStateStore,

  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setCommentCountInStore: (state, action) => {
      state.commentCount = action.payload
    },

    IncreaseCommentCountInStore: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      state.commentCount[postId] = state.commentCount[postId] + 1
    },
  },
})

export const { setPosts, setCommentCountInStore, IncreaseCommentCountInStore } =
  posts.actions

export default posts.reducer
