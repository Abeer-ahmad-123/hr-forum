import { RenderFeeds } from '@/components/Feeds'
import CardLoading from '@/components/Loading/cardLoading'
import RedirectLogic from '@/components/RedirectLogic'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import { Suspense } from 'react'

const FeedPage: React.FC<{ searchParams: SearchParams }> = ({
  searchParams,
}) => {
  const redirect = searchParams?.redirect

  return !!redirect ? (
    <RedirectLogic redirect={redirect} />
  ) : (
    <div>
      <Suspense fallback={<CardLoading />}>
        <RenderFeeds searchParams={searchParams} path="/feed" />
      </Suspense>
    </div>
  )
}

export default FeedPage
