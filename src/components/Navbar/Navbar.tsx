'use client'
import FeaturesDropDown from '@/components/Navbar/FeaturesDropdown'
import NavMenuDropdown from '@/components/Navbar/NavMenuDropdown'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import LoggedIn from './LoggedIn'
import Logo from './Logo'
import NightModeToggle from './NightModeToggle'
import SearchBar from './SearchBar'
import SigninNavButton from './SigninNavButton'

const Navbar = () => {
  const reduxToken = useSelector(
    (state: LoggedInUser) => state.loggedInUser.token,
  )
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-50 w-full items-center bg-white px-4 py-2 shadow-sm dark:bg-black">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <FeaturesDropDown
            classNameOuter="max-md:hidden max-lg:w-[230px] w-[270px]"
            classNameInner="top-[14px] ml-[-26px] max-lg:w-[230px] w-[270px]"
            classNamefeaturesDropDowm="w-[270px] max-lg:w-[225px] max-md:w-[230px]"
          />
        </div>
        <div className="flex w-full flex-wrap items-center justify-end max-lg:justify-between md:justify-end lg:flex-nowrap">
          <SearchBar />
          <div className="mx-5 flex items-center justify-end gap-1">
            <NightModeToggle />

            <NavMenuDropdown />
            {reduxToken ? (
              <LoggedIn />
            ) : !pathname.startsWith('/login') &&
              !pathname.startsWith('/register') ? (
              <SigninNavButton />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
