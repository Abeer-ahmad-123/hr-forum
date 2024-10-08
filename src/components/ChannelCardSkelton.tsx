import React from 'react'
import Skelton from './ui/skelton'

interface ChannelCardSkeltonProps {
  token?: string
  className?: string
}

const ChannelCardSkelton = ({ token, className }: ChannelCardSkeltonProps) => {
  return (
    <div
      className={`${!className && 'mr-4'} 
       ${token ? 'mt-[20px]' : 'mt-[15px]'} 
       ${className} mt-[0px] max-h-screen w-[225px] cursor-pointer rounded-[10px] border border-solid border-gray-300  bg-white  px-[10px] pb-2 pt-3 shadow-lg dark:bg-slate-800`}>
      <Skelton className="mx-[15px] mb-[20px] mt-[10px] flex h-5 justify-center rounded-[5px] text-center font-bold" />

      <ul className="cursor-pointer list-none text-left">
        {Array.from({ length: 6 }).map((_, index) => (
          <React.Fragment key={index}>
            <Skelton className="mx-[15px] mb-[10px] mt-2 flex h-5 justify-center rounded-[5px] text-center font-bold" />
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

export default ChannelCardSkelton
