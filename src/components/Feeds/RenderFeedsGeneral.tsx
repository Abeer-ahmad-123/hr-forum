import Feeds from '@/components/Feeds/Feeds'
import { getUserFromCookie } from '@/utils/cookies'
import type {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import type { PostsInterface } from '@/utils/interfaces/posts'
import type { RenderFeedsInterface } from '@/utils/interfaces/renderFeeds'
import FeaturesDropDownWithSuspense from '../Cards/FeaturesDropDownWithSuspense'

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

  return (
    <div className="w-full max-w-[759px]">
      <div className="flex w-full justify-center">
        <div className="w-full">
          <FeaturesDropDownWithSuspense />
          <div
            className={`${
              path === '/saved' ? '' : 'max-lg:mt-[30px] max-md:mt-[20px]'
            } mt-[20px] w-full max-w-screen-md dark:text-white`}>
            <Feeds
              channelSlug={channelSlug}
              initialPosts={data.posts}
              channels={data.channels as ChannelByIdInterface[]}
              morePosts={morePosts}
              searchParams={searchParams}
              path={path}
              userId={user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
