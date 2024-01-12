'use client'
import {
  deleteReactions,
  postReactions,
  updatePostReaction,
} from '@/services/reactions/reactions'
import { redirect, useParams, usePathname } from 'next/navigation'
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
import {
  bookmarkPost,
  deleteBookmarkPost,
} from '@/services/bookmark/bookmarkService'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'

import SocialButtons from './SocialButtons'
import SignInDialog from './new-post/SignInDialog'
import { PostActionBarProps } from '@/utils/interfaces/posts'
import { useInterceptor } from '@/hooks/interceptors'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Dialog/simpleDialog'
import Report from '../Report/Report'
import { MoreHorizontal, AlertOctagon } from 'lucide-react'

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
}: PostActionBarProps) => {
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''

  const [showSignModal, setShowSignModal] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { id } = useParams()
  const pathName = usePathname()
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
        redirect('/feeds')
      }
    } else {
      setShowSignModal(true)
    }
  }
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog />
      </Dialog>
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
              {/* <MessageIcon size={'24px'} color="#D2D3D5" /> */}
              <FaRegComment />
              <span className="font-light   max-custom-sm:hidden ">
                Comment
              </span>
            </button>
          </div>

          <div className="dark:text-icon-dark  flex basis-1/4 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-300  dark:hover:text-slate-800">
            <Popover>
              <PopoverTrigger>
                <button className="text-icon-light  dark:text-icon-dark flex cursor-pointer items-center space-x-2  px-[9px] font-black">
                  {/* <IoShareSocial size={'24px'} color="#D2D3D5" /> */}
                  <PiShareFat className="h-6 w-6 font-light" />
                  <span className="font-light  max-custom-sm:hidden ">
                    Share
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent className="bg-white">
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
                    <DialogTrigger asChild>
                      <button className=" dark:text-icon-dark  text-icon-light pyrepo-2 flex basis-1/4 cursor-pointer items-center justify-center space-x-2 rounded-sm px-[9px] font-black hover:bg-gray-300 dark:text-gray-300  dark:hover:text-slate-800">
                        <AlertOctagon size={17} />
                        <span className="text-[15px] font-light max-custom-sm:hidden">
                          {' '}
                          Report
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[500px]">
                      <Report />
                    </DialogContent>
                  </Dialog>

                  <div
                    onClick={handleBookmark}
                    className="dark:text-icon-dark text-icon-light flex basis-1/4 cursor-pointer items-center justify-center space-x-2 rounded-sm px-[9px] py-2 font-black hover:bg-gray-300 dark:text-gray-300  dark:hover:text-slate-800">
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
    </>
  )
}

export default PostActionBar
