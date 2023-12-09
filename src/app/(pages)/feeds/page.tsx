import { RenderFeeds } from '@/components/Feeds'
import RenderFeedLoading from '@/components/Loading/renderFeedLoading'
import { Suspense } from 'react'
import PostBar from '@/components/shared/new-post/NewPostModal'

const FeedPage = () => {
  return (
    <>
      <div className="mx-auto my-5 max-w-5xl rounded-full ">
        <PostBar />
      </div>
      <Suspense fallback={<RenderFeedLoading />}>
        <RenderFeeds />
      </Suspense>
    </>
  )
}

export default FeedPage
