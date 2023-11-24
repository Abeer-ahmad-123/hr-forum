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

   
  },
})

export const { setChannels } = channelsSlice.actions

export default channelsSlice.reducer
