import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import UserProfile from '@/components/UserProfile'
import { getUserFromCookie } from '@/utils/cookies'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { ProfilePageProps } from '@/utils/interfaces/profile'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • Profile • ${capitalizeWord(
      filterIdFromName(params?.id),
    )}`,
  }
}

const Profile = async ({ params }: ProfilePageProps) => {
  const split = params?.id?.split('-') ?? []
  const userId = split[split?.length - 1]

  const { user, token, refreshToken } = await getUserFromCookie()
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <UserProfile
        userId={userId}
        userInCookie={user}
        accessToken={token}
        refreshToken={refreshToken}
      />
    </Suspense>
  )
}

export default Profile
