import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import UserProfile from '@/components/UserProfile'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getUserFromCookie } from '@/utils/cookies'
import { getUserReactedPosts, getUserSpecificPosts } from '@/services/posts'
import { getUserComments } from '@/services/comments'
import { getSpecificUserDetails } from '@/services/user'

export const metadata: Metadata = {
  title: 'HR-Forum · Profile',
}
export const dynamic = 'force-dynamic'

const Profile = async ({ params }: any) => {
  // Split the slug and extract the ID
  const idFromSlug = params.slug.split('-').pop() // Extracts '115'

  const { user, token, refreshToken } = await getUserFromCookie()
  const posts = await getUserSpecificPosts(
    user?.id === idFromSlug ? user?.id : idFromSlug,
    1,
    {
      loadReactions: true,
    },
  )
  const comments = await getUserComments(
    user?.id === idFromSlug ? user?.id : idFromSlug,
    {
      loadUser: true,
    },
  )
  const { reactions } = await getUserReactedPosts(
    user?.id === idFromSlug ? user?.id : idFromSlug,
    {},
  )
  const otherUserDetail = async () => {
    const response = await getSpecificUserDetails(Number(idFromSlug))
    if (response) {
      return response?.data?.user
    }
    return null
  }

  const otherUser =
    user?.id === Number(idFromSlug) ? user : await otherUserDetail()
  // const reactedPosts = [...reactions.slice(0, 3)]
  const morePosts =
    posts.data?.pagination?.TotalPages &&
    posts?.data?.pagination?.CurrentPage !== posts?.data?.pagination?.TotalPages

  return (
    <Suspense fallback={<ProfilePageLoading accessToken={token} />}>
      <UserProfile
        userInCookie={user?.id === idFromSlug ? user : otherUser}
        accessToken={
          Number(user?.id) === Number(idFromSlug) || !idFromSlug ? token : ''
        }
        refreshToken={refreshToken}
        posts={posts?.data?.posts}
        morePosts={morePosts}
        comments={comments?.data?.comments}
        reactedPosts={reactions}
      />
    </Suspense>
  )
}

export default Profile
