import { CustomLink } from '../shared/customLink/CustomLink'
import LogoIcon from '@/assets/icons/logo'
import TextIcon from '@/assets/icons/hrTalkers'

const Logo = () => {
  return (
    <div className="flex-shrink-0 cursor-pointer text-center max-sm:w-10 md:w-44">
      <CustomLink href="/feeds" className='flex justify-center items-center gap-[10px]'>
        <LogoIcon className='h-10 w-10 md:h-9 md:w-9 ' />
        <span className="hidden md:inline-block">
          <TextIcon className='text-black dark:text-white' />
        </span>
      </CustomLink>
    </div>
  )
}

export default Logo
