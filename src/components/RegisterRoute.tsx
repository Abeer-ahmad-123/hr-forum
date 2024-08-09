'use client'
import Register from '@/components/Register'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RegisterRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/register') {
      router.replace('/login')
    }
  }

  return <Register toggleForm={changeRoute} />
}

export default RegisterRoute
