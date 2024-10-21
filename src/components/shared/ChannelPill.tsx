'use client'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import Link from 'next/link'
import VectorRight from '@/assets/icons/vectorRight'
import { Dispatch, SetStateAction } from 'react'
import { usePathname } from 'next/navigation'
interface ChannelObject {
  [key: string]: {
    name?: string
  }
}
type Props = {
  channel_id: string
  channels: ChannelByIdInterface[] | ChannelInterface[] | []
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const ChannelPill = ({ channel_id, channels, setOpenDialog }: Props) => {
  const channelObj: ChannelObject = arrayToKeyIdNValueData(channels)
  const lowerCaseChannelName = channelObj[channel_id]?.name?.toLowerCase()
  const pathName = usePathname()
  return (
    <span
      className="flex items-center justify-center gap-[12px] text-xs font-light
    text-slate-500 dark:text-gray-400 max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px] md:text-xs lg:text-sm xl:text-sm">
      <VectorRight className="text-black dark:text-white" />
      <Link
        className="d-flex items-center justify-center"
        // onClick={() => {
        //   setOpenDialog((prev) => !prev)
        // }}
        href={
          pathName.includes('channels')
            ? ''
            : `/channels/${lowerCaseChannelName}/`
        }>
        <span className="text-[16px] font-[550] text-color-blue hover:underline dark:text-[#0087D5] ">
          {channelObj[channel_id]?.name}
        </span>
      </Link>
    </span>
  )
}

export default ChannelPill
