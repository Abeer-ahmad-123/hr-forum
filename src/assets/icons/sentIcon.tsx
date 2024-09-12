interface iconProp {
  className: string
  color: string
}
function Icon({ className, color }: iconProp) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20">
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M17.54 2.544C15.725.59 2.072 5.378 2.084 7.126c.012 1.982 5.331 2.592 6.805 3.006.887.248 1.125.503 1.329 1.433.926 4.21 1.39 6.305 2.45 6.351 1.689.075 6.643-13.464 4.872-15.372z"></path>
      <path
        stroke="#141B34"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.584 10.417L12.5 7.5"></path>
    </svg>
  )
}

export default Icon
