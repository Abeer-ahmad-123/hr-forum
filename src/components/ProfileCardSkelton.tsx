import React from 'react'
import Skelton from './ui/skelton'

function ProfileCardSkelton() {
    return (
        <>
            <div className="relative bg-white ml-[50px] mr-[25px] h-80 w-[200px] cursor-pointer overflow-hidden rounded-[10px]  shadow-lg dark:bg-skelton-dark dark:text-white">
                <Skelton className="h-[70px] w-full" />

                <div className="flex items-center justify-center mt-[-20px]">
                    <Skelton className="h-14 w-14 rounded-full bg-skelton" />
                </div>

                <Skelton className="flex justify-center text-center font-bold mx-[15px] mt-2 h-4 rounded-sm" />

                <Skelton className="ml-[15px] mr-[15px] flex text-justify text-[12px] font-light mt-3 h-24 rounded-md" />

                <hr className="my-1 ml-3 mr-3 border-t border-gray-200 dark:border-gray-800" />

                <Skelton className="flex justify-center text-center font-bold mx-[15px] mt-2 h-4 rounded-sm" />

                <Skelton className="flex justify-center text-center font-bold mx-[15px] mt-2 h-4 rounded-sm" />
            </div>

        </>
    )
}

export default ProfileCardSkelton
