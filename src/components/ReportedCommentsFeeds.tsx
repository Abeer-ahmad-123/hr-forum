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
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'

import { getReportedComments } from '@/services/comments'
import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'

const ReportedCommentsFeeds = ({ slug }: SlugProps) => {
  const [ref, inView] = useInView()
  const pathName = usePathname()
  const dispatch = useDispatch()
  const { handleRedirect } = useFetchFailedClient()

  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )

  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)

  const [page, setPage] = useState<number>(1)
  const [morePosts] = useState<boolean>(true)
  const [comments, setComments] = useState<PostsInterface[]>([])
  const [channel, setChannel] = useState<ChannelInterface>()
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  let noMorePosts = useRef<boolean>(morePosts)

  const userId = slug.split('-').pop()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const extractedPosts = reports.map((item: any) => item.post)
      setComments((prev: PostsInterface[]) => [...prev, ...extractedPosts])
      dispatch(setPosts([...comments, ...extractedPosts]))
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
    } finally {
      setIsCommentsLoading(false)
    }
  }

  const handleCommentCount = () => {
    dispatch(setCommentCountInStore(makeCommentNumberKeyValuePair(comments)))
  }

  useEffect(() => {
    getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inView) {
      getComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    handleCommentCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments])

  useEffect(() => {
    setComments([...storePosts])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storePosts])

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  {
    return isCommentsLoading ? (
      <CardLoading />
    ) : (
      <div className="mx-auto flex max-w-screen-xl justify-center">
        <div
          className={`mr-[5px] ${
            token ? 'mt-[15px] max-lg:mt-[5px]' : 'mt-[15px]'
          } flex flex-col max-md:hidden max-sm:hidden lg:block`}>
          {userDataInStore && <ProfileCard />}
          <div
            className={`${
              userDataInStore ? 'top-[70px] mt-[0px]' : 'top-[70px] '
            } sticky max-h-screen  max-lg:top-[55px]`}>
            <ChannelCard />
          </div>
          <div
            className={`sticky ${
              token
                ? 'top-[330px] mt-[20px]'
                : 'top-[335px] mt-5 max-lg:top-[328px]'
            } max-h-screen`}>
            {' '}
            <RulesCard />
          </div>
        </div>

        <div className={`w-full max-w-screen-md`}>
          <div className="flex w-full justify-center">
            <div className="w-full">
              <div>
                {' '}
                <RespScreen />
              </div>
              <div
                className={`${'mt-[35px] max-lg:mt-[30px]'}  w-full max-w-screen-md dark:text-white`}>
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
                            channels={channel}
                            updatePosts={setComments}
                            posts={comments}
                            userComment={comment}
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
}

export default ReportedCommentsFeeds
