import CardLoading from '@/components/Loading/CardLoading'
import ReportedPostsFeeds from '@/components/ReportedPostsFeeds'
import { getUserFromCookie } from '@/utils/cookies'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { ReportedParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Reported Posts`,
  }
}

const ReportedPosts = async ({ params }: ReportedParamsProps) => {
  const { user, token } = await getUserFromCookie()

  return (
    <Suspense fallback={<CardLoading />}>
      <ReportedPostsFeeds
        slug={params.slug}
        userData={user}
        accessToken={token}
      />
    </Suspense>
  )
}

export default ReportedPosts
