import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/cardLoading'
import { getGenericPosts } from '@/services/posts'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'HR-Forum - Saved',
}

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
        path="/saved"
        data={{ channels: channelData, posts: initialPosts }}
        morePosts={morePosts}
      />
    </Suspense>
  )
}

export default FeedPage
