'use client'
import { useState, useRef, useEffect } from 'react'
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

function Reply({ reply, commentLength, commentId = null }) {
  const replyRef = useRef(null)
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
      replyRef.current.scrollIntoView({ behavior: 'smooth' })

      setHighlighted(true)
      setTimeout(() => setHighlighted(false), 1000)
    }
  }, [replyIdFromUrl, reply.id])

  const convertDate = (date: Date) => {
    const providedDateTime = new Date(date)
    const currentDateTime = new Date()
    const timeDifference =
      currentDateTime.getTime() - providedDateTime.getTime()

    // Convert the time difference to days, hours, and minutes
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hoursAgo = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutesAgo = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    )

    // Return the result
    if (daysAgo > 0) {
      return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`
    } else {
      return 'just now'
    }
  }

  return (
    <div
      ref={replyRef}
      id={`reply-${reply.id}`}
      className={`ml-16 mt-4 rounded-lg ${
        highlighted ? 'animate-pulse border-2 border-primary' : ''
      }`}>
      <div className="flex gap-[2%] pt-5">
        <div className="flex  flex-col items-center">
          <div className="">
            <img
              src={reply['author_details'].profile_picture_url}
              className="h-8 w-8 rounded-full"
            />
          </div>
          {/* <div className='pl-5'>
                        <UpdownButton count={reply['reaction_summary']['like_count']} />
                    </div> */}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <div className="text-accent">{reply['author_details'].name}</div>
            <div className="pr-5 italic text-gray-500">
              {convertDate(reply.created_at)}
            </div>
          </div>

          <div className="mt-0 h-full w-full p-7 pl-0 pt-3 text-left leading-loose text-gray-600 dark:text-white">
            {reply.content}
          </div>

          {/* ÷  */}

          <div className="flex justify-between pb-5 pr-5">
            <div className="flex space-x-3">
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
            <MoreHorizontal className="text-gray-400" />
          </div>
          {/*  ÷  */}
        </div>
      </div>
    </div>
  )
}

export default Reply
