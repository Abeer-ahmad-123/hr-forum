import Post from '@/components/shared/post'

const SingleFeed = ({ params, searchParams }: any) => {
  const id = params.id

  return (
    <div key={Math.random()}>
      <Post postId={id} searchParams={searchParams} />
    </div>
  )
}

export default SingleFeed
