import React from 'react'
import MainMenu from './MainMenu'
import ChannelCard from './ChannelCard'
import { getUserFromCookie } from '@/utils/cookies'
import { ChannelByIdInterface, ChannelInterface } from '@/utils/interfaces/channels'
import { PostsInterface } from '@/utils/interfaces/posts'

interface MenuCardProps {
  data?: {
    channels: ChannelInterface[] | ChannelByIdInterface[]
    posts: PostsInterface[] | []
  },
  path: string
  token: string | null
}

function MenuCard({ data, path, token }: MenuCardProps) {

  return (
    <div className='dark:bg-bg-primary-dark dark:text-gray-400'>
      <div className={`dark:bg-bg-primary-dark dark:text-gray-400 ${!token && 'pt-7'} pb-6`}>
        <MainMenu path={path} token={token} />
      </div>
      <ChannelCard initialChannels={data?.channels as ChannelInterface[]} />
    </div>
  )
}

export default MenuCard
