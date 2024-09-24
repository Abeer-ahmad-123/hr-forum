import { IconProps } from '@/utils/interfaces/icons'
function Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      className={className}
      viewBox="0 0 18 18">
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.868 11.625h.007m-3.75 0h.007"></path>
      <path
        stroke="#000000"
        d="M3.2 14.133c.17 1.253 1.207 2.235 2.47 2.293 1.062.049 2.141.074 3.33.074a71.63 71.63 0 003.33-.074c1.263-.058 2.3-1.04 2.47-2.292.11-.818.2-1.656.2-2.509s-.09-1.691-.2-2.509c-.17-1.252-1.207-2.234-2.47-2.292A71.574 71.574 0 009 6.75c-1.189 0-2.268.025-3.33.074-1.263.058-2.3 1.04-2.47 2.292-.11.818-.2 1.656-.2 2.509s.09 1.691.2 2.508z"></path>
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.625 6.75V4.875a3.375 3.375 0 016.75 0V6.75"></path>
    </svg>
  )
}

export default Icon
