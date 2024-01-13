import Post from '@/components/shared/post'

function page({ params }: any) {
  const id = params.id
  return <Post postId={id} />
}

export default page
