'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { getPostsComments } from '@/services/comments'
import CommentSection from '../CommentSection'
import CommentOrReply from '@/components/CommentOrReply'
function Comments({ postId, initialComments, pagination }: any) {
  const [comments, setComments] = useState([...initialComments])
  const [commentPage, setCommentPage] = useState(2)
  const nothingToLoadMore = useRef(
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
    setComments([...comments, ...commentsResponse.comments])
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
                />
              )
            })}
        </div>
        {nothingToLoadMore?.current && (
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
