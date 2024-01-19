'use client'
import CommentsLogic from '@/components/CommentsLogic'
import ReactionDetails from '@/components/ReactionDetails'
import { getComment, getPostsComments } from '@/services/comments'
import { timeFormatInHours } from '@/utils/helper'
// import { cookies } from 'next/headers'
import { getChannels } from '@/services/channel/channel'
import { getPostByPostId } from '@/services/posts'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { AlertOctagon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelPill from '../ChannelPill'
import { CustomLink } from '../customLink/CustomLink'
import PostSkelton from './PostSkelton'
import ProfileImage from './ProfileImage'
import { useRouter } from 'next/navigation'

function Post({ isDialogPost = false, postId, searchParams }: any) {
  // const userDetailsCookies = cookies().get('user-details')

  const [commentResult, setCommentResult] = useState<Array<object>>([])
  const [paginationResult, setPaginationResult] = useState()
  const [post, setPost] = useState<PostsInterface>()
  const [channel, setChannel] = useState<ChannelInterface>()
  const router = useRouter()
  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )

  const userId = userDetails?.id

  const getPost = async () => {
    const { post: postData } = await getPostByPostId(postId, {
      loadUser: true,
      userId: userId,
    })
    setPost(postData)
  }

  const commentId = searchParams?.commentId
  const replyId = searchParams?.replyId

  const getPostCommets = async () => {
    if (commentId) {
      const { comment } = await getComment(commentId, userId, {
        loadNestedComments: replyId ? true : false,
        allReplies: replyId ? true : false,
      })
      setCommentResult(comment)
    } else {
      let { comments, pagination } = await getPostsComments(postId, userId, {})
      setCommentResult(comments)
      setPaginationResult(pagination)
    }
  }

  const getChannel = async () => {
    try {
      const { channels: channelsData } = await getChannels()
      setChannel(channelsData)
    } catch (error) {
      if (error instanceof Error && error.message) {
        router.push('/error')
      }
    }
  }

  useEffect(() => {
    if (commentId || postId) getPostCommets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId, postId, userDetails])

  useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, userDetails])

  useEffect(() => {
    getChannel()
  }, [])

  return post?.author_details?.name && post ? (
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
            } items-left flex flex-row items-center justify-between`}>
            <div className="flex items-center">
              <div className="-z-2">
                <div className="static rounded-full">
                  <ProfileImage
                    imgSrc={post?.author_details?.profile_picture_url}
                    postUserId={post?.user_id as unknown as string}
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
                    channel_id={post?.channel_id}
                    channels={channel}
                  />
                </div>

                <p className="text-[10px] font-light text-slate-500 dark:text-gray-400 max-[380px]:text-[8px] md:text-[10px] lg:text-xs xl:text-xs">
                  {timeFormatInHours(post?.created_at as unknown as Date)}
                </p>
              </div>
            </div>

            {/* ////// */}

            {post?.user_has_reported && (
              <div className="flex h-6 w-fit cursor-default items-center justify-center rounded-md  p-1 text-[7px] font-medium text-gray-500 ring-inset ring-gray-500/10 custom-sm:ring-1">
                {/*  */}
                <div className="group relative inline-block">
                  <AlertOctagon
                    size={15}
                    className="hidden cursor-pointer max-custom-sm:block"
                  />
                  <div className="absolute bottom-full left-[50px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 px-[5px] py-[2px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[50px]">
                    Reported
                  </div>
                </div>
                {/*  */}

                <span className="text-[0.65rem] max-custom-sm:hidden">
                  Reported
                </span>
              </div>
            )}
          </div>

          <ReactionDetails reactionSummary={post?.reaction_summary} />

          <div className="mt-2 text-left text-4xl">{post?.title}</div>
          <div
            className="mt-0 h-full w-full p-7 pl-0 pt-3 text-left leading-loose text-gray-600 dark:text-white"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
          <div>
            {post?.author_details?.profile_picture_url ? (
              <img
                src={post?.author_details?.profile_picture_url}
                style={{ objectFit: 'fill' }}
                alt="Picture of the author"
                className="mb-7"
                width={300}
                height={400}
              />
            ) : null}
          </div>
          <div className="w-full">
            <hr />

            <CommentsLogic
              postId={postId}
              commentResult={commentResult}
              paginationResult={paginationResult}
              bookmark={post?.user_has_bookmarked}
              user_reaction={post?.user_reaction}
              getPostCommets={getPostCommets}
              getPost={getPost}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PostSkelton />
  )
}

export default Post
