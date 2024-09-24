import { userData } from '../interfaces/userData'

export const getTokens = () => {
  const accessToken = localStorage.getItem('token') ?? ''
  const refreshToken = localStorage.getItem('refreshToken') ?? ''
  return { accessToken, refreshToken }
}

export const getUserData = () => {
  const user = localStorage.getItem('userData')
  const parsedUser: userData = !!user ? JSON.parse(user) : null
  return { user: parsedUser }
}

export const setUserData = (user: any) => {
  localStorage.setItem('userData', JSON.stringify(user))
}
