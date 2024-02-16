import React, { Suspense } from 'react'
import CardLoading from './Loading/cardLoading'
import { RenderFeeds } from './Feeds'
import { RenderFeedWithLoadingProps } from '@/utils/interfaces/feeds'

const RenderFeedWithLoading = ({
  searchParams,
  channelSlug,
  path,
}: RenderFeedWithLoadingProps) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeeds
        searchParams={searchParams}
        channelSlug={channelSlug}
        path={path}
      />
    </Suspense>
  )
}

export default RenderFeedWithLoading
