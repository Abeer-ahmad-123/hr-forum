import RenderFeedsGeneral from '@/components/Feeds/RenderFeedsGeneral'
import CardLoading from '@/components/Loading/CardLoading'
import { getChannels } from '@/services/channel/channel'
import { getGenericPosts } from '@/services/posts/server-posts'
import { getUserFromCookie } from '@/utils/cookies'
import { capitalizeWord } from '@/utils/helper'
import { Suspense } from 'react'
export const dynamic = 'force-dynamic'

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

  const channels = await getChannels()
  let channelImg
  for (let i = 0; i < channels.channels.length; i++) {
    if (channels.channels[i].slug === params.slug) {
      channelImg = channels.channels[i]?.ImageURL
    }
  }
  const { user, token } = await getUserFromCookie()

  return (
    <>
      <Suspense fallback={<CardLoading token={token} pathName="/channels" />}>
        <RenderFeedsGeneral
          searchParams={searchParams}
          channelSlug={params?.slug}
          path={path}
          data={{ channels: channelData, posts: initialPosts }}
          morePosts={morePosts}
          channelImg={channelImg}
          token={token}
          userInCookies={user}
        />
      </Suspense>
    </>
  )
}

export default ChannelPage
