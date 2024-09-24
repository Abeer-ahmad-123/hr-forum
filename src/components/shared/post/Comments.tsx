'use client'
import CommentOrReply from '@/components/CommentOrReply'
import { getPostsComments } from '@/services/comments'
import type { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import type { CommentInterface, Pagination } from '@/utils/interfaces/posts'
import { Reply } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
import CommentSection from '../CommentSection'
import { getUserData } from '@/utils/local-stroage'
type Props = {
  postId: string
  initialComments: CommentInterface[]
  pagination: Pagination
  inputRef: any
  getPostCommets: () => void
}

function Comments({
  postId,
  initialComments,
  pagination,
  inputRef = null,
  getPostCommets,
}: Props) {
  const searchParams = useSearchParams()
  // const userData = useSelector(
  //   (state: LoggedInUser) => state.loggedInUser?.userData,
  // )
  const userData = getUserData()

  const commentId = searchParams.get('commentId')
  const [comments, setComments] = useState<CommentInterface[]>(
    initialComments || [],
  )
  const [commentPage, setCommentPage] = useState<number>(commentId ? 1 : 2)
  const [deletedCommentId, setDeletedCommentId] = useState<string | null>(null)

  const nothingToLoadMore = useRef(
    pagination?.TotalPages !== 0 &&
      pagination?.CurrentPage !== pagination?.TotalPages,
  )
  const refetchComments = async (pageNumber: number = 0) => {
    // Re-fetch comments

    const commentsResponse = await getPostsComments(
      postId,
      userData.id.toString(),
      {
        page: pageNumber || commentPage,
      },
    )

    nothingToLoadMore.current =
      commentsResponse?.pagination?.CurrentPage !==
      commentsResponse?.pagination?.TotalPages
    setCommentPage(commentPage + 1)

    const filteredComments = commentsResponse.comments.filter(
      (comment: any) => {
        return comment.id !== initialComments[0].id
      },
    )
    if (pageNumber === 1 || commentPage === 1) {
      setComments([...filteredComments])
    } else {
      setComments([...comments, ...filteredComments])
    }
  }
  const handleLoadMore = () => {
    refetchComments()
  }
  // ! Removing these as the undefined state will cause them to break and why not set the state on declare level..
  // useEffect(() => {
  //   setComments([...initialComments])
  // }, [initialComments])

  return (
    <>
      <CommentOrReply
        refetchComments={refetchComments}
        setComments={setComments}
        inputRef={inputRef}
        getPostCommets={getPostCommets}
      />
      <Suspense fallback={<h1 className="text-red">Loading...</h1>}>
        <div className="flex flex-col gap-[20px]">
          {comments?.length !== 0 &&
            comments
              ?.filter(
                (comment: CommentInterface) =>
                  comment.id !== Number(deletedCommentId),
              )
              ?.map((comment: CommentInterface, index: number) => {
                return (
                  <CommentSection
                    key={index}
                    comment={comment}
                    refetchComments={refetchComments}
                    commentLength={comments.length}
                    setDeletedCommentId={setDeletedCommentId}
                    deletedCommentId={deletedCommentId}
                    getPostCommets={getPostCommets}
                  />
                )
              })}
        </div>

        {(!!commentId || nothingToLoadMore?.current) && (
          <button
            name="view all comments button"
            className="mb-3 mt-3 flex w-full items-center gap-2.5 rounded-lg px-2 py-1 text-start text-sm text-gray-500"
            onClick={handleLoadMore}>
            <span className="rotate-180">
              <Reply />
            </span>
            View all {comments.length} Comments
          </button>
        )}
      </Suspense>
    </>
  )
}

export default Comments
