'use client'
import CommentOrReply from '@/components/CommentOrReply'
import { getPostsComments } from '@/services/comments'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Reply } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CommentSection from '../CommentSection'

function Comments({
  postId,
  initialComments,
  pagination,
  inputRef = null,
  getPostCommets,
}: any) {
  const searchParams = useSearchParams()

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )

  const commentId = searchParams.get('commentId')

  const [comments, setComments] = useState<any>([])
  const [commentPage, setCommentPage] = useState(commentId ? 1 : 2)
  const [reportedCommentId, setReportedCommentId] = useState<string | null>(
    null,
  )

  const nothingToLoadMore = useRef(
    pagination?.TotalPages !== 0 &&
      pagination?.CurrentPage !== pagination?.TotalPages,
  )
  const refetchComments = async (pageNumber: number = 0) => {
    // Re-fetch comments

    const commentsResponse = await getPostsComments(postId, userData.id, {
      page: pageNumber || commentPage,
    })
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
  useEffect(() => {
    setComments([...initialComments])
  }, [initialComments])

  return (
    <>
      <CommentOrReply
        refetchComments={refetchComments}
        setComments={setComments}
        inputRef={inputRef}
        getPostCommets={getPostCommets}
      />
      <Suspense fallback={<h1 className="text-red">Loading...</h1>}>
        <div>
          {comments?.length !== 0 &&
            comments?.map((comment: any, index: number) => {
              // if (
              //   !(
              //     comment?.id == reportedCommentId || comment?.user_has_reported
              //   )
              // )
              return (
                <CommentSection
                  key={index}
                  comment={comment}
                  refetchComments={refetchComments}
                  commentLength={comments.length}
                  setReportedCommentId={setReportedCommentId}
                  getPostCommets={getPostCommets}
                />
              )
            })}
        </div>

        {(!!commentId || nothingToLoadMore?.current) && (
          <button
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
