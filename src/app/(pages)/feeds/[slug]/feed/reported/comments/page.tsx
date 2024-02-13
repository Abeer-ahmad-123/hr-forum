import CardLoading from '@/components/Loading/cardLoading'
import ReportedCommentsFeeds from '@/components/ReportedCommentsFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

function ReportedComments() {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<CardLoading />}>
        <ReportedCommentsFeeds />
      </Suspense>
    )
  }
}
export default ReportedComments
