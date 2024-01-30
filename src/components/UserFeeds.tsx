'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { getChannels } from '@/services/channel/channel'
import { getUserSpecificPosts } from '@/services/posts'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificPostsInterface } from '@/utils/interfaces/posts'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
interface UserFeedsProps {
  params: {
    userId: string
  }
}

const UserFeeds = ({ params }: UserFeedsProps) => {
  const userId = params.userId
  const morePosts = useRef<boolean>(false)
  let noMorePosts = useRef(morePosts)
  const [ref, inView] = useInView()
  const [channel, setChannel] = useState<ChannelInterface>()
  const path = '/channels'

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const [page, setPage] = useState(2)
  const [posts, setPosts] = useState<UserSpecificPostsInterface[]>([])
  let morePostsExist = useRef(morePosts)

  const getPosts = async () => {
    const { data } = await getUserSpecificPosts(userId, page, {
      loadReactions: true,
      loadUser: true,
    })

    setPage(page + 1)
    morePostsExist.current =
      data?.pagination?.CurrentPage &&
      data?.pagination?.CurrentPage !== data?.pagination?.TotalPages

    setPosts([...posts, ...data?.posts])
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
  console.log(posts)

  return (
    <>
      <div className="mx-auto flex max-w-screen-xl justify-center">
        <div className="mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
          {userData && <ProfileCard />}
          <div
            className={`${
              userData ? 'top-[70px] mt-[0px]' : 'top-[60px] mt-[20px]'
            } sticky  max-h-screen`}>
            <ChannelCard />
          </div>
          <div className="sticky top-[321px] mt-5 max-h-screen max-lg:top-[330px]">
            {' '}
            <RulesCard />
          </div>
        </div>

        <div className="w-full max-w-screen-md">
          <div className="flex w-full justify-center">
            <div className="w-full">
              <div>
                {' '}
                <RespScreen />
              </div>

              <div
                className={`${'mt-[40px] max-md:mt-[20px]'}  w-full max-w-screen-md dark:text-white`}>
                <div className="min-h-[70vh] w-full">
                  {!!posts?.length ? (
                    posts?.map((post: any, index: number) => {
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
                  {!!posts?.length && noMorePosts?.current && (
                    <CircularProgress incommingRef={ref} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserFeeds
