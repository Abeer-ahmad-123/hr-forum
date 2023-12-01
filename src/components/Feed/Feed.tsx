import { Card } from '../shared'
import { getAllPosts } from '@/services/posts'

import { Suspense } from 'react'
import Loading from '@/app/(pages)/feeds/Loading'
// Feed is a functional component that takes data and displays it as cards
const Feed = async ({ channelName }: any) => {
  const { posts } = await getAllPosts({ loadReactions: true, loadUser: true })
  return (
    <Suspense fallback={<Loading />}>
      {!!posts.length &&
        posts?.map((post: any) => {
          return <Card key={post.id} post={post} />
        })}
    </Suspense>
  )
}

export default Feed
