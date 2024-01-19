'use client'
import { useInterceptor } from '@/hooks/interceptors'
import { postComment, postCommentReply } from '@/services/comments'
import { showErrorAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ReplyTextArea from './shared/ReplyTextArea'
import TextArea from './ui/TextArea'

function CommentOrReply({
  reply = false,
  commentId = null,
  refetchComments = () => {},
  setComments = () => {},
  className = '',
  btnClass = '',
  Id = '',
  inputRef = null,
  author = '',
  setReportedCommentId,
  createdDate,
  replies,
  commentLength,
}: any) {
  const params = useParams()
  const postId = params['id'] || Id
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const refreshToken = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.refreshToken,
  )
  const { customFetch } = useInterceptor()
  const [isLoading, setIsLoading] = useState({
    loading: false,
    status: 'null',
  })

  const handleSubmit = async (value: any) => {
    debugger
    try {
      setIsLoading({ ...isLoading, loading: true })
      const result = reply
        ? await postCommentReply({
            commentId,
            content: { content: value },
            customFetch,
            token,
            refreshToken,
          })
        : await postComment({
            postId,
            content: { content: value },
            customFetch,
            token,
            refreshToken,
          })
      if (result?.success) {
        if (!commentId) {
          setComments((prevComments: Array<Object>) => [
            result?.data?.comment,
            ...prevComments,
          ])
        } else {
          refetchComments()
        }
      }

      const status = result?.success ? 'success' : 'error'
      setIsLoading({ ...isLoading, loading: false, status: status })
    } catch (err) {
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
          setReportedCommentId={setReportedCommentId}
          createdDate={createdDate}
          replies={replies}
          commentLength={commentLength}
          refetchComments={refetchComments}
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
        />
      )}
    </div>
  )
}

export default CommentOrReply
