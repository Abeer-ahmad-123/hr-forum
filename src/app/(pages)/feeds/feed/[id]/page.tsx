import Post from '@/components/shared/post'

const SingleFeed = ({ params }: any) => {
  const id = params.id
  return <Post postId={id} />
}

export default SingleFeed
