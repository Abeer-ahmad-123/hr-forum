import { arrayToKeyIdNValueData } from '@/utils/channels'
import Link from 'next/link'
import { CustomLink } from './customLink/CustomLink'
interface ChannelObject {
  [key: string]: {
    name?: string
  }
}
const ChannelPill = ({ channel_id, channels }: any) => {
  const channelObj: ChannelObject = arrayToKeyIdNValueData(channels)
  const lowerCaseChannelName = channelObj[channel_id]?.name?.toLowerCase()

  return (
    // <span
    //   aria-label="channel-name"
    //   className={`border-1 border-1 mb-2 mr-2 inline-block whitespace-nowrap rounded-lg bg-indigo bg-opacity-30 px-3 py-1 text-sm font-semibold text-indigo ring-1 ring-indigo dark:bg-dark-background-secondary dark:text-white`}>
    //   {channelObj[channel_id]?.name}
    // </span>

    <span className="px-1 text-xs font-light text-slate-500 dark:text-gray-400 ">
      Posted in
      <CustomLink className="" href={`/channels/${lowerCaseChannelName}/`}>
        {` `}
        <span className="underline hover:text-primary">
          {channelObj[channel_id]?.name}
        </span>
      </CustomLink>
    </span>
  )
}

export default ChannelPill
