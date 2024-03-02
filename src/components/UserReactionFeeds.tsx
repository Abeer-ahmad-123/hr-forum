'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { getChannels } from '@/services/channel/channel'
import { getUserReactedPosts } from '@/services/posts'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'

import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { setPosts } from '@/store/Slices/postSlice'
import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'

const UserReactionFeeds = ({ slug }: SlugProps) => {
  const { handleRedirect } = useFetchFailedClient()

  const [ref, inView] = useInView()
  const dispatch = useDispatch()
  const pathName = usePathname()

  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)

  const [page, setPage] = useState(1)
  const [morePosts] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [channel, setChannel] = useState<ChannelInterface>()
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
      const posts = reactions
        .map((item: any) => item.post)
        .filter((post: any) => post !== undefined)

      const extractedPosts = posts.length > 0 ? [posts] : []
      updatePost([...posts, ...extractedPosts])
      dispatch(setPosts([...posts, ...extractedPosts]))
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
      const { channels } = await getChannels()
      setChannel(channels)
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleRedirect({ error })
      }
    }
  }
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
    updatePost([...storePosts])
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
                          channels={channel}
                          updatePosts={updatePost}
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

export default UserReactionFeeds
