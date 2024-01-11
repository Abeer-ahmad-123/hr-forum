'use server'
import { cookies } from 'next/headers'
import { AUTH_REFRESH_TOKEN } from '../auth/routes'
import { logout } from '../auth/authService'

export const fetchRefreshToken = async (
  options: any,
  customFetch: any,
  url: any,
) => {
  try {
    const refreshToken = cookies().get('refresh-token')
    const headersForRefresh = {
      RefreshToken: refreshToken?.value?.toString()!,
    }
    const refreshResponse = await fetch(AUTH_REFRESH_TOKEN, {
      method: 'POST',
      headers: headersForRefresh,
    })

    if (refreshResponse.ok) {
      const newTokens = await refreshResponse.json()

      cookies().set('access-token', newTokens.data.token)
      cookies().set('refresh-token', newTokens.data['refresh-token'])
      options.headers = options.headers || {}
      options.headers['Authorization'] = `Bearer ${newTokens.accessToken}` || ''
      // Retry the original request with the new access token
      let res = await customFetch(url, options)
      return res
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userData')
      logout()
      throw 'error'
    }
  } catch (refreshError) {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userData')
    logout()
    throw refreshError
  }
}
