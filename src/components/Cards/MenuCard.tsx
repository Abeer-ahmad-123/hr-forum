import React from 'react'
import MainMenu from './MainMenu'
import ChannelCard from './ChannelCard'
import { getUserFromCookie } from '@/utils/cookies'
import { ChannelByIdInterface, ChannelInterface } from '@/utils/interfaces/channels'
import { PostsInterface } from '@/utils/interfaces/posts'

interface MenuCardProps {
  data: {
    channels: ChannelInterface[] | ChannelByIdInterface[]
    posts: PostsInterface[]
  }
}

async function MenuCard({ data }: MenuCardProps) {
  const { user } = await getUserFromCookie()
  return (
    <div className='dark:bg-slate-800 dark:text-gray-400'>
      <div className={`dark:bg-slate-800 dark:text-gray-400 ${!user && 'pt-7'} pb-6`}>
        <MainMenu />
      </div>
      <ChannelCard initialChannels={data.channels as ChannelInterface[]} />
    </div>
  )
}

export default MenuCard
