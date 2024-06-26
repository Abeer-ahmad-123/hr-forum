import RenderFeedWithLoading from '@/components/RenderFeedWithLoading'
import { capitalizeWord } from '@/utils/helper'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum - ${capitalizeWord(params.slug)}`,
  }
}

const ChannelPage = ({ params, searchParams }: any) => {
  return (
    // @ts-ignore
    <RenderFeedWithLoading
      searchParams={searchParams}
      channelSlug={params?.slug}
      path="/channels"
    />
  )
}

export default ChannelPage
