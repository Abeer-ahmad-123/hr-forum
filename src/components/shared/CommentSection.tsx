import CommentOrReply from '@/components/CommentOrReply'
import { getComment } from '@/services/comments'
import { noProfilePicture } from '@/assets/images'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { AlertOctagon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CommentSection = ({
  comment,
  refetchComments,
  commentLength,
  setReportedCommentId,
  getPostCommets,
  setCommentCount,
}: any) => {
  const [replies, setReplies] = useState({
    comment: {
      id: '',
      replies: [],
      author_details: { name: '', id: '' },
      content: '',
    },
    pagination: {
      CurrentPage: 0,
      FirstRecord: 0,
      LastRecord: 0,
      RecordsPerPage: 0,
      TotalPages: 0,
      TotalRecords: 0,
    },
  })

  const userId = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData?.id,
  )

  const getAllReplies = async () => {
    // There may be an issue when getting replying a comment after 10th Reply.
    let index = replies?.pagination?.CurrentPage + 1
    const data = await getComment(comment.id, userId, { nestedPage: index })

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
  useEffect(() => {
    setReplies({ ...replies, comment: comment })
  }, [comment])

  return (
    <div className="mt-4 w-full rounded-lg">
      <div className="flex">
        <div className="flex  flex-col items-center">
          <div className="">
            <img
              alt="avatar"
              src={
                comment?.author_details?.profile_picture_url ||
                noProfilePicture.src
              }
              className="h-8 w-8 rounded-full border border-black"
              height={8}
              width={8}
            />
          </div>
        </div>
        <div className="ml-3">
          <div className="w-fit min-w-[18rem] rounded-2xl bg-slate-100 px-4 py-2 dark:bg-slate-800">
            <div className="flex flex-row justify-between ">
              <div
                className="text-left text-accent max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
                {replies.comment?.author_details?.name}
              </div>

              {comment.user_has_reported && (
                <div className="flex w-fit cursor-default items-center justify-center rounded-md  p-1 text-[7px] font-medium text-gray-500 ring-inset ring-gray-500/10 custom-sm:ring-1">
                  <div className="group relative inline-block">
                    <AlertOctagon
                      size={15}
                      className="hidden cursor-pointer max-custom-sm:block"
                    />
                    <div className="absolute bottom-full left-[50px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 px-[5px] py-[2px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[50px]">
                      Reported
                    </div>
                  </div>

                  <span className="max-custom-sm:hidden">Reported</span>
                </div>
              )}
            </div>
            <div
              className=" h-full w-fit  pb-1 text-left leading-loose text-gray-600 dark:text-white max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
              {replies?.comment?.content}
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <div className=" ml-0 text-gray-500">
              <CommentOrReply
                reply={true}
                commentId={replies?.comment?.id}
                refetchComments={getAllReplies}
                author={replies.comment?.author_details?.name}
                setReportedCommentId={setReportedCommentId}
                replies={replies}
                getPostCommets={getPostCommets}
                setCommentCount={setCommentCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSection
