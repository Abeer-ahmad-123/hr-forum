import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/CardLoading'
import { getGenericPosts } from '@/services/posts/server-posts'
import { getUserFromCookie } from '@/utils/cookies'
import { capitalizeWord } from '@/utils/helper'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum - ${capitalizeWord(params.slug)}`,
  }
}
export const dynamic = 'force-dynamic'

const ChannelPage = async ({ params, searchParams }: any) => {
  const path = '/channels'
  const { user, token, refreshToken } = await getUserFromCookie()

  const { channelData, initialPosts, morePosts } = await getGenericPosts({
    channelSlug: params?.slug ?? '',
    searchParams,
    path,
  })

  return (
    <>
      <Suspense fallback={<CardLoading />}>
        <RenderFeedsGeneral
          searchParams={searchParams}
          channelSlug={params?.slug}
          path={path}
          data={{ channels: channelData, posts: initialPosts }}
          morePosts={morePosts}
        />
      </Suspense>
    </>
  )
}

export default ChannelPage
