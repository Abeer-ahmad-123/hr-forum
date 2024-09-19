function Icon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="11"
      className={className}
      fill="none"
      viewBox="0 0 7 11">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1s5 3.314 5 4.5S1 10 1 10"></path>
    </svg>
  )
}

export default Icon
