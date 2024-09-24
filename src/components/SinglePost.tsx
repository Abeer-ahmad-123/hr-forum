import { SinglePostProps } from '@/utils/interfaces/feeds'
import React, { Suspense } from 'react'
import Post from './shared/post'
import PostSkelton from './shared/post/PostSkelton'

const SinglePost = async ({ postId, searchParams, data }: SinglePostProps) => {
  return (
    <Suspense fallback={<PostSkelton />}>
      <Post postId={String(postId)} searchParams={searchParams} data={data} />
    </Suspense>
  )
}

export default SinglePost
