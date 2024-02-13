import CardLoading from '@/components/Loading/cardLoading'
import ReportedPostsFeeds from '@/components/ReportedPostsFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

function ReportedPosts() {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<CardLoading />}>
        <ReportedPostsFeeds />
      </Suspense>
    )
  }
}

export default ReportedPosts
