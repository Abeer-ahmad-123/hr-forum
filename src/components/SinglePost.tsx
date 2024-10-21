import { SinglePostProps } from '@/utils/interfaces/feeds'
import React, { Suspense } from 'react'
import Post from './shared/post'
import PostSkelton from './shared/post/PostSkelton'
import FeaturesDropDownWithSuspense from './Cards/FeaturesDropDownWithSuspense'
import { getUserFromCookie } from '@/utils/cookies'

const SinglePost = async ({ postId, searchParams, data }: SinglePostProps) => {
  const { user, token } = await getUserFromCookie()
  return (
    <>
      <FeaturesDropDownWithSuspense />
      <Suspense fallback={<PostSkelton />}>
        <Post
          postId={String(postId)}
          searchParams={searchParams}
          data={data}
          user={user}
          token={token}
        />
      </Suspense>
    </>
  )
}

export default SinglePost
