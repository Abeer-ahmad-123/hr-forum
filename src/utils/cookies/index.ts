'use server'
import { cookies } from 'next/headers'
import { ResponseData, UserData, setTokenCookies } from '../interfaces/cookies'
import { revalidatePath } from 'next/cache'

export const setUserCookies = async (responseJson: ResponseData) => {
  const userData = responseJson.data.userData
  cookies().set('userData', JSON.stringify(userData))
  cookies().set('token', responseJson.data.token)
  cookies().set('refreshToken', responseJson.data['refresh-token'])
}

export const removeUserCookies = async () => {
  cookies().delete('userData')
  cookies().delete('token')
  cookies().delete('refreshToken')
  revalidatePath('/')
}
export const setUserTokens = async (data: setTokenCookies) => {
  cookies().set('token', data.token)
  cookies().set('refreshToken', data['refresh-token'])
}

export const setModalCookie = async () => {
  cookies().set('modal', 'true')
}
export const deleteModalCookie = async () => {
  cookies().delete('modal')
}

export const getUserDetailsFromCookie = async () => {
  const user = await cookies().get('userData')?.value
  return user ? JSON.parse(user) : null
}
export const setUserDetailsInCookie = async (user: UserData) => {
  await cookies().set('userData', JSON.stringify(user))
}

export const getUserFromCookie = async () => {
  const userDetails = await getUserDetailsFromCookie()
  const token = await cookies().get('token')
  const refreshToken = await cookies().get('refreshToken')
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
