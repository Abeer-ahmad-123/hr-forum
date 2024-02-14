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

import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import {
  CommentInterface,
  UserSpecificPostsInterface,
} from '@/utils/interfaces/posts'

import { getReportedComments } from '@/services/comments'
import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'

interface ReportedCommentsFeedsProps {
  id: number
  created_at: string
  updated_at: string
  content: string
  user_id: number
  post_Id: number
  parent_id: number
  author_details: {
    username: string
    name: string
    profile_picture_url: string
  }
  total_replies: number
  user_has_reported: boolean
  comment: CommentInterface
}

const ReportedCommentsFeeds = ({ slug }: SlugProps) => {
  const [ref, inView] = useInView()
  const pathName = usePathname()
  const { handleRedirect } = useFetchFailedClient()

  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const [page, setPage] = useState<number>(1)
  const [morePosts] = useState<boolean>(true)
  const [comments, setComments] = useState<ReportedCommentsFeedsProps[]>([])
  const [channel, setChannel] = useState<ChannelInterface>()
  const [posts, setPosts] = useState<UserSpecificPostsInterface[]>([])
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  let noMorePosts = useRef<boolean>(morePosts)

  const userId = slug.split('-')[1]

  const getAllChannels = async () => {
    try {
      const { channels } = await getChannels()
      setChannel(channels)
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    }
  }

  useEffect(() => {
    getAllChannels()
  }, [])

  const getComments = async () => {
    try {
      const { reports, pagination } = await getReportedComments(
        userId ?? userDataInStore.id,
        {
          page,
        },
      )

      setPage(page + 1)
      noMorePosts.current =
        pagination?.CurrentPage &&
        pagination?.CurrentPage !== pagination?.TotalPages

      setComments((prev: ReportedCommentsFeedsProps[]) => [...prev, ...reports])
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    } finally {
      setIsCommentsLoading(false)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  useEffect(() => {
    if (inView) {
      getComments()
    }
  }, [inView])

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  {
    return isCommentsLoading ? (
      <CardLoading />
    ) : (
      <div>
        <div className="mx-auto flex max-w-screen-xl justify-center">
          {
            <div className="mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
              {userDataInStore && <ProfileCard />}
              <div
                className={`${
                  userDataInStore
                    ? 'top-[70px] mt-[0px]'
                    : 'top-[60px] mt-[20px]'
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
                    {pathName.includes(`/${slug}/feed`) && (
                      <ActivityButtons slug={slug} />
                    )}
                    <div>
                      {!!comments?.length ? (
                        comments?.map((reported: any, index: number) => {
                          return (
                            <Card
                              key={index}
                              post={reported.comment.post}
                              channels={channel}
                              setPosts={setPosts}
                              posts={posts}
                              userComment={reported.comment}
                            />
                          )
                        })
                      ) : (
                        <NoPosts />
                      )}
                    </div>
                    {!!comments?.length && noMorePosts?.current && (
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

export default ReportedCommentsFeeds
