'use client'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useInterceptor } from '@/hooks/interceptors'
import { deleteComment } from '@/services/comments'
import { DecreaseCommentCountInStore } from '@/store/Slices/postSlice'
import { showSuccessAlert } from '@/utils/helper'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
interface CommentDeleteProps {
  commentId: string
  postId: string
  setOpenDeleteDialog: (arg0: boolean) => void
  setDeletedCommentId: (arg0: string) => void
  setDeletedReplyId: (arg0: string) => void
}

const CommentDelete = ({
  commentId,
  postId,
  setOpenDeleteDialog,
  setDeletedCommentId,
  setDeletedReplyId,
}: CommentDeleteProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const { customFetch } = useInterceptor()
  const disptach = useDispatch()

  const handleCancel = () => {
    setOpenDeleteDialog(false)
  }

  const handleDeleteComment = async () => {
    try {
      setLoading(true)
      const response = await deleteComment(
        commentId,
        customFetch,
        tokenInRedux,
        refreshTokenInRedux,
      )

      if (response.status === 204) {
        setLoading(false)
        if (setDeletedReplyId) {
          setDeletedReplyId(commentId)
          disptach(DecreaseCommentCountInStore(postId))
        }

        if (setDeletedCommentId) {
          setDeletedCommentId(commentId)
          disptach(DecreaseCommentCountInStore(postId))
        }
        showSuccessAlert('Comment deleted successfully')
        setOpenDeleteDialog(false)
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleFetchFailed(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-4 dark:bg-dark-background dark:text-white">
      <div className="text-sx mb-4 text-center font-medium">
        Are you sure you want to delete the comment?
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleCancel}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-accent text-accent transition hover:bg-accent hover:text-white dark:text-white ">
          {' '}
          cancel
        </button>
        <button
          onClick={handleDeleteComment}
          className={`flex h-10 w-32 cursor-pointer items-center justify-center rounded-md 
        text-white   ${loading ? 'bg-gray-300' : 'bg-accent'}
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
