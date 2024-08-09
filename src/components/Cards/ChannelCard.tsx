'use client'
import { CustomLink } from '@/components/shared/customLink/CustomLink'
import { ChannelInterface, StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import ChannelCardSkelton from '../ChannelCardSkelton'

type ChannelCardProps = {
  initialChannels?: ChannelInterface[]
}
const ChannelCard = ({ initialChannels }: ChannelCardProps) => {
  const channelsInStore = useSelector(
    (state: StoreChannels) => state.channels?.channels,
  )
  // * For SSR => loading initial channels passed from Server side API fetching
  const channels = initialChannels || channelsInStore

  const token = useSelector((state: LoggedInUser) => state?.loggedInUser?.token)

  return channels && channels.length > 0 ? (
    <div
      className={`sticky top-[20px] mr-4 mt-[20px] max-h-[240px] w-[225px] overflow-auto rounded-[10px] border border-solid border-gray-300 bg-white px-[10px] pb-2 pt-3 shadow-lg dark:bg-slate-800 dark:text-white max-lg:mt-[15px] max-md:w-full`}
    >
      <h1 className="mb-[0px] mt-[10px] text-start text-[11px] font-semibold">
        Channels
      </h1>
      <ul className="ml-[2px] cursor-pointer list-none text-left">
        {channels.map((channel: ChannelInterface, index: number) => (
          <li
            className="my-[10px] flex gap-2.5 text-[12px] font-medium text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
            key={index}
          >
            <CustomLink href={`/channels/${channel.slug}`}>
              <div className="flex gap-2.5">
                <Building2 size={20} />
                <span>{channel.name}</span>
              </div>
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <ChannelCardSkelton token={token} />
  )
}
export default ChannelCard
