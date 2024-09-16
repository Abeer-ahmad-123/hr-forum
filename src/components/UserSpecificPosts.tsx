import { PostsInterface } from '@/utils/interfaces/posts'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from './shared'

const UserSpecificPosts = ({ posts: initialPosts, user }: any) => {
  const [posts, setPosts] = useState([...initialPosts])
  const router = useRouter()

  const handleClick = () => {
    router.push(
      `/user-activity/${user.name?.toLowerCase().replace(/ /g, '-')}-${
        user.id
      }/posts`,
    )
  }

  useEffect(() => {
    setPosts([...initialPosts])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosts])

  return (
    <div className="flex flex-col gap-2">
      {posts.slice(0, 3)?.map((post: PostsInterface, i: number) => (
        <Card key={post.id} post={post} posts={posts} />
      ))}
      <div className=" flex cursor-pointer justify-center py-3 dark:bg-slate-800 dark:text-gray-300 max-md:text-sm">
        <div className="group flex justify-center">
          <span onClick={handleClick}>Show more posts</span>
          <div className="origin-center transform transition-transform group-hover:scale-x-150">
            <ArrowRight size={16} className="ml-1 inline-block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSpecificPosts
