'use client'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const LoggedIn = dynamic(() => import('./LoggedIn'), { ssr: false })
const SigninNavButton = dynamic(() => import('./SigninNavButton'), {
  ssr: false,
})
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useEffect, useState } from 'react'

const LogButton = () => {
  const reduxToken = useSelector(
    (state: LoggedInUser) => state.loggedInUser.token,
  )
  const [showContent, setContent] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContent(true)
    }
  }, [])

  return (
    <div>
      {/* {typeof window !== 'undefined' ? (
        reduxToken ? (
          <LoggedIn />
        ) : (
          <SigninNavButton />
        )
      ) : (
        <></>
      )} */}
      {window ? reduxToken ? <LoggedIn /> : <SigninNavButton /> : <></>}
    </div>
  )
}

export default LogButton
