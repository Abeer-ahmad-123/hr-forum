import { getChannels } from '@/services/channel/channel'
import { arrayToKeyIdNValueData } from '@/utils/channels'

const ChannelPill = async ({ channel_id }: any) => {
  const { channels }: any = await getChannels()
 
  const channelObj = arrayToKeyIdNValueData(channels)
 
  return (
    <span
      aria-label="channel-name"
      className={`border-1 border-1 mb-2 mr-2 inline-block whitespace-nowrap rounded-lg bg-indigo bg-opacity-30 px-3 py-1 text-sm font-semibold text-indigo ring-1 ring-indigo dark:bg-dark-background-secondary dark:text-white`}>
      {channelObj[channel_id]?.name}
    </span>
  )
}

export default ChannelPill
