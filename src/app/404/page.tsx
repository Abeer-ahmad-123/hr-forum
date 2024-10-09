import NotFound from '@/components/NotFound'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Not Found',
}

const NoFound = () => {
  return <NotFound />
}

export default NoFound
