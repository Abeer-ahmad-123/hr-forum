'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { getChannels } from '@/services/channel/channel'
import { getUserSpecificPosts } from '@/services/posts'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import {
  PostsInterface,
  PostsInterfaceStore,
  UserSpecificPostsInterface,
} from '@/utils/interfaces/posts'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'
import ActivityButtons from './ActivityButtons'
import CardLoading from './Loading/cardLoading'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import { makeCommentNumberKeyValuePair } from '@/utils/helper'

interface UserFeedsProps {
  slug: string
}

const UserFeeds = ({ slug }: UserFeedsProps) => {
  const morePosts = useState<boolean>(true)
  let noMorePosts = useRef(morePosts)
  const dispatch = useDispatch()

  const userId = slug.split('-')[1]

  const [ref, inView] = useInView()
  const [channel, setChannel] = useState<ChannelInterface>()
  const [loading, setLoading] = useState<boolean>(true)

  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  const routeTo = `/feeds/${userData?.username}/feed`
  const router = useRouter()
  const pathName = usePathname()
  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )
  const [page, setPage] = useState(1)
  const [posts, updatePosts] = useState<PostsInterface[]>([])

  const getPosts = async () => {
    try {
      const { data } = await getUserSpecificPosts(
        userId ? userId : userData.id,
        page,
        {
          loadReactions: true,
          loadUser: true,
        },
      )

      setPage(page + 1)
      noMorePosts.current =
        data?.pagination?.CurrentPage &&
        data?.pagination?.CurrentPage !== data?.pagination?.TotalPages

      updatePosts([...posts, ...data?.posts])
      dispatch(setPosts([...posts, ...data?.posts]))
    } catch (error) {
      if (error instanceof Error && error.message) {
        handleFetchFailed(error)
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
        handleFetchFailed(error)
      }
    }
  }
  useEffect(() => {
    handleCommentCount()
  }, [posts])

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
    updatePosts([...storePosts])
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
                  {pathName.includes(`/${userData.username}/feed`) && (
                    <ActivityButtons />
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
    </div>
  )
}

export default UserFeeds
