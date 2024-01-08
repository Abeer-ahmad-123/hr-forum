'use client'
import { useSelector } from 'react-redux'
import LoggedIn from './LoggedIn'
import SigninNavButton from './SigninNavButton'

const LogButton = () => {
  const reduxToken = useSelector((state: any) => state.loggedInUser.token)

  return <>{window ? reduxToken ? <LoggedIn /> : <SigninNavButton /> : <></>}</>
}

export default LogButton
