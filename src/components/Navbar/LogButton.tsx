'use client'
import React from 'react'
import LoggedIn from './LoggedIn'
import SigninNavButton from './SigninNavButton'
import { useSelector } from 'react-redux'

const LogButton = () => {
  const reduxToken = useSelector((state: any) => state.loggedInUser.token)

  return (
    <>{window ? !!reduxToken ? <LoggedIn /> : <SigninNavButton /> : <></>}</>
  )
}

export default LogButton
