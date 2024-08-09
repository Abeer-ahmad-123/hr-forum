import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import RespProfile from '@/components/RespProfile'
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

const Profile = ({ params }: ProfilePageProps) => {
  const split = params?.id?.split('-') ?? []
  const userId = split[split?.length - 1]
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile userId={userId} />
    </Suspense>
  )
}

export default Profile
