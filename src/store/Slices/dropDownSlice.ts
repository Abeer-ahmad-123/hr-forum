import { createSlice } from '@reduxjs/toolkit'

export const dropDownSlice = createSlice({
  name: 'dropDownSlice',
  initialState: {
    checked: false,
  },
  reducers: {
    setChecked: (state, action) => {
      state.checked = action.payload
    },
  },
})

export const { setChecked } = dropDownSlice.actions

export default dropDownSlice.reducer
