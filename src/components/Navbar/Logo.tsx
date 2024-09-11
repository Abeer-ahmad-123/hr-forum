import { GiCheckedShield } from 'react-icons/gi'
import { CustomLink } from '../shared/customLink/CustomLink'
import LogoIcon from '@/assets/icons/logo'

const Logo = () => {
  return (
    <div className="w-20 flex-shrink-0 cursor-pointer text-center max-sm:w-10 md:w-40">
      <CustomLink href="/feeds" className='flex justify-center items-center gap-[10px]'>
        <LogoIcon className='h-10 w-10 md:h-9 md:w-9 ' />
        <span className="hidden align-middle text-center dark:text-white md:inline-block font-semibold">
          HR Talkers
        </span>
      </CustomLink>
    </div>
  )
}

export default Logo
