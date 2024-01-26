import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import RespProfile from '@/components/RespProfile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const Profile = () => {
  const userDetailsCookies = cookies().get('user-details')

  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<ProfilePageLoading />}>
        <RespProfile />
        {/* <ProfilePageLoading /> */}
      </Suspense>
    )
  }
}

export default Profile
