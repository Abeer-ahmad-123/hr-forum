'use client'
import CommentOrReply from '@/components/CommentOrReply'
import { getPostsComments } from '@/services/comments'
import { useSearchParams } from 'next/navigation'
import { Suspense, useRef, useState } from 'react'
import CommentSection from '../CommentSection'

function Comments({
  postId,
  initialComments,
  pagination,
  inputRef = null,
}: any) {
  const searchParams = useSearchParams()

  const commentId = searchParams.get('commentId')

  const [comments, setComments] = useState([...initialComments])
  const [commentPage, setCommentPage] = useState(commentId ? 1 : 2)

  const nothingToLoadMore = useRef(
    pagination?.TotalPages !== 0 &&
      pagination?.CurrentPage !== pagination?.TotalPages,
  )
  const refetchComments = async (pageNumber: number = 0) => {
    // Re-fetch comments

    const commentsResponse = await getPostsComments(postId, {
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

  return (
    <>
      <CommentOrReply
        refetchComments={refetchComments}
        setComments={setComments}
        inputRef={inputRef}
      />
      <Suspense fallback={<h1 className="text-red">Loading...</h1>}>
        <div key={Math.random()}>
          {comments?.length !== 0 &&
            comments?.map((comment: any) => {
              return (
                <CommentSection
                  key={comment?.id}
                  comment={comment}
                  refetchComments={refetchComments}
                  commentLength={comments.length}
                />
              )
            })}
        </div>

        {(!!commentId || nothingToLoadMore?.current) && (
          <button
            className="mt-4 rounded-lg bg-accent bg-opacity-50 p-2 text-white hover:bg-opacity-30"
            onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </Suspense>
    </>
  )
}

export default Comments
