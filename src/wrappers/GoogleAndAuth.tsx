'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import UserNameDialog from '@/wrappers/UserNameDialog'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { showErrorAlert } from '@/utils/helper'
import { setUserDetailsInCookie, setUserTokens } from '@/utils/cookies'

const GoogleAndAuth = ({
  token,
  setIsLoading,
}: {
  token: string
  setIsLoading: Dispatch<SetStateAction<boolean>>
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { handleRedirect } = useFetchFailedClient()

  const hasRunOnce = useRef(false) // For searchParams effect
  const hasTokenHandled = useRef(false) // For token refresh effect
  const [openUserNameDialog, setOpenUserNameDialog] = useState(false)

  const clearAuthentication = () => {
    logout()
    if (pathname.includes('saved') || pathname === '/profile') {
      router.push('/feeds')
    } else {
      router.refresh()
    }
  }

  const exchangeCode = async (code: string) => {
    try {
      const response = await googleCodeExchange(code)
      const currentUrl = window.location.href
      const url = new URL(currentUrl)
      url.searchParams.delete('code')
      router.replace('/feeds')
      await setUserTokens(response)
      await setUserDetailsInCookie(response?.userData)
    } catch (err) {
      if (err instanceof Error && err.message.includes('fetch failed')) {
        router.push('/error')
      }
      router.replace(pathname)
      showErrorAlert('Issue in google authentication')
      clearAuthentication()
    }
  }

  const getToken = async () => {
    try {
      const res = await isTokenExpired()
      if (res.IsExpired) {
        const tokenResponse = await getRefreshToken()
        if (tokenResponse.success) {
          setUserToken(tokenResponse.data)
        } else {
          throw new Error(tokenResponse.errors[0])
        }
      }
    } catch (error) {
      clearAuthentication()
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    }
  }

  // Effect to handle URL parameters (Google code or token)
  useEffect(() => {
    if (hasRunOnce.current) return
    hasRunOnce.current = true

    const code = searchParams.get('code')
    const googleToken = searchParams.get('googleAccessToken')

    if (code) {
      exchangeCode(code)
    } else if (googleToken) {
      setOpenUserNameDialog(true)
    }
  }, []) // Empty dependency to only run once after initial render

  // Effect to handle token refresh or logout logic
  useEffect(() => {
    if (hasTokenHandled.current) return
    hasTokenHandled.current = true

    const handleToken = async () => {
      if (token) {
        await getToken()
      } else if (await checkUser()) {
        clearAuthentication()
      }
    }

    handleToken()
  }, [token]) // Only runs when `token` changes

  const exchangeGoogleToken = async (googleToken: string, username: string) => {
    try {
      const response = await googleTokenExchange(googleToken, username)
      handleCloseDialog()
    } catch (err: any) {
      showErrorAlert(err.message ?? 'Issue in google authentication')
    }
  }

  const handleSubmitUserName = (userName: string) => {
    const googleToken = searchParams.get('googleAccessToken')
    if (googleToken) {
      exchangeGoogleToken(googleToken, userName)
    }
  }

  function handleCloseDialog() {
    setOpenUserNameDialog(false)
    router.replace(pathname)
  }

  return (
    <UserNameDialog
      isDialogOpen={openUserNameDialog}
      handleSubmit={handleSubmitUserName}
      handleCloseDialog={handleCloseDialog}
    />
  )
}

export default GoogleAndAuth
