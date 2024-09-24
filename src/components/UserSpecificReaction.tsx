import { PostsInterface } from '@/utils/interfaces/posts'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Card } from './shared'
import Link from 'next/link'

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
  // const dispatch = useDispatch()

  // const handleCommentCountReactedPosts = () => {
  //   dispatch(
  //     setCommentCountInStore(makeCommentNumberKeyValuePairFromSummary(posts)),
  //   )
  // }

  // useEffect(() => {
  //   handleCommentCountReactedPosts()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [posts])

  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post: ReactionPostsFeedsProps, i: number) => (
        <Card key={post.userId} post={post.post} posts={posts} />
      ))}
      <div className=" flex cursor-pointer justify-center py-3 dark:bg-slate-800 dark:text-gray-300 max-md:text-sm">
        <div className="group flex justify-center">
          <Link
            href={`/user-activity/${user.name
              ?.toLowerCase()
              .replace(/ /g, '-')}-${user.id}/reactions`}>
            <span>Show more posts</span>
          </Link>
          <div className="origin-center transform transition-transform group-hover:scale-x-150">
            <ArrowRight size={16} className="ml-1 inline-block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSpecificReaction
