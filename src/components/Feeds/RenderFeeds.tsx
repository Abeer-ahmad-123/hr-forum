import Feeds from '@/components/Feeds/Feeds'
import { toPascalCase } from '@/utils/common'
import RenderFeedLoading from '../Loading/renderFeedLoading'
import { Suspense } from 'react'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getChannels } from '@/services/channel/channel'
import { getChannelIdByChannelName } from '@/utils/channels'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCardSkelton from '../ProfileCardSkelton'
import ChannelCardSkelton from '../ChannelCardSkelton'
import RulesCardSkelton from '../RuleCardSkelton'

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
    <div className=''>

      <p className="mb-4 text-3xl my-5 text-black dark:text-white">
        {!!channelSlug &&
          toPascalCase(channelSlug?.toString()?.replaceAll('-', ' '))}
      </p>
      <div className='flex justify-center'>

        <div className='flex flex-col'>
          <ProfileCard />
          <div className='sticky max-h-screen top-0' style={{ top: '35px' }}>
            <ChannelCard />
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-screen-lg dark:text-white">
            <Feeds
              channelSlug={channelSlug}
              initialPosts={initialPosts}
              channels={channels}
              morePosts={morePosts}
            />
          </div>

        </div>
        <div className='sticky max-h-screen ' style={{ top: '60px' }}>
          <RulesCard />
        </div>
      </div>



    </div>
  )
}
export default RenderFeeds
