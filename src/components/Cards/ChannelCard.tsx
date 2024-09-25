import { CustomLink } from '@/components/shared/customLink/CustomLink'
import { ChannelInterface } from '@/utils/interfaces/channels'
import ChannelCardSkelton from '../ChannelCardSkelton'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'
import { usePathname } from 'next/navigation'
import useChannels from '@/hooks/channels'

const ChannelCard = () => {
  const path = usePathname()
  const channels = useChannels()

  return channels && channels.length > 0 ? (
    <div className="w-64 bg-white dark:bg-bg-primary-dark dark:text-gray-400">
      <div className="mb-3 text-lg font-[800] text-bg-black dark:bg-bg-primary-dark dark:text-bg-tertiary">
        Explore variety of channels
      </div>
      <ul className="dark:bg-bg-primary-dark dark:text-bg-tertiary">
        {channels.map((channel: ChannelInterface, index: number) => (
          <li className="text-base" key={index}>
            <CustomLink href={`/channels/${channel.slug}`}>
              <div
                className={`my-[5px] flex gap-3 py-2 hover:bg-bg-tertiary dark:text-bg-tertiary dark:hover:bg-bg-tertiary-dark ${
                  path == `/channels/${channel.slug}`
                    ? 'bg-bg-tertiary font-[800] dark:bg-bg-tertiary-dark dark:text-bg-tertiary'
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
