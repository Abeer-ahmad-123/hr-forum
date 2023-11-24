import { createSlice } from '@reduxjs/toolkit'

export const darkModeSlice = createSlice({
  name: 'darkModeSlice',
  initialState: {
    darkMode: false,
    color: '',
  },
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setColor: (state, action) => {
      state.color = action.payload
    },
  },
})

export const { setDarkMode, setColor } = darkModeSlice.actions

export default darkModeSlice.reducer
