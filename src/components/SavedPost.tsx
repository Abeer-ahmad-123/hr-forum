'use client'
import { getBookmarkPosts } from '@/services/bookmark/bookmarkService'
import { noChannelBanner } from '@/utils/ImagesLink'
import { StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { BookmarkedPostInterface } from '@/utils/interfaces/savedPost'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RenderFeedLoading from './Loading/renderFeedLoading'
import { Card } from './shared'
import { useInterceptor } from '@/hooks/interceptors'
import { redirect } from 'next/navigation'

const SavedPost = () => {
  const renderTimes = 5
  const componentsArray = Array.from({ length: renderTimes }, (_, index) => (
    <RenderFeedLoading key={index} />
  ))
  const [bookmarkupdated, setBookmarkupdated] = useState<boolean>(false)

  const tokenInRedux = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.token,
  )
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const { customFetch } = useInterceptor()

  const { id } = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const channels = useSelector(
    (state: StoreChannels) => state?.channels.channels,
  )
  const [posts, setPosts] = useState<BookmarkedPostInterface>()

  const getSavePost = async () => {
    try {
      const res = await getBookmarkPosts(
        id,
        customFetch,
        tokenInRedux,
        refreshTokenInRedux,
      )
      const updatedBookmarks = res.data.Bookmarks.map(
        (bookmark: { post: PostsInterface }) => ({
          ...bookmark,
          post: {
            ...bookmark.post,
            user_has_bookmarked: true,
          },
        }),
      )
      setPosts({ Bookmarks: updatedBookmarks })
    } catch (error) {
      console.error(`${error}`)
      redirect('/feeds')
    }
  }
  useEffect(() => {
    getSavePost()
  }, [bookmarkupdated])

  return (
    <>
      <div className="max-w-768px mx-auto mt-11">
        <div className="h-170px relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
          <img
            className="h-100px max-w-768px z-10 w-full rounded-t-xl"
            src={noChannelBanner}
            alt="banner"
            width={200}
            height={100}
          />
          <p className="absolute inset-0 z-20 flex items-center justify-center text-base text-white max-md:text-2xl lg:text-3xl">
            Saved Posts
          </p>
        </div>
      </div>
      <div className="mt-10 min-h-[70vh]">
        {posts?.Bookmarks?.length ? (
          posts?.Bookmarks?.map((post: any, index: number) => {
            return (
              <div key={index}>
                <Card
                  post={post.post}
                  channels={channels}
                  setBookmarkupdated={setBookmarkupdated}
                />
              </div>
            )
          })
        ) : posts?.Bookmarks?.length === 0 ? (
          <p className="my-5 text-center">No saved posts yet.</p>
        ) : (
          <div>{componentsArray}</div>
        )}
      </div>
    </>
  )
}

export default SavedPost
