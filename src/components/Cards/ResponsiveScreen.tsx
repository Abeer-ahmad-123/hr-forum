'use client'
import React, { useState } from "react"
import ResProfileCard from "./ResposniveProfileCard"
import ResChannelCard from "./ResponsiveChannelCard"
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import PostBar from '@/components/shared/new-post/NewPostModal'


const RespScreen = () =>{
    const [showComponent , setShowComponent] = useState(false)

const handleClick = () => {
    setShowComponent(!showComponent);

}
    return (
        <> 
        <div> <ResProfileCard />
{showComponent && <ResChannelCard/>}
<div className='pointer w-full mb-5'> 
<button className="text-gray-500" onClick={handleClick} > {showComponent ? (
              <div className="flex flex-row justify-center items-center gap-x-2">
                Hide Details 
                 <FaAngleUp />
                
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center gap-x-2">
                Show More <span> 
                <FaAngleDown />
                </span>
              </div>
            )} </button>

</div> 


</div>

        </>
    )
}
export default RespScreen