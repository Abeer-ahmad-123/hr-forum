'use client'
import { DownIcon } from '@/assets/icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StoreChannels } from '@/utils/interfaces/channels'
import { usePathname } from 'next/navigation'

const Dropdown = ({ handleDropDownValue, value }: any) => {
  const channels = useSelector(
    (state: StoreChannels) => state.channels.channels,
  )
  const pathName = usePathname()
  const [buttonValue, setButtonValue] = useState('Select a Channel')

  const checkChannel = () => {
    if (pathName.includes('/channels/')) {
      const channel = channels.find((channel) => {
        return channel.slug === pathName.split('/')[2]
      })
      if (channel) {
        setButtonValue(channel.name)
      }
    }
  }

  console.log()

  useEffect(() => {
    checkChannel()
  }, [])

  return (
    <div className="relative mr-4 w-1/2 text-right">
      <div className="items-left">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`inline-flex ${
              channels.some(
                (channel) => channel.slug === pathName.split('/')[2],
              )
                ? 'pointer-events-none'
                : 'cursor-pointer'
            } items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-dark-primary dark:text-white`}>
            <div className="flex">
              {value?.name || buttonValue}
              {!channels.some(
                (channel) => channel.slug === pathName.split('/')[2],
              ) && <DownIcon className="ml-2 h-5 w-5 cursor-pointer" />}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white dark:bg-dark-primary">
            <DropdownMenuSeparator />
            {channels.map((item, index) => (
              <DropdownMenuItem
                onClick={() => {
                  setButtonValue(item.name), handleDropDownValue(item.id)
                }}
                key={index}
                className="hover:text-white">
                <div className="ml-2 flex-shrink-0">{item.name}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Dropdown
