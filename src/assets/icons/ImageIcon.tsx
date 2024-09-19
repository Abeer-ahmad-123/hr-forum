interface ImageProps {
  className: string
}
function Icon({ className }: ImageProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      className={className}
      viewBox="0 0 21 21">
      <path
        stroke="#98B0A9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.553 1H5.901C2.889 1 1 3.134 1 6.154V14.3c0 3.02 1.881 5.154 4.901 5.154h8.647c3.025 0 4.905-2.134 4.905-5.154V6.154C19.457 3.134 17.576 1 14.553 1z"
        clipRule="evenodd"></path>
      <path
        stroke="#98B0A9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.953 7.035a1.845 1.845 0 11-3.69.001 1.845 1.845 0 013.69 0z"
        clipRule="evenodd"></path>
      <path
        stroke="#98B0A9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.457 13.201c-.922-.95-2.698-2.869-4.628-2.869-1.93 0-3.043 4.233-4.9 4.233-1.858 0-3.545-1.914-5.033-.687C3.408 15.104 2 17.611 2 17.611"></path>
    </svg>
  )
}

export default Icon
