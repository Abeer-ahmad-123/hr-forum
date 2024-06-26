'use client'
import { logout } from '@/services/auth/authService'
import { clearUser } from '@/store/Slices/loggedInUserSlice'
import { usePathname, useRouter } from 'next/navigation'
// import nProgress from 'nprogress'
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
    // nProgress.start()
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

  useEffect(() => {
    return () => {
      // nProgress.done()
    }
  }, [])

  const UserDropdown = () => (
    <div className="relative flex cursor-pointer select-none items-center break-words gap-4 max-w-xs">
      <span className="text-right max-custom-sm:hidden">
        <span className="inline-block text-sm font-medium text-black dark:text-white break-words">
          {name}
        </span>
        <span className="block text-xs dark:text-white">{username}</span>
      </span>
      <div className="relative">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <img
            className="h-full w-full rounded-full object-cover"
            src={profilePictureURL || noProfilePicture.src}
            height={25}
            width={25}
            alt="User"
          />
        </div>
        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
      </div>
    </div>
  )

  return (
    <div>
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
            <div
              className={`block px-4 py-2 text-sm dark:text-white`}
              // onClick={handleNavigateProfile}
            >
              Profile
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer hover:text-white">
            <button
              name="logout button"
              // onClick={handleLogout}
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
