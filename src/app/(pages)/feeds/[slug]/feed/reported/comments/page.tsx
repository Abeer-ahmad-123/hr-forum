import CardLoading from '@/components/Loading/cardLoading'
import ReportedCommentsFeeds from '@/components/ReportedCommentsFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

function ReportedComments({ params }: UserParamsProps) {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<CardLoading />}>
        <ReportedCommentsFeeds slug={params.slug} />
      </Suspense>
    )
  }
}
export default ReportedComments
