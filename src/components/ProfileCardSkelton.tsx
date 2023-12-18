import React from 'react'
import Skelton from './ui/skelton'

function ProfileCardSkelton() {
    return (
        <>
            <div className=''>
                <div className="relative h-[242px] bg-skelton animate-pulse ml-[50px] mr-[25px]  w-[200px]  cursor-pointer overflow-hidden  rounded-[10px] shadow-lg dark:bg-slate-800 dark:text-white">
                    <Skelton
                        className="h-[70px] width-[200px] w-full"
                    />

                    <Skelton className="flex items-center h-[50px] w-[50px] animate-pulse bg-skelton justify-center" />


                    <Skelton className="flex justify-center text-center font-bold" />

                    <Skelton className="ml-[15px] mr-[15px] flex text-justify text-[12px] font-light" />


                    <Skelton
                        className="mx-[15px] mb-[10px] mt-[10px] flex text-xs font-light" />
                    <Skelton
                        className="mx-[15px] mb-[10px] mt-[10px] flex text-xs font-semibold" />

                </div>
            </div >
        </>
    )
}

export default ProfileCardSkelton
