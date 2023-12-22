import { cookies } from 'next/headers'

interface ResponseData {
  data: {
    token: string
    userData: {
      id: string
      email: string
      username: string
      name: string
      bio: string
      profilePictureURL: string
    }
    'refresh-token': string
  }
}

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
