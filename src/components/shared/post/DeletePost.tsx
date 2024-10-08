'use client'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import { deletePost } from '@/services/posts'
import { showSuccessAlert } from '@/utils/helper'
import { getTokens } from '@/utils/local-stroage'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Tokens } from '../Card'

interface DeletePostInterface {
  postId: string
  setReported: (arg1: boolean) => void
  setOpenDeleteDialog: (arg0: boolean) => void
  updatePosts: any
  posts?: any
}

const DeletePost = ({
  postId,
  setReported,
  setOpenDeleteDialog,
  updatePosts,
  posts = [],
}: DeletePostInterface) => {
  const [loading, setLoading] = useState<boolean>(false)

  const [tokens, setTokens] = useState<Tokens>({
    accessToken: '',
    refreshToken: '',
  })

  const pathname = usePathname()
  const router = useRouter()

  const { handleRedirect } = useFetchFailedClient()
  const { customFetch } = useInterceptor()

  // const dispatch = useDispatch()
  // const storePosts = useSelector(
  //   (state: PostsInterfaceStore) => state.posts.posts,
  // )
  // const tokenInRedux =
  //   useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  // const refreshTokenInRedux =
  //   useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
  //   ''

  const handleCancel = () => {
    setOpenDeleteDialog(false)
  }

  const handleDeletePost = async () => {
    setLoading(true)
    try {
      const response = await deletePost(
        postId!,
        customFetch,
        tokens.accessToken,
        tokens.refreshToken,
      )
      if (response.status === 204) {
        setLoading(false)
        setOpenDeleteDialog(false)
        showSuccessAlert('Post deleted successfully')
        updatePosts(posts?.filter((item: any) => item.id !== Number(postId)))
        // const filteritem = posts.length ? posts : []
        // dispatch(
        //   setPosts(
        //     filteritem.filter((item: any) => item.id !== Number(postId)),
        //   ),
        // )
        if (pathname === `/feeds/feed/${postId}`) router.back()
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    } finally {
      setLoading(false)
      setOpenDeleteDialog(false)
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
    <div className="rounded-lg bg-white p-4 dark:bg-bg-primary-dark dark:text-white ">
      <div className="mb-4">
        <h3 className="text-lg">Delete this comment.</h3>
        <p className="text-sm"> Are you sure you want to delete the post?</p>
      </div>
      <div className="flex justify-end gap-3">
        <button
          name="cancel button"
          onClick={handleCancel}
          className="duration-450 flex  h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-bg-tertiary text-sm text-black transition hover:bg-black hover:text-white dark:border-[#202020] dark:text-white ">
          {' '}
          Cancel
        </button>
        <button
          name="delete button"
          onClick={handleDeletePost}
          className={`flex h-10 w-32 cursor-pointer items-center justify-center rounded-md 
        text-sm  text-black  ${loading ? 'bg-gray-300' : 'bg-[#FC6B6B]'}
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
