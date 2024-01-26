'use client'
import Signup from '@/components/Signup'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SignUpRoute = () => {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/signup') {
      router.replace('/signin')
    }
  }

  useEffect(() => {
    if (token) {
      router.replace('/feeds')
    }

    return () => {
      nProgress.done()
    }
  }, [])

  return <Signup toggleForm={changeRoute} />
}

export default SignUpRoute
