'use client'
import Signin from '@/components/Signin'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'

const SignInRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/signin') {
      nProgress.start()
      router.replace('/signup')
    }
  }

  useEffect(() => {
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
