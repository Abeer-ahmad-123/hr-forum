import React from 'react'

interface SearchIconProps {
  className?: string;
  color?: string;
}
const SearchIcon = ({ className, color }: SearchIconProps) => {
  return (
    <svg
      stroke="currentColor"
      className={`ml-1.5 sm:ml-2 md:ml-1.5 ${className}`}
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="18px"
      width="18px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"></path>
      </g>
    </svg>
  )
}

export default SearchIcon
