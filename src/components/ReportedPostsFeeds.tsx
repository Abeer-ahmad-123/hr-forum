'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { getChannels } from '@/services/channel/channel'
import { getReportedPosts } from '@/services/posts'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { useInView } from 'react-intersection-observer'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'

interface ReportedPostsFeedsProps {
  id: number
  created_at: string
  user_id: number
  postId: number
  reportType: string
  details: string
  post: PostsInterface
}

const ReportedPostsFeeds = () => {
  const morePosts = useRef<boolean>(false)
  let noMorePosts = useRef(morePosts)
  let initialPosts = []
  const [ref, inView] = useInView()
  const [channel, setChannel] = useState<ChannelInterface>()
  const [loading, setLoading] = useState<boolean>(true)
  const path = '/channels'
  const router = useRouter()

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<ReportedPostsFeedsProps[]>([])
  let morePostsExist = useRef(morePosts)
  const routeTo = `/feeds/${userData?.username}/feed`
  const pathName = usePathname()
  const userDetails = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const getPosts = async () => {
    {
      try {
        const { reports } = await getReportedPosts(userData.id, {
          page,
        })

        setPage(page + 1)
        morePostsExist.current =
          reports?.pagination?.CurrentPage &&
          reports?.pagination?.CurrentPage !== reports?.pagination?.TotalPages

        setPosts((prev: ReportedPostsFeedsProps[]) => [...prev, ...reports])
      } catch (error) {
        if (error instanceof Error) {
          handleFetchFailed(error)
        }
      } finally {
        setLoading(false)
      }
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
                    {pathName.includes(`/${userDetails.username}/feed`) && (
                      <ActivityButtons slug={''} />
                    )}
                    <div>
                      {posts?.length ? (
                        posts?.map((report: any, index: number) => {
                          // change it to post once backend issue resolved
                          return (
                            <Card
                              key={index}
                              post={report.post}
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
                    {posts?.length && noMorePosts?.current && (
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

export default ReportedPostsFeeds
