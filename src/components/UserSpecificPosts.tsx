'use client'
import { PostsInterface } from '@/utils/interfaces/posts'
import { ArrowRight } from 'lucide-react'
import { Card } from './shared'
import Link from 'next/link'

const UserSpecificPosts = ({
  posts: initialPosts,
  user,
  getUserSpecificDetailFunc,
  morePosts,
}: any) => {
  return (
    <div className="flex flex-col gap-2">
      {initialPosts.slice(0, 2)?.map((post: PostsInterface, i: number) => (
        <Card
          key={post?.id}
          post={post}
          posts={initialPosts}
          getUserSpecificDetailFunc={getUserSpecificDetailFunc}
          // channels={post?.channel_id}
        />
      ))}
      <div className="flex cursor-pointer justify-center rounded-md border border-[#F4F4F5] py-3 text-sm dark:border-[#202020]  dark:text-white ">
        <div className="group flex justify-center">
          <Link
            href={`/user-activity/${user?.name
              ?.toLowerCase()
              .replace(/ /g, '-')}-${user?.id}/posts`}>
            Show All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserSpecificPosts
