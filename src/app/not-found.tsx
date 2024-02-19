import NotFound from '@/components/NotFound'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - 404',
}

const NotFoundPage = () => {
  return <NotFound />
}

export default NotFoundPage
