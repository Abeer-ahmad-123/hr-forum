import CardLoading from '@/components/Loading/CardLoading'
import ReportedCommentsFeeds from '@/components/ReportedCommentsFeeds'
import { capitalizeWord, filterIdFromName } from '@/utils/helper'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { Suspense } from 'react'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum • User Activity • ${capitalizeWord(
      filterIdFromName(params?.slug),
    )} • Reported Comments`,
  }
}

const ReportedComments = ({ params }: UserParamsProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <ReportedCommentsFeeds slug={params.slug} />
    </Suspense>
  )
}
export default ReportedComments
