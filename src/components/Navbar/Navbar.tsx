'use client'
import FeaturesDropDown from '@/components/Navbar/FeaturesDropdown'
import NavMenuDropdown from '@/components/Navbar/NavMenuDropdown'
import LogButton from './LogButton'
import Logo from './Logo'
import NightModeToggle from './NightModeToggle'
import SearchBar from './SearchBar'
type NavbarProps = {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="fixed top-0 z-50 h-14 w-full items-center bg-white px-4 py-2 shadow-sm dark:bg-black">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <FeaturesDropDown />
        </div>
        <div className="flex w-full items-center justify-end max-lg:justify-between">
          <SearchBar />
          <div className="mx-5 flex items-center justify-end space-x-2">
            <NightModeToggle />

            <NavMenuDropdown />
            <LogButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
