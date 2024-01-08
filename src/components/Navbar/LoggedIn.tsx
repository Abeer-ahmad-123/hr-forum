'use client'
import { logout } from '@/services/auth/authService'
import { clearUser } from '@/store/Slices/loggedInUserSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomLink } from '../shared/customLink/CustomLink'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function LoggedIn() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [openPopover, setOpenPopover] = useState(false)
  const user = useSelector((state: any) => state.loggedInUser.userData)
  const { name, username, profilePictureURL } = user

  const handleClosePopover = () => {
    setOpenPopover(false)
  }

  function handleLogout() {
    logout()
    dispatch(clearUser())
    router.refresh()
  }

  const UserDropdown = () => (
    <div className="relative flex cursor-pointer items-center gap-4 ">
      <span className="text-right max-custom-sm:hidden">
        <span className="block text-sm font-medium text-black dark:text-white ">
          {name}
        </span>
        <span className="block text-xs dark:text-white">{username}</span>
      </span>
      <div className="relative">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image
            className="h-full w-full rounded-full object-cover"
            src={
              profilePictureURL || 'https://ui-avatars.com/api/?name=John+Doe'
            }
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
    <>
      <div>
        <DropdownMenu open={openPopover} onOpenChange={setOpenPopover}>
          <DropdownMenuTrigger
            onChange={() => {
              setOpenPopover(!openPopover)
            }}>
            <UserDropdown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:hover:bg-primary-accent left-8 bg-white dark:bg-black dark:hover:bg-opacity-30">
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleClosePopover}
              className="hover:text-white">
              <CustomLink href="/profile">
                <div className={`block px-4 py-2 text-sm dark:text-white`}>
                  Profile
                </div>
              </CustomLink>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleClosePopover}
              className="hover:text-white">
              <button onClick={handleLogout}>
                <div className={`block px-4 py-2 text-sm  dark:text-white`}>
                  Logout
                </div>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default LoggedIn
