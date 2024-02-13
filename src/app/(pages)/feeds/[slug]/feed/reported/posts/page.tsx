import CardLoading from '@/components/Loading/cardLoading'
import ReportedPostsFeeds from '@/components/ReportedPostsFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

function ReportedPosts({ params }: UserParamsProps) {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<CardLoading />}>
        <ReportedPostsFeeds slug={params.slug} />
      </Suspense>
    )
  }
}

export default ReportedPosts
