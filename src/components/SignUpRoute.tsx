'use client'
import Signup from '@/components/Signup'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'

function SignUpRoute() {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/signUp') {
      nProgress.start()
      router.replace('/signIn')
    }
  }

  useEffect(() => {
    nProgress.done()
  }, [])

  return <Signup toggleForm={changeRoute} />
}

export default SignUpRoute
