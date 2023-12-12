'use client'
import React from 'react'
import { BsBookmarkFill as BookmarkIcon } from 'react-icons/bs'
import { TbMessageCircle2Filled as MessageIcon } from 'react-icons/tb'
import { IoShareSocial } from 'react-icons/io5'
import Link from 'next/link'
import { useState } from 'react'
import TextArea from '../ui/TextArea'
import CommentOrReply from '../CommentOrReply'
import CommentSection from './CommentSection'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SocialButtons from './SocialButtons'


interface PostActionBarProps {
  linkToFeed: string,
  postId: string
}
const PostActionBar = ({ linkToFeed, postId }: PostActionBarProps) => {
  const [showCommentArea, setShowCommentArea] = useState(false)
  const [comment, setComment] = useState([])
  const toggleCommentArea = () => {
    setShowCommentArea((pre) => !pre)
  }

  return (
    <>
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
          <div
            className="flex rounded-xl bg-background hover:bg-[#afbaf7] dark:bg-gray-700 dark:text-gray-300">

            <button
              onClick={toggleCommentArea}
              className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300"
            >
              <MessageIcon size={'24px'} color="#D2D3D5" />
              <span className="font-light dark:text-gray-300">Comment</span>
            </button>
          </div>
          <div className="flex rounded-xl bg-background hover:bg-[#afbaf7] dark:bg-gray-700 dark:text-gray-300">
            <Popover >
              <PopoverTrigger>
                <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
                  <IoShareSocial size={'24px'} color="#D2D3D5" />
                  <span className="font-light dark:text-gray-300">Share</span>
                </button>
              </PopoverTrigger>

              <PopoverContent className='bg-white'>
                <SocialButtons className='flex gap-3' />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div >

      <div className={`${!showCommentArea && 'hidden'} `}>
        <CommentOrReply
          className="px-8 m-2"
          btnClass='mr-[0px]'
          Id={postId}
          setComments={setComment}
        />
        <div className='mx-10'>
          {(comment.length != 0) && <CommentSection comment={comment[0]} />}
        </div>

      </div>
    </>
  )
}

export default PostActionBar
