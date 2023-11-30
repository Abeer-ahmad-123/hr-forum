'use client'
import React,{useEffect} from 'react'
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

  
  useEffect(()=>{
  const userData = localStorage.getItem('userData') || null;
  const token = localStorage.getItem('token') || null;
   console.log("Here is user data" ,userData) 
   console.log("Here is parsed user data" ,userData) 
  dispatch(setUser({token,userData}))
  
  },[])




  return <>{!!reduxToken ? <LoggedIn /> : <SigninNavButton />}</>
}

export default LogButton
