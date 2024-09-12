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
       ${className} mt-[0px] h-screen max-h-[882px] w-[391px] bg-white px-[10px] pb-2 pt-3 dark:bg-slate-800`}>

      <div className='px-4'>
        <Skelton className="ml-10 mx-16  w-[220px] mb-[20px] mt-[10px] flex h-8 rounded-[5px]" />
        <Skelton className="ml-10 mx-16  w-[220px] mb-[20px] mt-[10px] flex h-8 rounded-[5px]" />
      </div>

      <Skelton className="ml-10 mx-[15px] w-[254px] mt-[10px] h-11 rounded-[5px]" />

      <ul className="ml-10 list-none text-left pt-2 w-[254px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <React.Fragment key={index}>
            <Skelton className="mx-[15px] mb-[10px] mt-5 flex h-8 rounded-[5px]" />
          </React.Fragment>
        ))}
      </ul>

      <Skelton className="ml-10 mx-[15px] mt-16 w-[254px] mb-5 flex h-8 rounded-[5px]" />
    </div>
  )
}

export default ChannelCardSkelton
