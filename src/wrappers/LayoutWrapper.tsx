'use client'
import InitialLoading from '@/components/InitialLoading'
import Navbar from '@/components/Navbar/Navbar'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import {
  checkUser,
  deleteModalState,
  getRefreshToken,
  googleCodeExchange,
  googleTokenExchange,
  isTokenExpired,
  logout,
  setUserToken,
} from '@/services/auth/authService'
import { getChannels } from '@/services/channel/channel'
import { setChannels, setKeyIdPairData } from '@/store/Slices/channelsSlice'
import { clearUser, setToken, setUser } from '@/store/Slices/loggedInUserSlice'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import { showErrorAlert } from '@/utils/helper'
import type {
  ChannelInterface,
  StoreChannels,
} from '@/utils/interfaces/channels'
import '@fontsource/poppins'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/900.css'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserNameDialog from './UserNameDialog'
type Props = {
  children: React.ReactNode
  serverState: {
    channels: {
      channels: ChannelInterface[]
      channelsKeyValuePair: {}
    }
    posts: {
      posts: never[]
      commentCount: {}
    }
    notFound: {
      notFound: boolean
    }
    loggedInUser: {
      token: string | null
      userData: any
      refreshToken: string | null
    }
  }
}
const LayoutWrapper = ({ children, serverState }: Props) => {
  const router = useRouter()
  const { handleRedirect } = useFetchFailedClient()
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
  // * A Dialog to set the username on signup / login with Google
  const [openUserNameDialog, setOpenUserNameDialog] = useState(false)
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
      // * Added TS type
      let response = await getChannels()
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
        // * Clearing the SearchParams the simple way.
        router.replace(pathname)
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

  // * The API for Google AccessToken sign-up
  const exchangeGoogleToken = async (token: string, username: string) => {
    if (token) {
      try {
        const response = await googleTokenExchange(token, username)
        dispatch(
          setUser({
            ...response,
            refreshToken: response['refresh-token'],
          }),
        )
        handleCloseDialog()
        // const currentUrl = window.location.href
        // const url = new URL(currentUrl)

        // url.searchParams.delete('googleAccessToken')

        // window.history.replaceState({}, document.title, url.href)
      } catch (err: any) {
        showErrorAlert(err.message ?? 'Issue in google authentication')
      }
    }
  }

  // * Create new user from Google based on username
  const handleSubmitUserName = (userName: string) => {
    const googleToken = searchParams.get('googleAccessToken')
    exchangeGoogleToken(googleToken!, userName)
    // setOpenUserNameDialog(false)
  }

  useEffect(() => {
    const code = searchParams.get('code')
    const googleToken = searchParams.get('googleAccessToken')
    if (!isFirstOnce.current && (code || googleToken)) {
      isFirstOnce.current = true
      if (code) {
        exchangeCode(code!)
      } else {
        // * If there is no code Param then that means that the user does not exist and we need to create one so we are opening a username dialog for input and then we create a new user and right after that we login.
        setOpenUserNameDialog(true)
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

  // * Close the username dialog
  function handleCloseDialog() {
    setOpenUserNameDialog(false)
    router.replace(pathname)
  }
  return (
    <main
      // * max width should be 100 view width so that it should now scroll over x-axis
      className={`${isError ? 'bg-white' : 'dark:bg-dark-background'
        } font-primary ${!isError && 'dark:bg-slate-700'} h-max max-w-[100dvw]
      `}
    >
      <ThemeProvider attribute="class" defaultTheme="theme-default">
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
              dark:text-white max-md:py-5 max-sm:p-[10px] ${isError
                    ? 'bg-white dark:bg-white'
                    : 'transition-all duration-700 ease-in-out dark:bg-dark-background'
                  } ${pathname === '/register' || pathname === '/login'
                    ? 'flex items-center justify-center'
                    : ''
                  }`}
              >
                {!loading ? <div className='mt-[86px]'> {children}</div> : <InitialLoading />}

                <UserNameDialog
                  isDialogOpen={openUserNameDialog}
                  handleSubmit={handleSubmitUserName}
                  handleCloseDialog={handleCloseDialog}
                />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </main>
  )
}

export default LayoutWrapper
