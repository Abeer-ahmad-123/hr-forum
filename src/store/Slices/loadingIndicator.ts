import { createSlice } from '@reduxjs/toolkit'

export const loadingIndicatorSlice = createSlice({
  name: 'loadingIndicatorSlice',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoadingIndicator: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setLoadingIndicator } = loadingIndicatorSlice.actions

export default loadingIndicatorSlice.reducer
