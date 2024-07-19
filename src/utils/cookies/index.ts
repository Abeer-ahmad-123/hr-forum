'use server'
import { cookies } from 'next/headers'
import { ResponseData, UserData, setTokenCookies } from '../interfaces/cookies'

export const setUserCookies = async (responseJson: ResponseData) => {
  const userData = responseJson.data.userData
  cookies().set('user-details', JSON.stringify(userData))
  cookies().set('access-token', responseJson.data.token)
  cookies().set('refresh-token', responseJson.data['refresh-token'])
}

export const removeUserCookies = async () => {
  cookies().delete('user-details')
  cookies().delete('access-token')
  cookies().delete('refresh-token')
}
export const setUserTokens = async (data: setTokenCookies) => {
  cookies().set('access-token', data.token)
  cookies().set('refresh-token', data['refresh-token'])
}

export const setModalCookie = async () => {
  cookies().set('modal', 'true')
}
export const deleteModalCookie = async () => {
  cookies().delete('modal')
}

export const getUserDetailsFromCookie = async () => {
  const user = await cookies().get('user-details')?.value
  return user ? JSON.parse(user) : null
}
export const setUserDetailsInCookie = async (user: UserData) => {
  await cookies().set('user-details', JSON.stringify(user))
}

export const getUserFromCookie = async () => {
  const userDetails = await getUserDetailsFromCookie()
  const token = await cookies().get('access-token')
  const refreshToken = await cookies().get('refresh-token')
  return {
    token: token?.value || '',
    user: userDetails || {
      id: null,
      email: '',
      username: '',
      name: '',
      bio: '',
      profilePictureURL: '',
      backgroundPictureURL: '',
    },
    refreshToken: refreshToken?.value || '',
  }
}
