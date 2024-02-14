'use client'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import Login from './Login'

const LoginRoute = () => {
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

  return <Login toggleForm={changeRoute} />
}

export default LoginRoute
