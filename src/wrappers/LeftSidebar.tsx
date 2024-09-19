'use client'
import Logout from '@/components/Cards/Logout'
import MenuCard from '@/components/Cards/MenuCard'
import ProfileCard from '@/components/Cards/ProfileCard'
import { useRouter, usePathname } from 'next/navigation'
import { clearUser } from '@/store/Slices/loggedInUserSlice'
import { logout } from '@/services/auth/authService'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

function LeftSidebar() {

  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [])

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
    <div className='mr-5 w-full basis-1/4 max-w-[322px] dark:bg-bg-primary-dark dark:text-white relative pl-10 pr-7 flex-col items-end justify-between bg-white h-screen max-h-[882px] py-7 hidden md:inline-block'>
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
