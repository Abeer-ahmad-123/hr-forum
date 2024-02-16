import RenderFeedWithLoading from '@/components/RenderFeedWithLoading'
import { FeedPageProps } from '@/utils/interfaces/feeds'

const FeedPage = ({ searchParams }: FeedPageProps) => {
  return <RenderFeedWithLoading searchParams={searchParams} path="/saved" />
}

export default FeedPage
