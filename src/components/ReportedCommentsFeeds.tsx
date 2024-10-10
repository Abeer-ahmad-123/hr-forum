'use client'
import NoPosts from '@/components/Cards/NoMore'
import FeaturesDropDownWithSuspense from '@/components/Cards/FeaturesDropDownWithSuspense'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { getChannels } from '@/services/channel/channel'
import { getReportedComments } from '@/services/comments'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { PostsInterface } from '@/utils/interfaces/posts'
import { ReportedProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/CardLoading'

const ReportedCommentsFeeds = ({
  slug,
  userData,
  accessToken,
}: ReportedProps) => {
  const [ref, inView] = useInView()
  const pathName = usePathname()
  const { handleRedirect } = useFetchFailedClient()
  const [page, setPage] = useState<number>(1)
  const [morePosts] = useState<boolean>(true)
  const [comments, setComments] = useState<PostsInterface[]>([])
  const [channels, setChannels] = useState<ChannelInterface[] | []>([])
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  let noMorePosts = useRef<boolean>(morePosts)

  const userId = slug.split('-').pop()

  const getAllChannels = async () => {
    try {
      const { channels } = await getChannels()
      setChannels(channels)
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
        userId ?? userData.id.toString(),
        {
          page,
        },
      )

      setPage(page + 1)
      noMorePosts.current =
        pagination?.CurrentPage &&
        pagination?.CurrentPage !== pagination?.TotalPages
      const extractedPosts = reports.map((item: any) => item.comment)
      setComments((prev: PostsInterface[]) => [...prev, ...extractedPosts])
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
    return () => {}
  }, [])

  return isCommentsLoading ? (
    <CardLoading />
  ) : (
    <div className="mx-auto flex max-w-screen-xl justify-center">
      <div className={`w-full max-w-full lg:max-w-screen-md`}>
        <div className="flex w-full justify-center">
          <div className="w-full">
            <div>
              {' '}
              <FeaturesDropDownWithSuspense />
            </div>
            <div
              className={`${'mt-[35px] max-lg:mt-[30px]'}  w-full  dark:text-white`}>
              <div className="min-h-[70vh] w-full">
                {pathName.includes(`/reported/comments`) && (
                  <ActivityButtons slug={slug} />
                )}
                <div>
                  {!!comments?.length ? (
                    comments?.map((comment: any, index: number) => {
                      return (
                        <Card
                          key={index}
                          post={comment}
                          channels={channels}
                          updatePosts={setComments}
                          posts={comments}
                          userComment={comment}
                          getUserSpecificDetailFunc={() => {}}
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
  )
}

export default ReportedCommentsFeeds
