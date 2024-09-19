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
        strokeWidth="1.75"
        d="M16.5 9a7.5 7.5 0 10-15 0 7.5 7.5 0 0015 0z"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.182 12.75V9c0-.354 0-.53-.11-.64-.11-.11-.287-.11-.64-.11"></path>
      <path
        stroke="#EEE"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8.994 6h.007"></path>
    </svg>
  )
}

export default Icon
