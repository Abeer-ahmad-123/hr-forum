import RenderFeedWithLoading from '@/components/RenderFeedWithLoading'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import { shareMetaData } from '@/utils/share-metadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Feeds',
}

const FeedPage = ({ searchParams }: FeedPageProps) => {
  return <RenderFeedWithLoading searchParams={searchParams} path="/feed" />
}

export default FeedPage
