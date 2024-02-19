import RegisterRoute from '@/components/RegisterRoute'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Login',
}

const RegisterPage = () => {
  return <RegisterRoute />
}

export default RegisterPage
