import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/cardLoading'
import { getGenericPosts } from '@/services/posts'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'HR-Forum - Feeds',
}

const FeedPage = async ({ searchParams }: FeedPageProps) => {
  const { channelData, initialPosts, morePosts } = await getGenericPosts({
    channelSlug: '',
    searchParams,
    path: '/feed',
  })

  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeedsGeneral
        channelSlug=""
        searchParams={searchParams}
        path="/feed"
        morePosts={morePosts}
        data={{ channels: channelData, posts: initialPosts }}
      />
    </Suspense>
  )
}

export default FeedPage
