import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/cardLoading'
import { getGenericPosts } from '@/services/posts/server-posts'
import { capitalizeWord } from '@/utils/helper'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum - ${capitalizeWord(params.slug)}`,
  }
}

const ChannelPage = async ({ params, searchParams }: any) => {
  const path = '/channels'

  const { channelData, initialPosts, morePosts } = await getGenericPosts({
    channelSlug: params?.slug ?? '',
    searchParams,
    path,
  })
  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeedsGeneral
        searchParams={searchParams}
        channelSlug={params?.slug}
        path={path}
        data={{ channels: channelData, posts: initialPosts }}
        morePosts={morePosts}
      />
    </Suspense>
  )
}

export default ChannelPage
