'use client'
import { userData } from '@/utils/interfaces/userData'
import RenderChildren from './RenderChildren'
import { useState } from 'react'
import GoogleAndAuth from './GoogleAndAuth'
import NewLoading from '@/components/NewLoading/NewLoading'
interface props {
  user: userData
  token: string
  isError: boolean
  pathname: string | null
  children: React.ReactNode
}
const ChildrenWrapper = ({
  user,
  token,
  isError,
  pathname,
  children,
}: props) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {
        <RenderChildren
          user={user}
          token={token}
          isError={isError}
          pathname={pathname}>
          {isLoading ? <NewLoading /> : children}
        </RenderChildren>
      }
      <GoogleAndAuth setIsLoading={setIsLoading} token={token} />
    </>
  )
}

export default ChildrenWrapper
