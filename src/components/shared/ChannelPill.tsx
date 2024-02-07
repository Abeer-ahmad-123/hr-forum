'use client'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import { useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { CustomLink } from './customLink/CustomLink'
interface ChannelObject {
  [key: string]: {
    name?: string
  }
}
const ChannelPill = ({ channel_id, channels }: any) => {
  const router = useRouter()
  const channelObj: ChannelObject = arrayToKeyIdNValueData(channels)
  const lowerCaseChannelName = channelObj[channel_id]?.name?.toLowerCase()

  const handleLinkClick = (event: any) => {
    nProgress.start()
    event.preventDefault()
    event.stopPropagation() // Prevent propagation to card's onClick
    router.push(`${'/channels/' + lowerCaseChannelName}/`)
  }
  useEffect(() => {
    return () => {
      nProgress.done()
    }
  }, [])
  return (
    <span
      className="px-1 text-xs 
    font-light
    text-slate-500 dark:text-gray-400 max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px] md:text-xs lg:text-sm xl:text-sm">
      Posted in
      <CustomLink className="" href={`/channels/${lowerCaseChannelName}/`}>
        {` `}
        <span
          className="font-medium  text-gray-900 hover:underline dark:text-white"
          onClick={handleLinkClick}>
          {channelObj[channel_id]?.name}
        </span>
      </CustomLink>
    </span>
  )
}

export default ChannelPill
