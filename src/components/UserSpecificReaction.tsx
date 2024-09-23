import { PostsInterface } from '@/utils/interfaces/posts'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCommentCountInStore } from '@/store/Slices/postSlice'
import { makeCommentNumberKeyValuePairFromSummary } from '@/utils/helper'
import { Card } from './shared'

interface ReactionPostsFeedsProps {
  id: number
  created_at: string
  userId: number
  postId: number
  reportType: string
  details: string
  post: PostsInterface
}

const UserSpecificReaction = ({ posts, user }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    router.push(
      `/user-activity/${user.name?.toLowerCase().replace(/ /g, '-')}-${
        user.id
      }/reactions`,
    )
  }

  const handleCommentCountReactedPosts = () => {
    dispatch(
      setCommentCountInStore(makeCommentNumberKeyValuePairFromSummary(posts)),
    )
  }

  useEffect(() => {
    handleCommentCountReactedPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])

  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post: ReactionPostsFeedsProps, i: number) => (
        <Card key={post.userId} post={post.post} posts={posts} />
      ))}
      <div className=" flex cursor-pointer justify-center py-3 dark:bg-bg-tertiary-dark dark:text-gray-300 max-md:text-sm">
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

export default UserSpecificReaction
