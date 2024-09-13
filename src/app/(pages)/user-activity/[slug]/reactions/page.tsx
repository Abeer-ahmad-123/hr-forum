import CardLoading from '@/components/Loading/CardLoading'
import UserReactionFeeds from '@/components/UserReactionFeeds'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Reactions`,
  }
}

const UserReaction = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <UserReactionFeeds slug={params.slug} />
    </Suspense>
  )
}
export default UserReaction
