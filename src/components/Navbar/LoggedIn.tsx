'use client'
import { logout } from '@/services/auth/authService'
import { clearUser } from '@/store/Slices/loggedInUserSlice'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { noProfilePicture } from '@/assets/images'

function LoggedIn() {
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const [openPopover, setOpenPopover] = useState(false)
  const user = useSelector((state: any) => state.loggedInUser.userData)
  const { name, username, profilePictureURL } = user

  const handleClosePopover = () => {
    setOpenPopover(false)
  }

  const handleNavigateProfile = () => {
    // * Adding functionality on Menu Button instead of child of menu button onClick fn; => Profile
    handleClosePopover()
    router.push('/profile')
  }

  const handleLogout = () => {
    // * Adding functionality on Menu Button instead of child of menu button onClick fn; => Logout
    handleClosePopover()
    logout()
    dispatch(clearUser())
    if (pathname.includes('saved') || pathname === '/profile') {
      router.push('/feeds')
    } else {
      router.refresh()
    }
  }
  const handleChange = () => {
    setOpenPopover(!openPopover)
  }

  const UserDropdown = () => (
    <div className="relative flex justify-center max-w-xs cursor-pointer select-none items-center gap-4 break-words">
      <div className="relative">
        <div className="relative h-10 w-10 md:h-11 md:w-11 overflow-hidden rounded-full border-[2px] border-bg-green">
          <img
            className="h-full w-full rounded-full object-cover"
            src={profilePictureURL || noProfilePicture.src}
            height={25}
            width={25}
            alt="User"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className='flex justify-center items-center'>
      <DropdownMenu open={openPopover} onOpenChange={setOpenPopover}>
        <DropdownMenuTrigger
          className="border-none outline-0"
          onChange={handleChange}>
          <UserDropdown />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="dark:hover:bg-primary-accent bg-white dark:bg-black">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleNavigateProfile}
            className="cursor-pointer hover:text-white">
            <div className={`block px-4 py-2 text-sm dark:text-white`}>
              Profile
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer hover:text-white">
            <button
              name="logout button"
              className={`block px-4 py-2 text-sm  dark:text-white`}>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default LoggedIn
