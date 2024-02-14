import CardLoading from '@/components/Loading/cardLoading'
import ReportedCommentsFeeds from '@/components/ReportedCommentsFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

function ReportedComments({ params }: UserParamsProps) {
  return (
    <Suspense fallback={<CardLoading />}>
      <ReportedCommentsFeeds slug={params.slug} />
    </Suspense>
  )
}
export default ReportedComments
