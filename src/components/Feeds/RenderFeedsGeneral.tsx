import Feeds from '@/components/Feeds/Feeds'
import { getUserFromCookie } from '@/utils/cookies'
import type {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import SavePost from '@/assets/images/savePost.svg'
import PopularPost from '@/assets/images/popularPost.svg'
import type { PostsInterface } from '@/utils/interfaces/posts'
import type { RenderFeedsInterface } from '@/utils/interfaces/renderFeeds'
import FeaturesDropDownWithSuspense from '../Cards/FeaturesDropDownWithSuspense'
import Image from 'next/image'

type Props = RenderFeedsInterface & {
  data: {
    channels: ChannelInterface[] | ChannelByIdInterface[]
    posts: PostsInterface[]
  }
  morePosts: boolean
  channelImg?: string
  token?: string
}
export default async function RenderFeedsGeneral({
  channelSlug = '',
  searchParams,
  path,
  data,
  morePosts,
  channelImg,
  token,
}: Props) {
  const { user } = await getUserFromCookie()
  return (
    <div className="w-full">
      <div className="flex w-full justify-center">
        <div className="w-full">
          {<FeaturesDropDownWithSuspense />}
          <div
            className={`${
              path === '/saved' || path === '/popular' ? '' : 'mt-0 '
            } w-full dark:text-white lg:max-w-screen-md`}>
            {path === '/saved' && (
              <Image
                alt="save post"
                src={SavePost}
                width={759}
                height={190}
                className="mb-5  w-full"
              />
            )}
            {path === '/popular' && !token && (
              <Image
                alt="save post"
                src={PopularPost}
                width={759}
                height={190}
                className="mb-0 w-full lg:mb-5 "
              />
            )}

            <Feeds
              channelSlug={channelSlug}
              initialPosts={data.posts}
              channels={data.channels as ChannelByIdInterface[]}
              morePosts={morePosts}
              searchParams={searchParams}
              path={path}
              user={user}
              channelImg={channelImg}
              token={token}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
