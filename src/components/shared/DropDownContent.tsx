'use client'
import { navigation } from '@/utils/data'
import { StoreChannels } from '@/utils/interfaces/channels'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { CustomLink } from './customLink/CustomLink'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'

type NavigationItem = {
  name: string
  href: string
  icon: any
}

const DropDownContent = ({
  handleLi,
}: {
  handleLi: () => void
}): JSX.Element => {
  const pathname = usePathname()
  const channels = useSelector(
    (state: StoreChannels) => state?.channels?.channels,
  )
  const commonPrimaryText: string = 'text-bold bg-bg-tertiary'
  const commonDarkModeText: string = 'dark:text-gray-200'

  const textStyle = (key: string): string => {
    return checkEqual(key)
      ? commonPrimaryText
      : `text-gray-600 ${commonDarkModeText}`
  }

  const iconStyle = (key: string): string => {
    return checkEqual(key)
      ? commonPrimaryText
      : `text-gray-400  ${commonDarkModeText}`
  }

  const channelNameStyle = (key: string): string => {
    return checkEqual(key)
      ? `${commonPrimaryText} dark:${commonPrimaryText}`
      : `text-gray-500 ${commonDarkModeText}`
  }

  const sidebarLinkStyle = (key: string): string => {
    return checkEqual(key)
      ? commonPrimaryText
      : `text-gray-800 hover:bg-gray-100 ${commonDarkModeText} dark:hover:bg-gray-700`
  }

  const checkEqual = (key: string): boolean => {
    return pathname === key
  }

  const token = useSelector((state: LoggedInUser) => state.loggedInUser.token)

  return (
    <ul className={`mx-5 rounded-2xl border bg-white pt-3 dark:bg-black`}>
      <div className="lg:h-3"></div>

      {navigation.map((item: NavigationItem, index: number) => {
        if ((!token && item.name !== 'Saved') || token)
          return (
            <div key={index} className="px-4">
              <li
                className="mt-1 rounded-md hover:bg-bg-tertiary active:bg-bg-tertiary dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={handleLi}>
                <CustomLink
                  href={item?.href}
                  className={`group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors duration-200 ${textStyle(
                    item?.href,
                  )}`}
                  data-testid="navigation-heading">
                  <item.icon
                    className={`h-6 w-6 shrink-0 ${iconStyle(item?.href)}`}
                    aria-hidden="true"
                    data-testid="navigation-icon"
                  />
                  {item.name}
                </CustomLink>
              </li>
            </div>
          )
      })}

      <div className="mb-3 pl-2 text-base font-[800] text-bg-black">
        Explore variety of channels
      </div>

      {channels?.map((item: any, index: number) => (
        <li
          className="border-none text-base"
          key={index}
          onClick={handleLi}
          data-testid="side-channels">
          <CustomLink
            href={`${'/channels/' + item?.slug}`}
            className={`${sidebarLinkStyle(`/channels/${item?.name}`)}`}>
            <div className="flex gap-3 rounded-md py-[10px] hover:bg-bg-tertiary hover:font-[800]">
              {item?.slug == 'hr-general' ? <HrGeneral /> : <SmileIcon />}
              <span>{item?.name}</span>
            </div>
          </CustomLink>
        </li>
      ))}
    </ul>
  )
}

export default DropDownContent
