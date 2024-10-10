'use client'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import { postComment, postCommentReply } from '@/services/comments'
import { showErrorAlert } from '@/utils/helper'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import ReplyTextArea from './shared/ReplyTextArea'
import TextArea from './ui/TextArea'

const CommentOrReply = ({
  reply = false,
  commentId = null,
  refetchComments = () => {},
  setComments = () => {},
  getPostCommets = () => {},
  className = '',
  btnClass = '',
  Id = '',
  inputRef = null,
  author = '',
  setDeletedCommentId,
  createdDate,
  replies,
  commentLength,
  refreshToken,
  accessToken,
  getUserSpecificDetailFunc,
}: any) => {
  const params = useParams()
  const postId = params['id'] || Id

  const { handleRedirect } = useFetchFailedClient()
  const { customFetch } = useInterceptor()
  const [isLoading, setIsLoading] = useState({
    loading: false,
    status: 'null',
  })
  const handleSubmit = async (value: any) => {
    try {
      setIsLoading({ ...isLoading, loading: true })
      const result = reply
        ? await postCommentReply({
            commentId,
            content: { content: value },
            customFetch,
            accessToken,
            refreshToken,
          })
        : await postComment({
            postId,
            content: { content: value },
            customFetch,
            accessToken,
            refreshToken,
          })

      if (result?.success) {
        if (!commentId) {
          getUserSpecificDetailFunc()
          setComments((prevComments: Array<Object>) => [
            result?.data?.comment,
            ...prevComments,
          ])
          refetchComments()
        }
      } else {
        throw result.errors[0]
      }

      const status = result?.success ? 'success' : 'error'
      setIsLoading({ ...isLoading, loading: false, status: status })
    } catch (err) {
      if (err instanceof Error) {
        handleRedirect({ error: err })
      }
      showErrorAlert(`${err}`)
      setIsLoading({ ...isLoading, loading: false, status: 'error' })
    }
  }

  return (
    <div>
      {reply ? (
        <ReplyTextArea
          submitCallback={handleSubmit}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          commentId={commentId}
          inputRef={inputRef}
          author={author}
          setDeletedCommentId={setDeletedCommentId}
          createdDate={createdDate}
          replies={replies}
          commentLength={commentLength}
          refetchComments={refetchComments}
          getPostCommets={getPostCommets}
          accessToken={accessToken}
        />
      ) : (
        <TextArea
          submitCallback={handleSubmit}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          className={className}
          btnClass={btnClass}
          inputRef={inputRef}
          placeholder="Write your comment..."
          getPostCommets={getPostCommets}
          classNameOuter={''}
          accessToken={accessToken}
        />
      )}
    </div>
  )
}

export default CommentOrReply
