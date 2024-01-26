'use client'
import { useInterceptor } from '@/hooks/interceptors'
import { postComment, postCommentReply } from '@/services/comments'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'
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
  setReportedCommentId,
  createdDate,
  replies,
  commentLength,
  setCommentCount,
}: any) => {
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

          setCommentCount((prev: number) => prev + 1)
        } else {
          refetchComments()
        }
      }

      const status = result?.success ? 'success' : 'error'
      setIsLoading({ ...isLoading, loading: false, status: status })
    } catch (err) {
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
          getPostCommets={getPostCommets}
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
        />
      )}
    </div>
  )
}

export default CommentOrReply
