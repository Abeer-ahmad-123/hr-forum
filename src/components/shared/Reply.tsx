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
import { useSelector } from 'react-redux'
import CommentDelete from '../CommentDelete'
import Report from '../Report/Report'
import SocialButtons from './SocialButtons'
import SignInDialog from './new-post/SignInDialog'

function Reply({
  reply,
  commentLength,
  commentId = null,
  setReportedReplyId,
  setDeletedReplyId,
  getPostCommets,
}: ReplyInterface) {
  const replyRef = useRef<HTMLDivElement>(null)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const searchParams = useSearchParams()
  const params = useParams()
  const replyIdFromUrl = searchParams?.get('replyId')
  const [highlighted, setHighlighted] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [popOver, setPopOver] = useState<boolean>(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const postId = params.id as string
  const router = useRouter()
  const pathName = usePathname()

  const userDetails = useSelector(
    (state: LoggedInUser) => state.loggedInUser.userData,
  )

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

  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  useEffect(() => {
    highLight()
  }, [replyIdFromUrl, reply.id])

  const convertDate = ConvertDate

  const formattedDate = FormatCreatedAt(reply.created_at)
  const handleImgClick = () => {
    router.push(
      `${
        userDetails?.id === (reply?.user_id as unknown as string)
          ? '/profile'
          : `/profile/${reply?.user_id}`
      }`,
    )
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
    if (!tokenInRedux) {
      setShowSignModal(true)
    } else setOpenDialog(true)
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

  return (
    <>
      <div
        ref={replyRef}
        id={`reply-${reply.id}`}
        className={`mt-4 rounded-lg ${
          highlighted ? 'animate-pulse border-2 border-primary' : ''
        }`}>
        <div className="flex gap-2.5">
          <div className="flex  flex-col items-center">
            <div className="cursor-pointer rounded-full border border-black ">
              <img
                alt="profile picture"
                height={8}
                width={8}
                src={reply['author_details'].profile_picture_url}
                className="h-8 min-h-[32px] min-w-[32px] rounded-full"
                onClick={handleImgClick}
              />
            </div>
          </div>
          <div className="min-w-sm flex flex-col">
            <div
              className={`min-w-sml rounded-2xl bg-slate-100  px-4 py-2  ${
                pathName.includes('/feeds/feed/')
                  ? 'dark:bg-slate-800'
                  : 'dark:bg-dark-background'
              } dark:bg-dark-background`}>
              <div className="flex flex-row items-center justify-between">
                <div className="text-left text-accent dark:text-white">
                  {reply['author_details'].name}
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

              <div className="mt-0 flex flex-wrap break-all p-2.5 text-left leading-loose text-gray-600 dark:text-white">
                {reply.content}
              </div>
            </div>

            <div className="flex items-center justify-between pr-5">
              <div className="flex items-center gap-2.5">
                <div className="group relative inline-block shrink-0">
                  <span className="pointer ml-2  pt-4 text-left text-xs text-gray-400 hover:underline">
                    {convertDate(reply.created_at)}
                  </span>
                  <div className="absolute bottom-full left-[79px] hidden shrink-0 -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 p-2 text-sm text-gray-200 group-hover:block max-md:left-[100px]">
                    {formattedDate}
                  </div>
                </div>
                <div onMouseLeave={handleMouseDown}>
                  <Popover open={popOver} onOpenChange={setPopOver}>
                    <PopoverTrigger className="visited:text-indigo-500 pointer flex items-center py-2 pl-0 text-sm text-gray-400 hover:underline active:text-gray-700">
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
                        commentId={commentId}
                        replyId={reply.id}
                        handleButtonClick={handleButtonClick}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {(reply.user_id as unknown as string) == userDetails?.id ? (
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
            setDeletedReplyId={setDeletedReplyId}
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
