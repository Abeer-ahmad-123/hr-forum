import React from 'react'
import Skelton from './ui/skelton'
import { getUserFromCookie } from '@/utils/cookies'

interface ChannelCardSkeltonProps {
  className?: string
}

const ChannelCardSkelton = async ({ className }: ChannelCardSkeltonProps) => {
  const { user } = await getUserFromCookie()
  return (
    <div
      className={`${!className && 'mr-4'} 
       ${user?.id ? 'mt-[20px]' : 'mt-[15px]'} 
       ${className} mt-[0px] h-screen max-h-[882px] w-[391px] bg-white px-[10px] pb-2 pt-3 dark:bg-slate-800`}>
      <div className="px-4">
        <Skelton className="mx-16 mb-[20px]  ml-10 mt-[10px] flex h-8 w-[220px] rounded-[5px]" />
        <Skelton className="mx-16 mb-[20px]  ml-10 mt-[10px] flex h-8 w-[220px] rounded-[5px]" />
      </div>

      <Skelton className="mx-[15px] ml-10 mt-[10px] h-11 w-[254px] rounded-[5px]" />

      <ul className="ml-10 w-[254px] list-none pt-2 text-left">
        {Array.from({ length: 6 }).map((_, index) => (
          <React.Fragment key={index}>
            <Skelton className="mx-[15px] mb-[10px] mt-5 flex h-8 rounded-[5px]" />
          </React.Fragment>
        ))}
      </ul>

      <Skelton className="mx-[15px] mb-5 ml-10 mt-16 flex h-8 w-[254px] rounded-[5px]" />
    </div>
  )
}

export default ChannelCardSkelton
