import React from "react";
import ProfileBadges from "./SideCardBadge";
import Image from "next/image";


const ProfilePosts = () => {

return (
   
   
   <div>

      
          <div
        className="  mx-auto   w-[50vw] cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
<div className="px-5 py-4">
            <div className=" flex   text-left  font-semibold dark:text-white">
            <div> 
            <Image
                            src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
                            alt="profile"
                            className="relative  rounded-full transform  w-[40%] h-[100%]"
                            width={80}
                            height={100}
                        />
                        

            </div>
<div className="flex flex-col"> 
            <div className="font-light">
                Yong Jennifer
            </div >
            <div className="font-normal text-gray-400 text-[80%]"> 
elemnts of the post
</div>
            </div>
          
            </div>
         </div>
         <div className="text-left pl-[20%] text-[150%] text-bold">
    Apache AGE:Code Style Guide
    </div>
    <div className="mt-[4%] mb-[1%] text-left pl-[20%] pb-4"> 
    <div className="mb-[2 %]">
        <span>
            <span className="text-green-600"> #</span>Apache
        </span>
        <span>
            <span className="text-blue-500 pl-3"> #</span>Apache
        </span>
        <span>
            <span className="text-yellow-400 pl-3"> #</span>Apache
        </span>
        <span>
            <span className="text-violet-600 pl-3"> #</span>Apache
        </span>
    </div>
</div>
    </div>
   
    </div>
 
)

}
export default ProfilePosts