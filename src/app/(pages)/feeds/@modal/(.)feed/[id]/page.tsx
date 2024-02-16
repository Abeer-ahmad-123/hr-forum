import SingleFeedPostWithDialog from '@/components/SinglePostWithDialog'

async function SingleFeedRoute({ params }: any) {
  const { id } = params

  return <SingleFeedPostWithDialog id={id} />
}
export default SingleFeedRoute
