'use client'
import CommentsLogic from '@/components/CommentsLogic'
import ReactionDetails from '@/components/ReactionDetails'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useInterceptor } from '@/hooks/interceptors'
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { getChannels } from '@/services/channel/channel'
import { getComment, getPostsComments } from '@/services/comments'
import { getPostByPostId } from '@/services/posts'
import { showErrorAlert, timeFormatInHours } from '@/utils/helper'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface } from '@/utils/interfaces/posts'
import { AlertOctagon, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import ChannelPill from '../ChannelPill'

import Report from '@/components/Report/Report'
import { CustomLink } from '../customLink/CustomLink'
import SignInDialog from '../new-post/SignInDialog'
import PostSkelton from './PostSkelton'
import ProfileImage from './ProfileImage'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'

function Post({ isDialogPost = false, postId, searchParams }: any) {
  const [commentResult, setCommentResult] = useState<Array<object> | null>(null)

  const [paginationResult, setPaginationResult] = useState()
  const [commentCount, setCommentCount] = useState<number>(0)
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const [reported, setReported] = useState<boolean>(false)

  const [post, setPost] = useState<PostsInterface>()
  const [channel, setChannel] = useState<ChannelInterface>()
  const [popOver, setPopOver] = useState<boolean>(false)
  const router = useRouter()
  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser?.userData,
  )
  const { handleRedirect } = useFetchFailedClient()

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const { customFetch } = useInterceptor()
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOver(false)
  }

  const userId = userDetails?.id

  const getPost = async () => {
    const { post: postData } = await getPostByPostId(postId, {
      loadUser: true,
      userId: userId,
    })
    setPost(postData)
  }
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false) // TODO

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
        handleRedirect({ error })
      }
    }
  }
  const setOpenPopOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setPopOver((pre) => !pre)
  }

  const handleReportClick = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    setPopOver(false)

    if (!tokenInRedux) {
      setShowSignModal(true)
    } else {
      setOpenDialog(true)
    }
  }
  const handleBookmark = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    if (tokenInRedux) {
      const getApi = bookmarkSuccess ? deleteBookmarkPost : bookmarkPost
      try {
        const res = await getApi(
          postId,
          customFetch,
          tokenInRedux,
          refreshTokenInRedux,
        )
        if (res.success) {
          if (res.data) {
            setBookmarkSuccess(true)
          } else if (res.status === 200 || res.status === 204) {
            setBookmarkSuccess(false)
          }
        } else {
          throw res.errors[0]
        }
      } catch (error) {
        if (error instanceof Error) {
          handleRedirect({ error })
          showErrorAlert(`${error}`)
        }
      }
    } else {
      setShowSignModal(true)
    }
  }

  useEffect(() => {
    if (commentId || postId) getPostCommets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId, postId, userDetails])

  useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, userDetails, reported])

  useEffect(() => {
    getChannel()
  }, [])
  useEffect(() => {
    setCommentCount(post?.total_comments ?? 0)
  }, [post])

  return post && post?.author_details?.name && commentResult !== null ? (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white sm:max-w-[500px]">
          <Report
            reportType="post"
            setOpenDialog={setOpenDialog}
            postId={postId}
            getPostCommets={() => {}}
            setReported={setReported}
            setReportedReplyId={() => {}}
            setReportedCommentId={() => {}}
          />
        </DialogContent>
      </Dialog>
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
              isDialogPost ? '' : 'p-10 max-custom-sm:px-2'
            }`}>
            <div
              className={`${
                !isDialogPost ? 'mt-6' : ''
              } items-left flex flex-row items-center justify-between pt-1`}>
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
                  <div className="flex flex-row items-center">
                    <CustomLink href={`/profile/${post?.user_id}`}>
                      <p
                        className="w-full text-sm font-normal leading-none text-gray-900 hover:bg-gray-200  dark:text-gray-300 max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]"
                        aria-label="user-name">
                        {post?.author_details?.name === userDetails?.name
                          ? 'You'
                          : post?.author_details?.name}
                      </p>
                    </CustomLink>
                    <ChannelPill
                      channel_id={post?.channel_id}
                      channels={channel}
                    />
                  </div>

                  <p className="justify-start text-[0.70rem] font-light text-slate-500 dark:text-gray-400 max-custom-sm:text-[9px] max-[392px]:text-[9px] max-custom-sx:text-[7px]">
                    {timeFormatInHours(post?.created_at as unknown as Date)}
                  </p>
                </div>
              </div>

              {/* ////// */}

              <div className="mt-[-12px] flex  max-[392px]:mr-[7px]">
                {post?.user_has_reported && (
                  <div className="flex h-6 w-fit cursor-default items-center justify-center rounded-md p-1 text-[7px] font-medium text-gray-500">
                    <div className="group relative inline-block">
                      <AlertOctagon
                        size={15}
                        className="h-4 w-4 cursor-pointer max-custom-sm:block max-custom-sm:w-[14px] max-[380px]:w-3 max-custom-sx:w-[10px]"
                      />
                      <div className="absolute bottom-full hidden -translate-x-1/2 transform whitespace-nowrap rounded-xl bg-gray-400 px-[5px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[0px]">
                        Reported
                      </div>
                    </div>
                  </div>
                )}

                <div onMouseLeave={handleMouseDown}>
                  <Popover open={popOver} onOpenChange={setPopOver}>
                    <PopoverTrigger className="flex">
                      <span
                        className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black"
                        onClick={setOpenPopOver}>
                        <MoreHorizontal className="h-6 w-6 font-light max-[380px]:w-[1.05rem] max-custom-sx:w-[15px]" />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white">
                      <div
                        className=" dark:text-icon-dark text-icon-light pyrepo-2 flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-gray-300 dark:text-gray-300  dark:hover:text-slate-800"
                        onClick={handleReportClick}>
                        <AlertOctagon size={17} />
                        <span className="text-[15px] font-light max-custom-sm:hidden">
                          {' '}
                          Report
                        </span>
                      </div>
                      <div
                        onClick={handleBookmark}
                        className="dark:text-icon-dark text-icon-light flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-gray-300 dark:text-gray-300  dark:hover:text-slate-800">
                        {bookmarkSuccess ? (
                          <FaBookmark color="blue" />
                        ) : (
                          <FaRegBookmark />
                        )}
                        <span className="text-[15px] font-light max-custom-sm:hidden ">
                          Bookmark
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/*  */}
            </div>

            <ReactionDetails reactionSummary={post?.reaction_summary} />

            <div className="mt-2 text-left text-xl max-custom-sm:text-base ">
              {post?.title}
            </div>
            <div
              className="mt-0 h-full w-full p-7 pl-0 pt-3 text-left text-base leading-loose text-gray-600 dark:text-white max-custom-sm:text-[13px]"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
            <div>
              {post?.image_url ? (
                <img
                  src={post?.image_url}
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
                setCommentCount={setCommentCount}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </>
  ) : (
    <PostSkelton />
  )
}

export default Post
