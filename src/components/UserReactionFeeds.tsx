'use client'
import NoPosts from '@/components/Cards/NoMore'
import FeaturesDropDownWithSuspense from '@/components/Cards/FeaturesDropDownWithSuspense'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { getChannels } from '@/services/channel/channel'
import { getUserReactedPosts } from '@/services/posts'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { PostsInterface } from '@/utils/interfaces/posts'
import { ReportedProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/CardLoading'

const UserReactionFeeds = ({ slug, userData, accessToken }: ReportedProps) => {
  const { handleRedirect } = useFetchFailedClient()

  const firstRunRef = useRef<boolean>(true)

  const [ref, inView] = useInView()
  const pathName = usePathname()

  const [page, setPage] = useState(1)
  const [morePosts] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [channels, setChannels] = useState<ChannelInterface[] | []>([])
  const [posts, updatePost] = useState<PostsInterface[]>([])

  let noMorePosts = useRef<boolean>(morePosts)

  const userId = slug.split('-').pop()

  const getPosts = async () => {
    try {
      const { reactions, pagination } = await getUserReactedPosts(
        userId ?? userData.id,
        {
          page,
        },
      )

      setPage(page + 1)
      noMorePosts.current =
        pagination?.CurrentPage &&
        pagination?.CurrentPage !== pagination?.TotalPages

      const extractedPosts = reactions
        .map((item: any) => item.post)
        .filter((post: any) => post !== undefined)
      updatePost([...posts, ...extractedPosts])
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleRedirect({ error })
      }
    } finally {
      setLoading(false)
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
      getAllChannels()
      firstRunRef.current = false
    }
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
              className={`${'mt-[20px] rounded-[20px] max-lg:mt-[30px]'} w-full max-w-full bg-bg-primary px-6  pb-5 pt-7 dark:bg-bg-primary-dark dark:text-white lg:max-w-screen-md`}>
              <div className="min-h-[70vh] w-full">
                {pathName.includes(`/${slug}/reactions`) && (
                  <ActivityButtons slug={slug} />
                )}
                <div>
                  {posts?.length ? (
                    posts?.map((reactionPost: any, index: number) => {
                      // change it to post once backend issue resolved
                      return (
                        <Card
                          key={index}
                          post={reactionPost}
                          channels={channels}
                          updatePosts={updatePost}
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

export default UserReactionFeeds
