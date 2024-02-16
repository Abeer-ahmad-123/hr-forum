'use client'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
import SignInDialog from './new-post/SignInDialog'

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
}: any) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  const [popOver, setPopOver] = useState<boolean>(false)

  const [showTextArea, setShowTextArea] = useState<boolean>(false)
  const [formattedDate, setFormatedDate] = useState<String>('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deletedReplyId, setDeletedReplyId] = useState<string>('')
  const [repliesLocal, setRepliesLocal] = useState([])
  const params = useParams()

  const postId = params?.id as string
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const userData = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const toggleTextArea = () => {
    setShowTextArea((pre) => !pre)
  }

  const handleClick = () => {
    if (!tokenInRedux) {
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

    if (!tokenInRedux) {
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

  return (
    <div>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="bg-white sm:max-w-[500px]">
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

      <div className="flex items-center gap-2.5 ">
        <div className="group relative inline-block">
          <span
            className="pointer ml-2 text-left text-xs text-gray-400 hover:underline max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
            {ConvertDate(replies?.comment?.created_at)}
          </span>
          <div
            className="absolute bottom-full left-[79px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 p-2 text-sm text-gray-200 group-hover:block max-md:left-[100px]  max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
            {formattedDate}
          </div>
        </div>
        <button
          onClick={toggleTextArea}
          className="cursor-pointer text-sm text-gray-400 hover:underline max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
          Reply
        </button>

        <div onMouseLeave={handleMouseDown}>
          <Popover open={popOver} onOpenChange={setPopOver}>
            <PopoverTrigger className="flex items-center space-x-2 py-2 text-sm text-gray-400 hover:underline dark:text-gray-300">
              <span
                className="cursor-pointer text-sm text-gray-400 hover:underline max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]"
                onClick={setOpenPopOver}>
                Share
              </span>
            </PopoverTrigger>

            <PopoverContent className="bg-white">
              <SocialButtons
                className="flex gap-3"
                postId={postId}
                commentId={commentId}
                handleButtonClick={handleButtonClick}
              />
            </PopoverContent>
          </Popover>
        </div>
        {author == userData.name ? (
          <div
            onClick={handleDeleteClick}
            className="cursor-pointer text-sm text-gray-400 hover:underline max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
            Delete
          </div>
        ) : (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <button
              className="cursor-pointer text-sm text-gray-400 hover:underline max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]"
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
      <div className={` ${!showTextArea && 'hidden'} `}>
        <TextArea
          submitCallback={submitCallback}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCommentPage={true}
          inputRef={inputRef}
          placeholder={`Reply to ${author === userData.name ? 'you' : author}`}
          className={'max-sm:w-2/3'}
          classNameOuter={'mr-4'}
        />
      </div>

      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </div>
  )
}

export default ReplyTextArea
