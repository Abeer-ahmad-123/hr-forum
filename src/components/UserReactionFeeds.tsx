'use client'
import NoPosts from '@/components/Cards/NoMore'
import FeaturesDropDownWithSuspense from '@/components/Cards/FeaturesDropDownWithSuspense'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
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
import { getUserData } from '@/utils/local-stroage'

const UserReactionFeeds = ({ slug, userData, accessToken }: ReportedProps) => {
  const { handleRedirect } = useFetchFailedClient()

  const firstRunRef = useRef<boolean>(true)

  const [ref, inView] = useInView()
  // const dispatch = useDispatch()
  const pathName = usePathname()

  // const storePosts = useSelector(
  //   (state: PostsInterfaceStore) => state.posts.posts,
  // )
  // const userData = useSelector(
  //   (state: LoggedInUser) => state.loggedInUser.userData,
  // )

  // const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)

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
      // dispatch(setPosts([...posts, ...extractedPosts]))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inView) {
      getPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])
  // useEffect(() => {
  //   updatePost([...storePosts])
  // }, [storePosts])

  const user = getUserData()?.user

  return loading ? (
    <CardLoading user={user} />
  ) : (
    <div className="mx-auto flex max-w-screen-xl justify-center">
      {/* <div
        className={`mr-[5px] ${
          accessToken ? 'mt-[15px] max-lg:mt-[5px]' : 'mt-[15px]'
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
            accessToken
              ? 'top-[330px] mt-[20px]'
              : 'top-[335px] mt-5 max-lg:top-[328px]'
          } max-h-screen`}>
          {' '}
          <RulesCard />
        </div>
      </div> */}

      <div className={`w-full max-w-screen-md`}>
        <div className="flex w-full justify-center">
          <div className="w-full">
            <div>
              {' '}
              <FeaturesDropDownWithSuspense />
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
                          userId={Number(userData?.id)}
                          channels={channels}
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
