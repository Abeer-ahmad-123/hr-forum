import Feeds from '@/components/Feeds/Feeds'
import { getUserFromCookie } from '@/utils/cookies'
import type {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import type { PostsInterface } from '@/utils/interfaces/posts'
import type { RenderFeedsInterface } from '@/utils/interfaces/renderFeeds'
import SavePost from '@/assets/images/savePost.svg'
import PopularPost from '@/assets/images/popularPost.svg'
import FeaturesDropDownWithSuspense from '../Cards/FeaturesDropDownWithSuspense'
import Image from 'next/image'

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
  console.log('first', path.includes('popular'))
  return (
    <div className="w-full max-w-[759px]">
      <div className="flex w-full justify-center">
        <div className="w-full">
          <FeaturesDropDownWithSuspense />
          <div
            className={`${
              path === '/saved' || path === '/popular'
                ? ''
                : 'max-lg:mt-[30px] max-md:mt-[20px]'
            } mt-[20px] w-full max-w-screen-md dark:text-white`}>
            {path === '/saved' && (
              <Image
                alt="save post"
                src={SavePost}
                width={759}
                height={190}
                className="mb-5"
              />
            )}
            {path === '/popular' && (
              <Image
                alt="save post"
                src={PopularPost}
                width={759}
                height={190}
                className="mb-5"
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}
