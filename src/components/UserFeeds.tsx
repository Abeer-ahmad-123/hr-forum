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
import { getUserSpecificPosts } from '@/services/posts'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'
import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'

const UserFeeds = ({ slug }: SlugProps) => {
  const { handleRedirect } = useFetchFailedClient()

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
  const [loading, setLoading] = useState<boolean>(true)
  const [channel, setChannel] = useState<ChannelInterface>()
  const [posts, updatePosts] = useState<PostsInterface[]>([])

  let noMorePosts = useRef<boolean>(morePosts)

  const userId = slug.split('-').pop()

  const getPosts = async () => {
    try {
      const { data } = await getUserSpecificPosts(userId ?? userData.id, page, {
        loadReactions: true,
        loadUser: true,
      })

      setPage(page + 1)
      noMorePosts.current =
        data?.pagination?.CurrentPage &&
        data?.pagination?.CurrentPage !== data?.pagination?.TotalPages

      updatePosts([...posts, ...data?.posts])
      dispatch(setPosts([...posts, ...data?.posts]))
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleRedirect({ error })
      }
    } finally {
      setLoading(false)
    }
  }
  const handleCommentCount = () => {
    dispatch(setCommentCountInStore(makeCommentNumberKeyValuePair(posts)))
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
    handleCommentCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])

  useEffect(() => {
    getPosts()
    getAllChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inView) {
      getPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    updatePosts([...storePosts])
  }, [storePosts])

  return loading ? (
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
                {pathName.includes(`/${slug}/posts`) && (
                  <ActivityButtons slug={slug} />
                )}
                <div>
                  {!!posts?.length ? (
                    posts?.map((post: any, index: number) => {
                      return (
                        <Card
                          key={index}
                          post={post}
                          channels={channel}
                          updatePosts={updatePosts}
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
  )
}

export default UserFeeds
