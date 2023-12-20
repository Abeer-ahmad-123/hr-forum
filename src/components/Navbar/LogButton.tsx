'use client'
import React, { useEffect } from 'react'
import LoggedIn from './LoggedIn'
import SigninNavButton from './SigninNavButton'
import { useSelector } from 'react-redux'
import { setUser } from '@/store/Slices/loggedInUserSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'

const LogButton = () => {
  const dispatch = useDispatch<AppDispatch>()
  const reduxToken = useSelector((state: any) => state.loggedInUser.token)
  // store data in redux

  useEffect(() => {
    // const userData = localStorage.getItem('userData') || null
    // const token = localStorage.getItem('token') || null
    // const refreshToken = localStorage.getItem('refreshToken') || null
    // if (token && token !== 'undefined') {
    // dispatch(
    //   setUser({
    //     token,
    //     userData: JSON.parse(userData),
    //     refreshToken: refreshToken,
    //   }),
    // )
    // }
  }, [])

  return (
    <>{window ? !!reduxToken ? <LoggedIn /> : <SigninNavButton /> : <></>}</>
  )
}

export default LogButton
