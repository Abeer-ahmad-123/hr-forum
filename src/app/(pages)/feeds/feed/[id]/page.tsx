import Post from '@/components/shared/post'
import PostSkelton from '@/components/shared/post/PostSkelton'
import { Suspense } from 'react'

const SingleFeed = ({ params, searchParams }: any) => {
  const id = params.id

  return (
    <Suspense fallback={<PostSkelton />}>
      <Post postId={id} searchParams={searchParams} />
    </Suspense>
  )
}

export default SingleFeed
