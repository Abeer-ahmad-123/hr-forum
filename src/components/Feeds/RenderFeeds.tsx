import Feeds from '@/components/Feeds/Feeds'
import { toPascalCase } from '@/utils/common'
import RenderFeedLoading from '../Loading/renderFeedLoading'
import { Suspense } from 'react'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getChannels } from '@/services/channel/channel'
import { getChannelIdByChannelName } from '@/utils/channels'

async function RenderFeeds({ channelSlug = null }) {
  const { channels } = await getChannels()
  let initialPosts = []
  let morePosts = true
  if (channelSlug) {
    const getChannelId = getChannelIdByChannelName(channelSlug, channels)
    const { data } = await getPostsByChannelId({
      id: getChannelId,
      loadReactions: true,
      loadUser: true,
    })
    initialPosts = data?.posts
    morePosts = data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
  } else {
    const { data } = await getAllPosts({
      loadReactions: true,
      loadUser: true,
    })
    initialPosts = data?.posts
    morePosts = data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
  }
  return (
    <div>
      <div className="mx-auto mt-10 max-w-screen-lg dark:text-white">
        <p className="mb-4 text-3xl text-black dark:text-white">
          {!!channelSlug &&
            toPascalCase(channelSlug?.toString()?.replaceAll('-', ' '))}
        </p>

        <Feeds
          channelSlug={channelSlug}
          initialPosts={initialPosts}
          channels={channels}
          morePosts={morePosts}
        />
      </div>
    </div>
  )
}
export default RenderFeeds
