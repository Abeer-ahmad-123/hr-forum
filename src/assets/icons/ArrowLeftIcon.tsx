function Icon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      className={className}
      fill="none"
      viewBox="0 0 18 18">
      <g
        stroke="#141B34"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6">
        <path d="M3 9h12M6.75 12.75S3 9.988 3 9s3.75-3.75 3.75-3.75"></path>
      </g>
    </svg>
  )
}

export default Icon
