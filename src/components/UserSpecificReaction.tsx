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
      <div className="flex cursor-pointer justify-center rounded-[6px] border border-[#F4F4F5] py-2 dark:border-[#202020]  dark:text-white max-md:text-sm">
        <div className="group flex justify-center">
          <span onClick={handleClick}>Show All Reactions</span>
        </div>
      </div>
    </div>
  )
}

export default UserSpecificReaction
