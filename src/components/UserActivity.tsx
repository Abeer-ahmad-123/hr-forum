'use client'
import { useEffect, useRef, useState } from 'react'

import { getUserComments } from '@/services/comments'
import { getUserReactedPosts, getUserSpecificPosts } from '@/services/posts'
import { getSpecificUserDetails } from '@/services/user'
import { showErrorAlert } from '@/utils/helper'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
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
  const [reactedPosts, setReactedPosts] = useState<any>()
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
        setUser(response?.user)
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

  useEffect(() => {
    getComments()
  }, [])

  useEffect(() => {
    UserSpecificationPosts()
  }, [])

  const getPosts = async () => {
    try {
      const data = await getUserReactedPosts(userDataInStore.id)
      setReactedPosts([...reactedPosts, ...data])
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
  const dummyPost: any[] = [
    {
      id: 1,
      created_at: '2024-01-31T12:00:00Z',
      updated_at: '2024-01-31T14:30:00Z',
      title: 'Introduction to TypeScript',
      content: 'This is a brief introduction to TypeScript.',
      slug: 'introduction-to-typescript',
      user_id: 123,
      image_url:
        'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      channel_id: 3,
      author_details: {
        username: 'john_doe',
        name: 'John Doe',
        profile_picture_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvOMF7xW5USwG31Zkv0W3AE-9bFKcJHmvkdi8Jkmn3Q&s',
      },
      reaction_summary: {
        like_count: 20,
        love_count: 10,
        clap_count: 5,
        celebrate_count: 2,
      },
      total_comments: 8,
      user_reaction: 'like',
      user_has_bookmarked: true,
      user_has_reported: false,
    },
    {
      id: 2,
      created_at: '2024-01-30T10:45:00Z',
      updated_at: '2024-01-30T11:15:00Z',
      title: 'TypeScript Best Practices',
      content:
        'Learn the best practices for writing clean and maintainable TypeScript code.',
      slug: 'typescript-best-practices',
      user_id: 456,
      image_url:
        'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvOMF7xW5USwG31Zkv0W3AE-9bFKcJHmvkdi8Jkmn3Q&s',
      channel_id: 2,
      author_details: {
        username: 'jane_doe',
        name: 'Jane Doe',
        profile_picture_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvOMF7xW5USwG31Zkv0W3AE-9bFKcJHmvkdi8Jkmn3Q&s',
      },
      reaction_summary: {
        like_count: 15,
        love_count: 8,
        clap_count: 3,
        celebrate_count: 1,
      },
      total_comments: 12,
      user_reaction: 'love',
      user_has_bookmarked: false,
      user_has_reported: true,
    },

    {
      id: 3,
      created_at: '2024-01-30T10:45:00Z',
      updated_at: '2024-01-30T11:15:00Z',
      title: 'TypeScript Best Practices',
      content:
        'Learn the best practices for writing clean and maintainable TypeScript code.',
      slug: 'typescript-best-practices',
      user_id: 19,
      image_url:
        'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvOMF7xW5USwG31Zkv0W3AE-9bFKcJHmvkdi8Jkmn3Q&s',
      channel_id: 1,
      author_details: {
        username: 'jane_doe',
        name: 'Jane Doe',
        profile_picture_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvOMF7xW5USwG31Zkv0W3AE-9bFKcJHmvkdi8Jkmn3Q&s',
      },
      reaction_summary: {
        like_count: 15,
        love_count: 8,
        clap_count: 3,
        celebrate_count: 1,
      },
      total_comments: 12,
      user_reaction: 'love',
      user_has_bookmarked: false,
      user_has_reported: true,
    },
    {
      id: 4,
      created_at: '2024-01-30T10:45:00Z',
      updated_at: '2024-01-30T11:15:00Z',
      title: 'TypeScript Best Practices',
      content:
        'Learn the best practices for writing clean and maintainable TypeScript code.',
      slug: 'typescript-best-practices',
      user_id: 456,
      image_url:
        'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvOMF7xW5USwG31Zkv0W3AE-9bFKcJHmvkdi8Jkmn3Q&s',
      channel_id: 2,
      author_details: {
        username: 'jane_doe',
        name: 'Jane Doe',
        profile_picture_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvOMF7xW5USwG31Zkv0W3AE-9bFKcJHmvkdi8Jkmn3Q&s',
      },
      reaction_summary: {
        like_count: 15,
        love_count: 8,
        clap_count: 3,
        celebrate_count: 1,
      },
      total_comments: 12,
      user_reaction: 'love',
      user_has_bookmarked: false,
      user_has_reported: true,
    },

    // Add more objects as needed
  ]
  return (
    <div className="mb-5 flex h-full w-full flex-col items-start rounded-[10px] bg-white pt-6 dark:bg-slate-800 dark:text-gray-300">
      <div className="ml-10 justify-start">
        <div className="text-start text-xl font-normal">Activity</div>
        <div className="mb-1 flex cursor-pointer items-start justify-start max-md:text-sm">
          <div
            onClick={handlePost}
            className={`flex w-[100px] items-center gap-[8px] p-2 ${
              profileNav.isPost
                ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out dark:text-white'
                : 'opacity-50'
            }`}>
            <Plus size={20} />
            <button> Post</button>
          </div>
          <div
            onClick={commentOnClick}
            className={`ml-2 flex w-[130px] cursor-pointer items-center gap-[8px] p-2 ${
              profileNav.isComment
                ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out dark:text-white'
                : ' opacity-50'
            }`}>
            <FaRegComment size={20} />
            <button> Comment</button>
            <hr />
          </div>
          <div
            onClick={reactionOnClick}
            className={`ml-2 flex w-[130px] cursor-pointer items-center gap-[8px] p-2 ${
              profileNav.isReaction
                ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out dark:text-white'
                : ' opacity-50'
            }`}>
            <SmilePlus size={20} />
            <button> Reactions</button>
            <hr />
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
              />
            ) : (
              [1, 2, 3, 4].map((_, i) => <PostLoadingSkelton key={i} />)
            )}
          </>
        ) : (
          <>
            {profileNav.isComment ? (
              isCommentsLoading ? (
                [1, 2, 3].map((_, i) => <PostLoadingSkelton key={i} />)
              ) : (
                <UserSpecificComments comments={comments as []} />
              )
            ) : (
              <>
                {profileNav.isReaction ? (
                  <>
                    {!loadingReaction ? (
                      <UserSpecificReaction posts={dummyPost} />
                    ) : (
                      [1, 2, 3, 4].map((_, i) => <PostLoadingSkelton key={i} />)
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
