import CardLoading from '@/components/Loading/CardLoading'
import UserFeeds from '@/components/UserFeeds'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Posts`,
  }
}

const UserFeedPage = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <UserFeeds slug={params.slug} />
    </Suspense>
  )
}
export default UserFeedPage
