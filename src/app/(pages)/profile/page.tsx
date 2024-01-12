import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import RespProfile from '@/components/RespProfile'

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
