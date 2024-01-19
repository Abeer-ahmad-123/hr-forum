import { logout } from '@/services/auth/authService'
import { AUTH_REFRESH_TOKEN } from '@/services/auth/routes'
import { clearUser, setToken } from '@/store/Slices/loggedInUserSlice'
import { useDispatch } from 'react-redux'

export const useInterceptor = () => {
  const disptach = useDispatch()

  const fetchRefreshToken = async (
    options: any,
    customFetch: any,
    url: any,
  ) => {
    try {
      const headersForRefresh = {
        RefreshToken: options.headers.refreshToken,
      }

      const refreshResponse = await fetch(AUTH_REFRESH_TOKEN, {
        method: 'POST',
        headers: headersForRefresh,
      })

      if (refreshResponse.ok) {
        const newTokens = await refreshResponse.json()
        disptach(
          setToken({
            token: newTokens.data.token,
            refreshToken: newTokens.data['refresh-token'],
          }),
        )
        options.headers = options.headers || {}
        options.headers.authorization = `Bearer ${newTokens.data.token}`
        options.headers.refreshToken = `Bearer ${newTokens.data['refresh-token']}`

        return await customFetch(url, options)
      } else {
        disptach(clearUser())
        logout()
        throw 'error'
      }
    } catch (refreshError) {
      disptach(clearUser())
      logout()
      throw refreshError
    }
  }
  async function customFetch(url: any, options: any) {
    let response: any
    try {
      response = await fetch(url, options)
      if (response?.status === 401) {
        return fetchRefreshToken(options, customFetch, url)
      }
    } catch (error: any) {
      if (response && response.status === 401) {
        return fetchRefreshToken(options, customFetch, url)
      }
    }
    return response
  }

  return {
    customFetch,
  }
}
