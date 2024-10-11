'use client'

import CardLoading from '@/components/Loading/CardLoading'
import useChannels from '@/hooks/channels'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { getTokens } from '@/utils/local-stroage'

interface ChildProps {
  children: React.ReactNode
}
const ChildWrapper = ({ children }: ChildProps) => {
  const pathName = usePathname()
  useEffect(() => {}, [pathName])
  const channels = useChannels()
  const { accessToken, refreshToken } = getTokens()
  return (
    <div
      className={`
      ${
        pathName?.includes('/saved') ||
        pathName?.includes('/feeds') ||
        pathName?.includes('/popular') ||
        pathName?.includes('/channels') ||
        pathName?.includes('/user-activity')
          ? 'flex-grow-1 w-full lg:w-[50%]'
          : pathName?.includes('/error')
          ? 'flex-grow-1 flex   items-center justify-center'
          : ''
      }
      ${
        pathName?.includes('/login') || pathName?.includes('/register')
          ? 'w-full p-0 lg:p-0'
          : pathName?.includes('/feeds') && !accessToken
          ? ' p-0 lg:p-5 lg:pt-0'
          : ' p-0 lg:p-5  lg:py-5'
      }
      ${
        pathName?.includes('/profile') || pathName?.includes('/user-activities')
          ? 'flex-grow-1 h-full w-full p-0 lg:p-5'
          : ''
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
