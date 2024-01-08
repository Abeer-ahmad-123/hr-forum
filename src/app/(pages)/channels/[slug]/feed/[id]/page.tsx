import Post from '@/components/shared/post'

function page({ params }: any) {
  const id = params.id
  return (
    <div key={Math.random()}>
      <Post postId={id} />
    </div>
  )
}

export default page
