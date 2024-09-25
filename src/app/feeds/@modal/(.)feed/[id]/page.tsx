import SingleFeedPostWithDialog from '@/components/SinglePostWithDialog'
import { getPostsComments } from '@/services/comments'
import { getPostByPostId } from '@/services/posts'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'HR-Forum - Feed- Post',
}

const SingleFeedRoute = async ({ params }: any) => {
  const { id } = params
  const getPostComments = async () => {
    let { comments, pagination } = await getPostsComments(id, {}, '')
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

  return <SingleFeedPostWithDialog id={id} data={data} />
}
export default SingleFeedRoute
