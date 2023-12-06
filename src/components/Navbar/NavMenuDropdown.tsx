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

export default function NavMenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <DownIcon className="cursor-pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:hover:bg-primary-accent bg-white dark:bg-dark-primary">
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.label}>
            <Link
              href={item.href}
              className={`group flex w-full items-center justify-start py-2 text-sm font-light`}>
              <div className="ml-2 w-6 flex-shrink-0 dark:text-white">
                {item.icon}
              </div>
              <span className="ml-2 flex-grow dark:text-white">
                {item.label}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
