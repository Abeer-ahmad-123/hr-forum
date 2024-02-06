'use client'
import {
  deleteReactions,
  postReactions,
  updatePostReaction,
} from '@/services/reactions/reactions'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaRegComment } from 'react-icons/fa'
import { PiShareFat } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import CommentOrReply from '../CommentOrReply'
import CommentSection from './CommentSection'
import { ReactionButton } from './reaction'

import { Dialog } from '@/components/ui/Dialog/simpleDialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import { showErrorAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostActionBarProps } from '@/utils/interfaces/posts'
import SocialButtons from './SocialButtons'
import SignInDialog from './new-post/SignInDialog'

const PostActionBar = ({
  postId,
  inputRef,
  userReaction,
  setUserReaction,
  updateReactionArray,
  reactionSummary,
  getPost,
  disableReactionButton,
  setDisableReactionButton,
  setCommentCount,
  userComment,
}: PostActionBarProps) => {
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const [showCommentArea, setShowCommentArea] = useState(false)
  const [comment, setComment] = useState([])

  const { handleRedirect } = useFetchFailedClient()
  const [showSignModal, setShowSignModal] = useState(false)
  const [popOver, setPopOver] = useState(false)
  const { id } = useParams()
  const pathName = usePathname()

  const { customFetch } = useInterceptor()

  const submitReaction = async (value: string) => {
    let response
    if (tokenInRedux) {
      try {
        if (!userReaction || userReaction === 'none') {
          response = await postReactions(
            {
              reactionType: value,
            },
            postId,
            customFetch,
            tokenInRedux,
            refreshTokenInRedux,
          )
          updateReactionArray(reactionSummary, {
            value: value,
            action: 'post',
            previousAction: userReaction,
          })
        } else if (value !== 'none' && value !== userReaction) {
          response = await updatePostReaction(
            {
              reactionType: value,
            },
            postId,
            customFetch,
            tokenInRedux,
            refreshTokenInRedux,
          )
          updateReactionArray(reactionSummary, {
            value: value,
            action: 'update',
            previousAction: userReaction,
          })
        } else if (value === 'none' || value === userReaction) {
          response = await deleteReactions(
            postId,
            customFetch,
            tokenInRedux,
            refreshTokenInRedux,
          )
          updateReactionArray(reactionSummary, {
            value: value === 'none' ? userReaction : value,
            action: 'delete',
            previousAction: userReaction,
          })
        }
        setUserReaction(userReaction === value ? '' : value)
        getPost()
        if (!response.success) {
          throw response.errors[0]
        }
      } catch (error) {
        setUserReaction('')
        if (error instanceof Error) {
          handleRedirect({ error })
        }
        showErrorAlert(`${error}`)
      } finally {
        setDisableReactionButton(false)
      }
    } else {
      setShowSignModal(true)
    }
  }

  const toggleCommentArea = () => {
    if (tokenInRedux) {
      id ? inputRef?.current?.focus() : setShowCommentArea((pre) => !pre)
    } else {
      setShowSignModal(true)
    }
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

  const setOpenPopOver = () => {
    setPopOver((pre) => !pre)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOver(false)
  }

  const handleButtonClick = () => {
    setPopOver(false)
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-between px-[2%] py-1 max-md:flex-row max-md:gap-[2%]">
          <ReactionButton
            handleLikeWrapper={handleLikeWrapper}
            userReaction={userReaction}
            onReact={submitReaction}
            disableReactionButton={disableReactionButton}
            setDisableReactionButton={setDisableReactionButton}
          />

          <div className="dark:text-icon-dark flex basis-1/4 items-center justify-center rounded-sm hover:bg-gray-300 dark:text-gray-300 dark:hover:text-slate-800">
            <button
              onClick={toggleCommentArea}
              className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
              <FaRegComment />
              <span className="font-light max-custom-sm:hidden">Comment</span>
            </button>
          </div>

          <div
            className="dark:text-icon-dark  flex basis-1/4 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-300  dark:hover:text-slate-800"
            onMouseLeave={handleMouseDown}>
            <Popover open={popOver} onOpenChange={setPopOver}>
              <PopoverTrigger className="text-icon-light dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
                <PiShareFat className="h-6 w-6 font-light" />
                <span
                  className="font-light  max-custom-sm:hidden "
                  onClick={setOpenPopOver}>
                  Share
                </span>
              </PopoverTrigger>

              <PopoverContent className="cursor-pointer bg-white">
                <SocialButtons
                  className="flex gap-3"
                  postId={postId}
                  handleButtonClick={handleButtonClick}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mx-10">
          {pathName.includes('/comment') && (
            <CommentSection
              comment={userComment}
              setCommentCount={setCommentCount}
            />
          )}
        </div>

        {!id && (
          <div className={`${!showCommentArea && 'hidden'} `}>
            <CommentOrReply
              className="m-2"
              btnClass="mr-[0px]"
              Id={postId}
              setComments={setComment}
              setCommentCount={setCommentCount}
            />
            <div className="mx-10">
              {comment.length != 0 && (
                <CommentSection
                  comment={comment[0]}
                  setCommentCount={setCommentCount}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </>
  )
}

export default PostActionBar
