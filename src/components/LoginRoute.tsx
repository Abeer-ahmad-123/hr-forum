'use client'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'

const LoginRoute = () => {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/login') {
      nProgress.start()
      router.replace('/register')
    }
  }

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  if (token) {
    router.replace('/feeds')
  } else {
    return <Login toggleForm={changeRoute} />
  }
}

export default LoginRoute
