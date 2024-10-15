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
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { showErrorAlert, timeFormatInHours } from '@/utils/helper'
import { EmojiActionInterface, ReactionSummary } from '@/utils/interfaces/card'
import type {
  ChannelByIdInterface,
  ChannelInterface,
} from '@/utils/interfaces/channels'
import { PostsInterface } from '@/utils/interfaces/posts'
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
import Report from '../Report/Report'
import PostActionBar from './PostActionBar'
import { CustomLink } from './customLink/CustomLink'
import SignInDialog from './NewPost/SignInDialog'
import DeletePost from './post/DeletePost'
import CardContent from './CardContent'
import { getTokens, getUserData } from '@/utils/local-stroage'
import { userData } from '@/utils/interfaces/userData'
import Link from 'next/link'
import { getUserFromCookie } from '@/utils/cookies'
import { reactionOptions } from '@/utils/data'

type CardProps = {
  post: PostsInterface
  channels?: ChannelByIdInterface[] | ChannelInterface[]
  posts?: PostsInterface[]
  userComment?: any
  updatePosts?: Dispatch<SetStateAction<PostsInterface[]>>
  hideComments?: string
  getUserSpecificDetailFunc: () => void
  user?: userData
  token?: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}
const Card = ({
  post,
  channels,
  updatePosts,
  posts,
  userComment,
  hideComments,
  getUserSpecificDetailFunc,
  user,
  token,
}: CardProps) => {
  const [reactionSummary, setReactionSummary] = useState<ReactionSummary>({
    like_count: 0,
    love_count: 0,
    clap_count: 0,
    celebrate_count: 0,
  })
  const [reported, setReported] = useState<boolean>(post?.user_has_reported)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(
    post?.user_has_bookmarked,
  )
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [disableReactionButton, setDisableReactionButton] =
    useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<userData>()
  const [userReaction, setUserReaction] = useState('')
  const [tokens, setTokens] = useState<Tokens>({
    accessToken: '',
    refreshToken: '',
  })
  const [popOver, setPopOver] = useState(false)

  const reactionRef = useRef<boolean>(false)
  const isFirstRef = useRef<boolean>(true)

  const pathName = usePathname()
  const { slug } = useParams()
  const router = useRouter()

  const { handleRedirect } = useFetchFailedClient()
  const { customFetch } = useInterceptor()

  const reactionSummaryToUse = isFirstRef.current
    ? post?.reaction_summary
    : reactionSummary
  const updateReactionArray = (
    reactionArray: ReactionSummary,
    reactionObject: EmojiActionInterface,
  ) => {
    if (reactionObject.action === 'post') {
      console.log('reactionObject.action', reactionObject.action)
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
        ? `${pathName}/feed/${post?.id}`
        : pathName.includes('saved')
        ? `/saved/feed/${post?.id}`
        : pathName.includes('user-activity')
        ? `${pathName}/feed/${post?.id}`
        : `/feeds/feed/${post?.id}`,
    )
  }
  const handleNavigateProfile = (event: any) => {
    // Construct the profile URL regardless of the user's login status
    const profileURL = `/profile/${post?.author_details?.name
      ?.toLowerCase()
      .replace(/ /g, '-')}-${post?.user_id}`

    // Navigate to the user's profile
    router.push(profileURL)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOver(false)
  }
  const handleReportClick = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    setPopOver(false)

    if (!tokens.accessToken) {
      setShowSignModal(true)
    } else {
      setOpenDialog(true)
    }
  }

  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setPopOver(false)

    if (!tokens.accessToken) {
      setShowSignModal(true)
    } else {
      setOpenDeleteDialog(true)
    }
  }
  const handleBookmark = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (tokens.accessToken) {
      const getApi = bookmarkSuccess ? deleteBookmarkPost : bookmarkPost
      try {
        const res = await getApi(
          post?.id ? String(post?.id) : '',
          customFetch,
          tokens.accessToken,
          tokens.refreshToken ?? '',
        )

        if (res.success) {
          setBookmarkSuccess(true)
        } else if (res.status === 204) {
          setBookmarkSuccess(false)
          if (pathName.includes('saved')) {
            if (pathName.includes('/saved/feed')) {
              router.back()
            }
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

  useEffect(() => {
    if (post?.reaction_summary) {
      setReactionSummary(post?.reaction_summary)
    }
  }, [post?.reaction_summary])

  useEffect(() => {
    setUserReaction(post?.user_reaction)
  }, [post?.user_reaction])

  useEffect(() => {
    setBookmarkSuccess(post?.user_has_bookmarked)
  }, [post?.user_has_bookmarked])

  useEffect(() => {
    setReported(post?.user_has_reported)
  }, [post?.user_has_reported])

  useEffect(() => {
    isFirstRef.current = false
  }, [])
  useEffect(() => {
    getUserFromCookie().then((res) => {
      if (res) {
        setTokens({
          ...tokens,
          accessToken: res.token,
          refreshToken: res.refreshToken,
        })
      }
    })
    const storedTokens = getTokens()
  }, [])
  useEffect(() => {
    const userData = getUserData()
    if (userData) setUserDetails(userData)
  }, [])

  return (
    <div
      id={String(post?.id)}
      key={post?.id}
      className={
        hideComments
          ? hideComments
          : 'm-0 w-full max-w-full p-0 lg:max-w-[759px]'
      }>
      <div
        className={`${
          pathName.includes('user-activity')
            ? 'rounded-2xl bg-[#FAFAFA] dark:bg-bg-tertiary-dark'
            : updatePosts
            ? 'rounded-2xl bg-bg-primary dark:bg-bg-primary-dark'
            : ''
        } ${
          !updatePosts && !hideComments
            ? 'rounded-2xl bg-[#FAFAFA] dark:bg-bg-tertiary-dark'
            : ''
        } ${
          hideComments
            ? 'mb-5 h-full'
            : 'mx-auto mb-5 w-full cursor-pointer dark:text-gray-300 lg:max-w-screen-md'
        }`}>
        <Suspense>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="bg-white sm:max-w-[500px]">
              <Report
                reportType="post"
                setOpenDialog={setOpenDialog}
                postId={post?.id ? String(post?.id) : ''}
                getPostCommets={() => {}}
                setReported={setReported}
                setReportedReplyId={() => {}}
                setDeletedCommentId={() => {}}
                getUserSpecificDetailFunc={getUserSpecificDetailFunc}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DialogContent className="bg-white sm:max-w-[500px]">
              <DeletePost
                setOpenDeleteDialog={setOpenDeleteDialog}
                postId={post?.id ? String(post?.id) : ''}
                setReported={() => {}}
                updatePosts={updatePosts}
                posts={posts}
              />
            </DialogContent>
          </Dialog>
        </Suspense>
        <Link
          href={pathName.includes('/profile') ? `/feeds/feed/${post?.id}` : ''}>
          <div
            className={
              hideComments
                ? 'flex flex-col gap-[20px]'
                : 'flex flex-col  gap-[20px]  px-[24px] pb-[20px] pt-[28px]'
            }>
            <div className="flex flex-row justify-between">
              <div className="flex w-full flex-row  items-center justify-between max-custom-sm:items-start">
                <div className="flex items-center gap-[12px]">
                  <div className="-z-2">
                    <div className="static rounded-xl">
                      <Link
                        href={
                          post?.user_id === userDetails?.id
                            ? '/profile'
                            : `/profile/${post?.author_details?.name
                                ?.toLowerCase()
                                .replace(/ /g, '-')}-${post?.user_id}`
                        }>
                        <img
                          className="inline-block rounded-full object-contain ring-2 ring-white dark:ring-gray-800 max-custom-sx:h-6 max-custom-sx:w-6"
                          width={48}
                          height={48}
                          src={
                            post?.author_details?.profile_picture_url ||
                            noProfilePicture.src
                          }
                          alt="user-picture"
                          onClick={handleNavigateProfile}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col items-start align-baseline">
                    <div className="flex flex-row flex-wrap items-center gap-[12px]">
                      <p
                        className="max-w-full shrink-0 cursor-pointer break-all text-[16px]  font-[550]  leading-none text-gray-900 hover:underline dark:text-white   "
                        aria-label="user-name"
                        onClick={handleNavigateProfile}>
                        {String(user?.id) === String(post?.user_id)
                          ? 'You'
                          : post?.author_details?.name}
                      </p>

                      {channels && (
                        <ChannelPill
                          channel_id={String(post?.channel_id)}
                          channels={channels}
                        />
                      )}
                    </div>

                    <p className="justify-start text-[10px] font-light text-slate-500 dark:text-gray-400 max-custom-sm:text-[9px] max-[392px]:text-[9px] max-custom-sx:text-[7px]">
                      {timeFormatInHours(post?.created_at as unknown as Date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {!pathName.includes(`user-activity/${slug}/comment`) && (
                    <div onMouseLeave={handleMouseDown}>
                      <Popover open={popOver} onOpenChange={setPopOver}>
                        <PopoverTrigger
                          className="relative flex"
                          name="post options button"
                          aria-label="post options"
                          aria-labelledby="postOptionsLabel"
                          role="button">
                          <span className="text-icon-light dark:text-icon-dark flex cursor-pointer items-center space-x-2 px-[9px] font-black max-[392px]:px-0 ">
                            {post?.user_id === userDetails?.id && token ? (
                              <div onClick={handleDeleteClick}>
                                <Trash2 size={17} />
                              </div>
                            ) : (
                              <AlertOctagon
                                size={17}
                                className={reported ? 'text-red' : ''}
                                onClick={handleReportClick}
                              />
                            )}
                          </span>
                        </PopoverTrigger>
                        <Suspense>
                          <PopoverContent className="bg-white">
                            {post?.user_id === userDetails?.id && token ? (
                              <div
                                className="dark:text-icon-dark text-icon-light pyrepo-2 flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-bg-green hover:text-white dark:text-white dark:hover:text-white"
                                onClick={handleDeleteClick}>
                                <Trash2 size={17} />
                                <span className="text-[15px] font-light max-custom-sm:hidden">
                                  {' '}
                                  Delete
                                </span>
                              </div>
                            ) : (
                              <div
                                className="dark:text-icon-dark text-icon-light pyrepo-2 dark:white flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-bg-green hover:text-white dark:text-white dark:hover:text-white"
                                onClick={handleReportClick}>
                                <AlertOctagon size={17} />
                                <span className="text-[15px] font-light max-custom-sm:hidden">
                                  {' '}
                                  Report
                                </span>
                              </div>
                            )}
                          </PopoverContent>
                        </Suspense>
                      </Popover>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="flex max-w-full flex-col gap-[5px] hyphens-auto"
              onClick={handleNavigateFeed}>
              <CustomLink
                href={
                  pathName.includes('channels')
                    ? `${pathName}/feed/${post?.id}`
                    : pathName.includes('saved')
                    ? `/saved/feed/${post?.id}`
                    : `/feeds/feed/${post?.id}`
                }>
                {' '}
                <div className="text-start text-[16px] font-[800] dark:text-white max-custom-sm:text-base">
                  <p>{post?.title}</p>
                </div>
              </CustomLink>
              {post?.content && (
                <div
                  onClick={() => {
                    const newPath = pathName.includes('channels')
                      ? `${pathName}/feed/${post?.id}`
                      : pathName.includes('saved')
                      ? `/saved/feed/${post?.id}`
                      : `/feeds/feed/${post?.id}`

                    router.push(newPath)
                  }}>
                  <CardContent content={post?.content} />
                  {post?.content?.length > 200 && (
                    <CustomLink
                      href={
                        pathName.includes('channels')
                          ? `${pathName}/feed/${post?.id}`
                          : pathName.includes('saved')
                          ? `/saved/feed/${post?.id}`
                          : `/feeds/feed/${post?.id}`
                      }>
                      <button className="text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                        Show More
                      </button>
                    </CustomLink>
                  )}
                </div>
              )}

              {post?.image_url && (
                // * Image consistency for width / height and fill properties
                <Image
                  quality={100}
                  src={post?.image_url}
                  alt="post"
                  height={500}
                  width={500}
                  className="h-[270px] w-full  max-w-[711px] rounded-[20px] object-cover"
                />
              )}
            </div>
            {!hideComments && (
              <div className="flex" key={post?.id}>
                <PostActionBar
                  postId={String(post?.id)}
                  userReaction={
                    reactionRef.current ? userReaction : post?.user_reaction
                  }
                  setUserReaction={setUserReaction}
                  updateReactionArray={updateReactionArray}
                  reactionSummary={reactionSummaryToUse}
                  disableReactionButton={disableReactionButton}
                  setDisableReactionButton={setDisableReactionButton}
                  userComment={userComment}
                  reactionRef={reactionRef}
                  updatePosts={updatePosts}
                  posts={posts}
                  totalComments={post?.total_comments}
                  handleBookmark={handleBookmark}
                  bookmarkSuccess={bookmarkSuccess}
                  getUserSpecificDetailFunc={getUserSpecificDetailFunc}
                  token={token}
                />
              </div>
            )}
          </div>
        </Link>
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
