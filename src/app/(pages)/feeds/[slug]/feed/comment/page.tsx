import CardLoading from '@/components/Loading/cardLoading'
import UserCommentsFeeds from '@/components/UserCommentsFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const UserComments = ({ params }: UserParamsProps) => {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<CardLoading />}>
        <UserCommentsFeeds slug={params.slug} />
      </Suspense>
    )
  }
}
export default UserComments
