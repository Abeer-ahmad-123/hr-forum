'use client'
import React, { Suspense, use, useEffect, useRef, useState } from 'react'
import { getComment, getPostsComments } from '@/services/comments'
import CommentSection from '../CommentSection'
import CommentOrReply from '@/components/CommentOrReply'
import { useSearchParams } from 'next/navigation'

async function Comments({ postId, initialComments, pagination }: any) {

  const searchParams = useSearchParams()
  const commentId = searchParams?.get('commentId')
  const replyId = searchParams?.get('replyId')

  const stateArray = (commentId === null) ? [...initialComments] : []


  const [comments, setComments] = useState(stateArray)
  const [commentPage, setCommentPage] = useState(2)
  const [loadMore, setLoadMore] = useState(false)

  const nothingToLoadMore = useRef(
    (pagination?.TotalPages !== 0) && (pagination?.CurrentPage !== pagination?.TotalPages)
  )
  console.log(nothingToLoadMore.current)
  console.log(pagination)


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

  const setInitialComments = async () => {
    const updatedComments = [...comments, ...initialComments]
    setComments(updatedComments)
    setLoadMore(false)
  }
  async function getSingleComment() {
    console.log("here is comment id", commentId)

    if (commentId) {
      const { comment: sigleComment } = await getComment(commentId, {})
      const updatedComments = sigleComment ? [sigleComment,
        // ...comments.filter((comment) => comment.id !== commentId)
      ] : comments
      setComments([...updatedComments, ...comments])
    }
  }



  useEffect(() => {
    if (commentId && (initialComments.length)) {
      setLoadMore(true)
    }
    getSingleComment()
  }, [initialComments])

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
        {
          loadMore && (
            <button
              onClick={setInitialComments}
              className="mt-4 rounded-lg bg-accent bg-opacity-50 p-2 text-white hover:bg-opacity-30"

            >
              Load More button
            </button>
          )}



        {!loadMore && nothingToLoadMore?.current && (
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
