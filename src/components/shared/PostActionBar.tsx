'use client'
import {
  deleteReactions,
  postReactions,
  updatePostReaction,
} from '@/services/reactions/reactions'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegBookmark, FaRegComment } from 'react-icons/fa'
import { PiShareFat } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import CommentOrReply from '../CommentOrReply'
import CommentSection from './CommentSection'
import { ReactionButton } from './reaction'

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
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'

import { Dialog, DialogContent } from '@/components/ui/Dialog/simpleDialog'
import { PostActionBarProps } from '@/utils/interfaces/posts'
import { AlertOctagon, MoreHorizontal } from 'lucide-react'
import Report from '../Report/Report'
import SocialButtons from './SocialButtons'
import SignInDialog from './new-post/SignInDialog'

const PostActionBar = ({
  linkToFeed,
  postId,
  inputRef,
  bookmark,
  userReaction,
  setUserReaction,
  setBookmarkupdated,
  updateReactionArray,
  reactionSummary,
  getPostCommets,
  getPost,
}: PostActionBarProps) => {
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''

  const [showSignModal, setShowSignModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [popOver, setPopOver] = useState(false)
  const { id } = useParams()
  const pathName = usePathname()
  const router = useRouter()
  const { customFetch } = useInterceptor()

  const submitReaction = async (value: string) => {
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
        getPost()
      } catch (error) {
        setUserReaction('')
        throw error
      }
    } else {
      setShowSignModal(true)
    }
  }

  const [showCommentArea, setShowCommentArea] = useState(false)
  const [comment, setComment] = useState([])
  const [bookmarkSuccess, setBookmarkSuccess] = useState(bookmark)
  const toggleCommentArea = () => {
    id ? inputRef?.current?.focus() : setShowCommentArea((pre) => !pre)
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
  const handleBookmark = async () => {
    if (pathName.includes('/saved')) {
      setBookmarkupdated && setBookmarkupdated((pre: boolean) => !pre)
    }

    if (tokenInRedux) {
      const getApi = bookmarkSuccess ? deleteBookmarkPost : bookmarkPost
      try {
        const res = await getApi(
          postId,
          customFetch,
          tokenInRedux,
          refreshTokenInRedux,
        )
        if (res.data) {
          setBookmarkSuccess(true)
        } else if (res.status === 200 || res.status === 204) {
          setBookmarkSuccess(false)
        }
      } catch (error) {
        console.error(error)
        router.push('/feeds')
      }
    } else {
      setShowSignModal(true)
    }
  }

  const handleClick = () => {
    if (!tokenInRedux) {
      setShowSignModal(true)
    } else setOpenDialog(true)
  }
  const setOpenPopOver = () => {
    setPopOver((pre) => !pre)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOver(false)
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-between px-[2%] py-1 max-md:flex-row max-md:gap-[2%]">
          <ReactionButton
            handleLikeWrapper={handleLikeWrapper}
            userReaction={userReaction}
            onReact={submitReaction}
          />

          <div className="dark:text-icon-dark flex basis-1/4 items-center justify-center rounded-sm hover:bg-gray-300 dark:text-gray-300 dark:hover:text-slate-800">
            <button
              onClick={toggleCommentArea}
              className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
              <FaRegComment />
              <span className="font-light max-custom-sm:hidden ">Comment</span>
            </button>
          </div>

          <div
            className="dark:text-icon-dark  flex basis-1/4 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-300  dark:hover:text-slate-800"
            onMouseLeave={handleMouseDown}>
            <Popover open={popOver} onOpenChange={setPopOver}>
              <PopoverTrigger className="text-icon-light dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
                <PiShareFat className="h-6 w-6 font-light" />
                <span
                  className="font-light  max-custom-sm:hidden "
                  onClick={setOpenPopOver}>
                  Share
                </span>
              </PopoverTrigger>

              <PopoverContent className="cursor-pointer bg-white">
                <SocialButtons className="flex gap-3" postId={postId} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-6 ">
            <Popover>
              <PopoverTrigger>
                <button className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
                  <MoreHorizontal className="h-6 w-6 font-light" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="bg-white">
                <div>
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <button
                      className=" dark:text-icon-dark text-icon-light pyrepo-2 flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-gray-300 dark:text-gray-300  dark:hover:text-slate-800"
                      onClick={handleClick}>
                      <AlertOctagon size={17} />
                      <span className="text-[15px] font-light max-custom-sm:hidden">
                        {' '}
                        Report
                      </span>
                    </button>

                    <DialogContent className="bg-white sm:max-w-[500px]">
                      <Report
                        reportType="post"
                        setOpenDialog={setOpenDialog}
                        postId={postId}
                        getPostCommets={getPostCommets}
                      />
                    </DialogContent>
                  </Dialog>

                  <div
                    onClick={handleBookmark}
                    className="dark:text-icon-dark text-icon-light flex w-full basis-1/4 cursor-pointer items-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-gray-300 dark:text-gray-300  dark:hover:text-slate-800">
                    <FaRegBookmark color={bookmarkSuccess ? 'blue' : ''} />
                    <span className="text-[15px] font-light max-custom-sm:hidden ">
                      Bookmark
                    </span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {!id && (
          <div className={`${!showCommentArea && 'hidden'} `}>
            <CommentOrReply
              className="m-2"
              btnClass="mr-[0px]"
              Id={postId}
              setComments={setComment}
            />
            <div className="mx-10">
              {comment.length != 0 && <CommentSection comment={comment[0]} />}
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
