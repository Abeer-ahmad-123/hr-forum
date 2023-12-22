'use client'
import nookies from 'nookies'
import { getBookmarkPosts } from '@/services/bookmark/bookmarkService'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from './shared'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { StoreChannels } from '@/utils/interfaces/channels'
import { PostsInterface } from '@/utils/interfaces/posts'
import { BookmarkedPostInterface } from '@/utils/interfaces/savedPost'

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
    <div className="min-h-[70vh]">
      {!!posts?.Bookmarks?.length ? (
        posts?.Bookmarks?.map((post: any) => {
          return <Card key={post?.title} post={post.post} channels={channels} />
        })
      ) : (
        <p>No saved posts</p>
      )}
    </div>
  )
}

export default SavedPost
