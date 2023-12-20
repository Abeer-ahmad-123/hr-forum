import UpdownButton from '../ui/updownButton'
import CommentOrReply from '@/components/CommentOrReply'
import Reply from './Reply'
import { getComment } from '@/services/comments'
import { useState } from 'react'
import LoadMoreReplyButton from './LoadMoreReplyButton'
import { ConvertDate } from '@/utils/helper'
import { FormatCreatedAt } from '@/utils/helper'

const CommentSection = ({
  key,
  comment,
  refetchComments,
  commentLength,
}: any) => {
  const [replies, setReplies] = useState({
    comment: comment,
    pagination: {
      CurrentPage: 0,
      FirstRecord: 0,
      LastRecord: 0,
      RecordsPerPage: 0,
      TotalPages: 0,
      TotalRecords: 0,
    },
  })

  const convertDate = ConvertDate

  /////

  const formattedDate = FormatCreatedAt(replies.comment.created_at)

  /////

  const getAllReplies = async () => {
    // There may be an issue when getting replying a comment after 10th Reply.
    let index = replies?.pagination?.CurrentPage + 1
    const data = await getComment(comment.id, { page: index })

    setReplies({
      ...replies,
      comment:
        index === 1
          ? data.comment
          : {
              ...replies.comment,
              replies:
                replies?.pagination?.CurrentPage > 1
                  ? [...replies.comment.replies, ...data.comment.replies]
                  : [...data.comment.replies],
            },
      pagination: data.pagination
        ? data.pagination
        : {
            CurrentPage: 0,
            FirstRecord: 0,
            LastRecord: 0,
            RecordsPerPage: 0,
            TotalPages: 0,
            TotalRecords: 0,
          },
    })
  }

  return (
    <div>
      <div className="mt-4 w-full rounded-lg pb-2.5">
        <div className="flex pt-5">
          <div className="flex  flex-col items-center">
            <div className="">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="avatar"
                src={comment['author_details']?.profile_picture_url}
                className="h-8 w-8 rounded-full border border-black"
              />
            </div>
          </div>
          <div className=" min-w-sm ml-3  ">
            <div className=" rounded-2xl  bg-slate-100 dark:bg-slate-800">
              <div className="ml-6 pt-3 text-left text-accent ">
                {replies.comment['author_details']?.name}
              </div>

              <div className=" ml-6 h-full w-full  pb-1 text-left leading-loose text-gray-600 dark:text-white">
                {replies.comment.content}
              </div>
            </div>

            <div className="flex ">
              <div className="group relative inline-block">
                <span className=" ml-2 text-left italic text-gray-400">
                  {convertDate(replies.comment.created_at)}
                </span>
                <div className="absolute bottom-full ml-5 hidden -translate-x-1/2 transform whitespace-nowrap rounded-xl bg-gray-400 p-2 text-sm text-gray-200 group-hover:block">
                  {/* {convertDate(replies.comment.created_at)} */}
                  {formattedDate}
                </div>
              </div>
              <div className=" ml-3 text-gray-500">
                <CommentOrReply
                  reply={true}
                  commentId={replies.comment.id}
                  refetchComments={getAllReplies}
                />
              </div>
            </div>
          </div>
        </div>

        {replies.comment?.replies?.length !== 0 &&
          replies.comment?.replies?.map((reply: any) => {
            return (
              <Reply
                key={reply.id}
                reply={reply}
                commentLength={commentLength}
                commentId={comment.id}
              />
            )
          })}

        <LoadMoreReplyButton
          getAllReplies={getAllReplies}
          commentId={comment.id}
          total_replies={replies.comment.total_replies}
          repliesLength={replies.comment?.replies?.length}
        />
      </div>
    </div>
  )
}

export default CommentSection
