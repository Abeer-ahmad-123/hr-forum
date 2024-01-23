import { ChannelPill } from '@/components/shared'
import { noProfilePicture } from '@/utils/ImagesLink'

import { timeFormatInHours } from '@/utils/helper'
import { StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificationPostInterface } from '@/utils/interfaces/posts'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
    router.push(`/channels/${post?.slug}/feed/${post?.id}}`)
  }

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])
  return (
    <div
      className=" w-full rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300"
      onClick={handleNavigateFeed}>
      <div className="px-5 py-4">
        <div className="flex text-left font-semibold dark:text-white">
          <img
            src={user?.profilePictureURL || noProfilePicture}
            alt="profile"
            className="relative h-12 w-12 transform rounded-full"
          />

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

      <div className="text-bold pl-[85px] pr-3 text-left max-md:pl-6 max-md:text-lg">
        {post.title}
      </div>
      <div className="mb-1 mt-1 pb-4 text-left">
        <div className="mb-[2%]">
          <span className="pl-[85px] pr-3 text-gray-400  max-md:pl-6 max-md:text-sm ">
            <span className="text-green-600"> #</span>
            {channelsKeyValuePair[post?.channel_id]?.name}
          </span>
        </div>
      </div>
    </div>
  )
}
export default ProfilePosts
