import Logout from '@/components/Cards/Logout'
import MenuCard from '@/components/Cards/MenuCard'
import ProfileCard from '@/components/Cards/ProfileCard'
import React from 'react'

interface LeftSideBarProps {
  token: string | null
  pathname: string
}
function LeftSidebar({ token, pathname }: LeftSideBarProps) {
  return (
    <div className='w-full mr-8 basis-1/4 dark:bg-bg-primary-dark dark:text-white relative px-10 flex-col items-end justify-between bg-white h-screen max-h-[882px] py-7 hidden md:inline-block'>
      <div>
        {token && <ProfileCard />}
        <MenuCard path={pathname} token={token} />
      </div>
      <div className='w-[254px] absolute top-[80%] px-4 hover:bg-bg-tertiary cursor-pointer rounded-md group dark:hover:bg-bg-tertiary-dark dark:text-bg-tertiary hover:font-[800]'>
        <Logout />
      </div>
    </div>
  )
}

export default LeftSidebar
