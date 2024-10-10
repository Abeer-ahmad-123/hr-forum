import React from 'react'
import Skelton from '../ui/skelton'
import PostLoadingSkelton from '../PostLoadingSkelton'

const ProfileActivityLoading = () => {
  return (
    <div className="flex w-full flex-col gap-[5px]">
      <div
        className={`w-full cursor-pointer rounded-xl bg-white px-5 py-5  shadow-lg dark:bg-slate-800 dark:text-gray-300 max-md:mt-4`}>
        <Skelton className="ml-4 h-8 w-24 rounded-sm bg-skelton" />
        <div className="mt-2 flex items-center">
          <div className="ml-4">
            <div className="flex flex-row gap-x-2">
              <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
              <Skelton className="h-8 w-24  rounded-sm bg-skelton" />
              <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start align-baseline"></div>

        {[1, 2, 3, 4].map((_, i) => (
          <PostLoadingSkelton key={i} index={i} />
        ))}
      </div>
    </div>
  )
}

export default ProfileActivityLoading
