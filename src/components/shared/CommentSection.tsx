import { noProfilePicture } from '@/assets/images'
import CommentOrReply from '@/components/CommentOrReply'
import { deleteModalState } from '@/services/auth/authService'
import { getComment } from '@/services/comments'
import { AlertOctagon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ConvertDate } from '@/utils/helper'
import { useEffect, useState } from 'react'
import { getUserData } from '@/utils/local-stroage'

const CommentSection = ({
  comment,
  refetchComments,
  commentLength,
  setDeletedCommentId,
  getPostCommets,
}: any) => {
  const [replies, setReplies] = useState({
    comment: {
      id: comment.id || '',
      replies: comment.replies || [],
      author_details: comment.author_details || { name: '', id: '' },
      content: comment.content || '',
      created_at: comment.create_at || '',
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

  // const userId = useSelector(
  //   (state: LoggedInUser) => state.loggedInUser?.userData?.id,
  // )
  const userId = getUserData()?.id
  // * State for Show More / Less Comment;
  const [showFullComment, setShowFullComment] = useState(false)
  const pathName = usePathname()
  const router = useRouter()

  const getAllReplies = async () => {
    // There may be an issue when getting replying a comment after 10th Reply.
    let index = Math.floor(replies?.comment.replies?.length / 10) + 1
    const data = await getComment(comment.id, userId.toString(), {
      nestedPage: index,
    })

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
                  : [...data?.comment?.replies],
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

  const handleNavigate = () => {
    const url = `${
      comment.user_id === userId ? '/profile' : `/profile/${comment.user_id}`
    }`
    router.push(url)
    deleteModalState()
  }

  useEffect(() => {
    setReplies({ ...replies, comment: comment })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment])

  return (
    <div className={`rounded-lg ${pathName === '/feeds' ? '' : ''}`}>
      <div className="flex">
        <div className="flex  flex-col items-center">
          <div className="">
            <img
              alt="avatar"
              src={
                comment?.author_details?.profile_picture_url ||
                noProfilePicture.src
              }
              className="h-full max-h-[40px] w-full max-w-[40px] cursor-pointer rounded-full  "
              height={8}
              width={8}
              onClick={handleNavigate}
            />
          </div>
        </div>
        <div className="mx-[10px]">
          <div
            className={`w-fit flex-wrap break-all dark:bg-bg-primary-dark
               `}>
            {/* * Fixing Alignment */}
            <div className="flex flex-row items-center justify-between">
              <div
                onClick={handleNavigate}
                className="flex h-[40px] cursor-pointer items-center gap-2 text-left font-[500] text-black  dark:text-white max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
                {replies.comment?.author_details?.name}

                <div className="flex items-center justify-center gap-2 ">
                  <div className="dot h-[5px] w-[5px] rounded-full bg-black opacity-60 dark:bg-white"></div>
                  <div className="text-xs opacity-60">
                    {ConvertDate(replies?.comment?.created_at)}
                  </div>
                </div>
              </div>

              {comment.user_has_reported && (
                <div className="flex cursor-default items-center justify-center rounded-md  p-1 text-[7px] font-medium text-gray-500 ring-inset ring-gray-500/10 custom-sm:ring-1">
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
            <div className="h-full w-fit pb-3 text-left text-sm leading-loose text-black opacity-80 dark:text-white max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px]">
              {replies?.comment?.content &&
              replies?.comment?.content.length > 200
                ? replies?.comment?.content
                    .slice(0, showFullComment ? -1 : 200)
                    .concat(showFullComment ? '' : '...')
                : replies?.comment?.content ?? null}
              {replies?.comment?.content &&
              replies?.comment?.content.length > 200 ? (
                <button
                  className="ml-2 text-gray-500 dark:text-gray-400"
                  onClick={() => setShowFullComment((prev) => !prev)}>
                  Show {showFullComment ? 'Less' : 'More'}
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <div className=" ml-0 text-gray-500">
              <CommentOrReply
                reply={true}
                commentId={replies?.comment?.id}
                refetchComments={getAllReplies}
                author={replies.comment?.author_details?.name}
                setDeletedCommentId={setDeletedCommentId}
                replies={replies}
                getPostCommets={getPostCommets}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSection
