import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import UserProfile from '@/components/UserProfile'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getUserFromCookie } from '@/utils/cookies'
import { getUserReactedPosts, getUserSpecificPosts } from '@/services/posts'
import { getUserComments } from '@/services/comments'
import { ProfilePageProps } from '@/utils/interfaces/profile'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'HR-Forum · Profile',
}

const Profile = async ({ params }: ProfilePageProps) => {
  const { user, token, refreshToken } = await getUserFromCookie()
  const posts = await getUserSpecificPosts(user?.id, 1, {
    loadReactions: true,
  })
  const comments = await getUserComments(user?.id, {
    loadUser: true,
  })
  const { reactions } = await getUserReactedPosts(user.id, {})

  const reactedPosts = [...reactions.slice(0, 3)]
  const morePosts =
    posts.data?.pagination?.TotalPages &&
    posts?.data?.pagination?.CurrentPage !== posts?.data?.pagination?.TotalPages
  return (
    <>
      <Suspense fallback={<ProfilePageLoading accessToken={token} />}>
        <UserProfile
          userFlag={user && token ? true : false}
          userInCookie={user}
          accessToken={token}
          refreshToken={refreshToken}
          posts={posts?.data?.posts}
          morePosts={morePosts}
          comments={comments?.data?.comments}
          reactedPosts={reactedPosts}
          token={token}
        />
      </Suspense>
    </>
  )
}

export default Profile
