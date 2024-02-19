import CardLoading from '@/components/Loading/cardLoading'
import UserCommentsFeeds from '@/components/UserCommentsFeeds'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Comments`,
  }
}

const UserComments = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <UserCommentsFeeds slug={params.slug} />
    </Suspense>
  )
}
export default UserComments
