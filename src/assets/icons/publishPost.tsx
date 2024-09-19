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
        d="M12 1.5H9c-2.121 0-3.182 0-3.841.71C4.5 2.92 4.5 4.062 4.5 6.346v.808c0 2.284 0 3.427.659 4.136C5.818 12 6.879 12 9 12h3c2.121 0 3.182 0 3.841-.71.659-.71.659-1.852.659-4.136v-.808c0-2.284 0-3.427-.659-4.136-.66-.71-1.72-.71-3.841-.71z"></path>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        d="M13.5 12.456c-.01 1.76-.082 2.712-.658 3.333-.659.711-1.72.711-3.841.711H6c-2.122 0-3.183 0-3.842-.71-.659-.711-.659-1.855-.659-4.143v-.808c0-2.288 0-3.432.66-4.142.48-.519 1.175-.66 2.34-.697"></path>
    </svg>
  )
}

export default Icon
