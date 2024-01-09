import { arrayToKeyIdNValueData } from '@/utils/channels'
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
    <span className="px-1 text-xs font-light text-slate-500 dark:text-gray-400 ">
      Posted in
      <CustomLink className="" href={`/channels/${lowerCaseChannelName}/`}>
        {` `}
        <span className="underline hover:text-accent">
          {channelObj[channel_id]?.name}
        </span>
      </CustomLink>
    </span>
  )
}

export default ChannelPill
