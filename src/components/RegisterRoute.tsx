'use client'
import Signup from '@/components/Register'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const RegisterRoute = () => {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/register') {
      router.replace('/login')
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
    return <Signup toggleForm={changeRoute} />
  }
}

export default RegisterRoute
