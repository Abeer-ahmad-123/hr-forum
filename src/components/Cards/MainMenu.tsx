
import { navigationItems } from '@/utils/data';
import { MenuCardInterface } from '@/utils/interfaces/card';
import Link from 'next/link';

const MainMenu: React.FC<MenuCardInterface> = ({ path, user }) => {

  const filteredMenuItems = user
    ? navigationItems.filter((item) => item.title !== 'Popular')
    : navigationItems.filter((item) => item.title !== 'Saved');

  return (
    <div
      className={`dark:bg-bg-primary-dark flex flex-col bg-bg-primary h-[94px] w-[254px] cursor-pointer`}
    >
      {filteredMenuItems.map((item, index) => (
        <Link
        href={item.href}
          key={index}
          className={`dark:hover:bg-bg-tertiary ${path == item.href? 'bg-bg-tertiary dark:bg-bg-tertiary-dark dark:text-bg-tertiary font-[800]': ''} hover:bg-bg-tertiary dark:hover:bg-bg-tertiary-dark dark:text-bg-tertiary hover:font-[800] rounded-md h-14  pt-2 mt-1`}
        >
          <div className={`flex pl-4 gap-3`}>
            {item.icon}
            <div key={index}>
              {item.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MainMenu;
