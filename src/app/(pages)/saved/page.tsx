import { RenderFeeds } from '@/components/Feeds'
import CardLoading from '@/components/Loading/cardLoading'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import { Suspense } from 'react'

const FeedPage: React.FC<{ searchParams: SearchParams }> = ({
  searchParams,
}) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeeds searchParams={searchParams} path="/saved" />
    </Suspense>
  )
}

export default FeedPage
