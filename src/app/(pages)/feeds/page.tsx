import RenderFeedWithLoading from '@/components/RenderFeedWithLoading'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Feeds',
}

const FeedPage = ({ searchParams }: FeedPageProps) => {
  // @ts-ignore
  return <RenderFeedWithLoading searchParams={searchParams} path="/feed" />
}

export default FeedPage
