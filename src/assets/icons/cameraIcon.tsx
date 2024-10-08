import { cn } from '@/lib/utils'
import React from 'react'

const CameraIcon = ({ className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      className={cn(
        'component-iconify MuiBox-root css-x3wokz iconify iconify--solar',
        className,
      )}
      viewBox="0 0 24 24"
    >
      <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
        <path d="M12 10.25a.75.75 0 01.75.75v1.25H14a.75.75 0 010 1.5h-1.25V15a.75.75 0 01-1.5 0v-1.25H10a.75.75 0 010-1.5h1.25V11a.75.75 0 01.75-.75z"></path>
        <path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 001.226-1.204c.749-1.1.749-2.633.749-5.697 0-3.065 0-4.597-.749-5.697a4.407 4.407 0 00-1.226-1.204c-.72-.473-1.622-.642-3.003-.702-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0013.634 3h-3.268c-.988 0-1.839.685-2.033 1.636-.129.635-.696 1.125-1.355 1.125-1.38.06-2.282.23-3.003.702A4.405 4.405 0 002.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21zM16 13a4 4 0 11-8 0 4 4 0 018 0zm2-3.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1z"></path>
      </g>
    </svg>
  )
}

export default CameraIcon
