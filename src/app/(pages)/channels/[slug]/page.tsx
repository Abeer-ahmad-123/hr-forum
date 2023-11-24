// @ts-nocheck
import { RenderFeed } from '@/components/Feed/RenderFeed'

const ChannelPage = ({ params }) => {
  return <RenderFeed channelName={params?.slug} />
}

export default ChannelPage
