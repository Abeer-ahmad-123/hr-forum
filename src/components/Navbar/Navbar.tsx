import NightModeToggle from './NightModeToggle'
import Logo from './Logo'
import SearchBar from './SearchBar'
import NavMenuDropdown from '@/components/Navbar/NavMenuDropdown'
import FeaturesDropDown from '@/components/Navbar/FeaturesDropdown'
import LogButton from './LogButton'
type NavbarProps = {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
      <div className="fixed top-0 z-50 flex h-14 w-full items-center justify-between bg-white px-4 py-2 shadow-sm">
        <Logo />

        <FeaturesDropDown />

        <SearchBar />
        <div className="mx-5 flex items-center justify-end space-x-2">
          <NightModeToggle />

          <LogButton />
          <NavMenuDropdown />
        </div>
      </div>
    </>
  )
}

export default Navbar
