import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import RespProfile from '@/components/RespProfile'
import { Suspense } from 'react'

const Profile = () => {
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile />
    </Suspense>
  )
}

export default Profile
