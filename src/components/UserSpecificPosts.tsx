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
      {posts.slice(0, 2)?.map((post: PostsInterface, i: number) => (
        <Card
          key={post.id}
          post={post}
          posts={posts}
          // channels={post?.channel_id}
        />
      ))}
      <div className="flex cursor-pointer justify-center rounded-[6px] border border-[#F4F4F5] py-2 dark:border-[#202020]  dark:text-white max-md:text-sm">
        <div className="group flex justify-center">
          <span onClick={handleClick}>Show Are Posts</span>
        </div>
      </div>
    </div>
  )
}

export default UserSpecificPosts
