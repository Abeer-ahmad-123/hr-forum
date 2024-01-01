import Post from '@/components/shared/post'

const SingleFeed = ({ params, searchParams }: any) => {
  const id = params.id

  return <Post key={Math.random()} postId={id} searchParams={searchParams} />
}

export default SingleFeed
