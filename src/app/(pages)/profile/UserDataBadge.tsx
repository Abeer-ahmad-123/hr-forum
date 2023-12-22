import React from 'react'

import { BsPostcard } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { BiHash } from "react-icons/bi";

const UserDataBadge = () => {
  return (
    <>
      <div className="  min-w-[15rem]  h-auto max-h-screen text-left rounded-[10px]  bg-white pb-2 pt-3 shadow-lg dark:bg-slate-800 dark:text-white  ">
        <div className='flex flex-col pl-5 leading-[50px] py-3'>
            <div className=' flex items-center text-gray-400'> <span className='pr-2'><BsPostcard/> </span> post published</div>
            <div className= ' flex items-center text-gray-400'> <span className='pr-2'><FaRegComment/> </span> comment written</div>
            <div className='flex items-center  text-gray-400'><span className='pr-2'><BiHash/> </span> tags followed</div>
        </div>
        
      </div>
    </>
  )
}
export default UserDataBadge
