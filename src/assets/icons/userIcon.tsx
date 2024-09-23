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
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.385 11.111c-.943.632-3.416 1.922-1.91 3.537C4.211 15.436 5.03 16 6.061 16h5.878c1.03 0 1.85-.564 2.586-1.352 1.506-1.615-.967-2.905-1.91-3.537a6.436 6.436 0 00-7.23 0z"></path>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M12 5a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  )
}

export default Icon
