'use client'
import { logout } from '@/services/auth/authService'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import UserIcon from '@/assets/icons/userIcon'
import LogoutIcon from '@/assets/icons/logoutIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { noProfilePicture } from '@/assets/images'
import { LoggedInProps } from '@/utils/interfaces/loggedIn'
import Link from 'next/link'
import { removeLocalStroage } from '@/utils/local-stroage'

const LoggedIn = ({ userProfilePictture }: LoggedInProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [openPopover, setOpenPopover] = useState(false)

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
    removeLocalStroage()
    router.refresh()
    // dispatch(clearUser())
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
    <div className="relative  max-w-xs cursor-pointer select-none items-center justify-center gap-4 break-words">
      <div className="relative">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-[2px] border-bg-green md:h-11 md:w-11">
          <img
            className="h-full w-full rounded-full object-cover"
            src={userProfilePictture || noProfilePicture.src}
            height={25}
            width={25}
            alt="User"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu open={openPopover} onOpenChange={setOpenPopover}>
        <DropdownMenuTrigger
          className="border-none outline-0"
          onChange={handleChange}>
          <UserDropdown />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="dark:hover:bg-primary-accent w-[224px] border border-[#E4E4E7] bg-white p-0 dark:border-[#282828] dark:bg-black">
          <Link href={'/profile'}>
            {' '}
            <DropdownMenuItem
              onClick={handleNavigateProfile}
              className="m-0 h-[42px] cursor-pointer px-3 py-3 hover:text-white">
              <div className={`flex gap-2 text-sm dark:text-white`}>
                <UserIcon />
                Profile
              </div>
            </DropdownMenuItem>
          </Link>

          <hr className=" h-[1px] w-full bg-[#E4E4E7] dark:border-[#282828]" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="h-[42px] cursor-pointer border border-t-0  border-[#E4E4E7] px-3 py-3 hover:text-white dark:border-[#282828]">
            <button
              name="logout button"
              className={`flex w-full gap-2 text-sm  dark:text-white`}>
              <LogoutIcon />
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default LoggedIn
