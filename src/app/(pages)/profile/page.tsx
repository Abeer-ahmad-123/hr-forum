import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import { Suspense } from 'react'
import RespProfile from './RespProfile'

const Profile = () => {
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile />
    </Suspense>
  )
}

export default Profile
