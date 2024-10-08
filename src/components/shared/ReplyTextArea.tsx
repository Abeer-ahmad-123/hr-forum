'use client'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ConvertDate, FormatCreatedAt } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useSelector } from 'react-redux'
import CommentDelete from '../CommentDelete'
import Report from '../Report/Report'
import TextArea from '../ui/TextArea'
import LoadMoreReplyButton from './LoadMoreReplyButton'
import Reply from './Reply'
import SocialButtons from './SocialButtons'
import SignInDialog from './NewPost/SignInDialog'
import { getUserFromCookie } from '@/utils/cookies'
import { getUserData } from '@/utils/local-stroage'
import { userData } from '@/utils/interfaces/userData'

function ReplyTextArea({
  submitCallback,
  setIsLoading,
  isLoading,
  commentId,
  inputRef = null,
  author = '',
  setDeletedCommentId,
  createdDate,
  replies,
  commentLength,
  refetchComments,
  getPostCommets,
  accessToken,
}: any) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  const [showTextArea, setShowTextArea] = useState<boolean>(false)
  const [deletedReplyId, setDeletedReplyId] = useState<string>('')
  const [formattedDate, setFormatedDate] = useState<String>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [popOver, setPopOver] = useState<boolean>(false)
  const [userData, setUserData] = useState<userData>()
  const [repliesLocal, setRepliesLocal] = useState([])

  const params = useParams()

  const postId = params?.id as string

  // const tokenInRedux =
  //   useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  // const userData = useSelector(
  //   (state: LoggedInUser) => state?.loggedInUser?.userData,
  // )

  const toggleTextArea = () => {
    setShowTextArea((pre) => !pre)
  }

  const handleClick = () => {
    if (!accessToken) {
      setShowSignModal(true)
    } else {
      setOpenDialog(true)
    }
  }

  const setOpenPopOver = () => {
    setPopOver((pre) => !pre)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOver(false)
  }
  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setPopOver(false)
    console.log('accessToken in replpy', accessToken)

    if (!accessToken) {
      setShowSignModal(true)
    } else {
      setOpenDeleteDialog(true)
    }
  }

  const handleButtonClick = () => {
    setPopOver(false)
  }

  useEffect(() => {
    setFormatedDate(FormatCreatedAt(createdDate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (deletedReplyId) {
      setRepliesLocal(
        replies?.comment?.replies.filter((reply: any) => {
          return reply.id !== Number(deletedReplyId)
        }),
      )
    } else {
      setRepliesLocal(replies?.comment?.replies)
    }
  }, [replies, deletedReplyId])

  useEffect(() => {
    const userData = getUserData()
    if (userData) setUserData(userData)
  }, [])

  return (
    <div>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="bg-white sm:max-w-[472px]">
          <CommentDelete
            setOpenDeleteDialog={setOpenDeleteDialog}
            commentId={replies?.comment?.id}
            setDeletedCommentId={setDeletedCommentId}
            deletedCommentId={'deletedCommentId'}
            postId={replies?.comment?.post_id}
            setDeletedReplyId={() => {}}
            deletedReplyId=""
          />
        </DialogContent>
      </Dialog>

      <div className="flex h-[19px] items-center gap-2.5 ">
        <button
          name="reply button"
          onClick={toggleTextArea}
          className="max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px] cursor-pointer text-sm font-medium text-black
                       opacity-60 hover:underline dark:text-white">
          Reply
        </button>

        <div onMouseLeave={handleMouseDown}>
          <Popover open={popOver} onOpenChange={setPopOver}>
            <PopoverTrigger
              className="flex items-center space-x-2 py-2 text-black opacity-60 hover:underline dark:text-gray-300"
              name="share option button"
              aria-label="share option"
              aria-labelledby="shareOptionLabel"
              role="button">
              <span
                className="opacity-60hover:underline max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px] cursor-pointer text-sm
                       font-medium text-black dark:text-white"
                onClick={setOpenPopOver}>
                Share
              </span>
            </PopoverTrigger>

            <PopoverContent className="rounded-[20px] bg-white p-2 shadow-[#00000059]">
              <SocialButtons
                className="flex gap-2 rounded-[20px]"
                postId={postId}
                handleButtonClick={handleButtonClick}
              />
            </PopoverContent>
          </Popover>
        </div>
        {author == userData?.name ? (
          <div
            onClick={handleDeleteClick}
            className="max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px] cursor-pointer text-sm font-medium text-black
                       opacity-60 hover:underline dark:text-white">
            Delete
          </div>
        ) : (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <button
              name="report button"
              className="max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px] cursor-pointer text-sm font-medium text-black
                       opacity-60 hover:underline dark:text-white"
              onClick={handleClick}>
              Report
            </button>

            <DialogContent className="bg-white sm:max-w-[500px]">
              <Report
                commentId={commentId}
                reportType="comment"
                setOpenDialog={setOpenDialog}
                setReportedReplyId={() => {}}
                getPostCommets={getPostCommets}
                setReported={() => {}}
                setDeletedCommentId={() => {}}
                getUserSpecificDetailFunc={() => {}}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      {repliesLocal?.length !== 0 &&
        repliesLocal?.map((reply: any) => (
          <Reply
            reply={reply}
            commentLength={commentLength}
            commentId={commentId}
            key={commentId}
            setReportedReplyId={() => {}}
            setDeletedReplyId={setDeletedReplyId}
            getPostCommets={getPostCommets}
          />
        ))}

      <LoadMoreReplyButton
        getAllReplies={refetchComments}
        commentId={commentId}
        total_replies={replies?.comment?.total_replies}
        repliesLength={replies?.comment?.replies?.length}
      />
      <div className={` ${!showTextArea && ' hidden'} mt-[10px] `}>
        <TextArea
          submitCallback={submitCallback}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCommentPage={true}
          inputRef={inputRef}
          placeholder={`Reply to ${author === userData?.name ? 'you' : author}`}
          className={'max-sm:w-2/3'}
          classNameOuter={'mr-4'}
          accessToken={accessToken}
        />
      </div>

      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </div>
  )
}

export default ReplyTextArea
