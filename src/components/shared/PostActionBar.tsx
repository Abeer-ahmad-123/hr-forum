'use client'
import React from 'react'
import { BsBookmarkFill as BookmarkIcon } from 'react-icons/bs'
////

import { PiShareFatThin } from 'react-icons/pi'
import { FaRegBookmark, FaRegComment } from 'react-icons/fa'

import { TbMessageCircle2Filled as MessageIcon } from 'react-icons/tb'
import { IoShareSocial } from 'react-icons/io5'
import Link from 'next/link'
import { useState } from 'react'
import TextArea from '../ui/TextArea'
import CommentOrReply from '../CommentOrReply'
import CommentSection from './CommentSection'
import { ReactionButton } from './reaction'
import { postReactions } from '@/services/reactions/reactions'
import { showErrorAlert } from '@/utils/helper'
import { useSelector } from 'react-redux'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SocialButtons from './SocialButtons'

interface PostActionBarProps {
  linkToFeed: string
  postId: string
}

const PostActionBar = ({ linkToFeed, postId }: PostActionBarProps) => {
  const tokenInRedux = useSelector((state) => state?.loggedInUser?.token)
  const submitReaction = async (value: string) => {
    const response = await postReactions(
      {
        reactionType: value,
      },
      postId,
      tokenInRedux,
    )
    if (!response?.success) {
      showErrorAlert('Something went wrong while posting reaction')
    }
  }

  const [showCommentArea, setShowCommentArea] = useState(false)
  const [comment, setComment] = useState([])
  const toggleCommentArea = () => {
    setShowCommentArea((pre) => !pre)
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-stretch justify-between px-[2%] max-md:flex-col max-md:gap-[20px]">
        {/* bg-[#F9F9F9] bg on the message button before */}

        <div className="dark:text-icon-dark flex basis-1/4 items-center justify-center rounded-sm hover:bg-gray-200 ">
          <ReactionButton onReact={submitReaction} />
          <div className="font-light dark:text-gray-300">Like</div>
        </div>
        <div className="flex basis-1/4 items-center justify-center hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
          <Link
            href={linkToFeed}
            className="text-icon-light dark:text-icon-dark px-[9px]font-black flex  items-center space-x-2">
            <FaRegBookmark />
            <span className="font-light dark:text-gray-300">Bookmark</span>
          </Link>
        </div>

        <div className="flex basis-1/4 items-center justify-center hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
          <button
            onClick={toggleCommentArea}
            className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
            {/* <MessageIcon size={'24px'} color="#D2D3D5" /> */}
            <FaRegComment />
            <span className="font-light dark:text-gray-300">Comment</span>
          </button>
        </div>

        <div className="flex basis-1/4 items-center justify-center hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
          <Popover>
            <PopoverTrigger>
              <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
                {/* <IoShareSocial size={'24px'} color="#D2D3D5" /> */}
                <PiShareFatThin />
                <span className="font-light dark:text-gray-300">Share</span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="bg-white">
              <SocialButtons className="flex gap-3" postId={postId} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className={`${!showCommentArea && 'hidden'} `}>
        <CommentOrReply
          className="m-2 px-8"
          btnClass="mr-[0px]"
          Id={postId}
          setComments={setComment}
        />
        <div className="mx-10">
          {comment.length != 0 && <CommentSection comment={comment[0]} />}
        </div>
      </div>
    </div>
  )
}

export default PostActionBar
