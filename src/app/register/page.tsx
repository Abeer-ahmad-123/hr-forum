'use client'
import { usePathname, useRouter } from 'next/navigation'
import LoginImage from '@/assets/images/loginImage'
import Logo from '@/components/Navbar/Logo'
import Register from '@/components/Register'
import { IconProps } from '@/utils/interfaces/icons'

const LoginRoute = () => {
  const pathName = usePathname()
  const router = useRouter()

  const changeRoute = () => {
    if (pathName === '/login') {
      router.replace('/register')
    }
  }

  return (
    <div
      className="mt-0 flex h-[100vh]  items-center bg-bg-tertiary-dark
                ">
      <div className="flex  h-full w-full max-w-[50%]  flex-col  items-start justify-between   gap-6 bg-bg-tertiary-dark px-[40px] py-[40px]">
        <div>
          <Logo className="text-white" />
        </div>
        <div>
          <LoginImage className="h- full max-h-[314] w-full max-w-[446px]" />
          <p className="text-bg-tertiary">
            Get better reach to your potential customers and build your brand
            with us. We are here to help you position a yourself as an expert in
            your defined niche.
          </p>
        </div>
      </div>
      <div className="flex  h-full w-full max-w-[50%] flex-col items-center justify-center  bg-bg-secondary dark:bg-bg-secondary-dark">
        <Register toggleForm={changeRoute} />
      </div>
    </div>
  )
}

export default LoginRoute
