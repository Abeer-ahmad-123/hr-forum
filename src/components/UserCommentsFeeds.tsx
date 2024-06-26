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
import { getUserComments } from '@/services/comments'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'
import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
// import nProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'

const UserCommentsFeeds = ({ slug }: SlugProps) => {
  const { handleRedirect } = useFetchFailedClient()
  const firstRunRef = useRef<boolean>(true)

  const dispatch = useDispatch()
  const pathName = usePathname()
  const [ref, inView] = useInView()

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )

  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)

  const [page, setPage] = useState(1)
  const [morePosts] = useState<boolean>(true)
  const [channel, setChannel] = useState<ChannelInterface>()
  const [comments, setComments] = useState<any>()
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)

  let noMorePosts = useRef<boolean>(morePosts)

  const userId = slug.split('-').pop()

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
  const handleCommentCount = () => {
    const extractedPosts = comments?.map((item: any) => item.post)

    dispatch(
      setCommentCountInStore(
        makeCommentNumberKeyValuePair(extractedPosts ?? []),
      ),
    )
  }

  const getComments = async () => {
    try {
      const response = await getUserComments(userId ?? userData.id, {
        loadUser: true,
        page,
      })

      if (response.success) {
        setPage(page + 1)
        noMorePosts.current =
          response.data?.pagination?.CurrentPage &&
          response.data?.pagination?.CurrentPage !==
            response.data?.pagination?.TotalPages

        setComments((prev: PostsInterface[]) => [
          ...prev,
          ...response?.data?.comments,
        ])
        dispatch(setPosts([...comments, ...response?.data?.comments]))
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
    setComments(storePosts.filter((item: any) => item.post !== undefined))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storePosts])

  return isCommentsLoading ? (
    <CardLoading />
  ) : (
    <div className="mx-auto flex max-w-screen-xl justify-center">
      <div
        className={`mr-[5px] ${
          token ? 'mt-[15px] max-lg:mt-[5px]' : 'mt-[15px]'
        } flex flex-col max-md:hidden max-sm:hidden lg:block`}>
        {userData && <ProfileCard />}
        <div
          className={`${
            userData ? 'top-[70px] mt-[0px]' : 'top-[70px] '
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
                            channels={channel}
                            updatePosts={setComments}
                            posts={comments}
                            userComment={comment}
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
