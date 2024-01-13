import { BsPersonFill } from 'react-icons/bs'
import { menuItems } from '@/utils/data'
import Link from 'next/link'
import { DownIcon } from '@/assets/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { CustomLink } from '../shared/customLink/CustomLink'

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
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index}>
              <CustomLink
                href={item.href}
                className={`group flex w-full items-center justify-start py-2 text-sm font-light`}>
                <div className="ml-2 w-6 flex-shrink-0">{item.icon}</div>
                <span className="ml-2 flex-grow">{item.label}</span>
              </CustomLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default LoggedOut
