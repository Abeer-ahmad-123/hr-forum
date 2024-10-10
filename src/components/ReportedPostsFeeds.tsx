'use client'
import NoPosts from '@/components/Cards/NoMore'
import FeaturesDropDownWithSuspense from '@/components/Cards/FeaturesDropDownWithSuspense'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { getChannels } from '@/services/channel/channel'
import { getReportedPosts } from '@/services/posts'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'
import { ReportedProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/CardLoading'

const ReportedPostsFeeds = ({ slug, accessToken, userData }: ReportedProps) => {
  const { handleRedirect } = useFetchFailedClient()

  const [ref, inView] = useInView()
  const pathName = usePathname()
  const [page, setPage] = useState<number>(1)
  const [morePosts] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [channels, setChannels] = useState<ChannelInterface[] | []>([])
  const [posts, updatePosts] = useState<PostsInterface[]>([])

  let noMorePosts = useRef<boolean>(morePosts)
  let firstRunRef = useRef<boolean>(true)

  const userId = slug.split('-').pop()

  const getPosts = async () => {
    {
      try {
        const { reports, pagination } = await getReportedPosts(
          userId ?? userData.id.toString(),
          {
            page,
          },
        )

        setPage(page + 1)
        noMorePosts.current =
          pagination?.CurrentPage &&
          pagination?.CurrentPage !== pagination?.TotalPages
        const extractedPosts = reports.map((item: any) => item.post)
        updatePosts((prev: PostsInterface[]) => [...prev, ...extractedPosts])
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
      const { channels: data } = await getChannels()
      setChannels(data)
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
  }, [])

  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  return loading ? (
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
              className={`${'mt-[35px] max-lg:mt-[30px]'}  w-full max-w-full dark:text-white lg:max-w-screen-md`}>
              <div className="min-h-[70vh] w-full">
                {pathName.includes(`/reported/posts`) && (
                  <ActivityButtons slug={slug} />
                )}
                <div>
                  {posts?.length ? (
                    posts?.map((post: any, index: number) => {
                      // change it to post once backend issue resolved
                      return (
                        <Card
                          key={index}
                          post={post}
                          channels={channels}
                          updatePosts={updatePosts}
                          posts={posts}
                          getUserSpecificDetailFunc={() => {}}
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
  )
}

export default ReportedPostsFeeds
