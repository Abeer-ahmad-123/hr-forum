import React from 'react'
import Image from 'next/image'

const SideCardSkill = () => {
  return (
    <div className=" max-md:hidden cursor-cursor sticky top-0 ml-[8%] h-auto max-h-screen w-[25vw] rounded-[10px]  bg-white pb-2 pt-3 shadow-lg dark:bg-slate-800 dark:text-white  ">
      <h2 className=" py-2 pl-4 text-left text-base font-medium">
        {' '}
        Skills/Languages{' '}
      </h2>
      <hr className="my-1 border-t border-gray-200" />
      <div className="ml-[5%] flex text-lg ">
        <p className=" py-3 text-gray-400"> C | C++ | Html | JS</p>
      </div>
    </div>
  )
}
export default SideCardSkill
