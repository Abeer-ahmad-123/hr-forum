import { logout } from '@/services/auth/authService'
import { AUTH_REFRESH_TOKEN } from '@/services/auth/routes'
import { clearUser, setToken } from '@/store/Slices/loggedInUserSlice'
import { showErrorAlert } from '@/utils/helper'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

export const useInterceptor = () => {
  // * Spelling mistakes on disptach to dispatch
  // const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()

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
        // dispatch(
        //   setToken({
        //     token: newTokens.data.token,
        //     refreshToken: newTokens.data['refresh-token'],
        //   }),
        // )

        options.headers = options.headers || {}
        options.headers.authorization = `Bearer ${newTokens.data.token}`
        /**
         * Added the new Refresh token in options, previously was not there but we were making the new refresh token request so that's why its essential to change the token.
         */
        options.headers.refreshToken = newTokens.data['refresh-token']
        return await customFetch(url, options)
      } else {
        throw `Session Expired! Please Login Again`
      }
    } catch (refreshError) {
      // dispatch(clearUser())
      logout()
      if (pathName.includes('saved') || pathName === '/profile') {
        router.push('/feeds')
      }
      showErrorAlert(`${refreshError}`)
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
