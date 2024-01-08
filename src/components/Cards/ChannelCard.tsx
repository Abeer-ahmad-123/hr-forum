'use client'
import { ChannelInterface, StoreChannels } from '@/utils/interfaces/channels'
import { useSelector } from 'react-redux'
import { CustomLink } from '@/components/shared/customLink/CustomLink'
import { Building2 } from 'lucide-react'
import React from 'react'

const ChannelCard = () => {
  const channels = useSelector(
    (state: StoreChannels) => state?.channels?.channels,
  )
  return (
    <>
      <div className=" sticky top-0 mr-4 mt-[25px] h-auto max-h-screen w-[200px] rounded-[10px] border border-solid border-gray-300 bg-white px-[10px] pb-2 pt-3 shadow-lg dark:bg-slate-800 dark:text-white  ">
        <h1 className="mb-[0px] mt-[10px] text-start text-[11px] font-semibold">
          Channels
        </h1>
        <ul className="ml-[2px] cursor-pointer list-none text-left">
          {channels.map((channel: ChannelInterface, index: number) => (
            <React.Fragment key={index}>
              <CustomLink href={`/channels/${channel.slug}`}>
                <li className="my-[10px] flex gap-2.5 text-[12px] font-medium text-gray-500 hover:text-accent">
                  <Building2 size={20} />
                  <span>{channel.name}</span>
                </li>
              </CustomLink>
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div></div>
    </>
  )
}
export default ChannelCard
