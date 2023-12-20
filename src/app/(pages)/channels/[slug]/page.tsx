import RenderFeed from '@/components/Feeds/RenderFeeds'

const ChannelPage = ({ params }: any) => {
  return <RenderFeed channelSlug={params?.slug} />
}

export default ChannelPage
