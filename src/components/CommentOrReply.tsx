'use client'
import { useState } from 'react'
import TextArea from './ui/TextArea'
import { useParams } from 'next/navigation'
import ReplyTextArea from './shared/ReplyTextArea'
import { postComment, postCommentReply } from '@/services/comments'
import { showErrorAlert } from '@/utils/helper'
import { useSelector } from 'react-redux'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'

function CommentOrReply({
  reply = false,
  commentId = null,
  refetchComments = () => {},
  setComments = () => {},
  className = '',
  btnClass = '',
  Id = '',
  shouldFocus = false,
}: any) {
  const params = useParams()
  const postId = params['id'] || Id
  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)
  const [isLoading, setIsLoading] = useState({
    loading: false,
    status: 'null',
  })
  console.log('IN Commentor reply file', shouldFocus)

  const handleSubmit = async (value: any) => {
    try {
      setIsLoading({ ...isLoading, loading: true })
      const result = reply
        ? await postCommentReply({
            commentId,
            content: { content: value },
            token,
          })
        : await postComment({ postId, content: { content: value }, token })

      if (result?.success) {
        // refetchComments()
        //  **** uncomment the after update from Behzad ****

        if (!commentId) {
          setComments((prevComments: Array<Object>) => [
            result?.data,
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
        />
      ) : (
        <TextArea
          submitCallback={handleSubmit}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          className={className}
          btnClass={btnClass}
          shouldFocus={shouldFocus}
        />
      )}
    </div>
  )
}

export default CommentOrReply