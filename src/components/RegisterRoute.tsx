'use client'
import { usePathname, useRouter } from 'next/navigation'
import LoginImage from '@/assets/images/loginImage'
import Logo from '@/components/Navbar/Logo'
import Register from './Register'
import HRTalkerLogo from '@/assets/icons/HRlogo.png'

const RegisterRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/login') {
      router.replace('/register')
    }
  }

  return (
    <div className="mt-0 flex    h-[100vh] w-full max-w-[100vw] ">
      <div className="hidden bg-bg-tertiary-dark  px-[40px] py-[70px] lg:flex  lg:h-full  lg:w-full lg:max-w-[50%]    lg:flex-col lg:items-start lg:justify-between lg:gap-6">
        <div>
          <Logo className="hiddden text-white lg:block" />
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
      <div className="flex h-full  w-full max-w-full flex-col items-center   bg-bg-secondary p-4 dark:bg-bg-secondary-dark  lg:flex lg:max-w-[50%]">
        <div className="inline-block lg:hidden">
          <Logo className="  text-black dark:text-white" />
        </div>
        <Register toggleForm={changeRoute} />
      </div>
    </div>
  )
}

export default RegisterRoute
