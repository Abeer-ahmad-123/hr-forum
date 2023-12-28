'use client'
////

import {
  deleteReactions,
  postReactions,
  updatePostReaction,
} from '@/services/reactions/reactions'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaRegBookmark, FaRegComment } from 'react-icons/fa'
import { PiShareFat } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import CommentOrReply from '../CommentOrReply'
import CommentSection from './CommentSection'
import { ReactionButton } from './reaction'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Dialog } from '../ui/Dialog/simpleDialog'
import SocialButtons from './SocialButtons'
import SignInDialog from './new-post/SignInDialog'

interface PostActionBarProps {
  linkToFeed: string
  postId: string
  bookmark: boolean
  user_reaction: string
  inputRef?: any
}

const PostActionBar = ({
  linkToFeed,
  postId,
  inputRef,
  bookmark,
  user_reaction,
}: PostActionBarProps) => {
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const [showSignModal, setShowSignModal] = useState(false)
  const { id } = useParams()

  const submitReaction = async (value: string, isFirstReaction: boolean) => {
    console.log('user_reaction', user_reaction)
    if (tokenInRedux) {
      const response = isFirstReaction
        ? !user_reaction
          ? await postReactions(
              {
                reactionType: value,
              },
              postId,
              tokenInRedux,
            )
          : await updatePostReaction(
              {
                reactionType: value,
              },
              postId,
              tokenInRedux,
            )
        : await deleteReactions(postId, tokenInRedux)

      if (!response?.success) {
        showErrorAlert('Something went wrong while posting reaction')
      } else {
        showSuccessAlert('posting reaction posted')
      }
    } else {
      setShowSignModal(true)
    }
  }

  const [showCommentArea, setShowCommentArea] = useState(false)
  const [comment, setComment] = useState([])
  const [bookmarkSuccess, setBookmarkSuccess] = useState(
    bookmark ? bookmark : false,
  )
  const toggleCommentArea = () => {
    id ? inputRef?.current?.focus() : setShowCommentArea((pre) => !pre)
  }
  const handleLikeWrapper = () => {
    if (!tokenInRedux) {
      setShowSignModal(true)
      return true
    } else {
      setShowSignModal(false)
      return false
    }
  }
  const handleBookmark = async () => {
    if (tokenInRedux) {
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
    } else {
      setShowSignModal(true)
    }
  }

  return (
    <>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog />
      </Dialog>
      <div className="flex flex-col">
        <div className="flex w-full justify-between px-[2%] py-1 max-md:flex-row max-md:gap-[2%]">
          {/* bg-[#F9F9F9] bg on the message button before */}

          <ReactionButton
            handleLikeWrapper={handleLikeWrapper}
            userReaction={user_reaction}
            onReact={submitReaction}
          />

          <div
            onClick={handleBookmark}
            className="dark:text-icon-dark  text-icon-light flex basis-1/4 cursor-pointer items-center justify-center space-x-2 rounded-sm px-[9px] font-black hover:bg-gray-300 dark:text-gray-300  dark:hover:text-slate-800">
            <FaRegBookmark color={bookmarkSuccess ? 'blue' : ''} />
            <span className="font-light   max-custom-sm:hidden ">Bookmark</span>
          </div>

          <div className="dark:text-icon-dark flex basis-1/4 items-center justify-center rounded-sm hover:bg-gray-300 dark:text-gray-300 dark:hover:text-slate-800">
            <button
              onClick={toggleCommentArea}
              className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
              {/* <MessageIcon size={'24px'} color="#D2D3D5" /> */}
              <FaRegComment />
              <span className="font-light   max-custom-sm:hidden ">
                Comment
              </span>
            </button>
          </div>

          <div className="dark:text-icon-dark  flex basis-1/4 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-300  dark:hover:text-slate-800">
            <Popover>
              <PopoverTrigger>
                <button className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
                  {/* <IoShareSocial size={'24px'} color="#D2D3D5" /> */}
                  <PiShareFat className="h-6 w-6 font-light" />
                  <span className="font-light  max-custom-sm:hidden ">
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

        {!id && (
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
        )}
      </div>
    </>
  )
}

export default PostActionBar
