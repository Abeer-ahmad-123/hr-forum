import CommentOrReply from '@/components/CommentOrReply'
import { getComment } from '@/services/comments'
import { ConvertDate, FormatCreatedAt } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import LoadMoreReplyButton from './LoadMoreReplyButton'
import Reply from './Reply'

const CommentSection = ({ comment, refetchComments, commentLength }: any) => {
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

  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const router = useRouter()

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

  const handleImgClick = () => {
    router.push(
      `${
        userDetails?.id === comment?.user_id
          ? '/profile'
          : `/profile/${comment?.user_id}`
      }`,
    )
  }

  return (
    <div className=" mt-4 w-full rounded-lg px-[45px]">
      <div className="flex">
        <div className="flex min-h-[32px] min-w-[32px]  flex-col items-center">
          <div className="cursor-pointer rounded-full border border-black">
            <img
              alt="profile picture"
              height={8}
              width={8}
              src={comment?.['author_details'].profile_picture_url}
              className="h-8 min-h-[32px] w-8 min-w-[32px] rounded-full"
              onClick={handleImgClick}
            />
          </div>
        </div>

        <div className="  ml-3  ">
          <div className="w-fit min-w-[18rem] rounded-2xl bg-slate-100 px-4 py-2 dark:bg-slate-800">
            <div
              className=" cursor-pointer text-left text-accent hover:underline"
              onClick={handleImgClick}>
              {replies.comment?.author_details?.name}
            </div>

            <div className=" ml-6 h-full w-full  pb-1 text-left leading-loose text-gray-600 dark:text-white">
              {replies?.comment?.content}
            </div>
          </div>

          <div className="flex items-baseline gap-2.5">
            <div className=" ml-0 text-gray-500">
              <CommentOrReply
                reply={true}
                commentId={replies?.comment?.id}
                refetchComments={getAllReplies}
                author={replies.comment?.author_details?.name}
                createdDate={replies?.comment?.created_at}
                replies={replies}
                commentLength={commentLength}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSection
