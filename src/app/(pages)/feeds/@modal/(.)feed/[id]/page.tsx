import SingleFeedPostWithDialog from '@/components/SinglePostWithDialog'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Feed- Post',
}

const SingleFeedRoute = ({ params }: any) => {
  const { id } = params

  return <SingleFeedPostWithDialog id={id} />
}
export default SingleFeedRoute
