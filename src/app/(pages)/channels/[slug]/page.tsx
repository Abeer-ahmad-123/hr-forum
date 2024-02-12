import RenderFeeds from '@/components/Feeds/RenderFeeds'
import CardLoading from '@/components/Loading/cardLoading'
import { Suspense } from 'react'

const ChannelPage = ({ params, searchParams }: any) => {
  return (
    <Suspense fallback={<CardLoading />}>
      <RenderFeeds
        searchParams={searchParams}
        channelSlug={params?.slug}
        path="/channels"
      />
    </Suspense>
  )
}

export default ChannelPage
