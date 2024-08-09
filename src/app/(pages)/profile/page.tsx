import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import RespProfile from '@/components/RespProfile'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getUserDetailsFromCookie } from '@/utils/cookies'
import type { UserData } from '@/services/auth/authService'

export const metadata: Metadata = {
  title: 'HR-Forum · Profile',
}

const Profile = async () => {
  const user: UserData = await getUserDetailsFromCookie()
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile userInCookie={user || undefined} />
    </Suspense>
  )
}

export default Profile
