import React from 'react'
import Skelton from './ui/skelton'

interface RulesCardSkeltonProps {
  user?: number
  className?: string
}

const RulesCardSkelton = ({ user, className }: RulesCardSkeltonProps) => {
  return (
    <div
      className={`${!className && 'mr-4'} ${
        user ? 'mt-[20px]' : ''
      } ${className} mr-4 mt-5 h-screen max-h-[882px] w-[392px] bg-white  px-[10px] pb-2 pt-3 dark:bg-slate-800`}>
      <Skelton className="mx-[15px] mb-[20px] mt-[10px] flex h-11 justify-center rounded-[5px] text-center font-bold" />

      <ul className="cursor-pointer list-none text-left">
        <li>
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={index}>
              <Skelton className="mx-[15px] mb-[10px] mt-2 flex h-8 justify-center rounded-[5px] text-center font-bold" />
            </React.Fragment>
          ))}
        </li>
      </ul>
      <Skelton className="mx-[15px] mb-[20px] mt-52 flex h-8 justify-center rounded-[5px] text-center font-bold" />
    </div>
  )
}

export default RulesCardSkelton
