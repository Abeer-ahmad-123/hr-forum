'use client'
import InitialLoading from '@/components/InitialLoading'
import Navbar from '@/components/Navbar/Navbar'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import {
  checkUser,
  deleteModalState,
  getRefreshToken,
  googleCodeExchange,
  isTokenExpired,
  logout,
  setUserToken,
} from '@/services/auth/authService'
import { getChannels } from '@/services/channel/channel'
import { setChannels, setKeyIdPairData } from '@/store/Slices/channelsSlice'
import { clearUser, setToken, setUser } from '@/store/Slices/loggedInUserSlice'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import { showErrorAlert } from '@/utils/helper'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/poppins'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/900.css'

const LayoutWrapper = ({ children }: any) => {
  const router = useRouter()
  const { handleRedirect } = useFetchFailedClient()
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const notFound = useSelector((state: any) => state.notFound.notFound)
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState<boolean>(false)

  const isFirstRun = useRef(true)
  const isFirstOnce = useRef(false)

  const styles = darkMode ? 'dark' : ''

  const clearAuthentication = () => {
    dispatch(clearUser())
    logout()
    if (pathname.includes('saved') || pathname === '/profile') {
      router.push('/feeds')
    } else {
      router.refresh()
    }
  }
  const getChannelsLocal = useCallback(async () => {
    try {
      let response: any = await getChannels()

      dispatch(setChannels(response.channels))
      dispatch(setKeyIdPairData(arrayToKeyIdNValueData(response.channels)))
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        (err.message.includes('fetch failed') ||
          err.message.includes('Unexpected token'))
      ) {
        router.push('/error')
      } else {
        showErrorAlert(`${err}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const exchangeCode = async (code: string) => {
    if (code) {
      try {
        const response = await googleCodeExchange(code)
        dispatch(
          setUser({
            ...response,
            refreshToken: response['refresh-token'],
          }),
        )

        const currentUrl = window.location.href
        const url = new URL(currentUrl)

        url.searchParams.delete('code')
        router.replace('/feeds')

        window.history.replaceState({}, document.title, url.href)
      } catch (err) {
        if (err instanceof Error && err.message.includes('fetch failed')) {
          router.push('/error')
        }
        showErrorAlert('Issue in google authentication')
        clearAuthentication()
      }
    }
  }
  const handleUserClientLogout = async () => {
    if (!(await checkUser())) {
      clearAuthentication()
    }
  }

  const handleUserServerLogout = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      clearAuthentication()
    }
  }

  useEffect(() => {
    const code = searchParams.get('code')
    const googleToken = searchParams.get('googleAccessToken')
    if (!isFirstOnce.current && (code || googleToken)) {
      isFirstOnce.current = true
      if (code) {
        exchangeCode(code!)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const getToken = async () => {
    try {
      const res = await isTokenExpired()
      if (res.IsExpired) {
        try {
          const tokenResponse = await getRefreshToken()

          if (tokenResponse.success) {
            dispatch(
              setToken({
                token: tokenResponse?.data?.token,
                refreshToken: tokenResponse?.data?.['refresh-token'],
              }),
            )
            setUserToken(tokenResponse.data)
          } else {
            throw tokenResponse.errors[0]
          }
        } catch (error) {
          throw error
        }
      }
    } catch (error) {
      clearAuthentication()
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    }
  }
  useEffect(() => {
    if (pathname.includes('/error')) setIsError(true)
  }, [pathname])

  useEffect(() => {
    const code = searchParams.get('code')
    const googleToken = searchParams.get('googleAccessToken')
    if (!isFirstOnce.current && (code || googleToken)) {
      isFirstOnce.current = true
      if (code) {
        exchangeCode(code!)
      } else {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    setLoading(false)
    deleteModalState()
    const token = localStorage.getItem('token')
    if (token) {
      getToken()
    }
    if (isFirstRun.current) {
      isFirstRun.current = false
      getChannelsLocal()
      handleUserClientLogout()
      handleUserServerLogout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <body
      className={`${styles.trim()} theme-default ${
        darkMode ? 'bg-dark-background' : 'bg-background '
      } ${isError ? 'bg-white' : 'dark:bg-dark-background'} font-primary ${
        !isError && 'dark:bg-slate-700'
      } 
      `}>
      {!loading && !isError && !notFound && <Navbar />}
      <ToastContainer />
      <main className="pt-[45px] font-primary dark:bg-dark-background">
        <div className="grid">
          <div className="flex dark:bg-slate-700 dark:text-white">
            <div
              className={`max-h-auto mx-auto w-full px-10 
              dark:text-white max-md:py-5 max-sm:p-[10px] ${
                isError
                  ? 'bg-white dark:bg-white'
                  : 'transition-all duration-700 ease-in-out dark:bg-dark-background'
              } ${
                pathname === '/register' || pathname === '/login'
                  ? 'flex items-center justify-center'
                  : ''
              }`}>
              {loading ? <InitialLoading /> : children}
            </div>
          </div>
        </div>
      </main>
    </body>
  )
}

export default LayoutWrapper
