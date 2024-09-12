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
import { useState } from 'react'

const Navbar = () => {
  const reduxToken = useSelector(
    (state: LoggedInUser) => state.loggedInUser.token,
  )
  const pathname = usePathname()
  const [isFocused, setIsFocused] = useState(false);


  return (
    <div className="fixed top-0 z-50 max-md:h-[72px] h-[100px] w-full items-center justify-center bg-white shadow-sm dark:bg-black border-b-[1px] border-bg-tertiary">
      <div className="flex w-full max-w-[1550px] m-auto items-center justify-between  px-6 py-4 md:px-14 md:py-7 max-[430px]:px-4">
        <div className="flex items-center">
          <Logo />
          {/* <FeaturesDropDown
            classNameOuter="max-md:hidden max-lg:w-[230px] w-[270px]"
            classNameInner="top-[14px] ml-[-26px] max-lg:w-[230px] w-[270px]"
            classNamefeaturesDropDowm="w-[270px] max-lg:w-[225px] max-md:w-[230px]"
          /> */}
        </div>
        <div className="flex sm:w-full gap-5 max-md:gap-[12px] items-center justify-end md:justify-end lg:flex-nowrap transition-all ease-in-out duration-700">
          {/* //REmove this bg-bg-tertiary */}
          <div className="flex md:w-full max-w-[420px] text-end max-sm:justify-end transition-all ease-in-out duration-700">
            <SearchBar />
          </div>

          <div className=" flex items-center justify-end gap-[10px] max-md:gap-[6px]">
            <div className='flex justify-center items-center text-center rounded-full bg-bg-tertiary border h-10 w-10 md:h-11 md:w-11'>
              <NightModeToggle />
            </div>
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
