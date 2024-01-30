import CardLoading from '@/components/Loading/cardLoading'
import UserFeeds from '@/components/UserFeeds'
import { Suspense } from 'react'
interface UserFeedsProps {
  params: {
    userId: string
  }
}

function UserFeedPage({ params }: UserFeedsProps) {
  return (
    <Suspense fallback={<CardLoading />}>
      <UserFeeds params={params} />
    </Suspense>
  )
}

export default UserFeedPage
