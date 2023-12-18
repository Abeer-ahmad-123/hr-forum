import { arrayToKeyIdNValueData } from '@/utils/channels'

const ChannelPill = ({ channel_id, channels }: any) => {
  const channelObj = arrayToKeyIdNValueData(channels)

  return (
    // <span
    //   aria-label="channel-name"
    //   className={`border-1 border-1 mb-2 mr-2 inline-block whitespace-nowrap rounded-lg bg-indigo bg-opacity-30 px-3 py-1 text-sm font-semibold text-indigo ring-1 ring-indigo dark:bg-dark-background-secondary dark:text-white`}>
    //   {channelObj[channel_id]?.name}
    // </span>

    <span className='text-slate-500 font-light text-xs dark:text-gray-400 px-1'>Posted in {channelObj[channel_id]?.name}</span>
  )
}

export default ChannelPill
