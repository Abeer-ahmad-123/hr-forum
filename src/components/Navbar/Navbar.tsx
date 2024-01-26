'use client'
import FeaturesDropDown from '@/components/Navbar/FeaturesDropdown'
import NavMenuDropdown from '@/components/Navbar/NavMenuDropdown'
import Logo from './Logo'
import NightModeToggle from './NightModeToggle'
import SearchBar from './SearchBar'
import { useSelector } from 'react-redux'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import LoggedIn from './LoggedIn'
import SigninNavButton from './SigninNavButton'

const Navbar = () => {
  const reduxToken = useSelector(
    (state: LoggedInUser) => state.loggedInUser.token,
  )
  return (
    <div className="fixed top-0 z-50 h-14 w-full items-center bg-white px-4 py-2 shadow-sm dark:bg-black">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <FeaturesDropDown
            classNameOuter="max-md:hidden max-lg:w-[200px] w-[270px]"
            classNameInner="fixed top-[14px] ml-[-26px] max-lg:w-[200px] w-[270px]"
            classNamefeaturesDropDowm="w-[270px] max-lg:w-[200px] max-md:w-[200px]"
          />
        </div>
        <div className="flex w-full items-center justify-end max-lg:justify-between">
          <SearchBar />
          <div className="mx-5 flex items-center justify-end space-x-2">
            <NightModeToggle />

            <NavMenuDropdown />
            {reduxToken ? <LoggedIn /> : <SigninNavButton />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
