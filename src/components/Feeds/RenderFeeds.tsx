import Feeds from '@/components/Feeds/Feeds'
import PostBar from '@/components/shared/new-post/NewPostModal'
import { toPascalCase } from '@/utils/common'

import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getChannels } from '@/services/channel/channel'
import { getChannelIdByChannelName } from '@/utils/channels'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import ChannelCard from '@/components/SideCards/ChannelCard'

import RespScreen from '../Cards/ResponsiveScreen'

async function RenderFeeds({ channelSlug = '' }) {
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
  console.log('initialPosts', initialPosts)
  console.log('channels', channels)
  console.log('morePosts', morePosts)
  return (
    <div className="flex justify-center">
      <div className="ml-20 mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
        <ProfileCard />
        <div className="sticky top-0 max-h-screen" style={{ top: '60px' }}>
          <ChannelCard />
        </div>
      </div>

      <div className="">
        <p className="my-5 mb-4 text-3xl text-black dark:text-white">
          {!!channelSlug &&
            toPascalCase(channelSlug?.toString()?.replaceAll('-', ' '))}
        </p>
        <div className="flex justify-center">
          {/* <div className='flex flex-col lg:block max-sm:hidden max-md:hidden'>
          <ProfileCard />
          <div className='sticky max-h-screen top-0' style={{ top: '35px' }}>
            <ChannelCard /></div>
        </div> */}
          {/*  put the responsive profile compoennt here */}
          <div>
            <div className="max-sm:block md:hidden lg:hidden">
              {' '}
              <RespScreen />
            </div>
            <div className="mb-5 max-sm:block md:hidden lg:hidden">
              {' '}
              <PostBar />
            </div>

            <div className="mx-auto max-w-screen-md dark:text-white">
              <div className="mb-5 max-md:hidden max-sm:hidden">
                <PostBar />
              </div>
              <Feeds
                channelSlug={channelSlug}
                initialPosts={initialPosts}
                channels={channels}
                morePosts={morePosts}
              />
            </div>
          </div>

          {/* <div className='sticky max-h-screen lg:block max-sm:hidden sm:hidden ' style={{ top: '60px' }}> <RulesCard />
        </div> */}
        </div>
      </div>

      <div
        className="sticky mt-5 max-h-screen max-sm:hidden sm:hidden lg:block "
        style={{ top: '60px' }}>
        {' '}
        <RulesCard />
      </div>
    </div>
  )
}
export default RenderFeeds
