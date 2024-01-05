import userImage from '@/assets/avatars/image-juliusomo.webp'
import { CustomLink } from '@/components/shared/customLink/CustomLink'
import { getAllPosts } from '@/services/posts'
import { StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificationPostInterface } from '@/utils/interfaces/posts'
import Image from 'next/image'
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

export const renderCardTitle = async () => {
  let initialPosts = []

  const { data } = await getAllPosts({
    loadReactions: true,
    loadUser: true,
  })
  initialPosts = data?.posts
}

const ProfilePosts = ({ post, user }: ProfilePostsProps) => {
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )
  const channelsKeyValuePair = useSelector(
    (state: StoreChannels) => state?.channels?.channelsKeyValuePair,
  )

  return (
    <CustomLink
      href={`/channels/${post?.slug}/feed/${post?.id}`}
      className="w-full">
      <div className=" w-full rounded-xl bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300">
        <div className="px-5 py-4">
          <div className="flex text-left font-semibold dark:text-white">
            <Image
              src={user?.profilePictureURL || userImage}
              alt="profile"
              className="relative h-12 w-12 transform rounded-full"
              width={80}
              height={100}
            />

            <div className="ml-4 flex flex-col">
              <div className="font-light"> {user?.name}</div>
              <div className="pr-2 text-[80%] font-normal text-gray-400">
                {user?.email}
              </div>
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
    </CustomLink>
  )
}
export default ProfilePosts
