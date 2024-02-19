import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import RespProfile from '@/components/RespProfile'
import { Suspense } from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum · Profile',
}

const Profile = () => {
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile />
    </Suspense>
  )
}

export default Profile
