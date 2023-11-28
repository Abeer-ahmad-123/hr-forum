'use client'
import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineDown as ChevronDownIcon } from 'react-icons/ai'


const Dropdown = ({ handleDropDownValue, value }:any) => {
  const [isOpen, setIsOpen] = useState(false)

  const channels = useSelector((state:any) => state.channels.channels)

  const onClick = (value:any) => {
    handleDropDownValue(value)
    setIsOpen(false)
  }
 
console.log(channels)

  return (
    <div className="relative inline-block w-full text-right mr-4">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-dark-primary dark:text-white"
        >
          {value?.name || 'Select a Channels'}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute  z-50 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {channels.map((channel:any) => (
              <div
                key={channel.id}
                onClick={() => onClick(channel.id)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {channel?.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
