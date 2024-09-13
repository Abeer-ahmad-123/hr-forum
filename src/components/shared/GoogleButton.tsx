import googleIcon from '@/assets/images/google.jpeg'
import { GoogleIconProps } from '@/utils/interfaces/icons'

const GoogleButton = ({ onClick, title }: GoogleIconProps) => {
  return (
    <div
      onClick={onClick}
      className=" flex w-full items-center justify-center rounded-md border-transparent p-[1px] text-base font-medium text-white  transition duration-200 ease-in-out  md:text-lg">
      <img
        className="mr-2 h-[18px] w-[18px]"
        src={googleIcon.src}
        alt="Google G Logo"
        height={8}
        width={8}
      />
      <p className="text-[14px] font-[550]  text-black dark:text-white">
        {title} with Google
      </p>
    </div>
  )
}

export default GoogleButton
