'use client'
import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '@/components/Navbar/Navbar'
import '@/assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { getChannels } from '@/services/channel/channel'
import { setChannels, setKeyIdPairData } from '@/store/Slices/channelsSlice'
import { setToken, setUser } from '@/store/Slices/loggedInUserSlice'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import {
  getRefreshToken,
  googleCodeExchange,
  googleTokenExchange,
} from '@/services/auth/authService'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { showErrorAlert } from '@/utils/helper'
import UserNameDialog from './UserNameDialog'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'

const LayoutWrapper = ({ children }: any) => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const [openUserNameDialog, setOpenUserNameDialog] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const dispatch = useDispatch()
  const isFirstRun = useRef(true)
  const isFirstOnce = useRef(false)

  const styles = darkMode ? 'dark' : ''
  const getChannelsLocal = useCallback(async () => {
    try {
      let response: any = await getChannels()
      dispatch(setChannels(response.channels))
      dispatch(setKeyIdPairData(arrayToKeyIdNValueData(response.channels)))
    } catch (err) {
      console.error('err', err)
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

        // Remove the "example" query parameter
        url.searchParams.delete('code')

        window.history.replaceState({}, document.title, url.href)
      } catch (err) {
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

        // Remove the "example" query parameter
        url.searchParams.delete('googleAccessToken')

        window.history.replaceState({}, document.title, url.href)
      } catch (err) {
        console.error('err', err)
        showErrorAlert('Issue in google authentication')
      }
    }
  }

  const handleSubmitUserName = (userName: string) => {
    const googleToken = searchParams.get('googleAccessToken')
    exchangeGoogleToken(googleToken!, userName)
    setOpenUserNameDialog(false)
  }
  const addQueryParams = () => {
    const search = searchParams.get('search')
    const user = userDataInStore.id

    const queryParams = {
      shallow: true,
    }

    let url = pathname

    if (search) {
      url += `?search=${search}`

      if (user) {
        url += `&user=${user}`
      }
    }

    router.push(url, queryParams)
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
    let refreshInterval: any
    if (!localStorage.getItem('token')) {
      clearInterval(refreshInterval)
    }
    refreshInterval = setInterval(async () => {
      const localStorageToken = localStorage.getItem('token') || null
      if (localStorageToken && localStorageToken !== 'undefined') {
        const tokenResponse = await getRefreshToken()
        dispatch(
          setToken({
            token: tokenResponse?.token,
            refreshToken: tokenResponse['refresh-token'],
          }),
        )
      }
    }, 900000)

    if (isFirstRun.current) {
      isFirstRun.current = false

      getChannelsLocal()
    }
    return () => clearInterval(refreshInterval)
  }, [])

  useEffect(() => {
    addQueryParams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams, userDataInStore])

  return (
    <body className={` ${styles} theme-default font-primary dark:bg-slate-700`}>
      <Navbar />
      <ToastContainer />
      <main
        className={`bg-primary-light  min-h-screen pt-14 font-primary dark:bg-dark-background`}>
        <div className="bg-primary-light grid">
          <div className="fixed left-0 top-0 z-10 w-full"></div>
          <div className="flex dark:bg-slate-700 dark:text-white">
            <div className="max-h-auto mx-auto -mt-5 min-h-[100vh] w-full bg-background px-10 py-5 dark:bg-dark-background dark:text-white max-sm:p-[10px]">
              {children}
            </div>
          </div>
        </div>
        {openUserNameDialog && (
          <div>
            <UserNameDialog handleSubmit={handleSubmitUserName} />
          </div>
        )}
      </main>
    </body>
  )
}

export default LayoutWrapper
