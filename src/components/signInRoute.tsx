'use client'
import Signin from '@/components/Signin'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SignInRoute = () => {
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/signin') {
      nProgress.start()
      router.replace('/signup')
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

  return (
    <div>
      <Signin toggleForm={changeRoute} />
    </div>
  )
}

export default SignInRoute
