import CardLoading from '@/components/Loading/cardLoading'
import UserFeeds from '@/components/UserFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const UserFeedPage = ({ params }: UserParamsProps) => {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<CardLoading />}>
        <UserFeeds slug={params.slug} />
      </Suspense>
    )
  }
}
export default UserFeedPage
