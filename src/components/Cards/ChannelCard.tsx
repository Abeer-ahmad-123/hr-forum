'use client'
import { ChannelInterface, StoreChannels } from '@/utils/interfaces/channels'
import React from 'react'
import { useSelector } from 'react-redux'
import { CustomLink } from '@/components/shared/customLink/CustomLink'

const ChannelCard = () => {
  const channels = useSelector(
    (state: StoreChannels) => state?.channels?.channels,
  )
  return (
    <>
      <div className="cursor-cursor sticky top-0 mr-4 mt-[25px] h-auto max-h-screen w-[200px] rounded-[10px] bg-white pb-2 pt-3 shadow-lg dark:bg-slate-800 dark:text-white  ">
        <h1 className="mb-[0px] mt-[10px] justify-center text-center text-[17px] font-medium">
          THE CHANNELS
        </h1>
        <ul className="ml-[2px] cursor-pointer list-none text-left">
          {channels.map((channel: ChannelInterface, index: number) => (
            <React.Fragment key={index}>
              <CustomLink href={`/channels/${channel.slug}`}>
                <li className=" p-2 text-[14px] font-medium text-gray-500 hover:text-accent">
                  <span className="pr-[10px]">#</span>
                  <span>{channel.name}</span>
                </li>
              </CustomLink>
              {index < channels.length - 1 && (
                <hr className="mx-3 border-t border-gray-200" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div></div>
    </>
  )
}
export default ChannelCard
