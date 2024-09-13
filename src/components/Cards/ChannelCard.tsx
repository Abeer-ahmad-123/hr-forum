import { CustomLink } from '@/components/shared/customLink/CustomLink'
import { ChannelInterface } from '@/utils/interfaces/channels'
import ChannelCardSkelton from '../ChannelCardSkelton'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'
import { headers } from 'next/headers'

type ChannelCardProps = {
  initialChannels?: ChannelInterface[]
}
const ChannelCard = ({ initialChannels }: ChannelCardProps) => {
  const channels = initialChannels
  const path = headers().get('x-pathname')

  return channels && channels.length > 0 ? (
    <div className="w-64 bg-white dark:bg-slate-800 dark:text-gray-400">
      <div className="mb-3 text-lg font-[800] text-bg-black dark:bg-slate-800 dark:text-white">
        Explore variety of channels
      </div>
      <ul className="dark:bg-slate-800 dark:text-gray-400">
        {channels.map((channel: ChannelInterface, index: number) => (
          <li className="text-base" key={index}>
            <CustomLink href={`/channels/${channel.slug}`}>
              <div
                className={`flex gap-3 py-[10px] hover:bg-bg-tertiary ${
                  path == `/channels/${channel.slug}`
                    ? 'bg-bg-tertiary font-[800]'
                    : ''
                } rounded-md hover:font-[800]`}>
                {channel.slug == 'hr-general' ? <HrGeneral /> : <SmileIcon />}
                <span>{channel.name}</span>
              </div>
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <ChannelCardSkelton />
  )
}
export default ChannelCard
