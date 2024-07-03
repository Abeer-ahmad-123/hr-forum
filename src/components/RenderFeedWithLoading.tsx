import { RenderFeedWithLoadingProps } from '@/utils/interfaces/feeds'
import { Suspense } from 'react'
import { RenderFeeds } from './Feeds'
import CardLoading from './Loading/cardLoading'

const RenderFeedWithLoading = ({
  searchParams,
  channelSlug,
  path,
}: RenderFeedWithLoadingProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      {/* @ts-ignore */}
      <RenderFeeds
        searchParams={searchParams}
        channelSlug={channelSlug}
        path={path}
      />
    </Suspense>
  )
}

export default RenderFeedWithLoading
