import React from "react";
interface HomeIconProps{
  className?: string;
}
function HomeIcon({className}: HomeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#141B34"
        strokeWidth="1.5"
        d="M7.5 18.333l-.21-2.924a2.716 2.716 0 115.418 0l-.208 2.924"
      ></path>
      <path
        stroke="#141B34"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.96 11.011c-.294-1.914-.442-2.871-.08-3.72.362-.848 1.165-1.429 2.771-2.59l1.2-.868c1.998-1.444 2.997-2.166 4.15-2.166 1.152 0 2.15.722 4.148 2.166l1.2.868c1.606 1.161 2.41 1.742 2.771 2.59.362.849.215 1.806-.08 3.72l-.25 1.633c-.417 2.713-.626 4.07-1.599 4.88-.973.81-2.396.81-5.242.81H9.051c-2.846 0-4.268 0-5.242-.81-.973-.81-1.181-2.167-1.598-4.88L1.96 11.01z"
      ></path>
    </svg>
  );
}

export default HomeIcon;
