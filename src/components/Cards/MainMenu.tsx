import { navigationItems } from '@/utils/data'
import { MenuCardInterface } from '@/utils/interfaces/card'
import Link from 'next/link'

const MainMenu: React.FC<MenuCardInterface> = ({ path, user }) => {
  const filteredMenuItems = user
    ? navigationItems.filter((item) => item.title !== 'Popular')
    : navigationItems.filter((item) => item.title !== 'Saved')

  return (
    <div
      className={`flex h-[94px] w-[254px] cursor-pointer flex-col bg-bg-primary dark:bg-bg-primary-dark`}>
      {filteredMenuItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`dark:hover:bg-bg-tertiary ${
            path == item.href
              ? 'bg-bg-tertiary font-[800] dark:bg-bg-tertiary-dark dark:text-bg-tertiary'
              : ''
          } mt-1 h-14 rounded-md pt-2 hover:bg-bg-tertiary hover:font-[800]  dark:text-bg-tertiary dark:hover:bg-bg-tertiary-dark`}>
          <div className={`flex gap-3 pl-4`}>
            {item.icon}
            <div key={index}>{item.title}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MainMenu
