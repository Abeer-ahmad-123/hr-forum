'use client'
import Signin from '@/components/Signin'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

function SignInRoute() {
  const [showSignUpForm, setShowSignUpForm] = useState(false)

  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/signIn') {
      router.replace('/signUp')
    }
  }

  return (
    <div>
      <Signin toggleForm={changeRoute} />
    </div>
  )
}

export default SignInRoute
