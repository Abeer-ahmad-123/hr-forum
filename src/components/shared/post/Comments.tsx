'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { getPostsComments } from '@/services/comments'
import CommentSection from '../CommentSection'
import CommentOrReply from '@/components/CommentOrReply'
import { useSearchParams } from 'next/navigation'

function Comments({ postId, initialComments, pagination }: any) {
  const searchParams = useSearchParams()

  const commentId = searchParams.get('commentId')

  const [comments, setComments] = useState([...initialComments])
  const [commentPage, setCommentPage] = useState(commentId ? 1 : 2)

  const nothingToLoadMore = useRef(
    pagination?.TotalPages !== 0 &&
      pagination?.CurrentPage !== pagination?.TotalPages,
  )
  const refetchComments = async () => {
    // Re-fetch comments

    const commentsResponse = await getPostsComments(postId, {
      page: commentPage,
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

    setComments([...comments, ...filteredComments])
  }

  return (
    <>
      <CommentOrReply
        refetchComments={refetchComments}
        setComments={setComments}
      />
      <Suspense fallback={<h1 className="text-red">Loading...</h1>}>
        <div key={Math.random()}>
          {comments?.length !== 0 &&
            comments?.map((comment: any) => {
              return (
                <CommentSection
                  key={comment.id}
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
            onClick={refetchComments}>
            Load More
          </button>
        )}
      </Suspense>
    </>
  )
}

export default Comments
