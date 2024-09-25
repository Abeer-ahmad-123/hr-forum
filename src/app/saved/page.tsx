import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/CardLoading'
import { getGenericPosts } from '@/services/posts/server-posts'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'HR-Forum - Saved',
}

export const dynamic = 'force-dynamic'

const FeedPage = async ({ searchParams }: FeedPageProps) => {
  const path = '/saved'
  const { channelData, initialPosts, morePosts } = await getGenericPosts({
    channelSlug: '',
    searchParams,
    path,
  })

  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeedsGeneral
        channelSlug=""
        searchParams={searchParams}
        path={path}
        data={{ channels: channelData, posts: initialPosts }}
        morePosts={morePosts}
      />
    </Suspense>
  )
}

export default FeedPage
