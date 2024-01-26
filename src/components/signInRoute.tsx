'use client'
import Signin from '@/components/Signin'

import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'

function SignInRoute() {
  const [showSignUpForm, setShowSignUpForm] = useState(false)

  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/signIn') {
      nProgress.start()
      router.replace('/signUp')
    }
  }

  useEffect(() => {
    nProgress.done()
  }, [])

  return (
    <div>
      <Signin toggleForm={changeRoute} />
    </div>
  )
}

export default SignInRoute
