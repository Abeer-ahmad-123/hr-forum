'use client'
import { useState } from 'react'
import TextArea from './ui/TextArea'
import { useParams } from 'next/navigation'
import ReplyTextArea from './shared/ReplyTextArea'
import { postComment, postCommentReply } from '@/services/comments'
import { showErrorAlert } from '@/utils/helper'
import { useSelector } from 'react-redux'

function CommentOrReply({
  reply = false,
  commentId = null,
  refetchComments,
  setComments = () => {},
}: any) {
  const params = useParams()
  const postId = params['id']
  const token = useSelector((state) => state?.loggedInUser?.token)
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
            token,
          })
        : await postComment({ postId, content: { content: value }, token })

      if (result?.success) {
        refetchComments()
        //  **** uncomment the after update from Behzad ****
        // if (!commentId) {
        //   setComments((prevComments) => [result?.data, ...prevComments])
        // } else {
        //   refetchComments()
        // }
      }

      const status = result?.success ? 'success' : 'error'
      setIsLoading({ ...isLoading, loading: false, status: status })
    } catch (err) {
      console.log(err)
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
        />
      ) : (
        <TextArea
          submitCallback={handleSubmit}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default CommentOrReply
