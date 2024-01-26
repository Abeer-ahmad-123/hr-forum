'use client'

import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useInterceptor } from '@/hooks/interceptors'
import { deletePost } from '@/services/posts'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface DeletePostInterface {
  postId: string
  setReported: (arg1: boolean) => void
  setOpenDeleteDialog: (arg0: boolean) => void
}

const DeletePost = ({
  postId,
  setReported,
  setOpenDeleteDialog,
}: DeletePostInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const router = useRouter()

  const { customFetch } = useInterceptor()

  const handleCancel = () => {
    setOpenDeleteDialog(false)
  }

  const handleDeletePost = async () => {
    setLoading(true)
    try {
      const response = await deletePost(
        postId!,
        customFetch,
        tokenInRedux,
        refreshTokenInRedux,
      )
      if (response.status === 204) {
        setLoading(false)
        setOpenDeleteDialog(false)
        showSuccessAlert('Post deleted successfully')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof Error) {
        showErrorAlert('Something went wrong')
      }
    } finally {
      setLoading(false)
      setOpenDeleteDialog(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-4 text-center text-lg font-medium">
        Are you sure you want to delete the post?
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleCancel}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-accent text-accent transition hover:bg-accent hover:text-white ">
          {' '}
          cancel
        </button>
        <button
          onClick={handleDeletePost}
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

export default DeletePost
