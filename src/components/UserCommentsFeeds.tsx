'use client'
import NoPosts from '@/components/Cards/NoMore'
import FeaturesDropDownWithSuspense from '@/components/Cards/FeaturesDropDownWithSuspense'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { getChannels } from '@/services/channel/channel'
import { getUserComments } from '@/services/comments'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { ReportedProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/CardLoading'

const UserCommentsFeeds = ({ slug, userData, accessToken }: ReportedProps) => {
  const { handleRedirect } = useFetchFailedClient()
  const firstRunRef = useRef<boolean>(true)

  const pathName = usePathname()
  const [ref, inView] = useInView()

  const [page, setPage] = useState(1)
  const [morePosts] = useState<boolean>(true)
  const [channels, setChannels] = useState<ChannelInterface[] | []>([])
  const [comments, setComments] = useState<any>()
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  let noMorePosts = useRef<boolean>(morePosts)

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
  const handleCommentCount = () => {
    const extractedPosts = comments?.map((item: any) => item.post)
  }

  const getComments = async () => {
    try {
      const response = await getUserComments(userData.id, {
        loadUser: true,
        page,
      })
      if (response.success) {
        setPage(page + 1)
        noMorePosts.current =
          response.data?.pagination?.CurrentPage &&
          response.data?.pagination?.CurrentPage !==
            response.data?.pagination?.TotalPages

        setComments(response?.data?.comments)
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    } finally {
      setIsCommentsLoading(false)
    }
  }

  useEffect(() => {
    if (firstRunRef.current) {
      getAllChannels()
      getComments()
      firstRunRef.current = false
    }
  }, [])

  useEffect(() => {
    if (inView) {
      getComments()
    }
  }, [inView])

  useEffect(() => {
    handleCommentCount()
  }, [comments])

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
              className={`${'mt-[20px] rounded-[20px] max-lg:mt-[30px]'} dark:text-whit w-full max-w-full bg-bg-primary  px-6 pb-5 pt-7 dark:bg-bg-primary-dark lg:max-w-screen-md`}>
              <div className="min-h-[70vh] w-full">
                {pathName.includes(`/${slug}/comments`) && (
                  <ActivityButtons slug={slug} />
                )}

                <div>
                  {comments?.length ? (
                    comments?.map((comment: any, index: number) => {
                      if (comment.post !== undefined) {
                        return (
                          <Card
                            key={index}
                            post={comment.post}
                            channels={channels}
                            updatePosts={setComments}
                            posts={comments}
                            userComment={comment}
                            getUserSpecificDetailFunc={() => {}}
                          />
                        )
                      }
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

export default UserCommentsFeeds
