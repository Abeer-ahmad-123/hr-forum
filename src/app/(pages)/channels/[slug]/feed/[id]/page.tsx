import SinglePost from '@/components/SinglePost'
import { capitalizeWord } from '@/utils/helper'

export function generateMetadata({ params }: any) {
  return {
    title: `HR-Forum - ${capitalizeWord(params.slug)} - Post`,
  }
}

const SingleFeedPage = ({ params, searchParams }: any) => {
  const id = params.id

  return <SinglePost postId={id} searchParams={searchParams} />
}

export default SingleFeedPage
