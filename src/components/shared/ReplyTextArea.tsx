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
  setReportedCommentId,
  createdDate,
  replies,
  commentLength,
  refetchComments,
  getPostCommets,
}: any) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [showSignModal, setShowSignModal] = useState<boolean>(false)

  const [showTextArea, setShowTextArea] = useState(false)
  const [formattedDate, setFormatedDate] = useState('')
  const params = useParams()
  const postId = params?.id as string
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''

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

  useEffect(() => {
    setFormatedDate(FormatCreatedAt(createdDate))
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2.5 ">
        <div className="group relative inline-block">
          <span className="pointer ml-2 text-left text-xs text-gray-400 hover:underline">
            {ConvertDate(replies?.comment?.created_at)}
          </span>
          <div className="absolute bottom-full left-[79px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 p-2 text-sm text-gray-200 group-hover:block max-md:left-[100px]">
            {formattedDate}
          </div>
        </div>
        <button
          onClick={toggleTextArea}
          className="cursor-pointer text-sm text-gray-400 hover:underline">
          Reply
        </button>
        <Popover>
          <PopoverTrigger className="flex items-center space-x-2 py-2 text-sm text-gray-400 hover:underline dark:text-gray-300">
            Share
          </PopoverTrigger>

          <PopoverContent className="bg-white">
            <SocialButtons
              className="flex gap-3"
              postId={postId}
              commentId={commentId}
            />
          </PopoverContent>
        </Popover>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <button
            className="pointer text-sm text-gray-400 hover:underline"
            onClick={handleClick}>
            Report
          </button>

          <DialogContent className="bg-white sm:max-w-[500px]">
            <Report
              commentId={commentId}
              reportType="comment"
              setOpenDialog={setOpenDialog}
              setReportedReplyId={setReportedCommentId}
              getPostCommets={getPostCommets}
            />
          </DialogContent>
        </Dialog>
      </div>
      {replies?.comment?.replies?.length !== 0 &&
        replies?.comment?.replies?.map((reply: any, index: number) => {
          return (
            <Reply
              reply={reply}
              commentLength={commentLength}
              commentId={commentId}
              key={commentId}
              setReportedReplyId={() => {}}
              getPostCommets={getPostCommets}
            />
          )
        })}

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
          placeholder={`Reply to ${author}`}
          className={'max-sm:w-2/3'}
        />
      </div>

      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog />
      </Dialog>
    </div>
  )
}

export default ReplyTextArea
