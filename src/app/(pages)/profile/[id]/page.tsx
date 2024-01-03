import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import { Suspense } from 'react'
import RespProfile from '../RespProfile'

interface profileProps {
  params: {
    id?: string
  }
}

const Profile = ({ params }: profileProps) => {
  const userId = params?.id
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile userId={userId} />
    </Suspense>
  )
}

export default Profile
