'use client'
import { navigation } from '@/utils/data'
import { usePathname } from 'next/navigation'
import { CustomLink } from './customLink/CustomLink'
import HrGeneral from '@/assets/icons/hrGeneral'
import SmileIcon from '@/assets/icons/smileIcon'
import { iconStyle, sidebarLinkStyle, textStyle } from '@/utils/functions'
import { getTokens } from '@/utils/local-stroage'
import { useCallback, useEffect, useState } from 'react'
import useChannels from '@/hooks/channels'

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
  const [accessToken, setAccessToken] = useState<string>('')

  const pathname = usePathname()

  const channels = useChannels()

  // const channels = useSelector(
  //   (state: StoreChannels) => state?.channels?.channels,
  // )

  useEffect(() => {
    const storedTokens = getTokens()
    if (storedTokens) {
      setAccessToken(storedTokens?.accessToken)
    }
  }, [])

  return (
    <ul
      className={`relative z-50 rounded-2xl border bg-white pt-3 dark:bg-bg-tertiary-dark`}>
      {navigation.map((item: NavigationItem, index: number) => {
        if ((!accessToken && item.name !== 'Saved') || accessToken)
          return (
            <div key={index} className="px-4">
              <li
                className={`mt-1 rounded-md hover:bg-bg-tertiary dark:hover:bg-bg-primary-dark dark:active:bg-bg-primary-dark`}
                onClick={handleLi}>
                <CustomLink
                  href={item?.href}
                  className={`group flex gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors duration-200 ${textStyle(
                    item?.href,
                    pathname,
                  )}`}
                  data-testid="navigation-heading">
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${iconStyle(
                      item?.href,
                      pathname,
                    )}`}
                    aria-hidden="true"
                    data-testid="navigation-icon"
                  />
                  {item.name}
                </CustomLink>
              </li>
            </div>
          )
      })}

      <div className="mx-4 mt-3 pl-2 text-base font-[800] text-bg-black dark:text-bg-tertiary">
        Explore variety of channels
      </div>

      <div className="mb-4 mt-3">
        {channels?.map((item: any, index: number) => (
          <li
            className="border-none text-base "
            key={index}
            onClick={handleLi}
            data-testid="side-channels">
            <CustomLink
              href={`${'/channels/' + item?.slug}`}
              className={`${sidebarLinkStyle(
                `/channels/${item?.name} `,
                pathname,
              )}`}>
              <div
                className={`mx-4 my-1 flex gap-3 py-[8px] dark:hover:bg-bg-primary-dark  ${
                  pathname === `/channels/${item.slug}`
                    ? 'bg-bg-tertiary font-[800] dark:bg-bg-primary-dark'
                    : ''
                }  rounded-md hover:bg-bg-tertiary hover:font-[800]`}>
                {item?.slug == 'hr-general' ? <HrGeneral /> : <SmileIcon />}
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
