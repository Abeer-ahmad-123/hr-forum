import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import UserProfile from '@/components/UserProfile'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getUserFromCookie } from '@/utils/cookies'

export const metadata: Metadata = {
  title: 'HR-Forum · Profile',
}

const Profile = async () => {
  const { user, token, refreshToken } = await getUserFromCookie()

  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <UserProfile
        userInCookie={user || undefined}
        accessToken={token}
        refreshToken={refreshToken}
      />
    </Suspense>
  )
}

export default Profile
