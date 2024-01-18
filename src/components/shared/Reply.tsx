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
import { ReplyInterface } from '@/utils/interfaces/reply'
import { AlertOctagon } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Report from '../Report/Report'
import SocialButtons from './SocialButtons'

function Reply({
  reply,
  commentLength,
  commentId = null,
  setReportedReplyId,
}: ReplyInterface) {
  const replyRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const params = useParams()
  const replyIdFromUrl = searchParams?.get('replyId')
  const [highlighted, setHighlighted] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const postId = params.id as string

  useEffect(() => {
    if (
      commentLength === 1 &&
      replyIdFromUrl &&
      replyIdFromUrl === reply.id.toString()
    ) {
      replyRef?.current?.scrollIntoView({ behavior: 'smooth' })

      setHighlighted(true)
      setTimeout(() => setHighlighted(false), 1000)
    }
  }, [replyIdFromUrl, reply.id])

  /////// convertDate

  const convertDate = ConvertDate

  /////// date formate change on hover
  const formattedDate = FormatCreatedAt(reply.created_at)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <div
      ref={replyRef}
      id={`reply-${reply.id}`}
      className={`ml-12 mt-4 rounded-lg ${
        highlighted ? 'animate-pulse border-2 border-primary' : ''
      }`}>
      <div className="flex gap-2.5">
        <div className="flex  flex-col items-center">
          <div className="rounded-full border border-black">
            <img
              alt="profile picture"
              height={8}
              width={8}
              src={reply['author_details'].profile_picture_url}
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
        <div className="min-w-sm flex flex-col">
          <div className="min-w-sml rounded-2xl bg-slate-100  px-2 py-1 dark:bg-slate-800 ">
            <div className="flex flex-row justify-between">
              <div className="text-left text-accent">
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

            <div className="mt-0 h-full w-full p-2.5 text-left leading-loose text-gray-600 dark:text-white">
              {reply.content}
            </div>
          </div>

          <div className="flex items-center justify-between pr-5">
            <div className="flex items-center gap-2.5">
              <div className="group relative inline-block">
                <span className="pointer ml-2 pt-4 text-left text-xs text-gray-400 hover:underline">
                  {convertDate(reply.created_at)}
                </span>
                <div className="absolute bottom-full left-[79px] hidden -translate-x-1/2 transform  whitespace-nowrap rounded-xl bg-gray-400 p-2 text-sm text-gray-200 group-hover:block max-md:left-[100px]">
                  {formattedDate}
                </div>
              </div>
              <Popover>
                <PopoverTrigger>
                  <button className="visited:text-indigo-500 pointer flex items-center py-2 pl-0 text-sm text-gray-400 hover:underline active:text-gray-700">
                    Share
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white">
                  <SocialButtons
                    className="flex gap-3"
                    postId={postId}
                    commentId={commentId}
                    replyId={reply.id}
                  />
                </PopoverContent>
              </Popover>

              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <button className="pointer text-sm text-gray-400 hover:underline">
                    Report
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[500px]">
                  <Report
                    commentId={reply.id}
                    reportType="reply"
                    setOpenDialog={setOpenDialog}
                    setReportedReplyId={setReportedReplyId}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reply
