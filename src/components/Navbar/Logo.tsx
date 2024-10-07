import { CustomLink } from '../shared/customLink/CustomLink'
import LogoIcon from '@/assets/icons/logo'
import TextIcon from '@/assets/icons/hrTalkers'
import { IconProps } from '@/utils/interfaces/icons'

const Logo = ({ className }: IconProps) => {
  return (
    <div className="max-sm:w-10 flex-shrink-0 cursor-pointer text-center md:w-44">
      <CustomLink
        href="/feeds"
        className="flex items-center justify-center gap-[10px]">
        <LogoIcon className="h-10 w-10 md:h-9 md:w-9 " />
        <span className="hidden md:inline-block">
          <TextIcon
            className={`${
              className ? className : 'text-black dark:text-white'
            }`}
          />
        </span>
      </CustomLink>
    </div>
  )
}

export default Logo
