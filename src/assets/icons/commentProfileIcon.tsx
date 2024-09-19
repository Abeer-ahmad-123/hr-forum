import { IconProps } from '@/utils/interfaces/icons'
function Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className={className}
      fill="none"
      viewBox="0 0 20 20">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M17.5 9.583a6.983 6.983 0 01-.75 3.167 7.083 7.083 0 01-6.334 3.917 6.984 6.984 0 01-3.166-.75L3.5 16.5l.583-3.75a6.984 6.984 0 01-.75-3.167A7.083 7.083 0 017.25 3.25a6.983 6.983 0 013.166-.75h.417A7.066 7.066 0 0117.5 9.167v.416z"></path>
    </svg>
  )
}

export default Icon
