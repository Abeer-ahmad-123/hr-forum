'use client'
import { noProfilePicture } from '@/assets/images'
import ChannelPill from '@/components/shared/ChannelPill'
import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import { cn } from '@/lib/utils'
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { setPosts } from '@/store/Slices/postSlice'
import {
  returnFilteredPosts,
  showErrorAlert,
  timeFormatInHours,
  updatePostBookmark,
} from '@/utils/helper'
import { EmojiActionInterface, ReactionSummary } from '@/utils/interfaces/card'
import type {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { PostsInterface, PostsInterfaceStore } from '@/utils/interfaces/posts'
import { AlertOctagon, MoreHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Report from '../Report/Report'
import PostActionBar from './PostActionBar'
import PostReactionBar from './PostReactionBar'
import { CustomLink } from './customLink/CustomLink'
import SignInDialog from './new-post/SignInDialog'
import DeletePost from './post/DeletePost'

type CardProps = {
  post: PostsInterface
  channels: ChannelByIdInterface[] | ChannelInterface[]
  posts: PostsInterface[]
  userComment?: any
  updatePosts: Dispatch<SetStateAction<PostsInterface[]>>
}
const Card = ({
  post,
  channels,
  updatePosts,
  posts,
  userComment,
}: CardProps) => {
  const {
    id,
    created_at,
    title,
    content,
    channel_id,
    author_details: user,
    reaction_summary,
    user_reaction,
    user_has_bookmarked,
    user_has_reported,
    user_id,
    image_url,
  } = post

  const pathName = usePathname()
  const { slug } = useParams()
  const isFirstRef = useRef<boolean>(true)
  const router = useRouter()
  const dispatch = useDispatch()
  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )
  // * Show More / Less state for post content
  const [showFullPost, setShowFullPost] = useState(false)
  const { customFetch } = useInterceptor()
  const { handleRedirect } = useFetchFailedClient()

  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const [popOver, setPopOver] = useState(false)

  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const storePosts = useSelector(
    (state: PostsInterfaceStore) => state.posts.posts,
  )
  const [reactionSummary, setReactionSummary] = useState<ReactionSummary>({
    like_count: 0,
    love_count: 0,
    clap_count: 0,
    celebrate_count: 0,
  })
  const [disableReactionButton, setDisableReactionButton] =
    useState<boolean>(false)
  const [userReaction, setUserReaction] = useState('')

  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [bookmarkSuccess, setBookmarkSuccess] =
    useState<boolean>(user_has_bookmarked)
  const [reported, setReported] = useState<boolean>(user_has_reported)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const reactionRef = useRef<boolean>(false)
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const setOpenPopOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setPopOver((pre) => !pre)
  }

  const updateReactionArray = (
    reactionArray: ReactionSummary,
    reactionObject: EmojiActionInterface,
  ) => {
    if (reactionObject.action === 'post') {
      incrementReactionCount(`${reactionObject.value}_count`)
    } else if (reactionObject.action === 'update') {
      updateReactions(
        `${reactionObject.value}_count`,
        `${reactionObject.previousAction}_count`,
      )
    } else if (reactionObject.action === 'delete') {
      deleteReaction(`${reactionObject.value}_count`)
    }
  }

  const updateReactions = (increment: string, decrement: string) => {
    setReactionSummary({
      ...reactionSummary,
      [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
      [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
    })
  }

  const incrementReactionCount = (increment: string) => {
    setReactionSummary({
      ...reactionSummary,
      [increment]: reactionSummary[increment as keyof ReactionSummary] + 1,
    })
  }
  const deleteReaction = (decrement: string) => {
    setReactionSummary({
      ...reactionSummary,
      [decrement]: reactionSummary[decrement as keyof ReactionSummary] - 1,
    })
  }
  const handleNavigateFeed = () => {
    router.push(
      pathName.includes('channels')
        ? `${pathName}/feed/${id}`
        : pathName.includes('saved')
        ? `/saved/feed/${id}`
        : pathName.includes('user-activity')
        ? `${pathName}/feed/${id}`
        : `/feeds/feed/${id}`,
    )
  }
  const handleNavigateProfile = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    router.push(
      userDetails?.id === String(user_id)
        ? '/profile'
        : `/profile/${user.name?.toLowerCase().replace(/ /g, '-')}-${user_id}`,
    )
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOver(false)
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
          id ? String(id) : '',
          customFetch,
          tokenInRedux,
          refreshTokenInRedux,
        )

        if (res.success) {
          setBookmarkSuccess(true)
          dispatch(setPosts(updatePostBookmark(storePosts, id, true)))
        } else if (res.status === 204) {
          setBookmarkSuccess(false)
          if (pathName.includes('saved')) {
            dispatch(setPosts(returnFilteredPosts(storePosts, Number(id))))
            if (pathName.includes('/saved/feed')) {
              router.back()
            }
          } else {
            dispatch(setPosts(updatePostBookmark(storePosts, id, false)))
          }
        } else {
          throw res.errors[0]
        }
      } catch (error) {
        if (error instanceof Error) {
          handleRedirect({ error })
        }
        showErrorAlert(`${error}`)
      }
    } else {
      setShowSignModal(true)
    }
  }

  function handleShowMoreOrLess(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setShowFullPost((prev) => !prev)
  }
  useEffect(() => {
    if (reaction_summary) {
      setReactionSummary(reaction_summary)
    }
  }, [reaction_summary])

  useEffect(() => {
    setUserReaction(user_reaction)
  }, [user_reaction])

  useEffect(() => {
    setBookmarkSuccess(user_has_bookmarked)
  }, [user_has_bookmarked])

  useEffect(() => {
    setReported(user_has_reported)
  }, [user_has_reported])

  useEffect(() => {
    isFirstRef.current === false
  }, [])

  return (
    <div id={String(id)} key={id} className="m-0 w-full max-w-[100dvw] p-0">
      <div
        className={`border-grey-300 mx-auto mb-5 w-full cursor-pointer rounded-xl border border-solid bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300 md:max-w-screen-md`}>
        <Suspense>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="bg-white sm:max-w-[500px]">
              <Report
                reportType="post"
                setOpenDialog={setOpenDialog}
                postId={id ? String(id) : ''}
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
                postId={id ? String(id) : ''}
                setReported={() => {}}
                updatePosts={updatePosts}
                posts={posts}
              />
            </DialogContent>
          </Dialog>
        </Suspense>
        <div className={cn('px-10 py-4 max-custom-sm:px-6 max-[392px]:px-2')}>
          <div className="flex flex-row justify-between">
            <div className="flex w-full flex-row  items-center justify-between max-custom-sm:items-start">
              <div className="flex items-center">
                <div className="-z-2">
                  <div className="static rounded-xl">
                    <img
                      className="inline-block rounded-full object-contain ring-2 ring-white dark:ring-gray-800 max-custom-sx:h-6 max-custom-sx:w-6"
                      width={32}
                      height={32}
                      src={user?.profile_picture_url || noProfilePicture.src}
                      alt="user-picture"
                      onClick={handleNavigateProfile}
                    />
                  </div>
                </div>

                <div className="ml-2 flex flex-col items-start align-baseline">
                  <div className="flex flex-row flex-wrap items-center">
                    <p
                      className="max-w-full shrink-0 break-all pr-1 text-sm font-normal leading-none text-gray-900 hover:underline dark:text-white max-custom-sm:text-[11px] max-[392px]:text-[10px] max-custom-sx:text-[8px]"
                      aria-label="user-name"
                      onClick={handleNavigateProfile}>
                      {String(userDetails.id) === String(user_id)
                        ? 'You'
                        : user?.name}
                    </p>

                    <ChannelPill
                      channel_id={String(channel_id)}
                      channels={channels}
                    />
                  </div>

                  <p className="justify-start text-[0.70rem] font-light text-slate-500 dark:text-gray-400 max-custom-sm:text-[9px] max-[392px]:text-[9px] max-custom-sx:text-[7px]">
                    {timeFormatInHours(created_at as unknown as Date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {reported && (
                  <div className="flex w-fit cursor-default items-center justify-center rounded-md  p-1 text-[7px] font-medium text-gray-500">
                    <div className="group relative inline-block text-black dark:text-white">
                      <AlertOctagon className=" h-4 w-4 cursor-pointer max-custom-sm:w-[14px] max-[380px]:w-3 max-custom-sx:w-[10px]" />
                      <div className="absolute bottom-full hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 px-[5px] py-[2px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[50px]">
                        Reported
                      </div>
                    </div>
                  </div>
                )}
                {!pathName.includes(`user-activity/${slug}/comment`) && (
                  <div onMouseLeave={handleMouseDown}>
                    <Popover open={popOver} onOpenChange={setPopOver}>
                      <PopoverTrigger
                        className="relative flex"
                        name="post options button"
                        aria-label="post options"
                        aria-labelledby="postOptionsLabel"
                        role="button">
                        <span
                          className="text-icon-light dark:text-icon-dark flex cursor-pointer items-center space-x-2 px-[9px] font-black max-[392px]:px-0"
                          onClick={setOpenPopOver}>
                          <MoreHorizontal className="h-fit w-fit font-light  max-[380px]:w-[1.05rem] max-custom-sx:w-[15px]" />
                        </span>
                      </PopoverTrigger>
                      <Suspense>
                        <PopoverContent className="bg-white">
                          {String(post.user_id) === userDetails?.id ? (
                            <div
                              className="dark:text-icon-dark text-icon-light pyrepo-2 flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-accent hover:text-white dark:text-white dark:hover:text-white"
                              onClick={handleDeleteClick}>
                              <Trash2 size={17} />
                              <span className="text-[15px] font-light max-custom-sm:hidden">
                                {' '}
                                Delete
                              </span>
                            </div>
                          ) : (
                            <div
                              className=" dark:text-icon-dark text-icon-light pyrepo-2 dark:white flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-accent hover:text-white dark:text-white dark:hover:text-white"
                              onClick={handleReportClick}>
                              <AlertOctagon size={17} />
                              <span className="text-[15px] font-light max-custom-sm:hidden">
                                {' '}
                                Report
                              </span>
                            </div>
                          )}
                          <div
                            onClick={handleBookmark}
                            className="dark:text-icon-dark text-icon-light flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-accent hover:text-white dark:text-white dark:hover:text-white">
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
                      </Suspense>
                    </Popover>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="flex max-w-full flex-col hyphens-auto"
            onClick={handleNavigateFeed}>
            <CustomLink
              href={
                pathName.includes('channels')
                  ? `${pathName}/feed/${id}`
                  : pathName.includes('saved')
                  ? `/saved/feed/${id}`
                  : `/feeds/feed/${id}`
              }>
              {' '}
              <div className="my-3 text-start text-xl font-semibold dark:text-white max-custom-sm:text-base">
                <p>{title}</p>
              </div>
            </CustomLink>
            {isHydrated &&
              (!image_url ? (
                <>
                  <div
                    className="card-li max-w-full !hyphens-auto !break-words text-start text-base text-gray-700 dark:text-gray-300 max-custom-sm:text-[13px]"
                    dangerouslySetInnerHTML={{
                      __html: `${
                        content
                          ? content
                              .slice(0, showFullPost ? -1 : 200)
                              .concat(
                                showFullPost
                                  ? ''
                                  : content?.length > 200
                                  ? '<span className="text-gray-500">....</span>'
                                  : '',
                              )
                          : ''
                      }`,
                    }}
                  />
                  {content?.length > 200 && (
                    <button
                      className="text-sm text-gray-500 dark:text-gray-400 lg:text-base"
                      onClick={handleShowMoreOrLess}>
                      Show {showFullPost ? 'Less' : 'More'}
                    </button>
                  )}
                </>
              ) : (
                // * Image consistency for width / height and fill properties
                <Image
                  quality={100}
                  src={image_url}
                  alt="post"
                  height={500}
                  width={500}
                  className="mx-auto h-full max-h-[400px] object-contain"
                />
              ))}
          </div>
        </div>

        <PostReactionBar
          reaction_summary={
            isFirstRef.current ? reaction_summary : reactionSummary
          }
          postId={id ? String(id) : ''}
        />
        <hr />

        <div className="py-1" key={id}>
          <PostActionBar
            postId={String(id)}
            userReaction={reactionRef.current ? userReaction : user_reaction}
            setUserReaction={setUserReaction}
            updateReactionArray={updateReactionArray}
            reactionSummary={reactionSummary}
            disableReactionButton={disableReactionButton}
            setDisableReactionButton={setDisableReactionButton}
            userComment={userComment}
            reactionRef={reactionRef}
            updatePosts={updatePosts}
            posts={posts}
          />
        </div>
      </div>
      <Suspense>
        <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
          <SignInDialog setShowSignModal={setShowSignModal} />
        </Dialog>
      </Suspense>
    </div>
  )
}

export default Card
