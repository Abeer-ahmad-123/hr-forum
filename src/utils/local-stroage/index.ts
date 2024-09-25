import { userData } from '../interfaces/userData'

export const getTokens = () => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('token') ?? ''
    const refreshToken = localStorage.getItem('refreshToken') ?? ''
    return { accessToken, refreshToken }
  }
  return { accessToken: '', refreshToken: '' }
}

export const getUserData = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('userData')
    const parsedUser: userData = !!user ? JSON.parse(user) : null
    return parsedUser
  }
}

export const setValueToLocalStoage = (key: string, value: string) => {
  localStorage.setItem(key, key === 'userData' ? JSON.stringify(value) : value)
}
export const removeLocalStroage = () => {
  localStorage.clear()
}
