import RenderFeedWithLoading from '@/components/RenderFeedWithLoading'

const ChannelPage = ({ params, searchParams }: any) => {
  return (
    <RenderFeedWithLoading
      searchParams={searchParams}
      channelSlug={params?.slug}
      path="/channels"
    />
  )
}

export default ChannelPage
