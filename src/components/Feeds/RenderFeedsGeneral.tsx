import Feeds from '@/components/Feeds/Feeds'
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
import { userData } from '@/utils/interfaces/userData'

type Props = RenderFeedsInterface & {
  data: {
    channels: ChannelInterface[] | ChannelByIdInterface[]
    posts: PostsInterface[]
  }
  morePosts: boolean
  channelImg?: string
  token?: string
  userInCookies?: userData
  refreshToken?: string
}
export default async function RenderFeedsGeneral({
  channelSlug = '',
  searchParams,
  path,
  data,
  morePosts,
  channelImg,
  token,
  userInCookies,
  refreshToken,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center">
        <div className="w-full">
          {<FeaturesDropDownWithSuspense />}
          <div
            className={`${
              path.includes('/saved') || path.includes('/popular')
                ? ''
                : 'mt-0 '
            } w-full dark:text-white lg:max-w-screen-md`}>
            {path.includes('/saved') && (
              <Image
                alt="save post"
                src={SavePost}
                width={759}
                height={190}
                className="mb-5  w-full"
              />
            )}
            {path.includes('/popular') && !token && (
              <Image
                alt="save post"
                src={PopularPost}
                width={759}
                height={190}
                className=" w-full lg:mb-5 "
              />
            )}

            <Feeds
              channelSlug={channelSlug}
              initialPosts={data.posts}
              channels={data.channels as ChannelByIdInterface[]}
              morePosts={morePosts}
              searchParams={searchParams}
              path={path}
              user={userInCookies}
              channelImg={channelImg}
              token={token}
              refreshToken={refreshToken}
              userInCookies={userInCookies}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
