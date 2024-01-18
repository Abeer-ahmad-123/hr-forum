import CommentOrReply from '@/components/CommentOrReply'
import { getComment } from '@/services/comments'
import { ConvertDate, FormatCreatedAt } from '@/utils/helper'

import { AlertOctagon } from 'lucide-react'
import { useState } from 'react'
import LoadMoreReplyButton from './LoadMoreReplyButton'
import Reply from './Reply'

const CommentSection = ({
  comment,
  refetchComments,
  commentLength,
  setReportedCommentId,
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

  const formattedDate = FormatCreatedAt(replies.comment?.created_at)
  const [reportedReplyId, setReportedReplyId] = useState<string | null>(null)

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
    <div className="mt-4 w-full rounded-lg">
      <div className="flex">
        <div className="flex  flex-col items-center">
          <div className="">
            <img
              alt="avatar"
              src={comment?.author_details?.profile_picture_url}
              className="h-8 w-8 rounded-full border border-black"
              height={8}
              width={8}
            />
          </div>
        </div>
        <div className="  ml-3  ">
          <div className="w-fit min-w-[18rem] rounded-2xl bg-slate-100 px-4 py-2 dark:bg-slate-800">
            <div className="flex flex-row justify-between ">
              <div className=" text-left text-accent ">
                {replies.comment?.author_details?.name}
              </div>

              {comment.user_has_reported && (
                <div className="flex w-fit cursor-default items-center justify-center rounded-md  p-1 text-[7px] font-medium text-gray-500 ring-inset ring-gray-500/10 custom-sm:ring-1">
                  {/*  */}
                  <div className="group relative inline-block">
                    <AlertOctagon
                      size={15}
                      className="hidden cursor-pointer max-custom-sm:block"
                    />
                    <div className="absolute bottom-full left-[50px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 px-[5px] py-[2px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[50px]">
                      Reported
                    </div>
                  </div>
                  {/*  */}

                  <span className="max-custom-sm:hidden">Reported</span>
                </div>
              )}
            </div>
            <div className=" h-full w-fit  pb-1 text-left leading-loose text-gray-600 dark:text-white">
              {replies?.comment?.content}
            </div>
          </div>

          <div className="flex items-baseline gap-2.5">
            <div className="group relative inline-block">
              <span className="pointer ml-2 pt-4 text-left text-xs text-gray-400 hover:underline">
                {convertDate(replies?.comment?.created_at)}
              </span>
              <div className="absolute bottom-full left-[79px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 p-2 text-sm text-gray-200 group-hover:block max-md:left-[100px]">
                {formattedDate}
              </div>
            </div>
            <div className=" ml-0 text-gray-500">
              <CommentOrReply
                reply={true}
                commentId={replies?.comment?.id}
                refetchComments={getAllReplies}
                author={replies.comment?.author_details?.name}
                setReportedCommentId={setReportedCommentId}
              />
            </div>
          </div>
        </div>
      </div>

      {replies.comment?.replies?.length !== 0 &&
        replies.comment?.replies?.map((reply: any) => {
          {
            return (
              <Reply
                key={reply?.id}
                reply={reply}
                commentLength={commentLength}
                commentId={comment?.id}
                setReportedReplyId={setReportedReplyId}
              />
            )
          }
        })}

      <LoadMoreReplyButton
        getAllReplies={getAllReplies}
        commentId={comment?.id}
        total_replies={replies.comment?.total_replies}
        repliesLength={replies.comment?.replies?.length}
      />
    </div>
  )
}

export default CommentSection
