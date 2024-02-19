import SinglePost from '@/components/SinglePost'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Feed',
}

const SingleFeedpage = ({ params, searchParams }: any) => {
  const id = params.id
  return <SinglePost postId={id} searchParams={searchParams} />
}

export default SingleFeedpage
