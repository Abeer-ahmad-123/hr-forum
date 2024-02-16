import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: {
    isModalOpen: false,
    feedModal: false,
  },
  reducers: {
    setModalState: (state, action) => {
      state.isModalOpen = action.payload
    },
    setFeedModal: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})

export const { setModalState, setFeedModal } = modalSlice.actions

export default modalSlice.reducer
