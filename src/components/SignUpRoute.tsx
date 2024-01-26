'use client'
import Signup from '@/components/Signup'
import { usePathname, useRouter } from 'next/navigation'

function SignUpRoute() {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/signUp') {
      router.replace('/signIn')
    }
  }

  return <Signup toggleForm={changeRoute} />
}

export default SignUpRoute
