import React from 'react'
import Skelton from './ui/skelton'

function ProfileCardSkelton() {
  return (
    <>
      <div className="dark:bg-skelton-dark relative ml-[50px] mr-[25px] h-80 w-[200px] cursor-pointer overflow-hidden rounded-[10px]  bg-white shadow-lg dark:text-white">
        <Skelton className="h-[70px] w-full" />

        <div className="mt-[-20px] flex items-center justify-center">
          <Skelton className="h-14 w-14 rounded-full bg-skelton" />
        </div>

        <Skelton className="mx-[15px] mt-2 flex h-5 justify-center text-center font-bold" />

        <Skelton className="ml-[15px] mr-[15px] mt-3 flex h-24 text-[12px] font-light" />

        <hr className="my-1 ml-3 mr-3 border-t border-gray-200 dark:border-gray-800" />

        <Skelton className="mx-[15px] mt-2 flex h-5 justify-center text-center font-bold" />

        <Skelton className="mx-[15px] mt-2 flex h-5 justify-center text-center font-bold" />
      </div>
    </>
  )
}

export default ProfileCardSkelton
