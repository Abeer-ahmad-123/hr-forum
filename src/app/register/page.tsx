'use client'
import { usePathname, useRouter } from 'next/navigation'
import RegisterRoute from '@/components/RegisterRoute'

const SignUpRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/login') {
      router.replace('/register')
    }
  }

  return <RegisterRoute />
}

export default SignUpRoute
