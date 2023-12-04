import { createSlice } from '@reduxjs/toolkit'

export const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState: {
    channels: [],
    channelsKeyValuePair: {},
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
    },
    setKeyIdPairData: (state, action) => {
      state.channelsKeyValuePair = action.payload
    },
  },
})

export const { setChannels, setKeyIdPairData } = channelsSlice.actions

export default channelsSlice.reducer
