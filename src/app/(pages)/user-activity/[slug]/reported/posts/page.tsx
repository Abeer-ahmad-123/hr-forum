import CardLoading from '@/components/Loading/cardLoading'
import ReportedPostsFeeds from '@/components/ReportedPostsFeeds'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Reported Posts`,
  }
}

const ReportedPosts = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <ReportedPostsFeeds slug={params.slug} />
    </Suspense>
  )
}

export default ReportedPosts
