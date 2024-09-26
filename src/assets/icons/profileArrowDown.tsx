import { IconProps } from '@/utils/interfaces/icons'
interface ArrowProps {
  className: string
  onClick?: () => null | undefined
}
function Icon({ className, onClick }: ArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className={className}
      onClick={onClick}
      fill="none"
      viewBox="0 0 20 20">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 7.5s-3.682 5-5 5-5-5-5-5"></path>
    </svg>
  )
}

export default Icon
