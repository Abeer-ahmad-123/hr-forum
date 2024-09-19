import { IconProps } from '@/utils/interfaces/icons'
function Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      className={className}
      fill="none"
      viewBox="0 0 12 12">
      <path
        stroke="#000000"
        strokeLinejoin="round"
        d="M7.037 1.943c.372-.404.559-.606.757-.724a1.553 1.553 0 011.551-.023c.201.112.393.308.777.7.385.393.577.589.686.794a1.647 1.647 0 01-.023 1.585c-.115.203-.313.393-.708.773l-4.702 4.53c-.749.72-1.123 1.081-1.591 1.264-.468.183-.982.17-2.011.142l-.14-.003c-.314-.009-.47-.013-.561-.116-.091-.103-.079-.263-.054-.582l.014-.173c.07-.898.104-1.347.28-1.75.175-.405.478-.732 1.083-1.388l4.642-5.03zM6.5 2L10 5.5"></path>
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11h4"></path>
    </svg>
  )
}

export default Icon
