import React from 'react'
import MainMenu from './MainMenu'
import ChannelCard from './ChannelCard'

interface MenuCardProps {
  path: string
  token: string | null
}

const MenuCard = ({ path, token }: MenuCardProps) => {
  return (
    <div className="dark:bg-bg-primary-dark dark:text-gray-400">
      <div className={`pb-6 dark:bg-bg-primary-dark dark:text-gray-400`}>
        <MainMenu path={path} token={token} />
      </div>
      <ChannelCard />
    </div>
  )
}

export default MenuCard
