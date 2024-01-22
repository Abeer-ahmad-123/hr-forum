import Feeds from '@/components/Feeds/Feeds'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'

import { getBookmarkPosts } from '@/services/bookmark/bookmarkService'
import { getChannels } from '@/services/channel/channel'
import { getAllPosts, getPostsByChannelId } from '@/services/posts'
import { getSearchPosts } from '@/services/search'
import { noChannelBanner } from '@/utils/ImagesLink'
import { getChannelIdByChannelName } from '@/utils/channels'
import { toPascalCase } from '@/utils/common'
import {
  BookmarkData,
  RenderFeedsInterface,
} from '@/utils/interfaces/renderFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import RespScreen from '../Cards/ResponsiveScreen'

async function RenderFeeds({
  channelSlug = '',
  searchParams,
  path,
}: RenderFeedsInterface) {
  let channelData: any

  try {
    const { channels } = await getChannels()
    channelData = channels
  } catch (error) {
    if (error instanceof Error && error.message) {
      redirect('/error')
    }
  }
  let initialPosts = []
  let morePosts = true
  const userDetailsCookies = cookies().get('user-details')

  if (channelSlug) {
    if (!searchParams.search) {
      const getChannelId = getChannelIdByChannelName(channelSlug, channelData)

      const { data } = await getPostsByChannelId({
        id: getChannelId,

        userID:
          (userDetailsCookies?.value &&
            JSON.parse(userDetailsCookies?.value!)?.id) ??
          undefined,

        loadReactions: true,
        loadUser: true,
      })
      initialPosts = data?.posts
      morePosts = data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
    } else {
      const getChannelId =
        path === '/channels' && channelSlug
          ? getChannelIdByChannelName(channelSlug, channelData) || undefined
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
      if (path === '/feed') {
        try {
          const { data } = await getAllPosts({
            loadReactions: true,
            loadUser: true,
            userID:
              (userDetailsCookies &&
                JSON.parse(userDetailsCookies?.value!)?.id) ??
              undefined,
          })
          initialPosts = data?.posts
          morePosts =
            data?.pagination?.CurrentPage !== data?.pagination?.TotalPages
        } catch (error) {}
      } else if (path === '/saved') {
        try {
          const res = await getBookmarkPosts(
            (userDetailsCookies &&
              JSON.parse(userDetailsCookies?.value!)?.id) ??
              '',
          )

          initialPosts = res.data.Bookmarks.map((item: BookmarkData) => {
            const { userID, postID, bookmarkedAt, post, ...rest } = item
            return {
              ...rest,
              ...post,
              user_has_bookmarked: true,
            }
          })
          morePosts = false
        } catch (error) {
          console.error(`${error}`)
        }
      }
    }
  }
  const getImageUrlBySlug = (slug: string) => {
    const matchingObject = channelData.find(
      (obj: { slug: string }) => obj.slug === slug,
    )

    if (matchingObject) {
      return matchingObject.ImageURL
    }
  }

  return (
    <div className="mx-auto flex max-w-screen-xl justify-center">
      <div className="mt-5 flex flex-col max-md:hidden max-sm:hidden lg:block">
        {userDetailsCookies && <ProfileCard />}
        <div
          className={`${
            userDetailsCookies ? 'top-[70px] mt-[0px]' : 'top-[60px] mt-[20px]'
          } sticky  max-h-screen`}>
          <ChannelCard />
        </div>
        <div className="sticky top-[321px] mt-5 max-h-screen max-lg:top-[330px]">
          {' '}
          <RulesCard />
        </div>
      </div>

      <div className="w-full max-w-screen-md">
        {(!!channelSlug || path === '/saved') && (
          <div className="max-w-768px mx-auto mt-11">
            <div className="h-170px relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
              <img
                className="max-w-768px z-10 h-[200px] w-full rounded-t-xl"
                src={
                  channelSlug ? getImageUrlBySlug(channelSlug) : noChannelBanner
                }
                alt="banner"
              />
              <p className="absolute inset-0 z-20 flex items-center justify-center text-base text-white max-md:text-2xl lg:text-3xl">
                {channelSlug
                  ? toPascalCase(channelSlug?.toString()?.replaceAll('-', ' '))
                  : 'Saved Posts'}
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

            <div
              className={`${
                path === '/saved' ? 'mt-[20px]' : 'mt-[40px]'
              }  w-full max-w-screen-md dark:text-white`}>
              <Feeds
                channelSlug={channelSlug}
                initialPosts={initialPosts}
                channels={channelData}
                morePosts={morePosts}
                searchParams={searchParams}
                path={path}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RenderFeeds
