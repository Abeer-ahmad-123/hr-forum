'use client'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '@/services/auth/authService'
import { clearUser } from '@/store/Slices/loggedInUserSlice'

function LoggedIn() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.loggedInUser.userData)
  const { name, username, profilePictureURL } = user

  function handleLogout() {
    dispatch(clearUser())
    logout()
    router.refresh()
  }

  const UserDropdown = () => (
    <div className="relative flex cursor-pointer items-center gap-4 ">
      <span className="hidden text-right lg:block">
        <span className="block text-sm font-medium text-black dark:text-white">
          {name}
        </span>
        <span className="block text-xs dark:text-white">{username}</span>
      </span>
      <div className="relative">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <img
            className="h-full w-full object-cover"
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="User"
          />
        </div>
        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
      </div>
    </div>
  )

  return (
    <>
      <div className="max-lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserDropdown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:hover:bg-primary-accent left-8 bg-white dark:bg-black dark:hover:bg-opacity-30">
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">
                <div className={`block px-4 py-2 text-sm dark:text-white`}>
                  Profile
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">
                <div className={`block px-4 py-2 text-sm  dark:text-white`}>
                  Settings
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
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
