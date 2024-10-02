'use client'
import Logout from '@/components/Cards/Logout'
import MenuCard from '@/components/Cards/MenuCard'
import ProfileCard from '@/components/Cards/ProfileCard'
import { useRouter, usePathname } from 'next/navigation'
import { logout } from '@/services/auth/authService'
import { removeLocalStroage } from '@/utils/local-stroage'

const LeftSidebar = ({ token, user }: any) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    removeLocalStroage()
    logout()
    // dispatch(clearUser())
    if (pathname.includes('saved') || pathname === '/profile') {
      router.push('/feeds')
    } else {
      router.refresh()
    }
  }
  return (
    <div className="relative hidden h-screen max-h-[882px] w-full max-w-[25%] basis-1/4 flex-col items-end justify-between bg-white py-7 pl-10 pr-7 dark:bg-bg-primary-dark dark:text-white lg:inline-block">
      <div>
        {user?.id && <ProfileCard user={user} />}
        <MenuCard path={pathname} user={user?.id} />
      </div>
      {user?.id && (
        <div
          className="group absolute top-[80%] w-[254px] cursor-pointer rounded-md px-4 hover:bg-bg-tertiary hover:font-[800] dark:text-bg-tertiary dark:hover:bg-bg-tertiary-dark"
          onClick={handleLogout}>
          <Logout />
        </div>
      )}
    </div>
  )
}

export default LeftSidebar
