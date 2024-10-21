'use client'
import { PostsInterface } from '@/utils/interfaces/posts'
import { usePathname } from 'next/navigation'
import { Card } from './shared'
import Link from 'next/link'

const UserSpecificPosts = ({
  posts: initialPosts,
  user,
  getUserSpecificDetailFunc,
}: any) => {
  const pathName = usePathname()
  return (
    <div className="flex flex-col gap-2">
      {pathName.includes('/user-activities') ? (
        <>
          {initialPosts.map((post: PostsInterface, i: number) => (
            <Card
              key={post?.id}
              post={post}
              posts={initialPosts}
              getUserSpecificDetailFunc={getUserSpecificDetailFunc}
              user={user}
            />
          ))}
        </>
      ) : (
        initialPosts
          .slice(0, 2)
          ?.map((post: PostsInterface, i: number) => (
            <Card
              key={post?.id}
              post={post}
              posts={initialPosts}
              getUserSpecificDetailFunc={getUserSpecificDetailFunc}
              user={user}
            />
          ))
      )}

      {pathName.includes('/user-activities') ? (
        ''
      ) : (
        <div className="flex cursor-pointer justify-center rounded-md border border-[#F4F4F5] py-3 text-sm dark:border-[#202020]  dark:text-white ">
          <div className="group flex justify-center">
            <Link
              href={`/user-activities/${user?.name
                ?.toLowerCase()
                .replace(/ /g, '-')}-${user?.id}`}>
              Show All Posts
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserSpecificPosts
