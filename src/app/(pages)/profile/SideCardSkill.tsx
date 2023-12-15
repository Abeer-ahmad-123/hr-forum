import React from "react";
import Image from 'next/image'

const  SideCardSkill=()=> {
   return ( 
   <div className="w-[25vw] ml-[8%] pt-3 pb-2 bg-white dark:bg-slate-800 dark:text-white shadow-lg  h-auto rounded-[10px] cursor-cursor sticky max-h-screen top-0  ">
        <h2 className=" text-left pl-4 text-base font-medium py-2"> Skills/Languages </h2>
        <hr className="my-1 border-t border-gray-200" />
        <div className="flex text-lg ml-[5%] ">
       <p className=" text-gray-400 py-3" > C | C++ | Html | JS</p>

        </div>
    </div>
    )

}
export default SideCardSkill;