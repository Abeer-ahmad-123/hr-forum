import Feeds from '@/components/Feeds/Feeds'

import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import PostBar from '@/components/shared/new-post/NewPostModal'
import { getChannels } from '@/services/channel/channel'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getSearchPosts } from '@/services/search'
import { noChannelBanner } from '@/utils/ImagesLink'
import { getChannelIdByChannelName } from '@/utils/channels'
import { toPascalCase } from '@/utils/common'
import { RenderFeedsInterface } from '@/utils/interfaces/renderFeeds'
import { cookies } from 'next/headers'
import RespScreen from '../Cards/ResponsiveScreen'

async function RenderFeeds({
  channelSlug = '',
  searchParams,
  path,
}: RenderFeedsInterface) {
  const { channels } = await getChannels()
  let initialPosts = []
  let morePosts = true
  const userDetailsCookies = cookies().get('user-details')

  if (channelSlug) {
    if (!searchParams.search) {
      const getChannelId = getChannelIdByChannelName(channelSlug, channels)

      const { data } = await getPostsByChannelId({
        id: getChannelId,

        userID:
          (userDetailsCookies && JSON.parse(userDetailsCookies?.value!)?.id) ??
          undefined,

        loadReactions: true,
        loadUser: true,
      })
      initialPosts = data?.posts
      morePosts = data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
    } else {
      const getChannelId =
        path === '/channels' && channelSlug
          ? getChannelIdByChannelName(channelSlug, channels) || undefined
          : undefined
      const { data } = await getSearchPosts({
        search: searchParams.search,
        userID:
          (userDetailsCookies && JSON.parse(userDetailsCookies?.value!)?.id) ??
          undefined,
        channelID: getChannelId,
      })

      initialPosts = data?.posts
      morePosts = data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
    }
  } else {
    if (Object.keys(searchParams).length && searchParams.search) {
      const { data } = await getSearchPosts({
        search: searchParams.search,
        userID:
          (userDetailsCookies && JSON.parse(userDetailsCookies?.value!)?.id) ??
          undefined,
      })

      initialPosts = data?.posts
      morePosts = data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
    } else {
      const { data } = await getAllPosts({
        loadReactions: true,
        loadUser: true,
        userID:
          (userDetailsCookies && JSON.parse(userDetailsCookies?.value!)?.id) ??
          undefined,
      })
      initialPosts = data?.posts
      morePosts = data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
    }
  }

  const getImageUrlBySlug = (slug: string) => {
    console.log(slug)
    const matchingObject = channels.find(
      (obj: { slug: string }) => obj.slug === slug,
    )

    if (matchingObject) {
      return matchingObject.ImageURL
    }
  }

  return (
    <div
      key={Math.random()}
      className="mx-auto flex max-w-screen-xl justify-center">
      <div className="mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
        {userDetailsCookies && <ProfileCard />}
        <div className="sticky top-[60px] max-h-screen">
          <ChannelCard />
        </div>
        <div className="sticky top-[318px] mt-5 max-h-screen max-lg:top-[335px]">
          {' '}
          <RulesCard />
        </div>
      </div>

      <div className="w-full max-w-screen-md">
        {!!channelSlug && (
          <div className="max-w-768px mx-auto mt-11">
            <div className="h-170px relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
              <img
                className="h-100px max-w-768px z-10 w-full rounded-t-xl"
                src={getImageUrlBySlug(channelSlug) || noChannelBanner}
                alt="banner"
                width={200}
                height={100}
              />
              <p className="absolute inset-0 z-20 flex items-center justify-center text-base text-white sm:text-xl md:text-2xl lg:text-3xl">
                {toPascalCase(channelSlug?.toString()?.replaceAll('-', ' '))}
              </p>
            </div>
          </div>
        )}

        <div className="flex w-full justify-center">
          <div className="w-full">
            <div className="max-sm:block md:hidden lg:hidden">
              {' '}
              <RespScreen />
            </div>
            <div className="mb-5 max-sm:block md:hidden lg:hidden">
              {' '}
              <PostBar />
            </div>

            <div className="mt-[20px]  w-full max-w-screen-md dark:text-white">
              <div className="mb-5 max-md:hidden max-sm:hidden">
                <PostBar />
              </div>
              <Feeds
                channelSlug={channelSlug}
                initialPosts={initialPosts}
                channels={channels}
                morePosts={morePosts}
                searchParams={searchParams}
                path={path}
              />
            </div>
          </div>

          {/* <div className='sticky max-h-screen lg:block max-sm:hidden sm:hidden ' style={{ top: '60px' }}> <RulesCard />
        </div> */}
        </div>
      </div>
    </div>
  )
}
export default RenderFeeds
