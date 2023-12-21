import UpdownButton from '../../ui/updownButton'
import Image from 'next/image'
import picture from '@/assets/avatars/img.jpeg'
import { getPostByPostId } from '@/services/posts'
import Comments from './Comments'
import { getComment, getPostsComments } from '@/services/comments'
import PostReactionBar from '../PostReactionBar'
import PostActionBar from '../PostActionBar'
import ReactionDetails from '@/components/ReactionDetails'
import { timeFormatInHours } from '@/utils/helper'
import Link from 'next/link'
import ChannelPill from '../ChannelPill'
import { getChannels } from '@/services/channel/channel'

async function Post({ isDialogPost = false, postId, searchParams }: any) {
  const { post } = await getPostByPostId(postId, {
    loadUser: true,
  })
  const commentId = searchParams?.commentId
  const replyId = searchParams?.replyId
  const { channels } = await getChannels()

  let commentResult
  let paginationResult

  if (commentId) {
    const { comment } = await getComment(commentId, {
      allReplies: replyId ? true : false,
    })
    commentResult = [comment]
  } else {
    let { comments, pagination } = await getPostsComments(postId, {})
    commentResult = comments
    paginationResult = pagination
  }

  return (
    <div className="mx-auto my-5 max-w-5xl rounded-full ">
      <div
        className={`mx-auto mb-5 flex max-w-screen-lg cursor-pointer rounded-xl bg-white
      ${!isDialogPost && 'shadow-lg'} 
      dark:bg-dark-background dark:text-gray-300`}>
        <div className="flex w-full flex-col p-10 pt-0">
          {/* TODO */}

          <div
            className={`${
              !isDialogPost ? 'mt-6' : ''
            } items-left flex justify-between max-md:block`}>
            <div className="flex">
              <div className="-z-2">
                <div className="static rounded-full">
                  <Image
                    src={`${post?.author_details?.profile_picture_url}`}
                    className="h-8 w-8 rounded-full"
                    alt="avatar"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              <div className="ml-2 flex flex-col items-start align-baseline">
                <div className="flex flex-row">
                  <Link href={`/profile/`}>
                    <p
                      className="w-full text-sm font-normal leading-none text-gray-900 hover:bg-gray-200  dark:text-gray-300"
                      aria-label="user-name">
                      {post.author_details.name}

                      {/* Yogesh Choudhary Paliyal */}
                    </p>
                  </Link>
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

          {/* //////// */}

          {/*  */}
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
          {/* <div className="mb-9 w-full border-b border-gray-500 pr-5"></div> */}
          <div className="w-full">
            <PostReactionBar
              reaction_summary={post?.reaction_summary}
              postId={postId}
            />
            <Comments
              postId={postId}
              initialComments={commentResult}
              pagination={paginationResult}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
