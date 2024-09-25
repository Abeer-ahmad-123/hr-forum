import { IconProps } from '@/utils/interfaces/icons'
function Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      className={className}
      fill="none"
      viewBox="0 0 18 18">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
        d="M10 3.063A6.269 6.269 0 009.11 3C5.734 3 3 5.686 3 9s2.735 6 6.11 6c.302 0 .6-.022.89-.063"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M15 9H8m7 0c0-.56-1.396-1.607-1.75-2M15 9c0 .56-1.396 1.607-1.75 2"></path>
    </svg>
  )
}

export default Icon
