import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import RespProfile from '@/components/RespProfile'
import { Suspense } from 'react'

import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'HR-Forum · Profile',
}

const Profile = () => {
  const user = cookies().get('user-details')?.value ?? null
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile userInCookie={user ?? undefined} />
    </Suspense>
  )
}

export default Profile
