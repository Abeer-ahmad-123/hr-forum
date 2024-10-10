import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/CardLoading'
import { getGenericPosts } from '@/services/posts/server-posts'
import { getUserFromCookie } from '@/utils/cookies'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'HR-Forum - Feeds',
}

export const dynamic = 'force-dynamic'

const FeedPage = async ({ searchParams }: FeedPageProps) => {
  const { channelData, initialPosts, morePosts } = await getGenericPosts({
    channelSlug: '',
    searchParams,
    path: '/feed',
  })
  const { token } = await getUserFromCookie()

  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeedsGeneral
        channelSlug=""
        searchParams={searchParams}
        path="/feeds"
        morePosts={morePosts}
        data={{ channels: channelData, posts: initialPosts }}
      />
    </Suspense>
  )
}

export default FeedPage
