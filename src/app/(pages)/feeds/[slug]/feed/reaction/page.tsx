import CardLoading from '@/components/Loading/cardLoading'
import UserReactionFeeds from '@/components/UserReactionFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

const UserReaction = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <UserReactionFeeds slug={params.slug} />
    </Suspense>
  )
}
export default UserReaction
