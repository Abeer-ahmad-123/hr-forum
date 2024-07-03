'use client'
import { deleteModalState } from '@/services/auth/authService'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import { useRouter } from 'next/navigation'
import { CustomLink } from './customLink/CustomLink'
interface ChannelObject {
  [key: string]: {
    name?: string
  }
}
type Props = {
  channel_id: string
  channels: ChannelByIdInterface[] | ChannelInterface[] | []
}

const ChannelPill = ({ channel_id, channels }: Props) => {
  const router = useRouter()
  const channelObj: ChannelObject = arrayToKeyIdNValueData(channels)
  const lowerCaseChannelName = channelObj[channel_id]?.name?.toLowerCase()

  const handleLinkClick = (event: any) => {
    event.preventDefault()
    event.stopPropagation() // Prevent propagation to card's onClick
    router.push(`${'/channels/' + lowerCaseChannelName}/`)
    deleteModalState()
  }
  return (
    <span
      className="text-xs font-light
    text-slate-500 dark:text-gray-400 max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px] md:text-xs lg:text-sm xl:text-sm"
    >
      Posted in
      <CustomLink className="" href={`/channels/${lowerCaseChannelName}/`}>
        {` `}
        <span
          className="font-medium  text-gray-900 hover:underline dark:text-white"
          onClick={handleLinkClick}
        >
          {channelObj[channel_id]?.name}
        </span>
      </CustomLink>
    </span>
  )
}

export default ChannelPill
