import { getUserSpecificPosts } from '@/services/posts'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'
import ProfilePosts from './ProfilePosts'

const UserSpecificPosts = ({ posts: initialPosts, morePosts, user }: any) => {
  const [posts, setPosts] = useState([...initialPosts])
  const [page, setPage] = useState(2)
  const [ref, inView] = useInView()
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  let morePostsExist = useRef(morePosts)

  const router = useRouter()

  const getPosts = async () => {
    const { data } = await getUserSpecificPosts(
      user ? user.id : userData?.id,
      page,
      {
        loadReactions: true,
      },
    )

    setPage(page + 1)
    morePostsExist.current =
      data?.pagination?.CurrentPage &&
      data?.pagination?.CurrentPage !== data?.pagination?.TotalPages

    setPosts([...posts, ...data?.posts])
  }

  const handleClick = () => {
    nProgress.start()
    router.push(`/feeds/${userData?.username}/feed`)
  }

  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {posts.slice(0, 3)?.map((post: PostsInterface, i: number) => (
        <ProfilePosts key={i} userId={user} post={post} />
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
