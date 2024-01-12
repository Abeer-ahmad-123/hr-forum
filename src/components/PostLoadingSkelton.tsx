import Skelton from '@/components/ui/skelton'
import React from 'react'

const PostLoadingSkelton = () => {
  return (
    <div className="my-2 w-full cursor-pointer rounded-xl bg-white px-5 py-5  shadow-lg dark:bg-slate-800 dark:text-gray-300 max-md:mt-4">
      <div className=" flex">
        <Skelton className="h-6 w-6  rounded-full" />
        <Skelton className="ml-2 h-6  w-24 rounded-md" />
      </div>
      <div>
        <Skelton className="w-54 ml-7 mt-2 h-10 rounded-md" />
      </div>
    </div>
  )
}

export default PostLoadingSkelton
