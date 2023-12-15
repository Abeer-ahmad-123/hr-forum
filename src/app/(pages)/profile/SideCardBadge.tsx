import React from "react";
import Image from 'next/image'
import SideCardSkill from "./SideCardSkill";

const  SideCardBadge=()=> {
   return ( 
    <> 
   <div className="w-[25vw] ml-[8%] pt-3 pb-2 bg-white dark:bg-slate-800 dark:text-white shadow-lg  h-auto rounded-[10px] cursor-cursor sticky max-h-screen top-0  ">
        <h2 className="text-left pl-4 text-base font-medium py-2"> Badges </h2>
        <hr className="my-1 border-t border-gray-200" />
        <div className="flex gap-[10%] mb-4 ">
        <Image
                            src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
                            alt="profile"
                            className="relative ml-[10%] w-[25%] h-[20%] ml-6 mt-4 rounded-2xl   transform rotate-[-10deg]"
                            width={80}
                            height={100}
                        />
                         <Image
                            src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
                            alt="profile"
                            className="relative ml-6 mt-4  rounded-2xl transform  w-[25%] h-[20%]"
                            width={80}
                            height={100}
                        />

        </div>
    </div>
    
    </>
    )

}
export default SideCardBadge;