import React from 'react'
import ProfileBadges from './SideCardBadge'
import Image from 'next/image'

const ProfilePosts = () => {
  return (
    <div>
      <div className="  mx-auto   w-[50vw] cursor-pointer rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
        <div className="px-5 py-4">
          <div className=" flex   text-left  font-semibold dark:text-white">
            <div>
              <Image
                src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
                alt="profile"
                className="relative  h-[100%] w-[40%]  transform rounded-full"
                width={80}
                height={100}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-light">Yong Jennifer</div>
              <div className="text-[80%] font-normal text-gray-400">
                elemnts of the post
              </div>
            </div>
          </div>
        </div>
        <div className="text-bold pl-[20%] text-left text-[150%]">
          Apache AGE:Code Style Guide
        </div>
        <div className="mb-[1%] mt-[4%] pb-4 pl-[20%] text-left">
          <div className="mb-[2 %]">
            <span>
              <span className="text-green-600"> #</span>Apache
            </span>
            <span>
              <span className="pl-3 text-blue-500"> #</span>Apache
            </span>
            <span>
              <span className="pl-3 text-yellow-400"> #</span>Apache
            </span>
            <span>
              <span className="pl-3 text-violet-600"> #</span>Apache
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfilePosts
