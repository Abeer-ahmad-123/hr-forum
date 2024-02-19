import SinglePost from '@/components/SinglePost'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Saved - Post',
}

const SingleFeedPage = ({ params, searchParams }: any) => {
  const id = params.id

  return <SinglePost postId={id} searchParams={searchParams} />
}

export default SingleFeedPage
