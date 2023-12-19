import Post from '@/components/shared/post'
import React from 'react'

function page({ params }: any) {
  const id = params.id
  return <Post postId={id} />
}

export default page
