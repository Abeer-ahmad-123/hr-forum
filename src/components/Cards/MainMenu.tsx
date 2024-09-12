import Icon from '@/assets/icons/heartIcon'
import HomeIcon from '@/assets/icons/home'

function MainMenu() {

  const menuItems = [
    { title: 'Home', link: '/', icon: <HomeIcon /> },
    { title: 'Popular', link: '/popular', icon: <Icon /> },
  ]

  return (
    <div className='dark:bg-slate-800 dark:text-gray-400 flex flex-col gap-[6px] bg-bg-primary h-[94px] w-[254px] cursor-pointer'>
      {
        menuItems.map((item, index) => (
          <div key={index} className={`hover:bg-bg-tertiary dark:bg-slate-800 dark:text-gray-400 hover:font-[800] rounded-md h-14`}>
            <div className={`flex pl-4 pt-3 gap-3`}>
              {item.icon}
              <div key={index}>
                {item.title}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default MainMenu
