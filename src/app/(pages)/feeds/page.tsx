import { RenderFeeds } from '@/components/Feeds'
import RenderFeedLoading from '@/components/Loading/renderFeedLoading'
import { Suspense } from 'react'
import PostBar from '@/components/shared/new-post/NewPostModal'

import CardLoading from '@/components/Loading/cardLoading'



const FeedPage = () => {
  return (
    <>
      <div>
        <Suspense fallback={<CardLoading />}>

          <RenderFeeds />
        </Suspense>
      </div>
      
    </>
  )
}

export default FeedPage
