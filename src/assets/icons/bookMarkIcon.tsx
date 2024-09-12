interface IconProps {
  className: string
}
function Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      className={className}
      viewBox="0 0 20 20">
      <path
        stroke="#141B34"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 13.986V7.78c0-2.725 0-4.088.879-4.934C4.757 2 6.172 2 9 2c2.828 0 4.243 0 5.121.847C15 3.693 15 5.056 15 7.78v6.205c0 1.729 0 2.594-.58 2.903-1.122.6-3.228-1.4-4.227-2.002-.58-.35-.87-.524-1.193-.524-.323 0-.613.175-1.192.524-1 .602-3.106 2.602-4.228 2.002C3 16.58 3 15.715 3 13.986z"></path>
    </svg>
  )
}

export default Icon
