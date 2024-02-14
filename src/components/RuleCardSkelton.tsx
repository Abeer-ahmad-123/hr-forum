import React from 'react'
import Skelton from './ui/skelton'

interface RulesCardSkeltonProps {
  token?: string
  className?: string
}

const RulesCardSkelton = ({ token, className }: RulesCardSkeltonProps) => {
  return (
    <div
      className={`${!className && 'mr-4'} ${
        token ? 'mt-[20px]' : ''
      } ${className} max-h-screen w-[225px] cursor-pointer rounded-[10px] bg-white px-[10px] pb-2  pt-3  shadow-lg dark:bg-slate-800`}>
      <div className="pt-4">
        <Skelton className="mx-[15px] mb-[20px] mt-[10px] flex h-5 justify-center rounded-[5px] text-center font-bold" />
      </div>

      <ul className="cursor-pointer list-none text-left">
        <li>
          {Array.from({ length: 10 }).map((_, index) => (
            <React.Fragment key={index}>
              <Skelton className="mx-[15px] mb-[10px] mt-2 flex h-5 justify-center rounded-[5px] text-center font-bold" />
            </React.Fragment>
          ))}
        </li>
      </ul>
    </div>
  )
}

export default RulesCardSkelton
