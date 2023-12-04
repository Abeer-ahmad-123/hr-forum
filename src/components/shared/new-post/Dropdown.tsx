'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DownIcon } from '@/assets/icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Dropdown = ({ handleDropDownValue, value }: any) => {
  const channels = useSelector((state: any) => state.channels.channels)

  const [buttonValue, setButtonValue] = useState('Select a Channel')

  return (
    <div className="relative mr-4 inline-block w-full text-right">
      <div className="items-left">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-dark-primary dark:text-white">
              {value?.name || buttonValue}
              <DownIcon className="ml-2 h-5 w-5 cursor-pointer" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-dark-primary">
            <DropdownMenuSeparator />
            {channels.map((item) => (
              <DropdownMenuItem
                onClick={() => setButtonValue(item.name)}
                key={item.name}>
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
