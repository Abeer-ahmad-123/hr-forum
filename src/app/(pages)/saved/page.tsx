import RenderFeedWithLoading from '@/components/RenderFeedWithLoading'
import { FeedPageProps } from '@/utils/interfaces/feeds'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Saved',
}

const FeedPage = ({ searchParams }: FeedPageProps) => {
  return <RenderFeedWithLoading searchParams={searchParams} path="/saved" />
}

export default FeedPage
