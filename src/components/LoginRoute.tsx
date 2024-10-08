'use client'
import { usePathname, useRouter } from 'next/navigation'
import LoginImage from '@/assets/images/loginImage'
import Logo from '@/components/Navbar/Logo'
import Login from './Login'

const LoginRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/login') {
      router.replace('/register')
    }
  }

  return (
    <div className="items-cente mt-0 flex   h-[100vh] w-full max-w-[100vw]">
      <div className="hidden bg-bg-tertiary-dark  px-[40px] py-[40px] lg:flex  lg:h-full  lg:w-full lg:max-w-[50%]    lg:flex-col lg:items-start lg:justify-between lg:gap-6">
        <div>
          <Logo className="lg:blocl hiddden text-white" />
        </div>
        <div>
          <LoginImage className="hidden h-full max-h-[314] w-full max-w-[446px] lg:block" />
          <p className="text-bg-tertiary">
            Get better reach to your potential customers and build your brand
            with us. We are here to help you position a yourself as an expert in
            your defined niche.
          </p>
        </div>
      </div>
      <div className="flex  h-full w-full max-w-full flex-col items-center justify-center bg-bg-secondary dark:bg-bg-secondary-dark  lg:flex lg:max-w-[50%]">
        <Login toggleForm={changeRoute} />
      </div>
    </div>
  )
}

export default LoginRoute
