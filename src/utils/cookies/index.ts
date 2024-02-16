import { cookies } from 'next/headers'
import { ResponseData, setTokenCookies } from '../interfaces/cookies'

export const setUserCookies = (responseJson: ResponseData) => {
  const userData = responseJson.data.userData
  cookies().set('user-details', JSON.stringify(userData))
  cookies().set('access-token', responseJson.data.token)
  cookies().set('refresh-token', responseJson.data['refresh-token'])
}

export const removeUserCookies = () => {
  cookies().delete('user-details')
  cookies().delete('access-token')
  cookies().delete('refresh-token')
}
export const setUserTokens = (data: setTokenCookies) => {
  cookies().set('access-token', data.token)
  cookies().set('refresh-token', data['refresh-token'])
}

export const setModalCookie = () => {
  cookies().set('modal', 'true')
}
export const deleteModalCookie = () => {
  cookies().delete('modal')
}
