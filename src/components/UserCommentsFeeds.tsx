'use client'
import NoPosts from '@/components/Cards/NoMore'
import RespScreen from '@/components/Cards/ResponsiveScreen'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { Card } from '@/components/shared'
import CircularProgress from '@/components/ui/circularProgress'
import { getChannels } from '@/services/channel/channel'
import { handleFetchFailed } from '@/utils/helper/FetchFailedErrorhandler'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificPostsInterface } from '@/utils/interfaces/posts'
import { useInView } from 'react-intersection-observer'

import { getUserComments } from '@/services/comments'
import { MessageSquare, Plus, SmilePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CardLoading from './Loading/cardLoading'

const UserCommentsFeeds = () => {
  const morePosts = useRef<boolean>(false)
  let noMorePosts = useRef(morePosts)
  const [ref, inView] = useInView()
  const [channel, setChannel] = useState<ChannelInterface>()
  const router = useRouter()

  const path = '/channels'
  const [comments, setComments] = useState([])
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const routeTo = `/feeds/${userData?.username}/feed`

  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<UserSpecificPostsInterface[]>([])
  let morePostsExist = useRef(morePosts)
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const [profileNav, setProfileNav] = useState<{
    isComment: boolean
    isReaction: boolean
    isPost: boolean
  }>({
    isComment: true,
    isReaction: false,
    isPost: false,
  })
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

  const commentOnClick = () => {
    nProgress.start()
    router.push(`${routeTo}/comment`)
  }
  const reactionOnClick = () => {
    nProgress.start()
    router.push(`${routeTo}/reaction`)
  }

  const handlePost = () => {
    nProgress.start()
    router.push(`${routeTo}`)
  }

  useEffect(() => {
    getAllChannels()
  }, [])

  const getComments = async () => {
    try {
      const response = await getUserComments(userDataInStore.id, {
        loadUser: true,
        page,
      })

      if (response.success) {
        setPage(page + 1)
        morePostsExist.current =
          response.data?.pagination?.CurrentPage &&
          response.data?.pagination?.CurrentPage !==
            response.data?.pagination?.TotalPages
        setComments(response?.data?.comments)
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
    getComments()
  }, [])

  useEffect(() => {
    if (inView) {
      getComments()
    }
  }, [inView])

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  {
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
              <div className="sticky top-[321px] mt-5 max-h-screen max-lg:top-[330px]">
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
                    <div className="justify-start rounded-t-xl bg-white pl-10 pt-2">
                      <div className="text-start text-xl font-normal">
                        Activity
                      </div>
                      <div className="flex cursor-pointer items-start justify-start max-md:text-sm">
                        <div
                          onClick={handlePost}
                          className={`flex w-[100px] items-center gap-[8px] p-2 ${
                            profileNav.isPost
                              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
                              : 'opacity-50'
                          }`}>
                          <Plus size={20} />
                          <button> Post</button>
                        </div>
                        <div
                          onClick={commentOnClick}
                          className={`ml-2 flex w-[130px] cursor-pointer items-center gap-[8px] p-2 ${
                            profileNav.isComment
                              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
                              : ' opacity-50'
                          }`}>
                          <MessageSquare size={20} />
                          <button> Comment</button>
                          <hr />
                        </div>
                        <div
                          onClick={reactionOnClick}
                          className={`ml-2 flex w-[130px] cursor-pointer items-center gap-[8px] p-2 ${
                            profileNav.isReaction
                              ? 'z-10 border-b-2 border-[#571ce0] text-[#571ce0] transition duration-500 ease-in-out'
                              : ' opacity-50'
                          }`}>
                          <SmilePlus size={20} />
                          <button> Reactions</button>
                          <hr />
                        </div>
                        <p className="!mb-[-5px] !mt-[-2px] ml-2 h-[2px] bg-[#eaecf0]"></p>
                      </div>
                    </div>

                    <div>
                      {!!comments?.length ? (
                        comments?.map((comment: any, index: number) => {
                          return (
                            <Card
                              key={index}
                              post={comment.post}
                              channels={channel}
                              setPosts={setPosts}
                              posts={posts}
                              index={index}
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
}

export default UserCommentsFeeds
