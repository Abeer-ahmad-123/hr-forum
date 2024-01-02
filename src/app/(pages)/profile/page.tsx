import ProfilePageLoading from '@/components/Loading/ProfilePageLoading'
import { Suspense } from 'react'
import RespProfile from './RespProfile'

interface profileProps {
  searchParams: {
    userId?: string
  }
}

const Profile = ({ searchParams }: profileProps) => {
  const userId = searchParams?.userId
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <RespProfile userId={userId} />
    </Suspense>
  )
}

export default Profile
