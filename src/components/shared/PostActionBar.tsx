'use client'
import React from 'react'
import { PiShareFat } from 'react-icons/pi'
import { FaRegBookmark, FaRegComment } from 'react-icons/fa'
import { useState } from 'react'
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
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'

interface PostActionBarProps {
  linkToFeed: string
  postId: string
  bookmark: boolean
}

const PostActionBar = ({
  linkToFeed,
  postId,
  bookmark,
}: PostActionBarProps) => {
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
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
  const [bookmarkSuccess, setBookmarkSuccess] = useState(
    bookmark ? bookmark : false,
  )
  const toggleCommentArea = () => {
    setShowCommentArea((pre) => !pre)
  }
  const handleBookmark = async () => {
    const getApi = bookmarkSuccess ? deleteBookmarkPost : bookmarkPost
    try {
      const res = await getApi(postId, tokenInRedux)
      if (res.data) {
        setBookmarkSuccess(true)
      } else if (res.status === 200) {
        setBookmarkSuccess(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between px-[2%] max-md:flex-row max-md:gap-[2%]">
        {/* bg-[#F9F9F9] bg on the message button before */}

        <div className="dark:text-icon-dark flex basis-1/4 items-center justify-center rounded-sm hover:bg-gray-200 ">
          <ReactionButton onReact={submitReaction} />
          <div className="font-light dark:text-gray-300 max-custom-sm:hidden">
            Like
          </div>
        </div>
        <div
          onClick={handleBookmark}
          className="dark:text-icon-dark text-icon-light flex basis-1/4 items-center justify-center space-x-2 rounded-sm px-[9px] font-black hover:bg-gray-200 ">
          <FaRegBookmark color={bookmarkSuccess ? 'blue' : ''} />
          <span className="font-light dark:text-gray-300 max-custom-sm:hidden ">
            Bookmark
          </span>
        </div>

        <div className="dark:text-icon-dark flex basis-1/4 items-center justify-center rounded-sm hover:bg-gray-200">
          <button
            onClick={toggleCommentArea}
            className="text-icon-light dark:text-icon-dark px-[9px]font-black flex  items-center space-x-2">
            {/* <MessageIcon size={'24px'} color="#D2D3D5" /> */}
            <FaRegComment />
            <span className="font-light dark:text-gray-300 max-custom-sm:hidden ">
              Comment
            </span>
          </button>
        </div>

        <div className="dark:text-icon-dark flex basis-1/4 items-center justify-center rounded-sm hover:bg-gray-200">
          <Popover>
            <PopoverTrigger>
              <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
                {/* <IoShareSocial size={'24px'} color="#D2D3D5" /> */}
                <PiShareFat />
                <span className="font-light dark:text-gray-300 max-custom-sm:hidden ">
                  Share
                </span>
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
