'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { getChannels } from '@/services/channel/channel'
import { getReportedPosts } from '@/services/posts'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { useInView } from 'react-intersection-observer'

import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
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

const ReportedPostsFeeds = ({ slug }: SlugProps) => {
  const { handleRedirect } = useFetchFailedClient()

  const [ref, inView] = useInView()
  const pathName = usePathname()

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const [page, setPage] = useState<number>(1)
  const [morePosts] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [channel, setChannel] = useState<ChannelInterface>()
  const [posts, setPosts] = useState<ReportedPostsFeedsProps[]>([])

  let noMorePosts = useRef<boolean>(morePosts)
  let firstRunRef = useRef<boolean>(true)

  const userId = slug.split('-').pop()

  const getPosts = async () => {
    {
      try {
        const { reports, pagination } = await getReportedPosts(
          userId ?? userData.id,
          {
            page,
          },
        )

        setPage(page + 1)
        noMorePosts.current =
          pagination?.CurrentPage &&
          pagination?.CurrentPage !== pagination?.TotalPages
        console.log(reports)
        setPosts((prev: ReportedPostsFeedsProps[]) => [...prev, ...reports])
      } catch (error) {
        if (error instanceof Error) {
          handleRedirect({ error })
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
        handleRedirect({ error })
      }
    }
  }

  useEffect(() => {
    if (firstRunRef.current) {
      getPosts()
      firstRunRef.current = false
    }
    getAllChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inView) {
      getPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return loading ? (
    <CardLoading />
  ) : (
    <div>
      <div className="mx-auto flex max-w-screen-xl justify-center">
        {
          <div className="mr-[5px] mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
            {userData && <ProfileCard />}
            <div
              className={`${
                userData ? 'top-[70px] mt-[0px]' : 'top-[60px] mt-[20px]'
              } sticky  max-h-screen`}>
              {<ChannelCard />}
            </div>
            <div className="sticky top-[321px] mt-5 max-h-screen max-lg:top-[340px]">
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
                  {pathName.includes(`/reported/posts`) && (
                    <ActivityButtons slug={slug} />
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

export default ReportedPostsFeeds
