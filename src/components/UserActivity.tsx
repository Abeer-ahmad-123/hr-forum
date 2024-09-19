'use client'
import { useEffect, useRef, useState } from 'react'

import { getUserComments } from '@/services/comments'
import { getUserReactedPosts, getUserSpecificPosts } from '@/services/posts'
import { getSpecificUserDetails } from '@/services/user'
import {
  makeCommentNumberKeyValuePair,
  makeCommentNumberKeyValuePairFromSummary,
  showErrorAlert,
} from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import {
  PostsInterface,
  UserSpecificPostsInterface,
} from '@/utils/interfaces/posts'
import { Plus, SmilePlus } from 'lucide-react'
import { FaRegComment } from 'react-icons/fa'
import { InView, useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import PostLoadingSkelton from './PostLoadingSkelton'
import UserSpecificComments from './UserSpecificComments'
import UserSpecificPosts from './UserSpecificPosts'
import UserSpecificReaction from './UserSpecificReaction'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import NoPosts from './Cards/NoMore'

interface UserActivityProps {
  userId: string | undefined
}
interface ProfileNavType {
  isComment: boolean
  isReaction: boolean
  isPost: boolean
}

const UserActivity = ({ userId }: UserActivityProps) => {
  const { handleRedirect } = useFetchFailedClient()

  const dispatch = useDispatch()

  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const [profileNav, setProfileNav] = useState<ProfileNavType>({
    isComment: false,
    isReaction: false,
    isPost: true,
  })
  const [user, setUser] = useState<any>('')
  const [comments, setComments] = useState<PostsInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingReaction, setLoadingReaction] = useState<boolean>(false)
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const [reactedPosts, setReactedPosts] = useState<
    UserSpecificPostsInterface[]
  >([])
  const [posts, setUserSpecificPosts] = useState<any>([])
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true)

  const morePosts = useRef<boolean>(false)

  const activityStyles =
    'dark:text-white text-black bg-white dark:bg-black dark:text-white'

  const getAllUserSpecificPosts = async () => {
    try {
      setLoadingPosts(true)

      const response = await getUserSpecificPosts(
        userId ? userId : userDataInStore?.id,
        1,
        { loadReactions: true },
      )
      if (response.success) {
        setUserSpecificPosts(response?.data?.posts)
        dispatch(setPosts(posts))
        morePosts.current =
          response?.data?.pagination?.TotalPages &&
          response?.data?.pagination?.CurrentPage !==
            response?.data?.pagination?.TotalPages
      } else {
        throw response.errors[0]
      }
    } catch (error) {
      showErrorAlert(`${error}`)
    } finally {
      setLoadingPosts(false)
    }
  }

  const commentOnClick = () => {
    setProfileNav((pre) => {
      return {
        ...pre,
        isPost: false,
        isComment: true,
        isReaction: false,
      }
    })
  }
  const reactionOnClick = () => {
    setProfileNav((pre) => {
      return {
        ...pre,
        isPost: false,
        isComment: false,
        isReaction: true,
      }
    })
  }

  const handlePost = () => {
    handleCommentCount()
    setProfileNav((pre) => {
      return {
        ...pre,
        isPost: true,
        isComment: false,
        isReaction: false,
      }
    })
  }
  const getUserSpecificDetail = async () => {
    try {
      setLoading(true)
      const response = await getSpecificUserDetails(userId!)

      if (response.success) {
        setUser(response?.data?.user)
        setLoading(false)
      } else {
        throw response.errors[0]
      }
    } catch (error) {
      showErrorAlert(`${error}`)
    }
  }

  const UserSpecificationPosts = async () => {
    if (userId) {
      await getUserSpecificDetail()
    } else {
      setUser(userDataInStore)
    }
    getAllUserSpecificPosts()
  }

  const getComments = async () => {
    try {
      setIsCommentsLoading(true)
      const response = await getUserComments(userId!, {
        loadUser: true,
      })
      if (response.success) {
        setComments(response?.data?.comments)
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    } finally {
      setIsCommentsLoading(false)
    }
  }

  const getPosts = async () => {
    try {
      const { reactions } = await getUserReactedPosts(userId!, {})

      setReactedPosts([...reactions.slice(0, 3)])
      dispatch(setPosts(reactions))
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleRedirect({ error })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCommentCount = () => {
    dispatch(setCommentCountInStore(makeCommentNumberKeyValuePair(posts)))
  }

  useEffect(() => {
    getComments()
    UserSpecificationPosts()
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleCommentCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])

  return (
    <div className="flex h-full w-full max-w-[759px] flex-col items-start gap-[20px] rounded-[16px] bg-bg-primary p-4 dark:bg-bg-primary-dark dark:text-white custom-mid-sm:px-6 custom-mid-sm:py-7">
      <div className="flex w-full flex-col justify-start gap-[20px]">
        <div className="text-start text-xl font-normal max-[500px]:text-[16px]">
          Activity
        </div>
        <div className="flex h-[42px] w-full  cursor-pointer items-center justify-start rounded-[6px] bg-bg-tertiary p-[5px] dark:bg-bg-tertiary-dark ">
          <div
            onClick={handlePost}
            className={`flex cursor-pointer  rounded-[3px] px-[16px] py-[6px]
              ${profileNav.isPost ? activityStyles : 'text-white'}
            `}>
            <div
              className={`flex gap-2  text-black  hover:text-black dark:text-white dark:hover:text-white `}>
              <button name="post button" className="text-sm font-medium">
                Post
              </button>
            </div>
          </div>
          <div
            onClick={commentOnClick}
            className={`flex cursor-pointer rounded-[3px]  px-[16px] py-[6px]
              ${profileNav.isComment ? activityStyles : 'text-white'} 
            `}>
            <div
              className={`flex items-center gap-2 font-semibold  text-black hover:text-black  dark:text-white  dark:hover:text-white max-custom-sm:text-xs `}>
              {/* <FaRegComment
                size={20}
                className="max-custom-sm:h-4 max-custom-sm:w-4"
              /> */}
              <button name="comment button">
                <span className="text-sm font-medium">Comment</span>{' '}
              </button>
              <hr />
            </div>
          </div>
          <div
            id="isReaction"
            onClick={reactionOnClick}
            className={`flex cursor-pointer rounded-[3px] px-[16px] py-[6px] 
              ${profileNav.isReaction ? activityStyles : ''}
            `}>
            <div
              className={`flex gap-2 font-semibold  text-black hover:text-black  dark:text-white  dark:hover:text-white  max-custom-sm:text-xs`}>
              {/* <SmilePlus
                size={20}
                className="max-custom-sm:h-4 max-custom-sm:w-4"
              /> */}
              <button name="reaction button ">
                {' '}
                <span className="text-sm font-medium">Reactions</span>
              </button>
              <hr />
            </div>
          </div>
          <p className="!mb-[-5px] !mt-[-2px] ml-2 h-[2px] bg-[#eaecf0]"></p>
        </div>
      </div>
      <div className="mt-2 w-full">
        {profileNav.isPost ? (
          !loadingPosts ? (
            posts.length ? (
              <UserSpecificPosts
                posts={posts}
                user={userId ? user : userDataInStore}
                morePosts={morePosts.current}
                userName={posts[0]?.author_details?.username}
              />
            ) : (
              <NoPosts />
            )
          ) : (
            [1, 2, 3, 4].map((_, i) => <PostLoadingSkelton key={i} index={i} />)
          )
        ) : profileNav.isComment ? (
          !isCommentsLoading ? (
            comments.length ? (
              <UserSpecificComments comments={comments} user={user} />
            ) : (
              <NoPosts />
            )
          ) : (
            [1, 2, 3, 4].map((_, i) => <PostLoadingSkelton key={i} index={i} />)
          )
        ) : (
          profileNav.isReaction &&
          (!loadingReaction ? (
            reactedPosts.length ? (
              <UserSpecificReaction posts={reactedPosts} user={user} />
            ) : (
              <NoPosts />
            )
          ) : (
            [1, 2, 3, 4].map((_, i) => <PostLoadingSkelton key={i} index={i} />)
          ))
        )}
      </div>
    </div>
  )
}

export default UserActivity
