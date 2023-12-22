import React from 'react'
import Image from 'next/image'
import SideCardSkill from './SideCardSkill'

const SideCardBadge = () => {
  return (
    <>
      <div className="cursor-cursor sticky top-0 ml-[8%]  h-auto max-h-screen w-full max-md:-ml-[1%] rounded-[10px]  bg-white pb-2 pt-3 shadow-lg dark:bg-slate-800 dark:text-white  ">
        <h2 className="py-2 pl-4  text-left text-base font-medium"> Badges </h2>
        <hr className="my-1 border-t border-gray-200" />
        <div className="mb-4 flex gap-[10%] ">
          <Image
            src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
            alt="profile"
            className="relative ml-6 ml-[10%] mt-4 h-[20%] w-[25%] rotate-[-10deg]   transform rounded-2xl"
            width={80}
            height={100}
          />
          <Image
            src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
            alt="profile"
            className="relative ml-6 mt-4  h-[20%] w-[25%]  transform rounded-2xl"
            width={80}
            height={100}
          />
        </div>
      </div>
    </>
  )
}
export default SideCardBadge
