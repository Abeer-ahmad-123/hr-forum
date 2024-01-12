import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import RespProfile from '@/components/RespProfile'
import { Suspense } from 'react'

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
