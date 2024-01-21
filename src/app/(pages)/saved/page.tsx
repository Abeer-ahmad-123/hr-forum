import { RenderFeeds } from '@/components/Feeds'
import CardLoading from '@/components/Loading/cardLoading'
import RedirectLogic from '@/components/RedirectLogic'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const FeedPage: React.FC<{ searchParams: SearchParams }> = ({
  searchParams,
}) => {
  const redirectLogic = searchParams?.redirect
  const tokenInCookes = cookies().get('access-token')?.value
  if (!tokenInCookes) {
    redirect('/')
  }
  return redirectLogic ? (
    <RedirectLogic redirect={redirectLogic} />
  ) : (
    <Suspense fallback={<CardLoading />}>
      <RenderFeeds searchParams={searchParams} path="/saved" />
    </Suspense>
  )
}

export default FeedPage
