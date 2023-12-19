import React from 'react'
import CommentSkelton from '../CommentSkelton'
import Skelton from '../../ui/skelton'
import UpdownButtonSkelton from '../UpDownButtonSkelton'

async function Post({ isDialogPost = false }) {
  return (
    <div className="mx-auto my-5 h-screen max-w-5xl rounded-full ">
      <div
        className={`mx-auto mb-5 flex max-w-screen-lg cursor-pointer rounded-xl bg-white
      ${!isDialogPost && 'shadow-lg'} 
      dark:bg-dark-primary dark:text-gray-300`}
      >
        <div className="ml-[22px] mt-6">
          <UpdownButtonSkelton />
        </div>
        <div className="flex w-full flex-col items-center p-10 pt-0">
          <div className="mt-6 flex w-full">
            <Skelton className="h-9 w-96 shrink-0 rounded-xl bg-skelton text-left dark:text-white" />
            <div className="flex w-full place-content-around items-center">
              <Skelton
                className={`h-fit w-max  whitespace-nowrap rounded-lg bg-accent px-10 py-3 text-sm font-semibold text-white dark:bg-dark-background-secondary dark:text-white`}
              />
              <div className="flex h-10 items-center p-1.5">
                <Skelton className="h-8 w-8 rounded-full bg-skelton" />
              </div>
            </div>
          </div>
          <Skelton className="mt-10 h-80 w-full rounded-xl bg-skelton p-7 pl-0 text-left leading-loose text-gray-600 dark:text-white" />

          <div className="mb-2 mt-5 w-full border-b border-gray-500 pr-5"></div>

          <div className="w-full">{<CommentSkelton />}</div>
        </div>
      </div>
    </div>
  )
}

export default Post
