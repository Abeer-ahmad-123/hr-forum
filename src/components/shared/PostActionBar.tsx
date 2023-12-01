import React from 'react'
import { BsBookmarkFill as BookmarkIcon } from 'react-icons/bs'
import { TbMessageCircle2Filled as MessageIcon } from 'react-icons/tb'
import { IoShareSocial } from 'react-icons/io5'
import Link from 'next/link'

interface PostActionBarProps {
  linkToFeed: string
}
const PostActionBar = ({ linkToFeed }: PostActionBarProps) => {
  return (
    <div className="flex items-center justify-between px-10 max-md:flex-col max-md:gap-[20px]">
      <div className="flex items-center justify-center gap-3">
        {/* bg-[#F9F9F9] bg on the message button before */}
        <div className="flex rounded-xl bg-background hover:bg-[#afbaf7] dark:bg-gray-700 dark:text-gray-300">
          <Link
            href={linkToFeed}
            className="text-icon-light dark:text-icon-dark flex items-center space-x-2 p-[9px] font-black">
            <BookmarkIcon size={'20px'} color="#D2D3D5" />
            <span className="font-light dark:text-gray-300">Bookmark</span>
          </Link>
        </div>
        <Link
          href={linkToFeed}
          className="flex rounded-xl bg-background hover:bg-[#afbaf7] dark:bg-gray-700 dark:text-gray-300">
          <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
            <MessageIcon size={'24px'} color="#D2D3D5" />
            <span className="font-light dark:text-gray-300">Comment</span>
          </button>
        </Link>
        <div className="flex rounded-xl bg-background hover:bg-[#afbaf7] dark:bg-gray-700 dark:text-gray-300">
          <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
            <IoShareSocial size={'24px'} color="#D2D3D5" />
            <span className="font-light dark:text-gray-300">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostActionBar
