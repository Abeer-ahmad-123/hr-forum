import React, { Suspense } from 'react'
import PostSkelton from './shared/post/PostSkelton'
import Post from './shared/post'
import { SinglePostProps } from '@/utils/interfaces/feeds'

const SinglePost = ({ postId, searchParams, data }: SinglePostProps) => {
  return (
    <Suspense fallback={<PostSkelton />}>
      <Post postId={postId} searchParams={searchParams} data={data} />
    </Suspense>
  )
}

export default SinglePost
