'use client'
import { CustomLink } from '@/components/shared/customLink/CustomLink'
import { ChannelInterface, StoreChannels } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useSelector } from 'react-redux'
import ChannelCardSkelton from '../ChannelCardSkelton'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'

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
  console.log(channels)

  return channels && channels.length > 0 ? (
    <div
      className={`w-64 bg-white`}
    >
      <div className="font-[800] text-lg text-bg-black mb-3">
      Explore variety of channels
      </div>
      <ul className="">
        {channels.map((channel: ChannelInterface, index: number) => (
          <li
            className="text-base	"
            key={index}
          >
            <CustomLink href={`/channels/${channel.slug}`}>
              <div className="flex gap-3 my-[10px]">
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
