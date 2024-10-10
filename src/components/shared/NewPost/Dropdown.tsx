'use client'
import { DownIcon } from '@/assets/icons'
import { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import VectorChannelIcon from '@/assets/icons/VectorChannelIcon'
import { ChannelInterface } from '@/utils/interfaces/channels'

const Dropdown = ({ handleDropDownValue, value, channels }: any) => {
  const pathName = usePathname()
  const [buttonValue, setButtonValue] = useState('Select a Channel')
  const channelSlugRoute = pathName.split('/')[2]

  useEffect(() => {
    setButtonValue(value)
  }, [value])

  return (
    <div className="relative mr-4 w-1/2  max-[490px]:w-full max-[490px]:text-start">
      <div className="items-left">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`inline-flex ${
              channelSlugRoute ? 'pointer-events-none' : 'cursor-pointer'
            }  h-[48px] w-[160px] items-center justify-center gap-[8px] rounded-[20px]  bg-bg-tertiary px-[10px] py-[12px] text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-bg-tertiary-dark dark:text-white`}>
            <div className=" flex items-center justify-center gap-[8px]">
              <VectorChannelIcon className="text-black dark:text-white" />
              <span className="font-semibold max-sm:text-xs md:text-sm">
                {buttonValue}
              </span>{' '}
              {!channelSlugRoute && (
                <DownIcon className="ml-2 h-5 cursor-pointer max-sm:w-3 md:w-5" />
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-[11.5rem] bg-white dark:bg-bg-tertiary-dark">
            <DropdownMenuSeparator />
            {channels.map((item: ChannelInterface, index: number) => (
              <DropdownMenuItem
                onClick={() => {
                  setButtonValue(item.name), handleDropDownValue(item.id)
                }}
                key={index}
                className="hover:text-white">
                <div className="ml-2 flex-shrink-0 ">{item.name}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Dropdown
