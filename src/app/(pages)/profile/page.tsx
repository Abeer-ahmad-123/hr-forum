import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import { Suspense } from 'react'
import RespProfile from './RespProfile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Profile = () => {
  const userDetailsCookies = cookies().get('user-details')

  if (!userDetailsCookies) {
    redirect('/feeds')
  }

  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile />
      {/* <ProfilePageLoading /> */}
    </Suspense>
  )
}

export default Profile
