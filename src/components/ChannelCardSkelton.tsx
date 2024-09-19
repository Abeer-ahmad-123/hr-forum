import React from 'react'
import Skelton from './ui/skelton'

const ChannelCardSkelton = () => {
  return (
    <div>
      <Skelton className=" w-[254px] h-11 rounded-[5px]" />

      <ul className="list-none text-left pt-2 w-[254px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <React.Fragment key={index}>
            <Skelton className="mb-[10px] mt-4 flex h-8 rounded-[5px]" />
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

export default ChannelCardSkelton
