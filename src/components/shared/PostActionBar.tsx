'use client'
import {
  deleteReactions,
  postReactions,
  updatePostReaction,
} from '@/services/reactions/reactions'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
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
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
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
    if (pathName === '/feeds') reactionRef.current = true
    let response
    if (tokens?.accessToken) {
      try {
        if (!userReaction || userReaction === 'none') {
          response = await postReactions(
            {
              reactionType: value,
            },
            postId,
            customFetch,
            tokens?.accessToken,
            tokens?.refreshToken,
          )
          updateReactionArray(reactionSummary, {
            value: value,
            action: 'post',
            previousAction: userReaction,
          })
        } else if (value !== 'none' && value !== userReaction) {
          response = await updatePostReaction(
            {
              reactionType: value,
            },
            postId,
            customFetch,
            tokens?.accessToken,
            tokens?.refreshToken,
          )
          updateReactionArray(reactionSummary, {
            value: value,
            action: 'update',
            previousAction: userReaction,
          })
        } else if (value === 'none' || value === userReaction) {
          response = await deleteReactions(
            postId,
            customFetch,
            tokens?.accessToken,
            tokens?.refreshToken,
          )
          updateReactionArray(reactionSummary, {
            value: value === 'none' ? userReaction : value,
            action: 'delete',
            previousAction: userReaction,
          })
        }
        setUserReaction(userReaction === value ? '' : value)

        if (!response.success) {
          throw response.errors[0]
        }
      } catch (error) {
        setUserReaction('')
        if (error instanceof Error) {
          handleRedirect({ error })
        }
        showErrorAlert(`${error}`)
      } finally {
        setDisableReactionButton(false)
      }
    } else {
      if (!tokens.accessToken) {
        setShowSignModal(true)
      }
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

  useEffect(() => {
    const updateUserTokens = async () => {
      const storedTokens = await getUserFromCookie()
      if (storedTokens) {
        setTokens((prevTokens) => ({
          ...prevTokens,
          accessToken: storedTokens?.token,
          refreshToken: storedTokens?.refreshToken,
        }))
      }
    }
    updateUserTokens()
  }, [])

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

            <div className="flex w-full items-center  justify-center rounded-sm  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-background">
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
              className="dark:text-icon-dark  flex basis-1/4 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-100 dark:hover:bg-dark-background"
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
            accessToken={tokens?.accessToken}
            getUserSpecificDetailFunc={getUserSpecificDetailFunc}
          />
          <div className="mt-[20px]">
            {comment.length != 0 && (
              <CommentSection
                comment={comment[0]}
                setDeletedCommentId={setDeletedCommentId}
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
