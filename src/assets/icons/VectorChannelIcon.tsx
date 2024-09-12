function Icon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="17"
      fill="none"
      className={className}
      viewBox="0 0 18 17">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M13.185 7.283a4.504 4.504 0 00-5.37 2.684m5.37-2.684A4.502 4.502 0 0112 16.125a4.483 4.483 0 01-3-1.146m4.185-7.696a4.5 4.5 0 10-8.37 0m3 2.684a4.487 4.487 0 00-.315 1.658c0 1.333.58 2.53 1.5 3.354M7.815 9.967a4.51 4.51 0 01-3-2.684M9 14.979a4.5 4.5 0 11-4.185-7.696"></path>
    </svg>
  )
}

export default Icon
