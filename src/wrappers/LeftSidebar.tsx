import Logout from '@/components/Cards/Logout'
import MenuCard from '@/components/Cards/MenuCard'
import ProfileCard from '@/components/Cards/ProfileCard'
import { useRouter, usePathname } from 'next/navigation'
import { clearUser } from '@/store/Slices/loggedInUserSlice'
import { logout } from '@/services/auth/authService'
import { useDispatch, useSelector } from 'react-redux'


interface LeftSideBarProps {
  token: string | null
  pathname: string
}
function LeftSidebar({ token, pathname }: LeftSideBarProps) {
 
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = () => {
    logout()
    dispatch(clearUser())
    if (pathname.includes('saved') || pathname === '/profile') {
      router.push('/feeds')
    } else {
      router.refresh()
    }
  }

  return (
    <div className='w-full mr-8 basis-1/4 dark:bg-bg-primary-dark dark:text-white relative px-10 flex-col items-end justify-between bg-white h-screen max-h-[882px] py-7 hidden md:inline-block'>
      <div>
        {token && <ProfileCard />}
        <MenuCard path={pathname} token={token} />
      </div>
      {token && 
      <div className='w-[254px] absolute top-[80%] px-4 hover:bg-bg-tertiary cursor-pointer rounded-md group dark:hover:bg-bg-tertiary-dark dark:text-bg-tertiary hover:font-[800]'
       onClick={handleLogout}>
        <Logout />
      </div>}
    </div>
  )
}

export default LeftSidebar
