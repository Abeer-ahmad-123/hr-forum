import CardLoading from '@/components/Loading/cardLoading'
import UserCommentsFeeds from '@/components/UserCommentsFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

const UserComments = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <UserCommentsFeeds slug={params.slug} />
    </Suspense>
  )
}
export default UserComments
