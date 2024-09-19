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
        strokeWidth="1.75"
        d="M7.5 2.49c-2.437-.373-4.745-.348-5.426.334-1.63 1.629.495 12.546 2.827 12.32 1.28-.13 2.173-2.185 3.225-2.827.414-.253.781.004 1.04.342l2.51 3.267c.438.57.746.739 1.406.401 1.013-.519 1.977-1.484 2.495-2.496.338-.659.168-.967-.4-1.404L13.5 11.139"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.774 4c0-.51.42-.922.937-.922A.93.93 0 0113.65 4a.91.91 0 01-.149.499c-.238.364-.642.715-.757 1.125m.007 1.5h.007M16.5 5.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
    </svg>
  )
}

export default Icon
