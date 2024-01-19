'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import TextArea from '../ui/TextArea'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ConvertDate, FormatCreatedAt } from '@/utils/helper'
import SocialButtons from './SocialButtons'
import Reply from './Reply'
import LoadMoreReplyButton from './LoadMoreReplyButton'

function ReplyTextArea({
  submitCallback,
  setIsLoading,
  isLoading,
  commentId,
  inputRef = null,
  author = '',
  createdDate,
  replies,
  commentLength,
  refetchComments,
}: any) {
  const [showTextArea, setShowTextArea] = useState(false)
  const [formattedDate, setFormatedDate] = useState('')

  const params = useParams()
  const postId = params?.id as string

  const toggleTextArea = () => {
    setShowTextArea((pre) => !pre)
  }

  useEffect(() => {
    setFormatedDate(FormatCreatedAt(createdDate))
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2.5 ">
        <div className="group relative inline-block">
          <span className="cursor-pointer text-sm text-gray-400 hover:underline">
            {ConvertDate(createdDate)}
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
      </div>
      {replies.comment?.replies?.length !== 0 &&
        replies.comment?.replies?.map((reply: any, index: number) => {
          return (
            <Reply
              reply={reply}
              commentLength={commentLength}
              commentId={commentId}
              key={commentId}
            />
          )
        })}

      <LoadMoreReplyButton
        getAllReplies={refetchComments}
        commentId={commentId}
        total_replies={replies.comment?.total_replies}
        repliesLength={replies.comment?.replies?.length}
      />
      <div className={` ${!showTextArea && 'hidden'} `}>
        <TextArea
          submitCallback={submitCallback}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCommentPage={true}
          inputRef={inputRef}
          placeholder={`Reply to ${author}`}
        />
      </div>
    </div>
  )
}

export default ReplyTextArea
