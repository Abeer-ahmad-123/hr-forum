import Error from '@/components/error'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Error',
}

const ErrorPage = () => {
  return <Error />
}

export default ErrorPage
