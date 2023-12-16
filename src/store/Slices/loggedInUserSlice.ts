//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit'

export const loggedInUserSlice = createSlice({
  name: 'loggedInUserSlice',
  initialState: getInitialStateFromLocalStorage(),
  reducers: {
    setUser: (state, action) => {
      const { token, userData, refreshToken } = action.payload
      state.token = token
      state.userData = userData
      state.refreshToken = refreshToken
      setUserAndTokenLocalStorage(token, refreshToken, userData)
    },

    clearUser: (state) => {
      state.token = null
      state.refreshToken = null
      state.userData = userInitialState()
      clearLocalStorage()
    },
    setToken: (state, action) => {
      const { token, refreshToken } = action.payload
      state.token = token
      state.refreshToken = refreshToken
      setTokens(token, refreshToken)
    },
    setUserData: (state, action) => {
      const { userData } = action.payload
      state.userData = userData
      setUserDataToLocalStorage(userData)
    },
  },
})

export const { setUser, clearUser, setToken, setUserData } =
  loggedInUserSlice.actions

export default loggedInUserSlice.reducer

const setTokens = (token: any, refreshToken: string) => {
  localStorage.setItem('token', token)
  localStorage.setItem('refreshToken', refreshToken)
}

function setUserAndTokenLocalStorage(
  token: any,
  refreshToken: string,
  userData: any,
) {
  localStorage.setItem('userData', JSON.stringify(userData))
  localStorage.setItem('token', token)
  localStorage.setItem('refreshToken', refreshToken)
}

function setUserDataToLocalStorage(userData: any) {
  localStorage.setItem('userData', JSON.stringify(userData))
}

const clearLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userData')
}

function getInitialStateFromLocalStorage() {
  let token = null
  let refreshToken = null
  let userData = userInitialState()

  if (typeof localStorage !== 'undefined') {
    const tokenFromStorage = localStorage.getItem('token')
    const refreshTokenFromStorage = localStorage.getItem('refreshToken')
    const userDataString = localStorage.getItem('userData')
    const userDataFromStorage = !!userDataString
      ? JSON?.parse(userDataString)
      : null

    refreshToken = refreshTokenFromStorage || refreshToken
    token = tokenFromStorage || token
    userData = userDataFromStorage || userData
  }

  return {
    token: token,
    userData: userData,
    refreshToken: refreshToken,
  }
}

function userInitialState() {
  return {
    id: null,
    email: '',
    username: '',
    name: '',
    bio: '',
    profilePictureURL: '',
  }
}
