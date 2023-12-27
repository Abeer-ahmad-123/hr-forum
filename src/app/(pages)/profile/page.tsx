import { Suspense } from 'react'
import RespProfile from './RespProfile'
import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'

const Profile = () => {
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile />
    </Suspense>
  )
}

export default Profile
