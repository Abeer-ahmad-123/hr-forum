import { setUserCookies } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { getRefreshToken } from '../auth/authService'
import { AUTH_REFRESH_TOKEN } from '../auth/routes'

export async function customFetch(
  url: any,
  options: any,
  setUserInLSandReduxCallBack: (newTokens: any) => void = () => {},
) {
  let response: any
  try {
    response = await fetch(url, options)
    if (response?.status === 401) {
      try {
        // const refreshResponse = await getRefreshToken()
        ////
        const refreshToken = cookies().get('refresh-token')
        const headersForRefresh = {
          RefreshToken: refreshToken?.value?.toString()!,
        }
        const refreshResponse = await fetch(AUTH_REFRESH_TOKEN, {
          method: 'POST',
          headers: headersForRefresh,
        })

        ////
        if (refreshResponse.status === 200) {
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

        throw refreshError
      }
    }
  } catch (error: any) {
    if (response && response.status === 401) {
      try {
        const refreshResponse = await getRefreshToken()

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
        throw refreshError
      }
    } else {
      // Handle other errors
      throw error
    }
  }

  return response
}
