import { navigation } from '@/utils/data'
import { StoreChannels } from '@/utils/interfaces/channels'
import { usePathname } from 'next/navigation'
import { BsDot } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { CustomLink } from './customLink/CustomLink'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'

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
  const commonPrimaryText: string = 'text-accent'
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

  const sidebarIconStyle = (key: string): string => {
    return checkEqual(key)
      ? `border-primary ${commonPrimaryText} text-white dark:border-primary`
      : `border-indigo-100 text-gray-400 group-hover:text-indigo-500 dark:border-gray-700 ${commonDarkModeText}`
  }

  const checkEqual = (key: string): boolean => {
    return pathname === key
  }

  const token = useSelector((state: LoggedInUser) => state.loggedInUser.token)

  return (
    <ul className={`bg-white dark:bg-black `}>
      <div className="lg:h-3"></div>

      {navigation.map((item: NavigationItem, index: number) => {
        if ((!token && item.name !== 'Saved') || token)
          return (
            <li
              className=" hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              key={index}
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
          )
      })}

      <div className="ml-2 border-none px-1 py-1 text-start text-gray-800 dark:text-gray-200">
        Current Channels <span className="text-xs">({channels?.length})</span>
      </div>

      {channels?.map((item: any, index: number) => (
        <li
          className="border-none"
          key={index}
          onClick={handleLi}
          data-testid="side-channels">
          <CustomLink
            href={`${'/channels/' + item?.slug}`}
            className={`group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors duration-200 ${sidebarLinkStyle(
              `/channels/${item?.name}`,
            )}`}>
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-gray-100 text-[0.625rem] font-medium dark:bg-gray-200 ${sidebarIconStyle(
                `/channels/${item?.name}`,
              )}`}>
              <BsDot
                className="h-5 w-5 hover:border-2 hover:border-gray-800 dark:hover:border-none"
                fill={item?.color}
                data-testid="side-channels-icon"
              />
            </span>
            <div className="grid">
              <span
                className={`truncate   ${channelNameStyle(
                  `/channels/${item?.name}`,
                )}`}
                data-testid="side-channels-name">
                {item?.name}
              </span>
            </div>
          </CustomLink>
        </li>
      ))}
    </ul>
  )
}

export default DropDownContent
