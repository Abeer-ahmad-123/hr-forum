import { setUserCookies } from '@/utils/cookies'
import { getRefreshToken } from '../auth/authService'

export async function customFetch(
  url: any,
  options: any,
  setUserInLSandReduxCallBack: (newTokens: any) => void = () => {},
) {
  let response: any
  console.log('url', url)
  try {
    response = await fetch(url, options)
  } catch (error: any) {
    if (response && response.status === 401) {
      try {
        const refreshResponse = await getRefreshToken()
        console.log('refreshResponse', refreshResponse)
        if (refreshResponse.ok) {
          const newTokens = await refreshResponse.json()
          setUserInLSandReduxCallBack(newTokens)
          setUserCookies(newTokens)
          options.headers = options.headers || {}
          options.headers['Authorization'] = `Bearer ${newTokens.accessToken}`
          // Retry the original request with the new access token
          response = await customFetch(url, options)
        } else {
          // Handle refresh token failure
          throw new Error('Failed to refresh token')
        }
      } catch (refreshError) {
        // Handle refresh error
        console.log('refreshError', refreshError)
        throw refreshError
      }
    } else {
      // Handle other errors
      console.log('error', error)
      throw error
    }
  }

  return response
}
