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
    <>
      <div className="fixed top-0 z-50 flex h-14 w-full items-center justify-between bg-white px-4 py-2 shadow-sm dark:bg-black">
        <Logo />
        <FeaturesDropDown />
        {/* code reading Done uptill here!!!  */}
        <SearchBar />
        <div className="mx-5 flex items-center justify-end space-x-2">
          <NightModeToggle />

          <NavMenuDropdown />
          <LogButton />
        </div>
      </div>
    </>
  )
}

export default Navbar
