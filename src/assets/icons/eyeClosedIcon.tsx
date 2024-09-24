import { IconProps } from '@/utils/interfaces/icons'
interface iconprop {
  className: string
  onClick: () => void
}
function EyeClosedIcon({ className, onClick }: iconprop) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      onClick={onClick}
      className={
        className +
        'component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar'
      }
      fill="none"
      viewBox="0 0 21 20">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.7 12.866a16.265 16.265 0 001.754-2.07c.253-.355.38-.533.38-.796s-.127-.44-.38-.796c-1.139-1.596-4.046-5.037-7.954-5.037-.756 0-1.475.129-2.151.348M6.123 5.623c-1.68 1.133-2.92 2.663-3.576 3.581-.253.355-.38.533-.38.796s.127.44.38.796c1.138 1.596 4.046 5.037 7.953 5.037 1.66 0 3.138-.62 4.377-1.456"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M8.715 8.333a2.44 2.44 0 103.452 3.452"></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 2.5l15 15"></path>
    </svg>
  )
}

export default EyeClosedIcon
