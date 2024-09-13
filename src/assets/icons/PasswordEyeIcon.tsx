import { iconProp } from '@/utils/types/new-ui-types'
function Icon({ className }: iconProp) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="16"
      className={className}
      fill="none"
      viewBox="0 0 22 16">
      <path
        stroke="#09090B"
        strokeWidth="1.5"
        d="M20.544 7.045c.304.426.456.64.456.955 0 .316-.152.529-.456.955C19.178 10.871 15.689 15 11 15c-4.69 0-8.178-4.13-9.544-6.045C1.152 8.529 1 8.315 1 8c0-.316.152-.529.456-.955C2.822 5.129 6.311 1 11 1c4.69 0 8.178 4.13 9.544 6.045z"></path>
      <path
        stroke="#09090B"
        strokeWidth="1.5"
        d="M14 8a3 3 0 10-6 0 3 3 0 006 0z"></path>
    </svg>
  )
}

export default Icon
