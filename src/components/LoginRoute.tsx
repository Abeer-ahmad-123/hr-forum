'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Login from './Login'

const LoginRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/login') {
      router.replace('/register')
    }
  }

  return <Login toggleForm={changeRoute} />
}

export default LoginRoute
