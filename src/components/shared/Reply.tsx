'use client'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Dialog/simpleDialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ConvertDate, FormatCreatedAt } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { ReplyInterface } from '@/utils/interfaces/reply'
import { AlertOctagon } from 'lucide-react'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import CommentDelete from '../CommentDelete'
import Report from '../Report/Report'
import SocialButtons from './SocialButtons'
import SignInDialog from './NewPost/SignInDialog'
import { deleteModalState } from '@/services/auth/authService'
import { noProfilePicture } from '@/assets/images'
import { getTokens, getUserData } from '@/utils/local-stroage'

function Reply({
  reply,
  commentLength,
  commentId = null,
  setReportedReplyId,
  setDeletedReplyId,
  getPostCommets,
}: ReplyInterface) {
  const replyRef = useRef<HTMLDivElement>(null)
  const accessToken = getTokens().accessToken
  const userData = getUserData().user
  const searchParams = useSearchParams()
  const params = useParams()
  const replyIdFromUrl = searchParams?.get('replyId')
  const [highlighted, setHighlighted] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [popOver, setPopOver] = useState<boolean>(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [showSignModal, setShowSignModal] = useState<boolean>(false)

  const postId = params.id as string
  const router = useRouter()
  const pathName = usePathname()

  const highLight = () => {
    if (
      commentLength === 1 &&
      replyIdFromUrl &&
      replyIdFromUrl === reply.id.toString()
    ) {
      replyRef?.current?.scrollIntoView({ behavior: 'smooth' })

      setHighlighted(true)
      setTimeout(() => setHighlighted(false), 1000)
    }
  }

  const convertDate = ConvertDate

  const formattedDate = FormatCreatedAt(reply.created_at)
  const handleImgClick = () => {
    router.push(
      `${
        userData?.id === reply?.user_id
          ? '/profile'
          : `/profile/${reply?.user_id}`
      }`,
    )
    deleteModalState()
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

  const handleClick = () => {
    if (!accessToken) {
      setShowSignModal(true)
    } else setOpenDialog(true)
  }

  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setPopOver(false)

    if (!accessToken) {
      setShowSignModal(true)
    } else {
      setOpenDeleteDialog(true)
    }
  }

  useEffect(() => {
    highLight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replyIdFromUrl, reply.id])

  return (
    <>
      <div
        ref={replyRef}
        id={`reply-${reply.id}`}
        className={` ${
          highlighted ? ' animate-pulse border-2 border-primary' : ''
        }`}>
        <div className="mt-[20px] flex gap-2.5">
          <div className="flex  flex-col items-center">
            <div className="cursor-pointer rounded-full ">
              <img
                alt="profile picture"
                height={8}
                width={8}
                src={
                  reply['author_details'].profile_picture_url ||
                  noProfilePicture.src
                }
                className="h-full max-h-[40px] w-full max-w-[40px] cursor-pointer rounded-full  "
                onClick={handleImgClick}
              />
            </div>
          </div>
          <div className="min-w-sm  flex flex-col">
            <div
              className={`min-w-sml rounded-2xl   ${
                pathName.includes('/feeds/feed/') ? '' : ''
              } dark:bg-dark-background`}>
              <div className="flex flex-row items-center justify-between">
                <div
                  className="flex h-[40px] cursor-pointer items-center gap-2 text-left font-[500] text-black  dark:text-white max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
                  {reply['author_details'].name}
                  <div className="flex items-center justify-center gap-2 ">
                    <div className="dot h-[5px] w-[5px] rounded-full bg-black opacity-60"></div>
                    <div className="text-xs opacity-60">
                      {convertDate(reply.created_at)}
                    </div>
                  </div>
                </div>

                {reply?.user_has_reported && (
                  <div className="flex w-fit cursor-default items-center justify-center rounded-md  p-1 text-[7px] font-medium text-gray-500 ring-inset ring-gray-500/10 custom-sm:ring-1">
                    {/*  */}
                    <div className="group relative inline-block">
                      <AlertOctagon
                        size={15}
                        className="hidden cursor-pointer max-custom-sm:block"
                      />
                      <div className="absolute bottom-full left-[50px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 px-[5px] py-[2px] text-[0.5rem] text-gray-200 group-hover:block max-md:left-[50px]">
                        Reported
                      </div>
                    </div>
                    {/*  */}

                    <span className="max-custom-sm:hidden">Reported</span>
                  </div>
                )}
              </div>

              <div className="mt-0 flex flex-wrap break-all p-0 pb-1 text-left leading-loose text-gray-600 dark:text-white">
                {reply.content}
              </div>
            </div>

            <div className="flex items-center justify-between pr-5">
              <div className="flex items-center gap-2.5">
                <div onMouseLeave={handleMouseDown}>
                  <Popover open={popOver} onOpenChange={setPopOver}>
                    <PopoverTrigger
                      className="visited:text-indigo-500 pointer flex items-center py-2 pl-0 text-sm text-gray-400 hover:underline active:text-gray-700"
                      name="share option button"
                      aria-label="share option"
                      aria-labelledby="shareOptionLabel"
                      role="button">
                      <span
                        className="cursor-pointer text-sm text-gray-400 hover:underline max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]"
                        onClick={setOpenPopOver}>
                        Share
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white">
                      <SocialButtons
                        className="flex gap-3"
                        postId={postId}
                        handleButtonClick={handleButtonClick}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {reply.user_id == userData.id ? (
                  <div
                    onClick={handleDeleteClick}
                    className="cursor-pointer text-sm text-gray-400 hover:underline max-custom-sm:text-[11px]
                       max-[392px]:text-[10px] max-custom-sx:text-[8px]">
                    Delete
                  </div>
                ) : (
                  <Dialog open={openDialog} onOpenChange={handleClick}>
                    <DialogTrigger asChild>
                      <button
                        name="reply button"
                        className="pointer text-sm text-gray-400 hover:underline"
                        onClick={handleClick}>
                        Report
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[500px]">
                      <Report
                        commentId={reply.id}
                        reportType="reply"
                        setOpenDialog={setOpenDialog}
                        setReportedReplyId={setReportedReplyId}
                        getPostCommets={getPostCommets}
                        setReported={() => {}}
                        setDeletedCommentId={() => {}}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="bg-white sm:max-w-[500px]">
          <CommentDelete
            setOpenDeleteDialog={setOpenDeleteDialog}
            commentId={reply?.id}
            postId={reply?.post_id.toString()}
            setDeletedCommentId={() => {}}
            deletedCommentId=""
            setDeletedReplyId={setDeletedReplyId}
            deletedReplyId={'deletedReplyId'}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <SignInDialog setShowSignModal={setShowSignModal} />
      </Dialog>
    </>
  )
}

export default Reply
