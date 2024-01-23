import { createSlice } from '@reduxjs/toolkit'

export const notFoundSlice = createSlice({
  name: 'notFoundSlice',
  initialState: {
    notFound: false,
  },
  reducers: {
    setNotFound: (state) => {
      state.notFound = true
    },
  },
})

export const { setNotFound } = notFoundSlice.actions

export default notFoundSlice.reducer
