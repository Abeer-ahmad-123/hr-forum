import CardLoading from '@/components/Loading/CardLoading'
import UserCommentsFeeds from '@/components/UserCommentsFeeds'
import { getUserFromCookie } from '@/utils/cookies'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { ReportedParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Comments`,
  }
}

const UserComments = async ({ params }: ReportedParamsProps) => {
  const { user, token } = await getUserFromCookie()
  return (
    <Suspense fallback={<CardLoading user={user} />}>
      <UserCommentsFeeds
        slug={params.slug}
        userData={user}
        accessToken={token}
      />
    </Suspense>
  )
}
export default UserComments
