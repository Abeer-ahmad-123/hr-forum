import SinglePost from '@/components/SinglePost'

const Default = ({ params, searchParams }: any) => {
  const id = params.id

  return <SinglePost postId={id} searchParams={searchParams} />
}

export default Default
