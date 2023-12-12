// import TextArea from '../ui/TextArea'
// import { Send } from 'lucide-react'
// import ReplyTextArea from './ReplyTextArea'
import UpdownButton from '../ui/updownButton'
import CommentOrReply from '@/components/CommentOrReply'
import Reply from './Reply'
import Image from 'next/image'
function CommentSection({ comment, refetchComments }: any) {
  const convertDate = (date: string) => {
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
    <div>
      <div className="mt-4 w-full rounded-lg bg-slate-100 dark:bg-slate-800">
        <div className="flex pt-5">
          <div className="flex  flex-col items-center">
            <div className="">
              <img
                alt="avatar"
                src={comment['author_details']?.profile_picture_url}
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div className="pl-5">
              {/* To be implemented */}
              <UpdownButton count={comment?.reaction_summary?.like_count} />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-between">
              <div className="text-accent">
                {comment['author_details']?.name}
              </div>
              <div className="pr-5 italic text-gray-500">
                {convertDate(comment.created_at)}
              </div>
            </div>

            <div className="mt-0 h-full w-full p-7 pl-0 pt-3 text-left leading-loose text-gray-600 dark:text-white">
              {comment.content}
            </div>

            <CommentOrReply
              reply={true}
              commentId={comment.id}
              refetchComments={refetchComments}
            />
          </div>
        </div>


        {comment?.replies?.length !== 0 &&
          comment?.replies?.map((reply: any) => {
            return <Reply key={reply.id} reply={reply} />
          })}
      </div>
    </div>
  )
}

export default CommentSection
