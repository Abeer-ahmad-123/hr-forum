//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit'

export const loggedInUserSlice = createSlice({
  name: 'loggedInUserSlice',
  initialState: getInitialStateFromLocalStorage(),
  reducers: {
    setUser: (state, action) => {
      const { token, userData } = action.payload
      state.token = token
      state.userData = userData
      setUserandTokenLocalStorage(token, userData)
    },

    clearUser: (state) => {
      state.token = null
      state.userData = EmptyInitialState()
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
    },
  },
})

export const { setUser, clearUser } = loggedInUserSlice.actions

export default loggedInUserSlice.reducer

function setUserandTokenLocalStorage(token: any, userData: any) {
  // localStorage.setItem('userData', JSON.stringify(userData))
  // localStorage.setItem('token', token)
}

function getInitialStateFromLocalStorage() {
  let token = null;
  let userData = EmptyInitialState();

  if(typeof localStorage !== 'undefined') {
    const tokenFromStorage = localStorage.getItem('token');
    const userDataString = localStorage.getItem('userData');
    const userDataFromStorage = !userDataString ? JSON.parse(userDataString) : null;

    token = tokenFromStorage || token;
    userData = userDataFromStorage || userData;
  }

  return {
    token: token,
    userData: userData,
  };
}


function EmptyInitialState() {
  return {
    id: null,
    email: '',
    username: '',
    name: '',
    bio: '',
    profilePictureURL: '',
  }
}
