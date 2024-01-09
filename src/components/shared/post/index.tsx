import CommentsLogic from '@/components/CommentsLogic'
import ReactionDetails from '@/components/ReactionDetails'
import { getChannels } from '@/services/channel/channel'
import { getComment, getPostsComments } from '@/services/comments'
import { getPostByPostId } from '@/services/posts'
import { timeFormatInHours } from '@/utils/helper'
import { cookies } from 'next/headers'
import Image from 'next/image'
import ChannelPill from '../ChannelPill'
import { CustomLink } from '../customLink/CustomLink'

async function Post({ isDialogPost = false, postId, searchParams }: any) {
  const userDetailsCookies = cookies().get('user-details')

  const { post } = await getPostByPostId(postId, {
    loadUser: true,
    userId:
      userDetailsCookies &&
      (JSON?.parse(userDetailsCookies?.value!)?.id || undefined),
  })
  const commentId = searchParams?.commentId
  const replyId = searchParams?.replyId
  const { channels } = await getChannels()

  let commentResult
  let paginationResult

  if (commentId) {
    const { comment } = await getComment(commentId, {
      loadNestedComments: replyId ? true : false,
      allReplies: replyId ? true : false,
    })
    commentResult = [comment]
  } else {
    let { comments, pagination } = await getPostsComments(postId, {})
    commentResult = comments
    paginationResult = pagination
  }
  return (
    <div
      className={`mx-auto max-w-5xl rounded-full ${
        isDialogPost ? 'mb-5' : 'my-5'
      }`}>
      <div
        className={`mx-auto mb-5 flex max-w-screen-lg rounded-xl bg-white
      ${!isDialogPost && 'shadow-lg'} 
      dark:bg-dark-background dark:text-gray-300`}>
        <div
          className={`flex w-full flex-col  pt-0 ${
            isDialogPost ? '' : 'p-10'
          }`}>
          <div
            className={`${
              !isDialogPost ? 'mt-6' : ''
            } items-left flex justify-between max-md:block`}>
            <div className="flex items-center">
              <div className="-z-2">
                <div className="static rounded-full">
                  <Image
                    src={`${post?.author_details?.profile_picture_url}`}
                    className="h-16 w-16 rounded-full"
                    alt="avatar"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              <div className="ml-2 flex flex-col items-start align-baseline">
                <div className="flex flex-row">
                  <CustomLink href={`/profile/${post?.user_id}`}>
                    <p
                      className="w-full text-sm font-normal leading-none text-gray-900 hover:bg-gray-200  dark:text-gray-300"
                      aria-label="user-name">
                      {post?.author_details?.name}
                    </p>
                  </CustomLink>
                  <ChannelPill
                    channel_id={post.channel_id}
                    channels={channels}
                  />
                </div>

                <p className="text-xs font-light text-slate-500 dark:text-gray-400">
                  {timeFormatInHours(post.created_at)}
                </p>
              </div>
            </div>
          </div>

          <ReactionDetails reactionSummary={post.reaction_summary} />

          <div className="mt-2 text-left text-4xl">{post.title}</div>
          <div
            className="mt-0 h-full w-full p-7 pl-0 pt-3 text-left leading-loose text-gray-600 dark:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div>
            {post.image_url ? (
              <Image
                src={post.image_url}
                style={{ objectFit: 'fill' }}
                alt="Picture of the author"
                className="mb-7"
                width={300}
                height={400}
              />
            ) : null}
          </div>
          <div className="w-full">
            <hr className="mx-10" />

            <CommentsLogic
              postId={postId}
              commentResult={commentResult}
              paginationResult={paginationResult}
              bookmark={post?.user_has_bookmarked}
              user_reaction={post?.user_reaction}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
