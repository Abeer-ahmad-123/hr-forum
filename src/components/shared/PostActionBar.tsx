'use client'
import {
  deleteReactions,
  postReactions,
  updatePostReaction,
} from '@/services/reactions/reactions'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import CommentOrReply from '../CommentOrReply'
import CommentSection from './CommentSection'
import { ReactionButton } from './reaction'
import CommentIcon from '@/assets/icons/CommentIcon'
import ShareIcon from '@/assets/icons/shareIcon'

import { Dialog } from '@/components/ui/Dialog/simpleDialog'
import { useTheme } from 'next-themes'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import { showErrorAlert } from '@/utils/helper'
import { PostActionBarProps, PostsInterface } from '@/utils/interfaces/posts'
import SocialButtons from './SocialButtons'
import SignInDialog from './NewPost/SignInDialog'
import BookMark from '@/assets/icons/bookMarkIcon'
import { CommentCount, CommentCountStore } from '@/utils/interfaces/posts'
import { CustomLink } from './customLink/CustomLink'
import { ReactionSummary } from '@/utils/interfaces/card'
import { getTokens } from '@/utils/local-stroage'
import { Tokens } from './Card'
import { getUserFromCookie } from '@/utils/cookies'

const PostActionBar = ({
  postId,
  inputRef,
  userReaction,
  setUserReaction,
  updateReactionArray,
  reactionSummary,
  disableReactionButton,
  setDisableReactionButton,
  userComment,
  reactionRef,
  updatePosts,
  posts,
  totalComments,
  handleBookmark,
  bookmarkSuccess,
  getUserSpecificDetailFunc,
  token,
  userFlag,
}: PostActionBarProps) => {
  const [deletedCommentId, setDeletedCommentId] = useState<string | null>(null)
  const [reactionCount, setReactionCount] = useState<number>(0)
  const [showCommentArea, setShowCommentArea] = useState(false)
  const [commentCount, setCommentCount] = useState<number>()
  const [showSignModal, setShowSignModal] = useState(false)
  const [tokens, setTokens] = useState<Tokens>({
    accessToken: '',
    refreshToken: '',
  })
  const { theme } = useTheme()

  const [comment, setComment] = useState<any>([])
  const [popOver, setPopOver] = useState(false)

  const isFirstRef = useRef<boolean>(true)

  const { handleRedirect } = useFetchFailedClient()

  // const tokenInRedux =
  //   useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  // const refreshToken =
  //   useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
  //   ''

  // const commentCountInStore = useSelector(
  //   (state: CommentCountStore) => state.posts.commentCount,
  // )
  const calculateTotalReactions = (reactions: ReactionSummary) => {
    return (
      reactions?.like_count +
      reactions?.love_count +
      reactions?.clap_count +
      reactions?.celebrate_count
    )
  }

  const reactionCountToUse = isFirstRef.current
    ? calculateTotalReactions(reactionSummary)
    : reactionCount

  useEffect(() => {}, [reactionCountToUse])

  useEffect(() => {
    if (comment.length) {
      setCommentCount(totalComments + comment.length)
    } else {
      setCommentCount(totalComments)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalComments, comment])

  const commentCountToUse = isFirstRef.current ? totalComments : commentCount

  const { id } = useParams()
  const pathName = usePathname()

  const { customFetch } = useInterceptor()
  const submitReaction = async (value: string) => {
    reactionRef.current = true
    let response

    if (!token) {
      setShowSignModal(true) // Show sign-in modal if not logged in
      return
    }

    try {
      // Add a reaction if the user has not reacted before
      if (!userReaction || userReaction === 'none') {
        response = await postReactions(
          {
            reactionType: value,
          },
          postId,
          customFetch,
          token,
          tokens?.refreshToken,
        )

        if (response.success) {
          // Only increment the count on first reaction
          setReactionCount((prevCount) => prevCount + 1)
          setUserReaction(value) // Set the user's reaction to the new value
        }

        // Update the reaction if the user is changing it
      } else if (value !== 'none' && userReaction !== value) {
        response = await updatePostReaction(
          {
            reactionType: value,
          },
          postId,
          customFetch,
          token,
          tokens?.refreshToken,
        )

        if (response.success) {
          // No change in count, just update the reaction
          setUserReaction(value)
        }

        // Remove the reaction if user wants to undo their reaction
      } else if (value === 'none' && userReaction !== 'none') {
        response = await deleteReactions(
          postId,
          customFetch,
          token,
          tokens?.refreshToken,
        )

        if (response.success) {
          // Decrease the count when the reaction is removed
          setReactionCount((prevCount) => Math.max(0, prevCount - 1))
          setUserReaction('') // Clear the user's reaction
        }
      }

      if (!response.success) {
        throw new Error(response.errors[0]) // If the response fails, throw an error
      }
    } catch (error) {
      setUserReaction('') // Clear the reaction in case of error
      if (error instanceof Error) {
        handleRedirect({ error })
      }
      showErrorAlert(`${error}`)
    } finally {
      setDisableReactionButton(false) // Re-enable the button after the process is done
    }
  }

  const toggleCommentArea = () => {
    if (tokens?.accessToken) {
      id ? inputRef?.current?.focus() : setShowCommentArea((pre) => !pre)
    } else {
      setShowSignModal(true)
    }
  }
  const handleLikeWrapper = () => {
    if (!tokens?.accessToken) {
      setShowSignModal(true)
      return true
    } else {
      setShowSignModal(false)
      return false
    }
  }

  const setOpenPopOver = () => {
    setPopOver((pre) => !pre)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOver(false)
  }

  const handleButtonClick = () => {
    setPopOver(false)
  }

  const filteredComments = () => {
    if (deletedCommentId) {
      if (typeof comment !== 'object') {
        setComment((prevComments: PostsInterface[]) => {
          return prevComments.filter(
            (comment: PostsInterface) =>
              comment.id !== Number(deletedCommentId),
          )
        })
      } else {
        setComment([])
        updatePosts(
          posts.filter((item: any) => item.id !== Number(deletedCommentId)),
        )
      }
      setDeletedCommentId('')
    }
  }
  useEffect(() => {
    if (userComment) setComment(userComment)
  }, [userComment])

  useEffect(() => {
    filteredComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedCommentId])

  useEffect(() => {
    if (reactionSummary) {
      setReactionCount(calculateTotalReactions(reactionSummary))
    }
  }, [reactionSummary])

  useEffect(() => {
    isFirstRef.current = false
  }, [])

  // useEffect(() => {
  //   const updateUserTokens = async () => {
  //     const storedTokens = await getUserFromCookie()
  //     if (storedTokens) {
  //       setTokens((prevTokens) => ({
  //         ...prevTokens,
  //         accessToken: storedTokens?.token,
  //         refreshToken: storedTokens?.refreshToken,
  //       }))
  //     }
  //   }
  //   updateUserTokens()
  // }, [])
  return (
    <>
      {/* * Added Gap between the action bar and the comment section */}
      <div className="flex w-full flex-col gap-[20px]">
        <div className="flex w-full items-center justify-between ">
          <div className="flex gap-[28px]">
            <ReactionButton
              onReact={submitReaction}
              userReaction={userReaction}
              handleLikeWrapper={handleLikeWrapper}
              disableReactionButton={disableReactionButton}
              setDisableReactionButton={setDisableReactionButton}
              reactionCountToUse={reactionCountToUse}
              accessToken={token}
            />

            <div className="flex w-full items-center  justify-center rounded-sm   dark:text-gray-300 ">
              <button
                name="comment button"
                onClick={toggleCommentArea}
                className="text-icon-light dark:text-icon-dark flex cursor-pointer  items-center gap-[8px]  font-black">
                <CommentIcon className="h-[16px] w-[16px] text-black dark:text-white md:h-[20px] md:w-[20px] " />
                <div
                  // href={
                  //   pathName.includes('channels')
                  //     ? `${pathName}/feed/${postId}`
                  //     : `/feeds/feed/${postId}`
                  // }
                  className="flex items-center">
                  {commentCountToUse && commentCountToUse ? (
                    <span className="flex items-center justify-center gap-[8px]  text-[12px] font-light  text-black md:text-[16px]">
                      {commentCountToUse > 1 ? (
                        <>
                          <span className="font-[900] dark:text-white">
                            {commentCountToUse}
                          </span>
                          <span className="hidden text-sm font-light text-[#666666] dark:text-white custom-mid-sm:block">
                            Comments
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-[900] text-black dark:text-white">
                            {commentCountToUse}
                          </span>
                          <span className="hidden text-sm text-[#666666] dark:text-white custom-mid-sm:block ">
                            Comment
                          </span>
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="hidden text-sm font-light text-[#666666] dark:text-white custom-mid-sm:block">
                      Comment
                    </span>
                  )}
                </div>
              </button>
            </div>

            <div
              className="dark:text-icon-dark  flex basis-1/4 cursor-pointer items-center justify-center rounded-sm "
              onMouseLeave={handleMouseDown}>
              <Popover open={popOver} onOpenChange={setPopOver}>
                <PopoverTrigger
                  className="text-icon-light dark:text-icon-dark flex cursor-pointer items-center gap-[8px]  font-black"
                  name="share options button"
                  aria-label="share options"
                  aria-labelledby="shareOptionsLabel"
                  role="button">
                  <ShareIcon className="w-[16px]text-black mb-[3px] h-[16px] dark:text-white md:h-[18px] md:w-[18px] " />
                  <span
                    className="hidden text-sm font-light text-[#666666] dark:text-white custom-mid-sm:block "
                    onClick={setOpenPopOver}>
                    Share
                  </span>
                </PopoverTrigger>

                <PopoverContent className="cursor-pointer rounded-[20px] bg-white p-2 shadow-[#00000059] dark:bg-bg-tertiary-dark">
                  <SocialButtons
                    className="flex gap-2 rounded-[20px]"
                    postId={postId}
                    handleButtonClick={handleButtonClick}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div
            className="flex cursor-pointer items-center justify-center gap-[8px]"
            onClick={handleBookmark}>
            <BookMark
              className="mb-1 h-[16px] w-[16px] text-black dark:text-white md:h-[18px] md:w-[18px]"
              fill={
                bookmarkSuccess
                  ? theme === 'dark'
                    ? 'white'
                    : 'black'
                  : 'none'
              }
            />

            <p className="hidden text-sm text-[#666666] dark:text-white custom-mid-sm:block ">
              Save
            </p>
          </div>
        </div>

        {/* {pathName.includes('/comment')
          ? comment.id && (
              <CommentSection
                comment={comment}
                setDeletedCommentId={setDeletedCommentId}
              />
            )
          : !id && ( */}
        <div className={`${!showCommentArea && 'hidden'} `}>
          <CommentOrReply
            className="m-2"
            btnClass="mr-[0px]"
            Id={postId}
            setComments={setComment}
            postId={postId}
            refreshToken={tokens?.refreshToken}
            accessToken={tokens?.accessToken || token}
            getUserSpecificDetailFunc={getUserSpecificDetailFunc}
            userFlag={userFlag}
            token={token}
          />
          <div className="mt-[20px]">
            {comment.length != 0 && (
              <CommentSection
                comment={comment[0]}
                setDeletedCommentId={setDeletedCommentId}
                userFlag={userFlag}
                token={token}
              />
            )}
          </div>
        </div>
        {/* )} */}
      </div>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </>
  )
}

export default PostActionBar
