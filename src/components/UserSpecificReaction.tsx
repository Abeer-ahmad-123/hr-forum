import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import ProfilePosts from './ProfilePosts'

interface ReactionPostsFeedsProps {
  id: number
  created_at: string
  user_id: number
  postId: number
  reportType: string
  details: string
  post: PostsInterface
}

const UserSpecificReaction = ({ posts }: any) => {
  const [page, setPage] = useState(2)
  const [ref, inView] = useInView()
  const [loading, setLoading] = useState<boolean>()
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  //   let morePostsExist = useRef(morePosts)

  const router = useRouter()
  const handleClick = () => {
    nProgress.start()
    router.push(`/feeds/${userData?.username}/feed/reaction`)
  }

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post: ReactionPostsFeedsProps, i: number) => (
        <ProfilePosts key={i} user={userData} post={post.post} />
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

export default UserSpecificReaction
