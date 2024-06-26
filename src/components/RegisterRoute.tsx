'use client'
import Register from '@/components/Register'
import { usePathname, useRouter } from 'next/navigation'
// import nProgress from 'nprogress'
import { useEffect } from 'react'

const RegisterRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/register') {
      router.replace('/login')
    }
  }

  useEffect(() => {
    return () => {
      // nProgress.done()
    }
  }, [])

  return <Register toggleForm={changeRoute} />
}

export default RegisterRoute
