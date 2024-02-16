import React, { Suspense } from 'react'
import PostSkelton from './shared/post/PostSkelton'
import Post from './shared/post'
import { SinglePostProps } from '@/utils/interfaces/feeds'

const SinglePost = ({ postId, searchParams }: SinglePostProps) => {
  return (
    <Suspense fallback={<PostSkelton />}>
      <Post postId={postId} searchParams={searchParams} />
    </Suspense>
  )
}

export default SinglePost
