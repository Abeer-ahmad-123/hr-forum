import CardLoading from '@/components/Loading/cardLoading'
import ReportedPostsFeeds from '@/components/ReportedPostsFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

function ReportedPosts({ params }: UserParamsProps) {
  return (
    <Suspense fallback={<CardLoading />}>
      <ReportedPostsFeeds slug={params.slug} />
    </Suspense>
  )
}

export default ReportedPosts
