import SingleFeedPostWithDialog from '@/components/SinglePostWithDialog'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Saved - Post',
}

const SingleFeedRoute = ({ params }: any) => {
  const { id } = params

  return <SingleFeedPostWithDialog id={id} />
}
export default SingleFeedRoute
