'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { getChannels } from '@/services/channel/channel'
import { getUserComments } from '@/services/comments'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'
import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'

const UserCommentsFeeds = ({ slug }: SlugProps) => {
  const [morePosts] = useState<boolean>(true)
  let noMorePosts = useRef<boolean>(morePosts)
  const [ref, inView] = useInView()
  const [channel, setChannel] = useState<ChannelInterface>()
  const dispatch = useDispatch()

  const userId = slug.split('-')[1]

  const [comments, setComments] = useState<PostsInterface[]>([])

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )
  const pathName = usePathname()

  const [page, setPage] = useState(1)

  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const userDataInStore = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )

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
  const handleCommentCount = () => {
    dispatch(setCommentCountInStore(makeCommentNumberKeyValuePair(comments)))
  }

  const getComments = async () => {
    try {
      const response = await getUserComments(userId, {
        loadUser: true,
        page,
      })

      if (response.success) {
        setPage(page + 1)
        noMorePosts.current =
          response.data?.pagination?.CurrentPage &&
          response.data?.pagination?.CurrentPage !==
            response.data?.pagination?.TotalPages
        const extractedPosts = response?.data?.comments.map(
          (item: any) => item.post,
        )
        setComments((prev: PostsInterface[]) => [...prev, ...extractedPosts])
        dispatch(setPosts([...comments, ...extractedPosts]))
      }
    } catch (error) {
      if (error instanceof Error) {
        handleFetchFailed(error)
      }
    } finally {
      setIsCommentsLoading(false)
    }
  }

  useEffect(() => {
    getAllChannels()
    getComments()
  }, [])

  useEffect(() => {
    if (inView) {
      getComments()
    }
  }, [inView])

  useEffect(() => {
    handleCommentCount()
  }, [comments])

  useEffect(() => {
    setComments([...storePosts])
  }, [storePosts])

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])
  return isCommentsLoading ? (
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
                  {comments?.length && noMorePosts?.current && (
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

export default UserCommentsFeeds
