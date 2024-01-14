import CircularProgress from '@/components/ui/circularProgress'
import { getUserSpecificPosts } from '@/services/posts'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { UserSpecificationPostInterface } from '@/utils/interfaces/posts'
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

  const getPosts = async () => {
    const { data } = await getUserSpecificPosts(
      user ? user.id : userData?.id,
      page,
    )

    setPage(page + 1)
    morePostsExist.current =
      data?.pagination?.CurrentPage &&
      data?.pagination?.CurrentPage !== data?.pagination?.TotalPages

    setPosts([...posts, ...data?.posts])
  }

  useEffect(() => {
    if (inView) {
      getPosts()
    }
  }, [inView])

  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post: UserSpecificationPostInterface, i: number) => (
        <ProfilePosts user={user} post={post} />
      ))}
      {!!morePostsExist?.current && <CircularProgress incommingRef={ref} />}
    </div>
  )
}

export default UserSpecificPosts
