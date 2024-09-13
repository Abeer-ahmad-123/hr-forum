'use client'
import ReactionDetails from '@/components/ReactionDetails'
import CommentsLogic from '@/components/CommentsLogic'
import Report from '@/components/Report/Report'
import type { SinglePostWithDialogProps } from '@/components/SinglePostWithDialog'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { getChannels } from '@/services/channel/channel'
import { getComment, getPostsComments } from '@/services/comments'
import { getPostByPostId } from '@/services/posts'
import { setCommentCountInStore, setPosts } from '@/store/Slices/postSlice'
import {
  returnFilteredPosts,
  showErrorAlert,
  updatePostBookmark,
} from '@/utils/helper'
import type { ReactionSummary } from '@/utils/interfaces/card'
import type { ChannelInterface } from '@/utils/interfaces/channels'
import type { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import type {
  CommentCount,
  CommentCountStore,
  CommentInterface,
  PostsInterface,
  PostsInterfaceStore,
} from '@/utils/interfaces/posts'
import { SearchParams } from '@/utils/interfaces/renderFeeds'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
  redirect,
} from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import SignInDialog from '../new-post/SignInDialog'
import ArrowLeft from '@/assets/icons/ArrowLeftIcon'
import DeletePost from './DeletePost'
import PostSkelton from './PostSkelton'
import ProfileImage from './ProfileImage'
import UserInteraction from '@/components/UserInteraction'
import Card from '../Card'

type Props = Omit<SinglePostWithDialogProps, 'id'> & {
  postId: string
  isDialogPost?: boolean
  searchParams?: { commentId?: string; replyId?: string } | SearchParams
}
const Post = ({ isDialogPost = false, postId, searchParams, data }: Props) => {
  const { id } = useParams()
  postId = postId ? postId : String(id)
  const paramsSearch = useSearchParams()
  const isFirstRef = useRef(true)
  // * State to show more / less post content.
  const [showFullPost, setShowFullPost] = useState(false)

  const [commentResult, setCommentResult] = useState<CommentInterface[] | null>(
    data?.comments?.comments ?? null,
  )
  const [reactionSummary, setReactionSummary] = useState<ReactionSummary>({
    like_count: 0,
    love_count: 0,
    clap_count: 0,
    celebrate_count: 0,
  })
  const [paginationResult, setPaginationResult] = useState(
    data?.comments?.pagination,
  )
  const [commentCount, setCommentCount] = useState<CommentCount>(
    data ? { [data.post.id]: data?.post?.total_comments } : {},
  )
  const dispatch = useDispatch()
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const [reported, setReported] = useState<boolean>(false)
  const commentCountInStore = useSelector(
    (state: CommentCountStore) => state.posts.commentCount,
  )

  const [channels, setChannels] = useState<ChannelInterface[] | []>([])
  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )
  const [post, setPost] = useState<PostsInterface | null>(data?.post ?? null)
  const [popOver, setPopOver] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
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
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false) // TODO
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

  const userId = userDetails?.id

  const getPost = async () => {
    const response = await getPostByPostId(postId ? String(postId) : '', {
      loadUser: true,
      userId: userId,
    })
    if (!response.success) {
      router.push('/feeds')
    }

    setPost(response?.data?.post)

    dispatch(
      setCommentCountInStore({
        [postId]: response?.data?.post?.total_comments,
      }),
    )
    setBookmarkSuccess(response?.data?.post?.user_has_bookmarked)
  }

  const commentId =
    (searchParams as { commentId: string })?.commentId ??
    Number(paramsSearch.get('commentId'))
  const replyId =
    (searchParams as { replyId: string })?.replyId ??
    Number(paramsSearch.get('replyId'))

  const getPostComments = async () => {
    if (commentId) {
      const { comment } = await getComment(
        commentId ? String(commentId) : '',
        userId,
        {
          loadNestedComments: replyId ? true : false,
          allReplies: replyId ? true : false,
        },
      )
      setCommentResult(comment)
    } else {
      let { comments, pagination } = await getPostsComments(
        String(postId),
        userId,
        {},
      )
      setCommentResult(comments)
      setPaginationResult(pagination)
    }
  }

  const getChannel = async () => {
    try {
      const { channels: channelsData } = await getChannels()
      setChannels(channelsData)
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

  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setPopOver(false)

    if (!tokenInRedux) {
      setShowSignModal(true)
    } else {
      setOpenDeleteDialog(true)
    }
  }

  const handleBookmark = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    if (tokenInRedux) {
      const getApi = bookmarkSuccess ? deleteBookmarkPost : bookmarkPost
      try {
        const res = await getApi(
          String(postId),
          customFetch,
          tokenInRedux,
          refreshTokenInRedux,
        )
        if (res.success) {
          setBookmarkSuccess(true)
          dispatch(
            setPosts(updatePostBookmark(storePosts, Number(postId), true)),
          )
        } else if (res.status === 204) {
          setBookmarkSuccess(false)
          dispatch(
            setPosts(updatePostBookmark(storePosts, Number(postId), false)),
          )
          if (pathname.includes('saved')) {
            dispatch(setPosts(returnFilteredPosts(storePosts, Number(postId))))
            router.back()
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
  const handleBack = () => {
    router.back()
  }
  useEffect(() => {
    if (commentId || postId) getPostComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId, postId, userDetails])

  useEffect(() => {
    if (!data) getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, userDetails, reported])

  useEffect(() => {
    if (!channels.length) getChannel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCommentCount(commentCountInStore)
  }, [commentCountInStore])

  useEffect(() => {
    if (post?.user_has_bookmarked) setBookmarkSuccess(post?.user_has_bookmarked)
  }, [post])

  const reactionSummaryToUse = isFirstRef.current
    ? data?.post?.reaction_summary
    : reactionSummary

  return post && post?.author_details?.name && commentResult !== null ? (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white sm:max-w-[500px]">
          <Report
            reportType="post"
            setOpenDialog={setOpenDialog}
            postId={postId ? String(postId) : ''}
            getPostCommets={() => {}}
            setReported={setReported}
            setReportedReplyId={() => {}}
            setDeletedCommentId={() => {}}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="bg-white sm:max-w-[500px]">
          <DeletePost
            setOpenDeleteDialog={setOpenDeleteDialog}
            postId={post?.id as unknown as string}
            setReported={() => {}}
            updatePosts={() => {}}
          />
        </DialogContent>
      </Dialog>
      <div
        className={`mx-auto max-w-5xl  rounded-full ${
          isDialogPost ? 'mb-5' : 'my-5'
        }`}>
        <div
          className={`mx-auto mb-5 flex max-w-[759px] rounded-[16px] bg-white 
      ${
        !isDialogPost &&
        'border border-gray-200  shadow-lg dark:border-gray-700 dark:shadow-xl'
      } 
      dark:bg-dark-background dark:text-gray-300 `}>
          <div
            // className={`flex w-full flex-col  pt-0 ${
            //   isDialogPost ? '' : 'p-10 max-custom-sm:px-2'
            // }`}>
            // <div
            //   className={`${
            //     !isDialogPost ? 'mt-6' : ''
            //   } items-left flex flex-row items-center justify-between pt-1`}>
            //   <div className="flex items-center">
            //     <div className="-z-2">
            //       <div className="static rounded-full">
            //         <ProfileImage
            //           imgSrc={post?.author_details?.profile_picture_url}
            //           postUserId={post?.user_id as unknown as string}
            //         />
            //       </div>
            //     </div>

            //     <div className="ml-2 flex flex-col items-start align-baseline">
            //       <div className="flex flex-row flex-wrap items-center">
            //         <CustomLink href={`/profile/${post?.user_id}`}>
            //           <p
            //             onClick={deleteModalState}
            //             className="w-full pr-1 text-sm font-normal leading-none text-gray-900  hover:underline dark:text-gray-300 max-custom-sm:text-[11px]
            //            max-[392px]:text-[10px] max-custom-sx:text-[8px]"
            //             aria-label="user-name">
            //             {/*
            //              * "You" is based on user_id not on username what if i change username the "You" will also be changed.
            //              */}
            //             {userDetails?.id &&
            //             String(post?.user_id) === String(userDetails?.id)
            //               ? 'You'
            //               : post?.author_details?.name}
            //           </p>
            //         </CustomLink>
            //         <ChannelPill
            //           channel_id={String(post?.channel_id)}
            //           channels={channels}
            //         />
            //       </div>

            //       <p className="justify-start text-[0.70rem] font-light text-slate-500 dark:text-gray-400 max-custom-sm:text-[9px] max-[392px]:text-[9px] max-custom-sx:text-[7px]">
            //         {timeFormatInHours(post?.created_at as unknown as Date)}
            //       </p>
            //     </div>
            //   </div>

            //   {/* ////// */}

            //   <div className="mt-[-12px] flex  max-[392px]:mr-[7px]">
            //     {post?.user_has_reported && (
            //       <div className="flex h-6 w-fit cursor-default items-center justify-center rounded-md p-1 text-[7px] font-medium text-gray-500">
            //         <div className="group relative inline-block text-black dark:text-white">
            //           <AlertOctagon
            //             size={15}
            //             className="h-4 w-4 cursor-pointer max-custom-sm:block max-custom-sm:w-[14px] max-[380px]:w-3 max-custom-sx:w-[10px]"
            //           />
            //           <div className="absolute bottom-full hidden -translate-x-1/2 transform whitespace-nowrap rounded-xl bg-gray-400 px-[5px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[0px]">
            //             Reported
            //           </div>
            //         </div>
            //       </div>
            //     )}

            //     <div onMouseLeave={handleMouseDown}>
            //       <Popover open={popOver} onOpenChange={setPopOver}>
            //         <PopoverTrigger
            //           className="flex"
            //           name="more option button"
            //           aria-label="more option"
            //           aria-labelledby="moreOptionLabel"
            //           role="button">
            //           <span
            //             className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black"
            //             onClick={setOpenPopOver}>
            //             <MoreHorizontal className="h-6 w-6 font-light max-[380px]:w-[1.05rem] max-custom-sx:w-[15px]" />
            //           </span>
            //         </PopoverTrigger>
            //         <PopoverContent className="bg-white">
            //           {(post.user_id as unknown as string) ===
            //           userDetails.id ? (
            //             <div
            //               className="dark:text-icon-dark text-icon-light pyrepo-2 flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-accent hover:text-white dark:text-white dark:hover:text-white"
            //               onClick={handleDeleteClick}>
            //               <Trash2 size={17} />
            //               <span className="text-[15px] font-light max-custom-sm:hidden">
            //                 {' '}
            //                 Delete
            //               </span>
            //             </div>
            //           ) : (
            //             <div
            //               className=" dark:text-icon-dark text-icon-light pyrepo-2 flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-accent hover:text-white dark:text-gray-300"
            //               onClick={handleReportClick}>
            //               <AlertOctagon size={17} />
            //               <span className="text-[15px] font-light max-custom-sm:hidden">
            //                 {' '}
            //                 Report
            //               </span>
            //             </div>
            //           )}
            //           <div
            //             onClick={handleBookmark}
            //             className="dark:text-icon-dark text-icon-light flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-accent hover:text-white dark:text-gray-300">
            //             {bookmarkSuccess ? (
            //               <FaBookmark color="blue" />
            //             ) : (
            //               <FaRegBookmark />
            //             )}
            //             <span className="text-[15px] font-light max-custom-sm:hidden ">
            //               Bookmark
            //             </span>
            //           </div>
            //         </PopoverContent>
            //       </Popover>
            //     </div>
            //   </div>

            //   {/*  */}
            // </div>

            // <ReactionDetails reactionSummary={reactionSummaryToUse} />

            // <div className="mt-2 text-left text-xl max-custom-sm:text-base ">
            //   {post?.title}
            // </div>
            // <>
            //   <div
            //     className="card-li mt-0 h-full w-full p-7 pl-0 pt-3 text-left text-base leading-loose text-gray-600 dark:text-white max-custom-sm:text-[13px]"
            //     dangerouslySetInnerHTML={{
            //       __html: `${
            //         post?.content
            //           ? post.content
            //               .slice(0, showFullPost ? -1 : 400)
            //               .concat(
            //                 showFullPost
            //                   ? ''
            //                   : post?.content.length > 400
            //                   ? '<span className="text-gray-500">....</span>'
            //                   : '',
            //               )
            //           : null
            //       }`,
            //     }}
            className={`flex w-full flex-col gap-5  pt-0 ${
              isDialogPost ? '' : 'px-[24px] pb-[20px] pt-[28px]'
            }`}>
            <button
              onClick={handleBack}
              className="flex h-[40px]  w-[104px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] bg-bg-tertiary  px-[15px] py-[8px] text-[12px] opacity-60 dark:text-white  ">
              <ArrowLeft className="text-black opacity-60 dark:text-white" />{' '}
              <span className="tetx-black dark:text-white">Go back</span>
            </button>

            <div className="w-full ">
              <Card
                key={1}
                post={post}
                channels={channels}
                hideComments="w-full "
              />
            </div>
            {/* <ReactionDetails reactionSummary={reactionSummary} /> */}

            {/* <div className="mt-2 text-left text-xl max-custom-sm:text-base ">
              {post?.title}
            </div> */}

            {/* <div>
              {post?.image_url ? (
                <img
                  src={post?.image_url}
                  alt="Picture of the author"
                  height={400}
                  width={400}
                  className="mx-auto mb-7 h-full max-h-[400px] object-contain"
                />
              ) : null}
            </div> */}
            {/* <span className="cursor-pointer text-start text-xs text-slate-400 max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px]">
              {commentCount[Number(postId)] > 0 && (
                <>
                  {commentCount[Number(postId)]}
                  {` comment${commentCount[Number(postId)] > 1 ? 's' : ''}`}
                </>
              )}
            </span> */}
            <div className="w-full">
              {/* <hr />

              <UserInteraction */}
              <CommentsLogic
                postId={postId}
                commentResult={data?.comments?.comments || commentResult}
                paginationResult={
                  data?.comments?.pagination || paginationResult
                }
                user_reaction={post?.user_reaction}
                reaction_summary={post?.reaction_summary}
                getPostCommets={getPostComments}
                reactionSummary={reactionSummary}
                setReactionSummary={setReactionSummary}
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
