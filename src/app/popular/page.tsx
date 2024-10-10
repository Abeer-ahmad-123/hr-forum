import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/CardLoading'
import { getGenericPosts } from '@/services/posts/server-posts'
import { getUserFromCookie } from '@/utils/cookies'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'HR-Forum - Popular',
}

export const dynamic = 'force-dynamic'

const PopularPosts = async ({ searchParams }: FeedPageProps) => {
  const { token } = await getUserFromCookie()
  const { channelData, initialPosts, morePosts } = await getGenericPosts({
    channelSlug: '',
    searchParams,
    path: '/feed',
  })
  if (token) {
    redirect('/')
  }

  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeedsGeneral
        channelSlug=""
        searchParams={searchParams}
        path="/popular"
        morePosts={morePosts}
        data={{ channels: channelData, posts: initialPosts }}
      />
    </Suspense>
  )
}

export default PopularPosts
