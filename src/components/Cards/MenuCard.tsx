import React from 'react'
import MainMenu from './MainMenu'
import ChannelCard from './ChannelCard'

interface MenuCardProps {
  path: string
  user: string | null
}

function MenuCard({ path, user }: MenuCardProps) {

  return (
    <div className='dark:bg-bg-primary-dark dark:text-gray-400'>
      <div className={`dark:bg-bg-primary-dark dark:text-gray-400 pb-6`}>
        <MainMenu path={path} user={user} />
      </div>
      <ChannelCard />
    </div>
  )
}

export default MenuCard
