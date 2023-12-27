import React from 'react'
import Skelton from './ui/skelton'

const RulesCardSkelton = () => {
  return (
    <>
      <div className="cursor-cursor ml-6 mr-[50px] h-[460px] w-[200px] rounded-[10px] bg-white pb-[10px] shadow-lg dark:bg-slate-800 ">
        {/* <Skelton className="pl-[7px] pr-[10px] my-[10px] py-4 h-8 px-3 text-skelton-text w-full hover:text-black hover:bg-gray-200 " /> */}
        <div className="pt-4">
          <Skelton className="mx-[15px] mb-[20px] mt-[10px] flex h-5 justify-center text-center font-bold" />
        </div>

        <ul className="cursor-pointer pl-[7px] pr-[10px] text-left">
          <li>
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>
                <Skelton className="text-skelton-text  mb-[10px] mt-[10px] h-5 w-full px-3 pl-[10px] hover:bg-gray-200 hover:text-black " />
                {index < 9 && (
                  <hr className="my-1 mt-1 border-t border-gray-400" />
                )}
              </React.Fragment>
            ))}
          </li>
        </ul>
      </div>
    </>
  )
}

export default RulesCardSkelton
