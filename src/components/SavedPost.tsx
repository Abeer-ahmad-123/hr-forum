'use client'
import { getBookmarkPosts } from '@/services/bookmark/bookmarkService'
import { noChannelBanner } from '@/utils/ImagesLink'
import { StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { BookmarkedPostInterface } from '@/utils/interfaces/savedPost'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from './shared'

const SavedPost = () => {
  const tokenInRedux = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.token,
  )
  const { id } = useSelector(
    (state: LoggedInUser) => state?.loggedInUser?.userData,
  )
  const channels = useSelector(
    (state: StoreChannels) => state?.channels.channels,
  )
  const [posts, setPosts] = useState<BookmarkedPostInterface>()

  const getSavePost = async () => {
    try {
      const res = await getBookmarkPosts(id, tokenInRedux)
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
    }
  }
  useEffect(() => {
    getSavePost()
  }, [])

  return (
    <>
      <div className="mx-auto mt-[20px] max-w-[768px]">
        <div className="mb-[20px] h-[170px] rounded-xl bg-white">
          <img
            className=" h-[100px] w-full max-w-[768px] rounded-t-xl"
            src={noChannelBanner}
            alt="banner"
            width={200}
            height={100}
          />
          <p className="my-5 mb-4 text-3xl text-black dark:text-white">
            Saved Posts
          </p>
        </div>
      </div>
      <div className="min-h-[70vh]">
        {!!posts?.Bookmarks?.length ? (
          posts?.Bookmarks?.map((post: any) => {
            return (
              <Card key={post?.title} post={post.post} channels={channels} />
            )
          })
        ) : (
          <p>No saved posts</p>
        )}
      </div>
    </>
  )
}

export default SavedPost
