import LoginRoute from '@/components/LoginRoute'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Login',
}
const LoginPage = () => {
  return <LoginRoute />
}

export default LoginPage
