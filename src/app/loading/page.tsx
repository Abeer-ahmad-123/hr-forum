import NewLoading from '@/components/NewLoading/NewLoading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Loading',
}

const NewLoadingPage = async () => {
  return <NewLoading />
}

export default NewLoadingPage
