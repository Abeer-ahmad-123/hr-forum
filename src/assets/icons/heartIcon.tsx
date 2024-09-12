interface IconProps {
  className: string
}
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
        stroke="#141B34"
        strokeLinecap="round"
        strokeWidth="2"
        d="M16.219 3.828c-2.235-1.37-4.185-.818-5.357.062-.48.36-.72.541-.862.541-.141 0-.382-.18-.862-.541-1.172-.88-3.122-1.432-5.357-.062C.848 5.628.185 11.562 6.95 16.57 8.238 17.523 8.882 18 10 18c1.118 0 1.762-.477 3.05-1.43 6.765-5.008 6.101-10.943 3.169-12.742z"></path>
    </svg>
  )
}

export default Icon
