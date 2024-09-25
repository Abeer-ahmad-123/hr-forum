import LoggedIn from './LoggedIn'
import Logo from './Logo'
import NightModeToggle from './NightModeToggle'
import SearchBar from './SearchBar'
import SigninNavButton from './SigninNavButton'
import { NavbarProps } from '@/utils/interfaces/navbar'
import { getUserFromCookie } from '@/utils/cookies'

const Navbar = async ({ pathname }: NavbarProps) => {
  const { user } = await getUserFromCookie()

  const isRegisterPage = pathname === '/register'
  const isLoginPage = pathname === '/login'

  const isAuthPage = isLoginPage && isRegisterPage

  return (
    <div className="fixed top-0 z-50 h-[100px] w-full items-center justify-center border-b-[1px] border-bg-tertiary bg-white shadow-sm dark:border-bg-tertiary-dark dark:bg-bg-primary-dark max-md:h-[72px]">
      <div className="m-auto flex w-full max-w-[1512px] items-center justify-between  px-6 py-4 max-[430px]:px-4 md:px-14 md:py-7">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center justify-end gap-5 transition-all duration-700 ease-in-out max-md:gap-[12px] sm:w-full md:justify-end lg:flex-nowrap">
          <div className="flex max-w-[420px] text-end transition-all duration-700 ease-in-out max-sm:justify-end md:w-full">
            <SearchBar />
          </div>

          <div className="flex items-center justify-end gap-[10px] max-md:gap-[6px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-bg-tertiary text-center dark:border-none dark:bg-bg-tertiary-dark md:h-11 md:w-11">
              <NightModeToggle />
            </div>
            {user?.id ? (
              <LoggedIn userProfilePictture={user?.profilePictureURL} />
            ) : isAuthPage ? (
              <></>
            ) : (
              <SigninNavButton />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
