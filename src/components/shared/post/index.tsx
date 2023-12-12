import UpdownButton from '../../ui/updownButton'
import Image from 'next/image'
import picture from '@/assets/avatars/img.jpeg'
import { getPostByPostId } from '@/services/posts'
import Comments from './Comments'
import { getPostsComments } from '@/services/comments'

async function Post({ isDialogPost = false, postId }: any) {
  const { post } = await getPostByPostId(postId, {})
  console.log(post)
  const { comments, pagination } = await getPostsComments(postId, {})
  return (
    <div className="mx-auto my-5 max-w-5xl rounded-full ">
      <div
        className={`mx-auto mb-5 flex max-w-screen-lg cursor-pointer rounded-xl bg-white
      ${!isDialogPost && 'shadow-lg'} 
      dark:bg-dark-background dark:text-gray-300`}>
        <div className="mt-6">
          <UpdownButton count={post['reaction_summary']['like_count']} />
        </div>
        <div className="flex w-full flex-col items-center p-10 pt-0">
          <div className="mt-6 flex w-full">
            <div className="text-left   text-4xl font-bold dark:text-white">
              {post.title!}{' '}
            </div>
            <div className="flex w-full	 place-content-around items-center">
              <div
                aria-label="channel-name"
                className={`h-fit w-max whitespace-nowrap rounded-lg bg-accent px-6 py-1 text-sm font-semibold text-white dark:bg-dark-background-secondary dark:text-white`}>
                QUESTION
              </div>
              <div className="flex h-10 items-center p-1.5">
                <Image
                  src="https://avatar.iran.liara.run/public/boy"
                  className="h-8 w-8"
                  alt="avatar"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
          <div
            className="mt-0 h-full w-full p-7 pl-0 pt-3 text-left leading-loose text-gray-600 dark:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div>
            {!!post.image ? (
              <Image
                src={picture}
                style={{ objectFit: 'fill' }}
                alt="Picture of the author"
                className="mb-7"
              />
            ) : null}
          </div>
          <div className="mb-9 w-full border-b border-gray-500 pr-5"></div>
          <div className="w-full">
            <Comments
              postId={postId}
              initialComments={comments}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
