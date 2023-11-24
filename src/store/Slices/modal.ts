import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    setModalState: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})

export const { setModalState } = modalSlice.actions

export default modalSlice.reducer
