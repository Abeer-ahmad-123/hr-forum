'use client'
import React, { useEffect, useCallback, useRef } from 'react'
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
  googleTokenExchange,
} from '@/services/auth/authService'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { showErrorAlert } from '@/utils/helper'
const LayoutWrapper = ({ children }: any) => {
  const darkMode = useSelector((state: any) => state.colorMode.darkMode)
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
      console.log('err', err)
    }
  }, [])

  const exchangeCode = async (token: string) => {
    if (token) {
      try {
        const response = await googleTokenExchange(token)
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
  useEffect(() => {
    const token = searchParams.get('code')
    if (!isFirstOnce.current && token) {
      isFirstOnce.current = true
      exchangeCode(token!)
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
    }, 300000)

    if (isFirstRun.current) {
      isFirstRun.current = false

      getChannelsLocal()
    }
    return () => clearInterval(refreshInterval)
  }, [])

  return (
    <body className={` ${styles} theme-default font-primary dark:bg-slate-700`}>
      <Navbar />
      <ToastContainer />
      <main
        className={`bg-primary-light  min-h-screen pt-14 font-primary dark:bg-dark-background`}>
        <div className="bg-primary-light grid">
          <div className="fixed left-0 top-0 z-10 w-full"></div>
          <div className="flex dark:bg-slate-700 dark:text-white">
            <div className="max-h-auto mx-auto -mt-5 min-h-[70vh] w-full bg-background px-10 py-5 dark:bg-dark-background dark:text-white max-sm:p-[10px]">
              {children}
            </div>
          </div>
        </div>
      </main>
    </body>
  )
}

export default LayoutWrapper
