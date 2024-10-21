'use client'
import { PostsInterface } from '@/utils/interfaces/posts'
import { Card } from './shared'
import { usePathname } from 'next/navigation'
import { userData } from '@/utils/interfaces/userData'
import Link from 'next/link'

interface ReactionPostsFeedsProps {
  id: number
  created_at: string
  userId: number
  postId: number
  reportType: string
  details: string
  post: PostsInterface
  user: userData | Number
}

const UserSpecificReaction = ({
  posts,
  user,
  getUserSpecificDetailFunc,
}: any) => {
  const pathName = usePathname()

  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post: ReactionPostsFeedsProps, i: number) => (
        <Card
          key={post.userId}
          post={post.post}
          posts={posts}
          getUserSpecificDetailFunc={getUserSpecificDetailFunc}
          user={user}
        />
      ))}

      {pathName.includes('/user-activities') ? (
        ''
      ) : (
        <div className="flex cursor-pointer justify-center rounded-md border border-[#F4F4F5] py-3 text-sm dark:border-[#202020]  dark:text-white ">
          <div className="group flex justify-center">
            <Link
              href={`/user-activities/${user?.name
                ?.toLowerCase()
                .replace(/ /g, '-')}-${user?.id}`}>
              Show All Reactions
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserSpecificReaction
