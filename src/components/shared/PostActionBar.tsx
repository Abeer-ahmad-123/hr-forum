'use client'
import {
  deleteReactions,
  postReactions,
  updatePostReaction,
} from '@/services/reactions/reactions'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import CommentOrReply from '../CommentOrReply'
import CommentSection from './CommentSection'
import { ReactionButton } from './reaction'
import CommentIcon from '@/assets/icons/CommentIcon'
import ShareIcon from '@/assets/icons/shareIcon'

import { Dialog } from '@/components/ui/Dialog/simpleDialog'
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
import SignInDialog from './new-post/SignInDialog'
import BookMark from '@/assets/icons/bookMarkIcon'
import {
  CommentCount,
  CommentCountStore,
  PostReactionBarProps,
  ReactionCounts,
} from '@/utils/interfaces/posts'
import { CustomLink } from './customLink/CustomLink'

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
}: PostActionBarProps) => {
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const [showCommentArea, setShowCommentArea] = useState(false)
  const [comment, setComment] = useState<any>([])
  const [deletedCommentId, setDeletedCommentId] = useState<string | null>(null)

  const { handleRedirect } = useFetchFailedClient()
  const [showSignModal, setShowSignModal] = useState(false)
  const [popOver, setPopOver] = useState(false)
  const [commentCount, setCommentCount] = useState<CommentCount>({})
  const commentCountInStore = useSelector(
    (state: CommentCountStore) => state.posts.commentCount,
  )
  useEffect(() => {
    setCommentCount(commentCountInStore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentCountInStore])
  const postCommentsCount = useMemo(() => {
    return commentCount[Number(postId)] || null
  }, [commentCount, postId])
  const { id } = useParams()
  const pathName = usePathname()

  const { customFetch } = useInterceptor()
  const submitReaction = async (value: string) => {
    if (pathName === '/feeds') reactionRef.current = true
    let response
    if (tokenInRedux) {
      try {
        if (!userReaction || userReaction === 'none') {
          response = await postReactions(
            {
              reactionType: value,
            },
            postId,
            customFetch,
            tokenInRedux,
            refreshTokenInRedux,
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
            tokenInRedux,
            refreshTokenInRedux,
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
            tokenInRedux,
            refreshTokenInRedux,
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
      setShowSignModal(true)
    }
  }

  const toggleCommentArea = () => {
    if (tokenInRedux) {
      id ? inputRef?.current?.focus() : setShowCommentArea((pre) => !pre)
    } else {
      setShowSignModal(true)
    }
  }
  const handleLikeWrapper = () => {
    if (!tokenInRedux) {
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

  return (
    <>
      {/* * Added Gap between the action bar and the comment section */}
      <div className="flex w-full flex-col gap-[20px]">
        <div className="flex w-full items-center justify-between ">
          <div className="flex gap-[28px]">
            <ReactionButton
              handleLikeWrapper={handleLikeWrapper}
              userReaction={userReaction}
              onReact={submitReaction}
              disableReactionButton={disableReactionButton}
              setDisableReactionButton={setDisableReactionButton}
            />

            <div className="flex w-full items-center  justify-center rounded-sm  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-background">
              <button
                name="comment button"
                onClick={toggleCommentArea}
                className="text-icon-light dark:text-icon-dark flex cursor-pointer  items-center gap-[8px]  font-black">
                <CommentIcon className="h-[16px] w-[16px] text-black dark:text-white md:h-[20px] md:w-[20px] " />
                <CustomLink
                  href={
                    pathName.includes('channels')
                      ? `${pathName}/feed/${postId}`
                      : `/feeds/feed/${postId}`
                  }
                  className="flex items-center">
                  {commentCount && postCommentsCount ? (
                    <span className="flex items-center justify-center gap-[8px]  text-sm  font-light  text-black ">
                      {postCommentsCount > 1 ? (
                        <>
                          <span className="font-[900] dark:text-white">
                            {postCommentsCount}
                          </span>
                          <span className="text-sm font-light text-[#666666] dark:text-white">
                            Comments
                          </span>
                        </>
                      ) : (
                        `${postCommentsCount} Comment`
                      )}
                    </span>
                  ) : (
                    <span className="text-sm font-light text-[#666666] dark:text-white">
                      Comment
                    </span>
                  )}
                </CustomLink>
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
                  <ShareIcon className="w-[16px]text-black mt-[1px] h-[16px] dark:text-white md:h-[18px] md:w-[18px] " />
                  <span
                    className="text-sm font-light text-[#666666] dark:text-white"
                    onClick={setOpenPopOver}>
                    Share
                  </span>
                </PopoverTrigger>

                <PopoverContent className="cursor-pointer bg-white">
                  <SocialButtons
                    className="flex gap-3"
                    postId={postId}
                    handleButtonClick={handleButtonClick}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[8px]">
            <BookMark className="h-[16px] w-[16px] text-black dark:text-white md:h-[18px] md:w-[18px]" />
            <p className="text-sm text-[#666666] dark:text-white">Save</p>
          </div>
        </div>

        {pathName.includes('/comment')
          ? comment.id && (
              <CommentSection
                comment={comment}
                setDeletedCommentId={setDeletedCommentId}
              />
            )
          : !id && (
              <div className={`${!showCommentArea && 'hidden'} `}>
                <CommentOrReply
                  className="m-2"
                  btnClass="mr-[0px]"
                  Id={postId}
                  setComments={setComment}
                  postId={postId}
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
            )}
      </div>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </>
  )
}

export default PostActionBar
