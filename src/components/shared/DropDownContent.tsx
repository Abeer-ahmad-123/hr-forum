import Link from 'next/link'
import { navigation, sidebarChannels } from '@/utils/data'
import { usePathname, useRouter } from 'next/navigation'
import { RiSettings4Fill } from 'react-icons/ri'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { useSelector } from 'react-redux'

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
  const router = useRouter()
  const pathname = usePathname()
  const channels = useSelector((state) => state?.channels?.channels)
  const handleChannelClick = () => {
    router.push('/channels')
  }

  const commonPrimaryText: string = 'text-accent'
  const commonDarkModeText: string = 'dark:text-gray-200'
  const commonDullPrimaryText: string = 'text-[#6395f0]'

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

  const channelCodeStyle = (key: string): string => {
    return checkEqual(key)
      ? `${commonDullPrimaryText} dark:${commonDullPrimaryText}`
      : `text-gray-400 ${commonDarkModeText}`
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

  return (
    <ul className={`bg-white dark:bg-dark-primary`}>
      <div className="lg:h-3"></div>

      {navigation.map((item: NavigationItem) => {
        return (
          <li
            className="hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            key={item?.name}
            onClick={handleLi}
          >
            <Link
              href={item?.href}
              className={`group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors duration-200 ${textStyle(
                item?.href,
              )}`}
              data-testid="navigation-heading"
            >
              <item.icon
                className={`h-6 w-6 shrink-0 ${iconStyle(item?.href)}`}
                aria-hidden="true"
                data-testid="navigation-icon"
              />
              {item.name}
            </Link>
          </li>
        )
      })}

      <div className="ml-2 border-none px-1 py-1 text-start text-gray-800 dark:text-gray-200">
        Current Channels <span className="text-xs">({channels?.length})</span>
      </div>

      {channels?.map((item: any) => (
        <li
          className="border-none"
          key={item?.name}
          onClick={handleLi}
          data-testid="side-channels"
        >
          <Link
            href={`${'/channels/' + item?.slug}`}
            className={`group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors duration-200 ${sidebarLinkStyle(
              `/channels/${item?.name}`,
            )}`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-gray-100 text-[0.625rem] font-medium dark:bg-gray-200 ${sidebarIconStyle(
                `/channels/${item?.name}`,
              )}`}
            >
              <BsDot
                className="h-5 w-5 hover:border-2 hover:border-gray-800"
                fill={item?.color}
                data-testid="side-channels-icon"
              />
            </span>
            <div className="grid">
              <span
                className={`truncate   ${channelNameStyle(
                  `/channels/${item?.name}`,
                )}`}
                data-testid="side-channels-name"
              >
                {item?.name}
              </span>
            </div>
          </Link>
        </li>
      ))}
      <Link href="/channels" data-testid="join-new-channel">
        <li onClick={handleLi} className="max-md:w-[200px] lg:w-[258px]">
          <div
            className="flex h-12 items-center rounded-lg bg-accent text-white"
            onClick={handleChannelClick}
          >
            <div className=" m-[0px_0px_0px_0.35em] h-8 w-8 rounded-lg bg-accent ">
              <AiOutlineUserAdd
                className="ml-1 mt-1 h-6 w-6 text-white"
                data-testid="join-new-channel-icon"
              />
            </div>
            <div className="w-7.5 h-7.5 m-1.5 rounded-lg bg-accent pr-8 pt-1 font-light text-white max-lg:p-0 max-lg:text-[15px]">
              Join a new channel
            </div>
          </div>
        </li>
      </Link>

      <Link
        href="/settings"
        className="mt-auto hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        onClick={handleLi}
        data-testid="settings"
      >
        <li
          className={`group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-800 ${textStyle(
            '/settings',
          )}`}
        >
          <RiSettings4Fill
            className={`h-6 w-6 shrink-0  dark:text-gray-200 dark:group-hover:text-white ${iconStyle(
              '/settings',
            )}`}
            data-testid="settings-icon"
          />
          Settings
        </li>
      </Link>
    </ul>
  )
}

export default DropDownContent
