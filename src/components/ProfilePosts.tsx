import { timeFormatInHours } from '@/utils/helper'
import { UserData } from '@/utils/interfaces/cookies'
import { PostsInterface } from '@/utils/interfaces/posts'
import { useRouter } from 'next/navigation'

interface ProfilePostsProps {
  post: PostsInterface
  userId: number
  userData: UserData
}

const ProfilePosts = ({ post, userId, userData }: ProfilePostsProps) => {
  const router = useRouter()

  const handleNavigateProfile = () => {
    router.push(
      userData?.id === (userId as unknown as number)
        ? '/profile'
        : `/profile/${userId}`,
    )
  }

  return (
    <>
      <div className="w-full cursor-pointer rounded-xl bg-white dark:bg-slate-800 dark:text-gray-300">
        <div className="py-4 pr-5">
          <div className="ml-10 flex text-left font-semibold dark:text-white">
            <div className="flex flex-col items-start align-baseline">
              <div className="flex flex-row flex-wrap items-center">
                <p
                  onClick={handleNavigateProfile}
                  className="pr-1 text-sm font-normal leading-none text-gray-900 dark:text-gray-300"
                  aria-label="user-name">
                  {userData.id && String(post?.user_id) === String(userData?.id)
                    ? 'You'
                    : post?.author_details?.name}
                </p>
                channel pill here
              </div>

              <p className="text-xs font-light text-slate-500 dark:text-gray-400">
                {timeFormatInHours(post.created_at as unknown as Date)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-bold ml-10 pr-3 text-left max-md:text-lg">
          {post.title}
        </div>

        <div className="ml-10 mt-2 flex gap-1">
          {post.image_url && (
            <div className="min-h-[70px] min-w-[80px] ">
              <img
                src={post?.image_url}
                alt="post-image"
                className="h-16 min-h-[64px] w-16 min-w-[64px] rounded-xl  object-cover"
              />
            </div>
          )}
          <div
            className="card-li text-left font-light"
            dangerouslySetInnerHTML={{
              __html: post.content?.length
                ? post?.content?.length > 200
                  ? `${post.content.slice(0, 200)}...`
                  : `${post.content}`
                : '',
            }}
          />
        </div>
      </div>
      <hr className="mx-3" />
    </>
  )
}
export default ProfilePosts
