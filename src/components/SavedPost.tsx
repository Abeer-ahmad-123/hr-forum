'use client'
import { getBookmarkPosts } from '@/services/bookmark/bookmarkService'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from './shared'
import { showErrorAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { StoreChannels } from '@/utils/interfaces/channels'

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

  const [posts, setPosts] = useState<Array<Object>>([{}])

  const getSavePost = async () => {
    try {
      const res = await getBookmarkPosts(id, tokenInRedux)
      console.log(res.data)
      setPosts(res.data)
    } catch (error) {
      showErrorAlert(`${error}`)
    }
  }
  useEffect(() => {
    getSavePost()
  }, [])
  return (
    <div className="min-h-[70vh]">
      {/* {!!posts?.length ? (
        posts?.map((post: any) => {
          return <Card key={post?.title} post={post} channels={channels} />
        })
      ) : (
        <p>No saved posts</p>
      )} */}
    </div>
  )
}

export default SavedPost
