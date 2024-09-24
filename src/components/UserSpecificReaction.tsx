import { PostsInterface } from '@/utils/interfaces/posts'
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
      <div className="flex cursor-pointer justify-center rounded-[6px] border border-[#F4F4F5] py-2 dark:border-[#202020]  dark:text-white max-md:text-sm">
        <div className="group flex justify-center">
          <Link
            href={`/user-activity/${user.name
              ?.toLowerCase()
              .replace(/ /g, '-')}-${user.id}/reactions`}>
            <span>Show All Reactions</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserSpecificReaction
