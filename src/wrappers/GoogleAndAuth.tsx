'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
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
import { clearUser, setUser, setToken } from '@/store/Slices/loggedInUserSlice'
import { useEffect, useRef, useState } from 'react'
import UserNameDialog from '@/wrappers/UserNameDialog'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { showErrorAlert } from '@/utils/helper'

const GoogleAndAuth = () => {
  const searchParams = useSearchParams()
  // const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { handleRedirect } = useFetchFailedClient()

  const isFirstRun = useRef(true)
  const isFirstOnce = useRef(false)
  // * A Dialog to set the username on signup / login with Google
  const [openUserNameDialog, setOpenUserNameDialog] = useState(false)
  const handleUserClientLogout = async () => {
    const token = localStorage.getItem('token')
    if (!(await checkUser()) && token) {
      clearAuthentication()
    }
  }

  const clearAuthentication = () => {
    // dispatch(clearUser())
    logout()
    if (pathname.includes('saved') || pathname === '/profile') {
      router.push('/feeds')
    } else {
      router.refresh()
    }
  }

  const exchangeCode = async (code: string) => {
    if (code) {
      try {
        const response = await googleCodeExchange(code)
        //set cookies refrsh token here

        // dispatch(
        //   setUser({
        //     ...response,
        //     refreshToken: response['refresh-token'],
        //   }),
        // )

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

  const handleUserServerLogout = async () => {
    const token = localStorage.getItem('token')
    if (!token && (await checkUser())) {
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
            // dispatch(
            //   setToken({
            //     token: tokenResponse?.data?.token,
            //     refreshToken: tokenResponse?.data?.['refresh-token'],
            //   }),
            // )
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

  // * The API for Google AccessToken sign-up
  const exchangeGoogleToken = async (token: string, username: string) => {
    if (token) {
      try {
        const response = await googleTokenExchange(token, username)
        // dispatch(
        //   setUser({
        //     ...response,
        //     refreshToken: response['refresh-token'],
        //   }),
        // )
        handleCloseDialog()
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
  // * Close the username dialog
  function handleCloseDialog() {
    setOpenUserNameDialog(false)
    router.replace(pathname)
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
    deleteModalState()
    const token = localStorage.getItem('token')
    if (token) {
      getToken()
    }
    if (isFirstRun.current) {
      isFirstRun.current = false
      // if (!channels || !serverState.channels?.channels) getChannelsLocal()
      handleUserClientLogout()
      handleUserServerLogout()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <UserNameDialog
      isDialogOpen={openUserNameDialog}
      handleSubmit={handleSubmitUserName}
      handleCloseDialog={handleCloseDialog}
    />
  )
}

export default GoogleAndAuth
