import { PostsInterface } from '@/utils/interfaces/posts'
import { ArrowRight } from 'lucide-react'
import { Card } from './shared'
import Link from 'next/link'

const UserSpecificPosts = ({
  posts: initialPosts,
  user,
  getUserSpecificDetailFunc,
}: any) => {
  return (
    <div className="flex flex-col gap-2">
      {initialPosts.slice(0, 2)?.map((post: PostsInterface, i: number) => (
        <Card
          key={post.id}
          post={post}
          posts={initialPosts}
          getUserSpecificDetailFunc={getUserSpecificDetailFunc}
          // channels={post?.channel_id}
        />
      ))}
      <div className="flex cursor-pointer justify-center py-3 dark:bg-bg-tertiary-dark dark:text-gray-300 max-md:text-sm">
        <div className="group flex justify-center">
          <Link
            href={`/user-activity/${user.name
              ?.toLowerCase()
              .replace(/ /g, '-')}-${user.id}/posts`}>
            Show more posts
          </Link>
          <div className="origin-center transform transition-transform group-hover:scale-x-150">
            <ArrowRight size={16} className="ml-1 inline-block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSpecificPosts
