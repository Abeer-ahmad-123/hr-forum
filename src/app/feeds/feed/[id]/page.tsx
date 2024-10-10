import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import SinglePost from '@/components/SinglePost'
import { getPostByPostId } from '@/services/posts'
import { getPostsComments } from '@/services/comments'

export const metadata: Metadata = {
  title: 'HR-Forum - Feed - Post',
}

const SingleFeedpage = async ({ params, searchParams }: any) => {
  const id = params.id
  const getPostComments = async () => {
    let { comments, pagination } = await getPostsComments(id, {}, undefined)
    return { comments, pagination }
  }
  const getPost = async () => {
    const response = await getPostByPostId(id, {
      loadUser: true,
      userId: '',
    })
    if (!response.success) {
      throw redirect('/feeds')
    }
    return response?.data?.post
  }
  const data = {
    post: await getPost(),
    comments: await getPostComments(),
  }
  return <SinglePost postId={id} searchParams={searchParams} data={data} />
}

export default SingleFeedpage
