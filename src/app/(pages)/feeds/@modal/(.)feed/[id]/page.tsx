import SingleFeedPostWithDialog from '@/components/SinglePostWithDialog'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Feed- Post',
}

const SingleFeedRoute = ({ params }: any) => {
  const { id } = params
  // * Set the modal to open by default
  return <SingleFeedPostWithDialog id={id} defaultOpen={true} />
}
export default SingleFeedRoute
