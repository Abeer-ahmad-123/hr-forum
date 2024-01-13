import { DownIcon } from '@/assets/icons'
import { menuItems } from '@/utils/data'
import { CustomLink } from '../shared/customLink/CustomLink'
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
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="hover:bg-accent hover:text-white">
            <CustomLink
              href={item.href}
              className={`group flex w-full items-center justify-start py-2 text-sm font-light`}>
              <div className="ml-2 w-6 flex-shrink-0 dark:text-white">
                {item.icon}
              </div>
              <span className="ml-2 flex-grow text-left dark:text-white">
                {item.label}
              </span>
            </CustomLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
