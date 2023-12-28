import { RenderFeeds } from '@/components/Feeds'
import CardLoading from '@/components/Loading/cardLoading'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import { Suspense } from 'react'
import RedirectLogic from './feed/RedirectLogic'

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
