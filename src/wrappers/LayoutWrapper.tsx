'use client'
import InitialLoading from '@/components/InitialLoading'
import Navbar from '@/components/Navbar/Navbar'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
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
import { StoreChannels } from '@/utils/interfaces/channels'
import { ThemeProvider } from 'next-themes'

const LayoutWrapper = ({ children, serverState }: any) => {
  const router = useRouter()
  const { handleRedirect } = useFetchFailedClient()
  // const darkMode =
  //   useSelector((state: any) => state.colorMode.darkMode) ||
  //   serverState.colorMode.darkMode
  const notFound =
    useSelector((state: any) => state.notFound.notFound) ||
    serverState.notFound.notFound
  const channelsInStore = useSelector(
    (state: StoreChannels) => state.channels.channels,
  )
  const channels =
    channelsInStore.length > 0
      ? channelsInStore
      : serverState.channels?.channels ?? []
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const [loading, setLoading] = useState(!serverState ? true : false)
  const [isError, setIsError] = useState<boolean>(false)

  const isFirstRun = useRef(true)
  const isFirstOnce = useRef(false)

  // const styles = darkMode ? 'dark' : ''

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
      setLoading(true)
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
    } finally {
      setLoading(false)
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
      if (!channels || !serverState.channels?.channels) getChannelsLocal()
      handleUserClientLogout()
      handleUserServerLogout()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (serverState.channels?.channels && channelsInStore.length === 0) {
      dispatch(setChannels(serverState.channels.channels))
      dispatch(
        setKeyIdPairData(arrayToKeyIdNValueData(serverState.channels.channels)),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelsInStore, serverState])

  return (
    <main
      // * max width should be 100 view width so that it should now scroll over x-axis
      className={`${
        isError ? 'bg-white' : 'dark:bg-dark-background'
      } font-primary ${!isError && 'dark:bg-slate-700'} h-max max-w-[100dvw]
      `}>
      <ThemeProvider attribute="class" defaultTheme="default-theme">
        <ProgressBar
          height="2px"
          color="#571ce0"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {!loading && !isError && !notFound && <Navbar />}
        <ToastContainer />
        <div className="font-primary dark:bg-dark-background">
          <div className="grid">
            <div className="flex dark:bg-slate-700 dark:text-white">
              <div
                className={`mx-auto w-full px-10
              dark:text-white max-md:py-5 max-sm:p-[10px] ${
                isError
                  ? 'bg-white dark:bg-white'
                  : 'transition-all duration-700 ease-in-out dark:bg-dark-background'
              } ${
                  pathname === '/register' || pathname === '/login'
                    ? 'flex items-center justify-center'
                    : ''
                }`}>
                {/* {typeof window === 'undefined' || !loading ? (
                children
              ) : (
                <InitialLoading />
              )} */}
                {!loading ? children : <InitialLoading />}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </main>
  )
}

export default LayoutWrapper
