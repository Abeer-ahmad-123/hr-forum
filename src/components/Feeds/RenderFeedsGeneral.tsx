import { noChannelBanner } from '@/assets/images'
import Feeds from '@/components/Feeds/Feeds'
import ChannelCard from '@/components/SideCards/ChannelCard'
import ProfileCard from '@/components/SideCards/ProfileCard'
import RulesCard from '@/components/SideCards/RuleCard'
import { toPascalCase } from '@/utils/common'
import { getUserFromCookie } from '@/utils/cookies'
import type {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import type { PostsInterface } from '@/utils/interfaces/posts'
import type { RenderFeedsInterface } from '@/utils/interfaces/renderFeeds'
import FeaturesDropDownWithSuspense from "../Cards/FeaturesDropDownWithSuspense"
import Logout from '../Cards/Logout'
import MenuCard from '../Cards/MenuCard'


type Props = RenderFeedsInterface & {
  data: {
    channels: ChannelInterface[] | ChannelByIdInterface[]
    posts: PostsInterface[]
  }
  morePosts: boolean
}
export default async function RenderFeedsGeneral({
  channelSlug = '',
  searchParams,
  path,
  data,
  morePosts,
}: Props) {
  const { user, token: accessToken } = await getUserFromCookie()


  const getImageUrlBySlug = (slug: string) => {
    const matchingObject = (data.channels as ChannelInterface[]).find(
      (obj: { slug: string }) => obj.slug === slug,
    )

    if (matchingObject) {
      return matchingObject.ImageURL
    }
  }
  return (

      <div className="w-full max-w-screen-md">
        {(!!channelSlug || path === '/saved') && (
          <div className="max-w-768px mx-auto mt-11">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
              <img
                className="max-w-768px z-10 h-[200px] w-full rounded-t-xl"
                src={
                  channelSlug
                    ? getImageUrlBySlug(channelSlug) || noChannelBanner.src
                    : noChannelBanner.src
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
            <FeaturesDropDownWithSuspense />
            <div
              className={`${path === '/saved'
                  ? 'mt-[20px]'
                  : 'mt-[35px] max-lg:mt-[30px] max-md:mt-[20px]'
                }  w-full max-w-screen-md dark:text-white`}>
              <Feeds
                channelSlug={channelSlug}
                initialPosts={data.posts}
                channels={data.channels as ChannelByIdInterface[]}
                morePosts={morePosts}
                searchParams={searchParams}
                path={path}
                user={user?.id}
              />
            </div>
          </div>
        </div>
      </div>
  )
}
