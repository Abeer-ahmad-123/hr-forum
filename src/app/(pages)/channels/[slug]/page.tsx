import RenderFeeds from '@/components/Feeds/RenderFeeds'

const ChannelPage = ({ params, searchParams }: any) => {
  return (
    <RenderFeeds
      searchParams={searchParams}
      channelSlug={params?.slug}
      path="/channels"
    />
  )
}

export default ChannelPage
