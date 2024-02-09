'use client'
import { useEffect, useRef, useState } from 'react'

import { getUserComments } from '@/services/comments'
import { getUserReactedPosts, getUserSpecificPosts } from '@/services/posts'
import { getSpecificUserDetails } from '@/services/user'
import { showErrorAlert } from '@/utils/helper'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificPostsInterface } from '@/utils/interfaces/posts'
import { Plus, SmilePlus } from 'lucide-react'
import { FaRegComment } from 'react-icons/fa'
import { InView, useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import PostLoadingSkelton from './PostLoadingSkelton'
import UserSpecificComments from './UserSpecificComments'
import UserSpecificPosts from './UserSpecificPosts'
import UserSpecificReaction from './UserSpecificReaction'

interface UserActivityProps {
  userId: string | undefined
}

const UserActivity = ({ userId }: UserActivityProps) => {
  const [profileNav, setProfileNav] = useState<{
    isComment: boolean
    isReaction: boolean
    isPost: boolean
  }>({
    isComment: false,
    isReaction: false,
    isPost: true,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingReaction, setLoadingReaction] = useState<boolean>(false)
  const [user, setUser] = useState<any>('')
  const isFirstUser = useRef(true)
  const [comments, setComments] = useState([])
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const [reactedPosts, setReactedPosts] = useState<
    UserSpecificPostsInterface[]
  >([])
  const [ref, inView] = useInView()

  const morePosts = useRef<boolean>(false)
  const [posts, setUserSpecificPosts] = useState<any>([])
  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true)

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
        handleFetchFailed(error)
      }
    } finally {
      setIsCommentsLoading(false)
    }
  }

  const getPosts = async () => {
    try {
      const { reactions } = await getUserReactedPosts(userId!, {})

      setReactedPosts([...reactions.slice(0, 3)])
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleFetchFailed(error)
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (InView) {
      getPosts()
    }
  }, [inView])

  useEffect(() => {
    getComments()
  }, [])

  useEffect(() => {
    UserSpecificationPosts()
  }, [])

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="mb-5 flex h-full w-full flex-col items-start rounded-[10px] bg-white pt-6 dark:bg-slate-800 dark:text-gray-300">
      <div className="ml-10 justify-start">
        <div className="text-start text-xl font-normal max-[500px]:text-[16px]">
          Activity
        </div>
        <div className="mb-1 flex cursor-pointer items-start justify-start max-md:text-sm">
          <div
            onClick={handlePost}
            className={`-ml-[3px] flex w-[85px] gap-[8px] py-2 `}>
            <div
              className={`flex gap-2 max-custom-sm:text-xs ${
                profileNav.isPost
                  ? 'z-10  border-b-2 border-[#571ce0] pb-2 text-[#571ce0] transition duration-500 ease-in-out dark:text-white'
                  : ' opacity-50'
              }`}>
              <Plus size={20} className="max-custom-sm:h-4 max-custom-sm:w-4" />
              <button> Post</button>
            </div>
          </div>
          <div
            onClick={commentOnClick}
            className={`ml-0 flex w-[130px] cursor-pointer gap-[8px] p-2`}>
            <div
              className={`flex gap-2 max-custom-sm:text-xs ${
                profileNav.isComment
                  ? 'z-10 border-b-2 border-[#571ce0] pb-2 text-[#571ce0] transition duration-500 ease-in-out dark:text-white'
                  : 'opacity-50'
              }`}>
              <FaRegComment
                size={20}
                className="max-custom-sm:h-4 max-custom-sm:w-4"
              />
              <button> Comment</button>
              <hr />
            </div>
          </div>
          <div
            onClick={reactionOnClick}
            className={`ml-0 flex w-[130px] cursor-pointer gap-[8px] p-2 `}>
            <div
              className={`flex gap-2 max-custom-sm:text-xs ${
                profileNav.isReaction
                  ? 'z-10 border-b-2 border-[#571ce0] pb-2 text-[#571ce0] transition duration-500 ease-in-out dark:text-white'
                  : 'opacity-50'
              }`}>
              <SmilePlus
                size={20}
                className="max-custom-sm:h-4 max-custom-sm:w-4"
              />
              <button> Reactions</button>
              <hr />
            </div>
          </div>
          <p className="!mb-[-5px] !mt-[-2px] ml-2 h-[2px] bg-[#eaecf0]"></p>
        </div>
      </div>
      <div className="mt-2 w-full">
        {profileNav.isPost ? (
          <>
            {!loadingPosts ? (
              <UserSpecificPosts
                posts={posts}
                user={userId ? user : userDataInStore}
                morePosts={morePosts.current}
                userName={posts[0]?.author_details?.username}
              />
            ) : (
              [1, 2, 3, 4].map((_, i) => (
                <PostLoadingSkelton key={i} index={i} />
              ))
            )}
          </>
        ) : (
          <>
            {profileNav.isComment ? (
              isCommentsLoading ? (
                [1, 2, 3, 4].map((_, i) => (
                  <PostLoadingSkelton key={i} index={i} />
                ))
              ) : (
                <UserSpecificComments comments={comments as []} />
              )
            ) : (
              <>
                {profileNav.isReaction ? (
                  <>
                    {!loadingReaction ? (
                      <UserSpecificReaction posts={reactedPosts} />
                    ) : (
                      [1, 2, 3, 4].map((_, i) => (
                        <PostLoadingSkelton key={i} index={i} />
                      ))
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default UserActivity
