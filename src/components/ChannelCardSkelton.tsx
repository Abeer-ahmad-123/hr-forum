import { channels } from '@/utils/data'
import React from 'react'
import Skelton from './ui/skelton'

function ChannelCardSkelton() {
  return (
    <>
      <div className="sticky top-0 ml-[50px] mt-[25px] h-[300px] max-h-screen w-[200px] cursor-pointer rounded-[10px] bg-white pt-3 shadow-lg">
        <Skelton className="mx-[15px] mb-[20px] mt-[10px] flex h-5 justify-center text-center font-bold" />

        <ul className="ml-[2px] cursor-pointer list-none text-left">
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={index}>
              <Skelton className="mx-[15px] mb-[10px] mt-2 flex h-5 justify-center text-center font-bold" />
              {index < 5 && (
                <hr className="mx-3 my-1 border-t border-gray-400" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div></div>
    </>
  )
}

export default ChannelCardSkelton
