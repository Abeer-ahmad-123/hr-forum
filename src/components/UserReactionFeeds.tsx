'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { getChannels } from '@/services/channel/channel'
import { getUserReactedPosts } from '@/services/posts'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import {
  PostsInterface,
  UserSpecificPostsInterface,
} from '@/utils/interfaces/posts'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'

const UserReactionFeeds = () => {
  const morePosts = useRef<boolean>(false)
  let noMorePosts = useRef(morePosts)
  const [ref, inView] = useInView()
  const [channel, setChannel] = useState<ChannelInterface>()
  const [loading, setLoading] = useState<boolean>(true)
  const path = '/channels'
  const router = useRouter()

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<UserSpecificPostsInterface[]>([])
  let morePostsExist = useRef(morePosts)
  const routeTo = `/feeds/${userData?.username}/feed`

  const pathName = usePathname()

  const getPosts = async () => {
    try {
      const data = await getUserReactedPosts(userData.id)
      // NEED to Correct this end point as we are not getting success from backend
      setPosts([...posts, ...data])
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleFetchFailed(error)
      }
    } finally {
      setLoading(false)
    }
  }

  const getAllChannels = async () => {
    try {
      const { channels } = await getChannels()
      setChannel(channels)
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleFetchFailed(error)
      }
    }
  }

  useEffect(() => {
    getPosts()
    getAllChannels()
  }, [])

  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  const dummyPost: PostsInterface[] = [
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
      user_has_reported: true,
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
    // Add more objects as needed
  ]

  {
    return loading ? (
      <CardLoading />
    ) : (
      <div>
        <div className="mx-auto flex max-w-screen-xl justify-center">
          {
            <div className="mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
              {userData && <ProfileCard />}
              <div
                className={`${
                  userData ? 'top-[70px] mt-[0px]' : 'top-[60px] mt-[20px]'
                } sticky  max-h-screen`}>
                {<ChannelCard />}
              </div>
              <div className="sticky top-[321px] mt-5 max-h-screen max-lg:top-[330px]">
                {' '}
                {<RulesCard />}
              </div>
            </div>
          }

          <div className={`w-full max-w-screen-md`}>
            <div className="flex w-full justify-center">
              <div className="w-full">
                <div>
                  {' '}
                  <RespScreen />
                </div>
                <div
                  className={`${'mt-[40px] max-md:mt-[20px]'}  w-full max-w-screen-md dark:text-white`}>
                  <div className="min-h-[70vh] w-full">
                    {pathName.includes(`/${userData.username}/feed`) && (
                      <ActivityButtons />
                    )}
                    <div>
                      {!!dummyPost?.length ? (
                        dummyPost?.map((post: any, index: number) => {
                          // change it to post once backend issue resolved
                          return (
                            <Card
                              key={index}
                              post={post}
                              channels={channel}
                              setPosts={setPosts}
                              posts={posts}
                            />
                          )
                        })
                      ) : (
                        <NoPosts />
                      )}
                    </div>
                    {!!posts?.length && noMorePosts?.current && (
                      <CircularProgress incommingRef={ref} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserReactionFeeds
