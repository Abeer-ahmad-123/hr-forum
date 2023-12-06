import { createSlice } from '@reduxjs/toolkit'

export const darkModeSlice = createSlice({
  name: 'darkModeSlice',
  initialState: {
    darkMode: false,
  },
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
  },
})

export const { setDarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer
