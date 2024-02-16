import RenderFeedWithLoading from '@/components/RenderFeedWithLoading'
import { FeedPageProps } from '@/utils/interfaces/feeds'

const FeedPage = ({ searchParams }: FeedPageProps) => {
  return <RenderFeedWithLoading searchParams={searchParams} path="/feed" />
}

export default FeedPage
