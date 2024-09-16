'use client'
import { CustomLink } from '@/components/shared/customLink/CustomLink'
import { ChannelInterface, StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useSelector } from 'react-redux'
import ChannelCardSkelton from '../ChannelCardSkelton'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'
import { usePathname } from 'next/navigation'

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
  const path = usePathname()

  return channels && channels.length > 0 ? (
    <div
      className="w-64 bg-white dark:bg-bg-primary-dark dark:text-gray-400"
    >
      <div className="font-[800] text-lg text-bg-black mb-3 dark:bg-bg-primary-dark dark:text-bg-tertiary">
      Explore variety of channels
      </div>
      <ul className="dark:bg-bg-primary-dark dark:text-bg-tertiary">
        {channels.map((channel: ChannelInterface, index: number) => (
          <li
            className="text-base	"
            key={index}
          >
            <CustomLink href={`/channels/${channel.slug}`}>
              <div className={`flex gap-3 my-[5px] py-2 hover:bg-bg-tertiary dark:hover:bg-bg-tertiary-dark dark:text-bg-tertiary ${path == `/channels/${channel.slug}` ? 'bg-bg-tertiary dark:bg-bg-tertiary-dark dark:text-bg-tertiary font-[800]': ''} hover:font-[800] rounded-md`}>
               {channel.slug == "hr-general" ?  <HrGeneral /> : <SmileIcon />}
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
