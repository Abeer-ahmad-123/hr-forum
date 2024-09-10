import React from 'react'

function Icon({ className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 20 20 ">
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M17.5 10.083a6.983 6.983 0 01-.75 3.167 7.082 7.082 0 01-6.333 3.917 6.984 6.984 0 01-3.167-.75L3.5 17l.583-3.75a6.984 6.984 0 01-.75-3.167A7.083 7.083 0 017.25 3.75 6.983 6.983 0 0110.417 3h.416A7.067 7.067 0 0117.5 9.667v.416z"></path>
    </svg>
  )
}

export default Icon

// import React from 'react'

// function Icon({ className }: any) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className={`fill-none ${className}`} // Dynamically apply Tailwind classes
//       viewBox="0 0 20 21">
//       <path
//         stroke="#000"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="1.75"
//         d="M17.5 10.083a6.983 6.983 0 01-.75 3.167 7.082 7.082 0 01-6.333 3.917 6.984 6.984 0 01-3.167-.75L3.5 17l.583-3.75a6.984 6.984 0 01-.75-3.167A7.083 7.083 0 017.25 3.75 6.983 6.983 0 0110.417 3h.416A7.067 7.067 0 0117.5 9.667v.416z"></path>
//     </svg>
//   )
// }

// export default Icon
