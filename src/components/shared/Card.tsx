'use client'
import { noProfilePicture } from '@/assets/images'
import ChannelPill from '@/components/shared/ChannelPill'
import { showErrorAlert, timeFormatInHours } from '@/utils/helper'
import { EmojiActionInterface, ReactionSummary } from '@/utils/interfaces/card'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { AlertOctagon, Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import PostActionBar from './PostActionBar'
import PostReactionBar from './PostReactionBar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { MoreHorizontal } from 'lucide-react'
import ActivityButtons from '../ActivityButtons'
import Report from '../Report/Report'
import SignInDialog from './new-post/SignInDialog'
import DeletePost from './post/DeletePost'

const Card = ({ post, channels, setPosts, posts, index, userComment }: any) => {
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
    total_comments,
  } = post
  const pathName = usePathname()
  const router = useRouter()
  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

  const { customFetch } = useInterceptor()
  const { handleRedirect } = useFetchFailedClient()

  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const [popOver, setPopOver] = useState(false)

  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const [commentCount, setCommentCount] = useState<number>(0)

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
    nProgress.start()
    router.push(
      pathName.includes('channels')
        ? `${pathName}/feed/${id}`
        : pathName.includes('saved')
        ? `/saved/feed/${id}`
        : `/feeds/feed/${id}`,
    )
  }
  const handleNavigateProfile = (event: any) => {
    nProgress.start()
    event.preventDefault()
    event.stopPropagation() // Prevent propagation to card's onClick
    router.push(
      userDetails?.id === user_id ? '/profile' : `/profile/${user_id}`,
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
          id,
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
        }
        showErrorAlert(`${error}`)
      }
    } else {
      setShowSignModal(true)
    }
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
    return () => {
      nProgress.done()
    }
  }, [])

  useEffect(() => {
    setCommentCount(total_comments)
  }, [total_comments])

  return (
    <div key={id}>
      {index === 0 && pathName.includes(`/${userDetails.username}/feed`) && (
        <ActivityButtons />
      )}

      <div
        className={`${
          index === 0 && pathName.includes(`/${userDetails.username}/feed`)
            ? 'rounded-b-xl'
            : 'rounded-xl'
        } mx-auto mb-5 max-w-screen-md cursor-pointer bg-white shadow-lg dark:bg-slate-800 dark:text-gray-300`}>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white sm:max-w-[500px]">
            <Report
              reportType="post"
              setOpenDialog={setOpenDialog}
              postId={id}
              getPostCommets={() => {}}
              setReported={setReported}
              setReportedReplyId={() => {}}
              setReportedCommentId={() => {}}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogContent className="bg-white sm:max-w-[500px]">
            <DeletePost
              setOpenDeleteDialog={setOpenDeleteDialog}
              postId={id}
              setReported={() => {}}
              setPosts={setPosts}
              posts={posts}
            />
          </DialogContent>
        </Dialog>

        <div
          className="px-10 py-4 max-custom-sm:px-6 max-[392px]:px-2"
          onClick={handleNavigateFeed}>
          <div className="flex flex-row justify-between">
            <div className="flex w-full  flex-row items-center justify-between max-custom-sm:items-start ">
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
                  <div className="flex flex-row items-center">
                    <p
                      className="text-sm font-normal leading-none text-gray-900 dark:text-white max-custom-sm:text-[11px] 
                      max-[392px]:text-[10px] max-custom-sx:text-[8px]"
                      aria-label="user-name"
                      onClick={handleNavigateProfile}>
                      {user?.name === userDetails?.name ? 'You' : user?.name}
                    </p>

                    <ChannelPill channel_id={channel_id} channels={channels} />
                  </div>

                  <p className="justify-start text-[0.70rem] font-light text-slate-500 dark:text-gray-400 max-custom-sm:text-[9px] max-[392px]:text-[9px] max-custom-sx:text-[7px]">
                    {timeFormatInHours(created_at)}
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

                <div onMouseLeave={handleMouseDown}>
                  <Popover open={popOver} onOpenChange={setPopOver}>
                    <PopoverTrigger className="flex">
                      <span
                        className="text-icon-light dark:text-icon-dark flex cursor-pointer items-center space-x-2 px-[9px] font-black max-[392px]:px-0"
                        onClick={setOpenPopOver}>
                        <MoreHorizontal className="h-fit w-fit font-light  max-[380px]:w-[1.05rem] max-custom-sx:w-[15px]" />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white">
                      {' '}
                      {(post.user_id as string) === userDetails.id ? (
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
                  </Popover>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="my-3 text-start text-xl font-semibold dark:text-white max-custom-sm:text-base">
              {title}
            </div>
            {!image_url ? (
              <div
                className="text-start text-base text-gray-700 dark:text-gray-300 max-custom-sm:text-[13px]"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <img
                src={image_url}
                alt="post"
                height={400}
                width={300}
                className="w-full max-w-[400px]"
              />
            )}
          </div>
        </div>

        <PostReactionBar
          reaction_summary={reactionSummary}
          postId={id}
          total_comments={commentCount}
        />
        <hr />

        <div className="py-1">
          <PostActionBar
            postId={id}
            userReaction={userReaction}
            setUserReaction={setUserReaction}
            updateReactionArray={updateReactionArray}
            reactionSummary={reactionSummary}
            getPost={() => {}}
            disableReactionButton={disableReactionButton}
            setDisableReactionButton={setDisableReactionButton}
            setCommentCount={setCommentCount}
            userComment={userComment}
          />
        </div>
      </div>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </div>
  )
}

export default Card
