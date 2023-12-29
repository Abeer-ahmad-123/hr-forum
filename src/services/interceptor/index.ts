import { setUserCookies } from '@/utils/cookies'
import { getRefreshToken } from '../auth/authService'
import { AUTH_REFRESH_TOKEN } from '../auth/routes'
import { cookies } from 'next/headers'

export async function customFetch(
  url: any,
  options: any,
  setUserInLSandReduxCallBack: (newTokens: any) => void = () => {},
) {
  let response: any
  try {
    response = await fetch(url, options)
    console.log('url 12', url)

    if (response && response.status === 401) {
      console.log('url 14', url)
      try {
        // const refreshResponse = await getRefreshToken()
        ////
        console.log('AUTH_REFRESH_TOKEN', AUTH_REFRESH_TOKEN)
        const refreshToken = cookies().get('refresh-token')
        const headersForRefresh = {
          RefreshToken: refreshToken?.value?.toString()!,
        }
        console.log('headersForRefresh', headersForRefresh)
        const refreshResponse = await fetch(AUTH_REFRESH_TOKEN, {
          method: 'POST',
          headers: headersForRefresh,
        })
        console.log('refreshResponse ===', refreshResponse.status)

        ////
        if (refreshResponse.status === 200) {
          const newTokens = await refreshResponse.json()
          console.log('newTokens', newTokens)
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
    }
  } catch (error: any) {
    console.log('first 53 called')
    if (response && response.status === 401) {
      console.log('url', url)
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
