import React, { Suspense, useEffect, useRef, useState } from 'react'
import ProfilePosts from './Posts'
import Skelton from '@/components/ui/skelton'
import { UserSpecificationPostInterface } from '@/utils/interfaces/posts'
import { getUserSpecificPosts } from '@/services/posts'
import { useSelector } from 'react-redux'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useInView } from 'react-intersection-observer'
import CircularProgress from '@/components/ui/circularProgress'

const UserSpecificPosts = ({ posts: initialPosts, morePosts }: any) => {
  const [posts, setPosts] = useState([...initialPosts])
  const [page, setPage] = useState(2)
  const [ref, inView] = useInView()
  const userData = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  let morePostsExist = useRef(morePosts)
  const getPosts = async () => {
    const { data } = await getUserSpecificPosts(userData?.id, page)
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
    <div className="flex flex-col">
      {posts?.map((post: UserSpecificationPostInterface, i: number) => (
        <ProfilePosts key={i} post={post} />
      ))}
      {morePostsExist?.current && <CircularProgress incommingRef={ref} />}
    </div>
  )
}

export default UserSpecificPosts
