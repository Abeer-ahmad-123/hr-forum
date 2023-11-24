import { BsPersonFill } from 'react-icons/bs'

import { colors, menuItems, themeColors } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setColor } from '@/store/Slices/colorModeSlice'
import Link from 'next/link'
import { DownIcon } from '@/assets/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const NestedDropdown = () => {
  const selectedColor = useSelector((state: any) => state.colorMode.color)

  const dispatch = useDispatch()

  const styles = (key: any) => {
    return key ? 'bg-gray-100 dark:bg-dark-background-hover' : ''
  }
  const handleColorOption = (e: any) => {
    dispatch(setColor(e.target.textContent.trim()))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ring-gray rounded-md px-2 py-1 ring-1 ring-gray-300">
        <span className="inline-block h-4 w-4 rounded-full bg-primary"></span>{' '}
        <span className="mr-2">{selectedColor}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="left-8 bg-white dark:bg-dark-primary">
        <DropdownMenuSeparator />
        {colors.map((color: any, id) => (
          <DropdownMenuItem key={color}>
            <div
              onClick={handleColorOption}
              className={`group flex w-full cursor-pointer items-center justify-start px-3 py-2 text-sm font-light transition duration-300 hover:bg-gray-200  color-${color}`}>
              <span
                className={`mr-2 inline-block h-4 w-4 rounded-full`}
                style={{
                  backgroundColor: themeColors[color],
                }}></span>{' '}
              {color}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const LoggedOut = ({ handleLoginModalOpen }: any) => {
  return (
    <>
      <button
        onClick={handleLoginModalOpen}
        className={`flex w-[50px] items-center gap-2 rounded-full bg-primary px-3 py-2 text-white hover:bg-accent  sm:w-[120px]`}>
        <BsPersonFill size={20} />
        <span className="hidden sm:inline-block">Login</span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <DownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-dark-primary">
          <DropdownMenuSeparator />
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.label}>
              <Link
                href={item.href}
                className={`group flex w-full items-center justify-start py-2 text-sm font-light`}>
                <div className="ml-2 w-6 flex-shrink-0">{item.icon}</div>
                <span className="ml-2 flex-grow">{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
          <div className="px-2 py-2">
            <NestedDropdown />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default LoggedOut
