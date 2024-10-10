'use client'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useInterceptor } from '@/hooks/interceptors'
import { deleteComment } from '@/services/comments'
import { showSuccessAlert } from '@/utils/helper'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { getTokens } from '@/utils/local-stroage'
import { useCallback, useEffect, useState } from 'react'
import { Tokens } from './shared/Card'
interface CommentDeleteProps {
  commentId: string
  postId: string
  setOpenDeleteDialog: (arg0: boolean) => void
  setDeletedCommentId: (arg0: string) => void
  setDeletedReplyId: (arg0: string) => void
  deletedCommentId: string
  deletedReplyId: string
}

const CommentDelete = ({
  commentId,
  postId,
  setOpenDeleteDialog,
  setDeletedCommentId,
  setDeletedReplyId,
  deletedCommentId,
  deletedReplyId,
}: CommentDeleteProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [tokens, setTokens] = useState<Tokens>({
    accessToken: '',
    refreshToken: '',
  })

  const { customFetch } = useInterceptor()

  const handleCancel = () => {
    setOpenDeleteDialog(false)
  }

  const handleDeleteComment = async () => {
    try {
      setLoading(true)
      const response = await deleteComment(
        commentId,
        customFetch,
        tokens.accessToken,
        tokens.refreshToken,
      )

      if (response.status === 204) {
        setLoading(false)
        if (deletedReplyId) {
          setDeletedReplyId(commentId)
        }

        if (deletedCommentId) {
          setDeletedCommentId(commentId)
        }
        showSuccessAlert('Comment deleted successfully')
        setOpenDeleteDialog(false)
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleFetchFailed(error)
      }
    }
  }
  useEffect(() => {
    const storedTokens = getTokens()
    if (storedTokens) {
      setTokens((prevTokens) => ({
        ...prevTokens,
        accessToken: storedTokens?.accessToken,
        refreshToken: storedTokens?.refreshToken,
      }))
    }
  }, [])
  return (
    <div className="rounded-lg bg-white  dark:bg-bg-primary-dark dark:text-white">
      <div className="item-start mb-5 flex flex-col gap-4">
        <p className="text-lg font-semibold"> Delete this comment</p>
        <p className="text-sm">Do you wish to delete this comment.</p>
      </div>
      <div className="flex justify-end gap-2">
        <button
          name="cancel button"
          onClick={handleCancel}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-[#F4F4F5] font-medium text-black transition  dark:text-white ">
          {' '}
          Cancel
        </button>
        <button
          name="delete button"
          onClick={handleDeleteComment}
          className={`flex h-10 w-32 cursor-pointer items-center justify-center rounded-md  font-medium
        text-black   ${loading ? 'bg-[#FC6B6B]-300 ' : 'bg-[#FC6B6B]'}
          `}>
          Delete{' '}
          {loading ? (
            <div className="ml-2">
              <CircularProgressIcon color="gray" />
            </div>
          ) : (
            <></>
          )}
        </button>
      </div>
    </div>
  )
}

export default CommentDelete
