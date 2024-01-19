'use client'
import { arrayToKeyIdNValueData } from '@/utils/channels'
import { useRouter } from 'next/navigation'
import { CustomLink } from './customLink/CustomLink'
import nProgress from 'nprogress'
import { useEffect } from 'react'
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
    text-slate-500 dark:text-gray-400 max-[380px]:text-[9px] md:text-xs lg:text-sm xl:text-sm ">
      Posted in
      <CustomLink className="" href={`/channels/${lowerCaseChannelName}/`}>
        {` `}
        <span className="underline hover:text-accent" onClick={handleLinkClick}>
          {channelObj[channel_id]?.name}
        </span>
      </CustomLink>
    </span>
  )
}

export default ChannelPill
