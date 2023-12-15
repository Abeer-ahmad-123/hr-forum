import UpdownButton from '../ui/updownButton'
import CommentOrReply from '@/components/CommentOrReply'
import Reply from './Reply'
import { getComment } from '@/services/comments'
import { useState } from 'react'

const CommentSection = ({
  key,
  comment,
  refetchComments,
  commentLength,
}: any) => {
  const [comments, setComments] = useState({
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
  const convertDate = (date: string) => {
    const providedDateTime = new Date(date)
    const currentDateTime = new Date()
    const timeDifference =
      currentDateTime.getTime() - providedDateTime.getTime()

    // Convert the time difference to days, hours, and minutes
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hoursAgo = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutesAgo = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    )

    // Return the result
    if (daysAgo > 0) {
      return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`
    } else {
      return 'just now'
    }
  }
  const getAllComments = async () => {
    let index = 1
    const data = await getComment(comment.id, { page: index })
    {
      /*condition is not tested when total record is greater 10 it may vary*/
    }

    setComments({
      ...comments,
      comment:
        index === 1
          ? data.comment
          : comments.comment.replies.concat(data.comment.replies),
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
    index++
  }

  return (
    <div>
      <div className="mt-4 w-full rounded-lg bg-slate-100 pb-2.5 dark:bg-slate-800">
        <div className="flex pt-5">
          <div className="flex  flex-col items-center">
            <div className="">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="avatar"
                src={comment['author_details']?.profile_picture_url}
                className="h-8 w-8 rounded-full"
              />
            </div>


            {/* <div className="pl-5">
              <UpdownButton count={comment?.reaction_summary?.like_count} />
            </div> */}

          </div>
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-between">
              <div className="text-accent">
                {comments.comment['author_details']?.name}
              </div>
              <div className="pr-5 italic text-gray-500">
                {convertDate(comments.comment.created_at)}
              </div>
            </div>

            <div className="mt-0 h-full w-full p-7 pl-0 pt-3 text-left leading-loose text-gray-600 dark:text-white">
              {comments.comment.content}
            </div>

            <CommentOrReply
              reply={true}
              commentId={comments.comment.id}
              refetchComments={refetchComments}
            />
          </div>
        </div>

        {comments.comment?.replies?.length !== 0 &&
          comments.comment?.replies?.map((reply: any) => {
            return (
              <Reply
                key={reply.id}
                reply={reply}
                commentLength={commentLength}
                commentId={comment.id}
              />
            )
          })}
        {/*condition is not tested when total record is greater 10 it may vary*/}
        {(comments.comment.total_replies > 2 &&
          (comments.comment?.replies?.length < comments.comment.total_replies)) && (
            <button
              className="mt-4 rounded-lg bg-accent bg-opacity-50 p-2 text-white hover:bg-opacity-30"
              id={comment.id}
              onClick={getAllComments}>
              Load More
            </button>
          )}
      </div>
    </div>
  )
}

export default CommentSection
