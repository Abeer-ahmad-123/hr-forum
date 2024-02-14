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
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'

import { setPosts } from '@/store/Slices/postSlice'
import { SlugProps } from '@/utils/interfaces/userData'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'

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

  const [page, setPage] = useState(1)
  const [morePosts] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [channel, setChannel] = useState<ChannelInterface>()
  const [posts, updatePost] = useState<PostsInterface[]>([])

  let noMorePosts = useRef<boolean>(morePosts)

  const userId = slug.split('-')[1]

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
  }, [])

  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  useEffect(() => {
    updatePost([...storePosts])
  }, [storePosts])

  return loading ? (
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
    </div>
  )
}

export default UserReactionFeeds
