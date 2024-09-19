import { navigation } from '@/utils/data'
import { StoreChannels } from '@/utils/interfaces/channels'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { CustomLink } from './customLink/CustomLink'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'
import { iconStyle, sidebarLinkStyle, textStyle } from '@/utils/functions'

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

  const token = useSelector((state: LoggedInUser) => state.loggedInUser.token)

  return (
    <ul className={`bg-white dark:bg-bg-tertiary-dark rounded-2xl border pt-3 z-50 relative`}>
      {navigation.map((item: NavigationItem, index: number) => {
        if ((!token && item.name !== 'Saved') || token)
          return (

            <div
              key={index}
              className='px-4'
            >
              <li
                className={`mt-1 dark:active:bg-bg-primary-dark dark:hover:bg-bg-primary-dark hover:bg-bg-tertiary rounded-md`}
                onClick={handleLi}>
                <CustomLink
                  href={item?.href}
                  className={`group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors duration-200 ${textStyle(
                    item?.href, pathname
                  )}`}
                  data-testid="navigation-heading">
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${iconStyle(item?.href, pathname)}`}
                    aria-hidden="true"
                    data-testid="navigation-icon"
                  />
                  {item.name}
                </CustomLink>
              </li>
            </div>
          )
      })}

      <div className="mx-4 pl-2 font-[800] mt-3 text-base text-bg-black dark:text-bg-tertiary">
        Explore variety of channels
      </div>

      <div className='mb-4 mt-3'>
        {channels?.map((item: any, index: number) => (
          <li
            className="text-base border-none "
            key={index}
            onClick={handleLi}
            data-testid="side-channels">
            <CustomLink
              href={`${'/channels/' + item?.slug}`}
              className={`${sidebarLinkStyle(
                `/channels/${item?.name} `,
              pathname)}`}
              >
              <div className={`my-1 flex gap-3 py-[8px] mx-4 dark:hover:bg-bg-primary-dark  ${pathname === `/channels/${item.slug}` ? 'bg-bg-tertiary dark:bg-bg-primary-dark font-[800]':''}  hover:bg-bg-tertiary hover:font-[800] rounded-md`}>
                {item?.slug == "hr-general" ? <HrGeneral /> : <SmileIcon />}
                <span>{item?.name}</span>
              </div>
            </CustomLink>
          </li>
        ))}
      </div>
    </ul>
  )
}

export default DropDownContent
