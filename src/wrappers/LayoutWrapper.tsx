'use client'
import InitialLoading from '@/components/InitialLoading'
import Navbar from '@/components/Navbar/Navbar'
import {
  getRefreshToken,
  googleCodeExchange,
  googleTokenExchange,
} from '@/services/auth/authService'
import { getChannels } from '@/services/channel/channel'
import { setChannels, setKeyIdPairData } from '@/store/Slices/channelsSlice'
import { setToken, setUser } from '@/store/Slices/loggedInUserSlice'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import { showErrorAlert } from '@/utils/helper'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserNameDialog from './UserNameDialog'

const LayoutWrapper = ({ children }: any) => {
  const router = useRouter()
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  const isFirstRun = useRef(true)
  const isFirstOnce = useRef(false)

  const [openUserNameDialog, setOpenUserNameDialog] = useState(false)

  const styles = darkMode ? 'dark' : ''
  const getChannelsLocal = useCallback(async () => {
    try {
      let response: any = await getChannels()
      dispatch(setChannels(response.channels))
      dispatch(setKeyIdPairData(arrayToKeyIdNValueData(response.channels)))
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('fetch failed')) {
        router.push('/error')
      }
    }
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
      }
    }
  }

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

        const currentUrl = window.location.href
        const url = new URL(currentUrl)

        url.searchParams.delete('googleAccessToken')

        window.history.replaceState({}, document.title, url.href)
      } catch (err) {
        if (err instanceof Error && err.message.includes('fetch failed')) {
          router.push('/error')
        }
        showErrorAlert('Issue in google authentication')
      }
    }
  }

  const handleSubmitUserName = (userName: string) => {
    const googleToken = searchParams.get('googleAccessToken')
    exchangeGoogleToken(googleToken!, userName)
    setOpenUserNameDialog(false)
  }

  useEffect(() => {
    const code = searchParams.get('code')
    const googleToken = searchParams.get('googleAccessToken')
    if (!isFirstOnce.current && (code || googleToken)) {
      isFirstOnce.current = true
      if (code) {
        exchangeCode(code!)
      } else {
        setOpenUserNameDialog(true)
      }
    }
  }, [searchParams])

  useEffect(() => {
    setLoading(false)

    let refreshInterval: any
    if (!localStorage.getItem('token')) {
      clearInterval(refreshInterval)
    }
    refreshInterval = setInterval(async () => {
      const localStorageToken = localStorage.getItem('token') || null
      if (localStorageToken && localStorageToken !== 'undefined') {
        try {
          const tokenResponse = await getRefreshToken()

          dispatch(
            setToken({
              token: tokenResponse?.token,
              refreshToken: tokenResponse['refresh-token'],
            }),
          )
        } catch (error) {
          if (
            error instanceof Error &&
            error.message.includes('fetch failed')
          ) {
            router.push('/error')
          }
        }
      }
    }, 900000)
    if (isFirstRun.current) {
      isFirstRun.current = false
      getChannelsLocal()
    }

    return () => clearInterval(refreshInterval)
  }, [])

  return (
    <body
      className={`${styles.trim()} theme-default ${
        pathname.includes('/error') ? 'bg-white' : 'bg-background'
      } pt-4 font-primary dark:bg-slate-700`}>
      {!loading && !pathname.includes('/error') && <Navbar />}
      <ToastContainer />
      <main className="pt-[45px] font-primary">
        <div className="grid">
          <div className="flex dark:bg-slate-700 dark:text-white">
            <div
              className={`max-h-auto mx-auto -mt-5 min-h-[100vh] w-full px-10 
              dark:bg-dark-background dark:text-white max-md:py-5 max-sm:p-[10px]`}>
              {loading ? <InitialLoading /> : children}
            </div>
          </div>
        </div>
        {openUserNameDialog && (
          <UserNameDialog handleSubmit={handleSubmitUserName} />
        )}
      </main>
    </body>
  )
}

export default LayoutWrapper
