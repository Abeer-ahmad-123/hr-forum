import { ChannelPill } from '@/components/shared'
import { timeFormatInHours } from '@/utils/helper'
import { StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificationPostInterface } from '@/utils/interfaces/posts'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PostReactionBar from './shared/PostReactionBar'

interface userData {
  id: number
  bio: string
  email: string
  name: string
  profilePictureURL: string
  username: string
}
interface ProfilePostsProps {
  post: UserSpecificationPostInterface
  user: userData
}

const ProfilePosts = ({ post, user }: ProfilePostsProps) => {
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )
  const channels = useSelector(
    (state: StoreChannels) => state?.channels.channels,
  )
  const channelsKeyValuePair = useSelector(
    (state: StoreChannels) => state?.channels?.channelsKeyValuePair,
  )

  const router = useRouter()
  const handleNavigateProfile = () => {
    nProgress.start()
    router.push(
      userData?.id === (post.user_id as unknown as string)
        ? '/profile'
        : `/profile/${post.user_id}`,
    )
  }
  const handleNavigateFeed = () => {
    nProgress.start()
    router.push(
      `/channels/${channelsKeyValuePair[
        post?.channel_id
      ]?.name.toLocaleLowerCase()}/feed/${post?.id}`,
    )
  }

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  return (
    <>
      <div
        className="w-full cursor-pointer rounded-xl bg-white dark:bg-slate-800 dark:text-gray-300"
        onClick={handleNavigateFeed}>
        <div className="py-4 pr-5">
          <div className="flex text-left font-semibold dark:text-white">
            <div className="ml-4 flex flex-col items-start align-baseline">
              <div className="flex flex-row items-center">
                <p
                  onClick={handleNavigateProfile}
                  className=" text-sm font-normal leading-none text-gray-900 dark:text-gray-300"
                  aria-label="user-name">
                  {user?.name === userData?.name ? 'You' : user?.name}
                </p>
                <ChannelPill channel_id={post.channel_id} channels={channels} />
              </div>

              <p className="text-xs font-light text-slate-500 dark:text-gray-400">
                {timeFormatInHours(post.created_at as unknown as Date)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-bold pl-[14px] pr-3 text-left max-md:pl-6 max-md:text-lg">
          {post.title}
        </div>

        <div className="flex gap-1">
          {post.image_url && (
            <div className="min-h-[70px] min-w-[80px] pl-[14px]">
              <img
                src={post?.image_url}
                alt="post-image"
                className="h-16 min-h-[64px] w-16 min-w-[64px] rounded-xl  object-cover"
              />
            </div>
          )}
          <div
            className="pl-[14px] text-left font-light"
            dangerouslySetInnerHTML={{
              __html:
                post.content.length > 150
                  ? `${post.content.slice(0, 150)}...`
                  : `${post.content}`,
            }}
          />
        </div>
        <PostReactionBar
          postId={post.id as unknown as string}
          reaction_summary={post.reaction_summary}
          total_comments={post.total_comments}
        />
      </div>
      <hr className="mx-3" />
    </>
  )
}
export default ProfilePosts
