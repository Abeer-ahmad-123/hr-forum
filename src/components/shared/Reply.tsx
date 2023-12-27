'use client'
import { useState, useRef, useEffect, MutableRefObject } from 'react'
import UpdownButton from '../ui/updownButton'
import ReplyTextArea from './ReplyTextArea'
import { useSearchParams } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SocialButtons from './SocialButtons'
import { MoreHorizontal } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ConvertDate } from '@/utils/helper'
import { FormatCreatedAt } from '@/utils/helper'
import { ReplyInterface } from '@/utils/interfaces/reply'

function Reply({ reply, commentLength, commentId = null }: ReplyInterface) {
  const replyRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const params = useParams()
  const replyIdFromUrl = searchParams?.get('replyId')
  const [highlighted, setHighlighted] = useState(false)
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

  return (
    <div
      ref={replyRef}
      id={`reply-${reply.id}`}
      className={`ml-12 mt-4 rounded-lg ${
        highlighted ? 'animate-pulse border-2 border-primary' : ''
      }`}>
      <div className="flex gap-[2%] pt-5">
        <div className="flex  flex-col items-center">
          <div className="rounded-full border border-black">
            <img
              src={reply['author_details'].profile_picture_url}
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
        <div className="min-w-sm flex flex-col">
          <div className="min-w-sml rounded-2xl bg-slate-100  px-2 py-1 dark:bg-slate-800 ">
            <div className="pl-2 text-left text-accent">
              {reply['author_details'].name}
            </div>

            <div className="ml-4 mt-0 h-full w-full   text-left leading-loose text-gray-600 dark:text-white">
              {reply.content}
            </div>
          </div>

          {/* ÷  */}

          <div className="flex items-center justify-between pr-5">
            <div className="flex items-center space-x-3">
              <div className="group relative inline-block">
                <span className="ml-2 pt-4 text-left text-sm italic text-gray-400">
                  {convertDate(reply.created_at)}
                </span>
                <div className="absolute bottom-full hidden -translate-x-1/2  transform whitespace-nowrap rounded-xl bg-gray-400 p-2 text-sm text-gray-200 group-hover:block">
                  {formattedDate}
                </div>
              </div>
              <Popover>
                <PopoverTrigger>
                  <button className="visited:text-indigo-500 flex items-center space-x-2 p-2  pl-0 active:text-gray-700">
                    <span className="text-sm text-gray-400 hover:text-blue-500">
                      Share
                    </span>
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

              <button className="text-sm text-gray-400">Report</button>
            </div>
            {/* <MoreHorizontal className="ml-2 text-gray-400" /> */}
          </div>
          {/*  ÷  */}
        </div>
      </div>
    </div>
  )
}

export default Reply
