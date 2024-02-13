import CardLoading from '@/components/Loading/cardLoading'
import UserReactionFeeds from '@/components/UserReactionFeeds'
import { UserParamsProps } from '@/utils/interfaces/userData'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const UserReaction = ({ params }: UserParamsProps) => {
  const userDetailsCookies = cookies().get('user-details')
  if (!userDetailsCookies) {
    redirect('/feeds')
  } else {
    return (
      <Suspense fallback={<CardLoading />}>
        <UserReactionFeeds slug={params.slug} />
      </Suspense>
    )
  }
}
export default UserReaction
