'use client'

import CardLoading from '@/components/Loading/CardLoading'
import useChannels from '@/hooks/channels'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface ChildProps {
  children: React.ReactNode
}
const ChildWrapper = ({ children }: ChildProps) => {
  const pathName = usePathname()
  useEffect(() => {}, [pathName])
  const channels = useChannels()

  return (
    <div
      className={`${
        pathName?.includes('/profile') || pathName?.includes('/user-activities')
          ? 'flex-grow-1 h-full w-full '
          : ''
      } 
      ${
        pathName?.includes('/saved') ||
        pathName?.includes('/feeds') ||
        pathName?.includes('/popular') ||
        pathName?.includes('/channels') ||
        pathName?.includes('/erro') ||
        pathName?.includes('/user-activity')
          ? 'flex-grow-1 w-full lg:w-[50%]'
          : ''
      }
      ${
        pathName?.includes('/login') || pathName?.includes('/register')
          ? 'w-full p-0 lg:p-0'
          : ' p-0 lg:p-5'
      }

     `}>
      {pathName?.includes('/feeds') ? (
        channels.length > 0 ? (
          children
        ) : (
          <CardLoading />
        )
      ) : (
        children
      )}
    </div>
  )
}

export default ChildWrapper
