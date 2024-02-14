import CardLoading from '@/components/Loading/cardLoading'
import UserFeeds from '@/components/UserFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

const UserFeedPage = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <UserFeeds slug={params.slug} />
    </Suspense>
  )
}
export default UserFeedPage
