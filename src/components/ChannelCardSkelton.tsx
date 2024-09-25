import React from 'react'
import Skelton from './ui/skelton'

const ChannelCardSkelton = () => {
  return (
    <div>
      <Skelton className=" h-11 w-[254px] rounded-[5px]" />

      <ul className="w-[254px] list-none pt-2 text-left">
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
